<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="main-layout">
    <div class="content-wrapper">
      <Header />
      <slot />
    </div>
  </div>
</template>

<style scoped>
@reference '../app.css';

.main-layout {
  @apply min-h-screen flex items-start justify-center py-16 px-6 selection:bg-emerald-500/30;
}

.content-wrapper {
  @apply w-full max-w-4xl;
}
</style>
