# FlowMind 用户指南

欢迎使用 FlowMind！本指南将帮助您快速上手这款 AI-Native 应用安全平台。


![FlowMind 转发器界面](/screenshots/forwarder-home.png)


## 什么是 FlowMind？

FlowMind 是一个桌面端应用安全工作台。它集成了以下核心能力：

- **代理抓包**：内嵌 MITM 引擎，支持 HTTP/HTTPS/WebSocket
- **流量分析**：实时转发器、拦截器、请求详情
- **请求重放**：重发器支持原始报文和结构化请求
- **模糊测试**：多策略 Fuzz，支持 IDOR、Auth Strip 等
- **安全扫描**：被动规则 + WASM/声明式插件
- **AI 分析**：多 Provider 聊天、工具调用、知识库、攻击图
- **报告导出**：JSON/PDF 格式，支持素材剪藏


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

### 核心功能

- [代理核心](./proxy.md) - 代理引擎配置与使用
- [转发器](./forwarder.md) - 实时流量查看与过滤
- [拦截器](./interceptor.md) - 请求拦截与修改
- [重发器](./repeater.md) - 请求重放与调试
- [模糊器](./fuzzer.md) - 模糊测试配置与执行

### 高级功能

- [扫描器](./scanner.md) - 安全扫描规则与插件
- [AI 功能](./ai.md) - AI 安全分析能力
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
