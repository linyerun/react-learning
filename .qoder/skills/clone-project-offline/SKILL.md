---
name: clone-project-offline
description: 基于仓库内已有 demo 项目创建同级新项目，复用 npm 本地缓存离线安装全部依赖，零网络下载。当用户要求"创建 react-demoXX""新建一个和 XX 同级的 demo""复用已安装的依赖不想重新下载"时使用。适用于本仓库任何 npm + Vite 项目。
argument-hint: <源项目目录> <新项目目录>
---

# 离线克隆同级 demo 项目

## 概述

npm 首次安装时已把包存入 `~/.npm/_cacache`。只要新项目使用与源项目相同的 `package.json` + `package-lock.json`，`npm install --offline` 即可全部命中缓存、零网络下载。核心是 **lockfile 必须一起复制**：它锁定的正是缓存里已有的那批版本；不带 lockfile 时 npm 可能解析到更新的版本（缓存没有）而被迫联网。

## 流程

### 1. 确认缓存可用

```bash
du -sh ~/.npm/_cacache          # 确认缓存存在
npm cache ls <关键包名>          # 抽查 react / antd / vite 等
```

对比版本时以源项目 **package-lock.json 锁定版本**（或 `node_modules/<pkg>/package.json` 的实际版本）为准，不要看 package.json 的 semver 范围——`^8.3.6` 实际可能装的是 8.3.8。

### 2. 复制脚手架（不复制 src 和 node_modules）

```bash
mkdir <新项目目录>
cp <源目录>/{package.json,package-lock.json,vite.config.ts,tsconfig*.json,eslint.config.js,index.html} <新项目目录>/
cp -R <源目录>/public <新项目目录>/public
mkdir <新项目目录>/src
```

按源项目实际存在的文件调整清单。保留 vite.config.ts 中的 `@` 别名和 mock server 等配置，tsconfig 的 paths 与之配套。

### 3. 改名（3 处）

- `package.json` 的 `name`
- `package-lock.json` 的顶部 `name` 和 `packages[""].name`（两处，都在文件头部，sed 限定前 10 行即可）
- `index.html` 的 `<title>`

### 4. 新建最小 src 入口

创建 `src/main.tsx`（StrictMode + createRoot，沿用源项目的 `@/` 导入风格）、`src/App.tsx`、`src/index.css`。App 中放一个用到核心依赖的组件（如 antd Button），用于后续验证依赖真实可用。

### 5. 离线安装

```bash
cd <新项目目录> && npm install --offline
```

用 `--offline`（强制只用缓存，缺包直接报错暴露问题），不用 `--prefer-offline`（会静默回落联网）。

### 6. 验证（缺一不可）

1. `npm run dev` 后台启动，读输出确认实际端口（默认端口被占用时 Vite 自动 +1）
2. 浏览器打开页面：take_snapshot 确认标题和验证组件渲染，list_console_messages 确认无报错；内置浏览器视窗未打开时截图/点击不可用，如实说明未做交互测试
3. `npm run build` 确认 tsc + vite 完整编译通过

## 已知无害告警

- `npm warn allow-scripts fsevents@...`：macOS 可选依赖的安装脚本提示，源项目同样存在，可忽略
- 端口 5173 被占用自动换 5174：其他 demo 的 dev server 在跑，属正常现象