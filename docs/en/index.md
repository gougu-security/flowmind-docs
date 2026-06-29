---
layout: home

hero:
  name: FlowMind
  text: AI-Native Application Security Platform
  tagline: An integrated security workbench combining MITM proxy, traffic analysis, fuzzing, security scanning, and AI reasoning
  image:
    src: /logo.svg
    alt: FlowMind
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: User Guide
      link: /en/guide/
    - theme: alt
      text: GitHub
      link: https://github.com/gougu-security/flowmind

features:
  - icon: 🔍
    title: Smart Proxy Capture
    details: Built-in Rust MITM engine with real-time HTTP/HTTPS/WebSocket capture, automatic CA certificate management, and detailed traffic inspection
  - icon: 🔄
    title: Traffic Forwarding & Interception
    details: Real-time forwarder list, request detail panel, Hold/Modify/Drop interception control for precise request handling
  - icon: 🎯
    title: Request Replay & Fuzzing
    details: Support for raw request replay, structured editing, and multi-strategy fuzzing (IDOR/Auth Strip/Header wordlists)
  - icon: 🛡️
    title: Security Scanning Engine
    details: Built-in passive scanning rules with WASM/declarative workspace plugins for automatic detection of sensitive info, cookie security, transport security issues
  - icon: 🤖
    title: AI Security Analysis
    details: Multi-provider chat, Tool Calling, MCP protocol, Knowledge Base/RAG, Security Memory, and Attack Graph
  - icon: 📊
    title: Project Management & Reports
    details: Project-level data isolation, content clipping, JSON/PDF report export for easy security testing management
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #6366f1 30%, #06b6d4);
}
</style>

## Tech Stack

| Layer | Technology |
|-------|------------|
| Desktop Framework | Cross-platform desktop app |
| Frontend | Modern web stack |
| Backend | High-performance native engine |
| AI | Multi-provider chat, tools, vector search & knowledge base |
| Data Storage | Local database |

## Why Choose FlowMind?

### 🚀 High Performance

Built-in Rust-based proxy engine with no external dependencies. Virtual list technology ensures smooth browsing of massive traffic data.

### 🔒 Secure & Reliable

All data is stored locally by default. Commercial features are managed via in-app licensing; policy details are not published in public docs.

### 🧠 AI-Native

Deep AI integration with multi-provider support, tool calling, knowledge base retrieval, security memory, and attack graph analysis.

### 🔌 Extensible

Support for WASM and declarative YAML plugins to easily extend scanning rules for customized needs.

## Community

- [GitHub Issues](https://github.com/gougu-security/flowmind/issues) - Report product issues and suggestions
- [Docs Issues](https://github.com/gougu-security/flowmind-docs/issues) - Report documentation issues
- [Contributing Guide](./dev/contributing.md) - Contribute to documentation
