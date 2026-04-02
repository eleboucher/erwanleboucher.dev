<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="layout">
    <div class="container">
      <Header />
      <slot />
    </div>
  </div>
</template>

<style scoped>
@reference '../app.css';

.layout {
  @apply min-h-screen flex items-start justify-center py-20 px-6;
}

.container {
  @apply w-full max-w-4xl;
}
</style>
