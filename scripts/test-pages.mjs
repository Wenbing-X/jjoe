import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
import { parseHash, parseLocation, hrefFor, routeTitle } from '../src/navigation.js';
import { projects, capabilities, stages, referenceProjects, agentReferences } from '../src/content.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputs = path.resolve(repoRoot, '..', '..', 'outputs');
const dist = path.join(repoRoot, 'dist');
const folder = path.join(outputs, 'jjoe-preview');
const literalDelimiters = ['"', "'", String.fromCharCode(96)];
const localAssets = ['images/hero-harbor.png', 'videos/hero-harbor.mp4', 'images/global-sculpture.png', '谢文炳_AI项目经理_优化简历.pdf'];
const containsLiteral = (source, value) => literalDelimiters.some(quote => source.includes(quote + value + quote));
const pages = [
  { type: 'case', group: 'case', id: 'video-production' },
  ...projects.map(item => ({ type: 'project', group: 'projects', ...item })),
  ...capabilities.map(item => ({ type: 'capability', group: 'capabilities', ...item })),
];
globalThis.document = { documentElement: { dataset: { navigation: 'pages', home: 'index.html' } } };
for (const page of pages) {
  const hash = `#/${page.group}/${page.id}`;
  const filename = `${page.type}-${page.id}.html`;
  assert.equal(hrefFor(hash), './' + filename);
  const route = parseLocation({ pathname: '/' + filename, hash: '' });
  assert.deepEqual(route, parseHash(hash));
  for (const directory of [dist, folder]) {
    const html = await readFile(path.join(directory, filename), 'utf8');
    assert.ok(html.includes(`<title>${routeTitle(route)}</title>`), filename + ' page title');
    if (directory === folder) {
      assert.ok(html.includes('data-navigation="pages"'));
      assert.ok(!/<script[^>]+src=/.test(html), filename + ' has no external script');
      assert.ok(!/<link[^>]+rel="stylesheet"/.test(html), filename + ' has no external stylesheet');
      for (const asset of localAssets) {
        assert.ok(containsLiteral(html, './' + asset), filename + ' relative asset: ' + asset);
        assert.ok(!containsLiteral(html, '../' + asset), filename + ' asset stays in folder');
        assert.ok(!containsLiteral(html, '/' + asset), filename + ' has no root asset: ' + asset);
      }
    }
  }
}
for (const stage of stages) {
  const route = parseLocation({ pathname: '/project-short-drama.html', hash: '#stage-' + stage.id });
  assert.equal(route.section, stage.id);
  assert.equal(hrefFor('#/projects/short-drama/' + stage.id), './project-short-drama.html#stage-' + stage.id);
}
assert.equal(hrefFor('#projects'), './index.html#projects');
assert.equal(hrefFor('#main'), '#main');
assert.equal(hrefFor('mailto:hello@example.com'), 'mailto:hello@example.com');
assert.equal(parseLocation({ pathname: '/project-unknown.html' }).type, 'missing');
assert.equal(parseLocation({ pathname: '/index.html', hash: '#/projects/short-drama' }).id, 'short-drama');
assert.equal(parseLocation({ pathname: '/index.html', hash: '#work' }).section, 'projects');
assert.equal(parseLocation({ pathname: '/index.html', hash: '#services' }).section, 'capabilities');
document.documentElement.dataset.navigation = 'hash';
assert.equal(hrefFor('#/projects/short-drama'), '#/projects/short-drama');
assert.equal(hrefFor('#projects'), '#projects');
delete globalThis.document;
assert.equal(hrefFor('#/projects/short-drama'), '#/projects/short-drama');

const singleFile = await readFile(path.join(outputs, 'jjoe-preview.html'), 'utf8');
const previewIndex = await readFile(path.join(folder, 'index.html'), 'utf8');
for (const reference of [...referenceProjects, ...agentReferences]) {
  assert.ok(previewIndex.includes(reference.url), 'folder preview keeps GitHub reference: ' + reference.id);
  assert.ok(singleFile.includes(reference.url), 'single preview keeps GitHub reference: ' + reference.id);
}
assert.ok(singleFile.includes('data-navigation="hash"'));
assert.ok(singleFile.includes('data:video/mp4;base64,'));
assert.ok(singleFile.includes('data:image/png;base64,'));
assert.ok(singleFile.includes('const __offlineResume=URL.createObjectURL('));
assert.ok((singleFile.match(/\b__offlineResume\b/g) || []).length >= 2, 'resume Blob is used by the app');
assert.equal((singleFile.match(/<script type="module">/g) || []).length, 1);
assert.equal((singleFile.match(/<\/script>/g) || []).length, 1);
const inlineScript = singleFile.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
assert.ok(inlineScript, 'embedded script exists');
assert.doesNotThrow(() => new Script(inlineScript), 'embedded script parses after replacing assets');
assert.ok(!/<script[^>]+src=/.test(singleFile));
assert.ok(!/<link[^>]+rel="stylesheet"/.test(singleFile));
for (const asset of localAssets) {
  assert.ok((await stat(path.join(folder, asset))).size > 0);
  assert.ok(!containsLiteral(singleFile, '/' + asset), 'single file has no root asset: ' + asset);
  assert.ok(!containsLiteral(singleFile, './' + asset), 'single file has no relative asset: ' + asset);
}
console.log(JSON.stringify({ result: 'PASS', independentDetailPages: pages.length, workflowAnchors: stages.length, previewFormats: ['single-file', 'folder'], localVideo: true, offlineResume: true }, null, 2));
