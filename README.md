# FlowMind 文档站点

基于 VitePress 构建的 FlowMind 产品用户文档站点，支持中英文双语。

## 目录结构

```
docs-site/
├── .github/workflows/deploy.yml  # GitHub Actions 部署配置
├── package.json                  # 项目配置
├── pnpm-lock.yaml               # 依赖锁定文件
├── README.md                    # 本文件
└── docs/                        # 文档源文件
    ├── .vitepress/              # VitePress 配置
    │   ├── config.ts            # 主配置文件
    │   └── theme/               # 主题配置
    ├── public/                  # 静态资源
    │   ├── logo.svg             # Logo
    │   ├── favicon.svg          # Favicon
    │   └── screenshots/         # 产品截图
    ├── index.md                 # 中文首页
    ├── guide/                   # 用户指南（中文）
    │   ├── index.md             # 概览
    │   ├── getting-started.md   # 快速开始
    │   ├── proxy.md             # 代理核心
    │   ├── forwarder.md         # 转发器
    │   ├── interceptor.md       # 拦截器
    │   ├── repeater.md          # 重发器
    │   ├── fuzzer.md            # 模糊器
    │   ├── scanner.md           # 扫描器
    │   ├── ai.md                # AI 功能
    │   ├── projects.md          # 项目管理
    │   ├── reports.md           # 报告导出
    │   └── settings.md          # 设置
    ├── dev/                     # 开发者文档（中文）
    │   ├── index.md             # 概览
    │   ├── architecture.md      # 架构设计
    │   ├── plugins/             # 插件开发
    │   │   ├── wasm.md          # WASM 插件
    │   │   └── declarative.md   # 声明式插件
    │   ├── contributing.md      # 贡献指南
    │   └── roadmap.md           # 路线图
    │   # 许可等敏感设计文档见仓库 docs/design/（不随公开站点发布）
    ├── api/                     # 集成说明（不含宿主 API 细节）
    │   ├── index.md             # 概览
    │   ├── ipc.md               # IPC 命令
    │   └── ai.md                # AI API
    └── en/                      # 英文文档
        ├── index.md             # 英文首页
        ├── guide/               # 用户指南（英文）
        ├── dev/                 # 开发者文档（英文）
        └── api/                 # API 参考（英文）
```

## 快速开始

### 安装依赖

```bash
cd docs-site
pnpm install
```

### 本地开发

```bash
pnpm dev
```

访问 `http://localhost:4174/` 查看文档站点（端口可在 package.json 中调整）。

> 端口 4174 用于开发服务器，4175 用于预览服务器，避免与 FlowMind 主程序（8080）冲突。

### 部署到 GitHub Pages

CI 在 GitHub Actions 中会自动设置 `base: /mitm-scanner/`，本地开发无需修改配置。

部署地址：`https://G3G4X5X6.github.io/mitm-scanner/`

### 构建

```bash
pnpm build
```

构建产物位于 `docs/.vitepress/dist/` 目录。

### 预览构建结果

```bash
pnpm preview
```

## 部署

### GitHub Pages 自动部署

项目已配置 GitHub Actions 自动部署：

1. 将代码推送到 GitHub 仓库的 `main` 分支
2. 修改 `docs-site/` 目录下的文件
3. GitHub Actions 会自动构建并部署到 GitHub Pages

部署地址：`https://G3G4X5X6.github.io/mitm-scanner/`

### 手动部署

```bash
# 构建
pnpm build

# 部署到 GitHub Pages
# 将 .vitepress/dist/ 目录推送到 gh-pages 分支
```

## 文档编写指南

### 添加新页面

1. 在相应目录下创建 `.md` 文件
2. 在 `.vitepress/config.ts` 的侧边栏配置中添加链接
3. 同时在中文和英文目录下创建对应文件

### 多语言支持

- 中文文档放在根目录（`docs/guide/`、`docs/dev/`、`docs/api/`）
- 英文文档放在 `docs/en/` 目录下
- 保持中英文文档结构一致

### 公开文档与安全

`docs-site` 面向**终端用户**与**插件开发者**。除插件文档中的必要示例外，**不得**在公开文档中写入宿主程序代码或实现细节：

| 允许公开 | 禁止公开 |
|----------|----------|
| 用户指南（界面操作） | 宿主 Rust/TS 源码、IPC 命令、事件名 |
| WASM / 声明式插件示例 | 数据库表结构、内部模块路径 |
| 产品级架构概览（无源码） | 许可验证、门控、服务端实现 |
| 集成说明（不含 API 列表） | 完整 JSON Schema、未授权 API 契约 |

许可、授权与内部设计见 `docs/design/`，**不**部署到 GitHub Pages。插件侧代码示例仅用于说明扩展扫描规则的方式。

撰写文档时若涉及实现细节，默认**不写**；仅插件开发文档可包含插件运行时所需的清单、WASM 接口与规则 YAML/JSON 示例。

### Markdown 扩展

VitePress 支持多种 Markdown 扩展：

- 自定义容器（Tip、Warning、Danger）
- 代码块高亮
- 表格
- 目录
- 等等

详见 [VitePress 文档](https://vitepress.dev/guide/markdown)

## 自定义配置

### 修改主题

编辑 `.vitepress/theme/style.css` 自定义样式。

### 修改配置

编辑 `.vitepress/config.ts` 修改站点配置，包括：

- 站点标题和描述
- 导航栏
- 侧边栏
- 搜索配置
- 多语言配置

## 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [FlowMind GitHub 仓库](https://github.com/G3G4X5X6/mitm-scanner)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
