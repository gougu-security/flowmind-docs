# Installation & Getting Started

This chapter explains how to install and start FlowMind for the first time.

## Download & Install

### Download from GitHub Releases

1. Visit the [GitHub Releases](https://github.com/gougu-security/flowmind/releases) page
2. Download the installer for your operating system:
   - **Windows**: `FlowMind-x.x.x-x64-setup.exe`
   - **macOS**: `FlowMind-x.x.x.dmg`
   - **Linux**: `FlowMind-x.x.x.AppImage` or `.deb`

### Installation Steps

::: code-group
```bash [Windows]
# Double-click to run the installer
FlowMind-x.x.x-x64-setup.exe
```

```bash [macOS]
# Open DMG file, drag to Applications
open FlowMind-x.x.x.dmg
```

```bash [Linux]
# AppImage method
chmod +x FlowMind-x.x.x.AppImage
./FlowMind-x.x.x.AppImage

# Debian/Ubuntu method
sudo dpkg -i flowmind_x.x.x_amd64.deb
```
:::

## First Launch

### 1. Start the Application

Double-click the application icon to start FlowMind. On first launch, the application will:

- Initialize the local database (SQLite)
- Generate CA root certificate (for HTTPS decryption)
- Extract built-in scan rule scripts to workspace
- Load default configuration

### 2. Interface Overview

After launching, you'll see the main interface with these areas:

- **Title Bar**: Project switcher, proxy control, browser launcher, settings
- **Navigation**: Forwarder, Interceptor, Repeater, Fuzzer, Plugins, AI, Reports
- **Main Content**: The current module's working area
- **Status Bar**: Proxy status, connection count, log entry

### 3. Start Proxy

1. Click the **Start Proxy** button in the title bar
2. Default listening on `127.0.0.1:8080`
3. Status bar shows proxy running status

### 4. Configure Browser Proxy

Set your browser proxy to point to FlowMind:

| Setting | Value |
|---------|-------|
| HTTP Proxy | `127.0.0.1:8080` |
| HTTPS Proxy | `127.0.0.1:8080` |
| SOCKS Proxy | Not used |

::: tip One-Click Browser Launch
FlowMind supports one-click browser launch. Click the **Launch Browser** button in the title bar to automatically configure proxy and open browser.
:::

### 5. Install CA Certificate

To properly decrypt HTTPS traffic, you need to install FlowMind's CA certificate:

1. Go to **Settings** → **Certificate Management**
2. Click **Export CA Certificate**
3. Import the certificate into your system or browser's trusted certificate store

::: warning Security Note
The CA certificate is only for local development and testing environments. Do not use in production or untrusted networks.
:::

## Next Steps

Once the above steps are complete, the proxy will start capturing traffic. We recommend exploring features in this order:

1. **[Forwarder](./forwarder.md)**: View captured traffic and request details
2. **[Repeater](./repeater.md)**: Replay and test requests
3. **[Plugins](./plugins.md)**: Manage scan rules and tag scripts
4. **[AI Features](./ai.md)**: Use AI for security analysis
5. **[Projects](./projects.md)**: Isolate test data by project
6. **[Reports](./reports.md)**: Generate test reports
