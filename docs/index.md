---
layout: home

hero:
  name: FlowMind
  text: AI-Native 应用安全平台
  tagline: 集成 MITM 代理、流量分析、模糊测试、安全扫描与 AI 推理的一站式安全工作台
  image:
    src: /logo.svg
    alt: FlowMind
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 用户指南
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/gougu-security/flowmind-docs

features:
  - icon: 🔍
    title: 智能代理抓包
    details: 内嵌 Rust MITM 引擎，支持 HTTP/HTTPS/WebSocket 实时捕获，CA 证书自动管理，流量详情一目了然
  - icon: 🔄
    title: 流量转发与拦截
    details: 实时转发器列表、请求详情面板、Hold/Modify/Drop 拦截控制，精确掌握每一个请求
  - icon: 🎯
    title: 请求重放与模糊测试
    details: 支持原始报文重放、结构化请求编辑、多策略 Fuzz（IDOR/Auth Strip/Header 词表等）
  - icon: 🛡️
    title: 安全扫描引擎
    details: 内置被动扫描规则 + WASM/声明式工作区插件，自动检测敏感信息、Cookie 安全、传输安全等问题
  - icon: 🤖
    title: AI 安全分析
    details: 多 Provider 聊天、Tool Calling、MCP 协议、知识库/RAG、安全记忆、攻击图谱
  - icon: 📊
    title: 项目管理与报告
    details: 项目级数据隔离、素材剪藏、JSON/PDF 报告导出，轻松管理安全测试成果
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #6366f1 30%, #06b6d4);
}
</style>

## 技术栈

| 层级 | 技术选型 |
|------|----------|
| 桌面框架 | 跨平台桌面应用 |
| 前端 | 现代 Web 技术栈 |
| 后端 | 高性能原生引擎 |
| AI | 多 Provider、工具调用、向量检索与知识库 |
| 数据存储 | 本地数据库 |

## 为什么选择 FlowMind？

### 🚀 性能卓越

基于 Rust 的内嵌代理引擎，无需外部依赖，启动即用。虚拟列表技术确保海量流量数据流畅浏览。

### 🔒 安全可靠

所有数据默认存储在本地，不上传云端。商业功能通过应用内许可管理，具体策略不向公开文档披露。

### 🧠 AI 原生

深度集成 AI 能力，支持多 Provider 接入、工具调用、知识库检索、安全记忆和攻击图谱分析。

### 🔌 可扩展

支持 WASM 和声明式 YAML 插件，轻松扩展扫描规则，满足定制化需求。

## 社区

- [GitHub Issues](https://github.com/gougu-security/flowmind-docs/issues) - 报告产品问题与建议
- [文档 Issues](https://github.com/gougu-security/flowmind-docs/issues) - 报告文档问题
- [贡献指南](./dev/contributing.md) - 参与文档贡献
