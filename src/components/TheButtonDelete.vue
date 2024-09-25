<script setup>
import { DeleteTwoTone } from '@ant-design/icons-vue'

const props = defineProps(['id'])
const emit = defineEmits(['buttonDelete'])

const handleDelete = (id) => {
  emit('buttonDelete', id)
}
</script>

<template>
  <a-button type="text" size="small" @click="handleDelete(props.id)">
    <template #icon>
      <DeleteTwoTone two-tone-color="#ff4d4f" style="font-size: smaller;" />
    </template>
  </a-button>
</template>