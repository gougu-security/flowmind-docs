# FlowMind 用户指南

欢迎使用 FlowMind！本指南将帮助您快速上手这款 AI-Native 应用安全平台。


![FlowMind 转发器界面](/screenshots/首页.png)


## 什么是 FlowMind？

### 目标

FlowMind 的目标是成为安全从业者的**一站式桌面工作台**，消除在代理抓包、流量分析、安全检测之间频繁切换工具的痛点。它将渗透测试和安全审计的核心工作流整合到一个统一的原生桌面应用中，让安全人员专注于发现问题而非管理工具。

### 效益

- **测试全流程闭环**：捕获流量 → 发现漏洞 → 重放验证 → 模糊测试 → 分类记录 → 报告导出，一个工具完成渗透测试全生命周期
- **检测全面**：28 条被动规则 + 8 条主动规则覆盖 OWASP Top 10 常见风险，Rhai 脚本支持自定义检测逻辑
- **AI 原生**：多 Provider AI 接入、智能体编排、RAG 知识库、攻击图谱分析，原生支持发现业务逻辑漏洞
- **漏洞记录与追踪**：支持对每个 Finding 进行确认、修复、忽略等分类管理，添加备注与证据，形成可追溯的漏洞台账
- **优雅报告导出**：内置报告编辑器，支持素材剪藏与备注，一键导出结构化的 JSON 和精美 HTML 报告，满足交付要求


## 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10+, macOS 11+, Linux (Ubuntu 20.04+) |
| 内存 | 4GB RAM（推荐 8GB+） |
| 磁盘空间 | 500MB+ |
| 浏览器 | Chrome, Firefox, Safari, Edge（用于代理配置） |

## 快速导航

<div class="tip custom-block" style="padding-top: 8px">

想要快速上手？查看 [安装与启动](./getting-started.md) 章节。

</div>

### 流量捕获

- [代理核心](./proxy.md) - 代理引擎配置与使用
- [转发器](./forwarder.md) - 实时流量查看与过滤
- [拦截器](./interceptor.md) - 请求拦截与修改

### 安全测试

- [重发器](./repeater.md) - 请求重放与调试
- [序列器](./sequence.md) - 多步骤请求序列与变量传递
- [模糊器](./fuzzer.md) - 模糊测试配置与执行
- [插件](./plugins.md) - 安全扫描规则与标签脚本

### AI 分析

- [AI 功能](./ai.md) - AI 安全分析能力

### 成果管理

- [项目管理](./projects.md) - 项目隔离与上下文管理
- [报告导出](./reports.md) - 测试报告生成

### 配置

- [设置](./settings.md) - 应用配置选项
- [许可与激活](./license.md) - 导入许可与申请流程

## 获取帮助

如果遇到问题，可以通过以下方式获取帮助：

1. **查看文档**：浏览本指南的各个章节
2. **GitHub Issues**：[提交产品问题](https://github.com/gougu-security/flowmind/issues)
3. **文档 Issues**：[提交文档问题](https://github.com/gougu-security/flowmind-docs/issues)
