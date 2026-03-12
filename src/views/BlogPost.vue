<script setup lang="ts">
import { shallowRef, computed, watch, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePosts } from '@/composables/usePosts'

const route = useRoute()
const router = useRouter()
const { getPost } = usePosts()

const slug = computed(() => route.params.slug as string)
const post = computed(() => getPost(slug.value))

// This will hold the pre-rendered component
const contentComponent = shallowRef()

watch(
  slug,
  (newSlug) => {
    if (post.value) {
      // Dynamically import the .md file as a Vue Component
      contentComponent.value = defineAsyncComponent(() => import(`../posts/${newSlug}.md`))
    } else {
      router.replace('/blog')
    }
  },
  { immediate: true },
)

function handleCopyClick(event: Event) {
  const target = event.target as HTMLElement
  const button = target.closest('.copy-btn')
  if (!button) return

  const wrapper = button.closest('.code-block-wrapper')
  const code = wrapper?.querySelector('code')?.textContent

  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      button.classList.add('copied')
      setTimeout(() => button.classList.remove('copied'), 2000)
    })
  }
}
</script>

<template>
  <div class="post-layout">
    <div class="content-wrapper" v-if="post">
      <header class="section">
        <RouterLink to="/blog" class="back-link">← Blog</RouterLink>
        <span class="post-date">{{ post.date }}</span>
        <h1>{{ post.title }}</h1>
        <p class="post-description">{{ post.description }}</p>
      </header>

      <main @click="handleCopyClick">
        <article class="prose">
          <component :is="contentComponent" />
        </article>
      </main>
    </div>
  </div>
</template>
<style scoped>
@reference '../app.css';

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

.prose.is-loading {
  @apply opacity-50;
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

/* Code block wrapper */
.prose :deep(.code-block-wrapper) {
  @apply relative mb-8 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl;
}

/* Code header with language and copy button */
.prose :deep(.code-header) {
  @apply flex items-center justify-between px-4 py-2;
  @apply bg-zinc-800/50 border-b border-zinc-700;
}

/* Language badge in header */
.prose :deep(.code-lang) {
  @apply text-xs font-medium text-zinc-300 uppercase tracking-wide;
}

/* Copy button */
.prose :deep(.copy-btn) {
  @apply relative flex items-center justify-center;
  @apply p-4 rounded-md cursor-pointer transition-all duration-150;
  @apply bg-transparent text-zinc-200 hover:bg-zinc-700 hover:text-white;
}

.prose :deep(.copy-btn svg) {
  @apply w-4 h-4 transition-all duration-200;
}

.prose :deep(.copy-btn .copy-icon),
.prose :deep(.copy-btn .check-icon) {
  @apply absolute;
}

.prose :deep(.copy-btn .check-icon) {
  @apply text-emerald-400 opacity-0 scale-50;
}

.prose :deep(.copy-btn .copy-icon) {
  @apply opacity-100 scale-100;
}

/* Active "Copied" State */
.prose :deep(.copy-btn.copied .copy-icon) {
  @apply opacity-0 scale-50;
}

.prose :deep(.copy-btn.copied .check-icon) {
  @apply opacity-100 scale-100;
}

/* Code block styling */
.prose :deep(.code-block-wrapper code) {
  @apply block min-w-full;
  @apply m-0 p-5 overflow-x-auto text-sm leading-[1.6] antialiased;
}

.prose :deep(blockquote) {
  @apply border-l-2 border-zinc-500 pl-5 text-zinc-400 italic mb-6 py-1;
}

.prose :deep(hr) {
  @apply border-zinc-700 my-10;
}
</style>
