<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 18:00:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 18:00:00
 * @FilePath: \LowCode\apps\builder\src\components\FlowEditer\Nodes\InputNode.vue
 * @Description: 输入节点组件
-->
<template>
    <div class="input-node" :class="{ 'node-selected': selected }">
        <Handle type="source" :position="Position.Right" class="node-handle" />

        <div class="node-header">
            <div class="node-icon">
                <Icon name="database" :size="16" />
            </div>
            <div class="node-title">{{ data.label || '输入节点' }}</div>
            <button @click="toggleConfig" class="config-btn">
                <Icon name="settings" :size="12" />
            </button>
        </div>

        <div class="node-content">
            <div class="node-type">{{ getTypeLabel(data.type) }}</div>
            <div v-if="data.value" class="node-value">{{ data.value }}</div>
        </div>

        <!-- 配置面板 -->
        <div v-if="showConfig" class="node-config">
            <div class="config-item">
                <label>数据源类型:</label>
                <select v-model="localData.type" @change="updateData">
                    <option value="data-source">数据源</option>
                    <option value="api">API接口</option>
                    <option value="database">数据库</option>
                    <option value="file">文件</option>
                </select>
            </div>

            <div class="config-item">
                <label>标签:</label>
                <input v-model="localData.label" @input="updateData" placeholder="输入节点名称" />
            </div>

            <div class="config-item" v-if="localData.type === 'api'">
                <label>API地址:</label>
                <input v-model="localData.apiUrl" @input="updateData" placeholder="https://api.example.com" />
            </div>

            <div class="config-item" v-if="localData.type === 'database'">
                <label>查询语句:</label>
                <textarea v-model="localData.query" @input="updateData" placeholder="SELECT * FROM table"></textarea>
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

const getTypeLabel = (type: string) => {
    const labels = {
        'data-source': '数据源',
        'api': 'API接口',
        'database': '数据库',
        'file': '文件'
    }
    return labels[type] || type
}
</script>

<style scoped>
.input-node {
    @apply bg-white border-2 border-blue-200 rounded-lg shadow-sm min-w-48 transition-all;
}

.input-node:hover {
    @apply shadow-md;
}

.node-selected {
    @apply border-blue-500 shadow-lg;
}

.node-header {
    @apply flex items-center justify-between p-3 bg-blue-50 rounded-t-lg;
}

.node-icon {
    @apply text-blue-600;
}

.node-title {
    @apply flex-1 mx-2 font-medium text-gray-800 text-sm;
}

.config-btn {
    @apply p-1 rounded hover:bg-blue-100 text-gray-500 hover:text-blue-600 transition-colors;
}

.node-content {
    @apply p-3;
}

.node-type {
    @apply text-xs text-blue-600 font-medium mb-1;
}

.node-value {
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
.config-item select,
.config-item textarea {
    @apply w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500;
}

.config-item textarea {
    @apply resize-none h-16;
}

.node-handle {
    @apply w-3 h-3 bg-blue-500 border-2 border-white;
}
</style>
