<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useChefStore } from "@/store/chef";
import {
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRow,
  ElSelect,
  ElSkeleton,
  ElText,
  ElTimeSelect,
} from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { useNotification } from "@/composables/useNotification";
import { useAvatarManagement } from "@/composables/useAvatarManagement";
import { useAuthStore } from "@/store/auth";

const route = useRoute();
const chefApi = useChefStore();
const authApi = useAuthStore();
const chef = ref({});
const chefUserId = ref(route?.params?.id);
const isLoading = ref(false);
const userAvatarApi = useAvatarManagement();
const fileInput = ref();
const userId = authApi.user.id;


const chefExperienceOptions = [
  {
    value: 0,
    label: "До 3-х лет опыта",
  },
  {
    value: 1,
    label: "3 - 6 лет опыта",
  },
  {
    value: 2,
    label: "6 - 10 лет опыта",
  },
  {
    value: 3,
    label: "10+ лет опыта",
  },
];

const load = async () => {
  try {
    isLoading.value = true;
    chef.value = {};

    chef.value = await chefApi.getChefByUserId(chefUserId.value);
  } catch (error) {
    useNotification("Неудачно", "Ошибка при получении данных", "error");
    console.error("Ошибка при получении данных шефа:", error.message);
  } finally {
    isLoading.value = false;
  }
};

const save = async () => {
  try {
    isLoading.value = true;
    const requestData = {
      userId: chefUserId.value,
      email: chef.value.email,
      name: chef.value.name,
      lastName: chef.value.lastName,
      phone: chef.value.phone,
      kitchenName: chef.value.kitchenName,
      description: chef.value.description,
      startTime: chef.value.startTime,
      endTime: chef.value.endTime,
      chefExperience: chef.value.chefExperience,
    };

    chef.value = await chefApi.updateChefByUserId(requestData);

    await load();
    useNotification("Успех", "Данные успешно обновлены", "success");
  } catch (error) {
    useNotification("Неудачно", "Ошибка при обновлении данных", "error");
    console.error("Ошибка при обновлении данных шефа", error.message);
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
    await userAvatarApi.uploadUserAvatar(userId, file);
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
    <!-- Хлебные крошки -->
    <ElBreadcrumb separator="/" class="breadcrumb">
      <ElBreadcrumbItem :to="{ path: '/' }">Главная</ElBreadcrumbItem>
      <ElBreadcrumbItem :to="{ path: '/chefs' }">Повара</ElBreadcrumbItem>
      <ElBreadcrumbItem>{{ chef.name }}</ElBreadcrumbItem>
      <ElBreadcrumbItem>Редактирование</ElBreadcrumbItem>
    </ElBreadcrumb>

    <template v-if="isLoading">
      <ElSkeleton rows="5" animated />
    </template>

    <template v-else>
      <ElForm label-width="auto" class="edit-page">
        <ElRow justify="center">
          <ElText class="mx-1" size="large">Редактирование</ElText>
        </ElRow>

        <ElRow justify="center" class="row">
          <ElAvatar :size="100" :src="chef.avatarUrl">
            {{ chef.name }}
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

        <ElFormItem label-position="top" label="Email">
          <ElInput v-model="chef.email" clearable :clear-icon="CloseBold" />
        </ElFormItem>

        <ElFormItem label-position="top" label="Name">
          <ElInput v-model="chef.name" clearable :clear-icon="CloseBold" />
        </ElFormItem>

        <ElFormItem label-position="top" label="Last Name">
          <ElInput v-model="chef.lastName" clearable :clear-icon="CloseBold" />
        </ElFormItem>

        <ElFormItem label-position="top" label="Phone">
          <ElInput v-model="chef.phone" clearable :clear-icon="CloseBold" />
        </ElFormItem>

        <ElFormItem label-position="top" label="Kitchen Name">
          <ElInput
            v-model="chef.kitchenName"
            clearable
            :clear-icon="CloseBold"
          />
        </ElFormItem>

        <ElFormItem label-position="top" label="Description">
          <ElInput
            v-model="chef.description"
            clearable
            :clear-icon="CloseBold"
          />
        </ElFormItem>

        <ElFormItem label-position="top" label="Start/End Time">
          <div class="time-select-container">
            <ElTimeSelect
              v-model="chef.startTime"
              placeholder="Start time"
              :max-time="chef.endTime"
              start="08:00"
              step="00:30"
              end="21:00"
              :clear-icon="CloseBold"
            />
            <ElTimeSelect
              v-model="chef.endTime"
              placeholder="End time"
              :min-time="chef.startTime"
              start="08:00"
              step="00:30"
              end="21:00"
              :clear-icon="CloseBold"
            />
          </div>
        </ElFormItem>

        <ElFormItem label-position="top" label="Chef Experience">
          <ElSelect
            v-model="chef.chefExperience"
            clearable
            :clear-icon="CloseBold"
          >
            <ElOption
              v-for="item in chefExperienceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </ElFormItem>

        <ElButton type="success" plain @click="save"> Save </ElButton>
      </ElForm>
    </template>
  </div>
</template>

<style scoped>
.time-select-container {
  display: flex;
  gap: 10px;
}
.edit-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.file-input {
  display: none;
}
.row {
  margin: 10px;
}
</style>
