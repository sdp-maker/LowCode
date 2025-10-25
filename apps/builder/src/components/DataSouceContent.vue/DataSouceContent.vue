<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-25 16:30:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-25 16:30:00
 * @FilePath: \LowCode\apps\builder\src\components\DataSouceContent.vue\DataSouceContent.vue
 * @Description: Vue 数据源组件包装器
-->
<template>
    <div class="data-source-wrapper">
        <ReactDataGrid />
    </div>
</template>

<script setup lang="ts">
import { applyReactInVue } from 'veaury'
import ReactDataGridComponent from './react_app/ReactSouceContent.jsx'

// 定义组件名称，用于keep-alive缓存
defineOptions({
    name: 'DataSourceContent'
})

// 将 React 组件包装为 Vue 组件
const ReactDataGrid = applyReactInVue(ReactDataGridComponent)
</script>

<style scoped>
.data-source-wrapper {
    height: 100vh;
    width: 100%;
    overflow: hidden;
}

/* 覆盖 glide-data-grid 的一些默认样式 */
:deep(.dvn-scroller) {
    border-radius: 8px;
}

:deep(.gdg-growing-entry) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 自定义滚动条样式 */
:deep(.dvn-scroller::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
}

:deep(.dvn-scroller::-webkit-scrollbar-track) {
    background: #f1f5f9;
    border-radius: 4px;
}

:deep(.dvn-scroller::-webkit-scrollbar-thumb) {
    background: linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%);
    border-radius: 4px;
    border: 1px solid #e2e8f0;
}

:deep(.dvn-scroller::-webkit-scrollbar-thumb:hover) {
    background: linear-gradient(180deg, #94a3b8 0%, #64748b 100%);
}
</style>
