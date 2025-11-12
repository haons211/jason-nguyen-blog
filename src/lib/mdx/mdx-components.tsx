import Link from 'next/link';
import Image from 'next/image';
import CodeBlock from '@/components/mdx/CodeBlock';

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
        <Link href={href} className="text-blue-600 hover:underline">
          {children}
        </Link>
      );
    }
    
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt, title }: { src: string; alt?: string; title?: string }) => {
    // Determine if image should be full width or contained
    const isFullWidth = title?.includes('fullwidth');
    
    return (
      <figure className="my-8">
        <div className={`relative ${isFullWidth ? 'w-full h-[400px] md:h-[600px]' : 'w-full h-64 md:h-96'} rounded-lg overflow-hidden`}>
          <Image
            src={src || ''}
            alt={alt || ''}
            fill
            className={`${isFullWidth ? 'object-cover' : 'object-contain'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
        {alt && (
          <figcaption className="text-center text-sm text-gray-600 mt-3 italic">
            {alt}
          </figcaption>
        )}
      </figure>
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
    <code className="px-2 py-1 rounded-md font-mono text-sm bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300 shadow-sm">
      {children}
    </code>
  ),
  pre: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <CodeBlock className={className}>{children}</CodeBlock>
  ),
  // Add custom components below
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' }) => {
    const styles = {
      info: 'bg-blue-50 border-blue-500',
      warning: 'bg-amber-50 border-amber-500',
      error: 'bg-red-50 border-red-500',
    };
    
    return (
      <div className={`p-4 my-4 border-l-4 rounded-r-lg ${styles[type]}`}>
        {children}
      </div>
    );
  },
  // Custom Image Gallery component
  ImageGallery: ({ images }: { images: Array<{ src: string; alt: string }> }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {images.map((image, index) => (
          <div key={index} className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    );
  },
};

export default components; 