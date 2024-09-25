<script setup>
import { reactive, ref, watch } from 'vue'
import { useTodoStore } from '@/store/todos';

const todosStore = useTodoStore();

const props = defineProps({
  title: {
    type: String,
  },
  loadingEdit: {
    type: Boolean,
  }
})

const emit = defineEmits(['saveTodo', 'updateTodo'])

const formRefModal = ref();
const form = reactive({
  title: '',
  description: ''
});

const onFinish = () => {
    formRefModal.value.validateFields().then(values => {
      if ('id' in todosStore.todo) {
        let editForm = {
          id: todosStore.todo.id,
          ...values
        }
        emit('updateTodo', editForm) 
      } else {
          formRefModal.value.resetFields();
          let form = {
            title: values.title,
            description: values.description
          }
          emit('saveTodo', form)            
        }
    })
    .catch(er => {
      console.log(er);
    })
}

const resetFieldsForm = () => {
  if (!form.id) {
    formRefModal.value.resetFields();
  }
}
const onCancel = () => {
  todosStore.showModal()
  resetFieldsForm()
}

const cancelClickMask = () => {
  resetFieldsForm()
}

const afterCloseEditTodo = () => {
  if (!'id' in todosStore.todo) {
    todosStore.setTodo({});
  }
}

watch(() => todosStore.todo, (state) => {
  if ('id' in state) {
    form.id = state.id,
    form.completed = state.completed === 0 ? false : true,
    form.title = state.title,
    form.description = state.description
  } else {
    delete form.id
    delete form.completed
    form.title = ''
    form.description = ''
  }
}, { deep: true })

</script>

<template>
    <a-modal 
      v-model:open="todosStore.showModalForm"
      :title="`${props.title} To Do`"
      @ok="onFinish"
      @cancel="cancelClickMask"
      :afterClose="afterCloseEditTodo"
    >
      <template #footer>
        <a-button key="back" @click="onCancel">Cancelar</a-button>
        <a-button key="submit" type="primary" @click="onFinish">Salvar</a-button>
      </template>
      <a-spin :spinning="loadingEdit">
        <a-form ref="formRefModal" layout="vertical" :model="form" name="form_modal">
          <a-form-item label="Título" name="title" :rules="[{ required: true, message: 'Campo obrigatório'}]">
            <a-input v-model:value="form.title" placeholder="Digite o título" />
          </a-form-item>
          <a-form-item label="Descrição" name="description" :rules="[{ required: true, message: 'Campo obrigatório'}]">
            <a-textarea v-model:value="form.description" />
          </a-form-item>
          <a-form-item name="completed" v-if="form.id">
            <a-checkbox v-model:checked="form.completed">Concluído</a-checkbox>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
</template>