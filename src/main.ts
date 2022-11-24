import { createApp } from 'vue';
import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from './pages/MainPage.vue';
import App from './App.vue';

const app = createApp(App);
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

app.use(router).use(store).mount('#app');
