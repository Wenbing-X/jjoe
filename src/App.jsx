import { useEffect, useRef, useState } from 'react'
import { projects, stages, capabilities, referenceProjects, agentReferences } from './content'
import { parseHash, parseLocation, hrefFor, routeTitle } from './navigation'
import InteractionLab from './components/InteractionLab'
import SiteEffects from './components/SiteEffects'
import VideoCapability, { VideoCapabilityEntry } from './components/VideoCapability'

const EMAIL = 'wuzibx@foxmail.com'
const RESUME = '/谢文炳_AI项目经理_优化简历.pdf'

function Link({ href, ...props }) {
  return <a {...props} href={href?.startsWith('#') ? hrefFor(href) : href} />
}

function Opening() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try { return !sessionStorage.getItem('xw-intro-seen') } catch { return true }
  })
  useEffect(() => {
    if (!visible) return
    try { sessionStorage.setItem('xw-intro-seen', '1') } catch {}
    const timer = setTimeout(() => setVisible(false), 1700)
    const dismiss = () => setVisible(false)
    window.addEventListener('keydown', dismiss, { once: true })
    return () => { clearTimeout(timer); window.removeEventListener('keydown', dismiss) }
  }, [visible])
  return visible ? <div className="opening"><div aria-hidden="true" className="opening-content"><span className="opening-caption">XIE WENBING · PERSONAL PORTFOLIO</span><div className="opening-word">Beyond<span> boundaries.</span></div><span className="opening-line" /><span className="opening-foot">从本土洞察，走向全球可能。</span></div><button className="opening-skip" onClick={() => setVisible(false)}>跳过动画 <Arrow /></button></div> : null
}

function Hero() {
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (preference.matches) video.current?.pause()
      else video.current?.play().catch(() => setPlaying(false))
    }
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])
  const toggleVideo = () => {
    if (video.current?.paused) video.current.play().catch(() => setPlaying(false))
    else video.current?.pause()
  }
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <img className="hero-image" src="/images/hero-harbor.png" width="1672" height="941" alt="" fetchPriority="high" />
    <video ref={video} className="hero-video" src="/videos/hero-harbor.mp4" poster="/images/hero-harbor.png" muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <div className="hero-shade" />
    <div className="shell hero-inner">
      <div className="hero-topline"><span>INDEPENDENT THINKING. GLOBAL PERSPECTIVE.</span><span>个人作品与方法 / PORTFOLIO</span></div>
      <div className="hero-composition">
        <div className="hero-copy"><p className="hero-kicker"><span />产业出海 · AI 内容 · 项目交付</p><h1 id="hero-title">让价值，<br /><span>跨越边界。</span></h1><p className="hero-intro">我是谢文炳。我能将内容策划、AI 视频制作与项目方法<br className="desktop-break" />连接成清晰的出海工作路径。</p><div className="hero-actions"><Link className="button button-light" href="#projects">探索我的实践 <Arrow diagonal /></Link><Link className="hero-text-link" href="#/case/video-production">AI 视频制作能力 <Arrow /></Link></div></div>
        <div className="hero-signature" aria-hidden="true"><span className="hero-orbit-label">A WIDER PERSPECTIVE</span><span className="hero-script">Beyond<br /><em>boundaries.</em></span><span className="hero-art-caption">LOCAL INSIGHT — GLOBAL AMBITION</span></div>
      </div>
      <div className="hero-bottom"><Link href="#projects"><span className="scroll-line" />向下探索</Link><span>BASED IN CHANGSHA · CONNECTED TO THE WORLD</span><button className="video-toggle" onClick={toggleVideo} aria-label={playing ? '暂停背景视频' : '播放背景视频'}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>{playing ? '暂停动态' : '播放动态'}</button></div>
    </div>
  </section>
}

