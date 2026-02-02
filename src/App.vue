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

</style>
