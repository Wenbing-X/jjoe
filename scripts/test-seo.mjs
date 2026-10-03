import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { searchPages, siteUrl } from '../src/seo.js'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
for (const page of searchPages) {
  const html = await readFile(path.join(dist, page.filename), 'utf8')
  const body = html.match(/<!--prerender:start-->([\s\S]*?)<!--prerender:end-->/)?.[1]
  assert.ok(body && body.includes('<main'), `${page.filename}: real body without JavaScript`)
  assert.equal((body.match(/<h1\b/g) || []).length, 1, `${page.filename}: one main heading`)
  assert.ok(body.includes('谢文炳'), `${page.filename}: author present in readable content`)
  assert.ok(!body.includes('class="opening"'), 'animation cannot hide the static page')
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1)
  assert.ok(html.includes(`rel="canonical" href="${page.url}"`))
  assert.ok(html.includes(`<title>${page.title}</title>`))
  assert.ok(page.description && html.includes(`name="description" content="${page.description}"`))
  assert.ok(!/noindex/i.test(html))
  const schema = JSON.parse(html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  assert.equal(schema['@graph'].at(-1).url, page.url)
  for (const [, href] of body.matchAll(/href="([^" ]+)"/g)) {
    assert.ok(!href.startsWith('#/'), 'crawler receives physical page links')
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue
    const [filename, anchor] = href.replace(/^\.\//, '').replace(/^\//, '').split('#')
    await access(path.join(dist, decodeURIComponent(filename || 'index.html')))
    if (anchor && filename.endsWith('.html')) {
      const target = await readFile(path.join(dist, filename), 'utf8')
      assert.ok(target.includes(`id="${anchor}"`), `anchor ${href} must exist without JS`)
    }
  }
}
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8')
const canonicalPages = searchPages.filter(page => !page.alias)
assert.equal((sitemap.match(/<loc>/g) || []).length, canonicalPages.length)
for (const page of canonicalPages) assert.ok(sitemap.includes(`<loc>${page.url}</loc>`))
assert.ok(!sitemap.includes('tool-video-studio.html'))
const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8')
assert.ok(robots.includes('Allow: /') && robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`))
console.log(JSON.stringify({ result: 'PASS', renderedPages: searchPages.length, canonicalUrls: canonicalPages.length, crawlableLinksAndAnchors: true }))
