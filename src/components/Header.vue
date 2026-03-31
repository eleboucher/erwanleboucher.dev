<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<template>
  <header class="section">
    <div class="identity-block">
      <div>
        <h1 class="font-sans">Erwan Leboucher</h1>
        <p class="subtitle">Senior Software Engineer • Paris</p>
        <a
          href="mailto:erwanleboucher@gmail.com"
          class="email-link"
          aria-label="Send email to erwanleboucher@gmail.com"
        >
          erwanleboucher@gmail.com
        </a>
      </div>
      <div class="identity-right">
        <div
          class="status-badge text-navy-400 border-navy-400/50"
          role="status"
          aria-live="polite"
        >
          <span class="status-dot animate-pulse bg-navy-400"></span>
          All Systems Operational
        </div>
      </div>
    </div>
    <nav class="nav-links" aria-label="Main navigation">
      <div>
        <RouterLink
          to="/"
          class="nav-link"
          :class="{ 'nav-link-active': isActive('/') }"
          :aria-current="isActive('/') ? 'page' : undefined"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/blog"
          class="nav-link"
          :class="{ 'nav-link-active': isActive('/blog') }"
          :aria-current="isActive('/blog') ? 'page' : undefined"
        >
          Blog
        </RouterLink>
      </div>
      <div class="ml-auto mr-0">
        <a
          href="https://github.com/eleboucher"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/erwan-leboucher"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          LinkedIn
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@reference '../app.css';

.section {
  @apply flex flex-col mb-12 border-b border-surface-800 pb-6 gap-4;
}

.identity-block {
  @apply flex flex-col md:flex-row justify-between items-start;
}

.identity-right {
  @apply flex items-center gap-4 mt-4 md:mt-0;
}

.status-badge {
  @apply flex items-center gap-2 px-3 py-1.5 border rounded-md bg-surface-900/60 text-xs uppercase tracking-wider;
}

.status-dot {
  @apply w-1.5 h-1.5 rounded-full;
}

.social-links {
  @apply flex gap-4 text-sm;
}

.social-link {
  @apply text-zinc-400 hover:text-zinc-200 transition-colors;
}

.nav-links {
  @apply flex flex-wrap gap-6 text-sm;
}

.nav-link {
  @apply text-zinc-400 hover:text-zinc-200 transition-colors;
}

.nav-link-active {
  @apply text-zinc-100 font-bold border-b border-surface-700 pb-0.5 hover:border-navy-400 hover:text-navy-400;
}

.subtitle {
  @apply text-sm text-zinc-400 mt-1;
}

.email-link {
  @apply text-sm text-navy-400 hover:text-navy-400/80 mt-2 block transition-colors;
}
</style>
