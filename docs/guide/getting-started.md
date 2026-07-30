# 安装与启动

本章介绍如何安装和首次启动 FlowMind。

## 下载安装

### 从 GitHub Releases 下载

1. 访问 [GitHub Releases](https://github.com/gougu-security/flowmind/releases) 页面
2. 根据您的操作系统下载对应的安装包：
   - **Windows**: `FlowMind-x.x.x-x64-setup.exe`
   - **macOS**: `FlowMind-x.x.x.dmg`
   - **Linux**: `FlowMind-x.x.x.AppImage` 或 `.deb`

### 安装步骤

::: code-group
```bash [Windows]
# 双击运行安装包
FlowMind-x.x.x-x64-setup.exe
```

```bash [macOS]
# 打开 DMG 文件，拖拽到 Applications
open FlowMind-x.x.x.dmg
```

```bash [Linux]
# AppImage 方式
chmod +x FlowMind-x.x.x.AppImage
./FlowMind-x.x.x.AppImage

# Debian/Ubuntu 方式
sudo dpkg -i flowmind_x.x.x_amd64.deb
```
:::

## 首次启动

### 1. 启动应用

双击应用图标启动 FlowMind。首次启动时，应用会自动：

- 初始化本地数据库（SQLite）
- 生成 CA 根证书（用于 HTTPS 解密）
- 释放内置扫描规则脚本到工作区
- 加载默认配置

### 2. 界面概览

启动后您将看到主界面，包含以下区域：

- **标题栏**：项目切换、代理控制、浏览器启动、设置入口
- **导航栏**：转发器、拦截器、重发器、模糊器、插件、AI、报告等模块切换
- **主内容区**：当前模块的功能界面
- **状态栏**：代理运行状态、连接数、日志入口

### 3. 启动代理

1. 点击标题栏的 **启动代理** 按钮
2. 默认监听 `127.0.0.1:8080`
3. 状态栏显示代理运行状态

### 4. 配置浏览器代理

将浏览器代理设置指向 FlowMind：

| 设置项 | 值 |
|--------|-----|
| HTTP 代理 | `127.0.0.1:8080` |
| HTTPS 代理 | `127.0.0.1:8080` |
| SOCKS 代理 | 不使用 |

::: tip 一键启动浏览器
FlowMind 支持一键启动浏览器。点击标题栏的 **启动浏览器** 按钮，会自动配置代理并打开浏览器。
:::

### 5. 安装 CA 证书

为了正确解密 HTTPS 流量，需要安装 FlowMind 的 CA 证书：

1. 进入 **设置** → **证书管理**
2. 点击 **导出 CA 证书**
3. 将证书导入系统或浏览器的信任证书库

::: warning 安全提示
CA 证书仅用于本地开发和测试环境。请勿在生产环境或不受信任的网络中使用。
:::

## 下一步

完成上述步骤后，代理开始捕获流量。建议按以下顺序探索功能：

1. **[转发器](./forwarder.md)**：查看捕获的流量列表和请求详情
2. **[重发器](./repeater.md)**：对请求进行重放测试
3. **[插件](./plugins.md)**：管理扫描规则与标签脚本
4. **[AI 功能](./ai.md)**：使用 AI 进行安全分析
5. **[项目管理](./projects.md)**：按项目隔离测试数据
6. **[报告导出](./reports.md)**：生成测试报告
