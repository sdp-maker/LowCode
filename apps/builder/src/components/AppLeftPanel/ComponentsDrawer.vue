<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 13:59:24
 * @FilePath: \LowCode\apps\builder\src\components\AppLeftPanel\ComponentsDrawer.vue
 * @Description: 组件库面板，显示可拖拽的组件列表
-->
<script setup lang="ts">
import { ref } from 'vue'
import { getBlocks } from "@/blocks"
import { createBlock } from "@/blocks"
import type { Block } from "@/types/block"

// 获取所有块定义
const allBlocks = getBlocks()

// 已添加到页面的组件
const addedBlocks = ref<any[]>([])

// 组件选择弹窗状态
const showModal = ref(false)

// 处理组件重新排序（暂时移除拖拽排序功能）
// const handleComponentReorder = () => {
//   // 这里可以保存组件顺序到本地存储
// }

// 显示组件选择弹窗
const showComponentModal = () => {
  showModal.value = true
}

// 添加组件到预览区
const addComponentToPreview = (componentType: string) => {
  console.log('Adding component:', componentType)
  const newBlock = createBlock(componentType)
  console.log('Created block:', newBlock)
  if (newBlock) {
    // 添加到已添加组件列表
    addedBlocks.value.push(newBlock)
    console.log('Added blocks length:', addedBlocks.value.length)
    console.log('Added blocks:', addedBlocks.value)
    // 发射事件给父组件
    emit('add-component', newBlock)
  }
  showModal.value = false
}

// 获取组件图标
const getBlockIcon = (type: string) => {
  const block = allBlocks.find(b => b.type === type)
  return block?.icon || '?'
}

// 删除组件
const removeComponent = (blockId: string) => {
  // 从已添加组件列表中移除
  const index = addedBlocks.value.findIndex(b => b.id === blockId)
  if (index !== -1) {
    addedBlocks.value.splice(index, 1)
    // 发射删除事件给父组件
    emit('remove-component', blockId)
  }
}

// 拖拽相关状态
const draggedIndex = ref<number | null>(null)
const draggedOverIndex = ref<number | null>(null)

// 开始拖拽
const handleDragStart = (event: DragEvent, index: number) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', index.toString())
  }
  console.log('Drag start:', index)
}

// 拖拽经过
const handleDragOver = (event: DragEvent, index: number) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  draggedOverIndex.value = index
}

// 拖拽离开
const handleDragLeave = () => {
  draggedOverIndex.value = null
}

// 放置
const handleDrop = (event: DragEvent, dropIndex: number) => {
  event.preventDefault()

  if (draggedIndex.value !== null && draggedIndex.value !== dropIndex) {
    console.log('Drop:', draggedIndex.value, 'to', dropIndex)

    // 重新排序
    const itemToMove = addedBlocks.value.splice(draggedIndex.value, 1)[0]
    addedBlocks.value.splice(dropIndex, 0, itemToMove)

    // 发射重新排序事件给父组件
    console.log('ComponentsDrawer: Emitting reorder event with blocks:', addedBlocks.value)
    emit('reorder-components', addedBlocks.value)
  }

  // 重置状态
  draggedIndex.value = null
  draggedOverIndex.value = null
}

// 拖拽结束
const handleDragEnd = () => {
  draggedIndex.value = null
  draggedOverIndex.value = null
}

// 定义事件
const emit = defineEmits<{
  'add-component': [block: Block]
  'remove-component': [blockId: string]
  'reorder-components': [blocks: Block[]]
}>()
</script>

<template>
  <div class="components-drawer h-full flex flex-col">
    <div class="drawer-header">
      <h3 class="header-title">组件库</h3>
      <button class="add-component-button" @click="showComponentModal()" title="添加组件">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1V15M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>
    <div class="drawer-content">
      <div v-if="addedBlocks.length === 0" class="empty-state">
        <p class="empty-text">点击上方 + 号添加组件</p>
      </div>
      <div v-else class="component-list">
        <div v-for="(block, index) in addedBlocks" :key="block.id" class="component-item" :class="{
          'dragging': draggedIndex === index,
          'drag-over': draggedOverIndex === index && draggedIndex !== index
        }" draggable="true" @dragstart="handleDragStart($event, index)" @dragover="handleDragOver($event, index)"
          @dragleave="handleDragLeave" @drop="handleDrop($event, index)" @dragend="handleDragEnd">
          <div class="component-content">
            <div class="component-icon">{{ getBlockIcon(block.type) }}</div>
            <div class="component-name">{{ block.label }}</div>
          </div>
          <button class="delete-button" @click="removeComponent(block.id)" title="删除组件">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 组件选择弹窗 -->
    <div v-if="showModal" class="component-modal-overlay" @click="showModal = false">
      <div class="component-modal" @click.stop>
        <div class="modal-header">
          <h3>选择组件</h3>
          <button class="close-button" @click="showModal = false">×</button>
        </div>
        <div class="modal-content">
          <div class="component-options">
            <div v-for="block in allBlocks" :key="block.type" class="component-option"
              @click="addComponentToPreview(block.type)">
              <div class="component-option-icon">{{ block.icon }}</div>
              <div class="component-option-name">{{ block.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.components-drawer {
  @apply bg-white;
}

.drawer-header {
  @apply px-4 py-3 border-b border-gray-100 flex items-center justify-between;
}

.header-title {
  @apply text-sm font-semibold text-gray-800 m-0;
}

.add-component-button {
  @apply w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors;
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
  @apply flex flex-col gap-2;
}

.component-item {
  @apply flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-move transition-colors;
}

.component-item.dragging {
  @apply opacity-50 scale-95 bg-blue-50 border-blue-300;
}

.component-item.drag-over {
  @apply bg-blue-100 border-blue-400 border-2;
}

.delete-button {
  @apply w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors;
  opacity: 0;
  transition: opacity 0.2s;
}

.component-item:hover .delete-button {
  opacity: 1;
}

.empty-state {
  @apply flex items-center justify-center p-8 text-center;
}

.empty-text {
  @apply text-gray-400 text-sm;
}

.component-content {
  @apply flex flex-col items-center flex-1;
}

.component-icon {
  @apply mb-2 text-gray-600;
}

.component-name {
  @apply text-xs text-gray-700;
}

/* 移除不需要的加号按钮样式 */

/* 弹窗样式 */
.component-modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.component-modal {
  @apply bg-white rounded-lg shadow-xl max-w-md w-full mx-4;
}

.modal-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.modal-header h3 {
  @apply text-lg font-semibold text-gray-800 m-0;
}

.close-button {
  @apply w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors;
}

.modal-content {
  @apply p-4;
}

.component-options {
  @apply grid grid-cols-2 gap-3;
}

.component-option {
  @apply flex flex-col items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors;
}

.component-option-icon {
  @apply mb-2 text-gray-600 text-lg;
}

.component-option-name {
  @apply text-xs text-gray-700 text-center;
}
</style>
