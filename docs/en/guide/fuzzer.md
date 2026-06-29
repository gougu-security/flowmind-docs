# Fuzzer

The Fuzzer performs controlled mutation testing on HTTP requests to automatically discover potential security vulnerabilities.

## Overview

- **Multi-strategy Mutation**: Supports IDOR, Auth Strip, Header wordlists, etc.
- **Concurrency Control**: Configurable concurrency and request rate
- **Result Filtering**: Filter by status code, length, keywords
- **Baseline Comparison**: Automatically compare with original request

## Interface Layout

```
┌─────────────────────────────────────────────────────────┐
│  Task Config (Strategy selection, concurrency, rate)     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Request Editor (Original request + mutation preview)    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Results List (Status code, length, duration, diff)     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Send to Fuzzer

### From Forwarder

1. Select request in Forwarder list
2. Right-click → **Send to Fuzzer**

### From Repeater

1. Edit request in Repeater
2. Right-click → **Send to Fuzzer**

### Manual Paste

1. Go to Fuzzer page
2. Paste raw HTTP request
3. Fill connection info (Host, Port, TLS)

## Mutation Strategies

### IDOR Numeric Mutation

Identify numeric parameters in URL, generate adjacent value variants:

```
Original: /api/users/123
Mutations: /api/users/122, /api/users/124, /api/users/100, ...
```

| Option | Description | Default |
|--------|-------------|---------|
| Range | ±N range | 10 |
| Max Cases | Maximum mutations | 100 |

### Auth Strip

Remove or clear authentication-related headers:

```
Remove: Authorization
Remove: Cookie
Clear: X-API-Key
```

### Header Wordlist Injection

Inject predefined wordlists into specified headers:

```
Wordlist: admin, test, debug, backup, ...
Targets: X-Forwarded-For, X-Real-IP
```

### Combined Strategies

Support combining multiple strategies:

```
Strategy 1: IDOR numeric mutation (path parameter)
Strategy 2: Auth Strip (remove Authorization)
```

## Task Configuration

### Basic Settings

| Option | Description | Default |
|--------|-------------|---------|
| Concurrency | Simultaneous requests | 3 |
| Request Interval | Interval between requests | 100ms |
| Single Timeout | Single request timeout | 10s |
| Fail Retry | Retries on network failure | 0 |

### Rate Limiting

| Mode | Description |
|------|-------------|
| Token Bucket | Smooth rate control |
| Fixed Interval | Fixed time interval |

### Baseline Testing

- [x] Send original request as baseline first
- [x] Results automatically compared with baseline

## Execute Task

### Start Task

1. Configure strategy and parameters
2. Click **Start** button
3. Task begins execution

### Task Status

| Status | Description |
|--------|-------------|
| Pending | Task created, waiting to execute |
| Running | Sending requests |
| Completed | All requests sent |
| Cancelled | User cancelled |
| Failed | Execution error |

### Cancel Task

Click **Cancel** button:

- Queued requests won't be sent
- In-flight requests wait to complete
- Results marked as "cancelled"

## Result Analysis

### Results List

| Field | Description |
|-------|-------------|
| Case ID | Mutation case number |
| Status Code | HTTP response status code |
| Response Length | Response body size |
| Duration | Request duration |
| Diff | Difference with baseline |

### Filtering

| Dimension | Description |
|-----------|-------------|
| Status Code | Filter by status (e.g., 401, 403, 500) |
| Response Length | Filter by length range |
| Keywords | Response body contains specific keywords |
| Duration | Filter by duration range |

### Difference Highlighting

Auto-highlight differences:

- Status code changes
- Response length change > 10%
- Response time anomalies

## Use Cases

### IDOR Testing

```
1. Capture /api/users/{id} request
2. Select IDOR numeric mutation strategy
3. Configure range
4. Execute task
5. Filter 200 status results
6. Verify access to other user data
```

### Authentication Bypass

```
1. Capture authenticated request
2. Select Auth Strip strategy
3. Execute task
4. Observe response without auth
5. Filter non-401/403 results
```

## Notes

::: warning Responsible Use
- Only test authorized targets
- Control request rate
- Comply with laws and regulations
:::

::: tip Performance
- Start with concurrency of 3
- Set reasonable intervals
- Use filtering for large results
:::
