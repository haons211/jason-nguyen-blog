import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';

export async function GET() {
  // Generate the search index
  const posts = await getAllPosts();
  
  // Only include necessary data for search
  const searchIndex = posts.map(post => ({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    tags: post.tags || [],
  }));

  return NextResponse.json(searchIndex);
} 