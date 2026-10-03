# 谢文炳 · 产业出海作品集

React + Vite 个人网站，展示产业出海方向的内容策划、AI 视频制作与项目协同实践。[线上网站](https://jjoe.onrender.com/)。项目保留原有简历、独立详情页和短剧出海 Skill 文档。

## 本地运行与验证

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
node scripts/test-seo.mjs
node scripts/export-standalone.mjs
node scripts/test-pages.mjs
```

`pnpm preview` 可预览生产构建。需要离线文件时，先构建，再运行 `node scripts/export-standalone.mjs`；输出位于仓库上两级的 `outputs/jjoe-preview/`（完整文件夹）及 `outputs/jjoe-preview.html`（单文件兼容版）。分享文件夹版时请保留其中的素材和页面。

## 页面与内容

首页采用深色作品画廊：开场视频、大幅标题、五张可点击的实践卡片、AI 视频制作能力、互动演示、外部开源参考、个人背景、能力、六阶段方法和联系入口。卡片依次通往短剧出海 Skill、AI 视频制作、生成式内容工作流、内容运营、经营决策与项目协同的独立页面。详情页保留浅色阅读区、章节导航与相关链接。手机端使用折叠菜单。

- `src/App.jsx`：页面结构、首页作品卡、导航、开屏及视频播放行为。
- `src/content.js`：项目、能力、短剧出海六阶段和外部研究参考的文案。
- `src/navigation.js`：独立 HTML 页面与旧哈希地址的兼容路由。
- `src/styles.css`、`src/premium.css`、`src/editorial.css`：基础与既有样式；最后加载的 `src/gallery.css` 定义当前作品画廊视觉。
- `src/components/InteractionLab.jsx`、`WorkflowDemo.jsx`、`SiteEffects.jsx`：互动演示、阶段播放、阅读进度及返回顶部。
- `src/components/VideoCapability.jsx`：AI 视频制作能力介绍及本地试制样片。
- `public/skills/short-drama-global/`：原创 Skill、策划与本地化模板、制作质检清单；详情页链接到 GitHub 可阅读版本。

首页开屏每次会话展示一次，可点击跳过或按键结束。首屏背景视频可手动暂停；AI 视频卡进入视口时播放，离开视口时暂停。系统设置“减少动态效果”时跳过开屏，背景与卡片视频不自动播放，其他动效也相应减弱。主要链接和筛选按钮支持键盘操作。

### 页面地址

项目：`project-short-drama.html`、`project-comfyui.html`、`project-content.html`、`project-business.html`。

AI 视频能力案例：`case-video-production.html`；旧地址 `tool-video-studio.html` 指向同一案例。

能力：`capability-planning.html`、`capability-localization.html`、`capability-workflow.html`、`capability-delivery.html`。

短剧阶段可用 `project-short-drama.html#stage-market` 等地址直达。旧的 `#/projects/...`、`#/capabilities/...` 哈希链接，以及首页 `#work`、`#services` 锚点仍可使用。构建会生成首页和以上 10 个独立详情 HTML 文件。

## 素材与事实边界

- `public/images/hero-harbor.png` 和 `public/videos/hero-harbor.mp4`：本站生成的港口氛围视觉，用于首屏、部分卡片和联系区；不代表真实项目拍摄。
- `public/images/short-drama-concept.png` 和 `public/images/content-ops-concept.png`：本轮生成的概念封面，不代表真实拍摄或项目成果。
- `public/images/global-sculpture.png`：本站生成的地球主题视觉，用于生成式内容工作流卡片；`public/videos/global-intro.mp4` 保留为源素材。
- `public/videos/studio-sample.mp4`：使用本站素材，经 MoneyPrinterTurbo 本地剪辑并烧录中文字幕的 12 秒流程试制样片；不是海外发行案例。
- `public/谢文炳_AI项目经理_优化简历.pdf`：保留的原版简历。

短剧出海 Skill 提供六阶段执行方法和模板，页面集中展示已有成熟案例、原创方法与可复用的执行资料。开源参考区的九个 GitHub 项目明确标注为**外部研究参考**，权利归各作者，不能视为本站作者的个人成果。MoneyPrinterTurbo 的上游代码与 API 未接入本站；其[原仓库](https://github.com/harry0703/MoneyPrinterTurbo)和 MIT 许可分别见外链及 `public/licenses/MoneyPrinterTurbo-LICENSE.txt`。更多设计与素材说明见 [DESIGN-NOTES.md](DESIGN-NOTES.md)。

## 部署

构建时通过 React 预渲染全部 11 个页面，正文和详情链接直接存在于 HTML 中；浏览器再启动原有交互和动画。`src/seo.js` 统一管理每页标题、描述、canonical、分享信息与人物/网页结构化数据。构建还会输出 `robots.txt` 和含 10 个正式网址的 `sitemap.xml`，旧视频入口使用正式案例页的 canonical，不重复列入地图。

更换正式域名时先修改 `src/seo.js` 的 `siteUrl`，重新构建并配置旧域名跳转。搜索资源平台的验证文件或验证标签必须使用站长账号实际提供的值；不要填写假验证码。部署后在百度搜索资源平台、Google Search Console 或 Bing Webmaster Tools 验证网站并提交站点地图。搜索引擎决定是否及何时收录；这些设置不承诺排名。

离线预览继续采用原有客户端渲染，以保留单文件素材嵌入和旧 hash 导航；正式发布使用 `dist`，不发布离线预览作为正式首页。

GitHub `main` 分支部署至 Render 静态站点。构建命令：`pnpm install --frozen-lockfile; pnpm run build`；发布目录：`dist`。
