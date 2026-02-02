<script setup>
import { ElTable, ElTableColumn, ElButton, ElSkeleton } from "element-plus";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";

const isLoading = ref(false);
const router = useRouter();
const userApi = useUserStore();

const userList = ref();

const loadAllUsers = async () => {
  try {
    isLoading.value = true;

    userList.value = [];
    const data = await userApi.loadAllUsers();

    if (data) {
      userList.value = data;
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    isLoading.value = false;
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
  <div>
    <template v-if="isLoading">
      <ElSkeleton :rows="5" animated />
    </template>
    <template v-else>
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
  </div>
</template>

<style scoped></style>
