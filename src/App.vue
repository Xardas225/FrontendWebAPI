<script setup>
import {
  ElAside,
  ElAvatar,
  ElButton,
  ElCol,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElRow,
  ElText,
} from "element-plus";
import { useAuthStore } from "./store/auth";
import { computed } from "vue";
import router from "./router";

const auth = useAuthStore();
const isAuthenticated = computed(() => auth.isAuthenticated);

const logout = async () => {
  try {
    const result = await auth.logout();

    if (result.success) {
      router.push({
        name: "login",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <div>
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
              <RouterLink to="/users" class="router-link">
                <ElText class="mx-1" type="primary" size="large">
                  Повара
                </ElText>
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
          <RouterLink to="/profile">
            <ElAvatar :size="40" />
          </RouterLink>
          <ElButton class="m-2" type="danger" plain @click="logout">
            Выйти
          </ElButton>
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

    <ElContainer>
      <ElAside />

      <ElContainer>
        <ElMain>
          <RouterView />
        </ElMain>
      </ElContainer>

      <ElAside />
    </ElContainer>
  </div>
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
