import type { Post } from '@/types'

const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string) {
  if (!raw.startsWith('---')) return { meta: {} }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { meta: {} }

  const block = raw.slice(3, end).trim()
  const meta: Record<string, string> = {}

  block.split('\n').forEach((line) => {
    const colon = line.indexOf(':')
    if (colon !== -1) {
      const key = line.slice(0, colon).trim()
      let value = line.slice(colon + 1).trim()

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      meta[key] = value
    }
  })

  return { meta }
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { meta } = parseFrontmatter(raw)
    return {
      slug: path.replace(/^.*\//, '').replace(/\.md$/, ''),
      title: meta.title ?? 'Untitled',
      date: meta.date ?? '',
      description: meta.description ?? '',
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function usePosts() {
  return {
    posts,
    getPost: (slug: string) => posts.find((p) => p.slug === slug),
  }
}
