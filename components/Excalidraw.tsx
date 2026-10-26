import React from 'react';

interface ExcalidrawProps {
  src?: string;
  alt?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
}

export default function Excalidraw({
  src,
  alt = 'Excalidraw Diagram',
  caption,
  width = '100%',
  height,
}: ExcalidrawProps) {
  if (!src) {
    return (
      <div
        style={{
          padding: '1.5rem',
          color: '#888',
          border: '1px dashed #ccc',
          borderRadius: 8,
          textAlign: 'center',
          fontSize: '0.9rem',
        }}
      >
        请指定 Excalidraw 资源路径：<code>&lt;Excalidraw src="/images/xxx.svg" /&gt;</code>
      </div>
    );
  }

  return (
    <figure
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1.5rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--rp-c-divider, #e5e7eb)',
          background: 'var(--rp-c-bg, #ffffff)',
          padding: '1rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: height || 'auto',
            width: width,
            objectFit: 'contain',
          }}
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: 'var(--rp-c-text-2, #6b7280)',
            textAlign: 'center',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
