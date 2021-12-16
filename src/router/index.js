import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    component: () => import(/* webpackChunkName: "Main" */'@/Main.vue'),
    children: [{
        path: '/',
        redirect: '/recommend'
    }, {
        path: '/recommend',
        name: 'recommend',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend')
    }, {
        path: '/singer',
        name: 'singer',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/singer'),
        children: [{
            path: ':id',
            name: 'singerDetail',
            component: () => import(/* webpackChunkName: "singerDetail" */ '../views/singer-detail')
        }]
    }, {
        path: '/rank',
        name: 'rank',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/rank')
    }, {
        path: '/search',
        name: 'search',
        component: () => import(/* webpackChunkName: "recommend" */ '../views/search')
    }]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