function PracticeArt({ kind }) {
  return <div className={'practice-art art-' + kind} aria-hidden="true"><svg viewBox="0 0 180 120" fill="none"><path className="art-grid" d="M0 30H180M0 60H180M0 90H180M30 0V120M60 0V120M90 0V120M120 0V120M150 0V120" />{kind === 'comfyui' ? <><path d="M38 60H72L106 26H145M72 60L106 94H145" /><circle cx="38" cy="60" r="12" /><circle cx="110" cy="26" r="8" /><circle cx="110" cy="94" r="8" /></> : kind === 'content' ? <><rect x="42" y="24" width="56" height="74" rx="2" /><rect x="72" y="15" width="56" height="74" rx="2" /><path d="M84 38H114M84 47H106M84 66H114" /></> : <><path d="M30 84L90 52L150 84L90 116ZM30 61L90 29L150 61L90 93ZM30 38L90 6L150 38L90 70Z" /></>}</svg></div>
}

function FilmStudy() {
  return <div className="film-study" aria-hidden="true"><span className="film-study-label">STORYBOARD STUDY / 001</span><svg viewBox="0 0 600 280" fill="none"><defs><linearGradient id="film-light" x1="250" y1="40" x2="450" y2="280" gradientUnits="userSpaceOnUse"><stop stopColor="#ece5d3" stopOpacity=".55" /><stop offset="1" stopColor="#ece5d3" stopOpacity="0" /></linearGradient></defs><path d="M320 25 525 280H155Z" fill="url(#film-light)" /><path d="M42 242H558M80 217H520M133 194H467" stroke="currentColor" opacity=".24" /><path d="M130 242V110L202 67V242M202 67H412V242M238 242V94H380V242" stroke="currentColor" opacity=".6" /><circle cx="315" cy="143" r="12" fill="currentColor" /><path d="M298 162Q315 153 332 162L340 211H330L327 242H317L313 210L310 242H300L301 203H292Z" fill="currentColor" /><path d="M38 56V30H64M536 30H562V56M38 224V250H64M536 250H562V224" stroke="currentColor" opacity=".55" /><path d="M282 24H294M300 24H312M318 24H330" stroke="#e85442" strokeWidth="3" /></svg><span className="film-study-foot"><span>01 / 场景构想</span><span>VISUAL DEVELOPMENT</span></span></div>
}

function TrustSection() {
  const signals = [
    { value: '06', label: '短剧出海流程阶段', href: '#/projects/short-drama' },
    { value: '04', label: '项目实践方向', href: '#projects' },
    { value: '04', label: '能力与方法模块', href: '#capabilities' },
    { value: '01', label: '从洞察到交付的路径', href: '#/projects/short-drama/deliver' },
  ]
  return <section className="trust-section section" aria-labelledby="trust-title"><div className="shell trust-inner"><div className="trust-intro"><p className="eyebrow"><span>INDEX</span><span className="label-rule" />AT A GLANCE</p><h2 id="trust-title">清晰的方法，<br /><em>是走向远方的起点。</em></h2><p>从内容实践到出海探索，把每个方向拆成可理解、可执行的步骤。</p></div><div className="trust-signals">{signals.map(signal => <Link className="trust-signal" href={signal.href} key={signal.value + signal.label}><strong>{signal.value}</strong><span>{signal.label}</span><Arrow diagonal /></Link>)}</div></div></section>
}

function MethodTimeline() {
  const items = [
    { id: 'market', number: '01', title: '先看市场', text: '明确受众、渠道与需要验证的问题。' },
    { id: 'story', number: '02', title: '再做内容', text: '把选题拆成故事、脚本与可制作的镜头。' },
    { id: 'produce', number: '03', title: '用 AI 提效', text: '连接画面、声音与剪辑，保留过程记录。' },
    { id: 'iterate', number: '04', title: '最后复盘', text: '把交付反馈带回下一轮创作与判断。' },
  ]
  return <section className="method-timeline section" aria-labelledby="timeline-title"><div className="shell"><div className="timeline-head"><div><p className="eyebrow"><span>06</span><span className="label-rule" />THE WAY I WORK</p><h2 id="timeline-title">一条可复用的<br /><em>出海工作路径。</em></h2></div><p>从市场判断到发布复盘，每一步都有输入、输出和下一步。完整 Skill 资料补齐后，会在这条路径上继续展开。</p></div><div className="timeline-track">{items.map(item => <Link className="timeline-item" href={'#/projects/short-drama/' + item.id} key={item.id}><span className="timeline-number">{item.number}</span><span className="timeline-line" /><div><h3>{item.title}</h3><p>{item.text}</p></div><Arrow diagonal /></Link>)}</div></div></section>
}

