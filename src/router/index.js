import { createRouter, createWebHistory } from 'vue-router'

import MainPage from "@/components/pages/MainPage.vue";
import FavoritesPage from "@/components/pages/FavoritesPage.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/favorites-page',
        name: 'FavoritesPage',
        component: FavoritesPage,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router