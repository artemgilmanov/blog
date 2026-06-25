'use client'

import { useRef, useState, type ComponentPropsWithoutRef } from 'react'

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & {
  'data-language'?: string
}

// Client wrapper around the highlighted <pre> produced by rehype-pretty-code.
// Adds a language label and an accessible copy-to-clipboard button while leaving
// the build-time highlighting (classes, data-attrs, CSS vars) untouched.
export default function CodeBlock(props: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const language: string | undefined = props['data-language']

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail (e.g. insecure context); fail silently.
    }
  }

  return (
    <div className="group relative">
      {language && language !== 'plaintext' && (
        <span className="code-lang-label absolute left-4 top-3 z-10 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          {language}
        </span>
      )}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        className="absolute right-3 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 bg-white/80 text-neutral-500 opacity-0 backdrop-blur transition-all hover:text-foreground focus:opacity-100 group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-900/80"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-2" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-2" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <pre ref={preRef} {...props} />
    </div>
  )
}
