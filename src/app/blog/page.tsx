import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about software development, web technologies, and professional growth.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights on software development
          </p>
        </header>

        <div className="space-y-16">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-100 dark:border-gray-800 pb-12 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group">
                  <div className="mb-2 text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {post.readingTime && <span> · {post.readingTime}</span>}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                No posts yet
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Check back soon for new content
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 