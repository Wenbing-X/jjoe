import { projects, capabilities, stages } from './content.js'

// Old hash URLs remain readable while new links open independently addressable pages.
export function parseHash(hash = '') {
  if (hash === '#/case/video-production' || hash === '#/tools/video-studio') return { type: 'case', id: 'video-production', section: '' }
  if (!hash.startsWith('#/')) {
    const legacy = { work: 'projects', services: 'capabilities' }
    const section = legacy[hash.slice(1)] || hash.slice(1)
    return { type: 'home', id: '', section: ['top','about','projects','playground','capabilities','references','contact'].includes(section) ? section : 'top' }
  }
  const match = /^#\/(projects|capabilities)\/([^/]+)(?:\/([^/]+))?$/.exec(hash)
  if (!match) return { type: 'missing', id: '', section: '' }
  const [, group, id, section = ''] = match
  const items = group === 'projects' ? projects : capabilities
  if (!items.some(item => item.id === id)) return { type: 'missing', id: '', section: '' }
  if (section && (group !== 'projects' || id !== 'short-drama' || !stages.some(stage => stage.id === section))) {
    return { type: 'missing', id: '', section: '' }
  }
  return { type: group === 'projects' ? 'project' : 'capability', id, section }
}

export function parseLocation(locationLike = typeof window === 'undefined' ? {} : window.location) {
  const { pathname = '', hash = '' } = locationLike
  if (hash.startsWith('#/')) return parseHash(hash)
  let filename
  try { filename = decodeURIComponent(pathname.split('/').pop() || '') } catch { filename = '' }
  if (filename === 'case-video-production.html' || filename === 'tool-video-studio.html') return parseHash('#/case/video-production')
  const match = /^(project|capability)-(.+)\.html$/.exec(filename)
  if (!match) return parseHash(hash)
  const [, type, id] = match
  const group = type === 'project' ? 'projects' : 'capabilities'
  const section = hash.startsWith('#stage-') ? hash.slice(7) : ''
  return parseHash(`#/${group}/${id}${section ? '/' + section : ''}`)
}

export function hrefFor(hash) {
  if (typeof hash !== 'string' || !hash.startsWith('#') || hash === '#main') return hash
  if (typeof document === 'undefined') return hash
  const root = typeof document === 'undefined' ? null : document.documentElement
  if (root?.dataset.navigation === 'hash') return hash
  const route = parseHash(hash)
  if (route.type === 'missing') return hash
  if (route.type === 'home') return './' + (root?.dataset.home || 'index.html') + '#' + route.section
  return `./${route.type}-${route.id}.html${route.section ? '#stage-' + route.section : ''}`
}

export function routeTitle(route) {
  if (route.type === 'case' && route.id === 'video-production') return 'AI 视频制作能力 — 谢文炳'
  const item = route.type === 'project' ? projects.find(p => p.id === route.id) : route.type === 'capability' ? capabilities.find(c => c.id === route.id) : null
  return item ? item.title + ' — 谢文炳' : route.type === 'missing' ? '内容未找到 — 谢文炳' : '谢文炳 — 产业出海 · AI 内容 · 项目交付'
}
