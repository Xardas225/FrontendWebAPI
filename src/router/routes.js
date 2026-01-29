const routes = [{
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            title: 'Дом'
        }
    },
    {
        path: '/users/:id',
        name: 'user-detail',
        component: () => import('@/views/UserDetailsView.vue'),
        meta: {
            title: 'Пользователь'
        },
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/public/LoginView.vue'),
        meta: {
            title: 'Авторизация'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/public/RegisterView.vue'),
        meta: {
            title: 'Регистрация'
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/UserListView.vue'),
        meta: {
            title: 'Пользователи'
        }
    },
    {
        path: '/dishes',
        name: 'dishes',
        component: () => import('@/views/DishListView.vue'),
        meta: {
            title: 'Блюда'
        }
    },
]

export default routes