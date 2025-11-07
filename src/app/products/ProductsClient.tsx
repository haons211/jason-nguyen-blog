'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import ProductModal from "@/components/products/ProductModal";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: string;
  longDescription?: string;
};

// Sample products data - you can move this to a separate file or MDX later
const products: Product[] = [
  {
    id: 1,
    name: "Personal Blog",
    description: "A modern blog built with Next.js 15, featuring MDX content, search functionality, and responsive design.",
    longDescription: "This personal blog showcases modern web development practices using Next.js 15 with the App Router architecture. It features a complete content management system using MDX files, advanced search functionality with Fuse.js, and a fully responsive design optimized for all devices. The blog includes features like table of contents generation, syntax highlighting for code blocks, and a clean, professional design that focuses on readability and user experience.",
    image: "/hero.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Fuse.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/haons211",
    status: "Live"
  },
  // Add more products here
];

export default function ProductsClient() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'Live' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {product.technologies.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{product.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-blue-600 font-medium">
                  Click to view details →
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600">Coming Soon</h3>
          <p className="mt-2 text-gray-500">
            I'm working on some exciting projects. Check back soon!
          </p>
        </div>
      )}

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
