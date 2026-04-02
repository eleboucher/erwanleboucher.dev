<script setup lang="ts">
import { shallowRef, ref, computed, watch, defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePosts } from '@/composables/usePosts'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute()
const router = useRouter()
const { getPost } = usePosts()

const slug = computed(() => route.params.slug as string)
const post = computed(() => getPost(slug.value))

const contentComponent = shallowRef()
const componentCache = new Map<string, ReturnType<typeof defineAsyncComponent>>()
const copyAnnouncement = ref('')
const showScrollTop = ref(false)

function onScroll() {
  showScrollTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

watch(
  slug,
  (newSlug) => {
    if (post.value) {
      if (!componentCache.has(newSlug)) {
        componentCache.set(
          newSlug,
          defineAsyncComponent(() => import(`../posts/${newSlug}.md`)),
        )
      }
      contentComponent.value = componentCache.get(newSlug)
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
      copyAnnouncement.value = 'Code copied to clipboard'
      setTimeout(() => {
        button.classList.remove('copied')
        copyAnnouncement.value = ''
      }, 2000)
    })
  }
}
</script>

<template>
  <MainLayout v-if="post">
    <header class="post-header">
      <RouterLink to="/blog" class="back-link">&larr; Back</RouterLink>
      <span class="post-date">{{ post.date }}</span>
      <h1 class="post-title">{{ post.title }}</h1>
      <p class="post-desc">{{ post.description }}</p>
    </header>

    <div aria-live="polite" aria-atomic="true" class="sr-only!">{{ copyAnnouncement }}</div>
    <main>
      <article class="prose" @click="handleCopyClick">
        <Suspense>
          <component :is="contentComponent" />
          <template #fallback>
            <p class="text-sm text-cream-500">Loading...</p>
          </template>
        </Suspense>
      </article>
    </main>
    <Transition name="fade">
      <button
        v-if="showScrollTop"
        class="scroll-top"
        aria-label="Scroll to top"
        @click="scrollToTop"
      >
        &uarr;
      </button>
    </Transition>
  </MainLayout>
</template>

<style scoped>
@reference '../app.css';

.post-header {
  @apply flex flex-col gap-3 mb-16 pb-6 border-b border-anthracite-800;
}

.back-link {
  @apply text-sm text-cream-500 hover:text-cream-200 transition-colors;
}

.post-date {
  @apply text-xs text-navy-300 uppercase tracking-[0.15em] mt-2;
}

.post-title {
  @apply text-2xl font-bold text-cream-100 tracking-tight leading-tight;
}

.post-desc {
  @apply text-base text-cream-400 m-0 leading-relaxed;
}

.prose {
  @apply max-w-3xl;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3) {
  @apply font-bold text-cream-100 mt-14 mb-4;
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
  @apply text-base text-cream-200 leading-7 mb-6;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply text-base text-cream-200 pl-6 mb-6 leading-7;
}

.prose :deep(ul) { @apply list-disc; }
.prose :deep(ol) { @apply list-decimal; }

.prose :deep(li) {
  @apply mb-2 pl-1;
}

.prose :deep(li > ul),
.prose :deep(li > ol) {
  @apply mt-2 mb-0;
}

.prose :deep(a) {
  @apply text-navy-300 hover:text-navy-400 underline underline-offset-2 transition-colors;
}

.prose :deep(code):not(pre code) {
  @apply text-navy-300 bg-anthracite-850 px-1.5 py-0.5 text-sm;
}

.prose :deep(.code-block-wrapper) {
  @apply relative mb-8 overflow-hidden border border-anthracite-800 bg-anthracite-900;
}

.prose :deep(.code-header) {
  @apply flex items-center justify-between px-4 py-2;
  @apply bg-anthracite-850 border-b border-anthracite-800;
}

.prose :deep(.code-lang) {
  @apply text-sm font-medium text-cream-400 uppercase tracking-wide;
}

.prose :deep(.copy-btn) {
  @apply relative flex items-center justify-center;
  @apply p-4 cursor-pointer transition-all duration-150;
  @apply bg-transparent text-cream-300 hover:bg-anthracite-800 hover:text-cream-100;

  svg { @apply w-4 h-4 transition-all duration-200; }
  .copy-icon, .check-icon { @apply absolute; }
  .check-icon { @apply text-navy-400 opacity-0 scale-50; }
  .copy-icon { @apply opacity-100 scale-100; }

  &.copied .copy-icon { @apply opacity-0 scale-50; }
  &.copied .check-icon { @apply opacity-100 scale-100; }
}

.prose :deep(.code-block-wrapper code) {
  @apply block min-w-full;
  @apply m-0 p-5 overflow-x-auto text-sm leading-[1.6] antialiased;
  outline: none;
}

.prose :deep(.code-block-wrapper code:focus-visible) {
  @apply ring-2 ring-navy-400 ring-offset-2 ring-offset-anthracite-900;
}

.prose :deep(blockquote) {
  @apply border-l-2 border-navy-500/50 pl-5 text-cream-400 italic mb-6 py-1;
}

.prose :deep(hr) {
  @apply border-anthracite-800 my-10;
}

.scroll-top {
  @apply fixed bottom-8 right-8 w-10 h-10 rounded-md;
  @apply bg-anthracite-800 border border-anthracite-700 text-cream-300;
  @apply hover:bg-anthracite-700 hover:text-cream-100;
  @apply cursor-pointer transition-all duration-200;
  @apply flex items-center justify-center text-sm;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
