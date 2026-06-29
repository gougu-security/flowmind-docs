# Repeater

The Repeater is used for replaying historical requests or manually modifying and resending them. It's an important tool for security testing and API debugging.

## Overview

- **Request Replay**: Quick replay based on existing requests
- **Raw Editing**: Directly edit HTTP raw messages
- **Structured Editing**: Visually edit request parts
- **Replay History**: Save request tabs for repeated testing

## Interface Layout

```
┌─────────────────────────────────────────────────────────┐
│  Tab Bar (Request tab switching)                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │                     │  │                     │      │
│  │  Request Editor     │  │  Response Display   │      │
│  │                     │  │                     │      │
│  └─────────────────────┘  └─────────────────────┘      │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Connection Info (Host, Port, TLS)                      │
└─────────────────────────────────────────────────────────┘
```

## Send to Repeater

### From Forwarder

1. Select request in Forwarder list
2. Right-click → **Send to Repeater**
3. Request loads into new tab

### Manual Creation

1. Click **+** button in tab bar
2. Manually enter request content

## Edit Request

### Raw Mode

Directly edit HTTP raw message:

```http
GET /api/users HTTP/1.1
Host: example.com
Authorization: Bearer token123
Accept: application/json
```

### Structured Mode

Visually edit each part:

| Part | Editable Content |
|------|------------------|
| Request Line | Method, Path, Protocol Version |
| Headers | Add, Modify, Delete headers |
| Body | JSON, Form, Raw content |
| Connection | Host, Port, TLS toggle |

## Send Request

### Basic Send

1. Edit request content
2. Click **Send** button
3. Response displays in right panel

### Connection Configuration

| Option | Description |
|--------|-------------|
| Host | Target server address |
| Port | Target server port |
| TLS | Whether to use HTTPS |

::: tip
Connection config overrides Host header value, used for testing different environments.
:::

## Response View

### Response Overview

- Status code
- Response size
- Response time

### Response Headers

Complete response header list

### Response Body

Multiple view formats:

- **Pretty**: Formatted display (JSON, XML, etc.)
- **Raw**: Original content
- **Hex**: Hexadecimal view

## Tab Management

### Save Tab

1. Edit request
2. Click **Save** button
3. Enter tab name

### Manage Tabs

| Action | Description |
|--------|-------------|
| Rename | Right-click tab → Rename |
| Delete | Right-click tab → Delete |
| Copy | Right-click tab → Copy |

## Use Cases

### API Debugging

```
1. Capture API request from Forwarder
2. Send to Repeater
3. Modify request parameters
4. Resend, observe response
5. Repeat until correct
```

### Authentication Testing

```
1. Capture authenticated request
2. Modify Authorization header
3. Test different token permissions
4. Verify authentication mechanism
```

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl/⌘ + Enter` | Send request |
| `Ctrl/⌘ + S` | Save tab |
| `Ctrl/⌘ + N` | New tab |
| `Ctrl/⌘ + W` | Close current tab |
