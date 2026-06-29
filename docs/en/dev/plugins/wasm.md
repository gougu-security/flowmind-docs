# WASM Plugin Development

WASM plugins use WebAssembly technology to allow developers to write high-performance scanning rules using Rust, C/C++, and other languages.

## Overview

- **Location**: `{app_data_dir}/plugins/scanner/<subdirectory>/`
- **Runtime**: Wasmtime
- **Interface**: `check_flow` export function
- **Limits**: No WASI (no filesystem, no network)

## Directory Structure

```
plugins/scanner/
├── my-plugin/
│   ├── manifest.toml     # Plugin manifest
│   └── plugin.wasm       # WASM module
└── ...
```

## Manifest File

```toml
api_version = 1
kind = "wasm"
id = "com.example.my_scan_plugin"
name = "Example Scan Plugin"
version = "0.1.0"
description = "Optional description"
rule_id = "com.example.my_scan_rule"
rule_name = "Example Rule Display Name"
category = "Custom"
severity = "low"
wasm_file = "plugin.wasm"
```

### Field Description

| Field | Required | Description |
|-------|----------|-------------|
| `api_version` | Yes | Currently only `1` |
| `kind` | Yes | Must be `wasm` |
| `id` | Yes | Plugin package ID |
| `name` | Yes | Package display name |
| `version` | No | Version string, default `0.0.0` |
| `description` | No | Package description |
| `rule_id` | Yes | Finding.rule_id, must be unique |
| `rule_name` | Yes | Finding.rule_name |
| `category` | Yes | Finding.category |
| `severity` | Yes | `high` / `medium` / `low` / `info` |
| `wasm_file` | No | WASM filename, default `plugin.wasm` |

## WASM ABI

### Exported Symbols

| Symbol | Description |
|--------|-------------|
| `memory` | WebAssembly Memory |
| `check_flow(in_ptr: i32, in_len: i32) -> i64` | Scan entry point |
| `dealloc_result(ptr: i32, len: i32)` | Optional, free return buffer |

### Input Format

Host serializes Flow as UTF-8 JSON into guest linear memory:

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
  "responseBody": "{\"users\": [...]}"
}
```

### Output Format

`check_flow` returns i64, high 32 bits pointer, low 32 bits length. Points to UTF-8 JSON:

```json
{
  "matched": true,
  "message": "Found sensitive info: Authorization header contains Bearer Token",
  "evidence": "Authorization: Bearer token123",
  "severity": "medium",
  "cwe": "CWE-200"
}
```

## Rust Example

### Cargo.toml

```toml
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

### Implementation

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
    let input = unsafe { std::slice::from_raw_parts(in_ptr, in_len) };
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
    
    let result = scan_flow(&flow);
    encode_result(result)
}

fn scan_flow(flow: &Flow) -> ScanResult {
    if let Some(headers) = &flow.request_headers {
        if let Some(auth) = headers.get("Authorization") {
            if auth.starts_with("Bearer ") {
                return ScanResult {
                    matched: true,
                    message: Some("Found Bearer Token".to_string()),
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
    unsafe { let _ = Vec::from_raw_parts(ptr, len, len); }
}
```

### Build

```bash
# Add WASM target
rustup target add wasm32-unknown-unknown

# Build
cargo build --target wasm32-unknown-unknown --release
```

## Best Practices

1. **Stable Rule ID**: Don't modify rule_id after release
2. **Performance**: WASM outperforms declarative for complex logic
3. **Error Handling**: Gracefully handle malformed input
4. **Documentation**: Add clear descriptions in manifest
5. **Testing**: Test thoroughly before release
