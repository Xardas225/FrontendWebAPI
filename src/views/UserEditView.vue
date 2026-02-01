<script setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElText } from "element-plus";
</script>

<template>
  <ElForm label-width="auto">
    <ElText class="mx-1" size="large">Информация о пользователе</ElText>
    <ElFormItem label="Email">
      <ElInput v-model="form.email" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Name">
      <ElInput v-model="form.name" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Last name">
      <ElInput v-model="form.lastName" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Phone">
      <ElInput v-model="form.phone" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElButton type="success" plain @click="save"> Сохранить </ElButton>
  </ElForm>
</template>

<style scoped></style>
