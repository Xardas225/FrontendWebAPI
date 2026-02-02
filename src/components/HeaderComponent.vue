<script setup>
import {
  ElAvatar,
  ElButton,
  ElCol,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElHeader,
  ElMenu,
  ElMenuItem,
  ElRow,
  ElText,
} from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { computed, ref, onMounted } from "vue";

const router = useRouter();
const isAuthenticated = computed(() => authApi.isAuthenticated);
const authApi = useAuthStore();
const userData = computed(() => authApi.user);

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
              <ElText class="mx-1" type="primary" size="large"> Повара </ElText>
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
        <ElDropdown class="header-dropdown">
          <ElAvatar :size="40" :src="userData.avatarUrl" />

          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem @click="routeToProfile">
                <ElText class="mx-1" type="primary" size="large">
                  Профиль
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
</style>
