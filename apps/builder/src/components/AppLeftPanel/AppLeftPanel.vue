<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @FilePath: \LowCode\apps\builder\src\components\AppLeftPanel\AppLeftPanel.vue
 * @Description: 应用左侧面板，包含导航和组件列表
-->
<script setup lang="ts">
import NavigationDrawer from './NavigationDrawer.vue'
import ComponentsDrawer from './ComponentsDrawer.vue'
import type { Block } from '@/types/block'

// 定义事件
const emit = defineEmits<{
  'add-component': [block: Block]
  'remove-component': [blockId: string]
  'reorder-components': [blocks: Block[]]
}>()

// 处理添加组件事件
const handleAddComponent = (block: Block) => {
  emit('add-component', block)
}

// 处理删除组件事件
const handleRemoveComponent = (blockId: string) => {
  emit('remove-component', blockId)
}

// 处理重新排序事件
const handleReorderComponents = (blocks: Block[]) => {
  console.log('AppLeftPanel: Received reorder event, forwarding to LayoutView:', blocks)
  emit('reorder-components', blocks)
}
</script>

<template>
  <div class="app-left-panel">
    <div class="panel-section">

      <NavigationDrawer />
    </div>
    <div class="panel-section components-section">
      <ComponentsDrawer @add-component="handleAddComponent" @remove-component="handleRemoveComponent"
        @reorder-components="handleReorderComponents" />
    </div>
  </div>
</template>

<style scoped>
.app-left-panel {
  @apply bg-white h-full border-r border-gray-200 flex flex-col;
  width: 256px;
}

.panel-section {
  @apply p-4;
}

.components-section {
  @apply flex-1 flex flex-col border-t border-gray-200;
  min-height: 0;
  /* 确保 flex 子元素可以收缩 */
  overflow: hidden;
  /* 防止内容溢出 */
}

.section-title {
  @apply text-xs font-bold text-gray-500 uppercase tracking-wider mb-2;
}
</style>
