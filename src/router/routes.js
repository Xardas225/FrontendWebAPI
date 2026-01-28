const routes = [{
        path: '/',
        name: 'home',
        component: () => import('@/components/Home.vue'),
        meta: {
            title: 'Дом'
        }
    },
    {
        path: '/users/:id',
        name: 'user-detail',
        component: () => import('@/components/UserDetails.vue'),
        meta: {
            title: 'Пользователь'
        },
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/Login.vue'),
        meta: {
            title: 'Авторизация'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/components/Register.vue'),
        meta: {
            title: 'Регистрация'
        }
    },
    {
        path: '/users',
        component: () => import('@/components/Users.vue'),
        meta: {
            title: 'Пользователи'
        }
    },
]

export default routes