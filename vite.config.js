import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { projects, capabilities } from './src/content.js'

const detailPages = [
  { filename: 'case-video-production.html', title: 'AI 视频制作能力' },
  { filename: 'tool-video-studio.html', title: 'AI 视频制作能力' },
  ...projects.map(item => ({ filename: `project-${item.id}.html`, title: item.title })),
  ...capabilities.map(item => ({ filename: `capability-${item.id}.html`, title: item.title })),
]

function physicalDetailPages() {
  let outputDirectory
  let isBuild = false
  return {
    name: 'physical-detail-pages',
    configResolved(config) {
      outputDirectory = path.resolve(config.root, config.build.outDir)
      isBuild = config.command === 'build'
    },
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const filename = (request.url || '').split('?')[0].split('/').pop()
        if (detailPages.some(page => page.filename === filename)) request.url = '/index.html'
        next()
      })
    },
    async closeBundle() {
      if (!isBuild) return
      const homepage = await readFile(path.join(outputDirectory, 'index.html'), 'utf8')
      await Promise.all(detailPages.map(page => writeFile(
        path.join(outputDirectory, page.filename),
        homepage.replace(/<title>.*?<\/title>/s, () => `<title>${page.title} — 谢文炳</title>`),
      )))
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), physicalDetailPages()],
})
