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
    <LifeClient posts={posts} />
  );
}

