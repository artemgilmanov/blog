import type { TocItem } from '../lib/posts'

interface TocNode {
  item: TocItem
  children: TocItem[]
}

// Group sub-headings (h3/h4) under their preceding top-level (h2) heading.
function buildTree(headings: TocItem[]): TocNode[] {
  const tree: TocNode[] = []
  for (const heading of headings) {
    if (heading.depth <= 2 || tree.length === 0) {
      tree.push({ item: heading, children: [] })
    } else {
      tree[tree.length - 1].children.push(heading)
    }
  }
  return tree
}

const linkClass =
  'block rounded px-2 -mx-2 py-0.5 text-neutral-500 transition-colors hover:bg-yellow-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-yellow-400/20 dark:hover:text-foreground'

function ChildLinks({ items }: { items: TocItem[] }) {
  return (
    <ul className="mt-1 space-y-1 border-l border-neutral-200 pl-2 dark:border-neutral-800">
      {items.map((child) => (
        <li key={child.slug} style={{ paddingLeft: `${(child.depth - 3) * 0.75}rem` }}>
          <a href={`#${child.slug}`} className={linkClass}>
            {child.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

function TocTree({ tree }: { tree: TocNode[] }) {
  return (
    <ul className="space-y-1 text-sm">
      {tree.map((node) =>
        node.children.length === 0 ? (
          <li key={node.item.slug}>
            <a href={`#${node.item.slug}`} className={linkClass}>
              {node.item.text}
            </a>
          </li>
        ) : (
          <li key={node.item.slug}>
            <details className="toc-group">
              <summary className="toc-summary flex cursor-pointer list-none items-center gap-1.5">
                <svg
                  className="toc-chevron h-3 w-3 shrink-0 text-neutral-400 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href={`#${node.item.slug}`} className={`${linkClass} flex-1`}>
                  {node.item.text}
                </a>
              </summary>
              <div className="ml-[1.125rem]">
                <ChildLinks items={node.children} />
              </div>
            </details>
          </li>
        )
      )}
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

  const tree = buildTree(headings)

  if (variant === 'inline') {
    return (
      <details className="mb-10 rounded-xl border border-neutral-200 p-5 xl:hidden dark:border-neutral-800">
        <summary className="cursor-pointer text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 marker:text-neutral-300 dark:marker:text-neutral-700">
          On this page
        </summary>
        <nav className="mt-4">
          <TocTree tree={tree} />
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
        <TocTree tree={tree} />
      </nav>
    </aside>
  )
}
