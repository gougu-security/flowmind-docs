# Rhai Script Rule Development

Rhai is FlowMind's built-in scripting language for writing custom scan rules. Its syntax is similar to Rust, requires no compilation, supports hot reload, and is the recommended way to extend scanning capabilities.

## Overview

- **Location**: `plugins/scanner/passive/` (passive) or `plugins/scanner/active/` (active)
- **Format**: `.rhai` file with `//!` metadata header
- **Advantages**: No compilation, hot reload, direct Flow data access
- **Execution**: Pre-compiled AST, zero-allocation runtime

## File Structure

One `.rhai` file per rule:

```rust
//! id: my-rule
//! name: My Rule
//! category: Custom
//! severity: medium
//! enabled_by_default: true

fn check(flow) {
    // Detection logic
}
```

## Metadata Header

`//!` comments at the top of the file define rule metadata:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique rule ID, e.g. `my-custom-rule` |
| `name` | Yes | Rule display name |
| `category` | Yes | Category name |
| `severity` | Yes | `high` / `medium` / `low` / `info` |
| `title` | No | Finding title (defaults to name) |
| `description` | No | Rule description |
| `enabled_by_default` | No | Enable by default (`true` / `false`) |
| `version` | No | Version string |

## check Function

`fn check(flow)` is the entry point. It receives a Flow object and returns one of three results:

### No Finding

```rust
fn check(flow) {
    return ();  // No finding
}
```

### Boolean Result

```rust
fn check(flow) {
    let has_issue = host_header_absent(flow, "resp", "x-frame-options");
    has_issue  // true = finding
}
```

### Structured Result

```rust
fn check(flow) {
    #{
        title: "Finding Title",
        description: "Detailed issue description",
        evidence: "Evidence content that triggered the rule",
        recommendation: "How to fix"
    }
}
```

## Flow Object

The `flow` object contains these fields:

| Field | Type | Description |
|-------|------|-------------|
| `flow_type` | String | `"http"` or `"websocket"` |
| `id` | String | Flow unique ID |
| `url` | String | Request URL (HTTP) |
| `method` | String | HTTP method (HTTP) |
| `status_code` | Integer | HTTP status code (HTTP) |
| `request_headers` | Object | Request headers |
| `response_headers` | Object | Response headers |
| `request_body` | String | Request body |
| `response_body` | String | Response body |
| `tls` | Object | TLS connection info |

## Host Functions (Passive Rules)

### Header Inspection

```rust
let val = host_header_get(flow, "resp", "content-type");
if host_header_absent(flow, "req", "authorization") {
    // Missing auth header
}
if host_header_any_present(flow, "resp", ["server", "x-powered-by"]) {
    // Information leak headers exist
}
if host_header_match(flow, "resp", "content-type", "text/html") {
    // Header matches pattern
}
```

- `host_header_get(flow, side, name)` — Get header value
- `host_header_absent(flow, side, name)` — Check if header is missing
- `host_header_any_present(flow, side, names)` — Check if any header exists
- `host_header_match(flow, side, name, pattern)` — Regex match header value
- `host_headers_evidence(flow, side, names)` — Join matching headers as evidence

### Regex Matching

```rust
if host_regex_match(flow.response_body, "(?i)(password|secret)") {
    // Response contains sensitive words
}
let matched = host_regex_find(flow.response_body, "eyJ[A-Za-z0-9_-]+\\.");
```

- `host_regex_match(text, pattern)` — Regex match
- `host_regex_find(text, pattern)` — Return first match
- `host_url_match(flow, pattern)` — Regex match URL
- `host_body_match(flow, side, pattern)` — Regex match request/response body

### TLS Inspection

```rust
if host_tls_issue(flow) {
    let evidence = host_tls_evidence(flow);
}
if host_tls_self_signed(flow) {
    // Self-signed certificate
}
if host_tls_expired(flow) {
    // Expired certificate
}
```

