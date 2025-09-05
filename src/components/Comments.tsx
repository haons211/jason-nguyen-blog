'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // If the ref or theme changes, reload the comments
    if (!ref.current || ref.current.hasChildNodes()) return;

    const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
    
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://giscus.app/client.js';
    scriptEl.async = true;
    scriptEl.crossOrigin = 'anonymous';
    
    // Customize these attributes based on your repository
    scriptEl.setAttribute('data-repo', 'yourusername/giscus-comments');
    scriptEl.setAttribute('data-repo-id', 'your-repo-id');
    scriptEl.setAttribute('data-category', 'Comments');
    scriptEl.setAttribute('data-category-id', 'your-category-id');
    scriptEl.setAttribute('data-mapping', 'pathname');
    scriptEl.setAttribute('data-strict', '0');
    scriptEl.setAttribute('data-reactions-enabled', '1');
    scriptEl.setAttribute('data-emit-metadata', '0');
    scriptEl.setAttribute('data-input-position', 'top');
    scriptEl.setAttribute('data-theme', theme);
    scriptEl.setAttribute('data-lang', 'en');
    
    ref.current.appendChild(scriptEl);
    
    return () => {
      // Clean up - remove the script when the component unmounts
      if (scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [resolvedTheme]);

  // Update the theme when it changes
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (!iframe) return;

    const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }, [resolvedTheme]);

  return (
    <section className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-8">Comments</h2>
      <div ref={ref} className="giscus" />
    </section>
  );
} 