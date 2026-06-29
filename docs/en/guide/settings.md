# Settings

The Settings page uses a **left nav + content area** layout. After changing options, click **Save Settings** in the top-right corner to persist changes locally.

## Settings Tabs

| Tab | Description |
|-----|-------------|
| **General** | Theme, log level, body/WebSocket capture limits, workspace paths |
| **Proxy** | Listen port, bind address, upstream proxy |
| **Browser** | Default browser, custom path, incognito, CDP debug port |
| **Certificate** | CA path, export/regenerate, GM SPKI display |
| **License** | Import, request, and status (see [License & Activation](./license.md)) |
| **AI** | Chat model and extensions (see below) |
| **About** | App version |

::: tip Workspace paths
Under **General → Local Workspace**, view and open the app data root, config file, database, certificates, reports, and plugin directories.
:::

## General

| Option | Description |
|--------|-------------|
| Theme | Dark / Light / System / Custom (presets and color tuning) |
| Log level | Info or Debug |
| Max request body capture | MB, default 10 |
| Max WebSocket message capture | MB, default 1 |

## Proxy

| Option | Default | Description |
|--------|---------|-------------|
| Proxy port | `8080` | Local MITM listen port |
| Listen address | `127.0.0.1` | Bind IP |
| Upstream proxy | empty | Optional, e.g. `http://proxy.corp:8080` |

::: info Domain filtering
Domain exclude rules are configured in the **Forwarder** filter bar, not in Settings.
:::

## Browser

| Option | Description |
|--------|-------------|
| Default browser | Auto-detected Chrome / Firefox / Edge, etc. |
| Custom browser path | Override executable path |
| Incognito / private mode | Add privacy launch flags |
| Auto-clean profile on exit | Remove the current project's browser profile before each launch (`browser-profile/{projectId}/`); other projects are unaffected |
| Extra launch args | e.g. `--window-size=1280,720` |
| CDP remote debug port | Browser Agent entry for Chromium, often `9222` |

**Launch Browser** in the title bar injects proxy and certificate-related flags automatically.

## Certificate

| Action | Description |
|--------|-------------|
| View CA path | Generated on first proxy start |
| Export root CA | Export for OS/browser trust store |
| Regenerate CA | New key pair; reinstall required |
| CA key password | Optional, stored locally |
| GM SPKI fingerprint | SM3 display only; signing algorithm unchanged |

Platform install guides are shown on the **Certificate** tab.

## AI Configuration

AI settings split into **Chat Model** (inline on the main page) and **Extensions** (cards + modals).

### Chat Model

| Option | Description |
|--------|-------------|
| Active Provider | Provider used for chat |
| Model | Pick from list or type a custom model name |
| Max Tokens | Max tokens per reply |
| Temperature | Sampling temperature 0–2 |
| Tool round limit | Max consecutive tool calls per user message |
| Context window preview | Click **Re-resolve** for current model context limit |

### Extensions (modals)

Click a card to open a modal. Changes apply to the current draft immediately; click **Save Settings** to persist.

| Card | Contents |
|------|----------|
| **Provider** | API key, base URL, model list, default context tokens |
| **Embedding** | Vector model, dimensions, provider, test & enable |
| **MCP Servers** | Stdio / HTTP-SSE transport, reconnect status |
| **Dynamic Tools** | Shell subprocess tools, parameter schema |
| **AI Roles** | Built-in/custom personas, active role, prompt overrides |
| **Custom Skills** | Chat skill extensions, tool scope, auto context |
| **Advanced** | Unknown model context, Ollama `/api/show`, Python sandbox paths |

#### Embedding quick setup

1. Open the **Embedding** card
2. Choose provider, model, and dimensions (use **Apply suggestion** if available)
3. Click **Test connection**
4. Enable **Embedding**
5. Save settings

Knowledge base, vector memory, and chat RAG require a ready embedding configuration.

#### MCP example (Stdio)

In the **MCP Servers** modal:

| Field | Example |
|-------|---------|
| Name | `filesystem` |
| Transport | Stdio |
| Command | `npx` |
| Args | `-y, @modelcontextprotocol/server-filesystem, /path/to/dir` |

Save, then **Reconnect** in the modal to verify connected servers and tool counts.

## License

Use the **License** tab to view status, import a `.license` file, or generate a request. See **[License & Activation](./license.md)** for steps and security notes.

::: warning Do not share publicly
License and request files contain entitlement and device-related data. Exchange them only through private channels with your administrator—not public repos or forums.
:::

## Config file

Advanced options are stored in the app data directory and maintained when you save settings. **Manual editing is not recommended.** For bulk deployment or enterprise customization, contact support.

## Troubleshooting

### Settings not applied

1. Confirm **Save Settings** was clicked
2. Restart and set log level to Debug under General

### Certificate / HTTPS capture issues

1. Install CA into the **trusted root** store
2. Re-export after CA regeneration
3. Firefox uses a separate certificate store

### AI connection failures

1. Check API key and base URL in the Provider modal
2. Test Embedding before enabling it
3. Reconnect MCP servers and verify status in the modal
