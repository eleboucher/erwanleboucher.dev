/// <reference types="vite/client" />

declare module 'virtual:posts-meta' {
  const posts: { slug: string; title: string; date: string; description: string }[]
  export default posts
}
