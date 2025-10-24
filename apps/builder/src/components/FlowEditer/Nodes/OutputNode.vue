<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 18:00:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 18:00:00
 * @FilePath: \LowCode\apps\builder\src\components\FlowEditer\Nodes\OutputNode.vue
 * @Description: 输出节点组件
-->
<template>
    <div class="output-node" :class="{ 'node-selected': selected }">
        <Handle type="target" :position="Position.Left" class="node-handle" />

        <div class="node-header">
            <div class="node-icon">
                <Icon name="export" :size="16" />
            </div>
            <div class="node-title">{{ data.label || '输出节点' }}</div>
            <button @click="toggleConfig" class="config-btn">
                <Icon name="settings" :size="12" />
            </button>
        </div>

        <div class="node-content">
            <div class="node-type">{{ getDestinationLabel(data.destination) }}</div>
            <div v-if="data.format" class="node-format">格式: {{ data.format }}</div>
        </div>

        <!-- 配置面板 -->
        <div v-if="showConfig" class="node-config">
            <div class="config-item">
                <label>输出目标:</label>
                <select v-model="localData.destination" @change="updateData">
                    <option value="result">结果显示</option>
                    <option value="file">文件导出</option>
                    <option value="database">数据库</option>
                    <option value="api">API推送</option>
                    <option value="email">邮件发送</option>
                </select>
            </div>

            <div class="config-item">
                <label>标签:</label>
                <input v-model="localData.label" @input="updateData" placeholder="输出节点名称" />
            </div>

            <div class="config-item">
                <label>输出格式:</label>
                <select v-model="localData.format" @change="updateData">
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                    <option value="pdf">PDF</option>
                    <option value="xml">XML</option>
                </select>
            </div>

            <div class="config-item" v-if="localData.destination === 'file'">
                <label>文件路径:</label>
                <input v-model="localData.filePath" @input="updateData" placeholder="/path/to/output.json" />
            </div>

            <div class="config-item" v-if="localData.destination === 'api'">
                <label>API地址:</label>
                <input v-model="localData.apiUrl" @input="updateData" placeholder="https://api.example.com/webhook" />
            </div>

            <div class="config-item" v-if="localData.destination === 'email'">
                <label>收件人:</label>
                <input v-model="localData.emailTo" @input="updateData" placeholder="user@example.com" />
            </div>

            <div class="config-item" v-if="localData.destination === 'database'">
                <label>表名:</label>
                <input v-model="localData.tableName" @input="updateData" placeholder="output_table" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import Icon from '../Icon.vue'

const props = defineProps<{
    id: string
    data: any
    selected?: boolean
}>()

const emit = defineEmits<{
    update: [nodeId: string, data: any]
}>()

const showConfig = ref(false)
const localData = reactive({ ...props.data })

const toggleConfig = () => {
    showConfig.value = !showConfig.value
}

const updateData = () => {
    emit('update', props.id, localData)
}

const getDestinationLabel = (destination: string) => {
    const labels = {
        'result': '结果显示',
        'file': '文件导出',
        'database': '数据库',
        'api': 'API推送',
        'email': '邮件发送'
    }
    return labels[destination] || destination
}
</script>

<style scoped>
.output-node {
    @apply bg-white border-2 border-green-200 rounded-lg shadow-sm min-w-48 transition-all;
}

.output-node:hover {
    @apply shadow-md;
}

.node-selected {
    @apply border-green-500 shadow-lg;
}

.node-header {
    @apply flex items-center justify-between p-3 bg-green-50 rounded-t-lg;
}

.node-icon {
    @apply text-green-600;
}

.node-title {
    @apply flex-1 mx-2 font-medium text-gray-800 text-sm;
}

.config-btn {
    @apply p-1 rounded hover:bg-green-100 text-gray-500 hover:text-green-600 transition-colors;
}

.node-content {
    @apply p-3;
}

.node-type {
    @apply text-xs text-green-600 font-medium mb-1;
}

.node-format {
    @apply text-sm text-gray-600 truncate;
}

.node-config {
    @apply border-t border-gray-200 p-3 bg-gray-50 rounded-b-lg;
}

.config-item {
    @apply mb-3 last:mb-0;
}

.config-item label {
    @apply block text-xs font-medium text-gray-700 mb-1;
}

.config-item input,
.config-item select {
    @apply w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500;
}

.node-handle {
    @apply w-3 h-3 bg-green-500 border-2 border-white;
}
</style>
