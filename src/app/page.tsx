import Link from 'next/link'
import { getAllPosts } from '../lib/posts';

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 4)

  return (
    <div className="space-y-16">
      {/* Intro / hero */}
      <section className="space-y-6 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
          Hi, I&apos;m Artём Gilmanov
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
          a software engineer based in Cologne, Germany, working at the
          intersection of AI and production systems. This is where I write
          essays, technical deep dives, and tutorials — breaking down complex
          concepts into practical, honest insights.
        </p>
        <div className="flex gap-4 text-sm font-medium">
          <Link
            href="/blog"
            className="hover:text-foreground text-neutral-500 dark:text-neutral-400 transition-colors underline underline-offset-4"
          >
            Read the blog →
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground text-neutral-500 dark:text-neutral-400 transition-colors underline underline-offset-4"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      <section className="space-y-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
            Recent posts
          </h2>
          {posts.length > recentPosts.length && (
            <Link
              href="/blog"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          )}
        </div>

        <div className="grid gap-8">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
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
