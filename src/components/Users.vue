<script setup>
import { ElTable, ElTableColumn, ElButton } from "element-plus";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const userList = ref();

const loadAllUsers = async () => {
  try {
    userList.value = [];
    const data = await auth.loadAllUsers();

    if (data) {
      userList.value = data;
    }
  } catch (error) {
    console.error(error.message);
  }
};

const checkUserDetails = (data) => {
  router.push({
    name: "user-detail",
    params: { id: data.id },
  });
};

onMounted(async () => {
  await loadAllUsers();
});
</script>

<template>
  <ElTable :data="userList">
    <ElTableColumn prop="id" label="Id" />
    <ElTableColumn prop="email" label="Email" />
    <ElTableColumn prop="name" label="Name" />
    <ElTableColumn prop="lastName" label="Last Name" />
    <ElTableColumn prop="phone" label="Phone" />
    <ElTableColumn fixed="right" label="Operations">
      <template #default="scope">
        <ElButton
          type="primary"
          size="small"
          @click="checkUserDetails(scope.row)"
        >
          Details
        </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<style scoped></style>
