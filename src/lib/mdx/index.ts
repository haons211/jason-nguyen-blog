import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: string;
};

export type UserInformation = {
  name: string;
  jobTitle: string;
  email: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  socials: { name: string; url: string }[];
};

export async function getAllPostSlugs() {
  const files = fs.readdirSync(path.join(contentDirectory, 'posts'));
  return files
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => ({
      params: {
        slug: filename.replace('.mdx', ''),
      },
    }));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(contentDirectory, 'posts', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  const meta: PostMeta = {
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    slug,
    publishedAt: data.publishedAt || data.date,
    updatedAt: data.updatedAt || data.date,
    readingTime: data.readingTime || calculateReadingTime(content),
  };
  
  return { meta, content };
}

export async function getAllPosts() {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async ({ params: { slug } }) => {
      const { meta } = await getPostBySlug(slug);
      return meta;
    })
  );
  
  // Sort by date (newest first)
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
} 

export function getUserInformation() : UserInformation {
  const filePath = path.join(process.cwd(), 'UserInformation.mdx');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  return data as UserInformation;
}

export function getUserSkills() : string[] {
  const userInfo = getUserInformation();
  return userInfo.skills;
}