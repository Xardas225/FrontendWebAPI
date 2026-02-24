<script setup>
import {
  ElAside,
  ElContainer,
  ElMain,
} from "element-plus";
import HeaderComponent from "./components/HeaderComponent.vue";

</script>

<template>
  <div>
    <HeaderComponent />

    <ElContainer >

      <ElContainer class="main-container">
        <ElMain >
          <RouterView />
        </ElMain>
      </ElContainer>

    </ElContainer>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

/* Для планшетов */
@media (min-width: 768px) {
  .main-container {
    max-width: 720px;
    padding: 0 24px;
  }
}

/* Для ноутбуков */
@media (min-width: 1024px) {
  .main-container {
    max-width: 960px;
    padding: 0 32px;
  }
}

/* Для десктопов */
@media (min-width: 1280px) {
  .main-container {
    max-width: 1200px;
    padding: 0;
  }
}
</style>
