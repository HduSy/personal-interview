import React, { useEffect, useState } from 'react';
import {
  Sandpack as BaseSandpack,
  SandpackProps as BaseSandpackProps,
} from '@codesandbox/sandpack-react';

export interface SandpackProps extends Omit<BaseSandpackProps, 'theme'> {
  /** 自定义主题，不传则自动跟随站点明暗主题 */
  theme?: 'dark' | 'light' | 'auto';
  /** 是否在下方开启 Console 控制台（非常适合 JS / 事件循环 / Promise 题目） */
  showConsole?: boolean;
  /** 高度设置，默认 360px */
  height?: number | string;
  /** 快捷注入 HTML 字符串（仅在 template 为 static 或 vanilla 时有效） */
  html?: string;
  /** 快捷注入 CSS 字符串（仅在 template 为 static 或 vanilla 时有效） */
  css?: string;
  /** 快捷注入 JS 字符串（仅在 template 为 static 或 vanilla 时有效） */
  js?: string;
}

export default function Sandpack({
  template = 'static',
  files = {},
  theme = 'auto',
  showConsole = false,
  height = 360,
  options = {},
  html,
  css,
  js,
  ...restProps
}: SandpackProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // 避免 SSG / SSR 时因 window/DOM 不存在导致水合报错
  if (!mounted) {
    return (
      <div
        style={{
          height,
          margin: '1.5rem 0',
          borderRadius: '8px',
          background: 'rgba(128, 128, 128, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--rp-c-text-2, #888)',
          fontSize: '0.9rem',
          border: '1px solid rgba(128, 128, 128, 0.2)',
        }}
      >
        加载交互式代码沙箱...
      </div>
    );
  }

  // 计算当前主题
  const activeTheme =
    theme === 'auto' ? (isDark ? 'dark' : 'light') : theme;

  // 组合快捷传入的代码片段
  let mergedFiles: Record<string, any> = { ...files };

  if (html !== undefined || css !== undefined || js !== undefined) {
    if (template === 'static') {
      const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
${css || '/* 自定义 CSS */'}
  </style>
</head>
<body>
${html || '<!-- 自定义 HTML -->'}
  <script>
${js || '// 自定义 JS'}
  </script>
</body>
</html>`;
      mergedFiles = {
        '/index.html': fullHtml,
        ...files,
      };
    } else if (template === 'vanilla') {
      if (html) mergedFiles['/index.html'] = html;
      if (css) mergedFiles['/src/styles.css'] = css;
      if (js) mergedFiles['/src/index.js'] = js;
    }
  }

  return (
    <div
      style={{
        margin: '1.5rem 0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.35)'
          : '0 4px 16px rgba(0, 0, 0, 0.08)',
      }}
    >
      <BaseSandpack
        template={template}
        files={mergedFiles}
        theme={activeTheme}
        options={{
          showLineNumbers: true,
          showInlineErrors: true,
          showConsole,
          showConsoleButton: true,
          showTabs: true,
          closableTabs: false,
          editorHeight: height,
          wrapContent: true,
          ...options,
        }}
        {...restProps}
      />
    </div>
  );
}
