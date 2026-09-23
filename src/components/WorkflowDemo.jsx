import { useEffect, useId, useRef, useState } from 'react'
import { stages } from '../content.js'
import './workflow-demo.css'

const STEP_DURATION = 1400

function ControlIcon({ playing, replay }) {
  return (
    <svg className="wd-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {playing ? <path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="2" />
        : replay ? <><path d="M5 6a6 6 0 1 1-1 6" stroke="currentColor" strokeWidth="1.5" /><path d="M5 2v4H1" stroke="currentColor" strokeWidth="1.5" /></>
          : <path d="m7 4 9 6-9 6V4Z" fill="currentColor" />}
    </svg>
  )
}

export default function WorkflowDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState('idle')
  const rootRef = useRef(null)
  const panelId = useId()
  const stage = stages[activeIndex]
  const playing = phase === 'playing'

  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setTimeout(() => {
      if (activeIndex === stages.length - 1) setPhase('complete')
      else setActiveIndex(index => index + 1)
    }, STEP_DURATION)
    return () => window.clearTimeout(timer)
  }, [activeIndex, playing])

  useEffect(() => {
    const pause = () => setPhase(current => current === 'playing' ? 'paused' : current)
    const onVisibility = () => { if (document.hidden) pause() }
    document.addEventListener('visibilitychange', onVisibility)
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) pause()
    }, { threshold: 0 })
    if (rootRef.current) observer?.observe(rootRef.current)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      observer?.disconnect()
    }
  }, [])

  const selectStage = index => {
    setActiveIndex(index)
    setPhase('idle')
  }
  const togglePlayback = () => {
    if (playing) {
      setPhase('paused')
      return
    }
    if (activeIndex === stages.length - 1) setActiveIndex(0)
    setPhase('playing')
  }
  const reset = () => {
    setActiveIndex(0)
    setPhase('idle')
  }

  const playLabel = playing ? '暂停演示' : activeIndex === stages.length - 1 ? '重新演示' : phase === 'paused' ? '继续演示' : '播放演示'
  const statusLabel = { idle: '手动探索', playing: '演示中', paused: '已暂停', complete: '演示完成' }[phase]

  return (
    <article className="wd-demo" ref={rootRef} aria-label="短剧工作流互动演示">
      <header className="wd-heading">
        <div><p className="wd-kicker">02 / WORKFLOW STUDY</p><h3>短剧工作流</h3></div>
        <span className="wd-badge">流程演示</span>
      </header>
      <p className="wd-intro">一个故事，从市场洞察走向完整交付。</p>

      <div className="wd-stages" role="group" aria-label="选择工作流阶段">
        {stages.map((item, index) => (
          <button key={item.id} type="button" className={`wd-stage${index < activeIndex ? ' wd-stage-past' : ''}`} aria-pressed={activeIndex === index} aria-controls={panelId} onClick={() => selectStage(index)}>
            <span className="wd-stage-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="wd-stage-label">{item.short}</span>
          </button>
        ))}
      </div>

      <div className="wd-detail" id={panelId}>
        <div className="wd-detail-heading">
          <span className="wd-current-number" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')}</span>
          <h4>{stage.title}</h4>
        </div>
        <p className="wd-description">{stage.text}</p>
        <dl className="wd-io">
          <div><dt><span aria-hidden="true">↘</span> 输入 / INPUT</dt><dd>{stage.inputs}</dd></div>
          <div><dt><span aria-hidden="true">↗</span> 产出 / OUTPUT</dt><dd>{stage.outputs}</dd></div>
        </dl>
        <ul className="wd-tasks" aria-label="这一阶段的关注点">{stage.tasks.slice(0, 2).map(task => <li key={task}>{task}</li>)}</ul>
      </div>

      <div className="wd-controls">
        <button type="button" className="wd-play" onClick={togglePlayback} aria-pressed={playing}>
          <ControlIcon playing={playing} replay={activeIndex === stages.length - 1 && !playing} />{playLabel}
        </button>
        <button type="button" className="wd-reset" onClick={reset}>重置</button>
        <span className="wd-status"><span className={`wd-status-dot${playing ? ' wd-status-playing' : ''}`} aria-hidden="true" />{statusLabel}<span className="wd-status-count">{String(activeIndex + 1).padStart(2, '0')} / 06</span></span>
      </div>
      <p className="wd-note">流程可视化 · 点击任意节点查看 · 详情页提供执行文档与模板</p>
      <p className="wd-sr-only" aria-live="polite" aria-atomic="true">第 {activeIndex + 1} 步，共 {stages.length} 步：{stage.short}。</p>
    </article>
  )
}
