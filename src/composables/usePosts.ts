import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import yaml from 'highlight.js/lib/languages/yaml'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import golang from 'highlight.js/lib/languages/go'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import json from 'highlight.js/lib/languages/json'
import plaintext from 'highlight.js/lib/languages/plaintext'
import type { Post } from '@/types'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)
hljs.registerLanguage('go', golang)
hljs.registerLanguage('dockerfile', dockerfile)
hljs.registerLanguage('json', json)
hljs.registerLanguage('plaintext', plaintext)

marked.use(
  markedHighlight({
    emptyLangClass: 'hljs',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
)

const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  if (!raw.startsWith('---')) {
    return { meta: {}, body: raw }
  }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) {
    return { meta: {}, body: raw }
  }
  const block = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).trim()
  const meta: Record<string, string> = {}
  for (const line of block.split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim()
    meta[key] = value
  }
  return { meta, body }
}

function slugFromPath(path: string): string {
  return path.replace(/^.*\//, '').replace(/\.md$/, '')
}

function loadPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { meta, body } = parseFrontmatter(raw)
      return {
        slug: slugFromPath(path),
        title: meta.title ?? 'Untitled',
        date: meta.date ?? '',
        description: meta.description ?? '',
        content: body,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

const posts = loadPosts()

export function usePosts() {
  function getPost(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug)
  }

  function renderMarkdown(raw: string): string {
    return marked.parse(raw) as string
  }

  return { posts, getPost, renderMarkdown }
}
