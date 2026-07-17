# Pentes Copilot — Fork 说明

本仓库 fork 自 [xai-org/grok-build](https://github.com/xai-org/grok-build)，在 Grok Build 终端 AI 编码代理基础上维护 **Pentes Copilot** 发行版。

## 上游

| 项目 | 地址 |
|------|------|
| 上游仓库 | https://github.com/xai-org/grok-build |
| 上游提交 | 见根目录 `SOURCE_REV` |
| 许可证 | Apache License 2.0 |

## 同步上游

```bash
git remote add upstream https://github.com/xai-org/grok-build.git  # 首次
git fetch upstream
git merge upstream/main
```

合并后请重新应用 Pentes Copilot 相关定制（若有）。

## 许可证

上游代码遵循 Apache 2.0。第三方与 vendored 代码见其原始许可证，详见 `LICENSE` 与 `THIRD-PARTY-NOTICES`。
