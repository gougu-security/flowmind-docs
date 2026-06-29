# Declarative Plugin Development

Declarative plugins use YAML/JSON/TOML format to define scanning rules. No code required, suitable for simple pattern matching.

## Overview

- **Location**: `{app_data_dir}/plugins/scanner/<subdirectory>/`
- **Formats**: YAML, JSON, TOML
- **Suitable**: Simple pattern matching rules
- **Advantages**: Easy to write, no compilation

## Directory Structure

```
plugins/scanner/
├── my-rule/
│   ├── manifest.toml     # Plugin manifest
│   └── rules.yaml        # Rule definitions
└── ...
```

## Manifest File

```toml
api_version = 1
kind = "declarative"
id = "com.example.my_declarative_rule"
name = "Example Declarative Rule"
version = "0.1.0"
description = "Detect specific patterns"
rule_id = "com.example.pattern_detect"
rule_name = "Pattern Detection"
category = "Custom"
severity = "low"
rules_file = "rules.yaml"
```

## Rule Definition

### YAML Format

```yaml
rules:
  - id: detect_api_key
    name: "Detect API Key"
    description: "Detect API Key leak in requests"
    match:
      location: "request_headers"
      pattern: "(?i)(api[_-]?key|x[_-]?api[_-]?key)\\s*[:=]\\s*[\"']?[a-zA-Z0-9]{20,}"
      regex: true
    output:
      message: "API Key leak detected"
      severity: "high"
      cwe: "CWE-798"
      
  - id: detect_debug_mode
    name: "Detect Debug Mode"
    description: "Detect debug info in responses"
    match:
      location: "response_body"
      patterns:
        - "debug=true"
        - "DEBUG_MODE"
        - "stack trace"
      regex: false
    output:
      message: "Response contains debug info"
      severity: "medium"
      cwe: "CWE-215"
```

## Match Locations

| Location | Description |
|----------|-------------|
| `request_headers` | Request headers |
| `request_body` | Request body |
| `response_headers` | Response headers |
| `response_body` | Response body |
| `url` | Request URL |
| `method` | HTTP method |
| `status_code` | Status code |

## Match Patterns

### Exact Match

```yaml
match:
  location: "method"
  pattern: "DELETE"
  regex: false
```

### Regex Match

```yaml
match:
  location: "url"
  pattern: "/api/v[0-9]+/admin"
  regex: true
```

### Multiple Patterns

```yaml
match:
  location: "response_body"
  patterns:
    - "error"
    - "exception"
    - "stack trace"
  regex: false
  match_any: true
```

### Condition Combination

```yaml
match:
  conditions:
    - location: "method"
      pattern: "POST"
      regex: false
    - location: "url"
      pattern: "/api/login"
      regex: false
  match_all: true
```

## Output Configuration

### Basic Output

```yaml
output:
  message: "Security issue found"
  severity: "medium"
  cwe: "CWE-200"
```

### Dynamic Messages

Use placeholders:

```yaml
output:
  message: "Found sensitive info in {{location}}: {{match}}"
  severity: "high"
```

## Advanced Features

### Whitelist

Exclude known safe patterns:

```yaml
rules:
  - id: detect_internal_ip
    name: "Detect Internal IP"
    match:
      location: "response_body"
      pattern: "192\\.168\\.[0-9]+\\.[0-9]+"
      regex: true
      whitelist:
        - "192.168.1.1"
        - "192.168.0.1"
    output:
      message: "Internal IP address leak"
      severity: "low"
```

### Severity Mapping

```yaml
output:
  message: "Sensitive info found"
  severity_map:
    "password": "high"
    "token": "high"
    "key": "medium"
  default_severity: "low"
```

## Complete Example

```yaml
rules:
  - id: detect_password_in_url
    name: "Password in URL"
    description: "Detect password parameters in URL"
    match:
      location: "url"
      pattern: "[?&](password|passwd|pwd|secret)="
      regex: true
    output:
      message: "URL contains password parameter, may leak in logs"
      severity: "high"
      cwe: "CWE-598"
      
  - id: detect_jwt_token
    name: "JWT Token Leak"
    description: "Detect JWT Token in responses"
    match:
      location: "response_body"
      pattern: "eyJ[A-Za-z0-9_-]*\\.eyJ[A-Za-z0-9_-]*\\.[A-Za-z0-9_-]*"
      regex: true
    output:
      message: "Response contains JWT Token"
      severity: "high"
      cwe: "CWE-598"
```

## Best Practices

1. **Clear Naming**: Use descriptive IDs and names
2. **Regex Optimization**: Avoid overly complex regex
3. **Whitelisting**: Add whitelist for known safe patterns
4. **Thorough Testing**: Test edge cases
5. **Documentation**: Add clear descriptions

## Comparison with WASM

| Feature | Declarative | WASM |
|---------|-------------|------|
| Difficulty | Easy | Medium |
| Performance | Good | Excellent |
| Flexibility | Limited | Full |
| Use Case | Pattern matching | Complex logic |
| Compilation | None | Required |
