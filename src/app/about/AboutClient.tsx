"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TimelineItem from "@/components/career/TimelineItem";

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
  socials: Social[];
}

interface CareerItem {
  meta: any;
  content: React.ReactNode;
}

interface AboutClientProps {
  userInfo: UserInfo;
  userSkills: string[];
  careerItems: CareerItem[];
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
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

export default function AboutClient({ userInfo, userSkills, careerItems }: AboutClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 overflow-hidden flex flex-col">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-100/30 dark:bg-purple-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow max-w-5xl mx-auto px-6 py-20 md:py-32 w-full">
        
        {/* Hero Section */}
        <motion.header 
          style={{ opacity: headerOpacity, scale: headerScale }}
          className="mb-24 md:mb-32 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-48 h-48 md:w-64 md:h-64 shrink-0"
          >
            <div className="absolute inset-0 rounded-2xl rotate-3 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-lg" />
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src={userInfo.avatarUrl}
                alt={userInfo.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400"
            >
              {userInfo.name}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed"
            >
              <p>{userInfo.bio}</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
            >
              <a 
                href={`mailto:${userInfo.email}`}
                className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
              >
                Contact Me
              </a>
              {userInfo.socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.header>

        {/* Skills Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-24 md:mb-32"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-10 flex items-center gap-4"
          >
            <span className="w-8 h-[2px] bg-blue-500" />
            Skills & Expertise
          </motion.h2>
          
          <div className="flex flex-wrap gap-3">
            {userSkills.map((skill, index) => (
              <motion.span
                key={skill}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-sm font-medium cursor-default border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Career Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-12 flex items-center gap-4"
          >
            <span className="w-8 h-[2px] bg-purple-500" />
            Journey
          </motion.h2>

          <div className="space-y-12 border-l-2 border-neutral-100 dark:border-neutral-800 ml-3 pl-8 md:pl-12">
            {careerItems.map(({ meta, content }, index) => (
              <motion.div 
                key={meta.slug}
                variants={fadeInUp}
                className="relative"
              >
                <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 rounded-full border-4 border-white dark:border-neutral-950 bg-neutral-300 dark:bg-neutral-700" />
                <TimelineItem item={meta}>
                  <div className="prose dark:prose-invert max-w-none mt-4 text-neutral-600 dark:text-neutral-400">
                     {content}
                  </div>
                </TimelineItem>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* About Blog Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="p-8 md:p-12 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800"
        >
          <h2 className="text-2xl font-bold mb-6">The Digital Garden</h2>
          <div className="max-w-3xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-6">
            <p>
              This blog is my digital garden—a place where I share technical insights, tutorials, and reflections on my journey in software development. I write about topics I&apos;m passionate about, including web development, performance optimization, and career growth in tech.
            </p>
            <p>
              The site is built with Next.js and deployed on Vercel, using MDX for content management. It&apos;s designed to be fast, accessible, and easy to read.
            </p>
          </div>
        </motion.section>
        
        </main>
        <Footer />
      </div>
    </div>
  );
}
