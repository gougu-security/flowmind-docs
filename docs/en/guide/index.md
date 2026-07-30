# FlowMind User Guide

Welcome to FlowMind! This guide will help you get started with this AI-Native Application Security Platform.

## What is FlowMind?

### Goal

FlowMind aims to be a **unified desktop workbench** for security practitioners, eliminating the friction of switching between multiple tools for proxy capture, traffic analysis, and security testing. It consolidates the core workflows of penetration testing and security auditing into a single native desktop application, allowing security professionals to focus on finding issues rather than managing tools.

### Benefits

- **Full Penetration Testing Lifecycle**: Capture traffic → discover vulnerabilities → verify with replay → fuzz test → classify & record → export reports, all in one tool
- **Comprehensive Coverage**: 28 passive rules + 8 active rules covering OWASP Top 10 risks, with Rhai scripting for custom detection logic
- **AI-Native**: Multi-provider AI integration, agent orchestration, RAG knowledge base, and attack graph analysis, natively designed to uncover business logic vulnerabilities
- **Vulnerability Tracking**: Classify each finding as confirmed, fixed, or ignored; add notes and evidence to build an auditable vulnerability ledger
- **Beautiful Report Export**: Built-in report editor with content clipping and annotations, one-click export to structured JSON and polished HTML reports for professional delivery

![FlowMind forwarder interface](/screenshots/forwarder-home.png)

## System Requirements

| Item | Requirement |
|------|-------------|
| OS | Windows 10+, macOS 11+, Linux (Ubuntu 20.04+) |
| Memory | 4GB RAM (8GB+ recommended) |
| Disk Space | 500MB+ |
| Browser | Chrome, Firefox, Safari, Edge (for proxy configuration) |

## Quick Navigation

<div class="tip custom-block" style="padding-top: 8px">

Want to get started quickly? Check out the [Installation](./getting-started.md) section.

</div>

### Core Features

- [Proxy](./proxy.md) - Proxy engine configuration and usage
- [Forwarder](./forwarder.md) - Real-time traffic viewing and filtering
- [Interceptor](./interceptor.md) - Request interception and modification
- [Repeater](./repeater.md) - Request replay and debugging
- [Fuzzer](./fuzzer.md) - Fuzz testing configuration and execution

### Advanced Features

- [Plugins](./plugins.md) - Security scanning rules and tag scripts
- [AI Features](./ai.md) - AI security analysis capabilities
- [Projects](./projects.md) - Project isolation and context management
- [Reports](./reports.md) - Test report generation

### Configuration

- [Settings](./settings.md) - Application configuration options
- [License & Activation](./license.md) - Import and request workflow

## Getting Help

If you encounter issues, you can get help through:

1. **Documentation**: Browse the sections of this guide
2. **GitHub Issues**: [Report product issues](https://github.com/gougu-security/flowmind/issues)
3. **Docs Issues**: [Report documentation issues](https://github.com/gougu-security/flowmind-docs/issues)
