# Jason Nguyen Blog

A high-performance personal blog built with Next.js, focusing on software engineering and professional growth content.

## Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **Performance-focused**: Optimized with static site generation for maximum speed and SEO
- **Content Management**: MDX-based content with frontmatter
- **Advanced SEO**: Metadata, structured data, sitemap, and robots.txt
- **Google Analytics**: Built-in GA4 tracking integration
- **Dark Mode**: System-aware theme with user override option
- **Search**: Client-side search with Fuse.js for Blog and Life posts
- **Comments**: Integration with Giscus (GitHub Discussions)
- **RSS Feed**: Auto-generated feed for content syndication
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Image Optimization**: Automatic image optimization with Next.js Image component
- **Multiple Sections**: Blog (tech), Life (personal stories), Products showcase

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- Git

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/jason-nguyen-blog.git
cd jason-nguyen-blog
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create environment variables (optional for local dev):
```bash
# Create .env.local file
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id" > .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Git Setup and Deployment

### Initial Git Setup

If you're starting from scratch:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create a repository on GitHub and link it
git remote add origin https://github.com/yourusername/jason-nguyen-blog.git
git push -u origin main
```

### Vercel Deployment

1. Create an account on [Vercel](https://vercel.com) if you don't have one
2. Import your GitHub repository
3. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave default)
   - Output Directory: (leave default)

4. For CI/CD with GitHub Actions, set up the following secrets in your GitHub repository:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

You can get these values from the Vercel dashboard or using the Vercel CLI:
```bash
vercel login
vercel link
```

## Project Structure

```
├── public/             # Static files
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   ├── blog/       # Blog pages
│   │   ├── about/      # About page
│   │   └── page.tsx    # Homepage
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   └── ...         # Other components
│   ├── content/        # MDX content
│   │   └── posts/      # Blog posts
│   └── lib/            # Utility functions
│       └── mdx/        # MDX processing
└── ...config files
```

## Content Management

Content is stored in MDX files in the `/src/content/posts` directory. Each post has frontmatter with the following fields:

```md
---
title: 'Post Title'
description: 'Brief description'
date: '2023-08-01'
tags: ['tag1', 'tag2']
---

Content here...
```

## License

MIT
