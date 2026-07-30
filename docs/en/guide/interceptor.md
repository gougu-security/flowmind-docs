# Interceptor

The Interceptor allows you to intercept, modify, and control in-flight HTTP requests and responses in real-time.

## Overview

The Interceptor provides the following capabilities:

- **Hold**: Pause requests or responses, wait for manual release
- **Modify**: Modify content before release
- **Drop**: Discard requests, don't send to target server or client

## Enable Interceptor

1. Go to **Interceptor** page
2. Click **Enable Interception** switch
3. Configure interception rules (optional)

Once enabled, all matching requests will be paused in the interception queue awaiting processing.

## Interception Rules

### By Method

Select HTTP methods to intercept:

- GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS

### By Domain

Configure domain list to intercept:

```
api.example.com
*.internal.company.com
```

### By Path

Use regex to match paths:

```
^/api/v1/users
^/admin/
```

## Interception Queue

When requests or responses are intercepted, they enter the queue:

| Field | Description |
|-------|-------------|
| Method | HTTP method |
| URL | Request URL |
| Direction | Request / Response |
| Status | Waiting / Modified / Released / Dropped |
| Intercept Time | Time request was intercepted |

## Operations

### View Details

Click request in queue to view full details:

- Request headers
- Request body
- Raw message

### Modify Request

1. Select request to modify
2. Click **Edit** button
3. Modify request content
4. Click **Save Changes**

### Release Request

- **Release**: Send request (possibly modified) to target server
- **Batch Release**: Select multiple requests, release at once

### Drop Request

- **Drop**: Discard request, client will receive timeout or error
- **Batch Drop**: Select multiple requests, drop at once

## Response Interception

In addition to request interception, the interceptor also supports intercepting responses from the server:

1. After the request reaches the target server, the response is intercepted on its way back
2. Response headers or body can be modified before release
3. Useful for debugging response content and testing client behavior

## Use Cases

### Parameter Tampering Testing

```
1. Enable interceptor
2. Trigger target API request
3. Modify request parameters in queue
4. Release modified request
5. Observe server response
```

### Response Modification Debugging

```
1. Enable interceptor (including response interception)
2. Trigger request
3. Modify response data in interceptor
4. Release modified response
5. Observe client behavior
```

### Request Blocking

```
1. Configure domain or path interception rules
2. Matching requests auto-enter queue
3. Drop unwanted requests
4. Client receives connection error
```

## Notes

::: warning Performance Impact
Enabling interceptor significantly reduces network performance. Only enable when needed.
:::

::: tip Auto Timeout
Intercepted requests timeout after 60 seconds. Process queue promptly.
:::
