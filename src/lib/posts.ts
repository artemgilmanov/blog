import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import GithubSlugger from 'github-slugger'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

const WORDS_PER_MINUTE = 200

export interface TocItem {
  depth: number
  text: string
  slug: string
}

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
  wordCount: number
  readingTime: number
  headings: TocItem[]
}

// Fenced code blocks are line-anchored (``` at the start of a line). Matching
// that way matters: an inline code span can legitimately contain ``` characters,
// and a non-anchored regex would mis-pair fences and swallow real content.
const FENCED_CODE = /^[ \t]*```[\s\S]*?^[ \t]*```[^\n]*$/gm

// Strip fenced code blocks and inline code so we don't pick up `#` comments
// or words inside code samples when counting words / extracting headings.
function stripCode(markdown: string): string {
  return markdown
    .replace(FENCED_CODE, '')
    .replace(/`[^`]*`/g, '')
}

function countWords(markdown: string): number {
  const text = stripCode(markdown)
    // remove markdown image/link syntax noise but keep visible words
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  const matches = text.match(/\b[\w'-]+\b/g)
  return matches ? matches.length : 0
}

// Build a table of contents from h2/h3/h4 headings. Slugs are produced with
// github-slugger so they match the ids that rehype-slug generates at build time.
function extractHeadings(markdown: string): TocItem[] {
  const slugger = new GithubSlugger()
  const withoutCode = markdown.replace(FENCED_CODE, '')
  const headings: TocItem[] = []
  const headingRegex = /^(#{2,4})\s+(.+?)\s*#*\s*$/gm
  let match: RegExpExecArray | null
  while ((match = headingRegex.exec(withoutCode)) !== null) {
    const depth = match[1].length
    // Strip inline markdown (emphasis, code, links) from the visible text.
    const text = match[2]
      .replace(/`([^`]*)`/g, '$1')
      .replace(/\*\*([^*]*)\*\*/g, '$1')
      .replace(/\*([^*]*)\*/g, '$1')
      .replace(/_([^_]*)_/g, '$1')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .trim()
    headings.push({ depth, text, slug: slugger.slug(text) })
  }
  return headings
}

function buildPost(slug: string, fileContents: string): Post {
  const { data, content } = matter(fileContents)
  const wordCount = countWords(content)

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    content,
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    headings: extractHeadings(content),
  }
}

export function getAllPosts(): Post[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      return buildPost(slug, fileContents)
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return buildPost(slug, fileContents)
}
