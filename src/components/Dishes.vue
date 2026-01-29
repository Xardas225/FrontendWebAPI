<script setup>
import { ElCard } from "element-plus";
</script>

<template>
  <div>
    <ElCard>
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <template #footer>Footer content</template>
    </ElCard>
  </div>
</template>

<style scoped></style>
