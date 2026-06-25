import { getPostBySlug, getAllPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Mermaid from '../../../components/Mermaid'
import CodeBlock from '../../../components/CodeBlock'
import TableOfContents from '../../../components/TableOfContents'
import { mdxOptions } from '../../../lib/mdx'
import { siteConfig } from '../../../lib/site'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import 'katex/dist/katex.min.css'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} | Artem Gilmanov`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  }
}

const components = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 {...props} className="group text-xl font-bold tracking-tight text-foreground mt-12 mb-4 scroll-mt-24" />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 {...props} className="group text-lg font-semibold tracking-tight text-foreground mt-10 mb-3 scroll-mt-24" />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4 {...props} className="group text-base font-semibold tracking-tight text-foreground mt-8 mb-2 scroll-mt-24" />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p {...props} className="text-neutral-600 dark:text-neutral-400 leading-relaxed my-6" />
  ),
  Callout: (props: { children?: ReactNode }) => (
    <div className="p-6 my-8 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-400 italic">
      {props.children}
    </div>
  ),
  // rehype-pretty-code produces the highlighted <pre>; CodeBlock adds the copy
  // button + language label. Mermaid blocks are rewritten to <mermaid> upstream.
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <CodeBlock {...props} />,
  mermaid: (props: { chart?: string }) => <Mermaid chart={props.chart ?? ''} />,
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12">
      <article className="min-w-0 space-y-12">
        <header className="space-y-6">
          <div className="flex justify-between items-center text-xs text-neutral-500 font-mono tracking-widest uppercase mb-4">
            <Link href="/blog" className="hover:text-foreground hover:underline transition-all">
              ← Back
            </Link>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-medium text-foreground">{siteConfig.author.name}</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>{post.readingTime} min read</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-8">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <TableOfContents headings={post.headings} variant="inline" />

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-quoteless prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote
            source={post.content}
            components={components}
            options={{ mdxOptions }}
          />
        </div>

        <footer className="mt-24 pt-12 border-t border-neutral-100 dark:border-neutral-900">
          <p className="text-neutral-500 text-sm leading-relaxed mb-6">
            Thanks for reading. Written by {siteConfig.author.name}. If this was useful,
            feel free to share it or reach out — feedback is always welcome.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl hover:opacity-80 transition-all font-semibold"
          >
            Explore more articles →
          </Link>
        </footer>
      </article>

      <TableOfContents headings={post.headings} variant="sidebar" />
    </div>
  )
}
