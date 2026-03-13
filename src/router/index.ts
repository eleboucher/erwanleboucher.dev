import { createRouter, createWebHashHistory } from 'vue-router'
import { posts } from '@/composables/usePosts'

const BASE_TITLE = 'Erwan Leboucher'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: BASE_TITLE },
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/BlogList.vue'),
      meta: { title: `Blog — ${BASE_TITLE}` },
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('@/views/BlogPost.vue'),
    },
  ],
})

router.afterEach((to) => {
  if (to.name === 'blog-post') {
    const slug = to.params.slug as string
    const post = posts.find((p) => p.slug === slug)
    document.title = post ? `${post.title} — ${BASE_TITLE}` : BASE_TITLE
  } else {
    document.title = (to.meta.title as string) ?? BASE_TITLE
  }
})

export default router
