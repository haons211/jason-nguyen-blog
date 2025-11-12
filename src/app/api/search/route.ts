import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';
import { getAllLifePosts } from '@/lib/life';

export async function GET() {
  // Generate the search index
  const posts = await getAllPosts();
  const lifePosts = await getAllLifePosts();
  
  // Only include necessary data for search
  const blogSearchIndex = posts.map(post => ({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    tags: post.tags || [],
    type: 'blog' as const,
  }));
  
  const lifeSearchIndex = lifePosts.map(post => ({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    tags: post.tags || [],
    type: 'life' as const,
  }));

  return NextResponse.json([...blogSearchIndex, ...lifeSearchIndex]);
} 