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
    <BlogClient posts={posts} />
  );
} 