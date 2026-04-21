import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap'
import expressiveCode from 'astro-expressive-code'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://erwanleboucher.dev',

  integrations: [
    expressiveCode({
      themes: ['github-dark'],
      defaultProps: {
        overridesByLang: {
          'bash,sh,zsh': { wrap: false },
        },
      },
      frames: {
        showCopyToClipboardButton: true,
      },
      styleOverrides: {
        borderRadius: '0.375rem',
        borderColor: '#252834',
        codeFontFamily:
          "'Atkinson Hyperlegible Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
        codeFontSize: '0.875rem',
        codeLineHeight: '1.6',
        codeBackground: '#16181f',
        frames: {
          editorTabBarBackground: '#1c1e28',
          editorTabBarBorderColor: '#252834',
          editorTabBarBorderBottomColor: '#252834',
          editorActiveTabBackground: '#16181f',
          editorActiveTabForeground: '#d0d0d8',
          editorActiveTabIndicatorTopColor: '#3672a4',
          editorActiveTabIndicatorHeight: '2px',
          terminalBackground: '#16181f',
          terminalTitlebarBackground: '#1c1e28',
          terminalTitlebarBorderBottomColor: '#252834',
          terminalTitlebarForeground: '#d0d0d8',
          terminalTitlebarDotsForeground: '#b8b8c2',
          inlineButtonBackground: 'transparent',
          inlineButtonForeground: '#b8b8c2',
          inlineButtonBackgroundHoverOrFocusOpacity: '0.15',
          shadowColor: 'transparent',
        },
      },
    }),
    vue(),
    sitemap(),
  ],

  vite: {
    // @ts-expect-error — @tailwindcss/vite Plugin type is incompatible with Astro's bundled Vite PluginOption
    plugins: [tailwindcss()],
  },
})
