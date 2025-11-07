import MainLayout from "@/components/layout/MainLayout";
import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import { NextPageProps } from "@/lib/types";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about software development, web technologies, and professional growth.',
};

export default async function BlogPage(props: NextPageProps) {
  const posts = await getAllPosts();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600">
            Thoughts, tutorials, and insights on software development
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-6"></div>
        </header>

        <BlogClient posts={posts} />
      </div>
    </MainLayout>
  );
} 