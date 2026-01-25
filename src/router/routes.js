
const routes = [
    {
        path: '/',
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
        path: '/signin',
        component: () => import('@/components/SignIn.vue'),
        meta: {
            title: 'Авторизация'
        }
    },
    {
        path: '/signup',
        component: () => import('@/components/SignUp.vue'),
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