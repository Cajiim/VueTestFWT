import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';

const routes = [
  {
    name: 'MainPage',
    path: '/',
    component: MainPage,
  },
];
const router = createRouter(
  {
    routes,
    history: createWebHistory(process.env.REACT_APP_API_BASE_ADDRESS),
  },
);

export default router;
