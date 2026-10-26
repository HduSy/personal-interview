import { defineConfig } from 'rspress/config';
import fs from 'node:fs';
import path from 'node:path';

// 自动根据 docs 目录结构和每个文件的第一行 # 标题生成侧边栏
// 从此新增/修改题目文件，无需再碰此配置文件！
function getAutoSidebar() {
  const titles: Record<string, string> = {
    html: 'HTML 基础',
    css: 'CSS 与布局',
    javascript: 'JavaScript 核心',
    browser: '浏览器 & 网络',
    agent: 'Agent',
    framework: '前端框架',
    algorithm: '手撕&力扣算法题',
    engineering: '项目&工程',
    notes: '面试复盘',
  };

  const sidebar: Record<string, any[]> = {};
  const docsDir = path.resolve(__dirname, 'docs');

  for (const [folder, groupTitle] of Object.entries(titles)) {
    const dirPath = path.join(docsDir, folder);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    files.sort((a, b) => {
      if (a.startsWith('index')) return -1;
      if (b.startsWith('index')) return 1;
      return a.localeCompare(b, undefined, { numeric: true });
    });

    const items = files.map(f => {
      const name = f.replace(/\.mdx?$/, '');
      if (name === 'index') {
        return { text: '概览', link: `/${folder}/` };
      }
      const fullPath = path.join(dirPath, f);
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const match = content.match(/^#\s+(.*)$/m);
        const text = match ? match[1].trim() : name;
        return { text, link: `/${folder}/${name}` };
      } catch {
        return { text: name, link: `/${folder}/${name}` };
      }
    });

    sidebar[`/${folder}/`] = [
      {
        text: groupTitle,
        items,
      },
    ];
  }

  return sidebar;
}

export default defineConfig({
  root: 'docs',
  markdown: {
    globalComponents: [
      path.join(__dirname, 'components/Mermaid.tsx'),
      path.join(__dirname, 'components/Excalidraw.tsx'),
    ],
  },
  title: 'FE Interview',
  description: '个人前端面试学习记录',
  themeConfig: {
    nav: [
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: '浏览器 & 网络', link: '/browser/' },
      { text: 'Agent', link: '/agent/' },
      { text: '框架', link: '/framework/' },
      { text: '手撕&力扣', link: '/algorithm/' },
      { text: '项目&工程', link: '/engineering/' },
      { text: '面试复盘', link: '/notes/' },
    ],
    sidebar: getAutoSidebar(),
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/HduSy/personal-interview',
      },
    ],
    footer: {
      message: '© 2026 FE Interview · 种一棵树最好的时间是十年前，其次是现在。',
    },
  },
});
