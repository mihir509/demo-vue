import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import FormPage from '../views/FormPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/form',
      name: 'FormPage',
      component: FormPage
    }
  ]
})

export default router
