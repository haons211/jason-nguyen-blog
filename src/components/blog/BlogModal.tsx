'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import mdxComponents from '@/lib/mdx/mdx-components';
import { PostMeta } from '@/lib/mdx';

type BlogModalProps = {
  post: PostMeta | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 h-full">
          {/* Left side - Thumbnail */}
          <div className="relative h-64 md:h-auto bg-gray-100">
            <Image
              src={post.thumbnail || '/thumbnails/default.jpg'}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                <p className="text-white/80">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {post.readingTime && (
                  <p className="text-white/80 mt-1">{post.readingTime}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="p-6 md:p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h2>
                
                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Article Details</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">📅</span>
                      Published on {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </li>
                    {post.readingTime && (
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">⏱️</span>
                        {post.readingTime} read
                      </li>
                    )}
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">📖</span>
                      Technical article about software development
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  onClick={onClose}
                >
                  Read Full Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
