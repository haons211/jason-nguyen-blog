import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Jason Nguyen - Software Engineer & Technical Writer',
    template: '%s | Jason Nguyen'
  },
  description: 'Personal blog focused on software engineering, web development, and professional growth.',
  keywords: ['Software Engineering', 'Web Development', 'JavaScript', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Jason Nguyen' }],
  creator: 'Jason Nguyen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jasonnguyen.dev',
    siteName: 'Jason Nguyen',
    title: 'Jason Nguyen - Software Engineer & Technical Writer',
    description: 'Personal blog focused on software engineering, web development, and professional growth.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Nguyen - Software Engineer & Technical Writer',
    description: 'Personal blog focused on software engineering, web development, and professional growth.',
    creator: '@yourtwitterhandle',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-white text-gray-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
