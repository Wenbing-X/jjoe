import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const outputRoot = path.resolve(repoRoot, '..', '..', 'outputs');
const outputFile = path.join(outputRoot, 'jjoe-preview.html');
const folderRoot = path.join(outputRoot, 'jjoe-preview');
const assets = await readdir(path.join(distRoot, 'assets'));
const jsAsset = assets.find((name) => /^index-.*\.js$/.test(name));
const cssAsset = assets.find((name) => /^index-.*\.css$/.test(name));

if (!jsAsset || !cssAsset) {
  throw new Error('请先运行构建，再导出离线预览：缺少 dist/assets 中的 JS 或 CSS。');
}

const [javascript, stylesheet, allFiles] = await Promise.all([
  readFile(path.join(distRoot, 'assets', jsAsset), 'utf8'),
  readFile(path.join(distRoot, 'assets', cssAsset), 'utf8'),
  readdir(distRoot),
]);
const publicAssets = [
  ['images/hero-harbor.png', 'image/png'],
  ['videos/hero-harbor.mp4', 'video/mp4'],
  ['images/global-sculpture.png', 'image/png'],
  ['videos/studio-sample.mp4', 'video/mp4'],
];
const embedded = await Promise.all(publicAssets.map(async ([name, mime]) => [
  name, `data:${mime};base64,${(await readFile(path.join(distRoot, name))).toString('base64')}`,
]));
const resumeName = '谢文炳_AI项目经理_优化简历.pdf';
const resumeBase64 = (await readFile(path.join(distRoot, resumeName))).toString('base64');
let embeddedScript = javascript;
let folderScript = javascript;
const literalDelimiters = ['"', "'", String.fromCharCode(96)];
for (const [name, data] of embedded) {
  // Callbacks avoid replacement-string expansion of dollar characters in generated code.
  for (const prefix of ['./', '/']) {
    embeddedScript = embeddedScript.replaceAll(prefix + name, () => data);
    for (const quote of literalDelimiters) {
      folderScript = folderScript.replaceAll(quote + prefix + name + quote, () => quote + './' + name + quote);
    }
  }
}
for (const prefix of ['./', '/']) {
  for (const quote of literalDelimiters) {
    embeddedScript = embeddedScript.replaceAll(quote + prefix + resumeName + quote, () => '__offlineResume');
    folderScript = folderScript.replaceAll(quote + prefix + resumeName + quote, () => quote + './' + resumeName + quote);
  }
}
// A Blob URL permits opening the embedded resume in a browser tab, unlike top-level data: navigation.
embeddedScript = `const __offlineResume=URL.createObjectURL(new Blob([Uint8Array.from(atob("${resumeBase64}"),c=>c.charCodeAt(0))],{type:"application/pdf"}));\n` + embeddedScript;
const styles = stylesheet.replace(/@import\s+url\([^;]+;?/g, '');
function inlinePage(html, script, singleFile = false) {
  return html
    .replace('<html ', () => `<html data-navigation="${singleFile ? 'hash' : 'pages'}" data-home="${singleFile ? 'jjoe-preview.html' : 'index.html'}" `)
    .replace(/\s*<link\s+rel="preconnect"[^>]*>/gs, '')
    .replace(/\s*<link\s+rel="stylesheet"\s+href="https:\/\/fonts\.googleapis\.com[^>]*>/gs, '')
    .replace(/\s*<script\s+type="module"[^>]*src="[^"]+"[^>]*><\/script>/gs, '')
    .replace(/\s*<link\s+rel="stylesheet"[^>]*href="\.?\/assets\/[^>]+>/gs, '')
    .replace('</head>', () => `<style>${styles}</style><script type="module">${script.replaceAll('</script', () => '<\\/script')}</script></head>`);
}
await mkdir(outputRoot, { recursive: true });
if (!folderRoot.startsWith(outputRoot + path.sep)) throw new Error('Offline export target is outside the output directory.');
await rm(folderRoot, { recursive: true, force: true });
await cp(distRoot, folderRoot, { recursive: true });
const pages = allFiles.filter(name => name.endsWith('.html'));
for (const filename of pages) {
  const html = await readFile(path.join(distRoot, filename), 'utf8');
  await writeFile(path.join(folderRoot, filename), inlinePage(html, folderScript), 'utf8');
  if (filename === 'index.html') await writeFile(outputFile, inlinePage(html, embeddedScript, true), 'utf8');
}
console.log(`已生成 ${pages.length} 个独立页面：${folderRoot}`);
console.log(`已生成单文件离线预览：${outputFile}`);
