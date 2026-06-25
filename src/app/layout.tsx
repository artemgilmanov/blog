import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';

import ThemeToggle from "../components/ThemeToggle";
import DynamicLogo from "../components/DynamicLogo";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Artem Gilmanov | Personal Website & Blog",
  description: "Developer, writer, and minimalist. Blog about tech, career and more.",
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: `${siteConfig.name} — RSS Feed` },
      ],
    },
  },
  openGraph: {
    title: 'Artem Gilmanov',
    description: 'Minimalist personal site and blog',
    url: siteConfig.url,
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          } catch (_) {}
        ` }} />
      </head>
      <body
        className={`antialiased bg-background text-foreground selection:bg-neutral-200 dark:selection:bg-neutral-800 flex flex-col min-h-screen max-w-6xl mx-auto px-6 py-12 md:px-8 transition-colors duration-300`}
      >
        <header className="mb-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1 font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity">
            <DynamicLogo />
            {/* <span>artёmgilmanov</span> */}
          </Link>
          <nav className="flex gap-4 items-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
            <Link href="/about" className="hover:text-foreground transition-colors">about</Link>
          </nav>
        </header>

        <main className="flex-1 w-full">
          {children}
        </main>

        <footer className="mt-24 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between text-xs text-neutral-500 gap-4 items-center">
          <p className="flex items-center gap-2">
            <span>Artem Gilmanov © {new Date().getFullYear()}</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Link href="/imprint" className="hover:text-foreground transition-colors">imprint</Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <ThemeToggle />
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/artem-gilmanov-8b896b131/"
              target="_blank"
              className="hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com/artemgilmanov"
              target="_blank"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
