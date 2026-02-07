<script setup>
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
} from "element-plus";
import { reactive } from "vue";
import { useDishStore } from "@/store/dish";
import { useAuthStore } from "@/store/auth";

const dishApi = useDishStore();
const authApi = useAuthStore();

const userId = authApi.user?.id;
const isChef = authApi.isChef;

const dishForm = reactive({
  name: "",
  description: "",
  category: "",
  kitchen: "",
  price: 0,
  currency: 0,
});

const submitForm = async () => {
  try {
    await dishApi.createNewDish({ ...dishForm, userId });
  } catch (error) {
    console.log(error);
  }
};

const categories = [
  {
    label: "Soup",
    value: "Soup",
  },
];

const kitchens = [
  {
    label: "Russian",
    value: "Russian",
  },
];
</script>

<template>
  <div v-if="isChef" class="add-dish-container">
    <div class="form-wrapper">
      <h2 class="form-title">Добавить новое блюдо</h2>

      <ElForm
        ref="dishFormRef"
        :model="dishForm"
        label-position="top"
        class="dish-form"
      >
        <ElFormItem label="Название блюда" prop="name" class="form-item">
          <ElInput
            v-model="dishForm.name"
            placeholder="Введите название блюда"
            clearable
            size="large"
          >
            <template #prefix>
              <ElIcon>
                <Menu />
              </ElIcon>
            </template>
          </ElInput>
        </ElFormItem>

        <ElFormItem label="Описание" prop="description" class="form-item">
          <ElInput
            v-model="dishForm.description"
            type="textarea"
            :rows="4"
            placeholder="Опишите блюдо"
            maxlength="500"
            show-word-limit
            clearable
          />
        </ElFormItem>

        <ElFormItem label="Категория" prop="category" class="form-item">
          <ElSelect
            v-model="dishForm.category"
            placeholder="Выберите категорию"
            filterable
            clearable
            size="large"
            class="full-width"
          >
            <ElOption
              v-for="category in categories"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="Кухня" prop="kitchen" class="form-item">
          <ElSelect
            v-model="dishForm.kitchen"
            placeholder="Выберите кухню"
            filterable
            clearable
            size="large"
            class="full-width"
          >
            <ElOption
              v-for="kitchen in kitchens"
              :key="kitchen.value"
              :label="kitchen.label"
              :value="kitchen.value"
            />
          </ElSelect>
        </ElFormItem>

        <div class="form-row">
          <ElFormItem label="Цена" prop="price" class="form-item price-item">
            <ElInputNumber
              v-model="dishForm.price"
              :min="0"
              :max="1000000"
              :step="100"
              controls-position="right"
              placeholder="Цена"
              size="large"
              class="full-width"
            />
          </ElFormItem>

          <ElFormItem
            label="Валюта"
            prop="currency"
            class="form-item currency-item"
          >
            <ElSelect
              v-model="dishForm.currency"
              placeholder="Валюта"
              size="large"
              class="full-width"
            >
              <ElOption label="₽ RUB" value="RUB" />
              <ElOption label="$ USD" value="USD" />
              <ElOption label="€ EUR" value="EUR" />
              <ElOption label="₸ KZT" value="KZT" />
              <ElOption label="₴ UAH" value="UAH" />
            </ElSelect>
          </ElFormItem>
        </div>

        <div class="form-actions">
          <ElButton
            type="primary"
            size="large"
            @click="submitForm"
            class="submit-btn"
          >
            <template #icon>
              <ElIcon><Check /></ElIcon>
            </template>
            Добавить блюдо
          </ElButton>
        </div>
      </ElForm>
    </div>
  </div>

  <div v-else>Сорян, только для шефов</div>
</template>

<style scoped>
.add-dish-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 32px;
  box-sizing: border-box;
}

.form-wrapper {
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 600px;
}

.form-title {
  margin: 0 0 32px 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  text-align: center;
}

.dish-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-item {
  margin-bottom: 0;
}

.form-item :deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  margin-bottom: 8px;
  padding: 0;
}

.form-item :deep(.el-input__wrapper),
.form-item :deep(.el-textarea__inner),
.form-item :deep(.el-select .el-input__wrapper) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-item :deep(.el-input__wrapper:hover),
.form-item :deep(.el-textarea__inner:hover),
.form-item :deep(.el-select .el-input__wrapper:hover) {
  border-color: #409eff;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.1);
}

.form-item :deep(.el-input__wrapper.is-focus),
.form-item :deep(.el-textarea__inner:focus),
.form-item :deep(.el-select .el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.price-item :deep(.el-input-number) {
  width: 100%;
}

.currency-item :deep(.el-select) {
  width: 100%;
}

.full-width {
  width: 100%;
}

.author-info {
  margin: 16px 0;
}

.author-alert {
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.author-details {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  flex-shrink: 0;
  border: 2px solid #409eff;
}

.author-text {
  flex: 1;
}

.author-name {
  font-weight: 600;
  color: #303133;
  font-size: 16px;
  margin-bottom: 4px;
}

.author-id {
  font-size: 14px;
  color: #909399;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #ebeef5;
}

.submit-btn {
  flex: 1;
  background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #66b1ff 0%, #409eff 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.reset-btn {
  flex: 1;
  border-radius: 8px;
  border-color: #dcdfe6;
  color: #606266;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  border-color: #c0c4cc;
  background-color: #f5f7fa;
  transform: translateY(-1px);
}

.preview-section {
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.preview-title {
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  text-align: center;
}

.preview-card {
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.preview-json {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #409eff;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

@media (max-width: 992px) {
  .add-dish-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px;
  }

  .form-wrapper,
  .preview-section {
    padding: 24px;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-title {
    font-size: 20px;
    margin-bottom: 24px;
  }

  .preview-title {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .add-dish-container {
    padding: 12px;
  }

  .form-wrapper,
  .preview-section {
    padding: 20px;
  }

  .author-details {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}
</style>
