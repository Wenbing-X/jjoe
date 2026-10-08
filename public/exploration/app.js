const projects = [
  { title: '短剧出海 Skill 工作流', category: '01 / SHORT DRAMA · LOCALIZATION', image: 'exploration-short-drama.png', text: '以短剧出海为切入点，把市场洞察、选题策划、本地化、AI 制作、质检交付与发布复盘组织为六个阶段。每一步都明确输入、产出与人工审核点，形成可继续执行、复用和迭代的工作路径。', tags: ['市场洞察', '内容本地化', '六阶段工作流'], url: 'project-short-drama.html' },
  { title: 'AI 视频制作', category: '02 / AI VIDEO · PRODUCTION', image: 'hero-harbor.png', text: '把脚本、画面、字幕、配音与剪辑放进一条清晰的制作流程。结合 AI 工具与人工检查，组织素材、推进版本，输出适合目标渠道的内容。以下港口影像沿用本站展示素材；完整能力说明与样片见项目详情。', tags: ['脚本策划', 'AI 画面', '配音字幕', '剪辑交付'], url: 'case-video-production.html', video: './videos/hero-harbor.mp4' },
  { title: '生成式内容工作流', category: '03 / COMFYUI · GENERATIVE WORKFLOW', image: 'global-sculpture.png', text: '熟悉 ComfyUI 本地工作流，围绕具体内容目标组织生成环节。结合 MoneyPrinterTurbo、即梦与剪映，明确素材输入、版本管理与质量标准，将单个工具连接成可以执行的制作流程。', tags: ['ComfyUI', '本地工作流', '素材与版本管理'], url: 'project-comfyui.html' },
  { title: '内容运营与迭代', category: '04 / CONTENT · OPERATIONS', image: 'exploration-content.png', text: '具备 AI 短剧账号从 0 到 1 的独立执行经验，推进选题、制作、发布和复盘。把内容表现与制作问题分别记录，以内容表现和持续反馈指导下一轮内容。', tags: ['选题策划', '账号实践', '发布复盘'], url: 'project-content.html' },
  { title: '经营决策与项目协同', category: '05 / BUSINESS · PROJECT MANAGEMENT', text: '以工商管理背景为基础，把复杂目标拆成任务范围、里程碑和具体行动。围绕素材、版本和问题推进协同，保留过程记录，让经验能够复用，让交付有据可循。', tags: ['需求梳理', '里程碑管理', '协同交付'], url: 'project-business.html' },
];

// Keep links shared from the earlier hash-routed portfolio usable on the new homepage.
const legacyPages = {
  '#/case/video-production': 'case-video-production.html',
  '#/tools/video-studio': 'case-video-production.html',
};
projects.filter(project => project.url.startsWith('project-')).forEach(project => {
  legacyPages['#/projects/' + project.url.slice(8, -5)] = project.url;
});
['planning', 'localization', 'workflow', 'delivery'].forEach(id => {
  legacyPages['#/capabilities/' + id] = 'capability-' + id + '.html';
});
const routeLegacyHash = () => {
  const hash = location.hash;
  const base = hash.split('/').slice(0, 3).join('/');
  const page = legacyPages[base];
  const stage = hash.split('/')[3];
  if (page) location.replace('./' + page + (stage && page === 'project-short-drama.html' ? '#stage-' + encodeURIComponent(stage) : ''));
  if (hash === '#services') document.querySelector('#method').scrollIntoView();
};
routeLegacyHash();
window.addEventListener('hashchange', routeLegacyHash);

const dialog = document.querySelector('#project-dialog');
let lastTrigger;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[Number(button.dataset.project)];
  // Older embedded browsers can still open every project without a native dialog.
  if (typeof dialog.showModal !== 'function') {
    location.href = './' + project.url;
    return;
  }
  lastTrigger = button;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-text').textContent = project.text;
  document.querySelector('#dialog-link').href = './' + project.url;
  const media = document.querySelector('#dialog-media');
  media.textContent = '';
  if (project.video) {
    const video = document.createElement('video');
    video.src = project.video;
    video.poster = './images/' + project.image;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', '港口影像展示');
    media.appendChild(video);
  } else if (project.image) {
    const image = document.createElement('img');
    image.src = './images/' + project.image;
    image.alt = project.title;
    media.appendChild(image);
  }
  const tags = document.querySelector('#dialog-tags');
  tags.textContent = '';
  project.tags.forEach(tag => {
    const label = document.createElement('span');
    label.textContent = tag;
    tags.appendChild(label);
  });
  document.body.classList.add('modal-open');
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  const video = document.querySelector('#dialog-media video');
  if (video) video.pause();
  document.body.classList.remove('modal-open');
  if (lastTrigger) lastTrigger.focus();
});

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(filter => {
    filter.classList.toggle('selected', filter === button);
    filter.setAttribute('aria-pressed', String(filter === button));
  });
  let count = 0;
  document.querySelectorAll('.project').forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && !project.dataset.category.split(' ').includes(button.dataset.filter);
    if (!project.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = '显示 ' + count + ' 个实践项目';
}));
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach(item => item.classList.toggle('active', item === link));
}));
