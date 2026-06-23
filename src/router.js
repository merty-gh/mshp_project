import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import AddTransactionView from './views/AddTransactionView.vue';
import AnalyticsView from './views/AnalyticsView.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/add', name: 'add', component: AddTransactionView },
        { path: '/analytics', name: 'analytics', component: AnalyticsView }
    ]
});