<template>
    <Layout>
        <a-button type="primary" @click="refresh">
            <RedoOutlined />
            刷新
        </a-button>
        <a-table
            :dataSource="dataSource"
            :columns="columns"
            :style="{ margin: '10px 0 0 0' }"
            :pagination="false"
            :loading="loading"
        >
            <template #bodyCell="{ column }">
                <template v-if="column.key === 'action'">
                    <span>
                        <a>handle</a>
                        <a-divider type="vertical" />
                    </span>
                </template>
            </template>
        </a-table>
    </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue'
import { getList } from '@/api/suggest'

export default {
    components: {
        Layout,
    },
    created() {
        this.feachData()
    },
    data() {
        return {
            loading: false,
            dataSource: [],
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    width: 80,
                    fixed: 'left',
                },
                {
                    title: '问题类别',
                    dataIndex: 'category',
                    width: 120,
                    fixed: 'left',
                    filters: [
                        { text: '环境卫生', value: '环境卫生' },
                        { text: '食品安全', value: '食品安全' },
                        { text: '服务质量', value: '服务质量' },
                        { text: '就餐秩序', value: '就餐秩序' },
                        { text: '菜品价格', value: '菜品价格' }
                    ],
                    onFilter: (value, record) => record.category.indexOf(value) === 0,
                },
                {
                    title: '位置',
                    dataIndex: 'location',
                    width: 120,
                },
                {
                    title: '详细内容',
                    dataIndex: 'details'
                },
                {
                    title: '提交者',
                    dataIndex: 'user',
                    width: 100,
                },
                {
                    title: '联系方式',
                    dataIndex: 'contract',
                    width: 130,
                },
                {
                    title: '日期',
                    dataIndex: 'date',
                    width: 120,
                },
                // {
                //     title: '操作',
                //     key: 'action',
               // },
            ]
        }
    },
    methods: {
          async feachData() {
              this.loading = true
              const response = await getList()
              try {
                  this.dataSource = response.data
              } catch (error) {
                  console.log('error is ' + error)
              } finally {
                  this.loading = false
              }
          },
          refresh() {
              this.feachData()
          },
    }
}
</script>
