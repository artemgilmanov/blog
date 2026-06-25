// Central place for site-wide constants used by feeds, sitemap, and metadata.
// Keep this in sync with the GitHub Pages deployment target.
export const siteConfig = {
  name: 'Artem Gilmanov',
  title: 'Artem Gilmanov | Personal Website & Blog',
  description:
    'Essays, technical deep dives, and tutorials on AI, software engineering, and building products.',
  // Production URL (GitHub Pages). No trailing slash.
  url: 'https://artemgilmanov.github.io',
  author: {
    name: 'Artem Gilmanov',
    email: 'artemapochta@gmail.com',
  },
  locale: 'en-US',
} as const
