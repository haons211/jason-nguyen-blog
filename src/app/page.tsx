import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getUserInformation } from "@/lib/mdx";
import { NextPageProps } from "@/lib/types";
import TypewriterEffect from "@/components/TypewriterEffect";

export default async function Home(props: NextPageProps) {
  // We can ignore the params and searchParams in this page since we don't use them
  
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Creative Builder
            </h1>
            <p className="text-xl text-gray-600 mb-8 min-h-[4rem]">
              <TypewriterEffect 
                sentences={getUserInformation().introduction}
                speed={80}
                pauseBetweenSentences={2000}
              />
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800"
              >
                Read the Blog
              </Link>
              <Link
                href="/about"
                className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium shadow transition-colors hover:bg-gray-50"
              >
                About Me
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
            <Image
              src="/hero.jpg"
              alt="Hero image"
              fill
              className="object-contain bg-white"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-12 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
        {featuredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group h-full"
              >
                <div className="h-full border border-gray-200 rounded-lg overflow-hidden transition-all group-hover:shadow-md flex flex-col">
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 flex-grow">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600">No posts yet</h3>
            <p className="mt-2 text-gray-500">
              Check back soon for new content
            </p>
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            View all posts
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
