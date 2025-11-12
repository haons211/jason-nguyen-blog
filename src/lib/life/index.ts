import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export type LifePostMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: string;
};

export async function getAllLifePostSlugs() {
  const lifeDir = path.join(contentDirectory, 'life');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(lifeDir)) {
    fs.mkdirSync(lifeDir, { recursive: true });
    return [];
  }
  
  const files = fs.readdirSync(lifeDir);
  return files
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => ({
      params: {
        slug: filename.replace('.mdx', ''),
      },
    }));
}

export async function getLifePostBySlug(slug: string) {
  const filePath = path.join(contentDirectory, 'life', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  const meta: LifePostMeta = {
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    thumbnail: data.thumbnail || '/thumbnails/life-default.jpg',
    slug,
    publishedAt: data.publishedAt || data.date,
    updatedAt: data.updatedAt || data.date,
    readingTime: data.readingTime || calculateReadingTime(content),
  };
  
  return { meta, content };
}

export async function getAllLifePosts() {
  const slugs = await getAllLifePostSlugs();
  
  if (slugs.length === 0) {
    return [];
  }
  
  const posts = await Promise.all(
    slugs.map(async ({ params: { slug } }) => {
      const { meta } = await getLifePostBySlug(slug);
      return meta;
    })
  );
  
  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Newest first
  });
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

