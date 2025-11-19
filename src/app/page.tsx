import { getAllPosts, getUserInformation } from "@/lib/mdx";
import { NextPageProps } from "@/lib/types";
import HomeClient from "./HomeClient";

export default async function Home(props: NextPageProps) {
  // We can ignore the params and searchParams in this page since we don't use them
  
  const posts = await getAllPosts();
  // Fetch up to 9 posts (3 pages * 3 posts per page)
  const featuredPosts = posts.slice(0, 9);
  const userInfo = getUserInformation();

  return (
    <HomeClient userInfo={userInfo} featuredPosts={featuredPosts} />
  );
}
