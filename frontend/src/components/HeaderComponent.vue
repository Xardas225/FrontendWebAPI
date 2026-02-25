<script setup>
import {
  ElAvatar,
  ElBadge,
  ElButton,
  ElCol,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElHeader,
  ElIcon,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElRow,
  ElText,
} from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { computed, ref, onMounted } from "vue";
import { useCartStore } from "@/store/cart";

const router = useRouter();
const isAuthenticated = computed(() => authApi.isAuthenticated);
const authApi = useAuthStore();
const cartApi = useCartStore();
const amountCartItems = computed(() => cartApi.amount);
const userData = computed(() => authApi.user);
const searchQuery = ref("");

const routeToProfile = () => {
  const role = userData.value.role;
  const userId = userData.value.id;

  if (role == 0) {
    router.push({
      name: "user-detail",
      params: {
        id: userId,
      },
    });
  } else {
    router.push({
      name: "chef-detail",
      params: {
        id: userId,
      },
    });
  }
};

const routeToOrders = () => {
  router.push({
    name: "orders",
  });
};

const logout = async () => {
  try {
    const result = await authApi.logout();

    if (result.success) {
      router.push({
        name: "login",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(() => {
  authApi.initialize();
});
</script>

<template>
  <ElHeader class="app-header">
    <div class="header=left">
      <RouterLink to="/" class="router-link">
        <ElRow>
          <ElText class="mx-1" type="primary" size="large"> HomeChef </ElText>
        </ElRow>
      </RouterLink>
    </div>

    <template v-if="isAuthenticated">
      <div class="header-center">
        <ElMenu mode="horizontal" :ellipsis="false">
          <ElInput v-model="searchQuery" placeholder="Поиск..." clearable>
            <template #prefix>
              <ElIcon><Search /></ElIcon>
            </template>
          </ElInput>

          <ElMenuItem index="1">
            <RouterLink to="/users" class="router-link">
              <ElText class="mx-1" type="primary" size="large">
                Пользователи
              </ElText>
            </RouterLink>
          </ElMenuItem>

          <ElMenuItem index="2">
            <RouterLink to="/dishes" class="router-link">
              <ElText class="mx-1" type="primary" size="large">
                Выбор блюд
              </ElText>
            </RouterLink>
          </ElMenuItem>

          <ElMenuItem index="3">
            <RouterLink to="/chefs" class="router-link">
              <ElText class="mx-1" type="primary" size="large"> Шефы </ElText>
            </RouterLink>
          </ElMenuItem>
        </ElMenu>
      </div>
    </template>
    <template v-else>
      <div class="header-center">
        <ElMenu mode="horizontal" :ellipsis="false">
          <ElMenuItem>
            <RouterLink to="/users" class="router-link">
              <ElText class="mx-1" type="primary" size="large">
                Возможности
              </ElText>
            </RouterLink>
          </ElMenuItem>

          <ElMenuItem>
            <RouterLink to="/users" class="router-link">
              <ElText class="mx-1" type="primary" size="large">
                Решения
              </ElText>
            </RouterLink>
          </ElMenuItem>
        </ElMenu>
      </div>
    </template>

    <template v-if="isAuthenticated">
      <div class="header-right">
        <div class="header-icons">
          <!-- TODO: добавить счётчик -->
          <RouterLink to="/favorites" class="icon-link">
            <ElBadge class="badge">
              <ElIcon :size="20"><Star /></ElIcon>
            </ElBadge>
            <span class="icon-label">Избранное</span>
          </RouterLink>

          <!-- TODO: добавить счётчик -->
          <RouterLink to="/cart" class="icon-link">
            <ElBadge :value="amountCartItems" :max="99" class="badge">
              <ElIcon :size="20"><ShoppingCart /></ElIcon>
            </ElBadge>
            <span class="icon-label">Корзина</span>
          </RouterLink>
        </div>

        <ElDropdown class="header-dropdown">
          <ElAvatar :size="40" :src="userData.avatarUrl" />

          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem @click="routeToProfile">
                <ElText class="mx-1" type="primary" size="large">
                  Профиль
                </ElText>
              </ElDropdownItem>
              <ElDropdownItem @click="routeToOrders">
                <ElText class="mx-1" type="primary" size="large">
                  Заказы
                </ElText>
              </ElDropdownItem>
              <ElDropdownItem>
                <ElButton class="m-2" type="danger" plain @click="logout">
                  Выйти
                </ElButton>
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </div>
    </template>
    <template v-else>
      <ElCol class="header-right">
        <RouterLink to="/login" class="router-link">
          <ElButton type="primary" plain> Авторизация </ElButton>
        </RouterLink>
        <RouterLink to="/register" class="router-link">
          <ElButton type="primary" plain> Регистрация </ElButton>
        </RouterLink>
      </ElCol>
    </template>
  </ElHeader>
</template>

<style scoped>
.app-header {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  width: 100%;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-left,
.header-center,
.header-right {
  display: flex;
  align-items: center;
}

.header-left {
  justify-content: flex-start;
}

.header-center {
  justify-content: center;
}

.header-right {
  justify-content: flex-end;
  gap: 10px;
}

.header-dropdown {
  cursor: pointer;
}

.router-link {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.router-link:hover {
  opacity: 0.8;
}

.router-link-exact-active {
  font-weight: 600;
}

.header-icons {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-right: 20px;
}

.icon-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  transition: color 0.2s;
}

.icon-link:hover {
  color: #005bff; /* фирменный синий Ozon */
}

.badge {
  display: inline-block;
}

:deep(.el-badge__content) {
  background-color: #f50;
  color: white;
  border: none;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  min-width: 18px;
  padding: 0 4px;
  border-radius: 9px;
  font-weight: 500;
}

.icon-label {
  font-size: 12px;
  margin-top: 4px;
  white-space: nowrap;
}
</style>
