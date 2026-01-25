<script setup>
import { ElAside, ElContainer, ElHeader, ElMain } from "element-plus";
</script>

<template>
  <div class="common-layout">
    <ElContainer>
      <ElHeader>
        <nav>
          <RouterLink to="/">Дом</RouterLink> |
          <RouterLink to="/profile">Профиль</RouterLink> |
          <RouterLink to="/users">Пользователи</RouterLink> |
          <RouterLink to="/signin">Авторизация</RouterLink> |
          <RouterLink to="/signup">Регистрация</RouterLink> |
        </nav>
      </ElHeader>
      <ElContainer>
        <ElAside width="200px"></ElAside>
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
