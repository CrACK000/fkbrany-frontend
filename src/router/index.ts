import { createRouter, createWebHistory } from 'vue-router'
import {inject} from "vue";
import {logout} from "@/plugins/logout";

let isAuthChecked = false;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name: 'home', component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/renovacie-bran', name: 'renovation', component: () => import('@/views/RenovationView.vue')
    },
    {
      path: '/referencia/:id', name: 'reference', component: () => import('@/views/ReferenceView.vue')
    },
    {
      path: '/nase-referencie', name: 'references', component: () => import('@/views/ReferencesView.vue')
    },
    {
      path: '/ziadost-o-nacenenie-brany', name: 'offer', component: () => import('@/views/SendOfferView.vue')
    },
    {
      path: '/kontakt', name: 'contact', component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/praskove-lakovanie', name: 'aalak', component: () => import('@/views/PaintingView.vue')
    },
    {
      path: '/auth/login', name: 'login', component: () => import('@/views/auth/Login.vue'), meta: { isAuth: false }
    },
    {
      path: '/auth/logout',
      name: 'logout',
      component: { template: '' },
      beforeEnter(to, from, next) {
        logout()
        next({ name: 'home' })
      }
    },
    {
      path: '/auth',
      component: () => import('@/views/layout/Auth.vue'),
      meta: { isAuth: true },
      children: [
        { path: '', redirect: { name: 'dashboard' } },
        { path: 'dashboard', name: 'dashboard', component: () => import('@/views/auth/Dashboard.vue') },
        { path: 'settings', name: 'settings', component: () => import('@/views/auth/Settings.vue') },
        {
          path: 'references',
          component: () => import('@/views/layout/ReferencesLayout.vue'),
          children: [
            { path: '', redirect: { name: 'references-all' } },
            { path: 'all', name: 'references-all', component: () => import('@/views/auth/ReferencesAuth.vue') },
            { path: 'create', name: 'references-create', component: () => import('@/views/auth/ReferencesCreateAuth.vue') },
            { path: 'edit/:id', name: 'references-edit', component: () => import('@/views/auth/ReferencesEditAuth.vue') }
          ]
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

router.beforeEach(async (to, from, next) => {

  const auth = inject<any>('auth');

  if (!isAuthChecked) {
    await auth.checkAuth()
    isAuthChecked = true
  }


  const isAuth = to.matched.some(record => record.meta.isAuth);
  const isUnAuth = to.matched.some(record => record.meta.isAuth === false);

  if (isAuth && !auth.loggedIn.value) {
    next({ name: 'login' });
  } else if (isUnAuth && auth.loggedIn.value) {
    next({ name: 'dashboard' });
  } else {
    next();
  }

})

export default router
