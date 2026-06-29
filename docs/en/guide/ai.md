# AI Features

FlowMind is an AI-Native security platform that integrates multiple AI capabilities to help security testers more efficiently discover and validate vulnerabilities.

## Feature Overview

| Feature | Description |
|---------|-------------|
| AI Chat | Multi-provider conversation with streaming output |
| Tool Calling | AI can call built-in tools to query Flows, Findings, etc. |
| Knowledge Base | RAG retrieval, import documents to build knowledge base |
| Security Memory | Automatically record target characteristics, vulnerabilities, attack patterns |
| Agent Analysis | Multi-agent collaboration for security analysis |
| Attack Graph | Visualize attack paths and risk propagation |

## AI Page

Go to **AI** page, which includes the following tabs:

| Tab | Function |
|-----|----------|
| Context | AI conversation context configuration |
| Memory | Security memory system |
| Knowledge Base | Knowledge base management |
| Sessions | AI conversation sessions |
| Agents | Multi-agent security analysis |
| Attack Map | Attack graph visualization |

## AI Chat

### Configure Provider

Go to **Settings → AI**:

1. Choose active Provider and model under **Chat Model**
2. Open the **Provider** card to set API key, base URL, and model list
3. Optionally configure **Embedding**, **MCP Servers**, **AI Roles**, etc.
4. Click **Save Settings** in the top-right corner

See [Settings](./settings.md#ai-configuration) for details.

### Send Message

1. Type question in chat box
2. Click send or press Enter
3. AI returns response with streaming

### Send Flow to AI

1. Select request in Forwarder
2. Right-click → **Send to AI**
3. AI automatically analyzes the request

## Tool Calling

AI can **automatically use built-in capabilities** during chat (e.g. query traffic, review findings, decode tokens, run scans). What is available depends on Skill, role, and license—see the UI.

### Example prompts

- “What API endpoints appear in this project?”
- “Summarize recent high-severity findings”
- “Explain the JWT in this request”

Describe your goal in natural language; the assistant invokes capabilities as needed.

## Security Memory

The app records useful project-scoped information (targets, assets, identities, findings, attack paths) for later retrieval in chat. Manage entries under **AI → Memory**.

Embedding improves memory and knowledge-base search (see [Settings](./settings.md)).

## Agent Analysis

Under **AI → Agents** (or related entry points), run multi-step tasks such as traffic review, auth analysis, finding summaries, or attack-path reasoning. Use natural-language prompts, e.g. “Run a comprehensive security review of this project.”

## Attack Graph

### Node Types

| Node Type | Color | Description |
|-----------|-------|-------------|
| Endpoint | Blue | API endpoint |
| Identity | Purple | User/Identity |
| Credential | Yellow | Token/Credential |
| Vulnerability | Red | Vulnerability |
| Data | Green | Data/Resource |

### Edge Types

| Edge Type | Description |
|-----------|-------------|
| CanAccess | Can access |
| Exploits | Exploitation relationship |
| LeaksTo | Leaks to |
| EscalatesTo | Privilege escalation to |

### Usage

1. Switch to **Attack Map** tab
2. View node and edge visualization
3. Click node for details
4. View attack path suggestions

## Smart Replay & Fuzz Hints

AI can suggest **replay steps** or **fuzz ideas** based on selected flows. Execute actions in Repeater/Fuzzer; describe the endpoint and goal in chat to get strategy suggestions.

## Best Practices

1. **Understand the target first** — e.g. ask AI to summarize architecture and authentication from current traffic
2. **Use memory and knowledge base** — import specs or notes, then ask questions in project context
3. **Analyze → map → verify** — chat/Agents for hypotheses, Attack Map for paths, Repeater/Fuzzer for validation
4. **Archive outcomes** — export reports or clips for your team

## Configuration Options

### Provider Configuration

| Option | Description |
|--------|-------------|
| Provider | AI service provider |
| API Key | Authentication key |
| Model | Model to use |
| Temperature | Creativity parameter |

### Context Configuration

| Option | Description |
|--------|-------------|
| Max Tokens | Maximum token count |
| Context Window | Context window size |
| Include Flows | Whether to include Flow data |
| Include Findings | Whether to include Finding data |
