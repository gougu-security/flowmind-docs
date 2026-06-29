# 贡献指南

感谢您对 FlowMind 的关注。FlowMind **宿主应用为商业闭源软件**；公开仓库主要承载用户/插件文档与社区协作入口。

## 您可以如何贡献

| 类型 | 说明 | 是否需要源码授权 |
|------|------|------------------|
| 文档与翻译 | 改进 `docs-site/` 用户指南、插件文档 | 否 |
| 扫描插件 | 提交 WASM / 声明式规则示例或修复 | 否（见插件文档） |
| 问题反馈 | GitHub Issue / Discussion | 否 |
| 宿主程序 | 核心代理、AI、许可等 Rust/TS 改动 | **是**（联系维护团队） |

::: warning 保密
请勿在公开 Issue、PR 或文档中粘贴宿主核心源码、IPC 列表、数据库结构或许可实现细节。
:::

## 公开贡献：文档站点

若仅改进公开文档，只需文档站点环境：

```bash
git clone https://github.com/G3G4X5X6/mitm-scanner.git
cd mitm-scanner/docs-site
pnpm install
pnpm dev
```

浏览器访问 `http://localhost:4174/` 预览。修改 `docs-site/docs/` 下 Markdown 后提交 PR。

## 公开贡献：扫描插件

插件扩展无需了解宿主内部实现，请参阅：

- [WASM 插件](./plugins/wasm.md)
- [声明式插件](./plugins/declarative.md)

在应用内插件工作区加载验证后，可通过约定渠道分享规则包或文档改进。

## 授权贡献：宿主程序

构建完整桌面应用、修改 `src/` / `src-tauri/`、运行集成测试等，需**维护者授权**并获取内部开发手册（含 Rust 工具链、Tauri 构建、代码规范与 CI 要求）。公开文档**不**包含上述命令与目录说明。

## 代码规范（授权贡献者）

内部仓库遵循 Conventional Commits、ESLint、`rustfmt` / `clippy` 等规范；细则见授权 onboarding 文档。公开 PR 若仅涉及 `docs-site/`，请保持 Markdown 清晰、中英文同步（如适用）。

### 提交信息（建议）

```
<type>(<scope>): <description>
```

类型说明：

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具相关 |

示例：

```
feat(proxy): add WebSocket message filtering

fix(scanner): handle null response body

docs(readme): update installation instructions
```

## 开发流程

### 1. Fork 仓库

点击 GitHub 页面右上角的 Fork 按钮

### 2. 克隆到本地

```bash
git clone https://github.com/your-username/mitm-scanner.git
cd mitm-scanner
```

### 3. 创建分支

```bash
# 创建并切换到新分支
git checkout -b feature/my-feature

# 或修复分支
git checkout -b fix/my-fix
```

### 4. 开发与测试

```bash
# 开发
npm run dev

# 运行测试
npm run test

# 代码检查
npm run lint
```

### 5. 提交更改

```bash
git add .
git commit -m "feat(module): add new feature"
```

### 6. 推送到远程

```bash
git push origin feature/my-feature
```

### 7. 创建 Pull Request

1. 访问 GitHub 仓库页面
2. 点击 "Compare & pull request"
3. 填写 PR 描述
4. 等待代码审查

## Pull Request 指南

### PR 描述模板

```markdown
## 描述

简要描述此 PR 的更改内容

## 更改类型

- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 重构
- [ ] 其他

## 测试

描述如何测试这些更改

## 截图（如适用）

添加相关截图

## 相关 Issue

Closes #123
```

### 代码审查

- 至少需要一位维护者审查
- 所有自动化检查必须通过
- 解决所有审查意见

### 合并策略

- 使用 "Squash and merge"
- 保持提交历史清晰
- 自动关闭关联的 Issue

## 项目结构

FlowMind 宿主工程为**商业闭源**代码库，目录布局、模块划分与命名不向公开文档提供。授权贡献者在 onboarding 时会收到内部仓库说明。

公开文档仅描述 **docs-site**（用户/插件文档）与插件示例的组织方式；请勿在 Issue/PR 中粘贴宿主 `src/`、`src-tauri/` 等目录树或核心源码片段。

## 测试

### 前端测试

```bash
# 运行所有测试
npm run test

# 运行测试（单次）
npm run test:run

# 测试覆盖率
npm run test:coverage
```

### 后端测试

授权贡献者可在内部文档指引下运行 Rust 测试套件。公开文档不列出具体 crate 路径或命令细节。

### 端到端测试

```bash
# 运行 E2E 测试（如果配置）
npm run test:e2e
```

## 文档

### 代码文档

- Rust 代码使用 `///` 文档注释
- TypeScript 使用 JSDoc 注释
- 导出的 API 必须有文档

### 设计文档

- 放在 `docs/` 目录
- 使用 Markdown 格式
- 包含架构图（Mermaid）

### 用户文档

- 放在 `docs-site/` 目录
- 使用 VitePress 格式
- 支持中英文

## 问题报告

### Bug 报告

使用 Issue 模板报告 Bug：

```markdown
## 描述

简要描述问题

## 复现步骤

1. 打开 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

## 期望行为

描述期望的行为

## 实际行为

描述实际的行为

## 环境

- OS: [e.g. macOS 14]
- FlowMind Version: [e.g. 0.3.0]
- Browser: [e.g. Chrome 120]
```

### 功能请求

使用 Feature Request 模板：

```markdown
## 功能描述

简要描述想要的功能

## 使用场景

描述使用场景

## 建议实现

描述建议的实现方式（可选）
```

## 社区

### 沟通渠道

- **GitHub Issues**：问题报告和功能请求
- **GitHub Discussions**：社区讨论
- **Pull Requests**：代码贡献

### 行准则

- 尊重他人
- 建设性讨论
- 接受不同观点
- 遵守法律法规

## 文档与安全

`docs-site` 面向**终端用户**与**插件开发者**，撰写或修改文档时请遵守：

- **宿主程序代码**：不得公开主应用的 Rust/TypeScript 实现、IPC 命令列表、内部类型、数据库表结构或仓库目录树。
- **许可与授权**：仅写应用内操作流程，不写算法、文件格式与验证逻辑。
- **插件例外**：WASM / 声明式插件文档可包含**插件侧**必要示例代码，这是唯一允许公开的实现级代码。
- **密钥与凭证**：示例一律使用占位符。
- **攻击面**：不得提供绕过许可、伪造证书、提权等可滥用步骤。

内部设计文档位于 `docs/design/`，不部署到 GitHub Pages。不确定时请在 PR 中说明文档受众，由维护者审核。

## 许可证

贡献的代码将按照项目许可证（MIT）发布。

## 致谢

感谢所有贡献者对 FlowMind 项目的贡献！
