import { defineConfig, createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { searchPages, siteUrl, structuredData } from './src/seo.js'

const escapeAttribute = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

function pageMetadata(page) {
  const schema = JSON.stringify(structuredData(page)).replace(/</g, '\\u003c')
  return `\n    <link rel="canonical" href="${escapeAttribute(page.url)}" />\n    <meta name="robots" content="index, follow" />\n    <meta property="og:type" content="website" />\n    <meta property="og:locale" content="zh_CN" />\n    <meta property="og:site_name" content="谢文炳 · 个人作品集" />\n    <meta property="og:title" content="${escapeAttribute(page.title)}" />\n    <meta property="og:description" content="${escapeAttribute(page.description)}" />\n    <meta property="og:url" content="${escapeAttribute(page.url)}" />\n    <meta property="og:image" content="${siteUrl}/images/hero-harbor.png" />\n    <script id="site-schema" type="application/ld+json">${schema}</script>\n`
}

function withMetadata(template, page) {
  return template
    .replace(/<title>.*?<\/title>/s, () => `<title>${escapeAttribute(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/s, () => `<meta name="description" content="${escapeAttribute(page.description)}" />`)
    .replace('</head>', () => pageMetadata(page) + '</head>')
}

function searchablePages() {
  let outputDirectory
  let projectRoot
  let isBuild = false
  return {
    name: 'searchable-prerendered-pages',
    configResolved(config) {
      projectRoot = config.root
      outputDirectory = path.resolve(config.root, config.build.outDir)
      isBuild = config.command === 'build'
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = (request.url || '').split('?')[0]
        const filename = pathname.split('/').pop()
        if (pathname === '/' || pathname === '/index.html') {
          try {
            const landing = await readFile(path.join(projectRoot, 'src/landing/index.html'), 'utf8')
            response.setHeader('Content-Type', 'text/html; charset=utf-8')
            response.end(withMetadata(landing, searchPages[0]))
          } catch (error) { next(error) }
          return
        }
        if (searchPages.some(page => page.filename === filename)) request.url = '/index.html'
        next()
      })
    },
    async closeBundle() {
      if (!isBuild) return
      const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8')
      const landing = await readFile(path.join(projectRoot, 'src/landing/index.html'), 'utf8')
      // Use an isolated renderer so this build plugin never loads recursively.
      const renderer = await createServer({ root: projectRoot, configFile: false, plugins: [react()], server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' })
      try {
        const { renderPage } = await renderer.ssrLoadModule('/src/entry-server.jsx')
        for (const page of searchPages) {
          const html = page.filename === 'index.html' ? withMetadata(landing, page) : withMetadata(template, page)
            .replace('<div id="root"></div>', () => `<div id="root"><!--prerender:start-->${renderPage(page.hash)}<!--prerender:end--></div>`)
          if (!html.includes('<main') || !html.includes('<h1')) throw new Error(`Missing rendered content: ${page.filename}`)
          await writeFile(path.join(outputDirectory, page.filename), html)
        }
      } finally {
        await renderer.close()
      }
      const urls = searchPages.filter(page => !page.alias).map(page => `  <url><loc>${escapeAttribute(page.url)}</loc></url>`).join('\n')
      await writeFile(path.join(outputDirectory, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
      await writeFile(path.join(outputDirectory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
      console.log(`Prerendered ${searchPages.length} pages with metadata, robots.txt and sitemap.xml.`)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), searchablePages()],
})
