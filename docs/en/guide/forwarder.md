# Forwarder

The Forwarder is the core interface of FlowMind for real-time viewing and analyzing proxied HTTP/HTTPS/WebSocket traffic.

## Interface Layout

```
┌─────────────────────────────────────────────────────────┐
│  Filter Bar (Method, Status, Search, Domain filters)    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Traffic List (Virtual scrolling, supports large data)  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Detail Panel (Overview, Request, Response, WS, TLS)   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Traffic List

### Column Information

| Column | Description |
|--------|-------------|
| Method | HTTP method (GET, POST, PUT, etc.) |
| URL | Full request URL |
| Status | HTTP response status code |
| Size | Response body size |
| Duration | Request duration (ms) |
| Time | Request timestamp |

## Filtering

### Method Filter

Select specific HTTP methods to filter:

- GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS

### Status Code Groups

Filter by status code range:

| Group | Range |
|-------|-------|
| Information | 1xx |
| Success | 2xx |
| Redirection | 3xx |
| Client Error | 4xx |
| Server Error | 5xx |

### Search Filter

Enter keywords in the search box to match:

- URL
- Request/Response header names and values
- Request/Response body content

## Detail Panel

After selecting traffic, the detail panel shows these tabs:

### Overview

Displays basic request information:

- Request method and URL
- Status code and response size
- Request/Response time
- Client and server addresses

### Request

- **Headers**: Complete request headers
- **Body**: Request body content (supports JSON, form, raw format)

### Response

- **Headers**: Complete response headers
- **Body**: Response body content (supports JSON, HTML, raw format)

### WebSocket

Only shown for WebSocket traffic:

- **Messages**: All WebSocket messages
- **Details**: Selected message content preview

### TLS

Displays TLS/SSL connection information:

- Protocol version
- Cipher suite
- Certificate information
- SNI (Server Name Indication)

## Context Menu

Right-click in the traffic list to:

| Action | Description |
|--------|-------------|
| Send to Repeater | Send request to Repeater for replay |
| Send to Fuzzer | Send request to Fuzzer for testing |
| Send to AI | Send request to AI for analysis |
| Copy URL | Copy request URL |
| Copy cURL | Copy as cURL command |
| Remove from List | Remove from current list (doesn't delete data) |

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl/⌘ + F` | Focus search box |
| `Ctrl/⌘ + K` | Clear filter conditions |
| `Delete` | Delete selected traffic |
| `Ctrl/⌘ + A` | Select all |
| `↑` `↓` | Switch selected item |
