# WASM 插件开发

WASM 插件使用 WebAssembly 技术，允许开发者使用 Rust、C/C++ 等语言编写高性能的扫描规则。

## 概述

- **位置**：`{app_data_dir}/plugins/scanner/<子目录>/`
- **运行时**：Wasmtime
- **接口**：`check_flow` 导出函数
- **限制**：无 WASI（无文件系统、无网络）

## 目录结构

```
plugins/scanner/
├── my-plugin/
│   ├── manifest.toml     # 插件清单
│   └── plugin.wasm       # WASM 模块
├── another-plugin/
│   ├── manifest.toml
│   └── custom.wasm       # 自定义文件名
└── ...
```

## 清单文件

### 基本格式

```toml
api_version = 1
kind = "wasm"
id = "com.example.my_scan_plugin"
name = "示例扫描插件"
version = "0.1.0"
description = "可选说明"
rule_id = "com.example.my_scan_rule"
rule_name = "示例规则显示名"
category = "自定义"
severity = "low"
wasm_file = "plugin.wasm"
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `api_version` | 是 | 当前仅支持 `1` |
| `kind` | 是 | 必须为 `wasm` |
| `id` | 是 | 插件包 ID，用于 UI 展示 |
| `name` | 是 | 包显示名 |
| `version` | 否 | 版本字符串，默认 `0.0.0` |
| `description` | 否 | 包说明 |
| `rule_id` | 是 | 写入 Finding.rule_id，须唯一、稳定 |
| `rule_name` | 是 | 写入 Finding.rule_name |
| `category` | 是 | 写入 Finding.category |
| `severity` | 是 | `high` / `medium` / `low` / `info` |
| `wasm_file` | 否 | WASM 文件名，默认 `plugin.wasm` |

## WASM ABI

### 导出符号

| 符号 | 说明 |
|------|------|
| `memory` | WebAssembly Memory |
| `check_flow(in_ptr: i32, in_len: i32) -> i64` | 扫描入口 |
| `dealloc_result(ptr: i32, len: i32)` | 可选，释放返回缓冲区 |

### 输入格式

宿主将 Flow 序列化为 UTF-8 JSON，写入 guest 线性内存：

```json
{
  "id": "flow-123",
  "type": "http",
  "method": "GET",
  "url": "https://example.com/api/users",
  "statusCode": 200,
  "requestHeaders": {
    "Host": "example.com",
    "Authorization": "Bearer token123"
  },
  "requestBody": null,
  "responseHeaders": {
    "Content-Type": "application/json"
  },
  "responseBody": "{\"users\": [...]}"
}
```

### 输出格式

`check_flow` 返回 i64，高 32 位为指针，低 32 位为长度。指向 UTF-8 JSON：

```json
{
  "matched": true,
  "message": "发现敏感信息：Authorization 头包含 Bearer Token",
  "evidence": "Authorization: Bearer token123",
  "severity": "medium",
  "cwe": "CWE-200"
}
```

如果无发现：

```json
{
  "matched": false
}
```

## Rust 开发示例

### 项目配置

```toml
# Cargo.toml
[package]
name = "my-scan-plugin"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

### 实现代码

```rust
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Flow {
    id: String,
    #[serde(rename = "type")]
    flow_type: String,
    method: Option<String>,
    url: Option<String>,
    #[serde(rename = "statusCode")]
    status_code: Option<u32>,
    #[serde(rename = "requestHeaders")]
    request_headers: Option<std::collections::HashMap<String, String>>,
    #[serde(rename = "responseBody")]
    response_body: Option<String>,
}

#[derive(Serialize)]
struct ScanResult {
    matched: bool,
    message: Option<String>,
    evidence: Option<String>,
    severity: Option<String>,
    cwe: Option<String>,
}

#[no_mangle]
pub extern "C" fn check_flow(in_ptr: *const u8, in_len: usize) -> i64 {
    // 读取输入
    let input = unsafe {
        std::slice::from_raw_parts(in_ptr, in_len)
    };
    let flow: Flow = match serde_json::from_slice(input) {
        Ok(f) => f,
        Err(_) => return encode_result(ScanResult {
            matched: false,
            message: None,
            evidence: None,
            severity: None,
            cwe: None,
        }),
    };
    
    // 扫描逻辑
    let result = scan_flow(&flow);
    
    // 编码返回
    encode_result(result)
}

fn scan_flow(flow: &Flow) -> ScanResult {
    // 检查 Authorization 头
    if let Some(headers) = &flow.request_headers {
        if let Some(auth) = headers.get("Authorization") {
            if auth.starts_with("Bearer ") {
                return ScanResult {
                    matched: true,
                    message: Some("发现 Bearer Token".to_string()),
                    evidence: Some(format!("Authorization: {}", auth)),
                    severity: Some("medium".to_string()),
                    cwe: Some("CWE-200".to_string()),
                };
            }
        }
    }
    
    ScanResult {
        matched: false,
        message: None,
        evidence: None,
        severity: None,
        cwe: None,
    }
}

fn encode_result(result: ScanResult) -> i64 {
    let json = serde_json::to_vec(&result).unwrap();
    let ptr = json.as_ptr() as i64;
    let len = json.len() as i64;
    std::mem::forget(json);
    (ptr << 32) | len
}

#[no_mangle]
pub extern "C" fn dealloc_result(ptr: *mut u8, len: usize) {
    unsafe {
        let _ = Vec::from_raw_parts(ptr, len, len);
    }
}
```

### 编译

```bash
# 添加 WASM 目标
rustup target add wasm32-unknown-unknown

# 编译
cargo build --target wasm32-unknown-unknown --release
```

## 测试插件

### 本地测试

1. 编译 WASM 模块
2. 将文件复制到插件目录
3. 创建 `manifest.toml`
4. 在 FlowMind 中重载插件
5. 触发扫描测试

### 测试用例

建议测试以下场景：

- 正常请求（无发现）
- 包含敏感信息的请求
- 边界情况（空请求、大请求）
- 错误输入（格式错误的 JSON）

## 发布插件

### 打包

```
my-plugin/
├── manifest.toml
├── plugin.wasm
└── README.md
```

### 分发

1. **本地目录**：直接复制到插件目录
2. **ZIP 文件**：打包为 ZIP，通过 UI 导入
3. **Git 仓库**：克隆到插件目录

## 最佳实践

1. **规则 ID 稳定**：一旦发布，不要修改 rule_id
2. **性能优化**：WASM 性能优于声明式，适合复杂逻辑
3. **错误处理**：优雅处理输入格式错误
4. **文档完善**：在 manifest.toml 中添加清晰的描述
5. **测试充分**：在发布前充分测试各种场景
