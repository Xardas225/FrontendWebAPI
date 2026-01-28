<script setup>
import { ElForm, ElFormItem, ElButton, ElInput, ElText } from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { useAuthStore } from "@/store/auth";

const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    const result = await auth.login({ ...form });
    if (result.success) {
      router.push({
        name: "home"
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <ElForm label-width="auto">
    <ElText class="mx-1" size="large">Авторизация</ElText>
    <ElFormItem label="Email">
      <ElInput v-model="form.email" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Password">
      <ElInput v-model="form.password" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElButton type="success" plain @click="login"> Send </ElButton>
  </ElForm>
</template>

<style scoped></style>
