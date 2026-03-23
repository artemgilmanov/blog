import { getPostBySlug, getAllPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

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
      url: `https://artemgilmanov.github.io/blog/${post.slug}`,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="space-y-12">
      <header className="space-y-6">
        <div className="flex justify-between items-center text-xs text-neutral-500 font-mono tracking-widest uppercase mb-4">
          <Link href="/blog" className="hover:text-foreground hover:underline transition-all">
            ← Back to Blog
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
      
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-quoteless prose-code:before:content-none prose-code:after:content-none prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800">
        <MDXRemote source={post.content} />
      </div>
      
      <footer className="mt-24 pt-12 border-t border-neutral-100 dark:border-neutral-900">
        <p className="text-neutral-500 text-sm leading-relaxed mb-6">
          Thank you for reading. If you enjoyed this post, feel free to share it or reach out on Twitter. 
          Feedback is always welcome!
        </p>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl hover:opacity-80 transition-all font-semibold"
        >
          Explore more articles
        </Link>
      </footer>
    </article>
  )
}
