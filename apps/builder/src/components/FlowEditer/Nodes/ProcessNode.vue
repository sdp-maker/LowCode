<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 18:00:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 18:00:00
 * @FilePath: \LowCode\apps\builder\src\components\FlowEditer\Nodes\ProcessNode.vue
 * @Description: 处理节点组件
-->
<template>
    <div class="process-node" :class="{ 'node-selected': selected }">
        <Handle type="target" :position="Position.Left" class="node-handle" />
        <Handle type="source" :position="Position.Right" class="node-handle" />

        <div class="node-header">
            <div class="node-icon">
                <Icon name="process" :size="16" />
            </div>
            <div class="node-title">{{ data.label || '处理节点' }}</div>
            <button @click="toggleConfig" class="config-btn">
                <Icon name="settings" :size="12" />
            </button>
        </div>

        <div class="node-content">
            <div class="node-type">{{ getOperationLabel(data.operation) }}</div>
            <div v-if="data.description" class="node-description">{{ data.description }}</div>
        </div>

        <!-- 配置面板 -->
        <div v-if="showConfig" class="node-config">
            <div class="config-item">
                <label>操作类型:</label>
                <select v-model="localData.operation" @change="updateData">
                    <option value="transform">数据转换</option>
                    <option value="filter">数据过滤</option>
                    <option value="sort">数据排序</option>
                    <option value="aggregate">数据聚合</option>
                    <option value="join">数据连接</option>
                    <option value="custom">自定义处理</option>
                </select>
            </div>

            <div class="config-item">
                <label>标签:</label>
                <input v-model="localData.label" @input="updateData" placeholder="处理节点名称" />
            </div>

            <div class="config-item">
                <label>描述:</label>
                <input v-model="localData.description" @input="updateData" placeholder="描述此处理步骤" />
            </div>

            <div class="config-item" v-if="localData.operation === 'filter'">
                <label>过滤条件:</label>
                <textarea v-model="localData.filterCondition" @input="updateData" placeholder="例如: age > 18"></textarea>
            </div>

            <div class="config-item" v-if="localData.operation === 'transform'">
                <label>转换规则:</label>
                <textarea v-model="localData.transformRule" @input="updateData" placeholder="定义数据转换规则"></textarea>
            </div>

            <div class="config-item" v-if="localData.operation === 'custom'">
                <label>自定义代码:</label>
                <textarea v-model="localData.customCode" @input="updateData" placeholder="输入自定义处理代码"
                    class="code-textarea"></textarea>
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

const getOperationLabel = (operation: string) => {
    const labels = {
        'transform': '数据转换',
        'filter': '数据过滤',
        'sort': '数据排序',
        'aggregate': '数据聚合',
        'join': '数据连接',
        'custom': '自定义处理'
    }
    return labels[operation] || operation
}
</script>

<style scoped>
.process-node {
    @apply bg-white border-2 border-orange-200 rounded-lg shadow-sm min-w-48 transition-all;
}

.process-node:hover {
    @apply shadow-md;
}

.node-selected {
    @apply border-orange-500 shadow-lg;
}

.node-header {
    @apply flex items-center justify-between p-3 bg-orange-50 rounded-t-lg;
}

.node-icon {
    @apply text-orange-600;
}

.node-title {
    @apply flex-1 mx-2 font-medium text-gray-800 text-sm;
}

.config-btn {
    @apply p-1 rounded hover:bg-orange-100 text-gray-500 hover:text-orange-600 transition-colors;
}

.node-content {
    @apply p-3;
}

.node-type {
    @apply text-xs text-orange-600 font-medium mb-1;
}

.node-description {
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
    @apply w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500;
}

.config-item textarea {
    @apply resize-none h-16;
}

.code-textarea {
    @apply font-mono h-24;
}

.node-handle {
    @apply w-3 h-3 bg-orange-500 border-2 border-white;
}
</style>
