<script setup>
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElText,
  ElRow,
  ElRadioGroup,
  ElRadio,
} from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  email: "",
  password: "",
  role: 0,
});

const login = async () => {
  try {
    const result = await auth.login({ ...form });
    if (result.success) {
      router.push({
        name: "home",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
  <ElForm label-width="auto">
    <ElRow justify="center" class="row">
      <ElText class="mx-1" size="large">Авторизация</ElText>
    </ElRow>

    <ElFormItem label-position="top" label="Email">
      <ElInput v-model="form.email" clearable :clear-icon="CloseBold" />
    </ElFormItem>
    <ElFormItem label-position="top" label="Password">
      <ElInput v-model="form.password" clearable :clear-icon="CloseBold" />
    </ElFormItem>

    <ElRadioGroup v-model="form.role" class="radio-group">
      <ElRadio :value="0"> I`m a user </ElRadio>
      <ElRadio :value="1"> I`m a chef </ElRadio>
    </ElRadioGroup>

    <ElButton type="success" plain @click="login"> Send </ElButton>
  </ElForm>
</template>
<style scoped>
.row {
  margin: 20px;
}
.radio-group {
  display: flex;
  margin-bottom: 20px;
}
</style>
