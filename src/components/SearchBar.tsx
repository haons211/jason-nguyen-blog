'use client';

import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SearchResult = {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags?: string[];
  type?: 'blog' | 'life';
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize search index
  useEffect(() => {
    const fetchSearchIndex = async () => {
      try {
        const response = await fetch('/api/search');
        const data = await response.json();
        setSearchIndex(data);
      } catch (error) {
        console.error('Error fetching search index:', error);
      }
    };

    fetchSearchIndex();
  }, []);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set up Fuse instance with search options
  const fuse = new Fuse(searchIndex, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.3 },
    ],
    includeScore: true,
    threshold: 0.4,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      setIsLoading(true);
      setShowResults(true);

      // Perform search
      const searchResults = fuse.search(value);
      setResults(searchResults.map((result) => result.item));
      setIsLoading(false);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      setShowResults(false);
      const firstResult = results[0];
      const prefix = firstResult.type === 'life' ? '/life' : '/blog';
      router.push(`${prefix}/${firstResult.slug}`);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setShowResults(true)}
          placeholder="Search articles..."
          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white border border-gray-300 shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : results.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {results.slice(0, 8).map((result) => {
                const prefix = result.type === 'life' ? '/life' : '/blog';
                const badgeColor = result.type === 'life' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-blue-100 text-blue-700';
                
                return (
                  <li key={`${result.type}-${result.slug}`} className="border-b border-gray-100 last:border-0">
                    <Link 
                      href={`${prefix}/${result.slug}`}
                      onClick={() => setShowResults(false)}
                      className="block p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-gray-900 flex-1">{result.title}</h3>
                        {result.type && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColor} whitespace-nowrap`}>
                            {result.type}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {result.description}
                      </p>
                      {result.tags && result.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : query.length > 1 ? (
            <div className="p-4 text-center text-gray-500">No results found</div>
          ) : null}
        </div>
      )}
    </div>
  );
} 