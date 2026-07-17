# Pentes Copilot 仓库初始化

本目录已从 [xai-org/grok-build](https://github.com/xai-org/grok-build) fork 并完成初始标识（`README.md`、`FORK.md`）。

## 当前状态

- 本地 `main` 分支已包含完整 grok-build 源码及 Pentes Copilot 说明
- 目标远程：`https://github.com/gougu-security/pentes-copilot`
- **远程仓库尚未创建**，或 Cursor GitHub App 尚未授权该仓库，因此自动推送失败

## 完成新建仓库（需账号管理员操作一次）

### 1. 在 GitHub 创建空仓库

1. 打开 https://github.com/new
2. Owner 选择 **gougu-security**
3. Repository name 填写 **pentes-copilot**
4. 选择 Public
5. **不要**勾选 “Add a README file”
6. 点击 Create repository

### 2. 授权 Cursor GitHub App

在 GitHub → Settings → Applications → Cursor → Repository access 中，将 **pentes-copilot** 加入可访问仓库列表（与 flowmind-docs 相同方式）。

### 3. 推送代码

在本目录执行：

```bash
git push -u origin main
```

若远程 URL 需更新，可执行：

```bash
git remote set-url origin https://github.com/gougu-security/pentes-copilot.git
git push -u origin main
```

## 上游同步

详见 [FORK.md](./FORK.md)。

```bash
git fetch upstream
git merge upstream/main
```

## 构建验证（可选）

```bash
cargo install dotslash   # 若尚未安装
cargo check -p xai-grok-pager-bin
```
