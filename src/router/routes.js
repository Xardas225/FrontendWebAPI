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
            requiresAuth: true,
            title: 'Пользователь'
        },
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/public/LoginView.vue'),
        meta: {
            guestOnly: true,
            title: 'Авторизация'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/public/RegisterView.vue'),
        meta: {
            guestOnly: true,
            title: 'Регистрация'
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/UserListView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Пользователи'
        }
    },
    {
        path: '/dishes',
        name: 'dishes',
        component: () => import('@/views/DishListView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Блюда'
        }
    },
    {
        path: '/chefs',
        name: 'chefs',
        component: () => import('@/views/ChefListView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Блюда'
        }
    },
]

export default routes