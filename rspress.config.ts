import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'docs',
  title: 'FE Interview',
  description: '个人前端面试学习记录',
  themeConfig: {
    nav: [
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'CSS', link: '/css/' },
      { text: '浏览器 & 网络', link: '/browser/' },
      { text: '框架', link: '/framework/' },
      { text: '算法', link: '/algorithm/' },
      { text: '工程化', link: '/engineering/' },
      { text: '系统设计', link: '/system-design/' },
      { text: '面试复盘', link: '/notes/' },
    ],
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/HduSy',
      },
    ],
    footer: {
      message: '© 2026 FE Interview · 种一棵树最好的时间是十年前，其次是现在。',
    },
  },
});
