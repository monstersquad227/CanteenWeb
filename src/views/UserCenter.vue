<template>
    <Layout>
        <a-row>
            <a-col span="8">

                <a-card hoverable>
                    <template #cover>
                        <img src="@/assets/bg.jpg" alt="template">
                    </template>
                    <a-card-meta description="欢迎回来！很高兴再次见到您 👏👏👏">
                        <template #title>
                            {{ userTitle }}
                        </template>
                        <template #avatar>
                            <a-avatar/>
                        </template>
                    </a-card-meta>
                </a-card>

                <a-card style="margin-top: 20px; text-align: center">
                    <a-card-meta>
                        <template #title>修改密码</template>
                    </a-card-meta>

                    <div style="margin-top: 20px">
                        <a-form :model="formState" layout="vertical">
                            <a-form-item label="原密码">
                                <a-input-password v-model:value="formState.currentPassword" placeholder="请输入原密码"/>
                            </a-form-item>
                            <a-form-item label="新密码">
                                <a-input-password v-model:value="formState.newPassword" placeholder="请输入新密码"/>
                            </a-form-item>
                            <a-form-item label="确认密码">
                                <a-input-password v-model:value="formState.confirmNewPassword" placeholder="请确认新密码"/>
                            </a-form-item>
                            <a-form-item>
                                <a-button type="primary" @click="subPassword">提交</a-button>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default ({
    components: {
        Layout
    },
    data() {
        return {
            userTitle: localStorage.getItem('user'),
            formState: {
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            },
        }
    },
    methods: {
        async subPassword() {
            const data = {
                username: localStorage.getItem('user'),
                currentPassword: this.formState.currentPassword,
                newPassword: this.formState.newPassword,
                confirmNewPassword: this.formState.confirmNewPassword,
            }
            console.log(data)
        }
    }
})
</script>

