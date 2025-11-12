import MainLayout from "@/components/layout/MainLayout";
import { getAllLifePosts } from "@/lib/life";
import type { Metadata } from "next";
import { NextPageProps } from "@/lib/types";
import LifeClient from "./LifeClient";

export const metadata: Metadata = {
  title: 'Life',
  description: 'Personal stories, experiences, and reflections on life beyond technology.',
};

export default async function LifePage(props: NextPageProps) {
  const posts = await getAllLifePosts();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Life</h1>
          <p className="text-xl text-gray-600">
            Personal stories, experiences, and reflections on life
          </p>
          <div className="h-1 w-20 bg-purple-600 mx-auto mt-6"></div>
        </header>

        <LifeClient posts={posts} />
      </div>
    </MainLayout>
  );
}

