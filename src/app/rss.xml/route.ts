import { getAllPosts } from '@/lib/mdx';

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = 'https://jasonnguyen.dev';
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Jason Nguyen - Blog</title>
  <link>${baseUrl}</link>
  <description>Personal blog focused on software engineering, web development, and professional growth.</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
  ${posts
    .map((post) => {
      return `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${post.description}]]></description>
  </item>`;
    })
    .join('')}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
    },
  });
} 