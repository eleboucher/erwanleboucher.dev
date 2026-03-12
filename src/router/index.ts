import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogList from '@/views/BlogList.vue'
import BlogPost from '@/views/BlogPost.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogList,
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPost,
    },
  ],
})

export default router
