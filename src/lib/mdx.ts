import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { visit } from 'unist-util-visit'
import type { Element, ElementContent, Root } from 'hast'
import type { PluggableList } from 'unified'

// Recursively collect the raw text of a hast node (used to recover the original
// Mermaid source before any highlighter touches it).
function nodeText(node: ElementContent): string {
  if (node.type === 'text') return node.value
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(nodeText).join('')
  }
  return ''
}

// Route ```mermaid fenced blocks to the <Mermaid /> component instead of the
// syntax highlighter. Runs BEFORE rehype-pretty-code so the highlighter never
// sees (and never tokenizes) the diagram source.
function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'pre' || !parent || typeof index !== 'number') return
      const code = node.children.find(
        (child): child is Element => child.type === 'element' && child.tagName === 'code'
      )
      if (!code) return
      const className = code.properties?.className
      const classes = Array.isArray(className)
        ? className
        : className != null
          ? [className]
          : []
      if (!classes.includes('language-mermaid')) return

      const chart = nodeText(code).replace(/\n$/, '')
      parent.children[index] = {
        type: 'element',
        tagName: 'mermaid',
        properties: { chart },
        children: [],
      } as Element
    })
  }
}

const prettyCodeOptions: PrettyCodeOptions = {
  // Dual theme: rehype-pretty-code emits --shiki-light / --shiki-dark CSS
  // variables; globals.css selects which one applies based on the `.dark` class.
  theme: { light: 'github-light', dark: 'github-dark' },
  // We supply the code-block background ourselves in globals.css for a
  // consistent look with the rest of the minimalist UI.
  keepBackground: false,
  defaultLang: { block: 'plaintext', inline: 'plaintext' },
}

// Shared MDX pipeline. Everything here runs at build time (RSC / static export).
export const mdxOptions: {
  remarkPlugins: PluggableList
  rehypePlugins: PluggableList
} = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [
    rehypeMermaid,
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'append',
        properties: {
          className: ['heading-anchor'],
          ariaLabel: 'Link to this section',
        },
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['heading-anchor-icon'], ariaHidden: 'true' },
          children: [{ type: 'text', value: '#' }],
        },
      },
    ],
    [rehypePrettyCode, prettyCodeOptions],
    rehypeKatex,
  ],
}
