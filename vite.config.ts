import { fileURLToPath, URL } from 'node:url'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import Shiki from '@shikijs/markdown-it'
import tailwindcss from '@tailwindcss/vite'

function parseFrontmatter(raw: string): Record<string, string> {
  if (!raw.startsWith('---')) return {}
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return {}
  const meta: Record<string, string> = {}
  raw
    .slice(3, end)
    .trim()
    .split('\n')
    .forEach((line) => {
      const colon = line.indexOf(':')
      if (colon === -1) return
      const key = line.slice(0, colon).trim()
      let value = line.slice(colon + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      meta[key] = value
    })
  return meta
}

function postsMetaPlugin(): Plugin {
  const virtualId = 'virtual:posts-meta'
  const resolvedId = '\0' + virtualId
  const postsDir = fileURLToPath(new URL('./src/posts', import.meta.url))

  return {
    name: 'posts-meta',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id !== resolvedId) return
      const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'))
      for (const file of files) this.addWatchFile(join(postsDir, file))
      const posts = files.map((file) => {
        const raw = readFileSync(join(postsDir, file), 'utf-8')
        const meta = parseFrontmatter(raw)
        return {
          slug: file.replace(/\.md$/, ''),
          title: meta.title ?? 'Untitled',
          date: meta.date ?? '',
          description: meta.description ?? '',
        }
      })
      return `export default ${JSON.stringify(posts)}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    postsMetaPlugin(),
    Markdown({
      async markdownItSetup(md) {
        md.use(
          await (Shiki as any)({
            theme: 'github-dark',
            langs: [
              'plaintext',
              'bash',
              'yaml',
              'typescript',
              'javascript',
              'json',
              'go',
              'python',
              'docker',
            ],
            transformers: [
              {
                postprocess(html: string) {
                  const lang = (this as any).options.lang || 'plaintext'
                  const svgAttrs =
                    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"'
                  const copyIcon = `<svg class="copy-icon" ${svgAttrs}><path d="M9 9h13v13H9V9z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                  const checkIcon = `<svg class="check-icon" ${svgAttrs}><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                  const header = `<div class="code-header"><span class="code-lang">${lang}</span><button class="copy-btn" aria-label="Copy code">${copyIcon}${checkIcon}</button></div>`
                  return `<div class="code-block-wrapper" data-lang="${lang}">${header}${html}</div>`
                },
              },
            ],
          }),
        )
      },
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
