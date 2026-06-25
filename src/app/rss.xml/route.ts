import { getAllPosts } from '../../lib/posts'
import { siteConfig } from '../../lib/site'

// Static export: this GET handler is rendered to out/rss.xml at build time.
export const dynamic = 'force-static'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()
  const { url, name, description, author } = siteConfig

  const items = posts
    .map((post) => {
      const link = `${url}/blog/${post.slug}`
      const pubDate = post.date ? new Date(post.date).toUTCString() : ''
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(name)}</title>
    <link>${url}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <managingEditor>${author.email} (${escapeXml(author.name)})</managingEditor>
    <atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
