const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "Дом",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/public/LoginView.vue"),
    meta: {
      guestOnly: true,
      title: "Авторизация",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/public/RegisterView.vue"),
    meta: {
      guestOnly: true,
      title: "Регистрация",
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/user/UserListView.vue"),
    meta: {
      requiresAuth: true,
      title: "Пользователи",
    },
  },
  {
    path: "/users/:id",
    name: "user-detail",
    component: () => import("@/views/user/UserDetailsView.vue"),
    meta: {
      requiresAuth: true,
      title: "Пользователь",
    },
    props: true,
  },
  {
    path: "/users/edit/:id",
    name: "user-edit",
    component: () => import("@/views/user/UserEditView.vue"),
    meta: {
      requiresAuth: true,
      title: "Пользователь",
    },
    props: true,
  },
  {
    path: "/dishes",
    name: "dishes",
    component: () => import("@/views/dish/DishListView.vue"),
    meta: {
      requiresAuth: true,
      title: "Блюда",
    },
  },
  {
    path: "/dishes/create",
    name: "dishes-create",
    component: () => import("@/views/dish/DishCreateView.vue"),
    meta: {
      requiresAuth: true,
      title: "Создание блюда",
    },
  },
  {
    path: "/dishes/:id",
    name: "dishes-detail",
    component: () => import("@/views/dish/DishDetailsView.vue"),
    meta: {
      requiresAuth: true,
      title: "Просмотр блюда",
    },
  },
  {
    path: "/chefs",
    name: "chefs",
    component: () => import("@/views/chef/ChefListView.vue"),
    meta: {
      requiresAuth: true,
      title: "Шефы",
    },
  },
  {
    path: "/chefs/:id",
    name: "chef-detail",
    component: () => import("@/views/chef/ChefDetailsView.vue"),
    meta: {
      requiresAuth: true,
      title: "Шеф",
    },
    props: true,
  },
  {
    path: "/chefs/edit/:id",
    name: "chef-edit",
    component: () => import("@/views/chef/ChefEditView.vue"),
    meta: {
      requiresAuth: true,
      title: "Шеф",
    },
    props: true,
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartView.vue"),
    meta: {
      requiresAuth: true,
      title: "Корзина",
    },
  },
  {
    path: "/order-checkout",
    name: "order-checkout",
    component: () => import("@/views/order/OrderCheckoutView.vue"),
    meta: {
      requiresAuth: true,
      title: "Оформление заказа",
    },
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/order/OrderListView.vue"),
    meta: {
      requiresAuth: true,
      title: "Мои заказы",
    },
  },
  {
    path: "/orders/:id",
    name: "order-details",
    component: () => import("@/views/order/OrderDetailsView.vue"),
    meta: {
      requiresAuth: true,
      title: "Просмотр заказа",
    },
  },
];

export default routes;
