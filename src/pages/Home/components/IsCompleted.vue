<script setup>
import { useTodoStore } from '@/store/todos';
import { computed } from 'vue';
import { EditTwoTone, DeleteTwoTone, EyeTwoTone } from '@ant-design/icons-vue'
import TheButtonEye from '@/components/TheButtonEye.vue'
import TheButtonEdit from '@/components/TheButtonEdit.vue'
import TheButtonDelete from '@/components/TheButtonDelete.vue'

const props = defineProps({
    loading: Boolean,
    handleOk: Function
})

const emit = defineEmits(['isCompletedOnOk', 'isCompletedOnEdit' , 'isCompletedOnRemove'])

const todoStore = useTodoStore()

const todoCompleted = computed(() => {
    return todoStore.isCompleted
})

const diminuiTexto = (value) => {
	return value.length > 34 ? `${value.substr(0,34)} ...` : value
}

const isCompletedHandleOk = (id) => {
  emit('isCompletedOnOk', id)  
}

const isCompletedHandleEdit = (id) => {
  emit('isCompletedOnEdit', id)
}

const isCompletedHandleRemove = (id) => {
  emit('isCompletedOnRemove', id)
}
</script>

<template>
  <a-row :gutter="[{ md: 24, lg: 32 },{ md: 16, lg: 24 }]">
    <div style="padding: 25px; margin: auto;" v-if="props.loading">
      <a-spin :spinning="props.loading" />
    </div>
    <template v-else>
      <template v-if="todoCompleted.length > 0">
        <a-col :xs="24" :sm="24" :md="8" :lg="6" v-for="todo in todoCompleted" :key="todo.id">
          <a-card size="small">
            <template #extra>
              <a-space>
                <TheButtonEye :id="todo.id" @button-eye="isCompletedHandleOk" />
                <TheButtonEdit :id="todo.id" @button-edit="isCompletedHandleEdit" />
                <TheButtonDelete :id="todo.id" @button-delete="isCompletedHandleRemove" />
              </a-space>
            </template>
            <a-card-meta>
              <template #title>
                <span style="font-size: 14px;">{{ todo.title }}</span>
              </template>
              <template #description>
                {{ diminuiTexto(todo.description)}}
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </template>
      <a-empty v-else style="margin: auto;"></a-empty>
    </template>
  </a-row>
</template>