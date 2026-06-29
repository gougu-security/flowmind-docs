# Contributing Guide

Thank you for your interest in FlowMind. The **host application is commercially closed source**; this repository (`flowmind-docs`) hosts public user documentation and plugin development guides.

## How You Can Contribute

| Type | Description | Source access required |
|------|-------------|------------------------|
| Docs & i18n | Improve user guides and plugin docs | No |
| Scan plugins | Share WASM / declarative rule examples | No (see plugin docs) |
| Feedback | Issues in this docs repo | No |
| Host application | Core proxy, AI, licensing, etc. | **Yes** (contact maintainers) |

::: warning Confidentiality
Do not paste host source code, IPC lists, database schemas, or licensing implementation details in public issues, PRs, or docs.
:::

## Documentation Workflow

### 1. Fork and clone

```bash
git clone https://github.com/gougu-security/flowmind-docs.git
cd flowmind-docs
pnpm install
```

### 2. Local preview

```bash
pnpm dev
```

Open `http://localhost:4174/`, edit Markdown under `docs/`, then open a PR.

### 3. Build verification

```bash
pnpm build
pnpm preview
```

### 4. Open a Pull Request

1. Create a branch: `git checkout -b docs/your-topic`
2. Keep Chinese and English docs in sync when applicable
3. Open a PR on [flowmind-docs](https://github.com/gougu-security/flowmind-docs)

## Public contribution: scan plugins

Plugin extensions do not require host internals. See:

- [WASM Plugins](./plugins/wasm.md)
- [Declarative Plugins](./plugins/declarative.md)

Validate in the in-app plugin workspace, then share rule packs or doc improvements through agreed channels.

## Authorized contribution: host application

Changes to the host app require **maintainer authorization** and internal onboarding. Public docs do **not** include host repo paths, build commands, or internal module layouts.

## Commit messages (suggested)

```
<type>(<scope>): <description>
```

| Type | Description |
|------|-------------|
| `docs` | Documentation update |
| `fix` | Doc error or link fix |
| `chore` | Build/tooling |

Examples:

```
docs(guide): update proxy setup instructions

docs(en): sync getting-started with Chinese version
```

## Pull Request guidelines

- Summarize changes and the intended audience (users / plugin authors)
- Note when Chinese and English are updated together
- At least one maintainer review is required

## Documentation and security

Public docs target **end users** and **plugin authors**:

- Do **not** publish host Rust/TypeScript implementation, IPC commands, internal types, or database schemas
- **Licensing**: describe in-app flows only, not verification algorithms or file formats
- **Plugin exception**: WASM / declarative plugin docs may include plugin-side examples
- Use placeholders for credentials in examples

If unsure whether content is appropriate, note the audience in your PR for maintainer review.

## Community

- **Docs issues**: [gougu-security/flowmind-docs](https://github.com/gougu-security/flowmind-docs/issues)
- **Product feedback**: [gougu-security/flowmind](https://github.com/gougu-security/flowmind/issues)

## License

Documentation contributions are released under the [Apache License 2.0](https://github.com/gougu-security/flowmind-docs/blob/main/LICENSE).