function ReferenceCard({ item, index }) {
  const isAgent = agentReferences.some(reference => reference.id === item.id)
  return <a className={'reference-card ' + (isAgent ? 'reference-agent' : 'reference-video')} href={item.url} target="_blank" rel="noreferrer">
    <div className="reference-card-top"><span>{isAgent ? 'AI AGENT' : 'STORY & VIDEO'}</span><span className="reference-serial">{String(index + 1).padStart(2, '0')}</span></div>
    <h3>{item.title}</h3>
    <p>{item.summary}</p>
    <div className="reference-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="reference-card-foot"><span>查看 GitHub 项目</span><Arrow diagonal /></div>
  </a>
}

function ReferenceLibrary() {
  const [filter, setFilter] = useState('all')
  const all = [...referenceProjects, ...agentReferences]
  const visible = filter === 'video' ? referenceProjects : filter === 'agent' ? agentReferences : all
  const filters = [{ id:'all', label:'全部项目', count:all.length }, { id:'video', label:'短剧与 AI 视频', count:referenceProjects.length }, { id:'agent', label:'AI Agent', count:agentReferences.length }]
  return <section className="references section" id="references" aria-labelledby="references-title"><div className="shell">
    <div className="references-head"><div><Label number="02">OPEN SOURCE / FIELD NOTES</Label><h2 id="references-title">在开放的技术里，<br /><em>寻找下一种可能。</em></h2></div><div className="reference-intro"><p>短剧生产、生成式视频、多 Agent 协作。沿着具体项目，观察内容从想法走向交付的不同路径。</p><span>外部开源研究参考 · 项目归原作者所有</span></div></div>
    <div className="reference-toolbar"><div className="reference-filters" role="group" aria-label="筛选开源项目">{filters.map(item => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{String(item.count).padStart(2, '0')}</span></button>)}</div><span className="reference-count" role="status" aria-live="polite">{visible.length} 个项目</span></div>
    <div className="reference-grid">{visible.map(item => <ReferenceCard item={item} key={item.id} index={all.indexOf(item)} />)}</div>
    <p className="reference-colophon">INDEPENDENT RESEARCH <span>持续观察，持续连接。</span></p>
  </div></section>
}

