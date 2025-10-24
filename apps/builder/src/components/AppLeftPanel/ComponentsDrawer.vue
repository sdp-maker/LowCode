<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 13:59:24
 * @FilePath: \LowCode\apps\builder\src\components\AppLeftPanel\ComponentsDrawer.vue
 * @Description: 组件库面板，显示可拖拽的组件列表
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { getBlocks, createBlock } from "@/blocks"
import type { Block } from "@/types/block"
import type { BlockDefinition } from "@/blocks"

// 获取所有块定义
const allBlocks = getBlocks()

// 将块按类别分组
const groupedBlocks = computed(() => {
  return allBlocks.reduce((acc, block) => {
    const category = block.category || '未分类'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(block)
    return acc
  }, {} as Record<string, BlockDefinition[]>)
})

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
      <h3 class="header-title">组件</h3>
      <button class="add-component-button" @click="showComponentModal()" title="插入组件">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <h3>插入组件</h3>
          <button class="close-button" @click="showModal = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <div v-for="(blocks, category) in groupedBlocks" :key="category" class="component-category">
            <h4 class="category-title">{{ category }}</h4>
            <div class="component-options">
              <div v-for="block in blocks" :key="block.type" class="component-option"
                @click="addComponentToPreview(block.type)">
                <div class="component-option-icon">
                  <span>{{ block.icon }}</span>
                </div>
                <div class="component-option-name">{{ block.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.components-drawer {
  @apply bg-white h-full;
}

.drawer-header {
  @apply border-b border-gray-100 flex items-center justify-between pb-[16px];
}

.header-title {
  @apply text-sm font-semibold text-gray-800 m-0;
}

.add-component-button {
  @apply w-7 h-7 bg-white border border-gray-300 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors;
}

.drawer-content {
  @apply flex-1 p-2;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  /* 限制最大高度以确保滚动条出现 */
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

.component-list {
  @apply flex flex-col gap-2;
}

.component-item {
  @apply flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-move transition-colors;
  min-height: 60px;
}

.delete-button {
  @apply w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0;
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

/* 弹窗样式调整 */
.component-modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-40 flex items-start justify-start z-50;
}

.component-modal {
  @apply bg-white h-full shadow-xl w-80;
  /* 固定宽度，撑满高度 */
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.modal-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.modal-header h3 {
  @apply text-base font-semibold text-gray-900 m-0;
}

.close-button {
  @apply w-8 h-8 text-gray-500 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors;
}

.modal-content {
  @apply p-4 overflow-y-auto h-[calc(100vh-65px)];
  /* 减去头部高度 */
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.8) rgba(248, 250, 252, 0.9);
}

.modal-content::-webkit-scrollbar {
  width: 10px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(248, 250, 252, 0.95);
  border-radius: 5px;
  margin: 8px 0;
  border: 1px solid rgba(226, 232, 240, 0.4);
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.9) 100%);
  border-radius: 5px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(37, 99, 235, 1) 0%, rgba(30, 64, 175, 1) 100%);
  border-color: rgba(37, 99, 235, 0.5);
  transform: scaleX(1.2);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.modal-content::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, rgba(29, 78, 216, 1) 0%, rgba(30, 58, 138, 1) 100%);
  transform: scaleX(1.1);
}

.component-category {
  @apply mb-4;
}

.category-title {
  @apply text-sm font-semibold text-gray-800 mb-3 px-1;
}

.component-options {
  @apply grid grid-cols-3 gap-3;
  /* 一行三个 */
}

.component-option {
  @apply flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200;
  min-height: 80px;
}

.component-option:hover {
  @apply border-green-500 shadow-md;
}

.component-option-icon {
  @apply w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-2 text-xl;
}

.component-option-name {
  @apply text-xs text-gray-700 text-center;
}
</style>
