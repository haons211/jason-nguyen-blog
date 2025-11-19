import { Metadata } from "next";
import { NextPageProps } from "@/lib/types";
import { getUserInformation, getUserSkills } from "@/lib/mdx"; 
import { getAllCompanySlugs, getCompanyBySlug } from "@/lib/companies";
import { MDXRemote } from "next-mdx-remote/rsc";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Jason Nguyen - software engineer, technical writer, and digital creator.',
};

export default async function AboutPage(props: NextPageProps) {
  // Get User Information
  const userInfo = getUserInformation();
  const userSkills = getUserSkills();
  
  // Load career items
  const companySlugs = await getAllCompanySlugs();
  const careerItems = await Promise.all(
    companySlugs.map(async (slug) => {
      const { meta, content } = await getCompanyBySlug(slug);
      return { 
        meta, 
        content: <MDXRemote source={content} /> 
      };
    })
  );
  
  // Sort by date
  careerItems.sort((a, b) => new Date(b.meta.startDate).getTime() - new Date(a.meta.startDate).getTime());

  return (
    <AboutClient 
      userInfo={userInfo}
      userSkills={userSkills}
      careerItems={careerItems}
    />
  );
} 