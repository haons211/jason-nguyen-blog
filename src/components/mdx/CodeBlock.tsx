'use client';

import { useRef, useState } from 'react';

type CodeBlockProps = {
  children: React.ReactNode;
};

export default function CodeBlock({ children }: CodeBlockProps) {
  const containerRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

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
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded-md border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 px-2 py-1 text-xs text-gray-700 dark:text-gray-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        ref={containerRef}
        className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 text-sm leading-relaxed"
      >
        {children}
      </pre>
    </div>
  );
}


