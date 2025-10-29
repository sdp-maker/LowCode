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
import SimpleIcon from "@/components/SimpleIcon.vue"

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
      <SmoothDndContainer behaviour="copy" group-name="blocks" orientation="vertical"
        :get-child-payload="getChildPayload" class="components-grid">
        <SmoothDndDraggable v-for="block in blocks" :key="block.type" class="component-item">
          <div class="component-icon">
            <SimpleIcon :type="typeof block.icon === 'string' ? block.icon : '?'" :size="24" />
          </div>
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
  @apply flex-1 py-2;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.8) rgba(241, 245, 249, 0.5);
}

.drawer-content::-webkit-scrollbar {
  width: 8px;
}

.drawer-content::-webkit-scrollbar-track {
  background: rgba(248, 250, 252, 0.9);
  border-radius: 4px;
  margin: 2px 0;
  border: 1px solid rgba(226, 232, 240, 0.3);
}

.drawer-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(203, 213, 225, 0.9) 0%, rgba(148, 163, 184, 0.9) 100%);
  border-radius: 4px;
  border: 1px solid rgba(203, 213, 225, 0.3);
  transition: all 0.2s ease;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(148, 163, 184, 1) 0%, rgba(100, 116, 139, 1) 100%);
  border-color: rgba(148, 163, 184, 0.5);
  transform: scaleX(1.1);
}

.drawer-content::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, rgba(100, 116, 139, 1) 0%, rgba(71, 85, 105, 1) 100%);
  border-color: rgba(100, 116, 139, 0.7);
}

.components-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
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
  @apply flex flex-col items-center justify-center p-3 rounded-md hover:bg-gray-50 cursor-move transition-colors;
  min-height: 80px;
  margin-bottom: 8px;
}

.component-icon {
  @apply mb-2 text-gray-600;
}

.component-name {
  @apply text-xs text-gray-700;
}
</style>
