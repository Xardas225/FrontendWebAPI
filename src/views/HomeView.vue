<script setup>
import { ElRow } from "element-plus";
import { useVisionService } from "@/store/visionService";

const visionServiceApi = useVisionService();

const handleFile = async (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  try {
    const data = await visionServiceApi.detectFile(file);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <ElRow> Распознавание продукта по фото </ElRow>

  <ElRow> <input type="file" ref="fileInput" @change="handleFile" /> </ElRow>
</template>

<style scoped></style>
