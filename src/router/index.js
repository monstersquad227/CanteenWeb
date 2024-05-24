import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'Home',
            icon: 'HomeOutlined',
            requiresAuth: true,
        }
    },
    {
        path: '/user',
        component: () => import('@/views/UserCenter.vue'),
        mata: {
            requiresAuth: true,
        }
    },
    {
        path: '/suggest',
        component: () => import('@/views/Suggest.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = 'CanteenWeb'
    const isLoggedIn = !!localStorage.getItem('user');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }, // 登录成功后重定向回原页面
            });
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;
