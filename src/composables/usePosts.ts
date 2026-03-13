import type { Post } from '@/types'
import postsMeta from 'virtual:posts-meta'

export const posts: Post[] = [...postsMeta].sort((a, b) => (a.date < b.date ? 1 : -1))

export function usePosts() {
  return {
    posts,
    getPost: (slug: string) => posts.find((p) => p.slug === slug),
  }
}
