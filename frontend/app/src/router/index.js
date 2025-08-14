import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ServicesView from '../views/ServicesView.vue';
import ContactsView from '../views/ContactsView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/contacts', name: 'contacts', component: ContactsView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
