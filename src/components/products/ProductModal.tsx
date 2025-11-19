'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import mdxComponents from '@/lib/mdx/mdx-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductPost } from '@/lib/products';

type ProductModalProps = {
  product: ProductPost | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-500 hover:text-gray-900 transition-all shadow-sm border border-gray-100"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left side - Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-50">
              <Image
                src={product.meta.image}
                alt={product.meta.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
              
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 text-xs font-bold tracking-wide uppercase rounded-full backdrop-blur-md shadow-sm ${
                  product.meta.status === 'Live' 
                    ? 'bg-emerald-500/90 text-white' 
                    : 'bg-amber-500/90 text-white'
                }`}>
                  {product.meta.status}
                </span>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-1/2 flex flex-col bg-white">
              <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">{product.meta.name}</h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.meta.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-[10px] md:text-xs font-medium border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="prose prose-sm md:prose-base prose-gray max-w-none mb-6 prose-headings:font-bold prose-p:text-gray-600 prose-a:text-blue-600">
                  <MDXRemote {...product.content} components={mdxComponents} />
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50/50">
                <div className="grid grid-cols-2 gap-3">
                  {/* Code Button */}
                  {product.meta.githubUrl && (
                    <Link
                      href={product.meta.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-gray-900/20"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Code
                    </Link>
                  )}

                  {/* Use Button */}
                  {product.meta.liveUrl && product.meta.liveUrl !== '#' && (
                    <Link
                      href={product.meta.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg ${
                        product.meta.buyUrl 
                          ? 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50' 
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Use
                    </Link>
                  )}

                  {/* Buy Button (Conditional) */}
                  {product.meta.buyUrl && (
                    <Link
                      href={product.meta.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-purple-600/20"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Buy Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
