import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import Shiki from '@shikijs/markdown-it'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Markdown({
      async markdownItSetup(md) {
        md.use(
          await (Shiki as any)({
            theme: 'github-dark',
            transformers: [
              {
                pre(node: any) {
                  const lang = (this as any).options.lang || 'plaintext'
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
