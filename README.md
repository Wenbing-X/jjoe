# 谢文炳 · 产业出海作品集

React + Vite 个人网站，关注产业出海、AI 内容和项目协同。保留原项目的依赖、锁文件和简历文件。

## 本地运行

使用项目锁文件安装依赖：pnpm install --frozen-lockfile

开发预览：pnpm dev

生产构建：pnpm build

构建预览：pnpm preview

离线预览：先运行 `pnpm build`，再运行 `node scripts/export-standalone.mjs`。脚本会在此工作目录的 `outputs/jjoe-preview/` 生成首页、8 个原有详情页和 AI 视频能力案例页；双击其中的 `index.html` 即可打开。分享时保留整个文件夹。另有 `outputs/jjoe-preview.html` 单文件兼容版，使用页内路由且内嵌全部素材。案例页是静态作品展示，无需视频生成服务。

验证：`node scripts/test-pages.mjs` 检查独立页面、阶段链接和离线资源。

## 内容维护

- src/content.js：项目、能力、短剧出海六阶段流程、GitHub 外部参考项目与详情文案。
- src/App.jsx：首页、详情页、菜单与导航交互。
- src/navigation.js：哈希路由解析、合法性检查、页面标题。
- src/styles.css：配色、字体层级、布局与响应式样式。
- src/premium.css：悬浮导航、动态首屏、暖白内容区与移动端视觉细化。
- src/editorial.css：深蓝、暖白与朱红视觉系统，项目封面、研究项目筛选区与响应式排版。
- src/components/InteractionLab.jsx：目的地连线和英、日、西三种预设字幕切换。
- src/components/WorkflowDemo.jsx：六阶段流程演示，支持手动选择、播放、暂停、重播与重置。
- src/components/SiteEffects.jsx：卡片鼠标光晕、封面轻微倾斜、阅读进度和返回顶部。
- src/components/VideoCapability.jsx 与 video-capability.css：AI 视频制作能力的首页视觉入口、独立案例页和本地试制样片。
- public/images/hero-harbor.png：首屏港口主视觉，保留左侧标题空间。
- public/videos/hero-harbor.mp4：由港口主视觉制作的 12 秒、720p、无声循环背景视频，可用 `scripts/create-hero-video.ps1` 重新生成。
- public/images/global-sculpture.png：先前的地球主题素材，保留在 AI 视频能力案例中；public/videos/global-intro.mp4 仅作源文件归档。
- public/videos/studio-sample.mp4：基于本站主视觉素材，经 MoneyPrinterTurbo v1.3.7 本地剪辑并烧录中文字幕的样片；上游项目版权归原作者。
- public/谢文炳_AI项目经理_优化简历.pdf：原版简历。

短剧出海模块当前是展示用流程框架。完整 Skill、提示词模板、工具链和案例资料补齐后，再更新对应内容；不要将待补资料标注为可下载或已执行的成果。

## 路由

项目页面：`project-short-drama.html`、`project-comfyui.html`、`project-content.html`、`project-business.html`。

能力案例页：`case-video-production.html`。旧地址 `tool-video-studio.html` 继续展示这一能力案例，原有书签不会进入失效工具页。

能力页面：`capability-planning.html`、`capability-localization.html`、`capability-workflow.html`、`capability-delivery.html`。

工作流阶段：`project-short-drama.html#stage-market` 等。以下旧哈希地址也保持兼容。

首页章节：#about、#projects、#playground、#capabilities、#references、#contact。

开源参考：首页项目区之后展示短剧 / AI 视频项目与 AI Agent 编排项目，支持全部、短剧视频、Agent 三种筛选。卡片均标注为外部研究参考，并直接链接到 GitHub 原仓库，不代表个人成果。

项目详情：#/projects/short-drama、#/projects/comfyui、#/projects/content、#/projects/business。

工作流阶段：#/projects/short-drama/market、story、localize、produce、deliver、iterate（阶段名接在 short-drama/ 后）。

能力详情：#/capabilities/planning、localization、workflow、delivery（能力名接在 capabilities/ 后）。

旧首页锚点 #work 和 #services 仍可跳转到对应的新章节。

## 部署

作品集可按原 Render 静态网站流程部署，构建产物位于 dist。AI 视频页展示个人制作能力与样片，不调用 MoneyPrinterTurbo API，也没有上传或生成入口。当前只更新本地源码与预览，尚未发布线上站点。页面中的开源来源链接指向 [MoneyPrinterTurbo 原仓库](https://github.com/harry0703/MoneyPrinterTurbo)；完整 MIT 许可保留在 `public/licenses/MoneyPrinterTurbo-LICENSE.txt`。

## 动态与交互

首次进入首页展示约 1.7 秒开屏动画，同一会话内不重复。背景视频默认静音循环，可手动暂停。系统启用“减少动态效果”时默认跳过开场并暂停视频，仍允许主动播放。手机端使用折叠菜单；项目和能力卡片打开独立页面，工作流阶段支持定位、刷新与浏览器前进后退。

具体设计说明与主视觉来源见 DESIGN-NOTES.md。

互动实验位于项目区之后（#playground）。字幕为预设演示文案，流程播放为阶段可视化，不调用模型或生成真实成片。演示由用户主动启动，离开视口或切换后台会暂停。系统减少动态效果设置会关闭连线动画、卡片倾斜及光晕；所有主要交互可通过键盘操作。
