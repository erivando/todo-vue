<script setup>
import { EyeTwoTone } from '@ant-design/icons-vue'

const props = defineProps(['id'])
const emit = defineEmits(['buttonEye'])

const handleOk = (id) => {
  emit('buttonEye', id)
}
</script>

<template>
  <a-button type="text" size="small" @click="handleOk(props.id)">
    <template #icon>
      <EyeTwoTone two-tone-color="#389e0d" style="font-size: smaller;"/>
    </template>
  </a-button>
</template>