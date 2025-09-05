/**
 * Common types for Next.js pages
 */

// PageProps for Next.js 15.5.2+ which requires params to be a Promise
export interface PageProps<T = Record<string, string>> {
  params: Promise<T>;
  searchParams?: Record<string, string | string[]>;
}

// For pages that use slug
export interface SlugPageProps extends PageProps<{ slug: string }> {} 