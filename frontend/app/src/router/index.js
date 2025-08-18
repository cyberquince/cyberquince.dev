import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ServicesView from '../views/ServicesView.vue';
import ContactsView from '../views/ContactsView.vue';
import WebDebView from '../views/WebDevView.vue';
import UXView from '../views/UXView.vue';
import SEOView from '../views/SEOView.vue';
import DataView from '../views/DataView.vue';
import VueMeta from '../services/meta.service';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'CyberQuince' },
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: { title: 'Services | CyberQuince' },
  },
  {
    path: '/web',
    name: 'web-development',
    component: WebDebView,
    meta: { title: 'Web Development | CyberQuince' },
  },
  {
    path: '/design',
    name: 'ux-design',
    component: UXView,
    meta: { title: 'UX/UI Design | CyberQuince' },
  },
  {
    path: '/seo',
    name: 'seo',
    component: SEOView,
    meta: { title: 'SEO Optimization | CyberQuince' },
  },
  {
    path: '/data',
    name: 'data-engineering',
    component: DataView,
    meta: { title: 'Data-engineering | CyberQuince' },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView,
    meta: { title: 'Contacts | CyberQuince' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  VueMeta.setMeta({
    title: to.meta.title,
    meta: [
      { property: 'og:title', content: to.meta.title },
      { property: 'og:image', content: '/img/cyberquince.png' },
      { property: 'og:image:width', content: '256' },
      { property: 'og:image:heigth', content: '256' },
      { property: 'og:image:type', content: 'image/png' },
    ],
  });
});

export default router;
