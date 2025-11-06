import MainLayout from "@/components/layout/MainLayout";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import Comments from "@/components/Comments";
import mdxComponents from "@/lib/mdx/mdx-components";
import TableOfContents from "@/components/TableOfContents";
import { SlugPageProps } from "@/lib/types";

// This generates all the static paths at build time
export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts;
}

// Generate metadata for each blog post
export async function generateMetadata(
  props: SlugPageProps
): Promise<Metadata> {
  // Await the params
  const params = await props.params;
  const slug = params.slug;
  
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

export default async function BlogPost(props: SlugPageProps) {
  // Await the params
  const params = await props.params;
  const slug = params.slug;
  
  const { meta, content } = await getPostBySlug(slug);
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null; // newer
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null; // older
  
  // Format the date
  const formattedDate = new Date(meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-8 lg:gap-16">
          {/* Left Sidebar - Table of Contents */}
          <aside className="self-start lg:-ml-16 xl:-ml-24 2xl:-ml-32">
            <TableOfContents />
          </aside>
          
          {/* Main Content */}
          <div className="lg:pr-8">
            <article className="prose lg:prose-xl mx-auto max-w-none">
              {/* Post Header */}
              <header className="mb-10 not-prose">
                <Link 
                  href="/blog" 
                  className="text-sm text-blue-600 flex items-center mb-6 hover:underline"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to blog
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{meta.title}</h1>
                <div className="flex flex-wrap items-center text-gray-600 mb-6">
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
                        className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-100"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="h-1 w-20 bg-blue-600 mt-8"></div>
              </header>
              
              {/* Post Content */}
              <div className="mdx-content">
                <MDXRemote source={content} components={mdxComponents} />
              </div>
            </article>
            
            {/* Comments Section */}
            <Comments />

            {/* Post Navigation */}
            <nav className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4" aria-label="Post navigation">
              <div className="flex-1">
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group inline-flex items-center rounded-md border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors"
                    aria-label={`Older post: ${nextPost.title}`}
                  >
                    <svg className="mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm">
                      <span className="block text-gray-500">Older</span>
                      <span className="block font-medium text-gray-900 line-clamp-1">{nextPost.title}</span>
                    </span>
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400">No older post</span>
                )}
              </div>

              <div className="flex-1 text-right">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group inline-flex items-center rounded-md border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors"
                    aria-label={`Newer post: ${prevPost.title}`}
                  >
                    <span className="text-right text-sm mr-2">
                      <span className="block text-gray-500">Newer</span>
                      <span className="block font-medium text-gray-900 line-clamp-1">{prevPost.title}</span>
                    </span>
                    <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <span className="text-sm text-gray-400">No newer post</span>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 