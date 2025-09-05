/**
 * Common types for Next.js pages
 */

// Define a type that matches the Next.js 15.5.2 page props structure
export interface NextPageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[]>>;
}

// For pages that use slug
export interface SlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[]>>;
} 