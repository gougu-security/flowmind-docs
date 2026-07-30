# Rhai 脚本规则开发

Rhai 是 FlowMind 内置的脚本语言，用于编写自定义扫描规则。Rhai 语法类似 Rust，无需编译、支持热重载，是扩展扫描能力的首选方式。

## 概述

- **位置**：`plugins/scanner/passive/`（被动规则）或 `plugins/scanner/active/`（主动规则）
- **格式**：`.rhai` 文件 + `//!` 元数据头
- **优势**：无需编译、热重载、直接访问 Flow 数据
- **运行方式**：预编译 AST，运行时零分配执行

## 文件结构

每个规则一个 `.rhai` 文件：

```rust
//! id: my-rule
//! name: 我的规则
//! category: 自定义
//! severity: medium
//! enabled_by_default: true

fn check(flow) {
    // 检测逻辑
}
```

## 元数据头

文件开头的 `//!` 注释定义规则元信息：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 规则唯一标识，如 `my-custom-rule` |
| `name` | 是 | 规则显示名称 |
| `category` | 是 | 分类名称 |
| `severity` | 是 | `high` / `medium` / `low` / `info` |
| `title` | 否 | Finding 标题（默认使用 name） |
| `description` | 否 | 规则说明 |
| `enabled_by_default` | 否 | 是否默认启用（`true` / `false`） |
| `version` | 否 | 版本号 |

## check 函数

`fn check(flow)` 是规则的入口函数，接收一个 Flow 对象，返回三种结果：

### 无发现

```rust
fn check(flow) {
    return ();  // 无发现
}
```

### 布尔结果

```rust
fn check(flow) {
    let has_issue = host_header_absent(flow, "resp", "x-frame-options");
    has_issue  // true = 有发现
}
```

### 结构化结果

```rust
fn check(flow) {
    #{
        title: "发现标题",
        description: "问题详细描述",
        evidence: "触发规则的证据内容",
        recommendation: "修复建议"
    }
}
```

## Flow 对象

`flow` 对象包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `flow_type` | 字符串 | `"http"` 或 `"websocket"` |
| `id` | 字符串 | Flow 唯一标识 |
| `url` | 字符串 | 请求 URL（HTTP） |
| `method` | 字符串 | HTTP 方法（HTTP） |
| `status_code` | 整数 | HTTP 状态码（HTTP） |
| `request_headers` | 对象 | 请求头键值对 |
| `response_headers` | 对象 | 响应头键值对 |
| `request_body` | 字符串 | 请求体 |
| `response_body` | 字符串 | 响应体 |
| `tls` | 对象 | TLS 连接信息 |

## 主机函数（被动规则）

### 头部检查

```rust
let val = host_header_get(flow, "resp", "content-type");
if host_header_absent(flow, "req", "authorization") {
    // 缺少认证头
}
if host_header_any_present(flow, "resp", ["server", "x-powered-by"]) {
    // 存在信息泄露头
}
if host_header_match(flow, "resp", "content-type", "text/html") {
    // 匹配 content-type
}
```

- `host_header_get(flow, side, name)` — 获取头值
- `host_header_absent(flow, side, name)` — 检查头缺失
- `host_header_any_present(flow, side, names)` — 检查任一头部存在
- `host_header_match(flow, side, name, pattern)` — 正则匹配头值
- `host_headers_evidence(flow, side, names)` — 拼接匹配头作为证据

### 正则匹配

```rust
if host_regex_match(flow.response_body, "(?i)(password|secret)") {
    // 响应体含敏感词
}
let matched = host_regex_find(flow.response_body, "eyJ[A-Za-z0-9_-]+\\.");
```

- `host_regex_match(text, pattern)` — 正则匹配
- `host_regex_find(text, pattern)` — 返回首个匹配
- `host_url_match(flow, pattern)` — 正则匹配 URL
- `host_body_match(flow, side, pattern)` — 正则匹配请求/响应体

### TLS 检查

```rust
if host_tls_issue(flow) {
    let evidence = host_tls_evidence(flow);
}
if host_tls_self_signed(flow) {
    // 自签名证书
}
if host_tls_expired(flow) {
    // 证书过期
}
```

### WebSocket 检查

```rust
if host_ws_any_contains(flow, ["password", "token"]) {
    // WebSocket 消息含敏感词
}
if host_ws_lacks_all(flow, ["auth", "auth_token"]) {
    // 所有消息都缺少认证信息
}
let msg = host_ws_find_any(flow, ["admin", "root"]);
```

