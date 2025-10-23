<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 15:11:35
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { getBlocks } from "@/blocks"
import { SmoothDndContainer } from "@/components/SmoothDnd/SmoothDndContainer"
import { SmoothDndDraggable } from "@/components/SmoothDnd/SmoothDndDraggable"

// 获取所有块定义
const blocks = getBlocks()

// 提供拖拽载荷，跨容器时作为 payload 传递
const getChildPayload = (index: number) => blocks[index]
</script>

<template>
  <div class="components-drawer h-full flex flex-col">
    <div class="drawer-header">
      <h3 class="header-title">组件库</h3>
    </div>
    <div class="drawer-content">
      <SmoothDndContainer behaviour="copy" group-name="blocks" orientation="vertical" :get-child-payload="getChildPayload">
        <SmoothDndDraggable v-for="block in blocks" :key="block.type" class="component-item">
          <div class="component-icon">{{ block.icon }}</div>
          <div class="component-name">{{ block.name }}</div>
        </SmoothDndDraggable>
      </SmoothDndContainer>
    </div>  
  </div>
</template>

<style scoped>
.components-drawer {
  @apply bg-white;
}

.drawer-header {
  @apply px-4 py-3 border-b border-gray-100;
}

.header-title {
  @apply text-sm font-semibold text-gray-800 m-0;
}

.drawer-content {
  @apply flex-1 overflow-auto p-2;
  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

/* Webkit 滚动条样式 */
.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

.component-category {
  @apply mb-4;
}

.category-title {
  @apply text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2;
}

.component-list {
  @apply grid grid-cols-2 gap-2;
}

.component-item {
  @apply flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-move transition-colors;
}

.component-icon {
  @apply mb-2 text-gray-600;
}

.component-name {
  @apply text-xs text-gray-700;
}
</style>
