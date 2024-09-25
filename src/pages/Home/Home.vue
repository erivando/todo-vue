<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import api from '@/http/api'
import { PlusOutlined, EditOutlined, LogoutOutlined, EditTwoTone, DeleteTwoTone, EyeTwoTone, UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { useTodoStore } from '@/store/todos';
import NotCompleted from './components/NotCompleted.vue'
import IsCompleted from './components/IsCompleted.vue';
import DetailTodo from './components/DetailTodo.vue'
import FormTodo from './components/FormTodo.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheLayout from '@/components/TheLayout.vue'
import { message } from 'ant-design-vue';
import { Modal } from 'ant-design-vue'

const authStore = useAuthStore()
const todosStore = useTodoStore();

const router = useRouter();

const activeKey = ref('1');
const showModal = ref(false);
const todos = reactive({});
const loading = ref(false);
const loadingDetail = ref(false);
const todo = reactive({});
const loadingEdit = ref(false);
const title = ref('');

onMounted(async () => {
	await listTodos() 
})

const diminuiTexto = (value) => {
	return value.length >= 56 ? `${value.substr(0,56)} ...` : value
}

const handleOk = (id) => {
	todoDetail(id)
	showModal.value = !showModal.value
}

const listTodos = async () => {
	loading.value = true
	try {
		await todosStore.listTodos()
		todos.value = todosStore.todos
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false
	}
}

const todoDetail = async (id) => {
	loadingDetail.value = true
	try {
		await todosStore.todoDetail(id)
	} catch (error) {
		console.log(error);
	} finally {
		loadingDetail.value = false
	}
}

const showModalForm = (value) => {
  if ('id' in todosStore.todo) {
    todosStore.setTodo({})
  }
  
  title.value = value
	todosStore.showModal()	
}

const inseriTodo = async (values) => {
	try {
		const { data } = await todosStore.insereTodo(values)
		todosStore.todos.push(data.todo)
		todosStore.showModal()
		message.success('Cadastro realizado com sucesso!', 3)
	} catch (error) {
		message.error('Não foi possível realizar o cadastro.', 3)
	}
}

const todoId = async (id) => {
  loadingEdit.value = true
  try {
    await todosStore.todoDetail(id)
  } catch (error) {
    console.log(error);
  } finally {
    loadingEdit.value = false
  }
}

const editarTodo = (id) => {
  if ('id' in todosStore.todo) {
    todosStore.setTodo({})
  }
  
  todoId(id)
  showModalForm('Editar')
}

const updateTodo = async (todo) => {
	const { id } = todo
	try {
		const { data } = await todosStore.updateTodo(id, todo)
		todosStore.showModal()
		message.success('Cadastro atualizado com sucesso!', 3)
		let index = todosStore.todos.findIndex(item => item.id === id)
		todosStore.todos.splice(index, 1, data.todo)
	} catch (error) {
		console.log(error);
		message.error('Não foi possível atualizar o cadastro.', 3)
	}
}

const deletarTodo = async (id) => {
	try {
		await todosStore.removeTodo(id)
		let index = todosStore.todos.findIndex(item => item.id === id)
		todosStore.todos.splice(index, 1)
		message.success('Cadastro removido com sucesso!', 3)
	} catch (error) {
		console.log(error);
		message.error('Não foi possível remover cadastro.', 3)
	}
}

</script>

<template>
	<TheLayout>
		<FormTodo
      :title="title"
      @saveTodo="inseriTodo"
      @updateTodo="updateTodo"
      :loadingEdit="loadingEdit"
    />
		<DetailTodo v-model="showModal" :loadingDetail="loadingDetail" />
		<a-row class="content" justify="center">
			<a-col :lg="16" style="background-color: white; padding: 25px;">
        <a-typography-title :level="3" style="text-align: center;">
          Todos
        </a-typography-title>
        <a-flex justify="flex-end">
          <a-button
            type="primary"
            shape="circle"
            size="large"
            @click="showModalForm('Criar')"
          >
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
        </a-flex>
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1" tab="Abertas">
            <IsCompleted
              :loading="loading"
              @isCompletedOnOk="handleOk"
              @isCompletedOnEdit="editarTodo"
              @isCompletedOnRemove="deletarTodo"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Encerradas" force-render>
            <NotCompleted
              @onHandleOk="handleOk"
              @onHandleEdit="editarTodo"
              @onHandleRemove="deletarTodo"
            />
          </a-tab-pane>
        </a-tabs>
			</a-col>
		</a-row>
	</TheLayout>
</template>

<style scoped>
.content {
  min-height: 280px;
  margin-top: 45px;
}
</style>