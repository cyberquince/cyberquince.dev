import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ServicesView from '../views/ServicesView.vue';
import ContactsView from '../views/ContactsView.vue';
import WebDebView from '../views/WebDevView.vue';
import UXView from '../views/UXView.vue';
import SEOView from '../views/SEOView.vue';
import DataView from '../views/DataView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/web', name: 'web-development', component: WebDebView },
  { path: '/design', name: 'ux-design', component: UXView },
  { path: '/seo', name: 'seo', component: SEOView },
  { path: '/data', name: 'data-engineering', component: DataView },
  { path: '/contacts', name: 'contacts', component: ContactsView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
