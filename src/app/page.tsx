import Link from 'next/link'
import { getAllPosts } from '../lib/posts';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3) // Get latest 3 posts

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Artem Gilmanov
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
          Developer, writer, and minimalist enthusiast. I'm building high-performance 
          web applications and exploring the intersection of AI and human experience.
        </p>
        <div className="flex gap-4">
          <Link 
            href="https://github.com/artemgilmanov" 
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium border border-neutral-200 dark:border-neutral-700"
          >
            GitHub Profile
          </Link>
          <Link 
            href="https://artemgilmanov.github.io/blog" 
            className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-sm font-medium"
          >
            Read Blog
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Latest Posts</h2>
          <Link href="/blog" className="text-sm font-medium text-neutral-500 hover:text-foreground hover:underline transition-all underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700">
            View All
          </Link>
        </div>

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

      <section className="space-y-4 pt-12 border-t border-neutral-100 dark:border-neutral-900">
        <h2 className="text-xl font-semibold">Connect</h2>
        <p className="text-neutral-500 text-sm max-w-md leading-relaxed">
          I'm always open to interesting projects and collaborations. If you want to chat, feel free to reach out.
        </p>
        <p className="text-sm">
          <a href="mailto:hello@artemgilmanov.com" className="font-medium hover:underline underline-offset-4 text-foreground transition-all">
            hello@artemgilmanov.com
          </a>
        </p>
      </section>
    </div>
  );
}