### 其他

```rust
if host_is_http(flow) { }
if host_is_websocket(flow) { }
if host_status_in_range(flow, 400, 499) { }
if host_cors_wildcard_with_credentials(flow) { }
let flags = host_set_cookie_missing_flags(flow);
```

## 主机函数（主动规则）

主动规则可额外使用以下函数发起 HTTP 请求：

### 重放与注入

```rust
// 原始重放
let resp = host_replay(flow);

// 修改参数重放
let resp = host_replay_set_query(flow, "id", "456");
let resp = host_replay_set_header(flow, "Authorization", "Bearer test");
let resp = host_replay_set_body(flow, '{"id": 1}');
let resp = host_replay_set_path(flow, "/api/admin");
let resp = host_replay_set_form(flow, "username", "admin");

// 注入 payload
let resp = host_inject_query(flow, "id", "' OR '1'='1");
let resp = host_inject_form(flow, "username", "<script>alert(1)</script>");
```

### 自定义请求

```rust
let resp = host_http_request("POST", "https://target.com/api/login",
    #{
        "Content-Type": "application/json"
    },
    '{"user":"admin","pass":"test"}'
);
```

### 响应分析

```rust
let status = host_resp_status(resp);
let body = host_resp_body(resp);
let len = host_resp_body_len(resp);
if host_resp_body_contains(resp, "error") { }
if host_resp_body_match(resp, "(?i)(SQL|error)") { }
let ct = host_resp_header(resp, "content-type");
if host_resp_ok(resp) { }
if host_resp_differs(resp_a, resp_b) { }
```

### 参数枚举

```rust
let qnames = host_flow_query_names(flow);
let fnames = host_flow_form_names(flow);
```

### URL 操作

```rust
let new_url = host_url_set_query(url, "id", "123");
let new_url = host_url_inject_query(url, "id", "' OR '1'='1");
let new_url = host_url_set_path(url, "/api/admin");
```

## 完整示例

### 被动规则：检测缺少安全头

```rust
//! id: missing-security-headers
//! name: 缺少安全响应头
//! category: 安全配置
//! severity: medium
//! enabled_by_default: true

fn check(flow) {
    if !host_is_http(flow) { return (); }

    let headers = [
        "strict-transport-security",
        "x-content-type-options",
        "x-frame-options"
    ];

    let missing = [];
    for h in headers {
        if host_header_absent(flow, "resp", h) {
            missing.push(h);
        }
    }

    if missing.len() == 0 { return (); }

    #{
        title: "缺少安全响应头",
        description: "响应缺少以下安全头: " + join(missing, ", "),
        evidence: "缺失头部: " + join(missing, ", "),
        recommendation: "添加缺失的安全响应头以增强客户端安全防护"
    }
}
```

### 主动规则：检测 SQL 注入

```rust
//! id: active-sqli-check
//! name: 主动 SQL 注入检测
//! category: 注入
//! severity: high
//! enabled_by_default: false

fn check(flow) {
    if !host_is_http(flow) { return (); }

    let names = host_flow_query_names(flow);
    for name in names {
        let resp = host_inject_query(flow, name, "'");
        if host_resp_ok(resp) && host_resp_body_match(resp, "(?i)(SQL syntax|ORA-\\d{5})") {
            return #{
                title: "参数可触发 SQL 错误",
                description: "查询参数 " + name + " 追加引号后响应出现数据库错误特征",
                evidence: "参数: " + name + ", payload: '",
                recommendation: "对参数 " + name + " 实施参数化查询或输入验证"
            };
        }
    }
}
```

## 调试

在插件界面编辑脚本后，选择目标 Flow 并点击 **调试** 即可测试规则执行结果，无需重启应用。

## 热重载

修改 `.rhai` 文件后，在插件界面点击 **重载脚本**，新规则立即生效。

## 最佳实践

1. **尽早返回**：在函数开头添加类型检查，避免无效计算
2. **使用证据**：返回结构化结果时提供具体证据，便于定位问题
3. **测试充分**：使用调试功能测试正常流量和异常流量
4. **参考内置规则**：内置 28 条被动规则和 8 条主动规则是学习 Rhai 的最佳范例
5. **注意性能**：避免在循环中执行复杂的正则匹配

## 参考

- 主机函数 API 详见本章"被动规则"和"主动规则"章节
- 内置规则源码位于工作区 `plugins/scanner/builtins/` 目录
