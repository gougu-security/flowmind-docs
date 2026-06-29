# 声明式插件开发

声明式插件使用 YAML/JSON/TOML 格式定义扫描规则，无需编写代码，适合简单的模式匹配场景。

## 概述

- **位置**：`{app_data_dir}/plugins/scanner/<子目录>/`
- **格式**：YAML、JSON、TOML
- **适用**：简单的模式匹配规则
- **优势**：易于编写、无需编译

## 目录结构

```
plugins/scanner/
├── my-rule/
│   ├── manifest.toml     # 插件清单
│   └── rules.yaml        # 规则定义
├── another-rule/
│   ├── manifest.toml
│   └── rules.json
└── ...
```

## 清单文件

```toml
api_version = 1
kind = "declarative"
id = "com.example.my_declarative_rule"
name = "示例声明式规则"
version = "0.1.0"
description = "检测特定模式"
rule_id = "com.example.pattern_detect"
rule_name = "模式检测"
category = "自定义"
severity = "low"
rules_file = "rules.yaml"
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `api_version` | 是 | 当前仅支持 `1` |
| `kind` | 是 | 必须为 `declarative` |
| `id` | 是 | 插件包 ID |
| `name` | 是 | 包显示名 |
| `version` | 否 | 版本字符串 |
| `description` | 否 | 包说明 |
| `rule_id` | 是 | Finding.rule_id |
| `rule_name` | 是 | Finding.rule_name |
| `category` | 是 | Finding.category |
| `severity` | 是 | `high` / `medium` / `low` / `info` |
| `rules_file` | 否 | 规则文件名，默认 `rules.yaml` |

## 规则定义

### YAML 格式

```yaml
rules:
  - id: detect_api_key
    name: "检测 API Key"
    description: "检测请求中的 API Key 泄露"
    match:
      # 匹配位置
      location: "request_headers"
      # 匹配模式
      pattern: "(?i)(api[_-]?key|x[_-]?api[_-]?key)\\s*[:=]\\s*[\"']?[a-zA-Z0-9]{20,}"
      # 正则表达式
      regex: true
    output:
      message: "发现 API Key 泄露"
      severity: "high"
      cwe: "CWE-798"
      
  - id: detect_debug_mode
    name: "检测调试模式"
    description: "检测响应中的调试信息"
    match:
      location: "response_body"
      patterns:
        - "debug=true"
        - "DEBUG_MODE"
        - "stack trace"
      regex: false
    output:
      message: "响应中包含调试信息"
      severity: "medium"
      cwe: "CWE-215"
```

### JSON 格式

```json
{
  "rules": [
    {
      "id": "detect_api_key",
      "name": "检测 API Key",
      "description": "检测请求中的 API Key 泄露",
      "match": {
        "location": "request_headers",
        "pattern": "(?i)(api[_-]?key|x[_-]?api[_-]?key)\\s*[:=]\\s*[\"']?[a-zA-Z0-9]{20,}",
        "regex": true
      },
      "output": {
        "message": "发现 API Key 泄露",
        "severity": "high",
        "cwe": "CWE-798"
      }
    }
  ]
}
```

## 匹配位置

| 位置 | 说明 |
|------|------|
| `request_headers` | 请求头 |
| `request_body` | 请求体 |
| `response_headers` | 响应头 |
| `response_body` | 响应体 |
| `url` | 请求 URL |
| `method` | HTTP 方法 |
| `status_code` | 状态码 |

## 匹配模式

### 精确匹配

```yaml
match:
  location: "method"
  pattern: "DELETE"
  regex: false
```

### 正则匹配

```yaml
match:
  location: "url"
  pattern: "/api/v[0-9]+/admin"
  regex: true
```

### 多模式匹配

```yaml
match:
  location: "response_body"
  patterns:
    - "error"
    - "exception"
    - "stack trace"
  regex: false
  # 匹配任一模式即触发
  match_any: true
```

### 条件组合

```yaml
match:
  conditions:
    - location: "method"
      pattern: "POST"
      regex: false
    - location: "url"
      pattern: "/api/login"
      regex: false
  # 所有条件都满足才触发
  match_all: true
```

## 输出配置

### 基本输出

```yaml
output:
  message: "发现安全问题"
  severity: "medium"
  cwe: "CWE-200"
```

### 动态消息

使用占位符引用匹配内容：

```yaml
output:
  message: "在 {{location}} 中发现敏感信息: {{match}}"
  severity: "high"
```

### 证据提取

```yaml
output:
  message: "发现 API Key"
  evidence_extract:
    location: "request_headers"
    header: "Authorization"
    # 提取匹配的行作为证据
    extract_line: true
```

## 高级特性

### 白名单

排除已知安全的模式：

```yaml
rules:
  - id: detect_internal_ip
    name: "检测内网 IP"
    match:
      location: "response_body"
      pattern: "192\\.168\\.[0-9]+\\.[0-9]+"
      regex: true
      whitelist:
        - "192.168.1.1"  # 网关地址
        - "192.168.0.1"  # 路由器
    output:
      message: "发现内网 IP 地址泄露"
      severity: "low"
```

### 严重程度覆盖

根据匹配内容调整严重程度：

```yaml
output:
  message: "发现敏感信息"
  severity_map:
    "password": "high"
    "token": "high"
    "key": "medium"
    "secret": "high"
  default_severity: "low"
```

### CWE 映射

```yaml
output:
  message: "发现安全问题"
  cwe_map:
    "password": "CWE-256"
    "token": "CWE-522"
    "api_key": "CWE-798"
  default_cwe: "CWE-200"
```

## 完整示例

### 检测敏感信息泄露

```yaml
rules:
  - id: detect_password_in_url
    name: "URL 中的密码"
    description: "检测 URL 中是否包含密码参数"
    match:
      location: "url"
      pattern: "[?&](password|passwd|pwd|secret)="
      regex: true
    output:
      message: "URL 中包含密码参数，可能导致日志泄露"
      severity: "high"
      cwe: "CWE-598"
      
  - id: detect_jwt_token
    name: "JWT Token 泄露"
    description: "检测响应中的 JWT Token"
    match:
      location: "response_body"
      pattern: "eyJ[A-Za-z0-9_-]*\\.eyJ[A-Za-z0-9_-]*\\.[A-Za-z0-9_-]*"
      regex: true
    output:
      message: "响应中包含 JWT Token"
      severity: "high"
      cwe: "CWE-598"
      
  - id: detect_error_details
    name: "详细错误信息"
    description: "检测响应中的详细错误信息"
    match:
      location: "response_body"
      patterns:
        - "Exception in"
        - "Traceback (most recent call last)"
        - "at com\\."
        - "at org\\."
      regex: true
      match_any: true
    output:
      message: "响应中包含详细错误信息，可能泄露内部实现"
      severity: "medium"
      cwe: "CWE-209"
```

## 最佳实践

1. **规则命名**：使用清晰的 ID 和名称
2. **正则优化**：避免过于复杂的正则表达式
3. **白名单**：对已知安全的模式添加白名单
4. **测试充分**：测试各种边界情况
5. **文档完善**：添加清晰的描述说明

## 与 WASM 插件对比

| 特性 | 声明式插件 | WASM 插件 |
|------|-----------|-----------|
| 编写难度 | 简单 | 中等 |
| 性能 | 一般 | 优秀 |
| 灵活性 | 有限 | 完全 |
| 适用场景 | 模式匹配 | 复杂逻辑 |
| 编译需求 | 无 | 需要编译 |
