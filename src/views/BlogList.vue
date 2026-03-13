<script setup lang="ts">
import { usePosts } from '@/composables/usePosts'
import MainLayout from '@/layouts/MainLayout.vue'

const { posts } = usePosts()
</script>

<template>
  <MainLayout>
    <main>
      <ul class="post-list">
        <li v-for="post in posts" :key="post.slug" class="post-item">
          <RouterLink :to="`/blog/${post.slug}`" class="post-link">
            <span class="post-date">{{ post.date }}</span>
            <span class="post-title">{{ post.title }}</span>
            <p class="post-description">{{ post.description }}</p>
          </RouterLink>
        </li>
      </ul>
      <p v-if="posts.length === 0" class="empty-state">No posts yet.</p>
    </main>
  </MainLayout>
</template>

<style scoped>
@reference "../app.css";

.section {
  @apply flex flex-col mb-12 border-b border-zinc-800 pb-6 gap-4;
}

.section h1 {
  @apply text-xl font-bold text-zinc-100 tracking-tight;
}

.post-list {
  @apply list-none p-0 m-0 flex flex-col gap-4;
}

.post-item {
  @apply border border-zinc-800 rounded;
}

.post-link {
  @apply block p-5 no-underline hover:bg-zinc-900/60 transition-all duration-300;
}

.post-date {
  @apply block text-sm font-medium text-zinc-400 uppercase tracking-widest mb-1;
}

.post-title {
  @apply block text-base font-bold text-zinc-100 mb-1;
}

.post-description {
  @apply text-sm text-zinc-400 m-0;
}

.empty-state {
  @apply text-sm text-zinc-400;
}
</style>
