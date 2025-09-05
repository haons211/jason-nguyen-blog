import Link from 'next/link';
import Image from 'next/image';

// Helper to generate slug from text
const slugify = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

// Custom components for use in MDX
const components = {
  // Override default elements with custom styling
  h1: ({ children }: { children: React.ReactNode }) => {
    const id = typeof children === 'string' ? slugify(children) : '';
    return (
      <h1 id={id} className="text-3xl md:text-4xl font-bold mb-4 mt-8 scroll-mt-20">
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h1>
    );
  },
  h2: ({ children }: { children: React.ReactNode }) => {
    const id = typeof children === 'string' ? slugify(children) : '';
    return (
      <h2 id={id} className="text-2xl md:text-3xl font-bold mb-3 mt-8 scroll-mt-20">
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    const id = typeof children === 'string' ? slugify(children) : '';
    return (
      <h3 id={id} className="text-xl md:text-2xl font-bold mb-3 mt-6 scroll-mt-20">
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h3>
    );
  },
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isInternal = href?.startsWith('/');
    if (isInternal) {
      return (
        <Link href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
          {children}
        </Link>
      );
    }
    
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }: { src: string; alt?: string }) => {
    return (
      <div className="my-6 relative h-64 md:h-96">
        <Image
          src={src || ''}
          alt={alt || ''}
          fill
          className="object-contain"
        />
      </div>
    );
  },
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside my-4 pl-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside my-4 pl-4 space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-1">{children}</li>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm">
      {children}
    </code>
  ),
  // Add custom components below
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500',
      warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500',
      error: 'bg-red-50 dark:bg-red-900/20 border-red-500',
    };
    
    return (
      <div className={`p-4 my-4 border-l-4 rounded-r-lg ${styles[type]}`}>
        {children}
      </div>
    );
  },
};

export default components; 