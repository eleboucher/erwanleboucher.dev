<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePosts } from '@/composables/usePosts'
import 'highlight.js/styles/a11y-dark.css'

const route = useRoute()
const router = useRouter()
const { getPost, renderMarkdown } = usePosts()

const slug = computed(() => route.params.slug as string)
const post = computed(() => getPost(slug.value))
const html = computed(() => (post.value ? renderMarkdown(post.value.content) : ''))

if (!post.value) {
  router.replace('/blog')
}
</script>

<template>
  <div class="post-layout">
    <div class="content-wrapper">
      <header class="section">
        <RouterLink to="/blog" class="back-link">← Blog</RouterLink>
        <div v-if="post">
          <span class="post-date">{{ post.date }}</span>
          <h1>{{ post.title }}</h1>
          <p class="post-description">{{ post.description }}</p>
        </div>
      </header>
      <main>
        <article v-if="post" class="prose" v-html="html" />
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "../app.css";

.post-layout {
  @apply min-h-screen flex items-start justify-center py-16 px-6 selection:bg-emerald-500/30;
}

.content-wrapper {
  @apply w-full max-w-4xl;
}

.section {
  @apply flex flex-col mb-12 border-b border-zinc-800 pb-6 gap-4;
}

.back-link {
  @apply text-xs text-zinc-400 hover:text-zinc-200 transition-colors;
}

.post-date {
  @apply block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1;
}

.section h1 {
  @apply text-2xl font-bold text-zinc-100 tracking-tight mt-1 mb-2;
}

.post-description {
  @apply text-base text-zinc-400 m-0 leading-relaxed;
}

.prose {
  @apply max-w-3xl;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3) {
  @apply font-bold text-zinc-100 mt-12 mb-4;
}

.prose :deep(h1) {
  @apply text-2xl;
}
.prose :deep(h2) {
  @apply text-xl;
}
.prose :deep(h3) {
  @apply text-lg;
}

.prose :deep(p) {
  @apply text-base text-zinc-200 leading-7 mb-6;
}

.prose :deep(ul) {
  @apply list-disc text-base text-zinc-200 pl-6 mb-6 leading-7;
}

.prose :deep(ol) {
  @apply list-decimal text-base text-zinc-200 pl-6 mb-6 leading-7;
}

.prose :deep(li) {
  @apply mb-2 pl-1;
}

.prose :deep(li > ul),
.prose :deep(li > ol) {
  @apply mt-2 mb-0;
}

.prose :deep(a) {
  @apply text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors;
}

.prose :deep(code):not(pre code) {
  @apply text-emerald-400 bg-zinc-800/80 px-1.5 py-0.5 rounded text-sm;
}

.prose :deep(pre) {
  @apply border border-zinc-700 rounded overflow-x-auto mb-6 text-sm;
}

.prose :deep(blockquote) {
  @apply border-l-2 border-zinc-500 pl-5 text-zinc-400 italic mb-6 py-1;
}

.prose :deep(hr) {
  @apply border-zinc-700 my-10;
}
</style>
