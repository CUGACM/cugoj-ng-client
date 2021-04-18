import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/problemlist',
            redirect: '/problemlist/1'
        },
        {
            path: '/problemlist/:page',
            component: () => import('./views/ProblemList.vue')
        },
        {
            path: '/problem/:pid',
            component: () => import('./views/Problem.vue')
        },
        {
            path: '/submit/:pid',
            component: () => import('./views/Submit.vue')
        },
        {
            path: '/submit/:cid/:pid',
            component: () => import('./views/Submit.vue')
        },
    ]
})

