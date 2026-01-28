<script setup>
import { ElForm, ElFormItem, ElButton, ElInput, ElText } from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastName: "",
});

const save = async () => {
  try {
    const result = await auth.register({ ...form });

    if (result.success) {
      router.push({
        name: "login"
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <ElForm label-width="auto">
    <ElText class="mx-1" size="large">Регистрация</ElText>
    <ElFormItem label="Email">
      <ElInput v-model="form.email" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Password">
      <ElInput v-model="form.password" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Confirm Password">
      <ElInput
        v-model="form.confirmPassword"
        clearable
        :clear-icon="CloseBold"
      />
    </ElFormItem>
    <ElFormItem label="Name">
      <ElInput v-model="form.name" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label="Last Name">
      <ElInput v-model="form.lastName" clearable :clear-icon="CloseBold" />
    </ElFormItem>

    <ElButton type="success" plain @click="save"> Sing Up </ElButton>
  </ElForm>
</template>

<style scoped></style>
