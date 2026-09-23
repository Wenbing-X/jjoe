import { useEffect, useRef, useState } from 'react'

export default function SiteEffects({ pageKey }) {
  const progress = useRef(null)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const distance = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const value = distance ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0
      if (progress.current) progress.current.style.transform = `scaleX(${value})`
      setShowTop(window.scrollY > 650)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule)
    observer?.observe(document.body)
    window.addEventListener('scroll', schedule, { passive:true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [pageKey])

  useEffect(() => {
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let active = null
    let frame = 0
    let pointer = null
    const reset = () => {
      if (active) {
        active.removeAttribute('data-lit')
        for (const property of ['--spot-x','--spot-y','--card-rotate-x','--card-rotate-y']) active.style.removeProperty(property)
      }
      active = null
    }
    const paint = () => {
      frame = 0
      if (!pointer || !preference.matches) { reset(); return }
      const card = pointer.target instanceof Element ? pointer.target.closest('.project-row, .reference-card') : null
      if (active !== card) { reset(); active = card }
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = Math.min(1, Math.max(0, (pointer.clientX - rect.left) / rect.width))
      const y = Math.min(1, Math.max(0, (pointer.clientY - rect.top) / rect.height))
      card.dataset.lit = 'true'
      card.style.setProperty('--spot-x', `${x * 100}%`)
      card.style.setProperty('--spot-y', `${y * 100}%`)
      card.style.setProperty('--card-rotate-x', `${(0.5 - y) * 3}deg`)
      card.style.setProperty('--card-rotate-y', `${(x - 0.5) * 3}deg`)
    }
    const move = event => {
      if (event.pointerType !== 'mouse' || !preference.matches) return
      pointer = event
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const clear = () => { cancelAnimationFrame(frame); frame = 0; pointer = null; reset() }
    document.addEventListener('pointermove', move, { passive:true })
    document.addEventListener('pointerleave', clear)
    window.addEventListener('blur', clear)
    preference.addEventListener('change', clear)
    return () => { clear(); document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', clear); window.removeEventListener('blur', clear); preference.removeEventListener('change', clear) }
  }, [pageKey])

  const goTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top:0, behavior:reduced ? 'instant' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll:true })
  }
  return <><div className="reading-line" aria-hidden="true"><span ref={progress} /></div>{showTop && <button type="button" className="return-top" onClick={goTop} aria-label="返回页面顶部"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>}</>
}
