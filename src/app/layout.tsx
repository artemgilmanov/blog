import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Artem Gilmanov | Personal Website & Blog",
  description: "Developer, writer, and minimalist. Blog about tech, career and more.",
  openGraph: {
    title: 'Artem Gilmanov',
    description: 'Minimalist personal site and blog',
    url: 'https://artemgilmanov.github.io', // Placeholder
    siteName: 'Artem Gilmanov',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        className={`antialiased bg-background text-foreground selection:bg-neutral-200 dark:selection:bg-neutral-800 flex flex-col min-h-screen max-w-2xl mx-auto px-6 py-12 md:px-8`}
      >
        <header className="mb-12 flex justify-between items-center">
          <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity">
            artem gilmanov
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          </nav>
        </header>

        <main className="flex-1 w-full">
          {children}
        </main>

        <footer className="mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Artem Gilmanov</p>
          <div className="flex gap-4">
            <a href="https://github.com/artemgilmanov" target="_blank" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://twitter.com/artemgilmanov" target="_blank" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
