# FlowMind 文档站点

基于 VitePress 构建的 FlowMind 产品用户文档站点，支持中英文双语。

## 目录结构

```
flowmind-docs/
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
    ├── dev/                     # 开发者文档（中文）
    ├── api/                     # 商业化与合作（中文）
    └── en/                      # 英文文档
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

访问 `http://localhost:4174/` 查看文档站点。

> 端口 4174 用于开发服务器，4175 用于预览服务器。

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

推送到 `main` 分支后，GitHub Actions 会自动构建并部署文档。

- 部署地址：`https://gougu-security.github.io/flowmind-docs/`
- CI 会自动设置 VitePress `base: /flowmind-docs/`，本地开发无需修改

**首次启用步骤（必须手动完成一次）：**

1. 打开仓库 [Settings → Pages](https://github.com/gougu-security/flowmind-docs/settings/pages)
2. **Build and deployment → Source** 选择 **GitHub Actions**（不要选 Deploy from branch）
3. 若为组织仓库，需组织管理员在组织 Settings → Pages 中允许仓库使用 Pages
4. 推送代码到 `main` 分支，或手动运行 Actions 中的 **Deploy docs to GitHub Pages** workflow

> 若未执行第 1–2 步，workflow 会在部署阶段报 `Get Pages site failed` / `Not Found`。

### 手动部署

```bash
pnpm build
# 将 docs/.vitepress/dist/ 内容部署到静态托管
```

## 文档编写指南

### 添加新页面

1. 在相应目录下创建 `.md` 文件
2. 在 `docs/.vitepress/config.ts` 的侧边栏配置中添加链接
3. 同时在中文和英文目录下创建对应文件

### 多语言支持

- 中文文档放在 `docs/guide/`、`docs/dev/`、`docs/api/`
- 英文文档放在 `docs/en/` 目录下
- 保持中英文文档结构一致

### 公开文档与安全

本仓库面向**终端用户**与**插件开发者**。除插件文档中的必要示例外，**不得**在公开文档中写入宿主程序代码或实现细节：

| 允许公开 | 禁止公开 |
|----------|----------|
| 用户指南（界面操作） | 宿主源码、IPC 命令、事件名 |
| WASM / 声明式插件示例 | 数据库表结构、内部模块路径 |
| 产品级架构概览（无源码） | 许可验证、门控、服务端实现 |
| 商业化与合作说明 | 完整 JSON Schema、未授权 API 契约 |

撰写文档时若涉及实现细节，默认**不写**；仅插件开发文档可包含插件运行时所需的清单、WASM 接口与规则 YAML/JSON 示例。

## 相关链接

- [在线文档](https://gougu-security.github.io/flowmind-docs/)
- [VitePress 官方文档](https://vitepress.dev/)
- [FlowMind 产品仓库](https://github.com/gougu-security/flowmind)
- [文档仓库](https://github.com/gougu-security/flowmind-docs)
