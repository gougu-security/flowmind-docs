# Contributing

Thank you for your interest in FlowMind. The **host application is proprietary**; the public repository primarily hosts user/plugin documentation and community collaboration.

## How you can contribute

| Type | Description | Source access required |
|------|-------------|------------------------|
| Docs & i18n | Improve `docs-site/` guides and plugin docs | No |
| Scan plugins | WASM / declarative rule samples or fixes | No (see plugin docs) |
| Feedback | GitHub Issues / Discussions | No |
| Host app | Core proxy, AI, licensing, etc. | **Yes** (contact maintainers) |

::: warning Confidentiality
Do not paste host source, IPC lists, database schemas, or licensing implementation details in public issues, PRs, or docs.
:::

## Public contribution: documentation site

To edit public docs only:

```bash
git clone https://github.com/G3G4X5X6/mitm-scanner.git
cd mitm-scanner/docs-site
pnpm install
pnpm dev
```

Open `http://localhost:4174/`, edit Markdown under `docs-site/docs/`, then open a PR.

## Public contribution: scan plugins

Plugin extensions do not require host source access:

- [WASM plugins](./plugins/wasm.md)
- [Declarative plugins](./plugins/declarative.md)

Validate packs in the in-app plugin workspace, then share via agreed channels or doc PRs.

## Authorized contribution: host application

Building the full desktop app, changing `src/` / `src-tauri/`, or running integration tests requires **maintainer authorization** and internal onboarding (toolchain, Tauri build, standards, CI). Those commands and layouts are **not** in public docs.

## Code standards (authorized contributors)

Internal repos follow Conventional Commits, ESLint, `rustfmt` / `clippy`, etc. For public PRs touching only `docs-site/`, keep Markdown clear and sync locales when applicable.

### Commit messages (suggested)

```
<type>(<scope>): <description>
```

Types:

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Refactoring |
| `perf` | Performance |
| `test` | Testing |
| `chore` | Build/tools |

Example:

```
feat(proxy): add WebSocket message filtering

fix(scanner): handle null response body

docs(readme): update installation instructions
```

## Development Flow

### 1. Fork Repository

Click Fork button on GitHub page

### 2. Clone Locally

```bash
git clone https://github.com/your-username/mitm-scanner.git
cd mitm-scanner
```

### 3. Create Branch

```bash
# Create and switch to new branch
git checkout -b feature/my-feature

# Or fix branch
git checkout -b fix/my-fix
```

### 4. Develop & Test

```bash
# Develop
npm run dev

# Run tests
npm run test

# Lint
npm run lint
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat(module): add new feature"
```

### 6. Push to Remote

```bash
git push origin feature/my-feature
```

### 7. Create Pull Request

1. Visit GitHub repository page
2. Click "Compare & pull request"
3. Fill PR description
4. Wait for code review

## Pull Request Guidelines

### PR Description Template

```markdown
## Description

Brief description of changes

## Change Type

- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring
- [ ] Other

## Testing

Describe how to test these changes

## Screenshots (if applicable)

Add relevant screenshots

## Related Issues

Closes #123
```

### Code Review

- At least one maintainer review required
- All automated checks must pass
- Resolve all review comments

### Merge Strategy

- Use "Squash and merge"
- Keep commit history clean
- Auto-close related Issues

## Project Structure

The FlowMind **host codebase is proprietary**. Directory layout and module names are not published. Authorized contributors receive internal onboarding material.

Public docs cover **docs-site** (user/plugin documentation) only. Do not paste host `src/` or `src-tauri/` trees or core source in issues or PRs.

## Testing

### Frontend Tests

```bash
# Run all tests
npm run test

# Run tests (single)
npm run test:run

# Coverage
npm run test:coverage
```

### Backend Tests

Authorized contributors run the Rust test suite per internal docs. Public docs do not list crate paths or command details.

## Documentation

### Code Documentation

- Rust uses `///` doc comments
- TypeScript uses JSDoc
- Exported APIs must have docs

### Design Documents

- Place in `docs/` directory
- Use Markdown format
- Include architecture diagrams (Mermaid)

### User Documentation

- Place in `docs-site/` directory
- Use VitePress format
- Support Chinese and English

## Issue Reporting

### Bug Report

Use Issue template:

```markdown
## Description

Brief description of issue

## Steps to Reproduce

1. Open '...'
2. Click '...'
3. Scroll to '...'
4. See error

## Expected Behavior

Describe expected behavior

## Actual Behavior

Describe actual behavior

## Environment

- OS: [e.g. macOS 14]
- FlowMind Version: [e.g. 0.3.0]
- Browser: [e.g. Chrome 120]
```

### Feature Request

Use Feature Request template:

```markdown
## Feature Description

Brief description of desired feature

## Use Case

Describe use case

## Suggested Implementation

Describe suggested implementation (optional)
```

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Community discussions
- **Pull Requests**: Code contributions

### Code of Conduct

- Respect others
- Constructive discussion
- Accept different viewpoints
- Comply with laws

## Documentation & Security

The public docs site (`docs-site/`) targets end users and **plugin authors** only. When writing or editing docs:

- **Host application code**: Do not publish Rust/TypeScript from the main app, IPC command lists, internal types, database schemas, or repo directory trees.
- **Licensing**: In-app flows only; no algorithms, file formats, or verification logic.
- **Plugins**: WASM/declarative plugin docs may include **plugin-side** examples required to extend scan rules—that is the only code exception.
- **Secrets**: Placeholders only in examples; never real API keys or production endpoints.
- **Attack surface**: No steps to bypass licensing, forge certificates, or escalate privileges.

Internal design docs live under `docs/design/` and are not deployed to GitHub Pages. If unsure, note the audience in your PR for maintainer review.

## License

Contributed code will be released under project license (MIT).

## Acknowledgments

Thank you to all contributors!