export function Arrow({ diagonal = false, back = false }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={'arrow' + (diagonal ? ' diagonal' : '') + (back ? ' back' : '')}><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Header({ route }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef(null)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    const close = () => setOpen(false)
    const escape = e => { if (e.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus() } }
    window.addEventListener('hashchange', close)
    window.addEventListener('keydown', escape)
    return () => { window.removeEventListener('hashchange', close); window.removeEventListener('keydown', escape) }
  }, [open])
  return <header className={'header' + (scrolled ? ' is-scrolled' : '')}><div className="shell header-inner">
    <Link className="brand" href="#top" aria-label="谢文炳，返回首页"><span className="brand-mark">XW<span>·</span></span><span className="brand-name">谢文炳<small>GLOBAL PERSPECTIVE</small></span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open ? '关闭导航' : '打开导航'} onClick={() => setOpen(!open)}>{open ? '关闭' : '菜单'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-nav" className={'nav ' + (open ? 'is-open' : '')} aria-label="主导航">
      <Link href="#/case/video-production" aria-current={route.type === 'case' ? 'page' : undefined} onClick={() => setOpen(false)}>AI 视频制作</Link>
      <Link href="#about" aria-current={route.section === 'about' ? 'location' : undefined} onClick={() => setOpen(false)}>关于我</Link><Link href="#projects" aria-current={route.section === 'projects' || route.type === 'project' ? 'location' : undefined} onClick={() => setOpen(false)}>项目实践</Link><Link href="#/projects/short-drama" aria-current={route.id === 'short-drama' ? 'page' : undefined} onClick={() => setOpen(false)}>出海工作流</Link><Link href="#capabilities" aria-current={route.section === 'capabilities' || route.type === 'capability' ? 'location' : undefined} onClick={() => setOpen(false)}>能力与方法</Link><Link href="#references" aria-current={route.section === 'references' ? 'location' : undefined} onClick={() => setOpen(false)}>开源参考</Link><Link className="nav-contact" href="#contact" onClick={() => setOpen(false)}>联系我</Link>
    </nav><Link className="header-contact" href="#contact">联系我 <Arrow diagonal /></Link>
  </div></header>
}
function Label({ number, children }) { return <div className="eyebrow"><span>{number}</span><span className="label-rule" />{children}</div> }
function SectionHead({ number, en, title, text }) {
  return <div className="section-head"><div><Label number={number}>{en}</Label><h2>{title}</h2></div>{text && <p>{text}</p>}</div>
}
function Home() {
  return <>
    <Hero />
    <nav className="focus-strip" aria-label="探索方向"><div className="shell focus-strip-inner"><span className="focus-label">我的关注 / FOCUS</span><Link href="#/capabilities/planning"><span>01</span>产业与市场<Arrow diagonal /></Link><Link href="#/projects/short-drama"><span>02</span>内容与出海<Arrow diagonal /></Link><Link href="#/capabilities/workflow"><span>03</span>AI 与交付<Arrow diagonal /></Link></div></nav>
    <section className="projects section" id="projects" aria-labelledby="projects-title"><div className="shell">
      <SectionHead number="01" en="SELECTED PRACTICE" title={<span id="projects-title">从实践出发，向世界延伸。</span>} text="围绕产业出海，连接已有的内容制作、工作流搭建与项目运营经验。" />
      <article className="featured-project"><div className="featured-copy"><div className="project-meta"><span>FEATURED PRACTICE / 01</span><span className="status-tag">框架预览</span></div><Link href="#/projects/short-drama"><h3>短剧出海<br /><span>Skill 工作流</span></h3></Link><p>从市场洞察，到本地化与 AI 制作。<br />让一个故事，有走向更多市场的可能。</p><div className="tag-list"><span>内容出海</span><span>AI WORKFLOW</span><span>项目协同</span></div><Link className="featured-cta" href="#/projects/short-drama">探索完整流程 <span className="circle-arrow"><Arrow diagonal /></span></Link><span className="featured-note">六阶段框架 · 完整 Skill 资料待补充</span></div><div className="workflow-preview"><div className="workflow-preview-head"><span>THE STORY GOES FURTHER.</span><span>01—06</span></div><FilmStudy /><div className="workflow-preview-title" aria-hidden="true">One story.<br /><em>New horizons.</em></div><div className="flow-steps">{stages.map((stage,i) => <Link href={'#/projects/short-drama/' + stage.id} key={stage.id}><span>{String(i+1).padStart(2,'0')}</span><strong>{stage.short}</strong><Arrow diagonal /></Link>)}</div><div className="workflow-preview-foot"><span>INSIGHT → CREATION → ITERATION</span><span>点击阶段进入详情 ↗</span></div></div></article>
      <div className="project-list">{projects.slice(1).map(project => <Link className="project-row" href={'#/projects/' + project.id} key={project.id}><span className="project-number">{project.number}</span><PracticeArt kind={project.id} /><div className="project-row-title"><span>{project.en}</span><h3>{project.title}</h3></div><p>{project.summary}</p><span className="project-category">{project.category}</span><span className="project-row-arrow"><Arrow diagonal /></span></Link>)}</div>
      <Link className="lab-entry" href="#playground"><span><small>TRY IT</small>动手试试：出海互动实验</span><Arrow diagonal /></Link>
    </div></section>
    <VideoCapabilityEntry />
    <InteractionLab />
    <ReferenceLibrary />
    <section className="about section shell" id="about" aria-labelledby="about-title">
      <div className="about-side"><Label number="03">ABOUT ME</Label><p className="about-name">谢文炳<span>XIE WENBING</span></p><span className="small-label">产业出海方向 / 项目与内容协同</span></div>
      <div className="about-main"><h2 id="about-title">用全球视角看机会，<br /><span className="muted-title">用项目方法做交付。</span></h2><div className="about-copy"><p>我关注产业出海中的内容传播与项目协同，以短剧出海工作流作为当前探索切入点。能把内容目标拆成脚本、素材、字幕与成片环节，让创意有可执行的制作路径。</p><p>工商管理本科背景，具备 AI 短剧账号从 0 到 1 的独立执行经验。熟悉 ComfyUI 本地工作流，结合 MoneyPrinterTurbo、即梦与剪映，推进选题、制作、发布和复盘。</p></div><div className="about-notes"><div><span>关注方向</span><strong>产业出海 · 内容本地化 · AI 工作流</strong></div><div><span>实践基础</span><strong>AI 视频制作 · 运营复盘 · 团队协同</strong></div></div><Link className="underlined-link" href={RESUME} target="_blank" rel="noreferrer">查看个人简历 <Arrow diagonal /></Link><span className="resume-note">现有版本 · AI 项目方向</span></div>
    </section>
    <TrustSection />
    <section className="capabilities section shell" id="capabilities" aria-labelledby="capabilities-title"><SectionHead number="04" en="CAPABILITIES & APPROACH" title={<span id="capabilities-title">把复杂目标，拆成清晰行动。</span>} text="将项目管理与 AI 内容能力，应用到产业出海的具体环节。" /><div className="capability-grid">{capabilities.map((item,i) => <Link className="capability-card" href={'#/capabilities/' + item.id} key={item.id}><div className="capability-top"><span>{String(i+1).padStart(2,'0')}</span><Arrow diagonal /></div><span className="capability-en">{item.en}</span><h3>{item.title}</h3><p>{item.summary}</p><div className="capability-bottom">{item.tags.join(' / ')}</div></Link>)}</div></section>
    <section className="approach section"><div className="shell approach-inner"><div><Label number="05">WORKING PRINCIPLES</Label><h2>方向可以远，<br />每一步要具体。</h2></div><div className="principles"><div><span>01</span><div><h3>先理解市场，再定义内容</h3><p>把用户、渠道与表达方式放在同一张计划里，从小范围验证开始。</p></div></div><div><span>02</span><div><h3>让工具服务目标</h3><p>根据内容任务选择 AI 工具，用清晰的输入、输出与质量标准串联流程。</p></div></div><div><span>03</span><div><h3>把经验留下，把流程复用</h3><p>用项目记录、素材规范和阶段复盘，减少下一次执行的不确定性。</p></div></div></div></div></section>
    <MethodTimeline />
  </>
}
export function ProjectDetail({ project, activeStage }) {
  const isWorkflow = project.id === 'short-drama'
  const next = projects[(projects.findIndex(p => p.id === project.id) + 1) % projects.length]
  return <article className="detail-page">
    <div className="detail-hero"><div className="shell"><Link className="back-link" href="#projects"><Arrow back />返回项目实践</Link><div className="detail-heading"><div><Label number={project.number}>{project.en}</Label><h1 id="detail-title" tabIndex="-1">{project.title}</h1><p>{project.intro}</p></div><span className="detail-status">{project.status}</span></div><dl className="detail-meta"><div><dt>关注环节</dt><dd>{project.role}</dd></div><div><dt>{isWorkflow ? '已有制作工具基础' : '实践工具与方法'}</dt><dd>{project.tools.join(' / ')}</dd></div><div><dt>方向</dt><dd>产业出海 · 内容与项目</dd></div></dl></div></div>
    <div className="shell detail-layout">
      {isWorkflow ? <aside className="detail-sidebar"><p className="eyebrow">WORKFLOW INDEX</p><nav aria-label="工作流阶段">{stages.map((stage,i) => <Link key={stage.id} href={'#/projects/short-drama/' + stage.id} aria-current={activeStage === stage.id ? 'step' : undefined}><span>{String(i+1).padStart(2,'0')}</span>{stage.short}<Arrow /></Link>)}</nav><p className="sidebar-note">六个阶段，一条交付路径。<br />点击阶段查看工作内容。</p></aside> : <aside className="detail-sidebar"><p className="eyebrow">PROJECT CONTEXT</p><p className="context-note">{project.context}</p><Link className="underlined-link" href="#contact">交流这个方向 <Arrow diagonal /></Link></aside>}
      <div className="detail-content">
        {isWorkflow ? <>
          <Link className="related-project" href="#/case/video-production"><span><span className="eyebrow">AI VIDEO / PRODUCTION CAPABILITY</span><strong>了解我的 AI 视频制作能力</strong><small>脚本 · 素材 · 字幕 · 成片</small></span><Arrow diagonal /></Link>
          <div className="workflow-notice"><span className="notice-label">框架预览</span><h2>先建立路径，再补齐每一步。</h2><p>{project.context}</p><p className="notice-small">以下为展示用流程框架，并非已上传或可运行的完整 Skill。</p></div>
          {stages.map((stage,i) => <section className="stage" id={'stage-' + stage.id} tabIndex="-1" key={stage.id} aria-labelledby={'stage-title-' + stage.id}><div className="stage-heading"><span className="stage-number">{String(i+1).padStart(2,'0')}</span><div><span className="stage-label">{stage.short}</span><h2 id={'stage-title-' + stage.id}>{stage.title}</h2></div></div><p className="stage-intro">{stage.text}</p><ul className="task-list">{stage.tasks.map(task => <li key={task}>{task}</li>)}</ul><dl className="stage-io"><div><dt>输入 / INPUT</dt><dd>{stage.inputs}</dd></div><div><dt>交付物 / OUTPUT</dt><dd>{stage.outputs}</dd></div></dl></section>)}
          <section className="resource-panel"><p className="eyebrow">SKILL LIBRARY</p><h2>工作流资料</h2><p>完整 Skill、提示词模板、工具配置和成果案例将在整理后补充。</p><ul><li><span>Skill 文档与执行说明</span><span>待补充</span></li><li><span>提示词与本地化模板</span><span>待补充</span></li><li><span>工具链与节点工作流</span><span>待补充</span></li><li><span>样片与项目复盘</span><span>待补充</span></li></ul></section>
        </> : <><p className="eyebrow">APPROACH & PRACTICE</p>{project.sections.map((section,i) => <section className="story-section" key={section.title}><span className="stage-label">{String(i+1).padStart(2,'0')}</span><h2>{section.title}</h2><p>{section.text}</p></section>)}<div className="detail-note">具体素材、过程记录与成果样本，后续补充展示。</div></>}
      </div>
    </div>
    <div className="shell detail-bottom"><Link className="back-link" href="#projects"><Arrow back />所有项目</Link><Link className="next-project" href={'#/projects/' + next.id}><span>下一个项目<small>{next.title}</small></span><Arrow /></Link></div>
  </article>
}

