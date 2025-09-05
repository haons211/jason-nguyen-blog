import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { PageProps } from "@/lib/types";

export default async function Home(props: PageProps) {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Software Engineering & Technical Insights
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Hi, I&apos;m Jason. I write about software development, web technologies, and professional growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Read the Blog
              </Link>
              <Link
                href="/about"
                className="rounded-md border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-medium shadow transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                About Me
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
              alt="Coding on a laptop"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
        {featuredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group"
              >
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-all group-hover:shadow-md">
                  <div className="p-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {post.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">No posts yet</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Check back soon for new content
            </p>
          </div>
        )}
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
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
