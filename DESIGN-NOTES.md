# 作品集设计记录

## 本轮视觉方向

以 [Strivehaus Work 页面](https://www.strivehaus.com/work)作为作品展示的排版参考，重新组织本站自己的内容。首页从密集的栏目概览转为宽阔的作品画廊：近黑底色、暖纸色文字、少量黄铜色强调、大标题、双列大幅卡片和清晰的项目编号。五张卡片分别通向本站独立页面，先看作品，再读方法。页面没有使用参考站的文案、图片、标志或项目成果。

首屏沿用本站港口视频，但以暗色遮罩处理，让标题和入口有足够对比度。AI 视频卡使用本站港口动态素材；短剧、生成式内容和内容运营卡使用本站原创概念视觉，经营决策卡使用代码绘制的抽象图形。深色作品区之后以浅色阅读章节承接个人背景、能力与六阶段方法，末尾回到带港口图片的联系区。详情页仍以清晰阅读为先，保留各项目的事实边界和页面锚点。

视觉层主要在 `src/gallery.css`，由 `src/main.jsx` 最后导入。基础布局、旧版样式及组件样式仍在原文件，修改时需同时检查桌面与手机断点，避免只在某个尺寸被覆盖。

## 导航与动态

- 顶部导航固定并带虚化背景；手机端折叠菜单可用 Escape 关闭。
- 首次进入同一会话有约 1.7 秒开屏；可点跳过或按键结束。
- 首屏背景视频静音循环，提供播放/暂停按钮；AI 视频作品卡只在进入视口且系统未要求减少动态时自动播放。
- 系统“减少动态效果”设置会跳过开屏并抑制自动播放和装饰动画。
- 五张作品卡打开独立 HTML 详情页。短剧六阶段目录保留可直达锚点，也兼容旧哈希路由、刷新和浏览器前进后退。
- 开源参考可按全部、短剧与 AI 视频、AI Agent 筛选；链接通往原作者仓库。

## 内容与素材来源

`public/images/hero-harbor.png` 由内置 ImageGen 生成，为黎明港口主题氛围图；`public/videos/hero-harbor.mp4` 由本地脚本 `scripts/create-hero-video.ps1` 制作成 12 秒、720p、无声循环视频。它们是站点设计素材，不作为个人项目实拍证据。

`public/images/short-drama-concept.png` 与 `public/images/content-ops-concept.png` 是为本轮画廊生成的概念封面，不代表项目实拍或海外成果；对应提示分别描述电影棚里的多市场故事入口，以及内容策划工作台，均要求无文字、标志和可识别人物。`public/images/global-sculpture.png` 为先前生成的金属地球主题图；`public/videos/global-intro.mp4` 保留为源素材。`public/videos/studio-sample.mp4` 使用本站素材，经 MoneyPrinterTurbo 本地流程制作并烧录中文字幕，是 12 秒、16:9 的制作流程样片，不能代表海外发布或市场效果。上游项目归原作者所有，MIT 许可保留在 `public/licenses/MoneyPrinterTurbo-LICENSE.txt`。

`public/skills/short-drama-global/` 已包含六阶段 Skill、策划与本地化模板及制作质检清单。方法参考站内注明的公开项目，但文档为本站重新编写，没有复制其代码或工作流 JSON。海外语种成片、发行成果和客户案例仍待真实记录补充；已有简历 PDF 未改写个人履历。

### 本轮概念封面提示词

- `short-drama-concept.png`：`A cinematic yet clearly conceptual scene: a single anonymous performer seen from behind on a small rain-slick soundstage, a row of three softly illuminated practical doorway sets receding into depth, subtle hints of different city light colors beyond them. Elegant film direction, deep charcoal shadows, muted warm amber and cool slate highlights, tactile atmospheric haze, strong central perspective, sophisticated photography-inspired 3D render. Landscape 16:9. No words, no logos, no UI, no recognizable person, no watermark.`
- `content-ops-concept.png`：`A cinematic editorial still life viewed obliquely: a dark oak worktable covered with a few neatly arranged blank storyboard cards, color swatches, a small desk lamp, one compact camera and headphones; beyond the table, a softly defocused wall of pinned frames and subtle light strips suggests planning, publishing and review. Rich tactile paper and metal textures, charcoal shadows, restrained brass highlights with muted olive and slate, quiet premium art-direction, dramatic practical lighting, strong geometry, shallow depth of field. Landscape 16:9. No people, no legible text, no logos, no dashboards, no metrics, no watermark.`
