# 贡献指南

感谢您对 FlowMind 的关注。FlowMind **宿主应用为商业闭源软件**；本仓库（`flowmind-docs`）承载公开用户文档与插件开发说明。

## 您可以如何贡献

| 类型 | 说明 | 是否需要源码授权 |
|------|------|------------------|
| 文档与翻译 | 改进用户指南、插件文档 | 否 |
| 扫描插件 | 提交 WASM / 声明式规则示例 | 否（见插件文档） |
| 问题反馈 | 文档仓库 Issue | 否 |
| 宿主程序 | 核心代理、AI、许可等改动 | **是**（联系维护团队） |

::: warning 保密
请勿在公开 Issue、PR 或文档中粘贴宿主核心源码、IPC 列表、数据库结构或许可实现细节。
:::

## 文档贡献流程

### 1. Fork 并克隆

```bash
git clone https://github.com/gougu-security/flowmind-docs.git
cd flowmind-docs
pnpm install
```

### 2. 本地预览

```bash
pnpm dev
```

浏览器访问 `http://localhost:4174/`。修改 `docs/` 下 Markdown 后提交 PR。

### 3. 构建验证

```bash
pnpm build
pnpm preview
```

### 4. 提交 Pull Request

1. 创建功能分支：`git checkout -b docs/your-topic`
2. 保持中英文文档同步（如适用）
3. 在 [flowmind-docs](https://github.com/gougu-security/flowmind-docs) 创建 PR

## 公开贡献：扫描插件

插件扩展无需了解宿主内部实现，请参阅：

- [WASM 插件](./plugins/wasm.md)
- [声明式插件](./plugins/declarative.md)

在应用内插件工作区加载验证后，可通过约定渠道分享规则包或文档改进。

## 授权贡献：宿主程序

修改宿主程序需**维护者授权**并获取内部开发手册。公开文档**不**包含宿主仓库路径、构建命令或内部模块说明。

## 提交信息（建议）

```
<type>(<scope>): <description>
```

| 类型 | 说明 |
|------|------|
| `docs` | 文档更新 |
| `fix` | 文档错误或链接修复 |
| `chore` | 构建/工具相关 |

示例：

```
docs(guide): update proxy setup instructions

docs(en): sync getting-started with Chinese version
```

## Pull Request 指南

- 简要说明更改内容与受众（用户 / 插件开发者）
- 中英文同步时请在 PR 中注明
- 至少需要一位维护者审查

## 文档与安全

公开文档面向**终端用户**与**插件开发者**：

- **不得**公开宿主 Rust/TypeScript 实现、IPC 命令、内部类型或数据库结构
- **许可与授权**：仅写应用内操作流程，不写验证算法或文件格式细节
- **插件例外**：WASM / 声明式插件文档可包含插件侧必要示例
- **示例凭证**：一律使用占位符

不确定是否适合公开时，请在 PR 中说明文档受众，由维护者审核。

## 社区

- **文档 Issues**：[gougu-security/flowmind-docs](https://github.com/gougu-security/flowmind-docs/issues)
- **产品反馈**：[gougu-security/flowmind](https://github.com/gougu-security/flowmind/issues)

## 许可证

文档贡献将按照 [Apache License 2.0](https://github.com/gougu-security/flowmind-docs/blob/main/LICENSE) 发布。
