<script setup>
import {
  ElAside,
  ElContainer,
  ElMain,
} from "element-plus";
import { useAuthStore } from "./store/auth";
import { onMounted } from "vue";
import HeaderComponent from "./components/HeaderComponent.vue";

const authApi = useAuthStore();
  
onMounted(() => {
  authApi.initialize();
});
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
