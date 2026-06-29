import { defineConfig } from 'vitepress'

const DOCS_REPO = 'gougu-security/flowmind-docs'
const PRODUCT_REPO = 'gougu-security/flowmind'
const DOCS_URL = `https://github.com/${DOCS_REPO}`
const PRODUCT_URL = `https://github.com/${PRODUCT_REPO}`

// GitHub Pages 项目页部署时使用子路径；本地开发保持根路径
const base = process.env.GITHUB_ACTIONS ? '/flowmind-docs/' : '/'

// 中文侧边栏
const zhSidebar = {
  '/guide/': [
    {
      text: '快速开始',
      items: [
        { text: '简介', link: '/guide/' },
        { text: '安装与启动', link: '/guide/getting-started' },
      ]
    },
    {
      text: '核心功能',
      items: [
        { text: '代理核心', link: '/guide/proxy' },
        { text: '转发器', link: '/guide/forwarder' },
        { text: '拦截器', link: '/guide/interceptor' },
        { text: '重发器', link: '/guide/repeater' },
        { text: '模糊器', link: '/guide/fuzzer' },
      ]
    },
    {
      text: '高级功能',
      items: [
        { text: '扫描器', link: '/guide/scanner' },
        { text: 'AI 功能', link: '/guide/ai' },
        { text: '项目管理', link: '/guide/projects' },
        { text: '报告导出', link: '/guide/reports' },
      ]
    },
    {
      text: '配置',
      items: [
        { text: '设置', link: '/guide/settings' },
        { text: '许可与激活', link: '/guide/license' },
      ]
    }
  ],
  '/dev/': [
    {
      text: '开发指南',
      items: [
        { text: '概览', link: '/dev/' },
        { text: '架构设计', link: '/dev/architecture' },
      ]
    },
    {
      text: '插件开发',
      items: [
        { text: 'WASM 插件', link: '/dev/plugins/wasm' },
        { text: '声明式插件', link: '/dev/plugins/declarative' },
      ]
    },
    {
      text: '参与贡献',
      items: [
        { text: '贡献指南', link: '/dev/contributing' },
        { text: '路线图', link: '/dev/roadmap' },
      ]
    }
  ],
  '/api/': [
    {
      text: '商业化',
      items: [
        { text: '合作开发', link: '/api/' },
        { text: '企业版本', link: '/api/enterprise' },
      ]
    }
  ]
}

// 英文侧边栏
const enSidebar = {
  '/en/guide/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/en/guide/' },
        { text: 'Installation', link: '/en/guide/getting-started' },
      ]
    },
    {
      text: 'Core Features',
      items: [
        { text: 'Proxy', link: '/en/guide/proxy' },
        { text: 'Forwarder', link: '/en/guide/forwarder' },
        { text: 'Interceptor', link: '/en/guide/interceptor' },
        { text: 'Repeater', link: '/en/guide/repeater' },
        { text: 'Fuzzer', link: '/en/guide/fuzzer' },
      ]
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Scanner', link: '/en/guide/scanner' },
        { text: 'AI Features', link: '/en/guide/ai' },
        { text: 'Projects', link: '/en/guide/projects' },
        { text: 'Reports', link: '/en/guide/reports' },
      ]
    },
    {
      text: 'Configuration',
      items: [
        { text: 'Settings', link: '/en/guide/settings' },
        { text: 'License & Activation', link: '/en/guide/license' },
      ]
    }
  ],
  '/en/dev/': [
    {
      text: 'Developer Guide',
      items: [
        { text: 'Overview', link: '/en/dev/' },
        { text: 'Architecture', link: '/en/dev/architecture' },
      ]
    },
    {
      text: 'Plugin Development',
      items: [
        { text: 'WASM Plugins', link: '/en/dev/plugins/wasm' },
        { text: 'Declarative Plugins', link: '/en/dev/plugins/declarative' },
      ]
    },
    {
      text: 'Contributing',
      items: [
        { text: 'Contributing Guide', link: '/en/dev/contributing' },
        { text: 'Roadmap', link: '/en/dev/roadmap' },
      ]
    }
  ],
  '/en/api/': [
    {
      text: 'Commercial',
      items: [
        { text: 'Partnership', link: '/en/api/' },
        { text: 'Enterprise', link: '/en/api/enterprise' },
      ]
    }
  ]
}

const sharedThemeConfig = {
  logo: '/logo.svg',
  siteTitle: 'FlowMind',
  socialLinks: [
    { icon: 'github', link: DOCS_URL }
  ],
  footer: {
    message: 'Released under the Apache License 2.0.',
    copyright: 'Copyright © 2024–2026 FlowMind'
  },
  appearance: 'dark' as const,
}

export default defineConfig({
  base,
  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,

  title: 'FlowMind',
  description: 'AI-Native Application Security Platform',
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
  ],

  vite: {
    server: {
      port: 4174,
      strictPort: false,
    },
    preview: {
      port: 4175,
      strictPort: false,
    }
  },

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        ...sharedThemeConfig,
        nav: [
          { text: '指南', link: '/guide/' },
          { text: '开发', link: '/dev/' },
          { text: '商业化', link: '/api/' },
          {
            text: 'v0.3.0',
            items: [
              { text: '更新日志', link: '/dev/roadmap' },
              { text: 'GitHub', link: PRODUCT_URL }
            ]
          }
        ],
        sidebar: zhSidebar,
        outline: {
          label: '页面导航',
          level: [2, 3]
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        editLink: {
          pattern: `${DOCS_URL}/edit/main/docs/:path`,
          text: '在 GitHub 上编辑此页面'
        },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'FlowMind',
      description: 'AI-Native Application Security Platform',
      themeConfig: {
        ...sharedThemeConfig,
        nav: [
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Dev', link: '/en/dev/' },
          { text: 'Commercial', link: '/en/api/' },
          {
            text: 'v0.3.0',
            items: [
              { text: 'Changelog', link: '/en/dev/roadmap' },
              { text: 'GitHub', link: PRODUCT_URL }
            ]
          }
        ],
        sidebar: enSidebar,
        outline: {
          label: 'On this page',
          level: [2, 3]
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        editLink: {
          pattern: `${DOCS_URL}/edit/main/docs/:path`,
          text: 'Edit this page on GitHub'
        },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate',
                  closeText: 'Close'
                }
              }
            }
          }
        }
      }
    }
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  themeConfig: sharedThemeConfig,
})
