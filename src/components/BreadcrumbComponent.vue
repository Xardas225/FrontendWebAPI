<script setup>
import { ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
const props = defineProps({
  items: [],
});

console.log(props.items);
</script>

<template>
  <ElBreadcrumb separator="/" class="breadcrumb">
    <ElBreadcrumbItem
      v-for="(value, key) in items"
      :key="key"
      :to="{ path: value.path }"
    >
      {{ value.title }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 20px;
}
</style>
