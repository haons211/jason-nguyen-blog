"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TypewriterEffect from "@/components/TypewriterEffect";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import { PostMeta, UserInformation } from "@/lib/mdx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HomeClientProps {
  userInfo: UserInformation;
  featuredPosts: PostMeta[];
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

export default function HomeClient({ userInfo, featuredPosts }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 overflow-hidden selection:bg-blue-100">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 blur-[100px]"
        />
        <motion.div 
          style={{ y: y2, opacity }}
          className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-100 to-cyan-100 blur-[120px]"
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col">
          {/* Hero Section */}
          <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-8"
              >
                <motion.div variants={fadeInUp}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                    Creative <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      Builder
                    </span>
                  </h1>
                </motion.div>

                <motion.div variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 h-20">
                  <TypewriterEffect 
                    sentences={userInfo.introduction}
                    speed={80}
                    pauseBetweenSentences={2000}
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <Link
                    href="/blog"
                    className="px-8 py-4 rounded-full bg-gray-900 text-white font-medium hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                  >
                    Read the Blog
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 rounded-full border border-gray-200 hover:border-gray-400 font-medium hover:scale-105 transition-transform duration-200 backdrop-blur-sm"
                  >
                    About Me
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative h-[400px] md:h-[500px] w-full hidden md:block"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3 scale-95" />
                <div className="absolute inset-0 bg-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 backdrop-blur-sm">
                   <Image
                    src="/hero.jpg"
                    alt="Hero image"
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Articles Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto px-6 w-full pb-24"
          >
            <FeaturedArticles posts={featuredPosts} />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
