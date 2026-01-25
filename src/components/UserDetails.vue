<script setup>
import { reactive, onMounted } from "vue";
import { ElForm, ElFormItem, ElButton, ElInput, ElText } from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";

const route = useRoute();
const auth = useAuthStore();
const userId = route?.params?.id;

const form = reactive({
  email: "",
  name: "",
  lastName: "",
  phone: "",
});

const save = async () => {
  try {
    await auth.updateUserData({ ...form });
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error.message);
  }
};

const load = async () => {
  try {
    const data = await auth.loadUserData(userId);
    Object.assign(form, data);
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error.message);
  }
};

onMounted(async () => {
  await load();
});
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
