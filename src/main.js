import { createApp } from 'vue';
import { createWebHistory, createRouter } from "vue-router";
import Home from './components/Home.vue';
import Test from './components/Test.vue';
import App from './App.vue';
import './style.css';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');