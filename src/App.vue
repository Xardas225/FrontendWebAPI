<script setup>
import {
  ElAside,
  ElButton,
  ElCol,
  ElContainer,
  ElHeader,
  ElMain,
  ElRow,
  ElText,
} from "element-plus";
import { useAuthStore } from "./store/auth";
import { computed } from "vue";

const auth = useAuthStore();
const userName = computed(() => auth.user?.name);
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
  <div class="common-layout">
    <ElContainer>
      <ElHeader>
        <ElRow>
          <template v-if="isAuthenticated">
            <ElCol :span="12">
              <ElText> User Name: {{ userName }} </ElText>
            </ElCol>
            <ElCol :span="12">
              <ElButton class="m-2" type="danger" plain @click="logout">
                Выйти
              </ElButton>
            </ElCol>
          </template>
          <template v-else>
            <ElCol :span="6">
              <RouterLink to="/login">
                <ElButton type="primary"> Авторизация </ElButton>
              </RouterLink>
              <RouterLink to="/register">
                <ElButton type="primary"> Регистрация </ElButton>
              </RouterLink>
            </ElCol>
          </template>
        </ElRow>
      </ElHeader>
      <ElContainer>
        <ElAside width="200px">
          <RouterLink to="/">
            <ElRow>
              <ElText
                v-if="isAuthenticated"
                class="mx-1"
                type="primary"
                size="large"
              >
                Дом
              </ElText>
            </ElRow>
          </RouterLink>
          <RouterLink to="/profile">
            <ElRow>
              <ElText
                v-if="isAuthenticated"
                class="mx-1"
                type="primary"
                size="large"
              >
                Профиль
              </ElText>
            </ElRow>
          </RouterLink>
          <RouterLink to="/users">
            <ElRow>
              <ElText
                v-if="isAuthenticated"
                class="mx-1"
                type="primary"
                size="large"
              >
                Пользователи
              </ElText>
            </ElRow>
          </RouterLink>
        </ElAside>
        <ElContainer>
          <ElMain>
            <RouterView />
          </ElMain>
        </ElContainer>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<style scoped></style>
