import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true })

const HERO_VIDEO_URL =
  'https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4'
const HERO_POSTER_URL =
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=72'

const responsiveImage = (baseUrl, width, quality = 74) =>
  `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`

const projects = [
  {
    number: '01',
    title: 'AI SHORT DRAMA',
    subtitle: 'AI 短剧账号从 0 到 1 搭建与运营',
    tags: ['PROJECT PLANNING', 'AIGC WORKFLOW', 'PERSONAL PROJECT'],
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead',
    position: 'center',
  },
  {
    number: '02',
    title: 'COMFYUI PIPELINE',
    subtitle: '本地部署与生成式内容工作流搭建',
    tags: ['COMFYUI', 'TXT-TO-IMAGE', 'IMG-TO-VIDEO'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    position: 'center',
  },
  {
    number: '03',
    title: 'CONTENT LOOP',
    subtitle: '抖音 / 小红书内容运营与数据复盘',
    tags: ['CONTENT OPS', 'DATA REVIEW', 'ITERATION'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    position: 'center',
  },
  {
    number: '04',
    title: 'ERP SIMULATION',
    subtitle: '经营决策、资源配置与团队协作模拟',
    tags: ['BUSINESS', 'TEAMWORK', '2025'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
    position: 'center',
  },
]

const strengths = [
  {
    index: '01',
    title: '拆清需求与计划',
    en: 'PROJECT DELIVERY',
    description:
      '把模糊目标整理成项目范围、任务优先级、时间节点和明确的交付清单。',
    list: ['需求拆解', 'WBS 排期', '交付定义'],
  },
  {
    index: '02',
    title: '搭建 AI 内容流程',
    en: 'AI WORKFLOW',
    description:
      '根据内容目标选择合适工具，串联 ComfyUI、即梦与剪映，沉淀可复用流程。',
    list: ['工具选型', 'ComfyUI', '流程模板'],
  },
  {
    index: '03',
    title: '推动内容按期交付',
    en: 'CONTENT DELIVERY',
    description:
      '协调选题、脚本、画面、剪辑和发布节点，用素材清单与问题记录减少遗漏。',
    list: ['节点跟进', '素材管理', '问题闭环'],
  },
  {
    index: '04',
    title: '用数据完成复盘',
    en: 'DATA ITERATION',
    description:
      '围绕播放量、互动率和内容反馈定位问题，把复盘结论转化为下一轮行动。',
    list: ['指标整理', '原因分析', '迭代建议'],
  },
]

const needs = [
  {
    index: 'N01',
    title: 'AI 项目只有想法，缺少落地路径',
    description: '协助明确目标、用户、范围和交付标准，把概念整理为可执行的项目计划。',
    output: '需求清单 / 项目计划',
  },
  {
    index: 'N02',
    title: 'AIGC 制作工具多、流程容易混乱',
    description: '根据内容类型梳理工具链与制作节点，减少重复试错，沉淀可复用工作流。',
    output: '工具链 / 流程模板',
  },
  {
    index: 'N03',
    title: '任务节点不清，项目容易拖延',
    description: '拆分任务、排定里程碑并记录风险与问题，让每个阶段都有负责人和结果。',
    output: 'WBS / 里程碑 / 问题清单',
  },
  {
    index: 'N04',
    title: '内容生产中素材与信息分散',
    description: '统一管理脚本、画面、版本和待办事项，让协作信息更容易同步与追踪。',
    output: '素材清单 / 协作记录',
  },
  {
    index: 'N05',
    title: '内容发布后缺少优化依据',
    description: '整理播放量、互动率与用户反馈，通过阶段复盘找到下一轮优化方向。',
    output: '数据复盘 / 迭代建议',
  },
  {
    index: 'N06',
    title: '需要快速验证 AI 内容方案',
    description: '用现有生成式工具完成小范围原型与内容样本，尽快验证方向是否可行。',
    output: '内容原型 / 验证样本',
  },
]

function Arrow({ diagonal = false }) {
  return (
    <span className={diagonal ? 'arrow arrow--diagonal' : 'arrow'} aria-hidden="true">
      →
    </span>
  )
}

function App() {
  const [videoPaused, setVideoPaused] = useState(false)
  const [loadHeroVideo, setLoadHeroVideo] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navFloating, setNavFloating] = useState(false)
  const mainRef = useRef(null)
  const videoRef = useRef(null)
  const navFloatingRef = useRef(false)

  useEffect(() => {
    let frameId = null

    const updateNav = () => {
      const secondScreenStart = Math.max(window.innerHeight - 112, 520)
      const shouldFloat = window.scrollY >= secondScreenStart
      if (shouldFloat !== navFloatingRef.current) {
        navFloatingRef.current = shouldFloat
        setNavFloating(shouldFloat)
      }
      frameId = null
    }

    const handleViewportChange = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateNav)
    }

    updateNav()
    window.addEventListener('scroll', handleViewportChange, { passive: true })
    window.addEventListener('resize', handleViewportChange)

    return () => {
      window.removeEventListener('scroll', handleViewportChange)
      window.removeEventListener('resize', handleViewportChange)
      if (frameId !== null) window.cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const effectiveType = connection?.effectiveType ?? ''
    const shouldKeepPoster =
      connection?.saveData ||
      /(^|-)2g$/.test(effectiveType) ||
      window.matchMedia('(max-width: 760px)').matches

    if (shouldKeepPoster) return undefined

    const enableVideo = () => setLoadHeroVideo(true)
    const delayId = window.setTimeout(enableVideo, 4200)

    window.addEventListener('pointerdown', enableVideo, { once: true, passive: true })
    window.addEventListener('scroll', enableVideo, { once: true, passive: true })

    return () => {
      window.clearTimeout(delayId)
      window.removeEventListener('pointerdown', enableVideo)
      window.removeEventListener('scroll', enableVideo)
    }
  }, [])

  useEffect(() => {
    if (!loadHeroVideo || !videoRef.current) return

    const video = videoRef.current
    video.load()
    video.play().catch(() => setVideoPaused(true))
  }, [loadHeroVideo])

  useLayoutEffect(() => {
    const root = mainRef.current
    if (!root) return undefined

    const motionOverride = new URLSearchParams(window.location.search).get('motion')
    const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    const prefersReducedMotion =
      motionOverride === 'reduce' ||
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !isLocalPreview && motionOverride !== 'full')
    const opening = root.querySelector('.opening')
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const canUseParallax =
      window.innerWidth > 760 &&
      !connection?.saveData &&
      (navigator.hardwareConcurrency ?? 4) >= 4

    document.documentElement.dataset.motion = prefersReducedMotion ? 'reduced' : 'full'

    if (prefersReducedMotion) {
      if (opening) opening.style.display = 'none'
      return undefined
    }

    window.history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.body.classList.add('is-opening')

    const context = gsap.context(() => {
      const counter = root.querySelector('.opening__count')
      const progress = { value: 0 }

      gsap.set('.hero-title-line > span', {
        yPercent: 125,
        scaleX: 0.74,
        transformOrigin: 'left center',
      })
      gsap.set('.hero__eyebrow, .hero__meta, .hero__footer', { y: 34, opacity: 0 })
      gsap.set('.nav', { y: -80, opacity: 0 })
      gsap.set('.hero__video', { scale: 1.14 })
      gsap.set('.opening__line-fill', { scaleX: 0, transformOrigin: 'left center' })

      const openingTimeline = gsap.timeline({ defaults: { ease: 'power4.inOut' } })
      openingTimeline
        .from('.opening__mark', { y: 30, opacity: 0, duration: 0.75 })
        .from('.opening__label', { y: 18, opacity: 0, duration: 0.55 }, '-=0.4')
        .to(
          progress,
          {
            value: 100,
            duration: 1.15,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(progress.value)).padStart(3, '0')
            },
          },
          '-=0.2',
        )
        .to('.opening__line-fill', { scaleX: 1, duration: 1.15, ease: 'power3.inOut' }, '<')
        .to('.opening__content', { y: -22, opacity: 0, duration: 0.45 }, '+=0.05')
        .to('.opening__panel--top', { yPercent: -102, duration: 1.12, ease: 'expo.inOut' }, '-=0.08')
        .to('.opening__panel--bottom', { yPercent: 102, duration: 1.12, ease: 'expo.inOut' }, '<')
        .set('.opening', { display: 'none' })
        .to('.nav', { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '-=0.72')
        .to(
          '.hero-title-line > span',
          {
            yPercent: 0,
            scaleX: 1,
            duration: 1.35,
            stagger: 0.14,
            ease: 'power4.out',
          },
          '-=0.65',
        )
        .to('.hero__video', { scale: 1, duration: 2.1, ease: 'power3.out' }, '-=1.45')
        .to(
          '.hero__eyebrow, .hero__meta, .hero__footer',
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          '-=1.15',
        )
        .call(() => document.body.classList.remove('is-opening'))

      const aboutTimeline = gsap.timeline({
        scrollTrigger: { trigger: '#about', start: 'top 70%', once: true },
      })
      aboutTimeline
        .from('#about > .section-index', { x: -100, opacity: 0, duration: 0.9, ease: 'power4.out' })
        .from(
          '#about .about-heading-line > span',
          { yPercent: 120, scaleX: 0.82, duration: 1.25, stagger: 0.12, ease: 'power4.out' },
          '-=0.55',
        )
        .from('#about .about-heading-caption', { y: 42, opacity: 0, duration: 0.9 }, '-=0.8')
        .from(
          '#about .about__visual',
          { clipPath: 'inset(0 0 100% 0)', scale: 1.05, duration: 1.35, ease: 'power4.inOut' },
          '-=1.1',
        )
        .from('#about .about__copy > p', { y: 55, opacity: 0, duration: 0.95, stagger: 0.16 }, '-=0.65')
        .from('#about .experience-list > div', { y: 44, opacity: 0, duration: 0.8, stagger: 0.11 }, '-=0.55')
        .from(
          '#about .about__details > div, #about .resume-link',
          { y: 32, opacity: 0, duration: 0.75, stagger: 0.1 },
          '-=0.45',
        )

      gsap.from('#about .stat', {
        y: 90,
        opacity: 0,
        duration: 1.05,
        stagger: 0.14,
        ease: 'power4.out',
        scrollTrigger: { trigger: '#about .stats', start: 'top 82%', once: true },
      })

      const workHeading = gsap.timeline({
        scrollTrigger: { trigger: '#work', start: 'top 72%', once: true },
      })
      workHeading
        .from('#work .section-index', { x: -110, opacity: 0, duration: 0.9, ease: 'power4.out' })
        .from(
          '#work .motion-heading-line > span',
          { yPercent: 120, scaleX: 0.78, duration: 1.25, stagger: 0.12, ease: 'power4.out' },
          '-=0.6',
        )
        .from('#work .motion-heading-caption, #work .section-heading > p', {
          y: 38,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
        }, '-=0.7')

      gsap.utils.toArray('.project-card').forEach((card, index) => {
        const media = card.querySelector('.project-card__media')
        const image = card.querySelector('img')
        const cover = card.querySelector('.project-card__reveal')
        const cardTimeline = gsap.timeline({
          delay: (index % 2) * 0.14,
          scrollTrigger: { trigger: card, start: 'top 86%', once: true },
        })
        cardTimeline
          .from(card, { y: 120, opacity: 0, duration: 1.15, ease: 'power4.out' })
          .fromTo(
            media,
            { clipPath: 'inset(100% 0 0 0)' },
            { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut' },
            0.05,
          )
          .fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.75, ease: 'power3.out' }, 0.08)
          .to(cover, { scaleY: 0, duration: 1.05, transformOrigin: 'top center', ease: 'power4.inOut' }, 0.18)
          .from(
            card.querySelector('.project-card__info'),
            { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.7',
          )

        if (canUseParallax) {
          gsap.fromTo(
            image,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
            },
          )
        }
      })

      const capabilityHeading = gsap.timeline({
        scrollTrigger: { trigger: '#services', start: 'top 72%', once: true },
      })
      capabilityHeading
        .from('#services > .section-heading .section-index', {
          x: -110,
          opacity: 0,
          duration: 0.9,
          ease: 'power4.out',
        })
        .from(
          '#services > .section-heading .motion-heading-line > span',
          { yPercent: 125, scaleX: 0.78, duration: 1.3, stagger: 0.12, ease: 'power4.out' },
          '-=0.6',
        )
        .from('#services > .section-heading .motion-heading-caption', {
          y: 40,
          opacity: 0,
          duration: 0.85,
        }, '-=0.75')

      gsap.utils.toArray('.capability-card').forEach((card, index) => {
        gsap.from(card, {
          y: 130,
          opacity: 0,
          rotateX: 7,
          transformPerspective: 1000,
          duration: 1.2,
          delay: (index % 4) * 0.13,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
      })

      const needsTimeline = gsap.timeline({
        scrollTrigger: { trigger: '.needs', start: 'top 76%', once: true },
      })
      needsTimeline
        .from('.needs .section-index, .needs .kicker', {
          x: -90,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power4.out',
        })
        .from(
          '.needs-heading-line > span',
          { yPercent: 120, scaleX: 0.8, duration: 1.2, stagger: 0.12, ease: 'power4.out' },
          '-=0.55',
        )
        .from('.needs-heading-caption, .needs__heading > div:last-child > p', {
          y: 38,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
        }, '-=0.7')

      gsap.utils.toArray('.need-card').forEach((card, index) => {
        gsap.from(card, {
          y: 115,
          opacity: 0,
          duration: 1.1,
          delay: (index % 3) * 0.13,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
      })

      const contactTimeline = gsap.timeline({
        scrollTrigger: { trigger: '#contact', start: 'top 65%', once: true },
      })
      contactTimeline
        .from('#contact .contact__eyebrow', { y: 40, opacity: 0, duration: 0.85 })
        .from(
          '#contact .contact-title-line > span',
          { yPercent: 125, scaleX: 0.76, duration: 1.3, stagger: 0.14, ease: 'power4.out' },
          '-=0.5',
        )
        .from('#contact .contact__email', { y: 42, opacity: 0, duration: 0.9 }, '-=0.7')
        .from('#contact .footer > *', { y: 28, opacity: 0, duration: 0.7, stagger: 0.09 }, '-=0.45')

      if (canUseParallax) {
        gsap.to('#about .portrait-core', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: '#about .about__visual', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        })
        gsap.to('.contact__glow', {
          yPercent: -12,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 1.4 },
        })
      }
    }, root)

    let refreshFrame = null
    const refresh = () => {
      if (refreshFrame !== null) window.cancelAnimationFrame(refreshFrame)
      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        refreshFrame = null
      })
    }
    window.addEventListener('load', refresh, { once: true })
    document.fonts?.ready.then(refresh)

    return () => {
      document.body.classList.remove('is-opening')
      window.removeEventListener('load', refresh)
      if (refreshFrame !== null) window.cancelAnimationFrame(refreshFrame)
      context.revert()
    }
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return

    if (!loadHeroVideo) {
      setLoadHeroVideo(true)
      setVideoPaused(false)
      return
    }

    if (video.paused) {
      video
        .play()
        .then(() => setVideoPaused(false))
        .catch(() => setVideoPaused(true))
    } else {
      video.pause()
      setVideoPaused(true)
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <main ref={mainRef}>
      <div className="opening" aria-hidden="true">
        <div className="opening__panel opening__panel--top" />
        <div className="opening__panel opening__panel--bottom" />
        <div className="opening__content">
          <div className="opening__meta">
            <span className="opening__mark">XWB®</span>
            <span className="opening__label">AI PROJECT PORTFOLIO · 2026</span>
          </div>
          <div className="opening__progress">
            <div className="opening__line"><span className="opening__line-fill" /></div>
            <span className="opening__count">000</span>
          </div>
        </div>
      </div>

      <header className={navFloating ? 'nav shell nav--floating' : 'nav shell'}>
        <a className="brand" href="#top" aria-label="返回首页">
          XWB<span>®</span>
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-label="打开导航"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'nav__links is-open' : 'nav__links'} aria-label="主要导航">
          <a href="#about" onClick={closeMenu}>ABOUT</a>
          <a href="#work" onClick={closeMenu}>PROJECTS</a>
          <a href="#services" onClick={closeMenu}>CAPABILITY</a>
        </nav>

        <a className="pill pill--light nav__contact" href="mailto:wuzibx@foxmail.com">
          LET&apos;S TALK <Arrow diagonal />
        </a>
      </header>

      <section className="hero" id="top">
        <video
          className="hero__video"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={HERO_POSTER_URL}
          aria-label="抽象数字光影动态背景"
        >
          {loadHeroVideo && <source src={HERO_VIDEO_URL} type="video/mp4" />}
        </video>
        <div className="hero__wash" />
        <div className="hero__grid" />

        <div className="hero__content shell">
          <div className="hero__eyebrow">
            <span className="status-dot" />
            AI PROJECT MANAGER CANDIDATE · CHANGSHA
          </div>
          <h1>
            <span className="hero-title-line"><span>TURNING AI</span></span>
            <span className="hero-title-line hero__title-shift"><span>INTO ACTION.</span></span>
          </h1>
          <div className="hero__meta">
            <p>AI 项目管理 / AIGC 内容 / 项目运营</p>
            <p className="hero__intro">
              把模糊目标拆成清晰任务，<br />
              连接 AI 工具、内容与真实交付。
            </p>
          </div>
        </div>

        <div className="hero__footer shell">
          <span>AI PROJECT PORTFOLIO · 2026</span>
          <a href="#about" className="scroll-cue">
            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
          </a>
          <button className="video-control" type="button" onClick={toggleVideo}>
            <span className={!loadHeroVideo || videoPaused ? 'play-icon' : 'pause-icon'} aria-hidden="true" />
            {!loadHeroVideo ? 'LOAD FILM' : videoPaused ? 'PLAY FILM' : 'PAUSE FILM'}
          </button>
        </div>
      </section>

      <section className="about section shell" id="about">
        <div className="section-index">01 / ABOUT</div>
        <div className="about__layout" data-reveal>
          <div className="about__visual" aria-label="谢文炳个人身份视觉">
            <div className="portrait-orbit portrait-orbit--one" />
            <div className="portrait-orbit portrait-orbit--two" />
            <div className="portrait-core">
              <span>XIE WENBING</span>
              <strong>AI PM</strong>
              <small>FROM GOAL TO DELIVERY</small>
            </div>
            <span className="about__visual-label">PROJECT MINDSET / 2026</span>
          </div>

          <div className="about__content">
            <p className="kicker">ABOUT XIE WENBING</p>
            <h2 className="motion-heading about-motion-heading">
              <span className="about-heading-line"><span>FROM IDEA</span></span>
              <span className="about-heading-line"><span>TO DELIVERY.</span></span>
              <small className="about-heading-caption">
                连接业务目标与 AI 执行，把想法推进为可交付的结果。
              </small>
            </h2>
            <div className="about__copy">
              <p>
                工商管理本科，具备 AI 内容项目从 0 到 1 的独立执行经验。围绕 AI 短剧账号，
                完成定位与选题、脚本拆解、生成式制作、发布运营和数据复盘。
              </p>
              <p>
                熟悉 ComfyUI 本地部署与节点工作流，并能结合即梦、剪映、Photoshop 等工具推进内容交付。
                希望从 AI 内容项目和 AI 应用项目切入项目管理岗位。
              </p>
            </div>

            <div className="experience-list">
              <div>
                <span>2025 — NOW</span>
                <p><strong>AI 内容项目实践</strong><small>AI 短剧账号 0-1 搭建、工作流与运营复盘</small></p>
              </div>
              <div>
                <span>2024 — 2025</span>
                <p><strong>学生会 · 实习干事</strong><small>校园活动策划、执行与协同</small></p>
              </div>
              <div>
                <span>2026</span>
                <p><strong>湖南涉外经济学院</strong><small>工商管理本科 · 预计 2026.06 毕业</small></p>
              </div>
            </div>

            <div className="about__details">
              <div>
                <span>BASED IN</span>
                <strong>CHANGSHA / CHINA</strong>
              </div>
              <div>
                <span>CONTACT</span>
                <a href="mailto:wuzibx@foxmail.com">WUZIBX@FOXMAIL.COM</a>
              </div>
              <div>
                <span>FOCUS</span>
                <strong>AI CONTENT · PROJECT DELIVERY</strong>
              </div>
            </div>

            <a className="resume-link" href="/谢文炳_AI项目经理_优化简历.pdf" download>
              DOWNLOAD RESUME <Arrow />
            </a>
          </div>
        </div>

        <div className="stats" data-reveal>
          <div className="stat">
            <strong>01</strong>
            <span>从 0 到 1 AI 内容项目</span>
          </div>
          <div className="stat">
            <strong>07</strong>
            <span>端到端制作节点</span>
          </div>
          <div className="stat">
            <strong>02</strong>
            <span>重点内容平台</span>
          </div>
          <div className="stat stat--accent">
            <span className="status-dot" />
            <p>OPEN FOR<br />AI PROJECT ROLES</p>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <div className="section-heading" data-reveal>
            <div className="section-index">02 / PROJECT PRACTICE</div>
            <h2 className="motion-heading">
              <span className="motion-heading-line"><span>PROJECT</span></span>
              <span className="motion-heading-line"><span>PRACTICE</span></span>
              <small className="motion-heading-caption">项目实践</small>
            </h2>
            <p>把 AI 工具、内容生产和项目推进连接起来的阶段性实践。</p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.number} data-reveal>
                <a href="#contact" aria-label={`了解 ${project.title} 项目`}>
                  <div className="project-card__media">
                    <img
                      src={responsiveImage(project.image, 1120)}
                      srcSet={`${responsiveImage(project.image, 640, 70)} 640w, ${responsiveImage(project.image, 960, 72)} 960w, ${responsiveImage(project.image, 1400)} 1400w`}
                      sizes="(max-width: 760px) calc(100vw - 36px), (max-width: 1180px) calc(50vw - 42px), 820px"
                      alt={`${project.title} 项目视觉图`}
                      style={{ objectPosition: project.position }}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="project-card__reveal" />
                    <div className="project-card__shade" />
                    <span className="project-card__number">{project.number}</span>
                    <span className="project-card__open"><Arrow diagonal /></span>
                  </div>
                  <div className="project-card__info">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.subtitle}</p>
                    </div>
                    <ul>
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                  </div>
                </a>
              </article>
            ))}
          </div>

          <div className="work__footer" data-reveal>
            <p>完整项目过程与内容样本可在面试中展示</p>
            <a className="text-link" href="mailto:wuzibx@foxmail.com">
              DISCUSS A PROJECT <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="capabilities section shell" id="services">
        <div className="section-heading section-heading--wide" data-reveal>
          <div className="section-index">03 / WHAT I CAN DO</div>
          <h2 className="motion-heading">
            <span className="motion-heading-line"><span>WHAT I</span></span>
            <span className="motion-heading-line"><span>CAN DO</span></span>
            <small className="motion-heading-caption">我能做的 · 从目标到交付</small>
          </h2>
        </div>

        <div className="capability-grid">
          {strengths.map((item) => (
            <article className="capability-card" key={item.index} data-reveal>
              <div className="capability-card__top">
                <span>{item.index}</span>
                <span className="capability-card__mark">✦</span>
              </div>
              <div>
                <p className="kicker">{item.en}</p>
                <h3>{item.title}</h3>
                <p className="capability-card__description">{item.description}</p>
              </div>
              <ul>
                {item.list.map((label) => <li key={label}>{label}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="needs" data-reveal>
          <div className="needs__heading">
            <div>
              <div className="section-index">04 / NEEDS I CAN SOLVE</div>
              <p className="kicker">FOR AI CONTENT & APPLICATION PROJECTS</p>
            </div>
            <div>
              <h3 className="needs-motion-heading">
                <span className="needs-heading-line"><span>NEEDS</span></span>
                <span className="needs-heading-line"><span>I SOLVE</span></span>
                <small className="needs-heading-caption">可以解决的需求</small>
              </h3>
              <p>
                适合初级 AI 内容与 AI 应用项目场景：从需求梳理、工作流搭建到交付和复盘，
                让项目推进过程更清晰。
              </p>
            </div>
          </div>

          <div className="needs__grid">
            {needs.map((need) => (
              <article className="need-card" key={need.index}>
                <div className="need-card__top">
                  <span>{need.index}</span>
                  <span aria-hidden="true">↘</span>
                </div>
                <div>
                  <h4>{need.title}</h4>
                  <p>{need.description}</p>
                </div>
                <small>OUTPUT · {need.output}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__glow" />
        <div className="contact__grid" />
        <div className="contact__content shell" data-reveal>
          <div className="contact__eyebrow">
            <span className="status-dot" />
            READY TO BUILD WITH AI?
          </div>
          <h2>
            <span className="contact-title-line contact-title-line--solid"><span>TURN AI</span></span>
            <span className="contact-title-line contact-title-line--outline"><span>INTO ACTION.</span></span>
          </h2>
          <a className="contact__email" href="mailto:wuzibx@foxmail.com">
            WUZIBX@FOXMAIL.COM <Arrow diagonal />
          </a>
        </div>

        <footer className="footer shell">
          <div className="footer__brand">XWB<sup>®</sup></div>
          <div className="footer__links">
            <a href="#work">PROJECTS</a>
            <a href="/谢文炳_AI项目经理_优化简历.pdf" download>RESUME</a>
            <a href="mailto:wuzibx@foxmail.com">EMAIL</a>
          </div>
          <p>© 2026 谢文炳. ALL RIGHTS RESERVED.</p>
          <a href="#top" className="back-top">BACK TO TOP ↑</a>
        </footer>
      </section>
    </main>
  )
}

export default App
