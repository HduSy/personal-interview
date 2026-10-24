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
    sidebar: {
      '/html/': [
        {
          text: 'HTML 基础',
          items: [
            { text: '概览', link: '/html/' },
            { text: '01. src 与 href 的区别', link: '/html/01-src-vs-href' },
          ],
        },
      ],
      '/css/': [
        {
          text: 'CSS 与布局',
          items: [{ text: '概览', link: '/css/' }],
        },
      ],
      '/javascript/': [
        {
          text: 'JavaScript 核心',
          items: [{ text: '概览', link: '/javascript/' }],
        },
      ],
      '/browser/': [
        {
          text: '浏览器 & 网络',
          items: [{ text: '概览', link: '/browser/' }],
        },
      ],
      '/agent/': [
        {
          text: 'Agent',
          items: [{ text: '概览', link: '/agent/' }],
        },
      ],
      '/framework/': [
        {
          text: '前端框架',
          items: [{ text: '概览', link: '/framework/' }],
        },
      ],
      '/algorithm/': [
        {
          text: '手撕&力扣算法题',
          items: [{ text: '概览', link: '/algorithm/' }],
        },
      ],
      '/engineering/': [
        {
          text: '项目&工程',
          items: [{ text: '概览', link: '/engineering/' }],
        },
      ],
      '/notes/': [
        {
          text: '面试复盘',
          items: [{ text: '概览', link: '/notes/' }],
        },
      ],
    },
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
