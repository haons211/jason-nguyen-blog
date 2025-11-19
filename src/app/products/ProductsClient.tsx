"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductModal from "@/components/products/ProductModal";
import { ProductPost } from "@/lib/products";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ProductsClientProps = {
  products: ProductPost[];
};

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

export default function ProductsClient({ products }: ProductsClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: ProductPost) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-emerald-100 flex flex-col">
      {/* Abstract Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-50 to-transparent opacity-50 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-teal-50 to-transparent opacity-50 blur-3xl" />
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
                Products
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-gray-500 leading-relaxed">
                A showcase of applications, tools, and experiments I've built.
              </motion.p>
            </motion.div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8 lg:gap-12"
              >
                {products.map((product) => (
                  <motion.div 
                    variants={fadeInUp} 
                    key={product.meta.slug}
                    onClick={() => handleProductClick(product)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-64 md:h-80 overflow-hidden bg-gray-50">
                        <Image
                          src={product.meta.image}
                          alt={product.meta.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={cn(
                            "px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md",
                            product.meta.status === 'Live' 
                              ? "bg-emerald-500/90 text-white" 
                              : "bg-amber-500/90 text-white"
                          )}>
                            {product.meta.status}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                      </div>
                      
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold group-hover:text-emerald-600 transition-colors">
                            {product.meta.name}
                          </h3>
                          <div className="p-2 rounded-full bg-gray-50 group-hover:bg-emerald-50 text-gray-400 group-hover:text-emerald-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 line-clamp-2 mb-6 text-lg">
                          {product.meta.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {product.meta.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-100"
                            >
                              {tech}
                            </span>
                          ))}
                          {product.meta.technologies.length > 4 && (
                            <span className="text-xs text-gray-400 px-2 py-1.5">
                              +{product.meta.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-gray-50 rounded-3xl border border-gray-100"
              >
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-500 text-lg max-w-md mx-auto">
                  I'm currently working on some exciting projects. Check back soon to see what I've been building!
                </p>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </div>

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
