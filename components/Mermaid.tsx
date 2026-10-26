import React, { useEffect, useRef, useState } from 'react';

interface MermaidProps {
  chart?: string;
  children?: string;
}

export default function Mermaid({ chart, children }: MermaidProps) {
  const code = (chart || children || '').trim();
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      if (!code) return;
      try {
        const mermaid = (await import('mermaid')).default;
        const isDark = document.documentElement.classList.contains('dark');

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
        });

        const id = 'm_' + Math.random().toString(36).substring(2, 9);
        const { svg: renderedSvg } = await mermaid.render(id, code);
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Failed to render Mermaid chart');
        }
      }
    }

    renderChart();

    const observer = new MutationObserver(() => {
      renderChart();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [code]);

  if (error) {
    return (
      <div style={{ color: '#ef4444', padding: '1rem', border: '1px solid #f87171', borderRadius: '6px', background: 'rgba(239,68,68,0.05)' }}>
        <p style={{ fontWeight: 600, margin: '0 0 0.5rem' }}>Mermaid 渲染错误:</p>
        <pre style={{ margin: 0, fontSize: '0.85rem' }}>{error}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
        正在渲染图表...
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1.5rem 0',
        overflowX: 'auto',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
