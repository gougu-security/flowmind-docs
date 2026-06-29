# Interceptor

The Interceptor allows you to intercept, modify, and control in-flight HTTP requests in real-time.

## Overview

The Interceptor provides the following capabilities:

- **Hold**: Pause requests, wait for manual release
- **Modify**: Modify request content before release
- **Drop**: Discard requests, don't send to target server

## Enable Interceptor

1. Go to **Interceptor** page
2. Click **Enable Interception** switch
3. Configure interception rules (optional)

## Interception Rules

### By Method

Select HTTP methods to intercept:

- [x] GET
- [x] POST
- [ ] PUT
- [ ] DELETE
- [ ] Other

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

When requests are intercepted, they enter the queue:

| Field | Description |
|-------|-------------|
| Method | HTTP method |
| URL | Request URL |
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

## Use Cases

### Security Testing

```
Scenario: Test API parameter tampering

1. Enable interceptor
2. Trigger target request
3. Modify request parameters in queue
4. Release modified request
5. Observe response
```

### Debugging

```
Scenario: Debug frontend requests

1. Intercept target API by domain
2. View request details
3. Modify request headers to add debug info
4. Release request
```

## Notes

::: warning Performance Impact
Enabling interceptor significantly reduces network performance. Only enable when needed.
:::

::: tip Auto Timeout
Intercepted requests timeout after 60 seconds. Process queue promptly.
:::