export function CapabilityDetail({ item }) {
  const related = projects.find(project => project.id === item.project)
  return <article className="detail-page"><div className="detail-hero"><div className="shell"><Link className="back-link" href="#capabilities"><Arrow back />返回能力与方法</Link><div className="detail-heading"><div><Label number="METHOD">{item.en}</Label><h1 id="detail-title" tabIndex="-1">{item.title}</h1><p>{item.intro}</p></div></div></div></div><div className="shell detail-layout"><aside className="detail-sidebar"><p className="eyebrow">WORKING APPROACH</p><p className="context-note">围绕产业出海中的内容与项目任务，连接已有实践与持续探索。</p><div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></aside><div className="detail-content">{item.sections.map((section,i) => <section className="story-section" key={section.title}><span className="stage-label">{String(i+1).padStart(2,'0')}</span><h2>{section.title}</h2><p>{section.text}</p></section>)}<Link className="related-project" href={'#/projects/' + related.id}><span><span className="eyebrow">RELATED PRACTICE</span><strong>{related.title}</strong></span><Arrow diagonal /></Link></div></div></article>
}

function MissingPage() {
  return <section className="shell missing-page"><p className="eyebrow">PAGE NOT FOUND</p><h1 id="detail-title" tabIndex="-1">这个内容暂时未找到。</h1><p>可以返回首页，继续查看项目与工作流。</p><Link className="button button-dark" href="#projects">查看项目实践 <Arrow /></Link></section>
}

