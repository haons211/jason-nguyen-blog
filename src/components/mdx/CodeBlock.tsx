'use client';

import { useRef, useState, useEffect } from 'react';

type CodeBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const containerRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-javascript")
  const language = className?.replace(/language-/, '') || 'javascript';

  useEffect(() => {
    const loadPrism = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        // Dynamic import Prism.js
        const Prism = (await import('prismjs')).default;
        
        // Load language components
        await import('prismjs/components/prism-javascript');
        await import('prismjs/components/prism-typescript');
        await import('prismjs/components/prism-jsx');
        await import('prismjs/components/prism-tsx');
        await import('prismjs/components/prism-python');
        await import('prismjs/components/prism-css');
        await import('prismjs/components/prism-bash');
        await import('prismjs/components/prism-json');
        
        if (containerRef.current) {
          // Apply Prism highlighting
          Prism.highlightAllUnder(containerRef.current);
        }
      } catch (error) {
        console.warn('Failed to load Prism.js:', error);
      }
    };

    loadPrism();
  }, [children, language]);

  const handleCopy = async () => {
    const codeEl = containerRef.current?.querySelector('code');
    const text = codeEl?.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      const timeout = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timeout);
    } catch {
      // noop
    }
  };

  return (
    <div className="group relative my-6">
      {/* Header bar with language indicator */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-slate-300 text-xs font-medium">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center space-x-1 rounded-md bg-slate-600 hover:bg-slate-500 px-2 py-1 text-xs text-slate-200 transition-colors"
          aria-label="Copy code"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre
        ref={containerRef}
        className={`overflow-x-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 text-sm leading-relaxed rounded-b-lg border-l-4 border-blue-500 language-${language}`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        }}
      >
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}


