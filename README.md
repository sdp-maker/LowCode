# LowCode 低代码平台

[![Vue 3](https://img.shields.io/badge/Vue-3.5.22-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.11.5-409EFF?style=flat-square&logo=element)](https://element-plus.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

🚀 一个现代化的低代码可视化开发平台，支持通过拖拽组件快速构建应用界面。

## ✨ 特性

- 🎯 **可视化编辑器** - 拖拽式组件编辑，所见即所得
- 📦 **丰富的组件库** - 内置多种常用组件和区块
- 📊 **数据可视化** - 支持 ECharts 和 ZRender 图表渲染
- 🌊 **流式布局** - 支持流程图编辑和节点连接
- 💾 **数据源管理** - 可视化数据源配置和管理
- 🎨 **主题定制** - 基于 TailwindCSS 的样式系统
- 📱 **响应式设计** - 适配多种屏幕尺寸
- 🔄 **实时预览** - 实时查看编辑效果

## 🏗️ 项目架构

项目采用 Monorepo 架构，使用 pnpm workspace 管理：

```
LowCode/
├── apps/
│   ├── builder/          # 可视化编辑器主应用
│   ├── runner-app/       # 应用运行时
│   └── runner-web/       # Web运行时
├── packages/             # 共享包
└── docs/                 # 文档
```

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 渐进式框架
- **TypeScript** - 类型安全
- **Vite** - 快速构建工具
- **Element Plus** - UI 组件库

### 状态管理
- **Pinia** - Vue 3 状态管理

### 可视化
- **Vue Flow** - 流程图编辑
- **ECharts** - 数据图表
- **D3.js** - 数据可视化

### 开发工具
- **ESLint** - 代码检查
- **Stylelint** - 样式检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks
- **Commitizen** - 规范化提交

## 🚀 快速开始

### 环境要求

- Node.js >= 20.18.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/sdp-maker/LowCode.git
cd LowCode

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动编辑器开发服务
pnpm dev:builder

# 启动运行时服务
pnpm dev:runner
```

### 构建部署

```bash
# 构建生产版本
pnpm build

# 预览构建结果
cd apps/builder && pnpm preview
```

## 📁 目录结构

### Builder 应用结构

```
apps/builder/src/
├── assets/              # 静态资源
├── blocks/              # 可视化组件块
│   ├── ButtonBlock.vue
│   ├── ChartBlock.vue
│   ├── FormBlock.vue
│   └── ...
├── components/          # 通用组件
│   ├── AppLeftPanel/    # 左侧面板
│   ├── AppRightPanel/   # 右侧面板
│   ├── ChartRenderer/   # 图表渲染器
│   ├── DataSouceContent/ # 数据源管理
│   └── FlowEditer/      # 流程编辑器
├── stores/              # 状态管理
├── views/               # 页面视图
└── router/              # 路由配置
```

## 🎨 核心功能

### 组件库

| 组件类型 | 说明 | 状态 |
|---------|------|------|
| ButtonBlock | 按钮组件 | ✅ |
| TextBlock | 文本组件 | ✅ |
| ImageBlock | 图片组件 | ✅ |
| ChartBlock | 图表组件 | ✅ |
| FormBlock | 表单组件 | ✅ |
| ListBlock | 列表组件 | ✅ |
| ContainerBlock | 容器组件 | ✅ |

### 编辑器功能

- 📋 **拖拽编辑** - 支持组件拖拽和排序
- 🎯 **属性配置** - 可视化属性编辑面板
- 👁️ **实时预览** - 即时查看编辑效果
- 💾 **数据绑定** - 支持数据源绑定
- 🔄 **撤销重做** - 操作历史管理

## 📊 数据可视化

支持多种图表类型：
- 📈 折线图
- 📊 柱状图  
- 🥧 饼图
- 📈 面积图
- 🗺️ 地图
- 📊 自定义图表

## 🤝 贡献指南

### 开发规范

1. **代码风格** - 使用 ESLint + Prettier
2. **提交规范** - 使用 Conventional Commits
3. **类型检查** - 启用 TypeScript 严格模式

### 提交流程

```bash
# 代码检查
pnpm lint

# 样式检查  
pnpm lint:style

# 拼写检查
pnpm spell

# 规范化提交
pnpm commit
```

## 📝 开发计划

- [ ] 组件库扩展
- [ ] 主题系统
- [ ] 插件机制
- [ ] 移动端适配
- [ ] 多语言支持
- [ ] 协作编辑

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。

## 👥 贡献者

感谢所有为本项目做出贡献的开发者！

## 📧 联系方式

- 作者：sdp-maker
- 邮箱：19179977082@163.com

---

⭐ 如果这个项目对你有帮助，请给个 Star！
