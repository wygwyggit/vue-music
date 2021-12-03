import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/recommend',
        name: 'recommend',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend')
    }, {
        path: '/singer',
        name: 'singer',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/singer')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
