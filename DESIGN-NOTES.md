# 产业出海作品集改版

本版将个人网站调整为「产业出海 · AI 内容 · 项目交付」，以深海蓝、暖白、银色和克制的朱红建立统一风格。首屏用大幅中文标题与衬线英文形成层级；细线、分区编号和充足留白贯穿首页与详情。既有经历作为实践基础，出海延伸内容以探索方向和流程框架呈现。

## 页面与交互

- 首页：个人定位、重点工作流、项目、开源参考、个人背景、能力、工作原则、联系。项目和开源参考提前展示。
- 项目区：分镜概念图、三张原创线条封面、清晰的独立页面入口；概念图仅为视觉说明。
- 开源参考：9 个外部研究链接，可按全部、短剧与 AI 视频、AI Agent 筛选；保留作者归属说明。
- 4 个项目详情页、4 个能力详情页，以及 1 个 AI 视频制作能力案例页。
- 短剧出海流程：市场洞察、选题策划、本地化、AI 制作、质检交付、发布复盘。
- 每个阶段可通过目录跳转；支持刷新、浏览器前进后退、同一阶段重复点击。
- 手机端折叠菜单，键盘焦点管理，减少动态效果偏好支持。
- 固定悬浮导航滚动后轻微收紧，半透明虚化背景，约 1.7 秒开屏揭幕；可点击跳过或按键结束。
- 12 秒本地背景视频，港口实景风格主视觉配渐变遮罩，保留文字对比；可暂停播放。
- 8 个实际 HTML 详情页面，刷新与静态部署可直接访问，同时兼容原哈希链接。
- 离线目录版保留独立页面；单文件兼容版内嵌图片、视频、样式与代码。

## 视频素材

`public/videos/hero-harbor.mp4` 由港口主题主视觉经本地 FFmpeg 制作，720p、24 fps、12 秒、H.264、无音轨。使用周期性缓慢缩放与平移，使循环接点平顺。属于视觉氛围素材，不代表真实项目拍摄经历。脚本：`scripts/create-hero-video.ps1`。

## 海外官网参考

本轮参考南孚国际站公开页面的信息架构和节奏：黑白主色配单一信号色、悬浮导航、全屏首屏、全球信任指标、长期时间线和明确的联系入口。页面只借鉴这些设计语言，不复制南孚的文字、商标、图片或业务数据；本页的数字信号均来自本站已有页面结构，具体经历与成果仍以真实资料为准。

## 后续补充

- 完整 Skill 文档、执行说明、提示词与本地化模板。
- 实际工具链与节点工作流。
- 样片、真实项目记录及复盘数据。
- 当前简历 PDF 保留原有 AI 项目方向版本，未修改个人履历或编造出海成绩。

## 主视觉

- 文件：`public/images/hero-harbor.png`
- 方式：内置 ImageGen 生成，1672 × 941 PNG；右侧为黎明港口、船舶与岸桥，左侧为深蓝色标题留白。
- 用途：首页主题视觉，不作为个人项目实拍或成果证据。

原有 `public/images/global-sculpture.png` 仍用于 AI 视频能力案例及样片展示；对应的 `global-intro.mp4` 仅作源文件归档。其原始生成提示词保留如下：

最终提示词：

Use case: stylized-concept
Asset type: a premium editorial website hero image for a Chinese personal portfolio focused on global industry expansion, AI content, and project delivery.
Primary request: Generate exactly one landscape 16:9 image of a monumental sculptural brushed silver globe formed from thin curved meridian metal ribbons.
Scene/backdrop: a nearly black deep navy gallery background.
Subject: sculptural silver globe with an elegant orbital arc sweeping behind the sphere, an understated metaphor for global expansion.
Style/medium: sophisticated photorealistic 3D sculpture, precise industrial design, museum-quality art direction, premium modern editorial restraint.
Composition/framing: landscape 16:9; globe centered slightly right with generous negative space on the left and enough safe cropping room around the sculpture.
Lighting/mood: subtle crisp cobalt blue rim light, beautifully controlled soft highlights on silver, calm and confident.
Color palette: deep navy, brushed silver, restrained cobalt blue; harmonizes with a white, navy, and silver website.
Materials/textures: tactile sophisticated brushed metal.
Constraints: no typography, no text, no logos, no watermark, no UI, no maps claiming geographic precision.
Avoid: neon cyberpunk, stars, busy detail.
