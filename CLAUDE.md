# 星桥 · Animal StarBridge — 项目 CLAUDE.md

> 状态：开发中 | 技术栈：React 18 + Vite + Tailwind CSS + TypeScript

## 项目简介

为国内去世的网红小动物做的悼念纪念网站。风格：星露谷 2D 像素风 UI + 真实动物照片。

## 技术栈

- React 18 + TypeScript
- Vite 5 构建
- Tailwind CSS 4（@tailwindcss/vite 插件）
- React Router v6 HashRouter
- 纯静态，无后端

## 项目结构

```
star-bridge/
├── public/photos/          ← 动物照片（按 animal-id 分目录）
│   ├── wu-kong/
│   ├── da-zhuang/
│   ├── a-zhai/
│   ├── sun-da-niang/
│   ├── cheng-gong/
│   └── sun-si-miao/
├── src/
│   ├── main.tsx            ← 入口 + HashRouter
│   ├── App.tsx             ← 路由
│   ├── index.css           ← Tailwind + 像素风全局样式
│   ├── data/
│   │   ├── types.ts        ← Animal / Photo / TimelineEvent 类型
│   │   ├── animals.ts      ← 6 只动物数据
│   │   └── constants.ts    ← 网站名、邮箱、Web3Forms Key
│   ├── components/
│   │   ├── Layout.tsx      ← Header + Footer + PixelBackground 布局
│   │   ├── Header.tsx      ← 顶部导航（首页/关于/建议）
│   │   ├── Footer.tsx      ← 版权 + 联系方式
│   │   ├── PixelBackground.tsx ← Canvas 像素星空背景
│   │   ├── AnimalCard.tsx  ← 首页动物卡片
│   │   ├── AnimalGrid.tsx  ← 卡片网格
│   │   ├── Timeline.tsx    ← 时间线组件
│   │   ├── PhotoGallery.tsx ← 照片墙 + 灯箱
│   │   ├── CandleSection.tsx ← 点蜡烛互动
│   │   └── QuoteSection.tsx  ← 底部寄语
│   └── pages/
│       ├── HomePage.tsx    ← /
│       ├── AnimalDetailPage.tsx ← /animal/:id
│       ├── AboutPage.tsx   ← /about
│       └── SuggestPage.tsx ← /suggest
└── CLAUDE.md               ← 本文件
```

## 关键决策

- 路由用 HashRouter（Cloudflare Pages 静态托管友好）
- 表单用 Web3Forms 转发到邮箱（无需后端）
- 蜡烛计数用 localStorage（纯前端，不采集隐私）
- 不做公开评论区（避免论战）
- 照片用公开新闻图 + 注明来源 + 侵权 48h 删除

## 待完成

- [ ] 收集 6 只动物的照片放入 public/photos/{id}/ 目录
- [ ] 获取 Web3Forms Access Key（用 Ados.guo@gmail.com）
- [ ] 注册 animalstarbridge.com 域名
- [ ] 关联 GitHub 仓库 + Cloudflare Pages 部署

## 开发命令

```bash
npm run dev       # 开发服务器
npm run build     # 生产构建
npx tsc --noEmit # 类型检查
```
