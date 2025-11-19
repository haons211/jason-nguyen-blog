"use client";

import { useState } from "react";
import Link from "next/link";
import { PostMeta } from "@/lib/mdx";
import { motion, AnimatePresence } from "framer-motion";

interface FeaturedArticlesProps {
  posts: PostMeta[];
}

export default function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3;
  const maxPages = 3; // Limit to 3 pages (initial + 2 clicks)
  
  // Calculate total available pages based on posts count and max limit
  const totalPages = Math.min(Math.ceil(posts.length / pageSize), maxPages);
  
  const visiblePosts = posts.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const handleNext = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Articles</h2>
        
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={pageIndex === 0}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous articles"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={pageIndex >= totalPages - 1}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next articles"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visiblePosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group h-full"
              >
                <div className="h-full border border-gray-200 rounded-lg overflow-hidden transition-all group-hover:shadow-md flex flex-col bg-white">
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 flex-grow">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 font-medium hover:underline"
        >
          View all posts
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
