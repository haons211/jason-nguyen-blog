'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  // Extract headings when the component mounts
  useEffect(() => {
    const extractHeadings = () => {
      // Only get headings from the article content, not from sidebar or other sections
      const article = document.querySelector('article');
      if (!article) return;
      
      const headingElements = Array.from(article.querySelectorAll('h1, h2, h3'));
      const excludedTexts = ['Table of Contents', 'Comments'];
      const seenTexts = new Set<string>();
      
      const headings = headingElements
        .map(heading => {
          // Generate an ID if one doesn't exist
          if (!heading.id) {
            heading.id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') ?? '';
          }
          
          const text = heading.textContent?.trim() || '';
          
          return {
            id: heading.id,
            text,
            level: parseInt(heading.tagName[1])
          };
        })
        .filter(heading => {
          // Exclude specific texts
          if (excludedTexts.some(excluded => heading.text.includes(excluded))) {
            return false;
          }
          // Exclude h1 (usually the post title, not needed in TOC)
          if (heading.level === 1) {
            return false;
          }
          // Remove duplicates
          if (seenTexts.has(heading.text)) {
            return false;
          }
          seenTexts.add(heading.text);
          return true;
        });
      
      setHeadings(headings);
    };

    // Allow content to render first
    setTimeout(extractHeadings, 500);
  }, [pathname]);

  // Handle scroll and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;
      
      const headingElements = Array.from(article.querySelectorAll('h2, h3'));
      
      // Find the heading that's currently visible
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        const rect = heading.getBoundingClientRect();
        
        // If the heading is in the viewport and above the middle of the screen
        if (rect.top <= 200) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once immediately
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  // Skip rendering if there are less than 2 headings
  if (headings.length < 2) {
    return null;
  }

  return (
    <nav className="toc hidden lg:block lg:fixed top-16 lg:left-8 xl:left-16 2xl:left-24 lg:w-[280px] z-10">
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200 max-h-[calc(100vh-6rem)] overflow-auto">
        <h3 className="text-lg font-bold mb-5 text-gray-900 pb-3 border-b border-gray-200">
          Table of Contents
        </h3>
        <ul className="space-y-3">
          {headings.map((heading) => {
            // Determine indentation and styling based on heading level
            const indentClass = heading.level === 1 ? 'ml-0' : heading.level === 2 ? 'ml-3' : 'ml-6';
            
            // Different dot styles based on heading level
            const dotStyle = heading.level === 1 
              ? "before:content-['•'] before:mr-2 before:text-blue-600 before:font-bold"
              : heading.level === 2
              ? "before:content-['◦'] before:mr-2 before:text-blue-500 before:font-bold" 
              : "before:content-['▪️'] before:mr-2 before:text-blue-400 before:text-xs";
            
            // Active state styling
            const activeStyle = activeId === heading.id
              ? "text-blue-600 font-medium"
              : "text-gray-700";
            
            return (
              <li 
                key={heading.id} 
                className={`${indentClass} leading-tight transition-all duration-200`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`
                    flex items-baseline py-1 text-sm hover:text-blue-600 
                    transition-colors group ${activeStyle} ${dotStyle}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                    setActiveId(heading.id);
                  }}
                >
                  <span className="group-hover:underline line-clamp-2">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
} 