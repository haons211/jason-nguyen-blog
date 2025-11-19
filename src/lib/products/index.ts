import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const productsDirectory = path.join(process.cwd(), 'src/content/products');

export type ProductMeta = {
  name: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  buyUrl?: string;
  status: string;
  featured?: boolean;
  order?: number;
  slug: string;
};

export type ProductPost = {
  meta: ProductMeta;
  content: any; // Serialized MDX content
};

export async function getAllProductSlugs() {
  const files = fs.readdirSync(productsDirectory);
  return files
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => ({
      params: {
        slug: filename.replace('.mdx', ''),
      },
    }));
}

export async function getProductBySlug(slug: string): Promise<ProductPost> {
  const filePath = path.join(productsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  const meta: ProductMeta = {
    name: data.name || '',
    description: data.description || '',
    image: data.image || '/hero.jpg',
    technologies: data.technologies || [],
    liveUrl: data.liveUrl || '',
    githubUrl: data.githubUrl || '',
    buyUrl: data.buyUrl || '',
    status: data.status || 'Live',
    featured: data.featured || false,
    order: data.order || 999,
    slug,
  };

  // Serialize the MDX content for client-side rendering
  const serializedContent = await serialize(content);

  return { meta, content: serializedContent };
}

export async function getAllProducts(): Promise<ProductPost[]> {
  const slugs = await getAllProductSlugs();
  const products = await Promise.all(
    slugs.map(async ({ params: { slug } }) => {
      return await getProductBySlug(slug);
    })
  );

  // Sort by order field, then by name
  return products.sort((a, b) => {
    if (a.meta.order !== b.meta.order) {
      return (a.meta.order || 999) - (b.meta.order || 999);
    }
    return a.meta.name.localeCompare(b.meta.name);
  });
}

export async function getFeaturedProducts(): Promise<ProductPost[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter(product => product.meta.featured);
}

export async function getProductsCount(): Promise<number> {
  const products = await getAllProducts();
  return products.length;
}
