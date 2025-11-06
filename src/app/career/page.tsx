import MainLayout from '@/components/layout/MainLayout';
import { getAllCompanySlugs, getCompanyBySlug } from '@/lib/companies';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import TimelineItem from '@/components/career/TimelineItem';

export const metadata: Metadata = {
  title: 'Career',
  description: 'Career history and company timeline',
};

export default async function CareerPage() {
  const slugs = await getAllCompanySlugs();
  // Load in parallel and sort by startDate desc
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const { meta, content } = await getCompanyBySlug(slug);
      return { meta, content };
    })
  );

  items.sort(
    (a, b) => new Date(b.meta.startDate).getTime() - new Date(a.meta.startDate).getTime()
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Career</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">A timeline of my work experience</p>
        </header>

        <ol className="relative">
          {items.map(({ meta, content }) => (
            <TimelineItem key={meta.slug} item={meta}>
              <MDXRemote source={content} />
            </TimelineItem>
          ))}
        </ol>
      </div>
    </MainLayout>
  );
}


