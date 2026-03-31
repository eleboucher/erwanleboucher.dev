/// <reference types="vite/client" />

declare module '@fontsource-variable/atkinson-hyperlegible-mono'
declare module '@fontsource-variable/inter'

declare module 'virtual:posts-meta' {
  const posts: { slug: string; title: string; date: string; description: string }[]
  export default posts
}
