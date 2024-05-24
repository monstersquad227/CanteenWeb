<template>
    <a-layout class="layout">
        <a-layout-content>
            <div class="container">

                <div style="text-align: center; margin-bottom: 20px;">
                    <h1>欢迎您提供宝贵的意见</h1>
                    <p>请填写下面的内容</p>
                </div>

                <a-form :model="formState" layout="vertical">
                    <a-form-item label="类型">
                        <a-select v-model:value="formState.category" placeholder="xxx">
                            <a-select-option value="环境卫生">环境卫生</a-select-option>
                            <a-select-option value="食品安全">食品安全</a-select-option>
                            <a-select-option value="服务质量">服务质量</a-select-option>
                            <a-select-option value="就餐秩序">就餐秩序</a-select-option>
                            <a-select-option value="菜品价格">菜品价格</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="日期">
                        <a-date-picker v-model:value="formState.date" format="YYYY-MM-DD" placeholder="请选择日期" :style="{ width: '100%' }"/>
                    </a-form-item>
                    <a-form-item label="地点">
                        <a-input v-model:value="formState.location" placeholder="请填写发生的地点"/>
                    </a-form-item>
                    <a-form-item label="详细信息">
                        <a-textarea v-model:value="formState.details" :auto-size="{ minRows: 3, maxRows: 6 }" placeholder="请描述详细信息"/>
                    </a-form-item>
                    <a-form-item label="称呼">
                        <a-input v-model:value="formState.user" placeholder="来将可留姓名"/>
                    </a-form-item>
                    <a-form-item label="联系方式">
                        <a-input v-model:value="formState.contract" placeholder="请正确填写方便后续反馈给您结果"/>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" :style="{ width: '100%' }" @click="subSuggest('top')">提交</a-button>
                    </a-form-item>
                </a-form>

            </div>
        </a-layout-content>
    </a-layout>
</template>

<script>
import { postSave } from '@/api/suggest'
import { notification } from 'ant-design-vue'
import dayjs from 'dayjs'

export default {
    data() {
        return {
            formState: {
                category: '',
                location: '',
                details: '',
                user: '',
                contract: '',
                date: '',
            },
        }
    },
    methods: {
        async subSuggest(placement) {
            const data = {
                category: this.formState.category,
                location: this.formState.location,
                details: this.formState.details,
                user: this.formState.user,
                contract: this.formState.contract,
                date: dayjs(this.formState.date).format('YYYY-MM-DD'),
            }
            const response = await postSave(data)
            try {
                notification.open({
                    message: response.message,
                    description: '我们会仔细审核您所提交的内容，并在3到5个工作日通过您所提交的联系方式给您反馈',
                    placement
                })
            } catch (error) {
                console.log('error is: ' + error)
            } finally {
                this.formState.category = ''
                this.formState.location = ''
                this.formState.details = ''
                this.formState.user = ''
                this.formState.contract = ''
                this.formState.date = ''
            }

        }
    }
}
</script>

<style scoped>
.layout {
    width: 100%;
    min-height: 100%;
    background-color: #f0f2f5;
    position: absolute;
    display: flex;
    background-size: 100% 100%;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
}

.container {
    width: 100%;
    padding: 20px;
    background-color: #f0f2f5;
}
</style>