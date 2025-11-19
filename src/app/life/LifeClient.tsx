"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LifePostMeta } from "@/lib/life";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LifeClientProps = {
  posts: LifePostMeta[];
};

const POSTS_PER_PAGE = 9;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LifeClient({ posts }: LifeClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-purple-100 flex flex-col">
      {/* Abstract Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-purple-50 to-transparent opacity-50 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-50 to-transparent opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
            >
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Life
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-gray-500 leading-relaxed">
                Personal stories, experiences, and reflections on life beyond technology.
              </motion.p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16 space-y-6"
            >
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
                <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    !selectedTag 
                      ? "bg-gray-900 text-white shadow-md" 
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  )}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      tag === selectedTag 
                        ? "bg-gray-900 text-white shadow-md" 
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Posts Grid */}
            <AnimatePresence mode="wait">
              {currentPosts.length > 0 ? (
                <motion.div 
                  key={currentPage + (selectedTag || "") + searchQuery}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {currentPosts.map((post) => (
                    <motion.div variants={fadeInUp} key={post.slug}>
                      <Link href={`/life/${post.slug}`} className="group block h-full">
                        <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                          <div className="relative h-56 overflow-hidden">
                            <Image
                              src={post.thumbnail || '/thumbnails/life-default.jpg'}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          
                          <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                              <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </time>
                              <span>•</span>
                              <span>{post.readingTime}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                              {post.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                              {post.tags?.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-center py-32"
                >
                  <p className="text-xl text-gray-500">No stories found matching your criteria.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedTag(null); }}
                    className="mt-4 text-purple-600 hover:underline font-medium"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "w-11 h-11 rounded-full font-medium transition-all",
                      currentPage === page
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    )}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
