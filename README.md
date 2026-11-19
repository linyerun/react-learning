# 视频
【React19+Hooks+TS+zustand+源码】 https://www.bilibili.com/video/BV1mcpPeMETt/?share_source=copy_web&vd_source=9e4ea62037e1c424c457f441dbe1d437

# 笔记
https://message163.github.io/react-docs/

# WebStorm配置Tab等于两个空格
- 配置 Prettier（推荐，最省心）
- 既然 React 项目通常都配了 Prettier，直接让 WebStorm 调用它即可。前提是你已经在项目里安装了 Prettier（npm install --save-dev prettier）并建好了 .prettierrc 文件。
- 打开设置：按 Ctrl + Alt + S（Mac 是 Cmd + ,）。
- 找到 Prettier：左侧导航到 Languages & Frameworks > JavaScript > Prettier。
- 启用自动配置：选择 Automatic Prettier configuration（自动 Prettier 配置）。
- 勾选保存时运行：务必勾选 Run on save（保存时运行）。这样你每次按 Ctrl + S，WebStorm 就会根据你项目里的 Prettier 规则自动把缩进格式化成 2 空格。
- 确认文件匹配：下面的 Run for files 框里默认已经包含了 **/*.{js,ts,jsx,tsx,...}，覆盖了 React 文件，通常不需要改。
