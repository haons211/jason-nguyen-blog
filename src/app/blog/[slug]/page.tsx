import MainLayout from "@/components/layout/MainLayout";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import Comments from "@/components/Comments";
import mdxComponents from "@/lib/mdx/mdx-components";
import TableOfContents from "@/components/TableOfContents";

// This generates all the static paths at build time
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts;
}

// Generate metadata for each blog post
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  // Extract slug safely
  const { slug } = params;
  const { meta } = await getPostBySlug(slug);
  
  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: 'Jason Nguyen' }],
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      tags: meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Extract slug safely
  const { slug } = params;
  const { meta, content } = await getPostBySlug(slug);
  
  // Format the date
  const formattedDate = new Date(meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 lg:gap-16">
          {/* Left Sidebar - Table of Contents */}
          <aside className="self-start">
            <TableOfContents />
          </aside>
          
          {/* Main Content */}
          <div className="lg:pr-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto max-w-none">
              {/* Post Header */}
              <header className="mb-10 not-prose">
                <Link 
                  href="/blog" 
                  className="text-sm text-blue-600 dark:text-blue-400 flex items-center mb-6 hover:underline"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to blog
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{meta.title}</h1>
                <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 mb-6">
                  <time dateTime={meta.date} className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formattedDate}
                  </time>
                  {meta.readingTime && (
                    <>
                      <span className="mx-2">·</span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {meta.readingTime}
                      </span>
                    </>
                  )}
                </div>
                {meta.tags && meta.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-sm px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 mt-8"></div>
              </header>
              
              {/* Post Content */}
              <div className="mdx-content">
                <MDXRemote source={content} components={mdxComponents} />
              </div>
            </article>
            
            {/* Comments Section */}
            <Comments />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 