function Contact() {
  return <section className="contact" id="contact" aria-labelledby="contact-title"><div className="shell"><div className="contact-top"><div><p className="eyebrow">LET’S CONNECT</p><h2 id="contact-title">下一站，<br /><span>一起走向更大的市场。</span></h2></div><div className="contact-copy"><p>期待产业出海、AI 内容与项目协同方向的机会。<br />欢迎交流具体想法与合作需求。</p><Link className="contact-email" href={'mailto:' + EMAIL}>{EMAIL}<Arrow diagonal /></Link></div></div><footer className="footer"><Link className="brand-mark" href="#top" aria-label="返回首页">XW<span>·</span></Link><span>© {new Date().getFullYear()} 谢文炳</span><span>CHANGSHA, CHINA</span><Link href="#top">回到顶部 ↑</Link></footer></div></section>
}
export default function App({ initialHash }) {
  const [route, setRoute] = useState(() => initialHash !== undefined ? parseHash(initialHash) : parseLocation(typeof window === 'undefined' ? undefined : window.location))
  const pageKey = route.type + '/' + route.id
  const previousPage = useRef(pageKey)
  useEffect(() => {
    const update = () => setRoute(parseLocation(window.location))
    window.addEventListener('hashchange', update)
    window.addEventListener('popstate', update)
    return () => { window.removeEventListener('hashchange', update); window.removeEventListener('popstate', update) }
  }, [])
  useEffect(() => {
    document.title = routeTitle(route)
    const changedPage = previousPage.current !== pageKey
    previousPage.current = pageKey
    const frame = requestAnimationFrame(() => {
      if (route.type !== 'home' && !route.section) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document.getElementById('detail-title')?.focus({ preventScroll: true })
        return
      }
      const targetId = route.type === 'home' ? route.section : 'stage-' + route.section
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: changedPage ? 'instant' : 'auto', block: 'start' })
        if (changedPage || route.type !== 'home') {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
          target.focus({ preventScroll: true })
        }
      } else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [route.section, pageKey])
  const skipToMain = event => { event.preventDefault(); const main = document.getElementById('main'); main?.focus(); main?.scrollIntoView() }
  const repeatNavigation = event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest('a')
    if (!link) return
    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.hash !== window.location.hash) return
    event.preventDefault()
    const target = document.getElementById(route.type === 'home' ? route.section : route.section ? 'stage-' + route.section : 'detail-title')
    target?.scrollIntoView({ behavior: 'auto', block: 'start' })
    target?.focus({ preventScroll: true })
  }
  return <div className="site" onClick={repeatNavigation}><Link className="skip-link" href="#main" onClick={skipToMain}>跳到主要内容</Link><SiteEffects pageKey={pageKey} /><Header route={route} />{route.type === 'home' && <Opening />}<main id="main" tabIndex="-1">{route.type === 'case' ? <VideoCapability /> : route.type === 'project' ? <ProjectDetail key={pageKey} activeStage={route.section} project={projects.find(p => p.id === route.id)} /> : route.type === 'capability' ? <CapabilityDetail key={pageKey} item={capabilities.find(c => c.id === route.id)} /> : route.type === 'missing' ? <MissingPage /> : <Home />}</main><Contact /></div>
}
