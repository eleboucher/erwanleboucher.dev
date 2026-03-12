import { createMarkdownExit } from 'markdown-exit'
import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { Post } from '@/types'
import { fromHighlighter } from '@shikijs/markdown-exit/core'

const highlighterPromise: Promise<HighlighterCore> = createHighlighterCore({
  themes: [import('@shikijs/themes/github-dark')],
  langs: [
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/bash'),
    import('@shikijs/langs/python'),
    import('@shikijs/langs/yaml'),
  ],
  engine: createJavaScriptRegexEngine(),
})

const mdPromise = (async () => {
  const highlighter = await highlighterPromise
  const md = createMarkdownExit()

  md.use(
    fromHighlighter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      highlighter as any,
      {
        theme: 'github-dark',
        transformers: [
          {
            pre(node) {
              const lang = this.options.lang || 'plaintext'

              // Icon path data
              const copyPath =
                'M9 9h13v13H9V9z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'
              const checkPath = 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'

              // Return the new HAST tree
              return {
                type: 'element',
                tagName: 'div',
                properties: { class: 'code-block-wrapper', 'data-lang': lang },
                children: [
                  {
                    type: 'element',
                    tagName: 'div',
                    properties: { class: 'code-header' },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: { class: 'code-lang' },
                        children: [{ type: 'text', value: lang }],
                      },
                      {
                        type: 'element',
                        tagName: 'button',
                        properties: { class: 'copy-btn', 'aria-label': 'Copy code' },
                        children: [
                          {
                            type: 'element',
                            tagName: 'svg',
                            properties: {
                              class: 'copy-icon',
                              viewBox: '0 0 24 24',
                              fill: 'none',
                              stroke: 'currentColor',
                              'stroke-width': '1.5',
                            },
                            children: [
                              {
                                type: 'element',
                                tagName: 'path',
                                properties: {
                                  d: copyPath,
                                  'stroke-linecap': 'round',
                                  'stroke-linejoin': 'round',
                                },
                                children: [],
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'svg',
                            properties: {
                              class: 'check-icon',
                              viewBox: '0 0 24 24',
                              fill: 'none',
                              stroke: 'currentColor',
                              'stroke-width': '1.5',
                            },
                            children: [
                              {
                                type: 'element',
                                tagName: 'path',
                                properties: {
                                  d: checkPath,
                                  'stroke-linecap': 'round',
                                  'stroke-linejoin': 'round',
                                },
                                children: [],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  node,
                ],
              }
            },
          },
        ],
      },
    ),
  )
  return md
})()

const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string) {
  if (!raw.startsWith('---')) return { meta: {}, body: raw }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { meta: {}, body: raw }
  const block = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).trim()
  const meta: Record<string, string> = {}
  block.split('\n').forEach((line) => {
    const colon = line.indexOf(':')
    if (colon !== -1) meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim()
  })
  return { meta, body }
}

const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw)
    return {
      slug: path.replace(/^.*\//, '').replace(/\.md$/, ''),
      title: meta.title ?? 'Untitled',
      date: meta.date ?? '',
      description: meta.description ?? '',
      content: body,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function usePosts() {
  return {
    posts,
    getPost: (slug: string) => posts.find((p) => p.slug === slug),
    renderMarkdown: async (raw: string) => {
      const md = await mdPromise
      return await md.renderAsync(raw)
    },
  }
}
