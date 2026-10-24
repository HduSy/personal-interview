import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'docs',
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
