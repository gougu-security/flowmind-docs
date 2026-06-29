# Developer Guide

Public developer documentation covers **scan plugin extensions** and product-level topics only. Host application source, IPC contracts, and internal module design are confidential and are not published on this site.

## What you can do here

| Goal | Documentation |
|------|----------------|
| WASM scan plugins | [WASM plugins](./plugins/wasm.md) |
| Declarative rule packs | [Declarative plugins](./plugins/declarative.md) |
| Product layers (conceptual) | [Architecture overview](./architecture.md) |
| Use the product | [User guide](../guide/) |

## Stack (public summary)

FlowMind is a desktop app with a web UI and native backend, local database storage, and WASM/declarative scan plugins. Exact versions ship with releases; **repository layout and internal module names are not documented publicly**.

## Plugin development

See [WASM plugins](./plugins/wasm.md) or [Declarative plugins](./plugins/declarative.md). Open the scanner plugin workspace from **Settings → General → Local workspace** in the app to test packs.

Building the full host app or running integration tests requires **authorized contributor** access—contact maintainers for internal docs.

## Contributing

- Public: doc fixes, plugin samples, feedback (no host source or IPC dumps)
- Source-level: authorized access only; see [Contributing](./contributing.md)

::: warning Confidentiality
Do not paste host core code, database schemas, license verification logic, or unpublished API names in public issues, PRs, or docs.
:::
