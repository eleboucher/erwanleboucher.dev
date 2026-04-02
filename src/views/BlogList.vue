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
            <span class="post-desc">{{ post.description }}</span>
          </RouterLink>
        </li>
      </ul>
      <p v-if="posts.length === 0" class="text-sm text-cream-500">No posts yet.</p>
    </main>
  </MainLayout>
</template>

<style scoped>
@reference "../app.css";

.post-list {
  @apply list-none p-0 m-0 flex flex-col;
}

.post-item {
  @apply border-b border-anthracite-800;
}

.post-item:first-child {
  @apply border-t;
}

.post-link {
  @apply block py-6 no-underline transition-colors duration-200;
}

.post-link:hover .post-title {
  @apply text-navy-300;
}

.post-date {
  @apply block text-xs text-navy-300 uppercase tracking-[0.15em] mb-2;
}

.post-title {
  @apply block text-base font-bold text-cream-100 mb-1 transition-colors;
}

.post-desc {
  @apply block text-sm text-cream-400 leading-relaxed;
}
</style>
