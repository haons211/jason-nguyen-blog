"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Social {
  name: string;
  url: string;
  icon?: string;
}

interface UserInfo {
  name: string;
  avatarUrl: string;
  email: string;
  bio: string;
  introduction?: string[];
  socials: Social[];
}

interface AboutClientProps {
  userInfo: UserInfo;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function AboutClient({ userInfo }: AboutClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-neutral-900 overflow-hidden flex flex-col">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-3xl opacity-60" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-purple-50/50 blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow w-full">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
            
            {/* Artistic Hero Section */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
            >
              {/* Image with artistic frame */}
              <motion.div 
                variants={fadeInUp}
                className="relative mb-16 group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-1 ring-neutral-100 shadow-2xl">
                  <Image
                    src={userInfo.avatarUrl}
                    alt={userInfo.name}
                    fill
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                    priority
                  />
                </div>
              </motion.div>

              {/* Introduction Text */}
              <div className="space-y-6 md:space-y-8">
                <motion.h1 
                  variants={fadeInUp}
                  className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-900"
                >
                  Hello, I&apos;m {userInfo.name.split(' ')[0]}.
                </motion.h1>

                <div className="space-y-2 md:space-y-4">
                  {userInfo.introduction?.map((line, index) => (
                    <motion.p
                      key={index}
                      variants={fadeInUp}
                      className="text-2xl md:text-4xl font-light text-neutral-600 leading-tight"
                    >
                      {line}
                    </motion.p>
                  )) || (
                    <motion.p
                      variants={fadeInUp}
                      className="text-2xl md:text-4xl font-light text-neutral-600 leading-tight"
                    >
                      {userInfo.bio}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <motion.div 
                variants={fadeInUp}
                className="mt-16 flex flex-wrap justify-center gap-6"
              >
                <a 
                  href={`mailto:${userInfo.email}`}
                  className="group relative px-8 py-4 rounded-full bg-neutral-900 text-white font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-neutral-500/25"
                >
                  <span className="relative z-10">Get in touch</span>
                  <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
                
                {userInfo.socials.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 rounded-full border border-neutral-200 text-neutral-600 font-medium hover:border-neutral-900 hover:text-neutral-900 transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
