import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { visit } from 'unist-util-visit'

function rehypeCodeBlockWrapper() {
  const svgAttrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"'
  const copyIcon = `<svg class="copy-icon" ${svgAttrs}><path d="M9 9h13v13H9V9z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  const checkIcon = `<svg class="check-icon" ${svgAttrs}><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round" stroke-linejoin="round"/></svg>`

  return (tree: any) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== 'pre' || index === undefined || !parent) return

      const codeEl = node.children?.find((c: any) => c.tagName === 'code')
      if (!codeEl) return

      const lang = node.properties?.dataLanguage || 'plaintext'

      // Add tabindex to code element
      codeEl.properties = codeEl.properties || {}
      codeEl.properties.tabindex = '0'

      // Wrap in code-block-wrapper div with header
      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: { class: 'code-block-wrapper', 'data-lang': lang },
        children: [
          {
            type: 'raw',
            value: `<div class="code-header"><span class="code-lang">${lang}</span><button class="copy-btn" aria-label="Copy code">${copyIcon}${checkIcon}</button></div>`,
          },
          node,
        ],
      }

      parent.children[index] = wrapper
    })
  }
}

export default defineConfig({
  site: 'https://erwanleboucher.dev',
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
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
        'rust',
      ],
    },
    rehypePlugins: [rehypeCodeBlockWrapper],
  },
})
