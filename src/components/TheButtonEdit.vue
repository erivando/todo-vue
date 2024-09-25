<script setup>
import { EditTwoTone } from '@ant-design/icons-vue'

const props = defineProps(['id'])
const emit = defineEmits(['buttonEdit'])

const handleEdit = (id) => {
  emit('buttonEdit', id)
}
</script>

<template>
  <a-button type="text" size="small" @click="handleEdit(props.id)">
    <template #icon>
      <EditTwoTone two-tone-color="#1677ff" style="font-size: smaller;"/>
    </template>
  </a-button>
</template>