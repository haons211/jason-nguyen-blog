'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import mdxComponents from '@/lib/mdx/mdx-components';

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

  if (!isOpen || !product) return null;

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
          {/* Left side - Image */}
          <div className="relative h-64 md:h-auto bg-gray-100">
            <Image
              src={product.meta.image}
              alt={product.meta.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-sm rounded-full ${
                product.meta.status === 'Live' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {product.meta.status}
              </span>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="p-6 md:p-8 overflow-y-auto">
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{product.meta.name}</h2>
                
                <div className="prose prose-gray max-w-none mb-6">
                  <MDXRemote {...product.content} components={mdxComponents} />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.meta.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {product.meta.liveUrl && product.meta.liveUrl !== '#' && (
                  <Link
                    href={product.meta.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Live Demo
                  </Link>
                )}
                {product.meta.githubUrl && (
                  <Link
                    href={product.meta.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 text-gray-700 text-center py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
                  >
                    View Source
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
