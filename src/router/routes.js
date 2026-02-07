const routes = [{
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            title: 'Дом'
        }
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
        path: '/users/edit/:id',
        name: 'user-edit',
        component: () => import('@/views/UserEditView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Пользователь'
        },
        props: true
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
        path: '/dishes/create',
        name: 'dishes-create',
        component: () => import('@/views/DishCreateView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Создание блюда'
        }
    },
    {
        path: '/chefs',
        name: 'chefs',
        component: () => import('@/views/ChefListView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Шефы'
        }
    },
    {
        path: '/chefs/:id',
        name: 'chef-detail',
        component: () => import('@/views/ChefDetailsView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Шеф'
        },
        props: true
    },
    {
        path: '/chefs/edit/:id',
        name: 'chef-edit',
        component: () => import('@/views/ChefEditView.vue'),
        meta: {
            requiresAuth: true,
            title: 'Шеф'
        },
        props: true
    },
]

export default routes