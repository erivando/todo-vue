<script setup>
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter();

const logout = async () => {
	await authStore.logout();
	router.push('/login')
}
</script>

<template>
    <a-layout-header>
        <a-flex justify="space-between" align="center">
            <div style="color: white; font-weight: 700; font-size: 23px;">TODOS</div>
            <a-dropdown arrow>
                <a-button shape="circle" size="large">
                    <template #icon>
                        <UserOutlined />
                    </template>
                </a-button>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <a href="javascript:;">{{ `Olá, ${authStore.user?.name}`}}</a>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item>
                            <a href="javascript:;" @click="logout">
                                <LogoutOutlined />
                                Sair
                            </a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </a-flex>
    </a-layout-header>    
</template>