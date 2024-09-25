<script setup>
import { reactive, ref } from 'vue';
import api from '@/http/api'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter();

const loading = ref(false);
const erro = ref(false);
const form = reactive({
    email: '',
    password: ''
})

const onFinish = async (values) => {
    erro.value = false
    loading.value = true
    try {
        await authStore.login(values)
        router.push('/')
    } catch (error) {
        erro.value = true
        console.log(error);
    } finally {
        loading.value = false
    }
}

const handleFinishFailed = (erros) => {
    console.log(erros);
}
</script>

<template>
    <div class="container-login">
        <a-row id="row" justify="center" align="middle">
            <a-col :xs="{ span: 24 }" :sm="{ span: 16 }" :md="{ span: 12}" :lg="{ span: 8}" :xl="{ span: 6}">
                <a-card hoverable>
                    <template #cover>
                        <img alt="example" src="../../assets/login_4.svg" :style="{ width: '65%', margin: 'auto', padding: '25px 0' }" />
                    </template>
                    <a-alert v-if="erro" message="Usuário e/ou senha incorretos." type="error" show-icon style="margin-bottom: 13px;" />
                    <a-form layout="vertical" :model="form" name="basic" @finish="onFinish"  @finishFailed="handleFinishFailed">
                        <a-form-item label="Usuário" name="email" :rules="[{ required: true }]">
                            <a-input v-model:value="form.email" placeholder="Digite seu usuário" size="large" />
                        </a-form-item>
                        <a-form-item label="Senha" name="password" :rules="[{ required: true }]">
                            <a-input-password v-model:value="form.password" placeholder="Digite sua senha" size="large" />
                        </a-form-item>
                        <a-form-item>
                            <a-button size="large" block type="primary" html-type="submit" :loading="loading">Acessar</a-button>
                        </a-form-item>
                    </a-form>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped>
.container-login {
    min-height: 100vh;
    background: #ebe8e8;    
}
#row {
    min-height: 100vh;
}
</style>