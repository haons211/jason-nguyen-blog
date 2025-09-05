/**
 * Common types for Next.js pages
 */

// PageProps for Next.js 15.5.2+ which requires params to be a Promise
export interface PageProps<T = Record<string, string>> {
  params: Promise<T>;
  searchParams?: Record<string, string | string[]>;
}

// For pages that use slug - adding a comment to make it non-empty
export type SlugPageProps = PageProps<{ slug: string }>; 