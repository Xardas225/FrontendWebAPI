<script setup>
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElText,
  ElTabs,
  ElTabPane,
  ElRow,
} from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const auth = useAuthStore();

const activeTab = ref("chef");

const checkRole = computed(() => (activeTab.value == "chef" ? 1 : 0));

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastName: "",
  kitchenName: "",
  role: checkRole,
});

const save = async () => {
  try {
    const result = await auth.register({ ...form });

    if (result.success) {
      router.push({
        name: "login",
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
      <ElText class="mx-1" size="large">Регистрация</ElText>
    </ElRow>

    <!-- Chef's register  -->
    <ElTabs type="card" v-model="activeTab">
      <ElTabPane label="I`m a chef" name="chef">
        <ElFormItem label-position="top" label="Email">
          <ElInput v-model="form.email" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label-position="top" label="Password">
          <ElInput v-model="form.password" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label-position="top" label="Confirm Password">
          <ElInput
            v-model="form.confirmPassword"
            clearable
            :clear-icon="CloseBold"
          />
        </ElFormItem>
        <ElFormItem label-position="top" label="Name">
          <ElInput v-model="form.name" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label-position="top" label="Last Name">
          <ElInput v-model="form.lastName" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label-position="top" label="Kitchen`s name">
          <ElInput
            v-model="form.kitchenName"
            clearable
            :clear-icon="CloseBold"
          />
        </ElFormItem>
      </ElTabPane>

      <!-- User's register  -->
      <ElTabPane label="I`m a user" name="user">
        <ElFormItem label-position="top" label="Email">
          <ElInput v-model="form.email" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label-position="top" label="Password">
          <ElInput v-model="form.password" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label-position="top" label="Confirm Password">
          <ElInput
            v-model="form.confirmPassword"
            clearable
            :clear-icon="CloseBold"
          />
        </ElFormItem>
        <ElFormItem label-position="top" label="Name">
          <ElInput v-model="form.name" clearable :clear-icon="CloseBold" />
        </ElFormItem>
        <ElFormItem label-position="top" label="Last Name">
          <ElInput v-model="form.lastName" clearable :clear-icon="CloseBold" />
        </ElFormItem>
      </ElTabPane>
    </ElTabs>

    <ElButton type="success" plain @click="save"> Sing Up </ElButton>
  </ElForm>
</template>

<style scoped>
.row {
  margin: 20px;
}
</style>
