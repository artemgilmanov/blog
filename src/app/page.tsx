import Link from 'next/link'
import { getAllPosts } from '../lib/posts';

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <section className="space-y-8">

        <div className="grid gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block space-y-2 p-4 -mx-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest font-mono">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-neutral-500 text-sm italic py-4">No posts yet. Stay tuned!</p>
          )}
        </div>
      </section>
    </div>
  );
}
