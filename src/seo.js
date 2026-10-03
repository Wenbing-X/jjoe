import { projects, capabilities } from './content.js'
import { parseHash, routeTitle } from './navigation.js'

export const siteUrl = 'https://jjoe.onrender.com'
const homeDescription = '谢文炳的个人作品集，展示产业出海、短剧内容、AI 视频制作、生成式工作流与项目协同能力。'
const videoDescription = '谢文炳的 AI 视频制作实践：连接脚本、素材、字幕、配音与剪辑，展示本地制作流程和 12 秒试制样片。'

export const searchPages = [
  { filename: 'index.html', hash: '#top', description: homeDescription, path: '/' },
  { filename: 'case-video-production.html', hash: '#/case/video-production', description: videoDescription },
  { filename: 'tool-video-studio.html', hash: '#/case/video-production', description: videoDescription, path: '/case-video-production.html', alias: true },
  ...projects.map(item => ({ filename: `project-${item.id}.html`, hash: `#/projects/${item.id}`, description: item.intro || item.summary })),
  ...capabilities.map(item => ({ filename: `capability-${item.id}.html`, hash: `#/capabilities/${item.id}`, description: item.intro })),
].map(page => ({ ...page, title: routeTitle(parseHash(page.hash)), url: siteUrl + (page.path || '/' + page.filename) }))

export function metadataForRoute(route) {
  if (route.type === 'missing') return null
  const hash = route.type === 'home' ? '#top' : `#/${route.type === 'project' ? 'projects' : route.type === 'capability' ? 'capabilities' : 'case'}/${route.id}`
  return searchPages.find(page => page.hash === hash) || searchPages[0]
}

export function structuredData(page) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': siteUrl + '/#person', name: '谢文炳', alternateName: 'Xie Wenbing', url: siteUrl + '/', email: 'wuzibx@foxmail.com' },
      { '@type': 'WebSite', '@id': siteUrl + '/#website', url: siteUrl + '/', name: '谢文炳 · 个人作品集', inLanguage: 'zh-CN', author: { '@id': siteUrl + '/#person' } },
      { '@type': page.filename === 'index.html' ? 'ProfilePage' : 'WebPage', '@id': page.url + '#webpage', url: page.url, name: page.title, description: page.description, inLanguage: 'zh-CN', isPartOf: { '@id': siteUrl + '/#website' }, about: { '@id': siteUrl + '/#person' }, ...(page.filename === 'index.html' ? { mainEntity: { '@id': siteUrl + '/#person' } } : {}) },
    ],
  }
}

export function updatePageMetadata(route) {
  const page = metadataForRoute(route)
  document.title = routeTitle(route)
  const schema = document.getElementById('site-schema')
  document.querySelector('meta[name="robots"]')?.setAttribute('content', page ? 'index, follow' : 'noindex, follow')
  if (!page) {
    document.querySelector('link[rel="canonical"]')?.removeAttribute('href')
    document.querySelector('meta[name="description"]')?.setAttribute('content', '请求的内容未找到，请返回首页查看项目与工作流。')
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document.querySelector('meta[property="og:description"]')?.removeAttribute('content')
    document.querySelector('meta[property="og:url"]')?.removeAttribute('content')
    if (schema) schema.textContent = '{}'
    return
  }
  const attributes = {
    'meta[name="description"]': ['content', page.description],
    'link[rel="canonical"]': ['href', page.url],
    'meta[property="og:title"]': ['content', page.title],
    'meta[property="og:description"]': ['content', page.description],
    'meta[property="og:url"]': ['content', page.url],
  }
  for (const [selector, [attribute, value]] of Object.entries(attributes)) document.querySelector(selector)?.setAttribute(attribute, value)
  if (schema) schema.textContent = JSON.stringify(structuredData(page))
}