### WebSocket Inspection

```rust
if host_ws_any_contains(flow, ["password", "token"]) {
    // WebSocket message contains sensitive words
}
if host_ws_lacks_all(flow, ["auth", "auth_token"]) {
    // All messages lack auth info
}
let msg = host_ws_find_any(flow, ["admin", "root"]);
```

### Other

```rust
if host_is_http(flow) { }
if host_is_websocket(flow) { }
if host_status_in_range(flow, 400, 499) { }
if host_cors_wildcard_with_credentials(flow) { }
let flags = host_set_cookie_missing_flags(flow);
```

## Host Functions (Active Rules)

Active rules can additionally use these functions to make HTTP requests:

### Replay & Injection

```rust
// Raw replay
let resp = host_replay(flow);

// Modified replay
let resp = host_replay_set_query(flow, "id", "456");
let resp = host_replay_set_header(flow, "Authorization", "Bearer test");
let resp = host_replay_set_body(flow, '{"id": 1}');
let resp = host_replay_set_path(flow, "/api/admin");
let resp = host_replay_set_form(flow, "username", "admin");

// Payload injection
let resp = host_inject_query(flow, "id", "' OR '1'='1");
let resp = host_inject_form(flow, "username", "<script>alert(1)</script>");
```

### Custom Requests

```rust
let resp = host_http_request("POST", "https://target.com/api/login",
    #{
        "Content-Type": "application/json"
    },
    '{"user":"admin","pass":"test"}'
);
```

### Response Analysis

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

### Parameter Enumeration

```rust
let qnames = host_flow_query_names(flow);
let fnames = host_flow_form_names(flow);
```

### URL Manipulation

```rust
let new_url = host_url_set_query(url, "id", "123");
let new_url = host_url_inject_query(url, "id", "' OR '1'='1");
let new_url = host_url_set_path(url, "/api/admin");
```

## Complete Examples

### Passive Rule: Detect Missing Security Headers

```rust
//! id: missing-security-headers
//! name: Missing Security Response Headers
//! category: Security Config
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
        title: "Missing Security Response Headers",
        description: "Response is missing security headers: " + join(missing, ", "),
        evidence: "Missing headers: " + join(missing, ", "),
        recommendation: "Add missing security headers to enhance client-side protection"
    }
}
```

### Active Rule: Detect SQL Injection

```rust
//! id: active-sqli-check
//! name: Active SQL Injection Detection
//! category: Injection
//! severity: high
//! enabled_by_default: false

fn check(flow) {
    if !host_is_http(flow) { return (); }

    let names = host_flow_query_names(flow);
    for name in names {
        let resp = host_inject_query(flow, name, "'");
        if host_resp_ok(resp) && host_resp_body_match(resp, "(?i)(SQL syntax|ORA-\\d{5})") {
            return #{
                title: "Parameter Triggers SQL Error",
                description: "Query param " + name + " with quote payload causes database error",
                evidence: "Param: " + name + ", payload: '",
                recommendation: "Use parameterized queries or input validation for " + name
            };
        }
    }
}
```

## Debugging

Edit scripts in the Plugins UI, select a target Flow, and click **Debug** to test rule execution without restarting the app.

## Hot Reload

After modifying `.rhai` files, click **Reload Scripts** in the Plugins UI. New rules take effect immediately.

## Best Practices

1. **Return early**: Add type checks at the start of functions to avoid unnecessary computation
2. **Provide evidence**: Include specific evidence in structured results for easier issue identification
3. **Test thoroughly**: Use the debug function to test both normal and anomalous traffic
4. **Reference built-in rules**: The 28 passive and 8 active built-in rules are excellent Rhai learning examples
5. **Watch performance**: Avoid complex regex matching inside loops

## Reference

- Host function API reference under the **Passive Rules** and **Active Rules** sections
- Built-in rule source code is in the workspace `plugins/scanner/builtins/` directory
