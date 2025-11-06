import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const companiesDirectory = path.join(process.cwd(), 'src/content/companies');

export type CompanyMeta = {
  company: string;
  role: string;
  location?: string;
  startDate: string; // YYYY-MM
  endDate?: string;  // YYYY-MM or undefined if current
  technologies?: string[];
  logo?: string;
  slug: string;
};

export async function getAllCompanySlugs() {
  const files = fs.readdirSync(companiesDirectory);
  return files
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => filename.replace('.mdx', ''));
}

export async function getCompanyBySlug(slug: string) {
  const filePath = path.join(companiesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const meta: CompanyMeta = {
    company: data.company || '',
    role: data.role || '',
    location: data.location || '',
    startDate: data.startDate || '',
    endDate: data.endDate,
    technologies: data.technologies || [],
    logo: data.logo,
    slug,
  };

  return { meta, content };
}

export async function getAllCompanies() {
  const slugs = await getAllCompanySlugs();
  const companies = await Promise.all(
    slugs.map(async (slug) => {
      const { meta } = await getCompanyBySlug(slug);
      return meta;
    })
  );

  return companies.sort((a, b) => {
    // Sort by startDate desc (newest first)
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}


