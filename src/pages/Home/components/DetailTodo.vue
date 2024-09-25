<script setup>
import { useTodoStore } from '@/store/todos';

const showModal = defineModel();
const todosStore = useTodoStore();

const props = defineProps({
  loadingDetail: {
    type: Boolean,
    required: true
  }
})

const handleCancel = () => {
  showModal.value = !showModal.value
}

const afterCloseDetailTodo = () => {
  todosStore.setTodo({});
}
</script>

<template>
  <a-modal
    v-model:open="showModal"
    title="To Do"
    @cancel="handleCancel"
    :footer="null"
    :afterClose="afterCloseDetailTodo"
  >
    <a-spin :spinning="props.loadingDetail">
      <p>{{ todosStore.todo.title }}</p>
      <p>{{ todosStore.todo.description }}</p>
    </a-spin>
  </a-modal>
</template>