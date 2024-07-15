import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Detail from '../views/detail.vue'
import List from '../views/list.vue'
import About from '../views/about.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        // component: () => import('../views/index.vue'),
        component: Index,
    },
    {
        path: '/articleList',
        // path: '/articleList/:type/:tag',
        // component: () => import('../views/list.vue'),
        component: List,
    },
    {
        path: '/detail/',
        // component: () => import('../views/detail.vue'),
        component: Detail,
    },
    {
        path: '/about',
        // component: () => import('../views/about.vue'),
        component: About,
    },

]
export default function createRouter() {

    return new Router({
        mode: 'history',
        routes,
    })
}
