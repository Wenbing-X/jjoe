import { hrefFor } from '../navigation'
import './video-capability.css'

const source = 'https://github.com/harry0703/MoneyPrinterTurbo'
const chapters = [
  { n: '01', en: 'STORY', title: '把想法整理成脚本', text: '明确受众、目的与视频结构，将主题拆成可剪辑的段落、镜头提示和字幕文案。' },
  { n: '02', en: 'MATERIAL', title: '让素材服从叙事', text: '根据脚本组织画面、声音与视觉风格，检查素材比例、清晰度和可使用范围。' },
  { n: '03', en: 'PRODUCTION', title: '串起自动化制作', text: '用 MoneyPrinterTurbo 等开源工具连接脚本、素材、配音、字幕与剪辑输出，并保留关键设置。' },
  { n: '04', en: 'DELIVERY', title: '按渠道完成交付', text: '面向竖屏与横屏渠道检查节奏、字幕、音轨和成片规格，让版本清楚、成果可复用。' },
]

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function VideoCapabilityEntry() {
  return <section className="vc-entry" aria-labelledby="vc-entry-title"><div className="shell vc-entry-grid">
    <div className="vc-entry-copy"><div className="vc-overline"><span>FEATURED CAPABILITY</span><i />AI VIDEO / GLOBAL CONTENT</div><p className="vc-entry-index">01 / THE MAKING</p><h2 id="vc-entry-title">从一个想法，<br />到一支可交付的<span>短片。</span></h2><p className="vc-entry-text">我能把脚本、画面、字幕、配音与剪辑放进一条清晰的制作流程，让出海内容从创意走向成片。</p><a className="vc-entry-link" href={hrefFor('#/case/video-production')}>了解我的视频制作能力 <Arrow /></a><div className="vc-entry-foot"><span>内容策划</span><span>素材组织</span><span>自动化制作</span><span>多版本交付</span></div></div>
    <a className="vc-entry-visual" href={hrefFor('#/case/video-production')} aria-label="查看 AI 视频制作能力案例"><img src="/images/global-sculpture.png" alt="金属地球雕塑，代表跨市场内容传播" loading="lazy" /><span className="vc-entry-visual-wash" /><span className="vc-entry-frame">XW / VISUAL SYSTEM</span><span className="vc-entry-visual-caption"><strong>Think beyond.<br /><em>Make it visible.</em></strong><span>VIDEO STUDY — 001</span></span><span className="vc-entry-orbit" aria-hidden="true" /></a>
  </div></section>
}

export default function VideoCapability() {
  return <article className="vc-page">
    <header className="vc-hero"><div className="shell"><a className="vc-back" href={hrefFor('#projects')}>← 返回项目实践</a><div className="vc-hero-grid"><div><p className="vc-overline"><span>CAPABILITY / 01</span><i />AI VIDEO PRODUCTION</p><h1 id="detail-title" tabIndex={-1}>让内容，<br /><em>有走向世界的画面。</em></h1></div><div className="vc-hero-side"><span className="vc-hero-mark" aria-hidden="true">01<span>/</span>04</span><p>我能围绕内容目标搭建 AI 短视频制作流程：从脚本和素材组织，到字幕、配音、剪辑及交付版本。MoneyPrinterTurbo 是我用于实践这条链路的开源工具之一。</p><button type="button" onClick={() => { const film = document.getElementById('vc-film'); film?.scrollIntoView(); film?.focus({ preventScroll: true }) }}>观看流程样片 <Arrow /></button></div></div><div className="vc-hero-bottom"><span>XIE WENBING / SELECTED CAPABILITY</span><span>STORY → MATERIAL → FILM</span></div></div></header>

    <section className="vc-intro section"><div className="shell vc-intro-grid"><div><p className="vc-kicker">THE CAPABILITY</p><h2>工具之外，<br /><em>更重要的是制作判断。</em></h2></div><div className="vc-intro-copy"><p>短视频出海需要在有限时长里讲清楚价值，也需要在语言、比例和渠道之间保持内容的一致性。我关注的是如何把这些要求拆成可以执行、检查和复用的制作步骤。</p><p>我可以从主题与脚本开始，安排画面素材、字幕配音和导出规格，并用自动化工具减少重复操作；关键的叙事、适配和质量判断仍由人来完成。</p><div className="vc-tag-row"><span>脚本结构</span><span>多语言版本</span><span>AI 工具链</span><span>交付质检</span></div></div></div></section>

    <section className="vc-process section" aria-labelledby="vc-process-title"><div className="shell"><div className="vc-section-top"><div><p className="vc-kicker">HOW I WORK / 01—04</p><h2 id="vc-process-title">从创意到成片，<br /><em>每一环都有明确任务。</em></h2></div><p>把可重复的步骤交给工具，把创作判断留在流程中。</p></div><div className="vc-chapters">{chapters.map(chapter => <div className="vc-chapter" key={chapter.n}><div className="vc-chapter-head"><span>{chapter.n}</span><span>{chapter.en}</span></div><h3>{chapter.title}</h3><p>{chapter.text}</p><span className="vc-chapter-line" aria-hidden="true" /></div>)}</div></div></section>

    <section className="vc-film-section section" id="vc-film" tabIndex={-1} aria-labelledby="vc-film-title"><div className="shell vc-film-grid"><div className="vc-film-copy"><p className="vc-kicker">PROCESS PROOF / 001</p><h2 id="vc-film-title">一支样片，<br /><em>证明流程跑得通。</em></h2><p>使用本站现有的视觉素材，通过 MoneyPrinterTurbo 本地完成剪辑与中文字幕渲染。这是流程试制样片，展示我对脚本、素材和成片环节的组织方式。</p><dl><div><dt>素材</dt><dd>本站主视觉视频</dd></div><div><dt>处理</dt><dd>本地剪辑 / 中文字幕</dd></div><div><dt>输出</dt><dd>12 秒 · 16:9 MP4</dd></div></dl><a className="vc-source" href={source} target="_blank" rel="noopener noreferrer">了解开源项目 MoneyPrinterTurbo <Arrow /></a></div><div className="vc-film"><div className="vc-film-head"><span>VIDEO STUDY / 001</span><span>00:12 / 16:9</span></div><video src="/videos/studio-sample.mp4" poster="/images/global-sculpture.png" controls playsInline preload="metadata" aria-label="AI 视频工作流试制样片" /><div className="vc-film-foot"><span>脚本 / 素材 / 字幕 / 成片</span><span>LOCAL PRODUCTION STUDY</span></div></div></div></section>

    <section className="vc-applications section"><div className="shell"><div className="vc-section-top"><div><p className="vc-kicker">WHERE IT FITS</p><h2>面向不同市场，<br /><em>保留同一种清晰度。</em></h2></div><p>工作流可按内容目标调整镜头、语言版本和交付规格。</p></div><div className="vc-app-grid"><div><span>01 / STORY</span><h3>短剧预告</h3><p>突出情绪钩子与人物关系，把完整故事浓缩为适合传播的短片。</p></div><div><span>02 / PRODUCT</span><h3>产品介绍</h3><p>围绕用户场景与关键卖点安排脚本、画面和字幕表达。</p></div><div><span>03 / BRAND</span><h3>品牌内容</h3><p>统一视觉语气与多语言版本，让不同渠道保持一致的品牌感。</p></div></div><div className="vc-endnote"><p>这份展示聚焦个人制作能力与流程试制；完整短剧出海 Skill 资料会在整理后补充。</p><a href={hrefFor('#/projects/short-drama')}>查看短剧出海工作流 <Arrow /></a></div></div></section>
  </article>
}
