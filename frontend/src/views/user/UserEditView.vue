<script setup>
import {
  ElAvatar,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElSkeleton,
  ElText,
} from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { useRoute } from "vue-router";
import { useNotification } from "@/composables/useNotification";
import { useAvatarManagement } from "@/composables/useAvatarManagement";

const route = useRoute();
const userId = ref(route?.params?.id);
const authApi = useAuthStore();
const userApi = useUserStore();
const isLoading = ref(false);
const userData = computed(() => authApi.user);
const currentUserId = ref(userData.value.id);
const isEditable = computed(() => currentUserId.value == userId.value);
const userAvatarApi = useAvatarManagement();
const fileInput = ref();

const form = reactive({
  email: "",
  name: "",
  lastName: "",
  phone: "",
});

const save = async () => {
  try {
    isLoading.value = true;
    await userApi.updateUserData({ id: userId.value, ...form });
    await load();
    useNotification("Успех", "Данные успешно обновлены", "success");
  } catch (error) {
    useNotification("Неудачно", "Ошибка при обновлении данных", "error");
    console.error("Ошибка при обновлении данных пользователя", error.message);
  } finally {
    isLoading.value = false;
  }
};

const load = async () => {
  try {
    isLoading.value = true;
    const data = await userApi.loadUserData(userId.value);
    Object.assign(form, data);
  } catch (error) {
    useNotification("Неудачно", "Ошибка при получении данных", "error");
    console.error("Ошибка при получении данных пользователя", error.message);
  } finally {
    isLoading.value = false;
  }
};


const chooseFile = () => {
  fileInput.value.click();
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];

  if (!file) {
    // Добавить ошибку
    return;
  }

  try {
    await userAvatarApi.uploadUserAvatar(userId.value, file);
    await load();
    useNotification("Успешно", "Файл загружен", "success");
  } catch (error) {
    console.error(error)
    useNotification("Неудачно", "Ошибка при загрузке файла", "error");
  }
};

onMounted(async () => {
  await load();
});
</script>

<template>
  <div>
    <template v-if="isLoading">
      <ElSkeleton rows="5" animated />
    </template>

    <template v-else>
      <ElForm label-width="auto">
        <ElRow justify="center" class="row">
          <ElText class="mx-1" size="large">Информация о пользователе</ElText>
        </ElRow>

        <ElRow justify="center" class="row">
          <ElAvatar :size="100" :src="form.avatarUrl">
            {{ form.name }}
          </ElAvatar>
        </ElRow>
        <ElRow justify="center" class="row">
          <ElButton @click="chooseFile"> Изменить </ElButton>
          </ElRow>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="file-input"
          @change="handleFileSelect"
        ></input>

        <ElFormItem label="Email" label-position="top">
          <ElInput v-model="form.email" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label="Name" label-position="top">
          <ElInput v-model="form.name" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label="Last name" label-position="top">
          <ElInput v-model="form.lastName" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label="Phone" label-position="top">
          <ElInput v-model="form.phone" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElButton v-if="isEditable" type="success" plain @click="save">
          Сохранить
        </ElButton>
      </ElForm>
    </template>
  </div>
</template>

<style scoped>
.file-input {
  display: none;
}
.row {
  margin: 10px;
}
</style>
