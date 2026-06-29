# FlowMind

**AI-Native 应用安全平台** — 集成 MITM 代理、流量分析、模糊测试、安全扫描与 AI 推理的一站式安全工作台。

[![在线文档](https://img.shields.io/badge/文档-在线阅读-6366f1?style=flat-square)](https://gougu-security.github.io/flowmind-docs/)

---

## 为什么选择 FlowMind？

传统安全工具擅长抓包与重放，却难以将流量、漏洞与 AI 推理串联成完整工作流。FlowMind 从设计之初即面向 **AI-Native 安全测试**：在本地完成流量捕获、主动/被动检测、模糊测试与智能分析，数据留在你的设备上，无需依赖云端。

| 痛点 | FlowMind 的做法 |
|------|-----------------|
| 工具链割裂 | 代理、重放、Fuzz、扫描、报告在同一工作台完成 |
| 海量流量难浏览 | 高性能引擎 + 虚拟列表，流畅处理大规模请求 |
| 规则难以扩展 | WASM / 声明式插件，按需定制扫描能力 |
| AI 与测试脱节 | 多 Provider、知识库、攻击图谱与安全记忆深度集成 |

## 核心能力

### 智能代理抓包

内嵌高性能 MITM 引擎，支持 HTTP / HTTPS / WebSocket 实时捕获，CA 证书自动管理，流量详情一目了然。

### 流量转发与拦截

实时转发器、请求详情面板，以及 Hold / Modify / Drop 拦截控制，精确掌握每一个请求。

### 请求重放与模糊测试

原始报文重放、结构化请求编辑，多策略 Fuzz（IDOR、Auth Strip、Header 词表等），支持并发与限速。

### 安全扫描引擎

内置被动扫描规则，配合 WASM / 声明式工作区插件，自动发现敏感信息泄露、Cookie 与传输层安全问题。

### AI 安全分析

多 Provider 对话、Tool Calling、MCP 协议、知识库 / RAG、安全记忆与攻击图谱，让 AI 真正参与测试决策。

### 项目管理与报告

项目级数据隔离、素材剪藏、JSON / PDF 报告导出，轻松沉淀与交付测试成果。

## 适用场景

- Web / API 渗透测试与漏洞挖掘
- 移动应用与桌面客户端流量分析
- 安全研究、红队演练与漏洞验证
- 需要可扩展扫描规则的安全团队
- 希望将 AI 引入测试流程的安全工程师

## 快速上手

1. 前往 [Releases](https://github.com/gougu-security/flowmind-docs/releases) 下载对应平台安装包
2. 阅读 [快速开始](https://gougu-security.github.io/flowmind-docs/guide/getting-started) 完成安装与证书配置
3. 按需查阅 [用户指南](https://gougu-security.github.io/flowmind-docs/guide/) 探索各功能模块

插件开发者请参阅 [插件开发文档](https://gougu-security.github.io/flowmind-docs/dev/plugins/wasm)。

## 企业与合作

需要私有化部署、定制开发或企业授权？欢迎通过 [合作开发](https://gougu-security.github.io/flowmind-docs/api/) 与 [企业版本](https://gougu-security.github.io/flowmind-docs/api/enterprise) 页面联系我们。

## 链接

| 资源 | 地址 |
|------|------|
| 在线文档 | https://gougu-security.github.io/flowmind-docs/ |
| 问题反馈 | https://github.com/gougu-security/flowmind-docs/issues |

---

<p align="center">
  <sub>FlowMind — 让应用安全测试更智能、更高效</sub>
</p>

<p align="center">
  <sub>文档站点开发说明见 <a href="./dev.md">dev.md</a></sub>
</p>
