import type { TocItem } from '../lib/posts'

// Build-time table of contents derived from the post's headings (see
// extractHeadings in lib/posts). No client DOM scraping involved.
function TocLinks({ headings }: { headings: TocItem[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li
          key={heading.slug}
          style={{ paddingLeft: `${(heading.depth - 2) * 0.75}rem` }}
        >
          <a
            href={`#${heading.slug}`}
            className="block text-neutral-500 transition-colors hover:text-foreground dark:text-neutral-400"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

interface TableOfContentsProps {
  headings: TocItem[]
  // 'inline' = collapsible block shown above the content on narrow screens.
  // 'sidebar' = sticky sidebar shown alongside the content on wide screens.
  variant: 'inline' | 'sidebar'
}

export default function TableOfContents({ headings, variant }: TableOfContentsProps) {
  if (!headings.length) return null

  if (variant === 'inline') {
    return (
      <details className="mb-10 rounded-xl border border-neutral-200 p-5 xl:hidden dark:border-neutral-800">
        <summary className="cursor-pointer text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 marker:text-neutral-300 dark:marker:text-neutral-700">
          On this page
        </summary>
        <nav className="mt-4">
          <TocLinks headings={headings} />
        </nav>
      </details>
    )
  }

  return (
    <aside className="hidden xl:block">
      <nav className="sticky top-12">
        <p className="mb-4 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
          On this page
        </p>
        <TocLinks headings={headings} />
      </nav>
    </aside>
  )
}
