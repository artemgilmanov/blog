import Link from 'next/link'
import { getAllPosts } from '../../lib/posts';

export const metadata = {
  title: 'Blog | Artem Gilmanov',
  description: 'Read the latest posts from Artem Gilmanov on technology, minimalism, and building products.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Writing</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Thoughts on software engineering, design, and personal growth.
        </p>
      </section>

      <div className="grid gap-12">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group block space-y-2"
            >
              <div className="flex justify-between items-baseline">
                <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h2>
                <span className="text-xs text-neutral-400 font-mono">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                {post.description}
              </p>
              <div className="flex gap-2 pt-1">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-neutral-500 italic">No posts published yet. Check back soon!</p>
        )}
      </div>
    </div>
  )
}
