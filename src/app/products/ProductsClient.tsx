'use client';

import { useState, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import ProductModal from "@/components/products/ProductModal";
import Pagination from "@/components/products/Pagination";
import { ProductPost } from "@/lib/products";

type ProductsClientProps = {
  products: ProductPost[];
};


const PRODUCTS_PER_PAGE = 9;

export default function ProductsClient({ products }: ProductsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleProductClick = (product: ProductPost) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {products.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
            <div 
              key={product.meta.slug} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={product.meta.image}
                  alt={product.meta.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.meta.status === 'Live' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.meta.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.meta.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {product.meta.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.meta.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {product.meta.technologies.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{product.meta.technologies.length - 3} more
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

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
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
