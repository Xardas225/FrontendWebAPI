<script setup>
import { ElForm, ElFormItem, ElButton, ElInput, ElText } from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
</script>

<template>
  <ElForm label-width="auto">
    <ElText class="mx-1" size="large">Авторизация</ElText>
    <ElFormItem label="Name">
      <ElInput clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Last name">
      <ElInput clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Phone">
      <ElInput clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElButton type="success" plain> Сохранить </ElButton>
  </ElForm>
</template>

<style scoped></style>
