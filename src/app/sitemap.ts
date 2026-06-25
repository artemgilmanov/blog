import type { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/posts'
import { siteConfig } from '../lib/site'

// Rendered to out/sitemap.xml at build time under output: 'export'.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig
  const posts = getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${url}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${url}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${url}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${url}/imprint`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...postRoutes]
}
