'use client';

import { useState, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/products/Pagination";
import { LifePostMeta } from "@/lib/life";

type LifeClientProps = {
  posts: LifePostMeta[];
};

const POSTS_PER_PAGE = 9;

export default function LifeClient({ posts }: LifeClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  }, [currentPage, posts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of posts section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {posts.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/life/${post.slug}`}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Post thumbnail */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <Image
                  src={post.thumbnail || '/thumbnails/life-default.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay with post info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-sm text-white/80 mb-1">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="text-lg font-bold text-white line-clamp-2">{post.title}</h3>
                  </div>
                  {post.readingTime && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {post.readingTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                <div className="text-sm text-purple-600 font-medium">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              colorScheme="purple"
            />
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">✍️</div>
          <h3 className="text-xl font-medium text-gray-600">No life stories yet</h3>
          <p className="mt-2 text-gray-500">
            Check back soon for personal stories and experiences!
          </p>
        </div>
      )}
    </>
  );
}

