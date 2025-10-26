<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:31:33
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, watch } from 'vue'
// import { VueDraggableNext } from "vue-draggable-next"
import { createBlock } from "@/blocks"
import type { Block } from "@/types/block"
import BlockRenderer from '@/blocks/BlockRenderer.vue'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()

// 接收 props
const props = defineProps<{
  blocks: Block[]
}>()

// 预览区域的组件列表
const previewBlocks = ref<Block[]>(props.blocks)

// 监听 props.blocks 的变化，同步更新 previewBlocks
watch(() => props.blocks, (newBlocks) => {
  console.log('AppPreviewer: props.blocks changed, updating previewBlocks:', newBlocks)
  previewBlocks.value = [...newBlocks]
}, { deep: true })

// 处理拖拽放置事件
const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  const data = event.dataTransfer?.getData('application/json')
  if (data) {
    try {
      const blockDef = JSON.parse(data)
      const newBlock = createBlock(blockDef.type)
      if (newBlock) {
        previewBlocks.value.push(newBlock)
      }
    } catch (error) {
      // 忽略解析错误
    }
  }
}

// 处理拖拽进入事件
const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
}

// 拖拽状态
const draggedIndex = ref<number | null>(null)

// 处理组件内部拖拽开始
const handleBlockDragStart = (event: DragEvent, index: number) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', index.toString())
    event.dataTransfer.effectAllowed = 'move'
  }
  // 添加拖拽样式
  if (event.target instanceof HTMLElement) {
    event.target.style.opacity = '0.5'
  }
}

// 处理组件内部拖拽悬停
const handleBlockDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

// 处理组件内部拖拽放置
const handleBlockDrop = (event: DragEvent, dropIndex: number) => {
  event.preventDefault()
  const dragIndex = draggedIndex.value

  if (dragIndex !== null && dragIndex !== dropIndex) {
    // 创建新的数组来避免响应式问题
    const newBlocks = [...previewBlocks.value]
    const draggedBlock = newBlocks[dragIndex]

    // 移除拖拽的元素
    newBlocks.splice(dragIndex, 1)

    // 计算新的插入位置
    const newDropIndex = dragIndex < dropIndex ? dropIndex - 1 : dropIndex

    // 插入到新位置
    if (draggedBlock) {
      newBlocks.splice(newDropIndex, 0, draggedBlock)
    }

    // 更新数组
    previewBlocks.value = newBlocks
  }
}

// 处理组件内部拖拽结束
const handleBlockDragEnd = (event: DragEvent) => {
  draggedIndex.value = null
  // 恢复样式
  if (event.target instanceof HTMLElement) {
    event.target.style.opacity = '1'
  }
}
//远程物料
// const loadComponent = async () => {
//   const res = await fetch('https://cnodejs.org/api/v1/topics')
//   const data = await res.json()
//   return data.data.map(item => h('div', {}, item.title))
// }
// const txt = defineAsyncComponent(() => loadComponent())

// const blocks = ref([
//   {
//     type: 'chart',
//     id: '0'
//   },

//   {
//     type: 'button',
//     id: '1'
//   }, {
//     type: 'text',
//     id: '2'
//   }, {
//     type: 'image',
//     id: '3'
//   }])

function handleBlockClick(block: Block) {
  editorStore.selectBlock(block)
}
</script>

<template>
  <div class="app-previewer" @click.self="editorStore.selectBlock(null)" @drop="handleDrop" @dragover="handleDragOver">
    <div v-if="previewBlocks.length === 0" class="empty-state">
      <div class="empty-icon">📦</div>
      <p class="empty-text">从左侧拖拽组件到这里开始构建</p>
    </div>
    <div v-else class="preview-container">
      <div v-for="(block, index) in previewBlocks" :key="block.id" class="preview-block"
        @click="handleBlockClick(block)" :class="{ 'is-selected': editorStore.selectedBlock?.id === block.id }"
        draggable="true" @dragstart="handleBlockDragStart($event, index)" @dragover="handleBlockDragOver($event)"
        @drop="handleBlockDrop($event, index)" @dragend="handleBlockDragEnd($event)">
        <BlockRenderer :block="block" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-previewer {
  background-color: #ffffff;
  padding: 16px;
  flex: 1;
  height: 100%;
  position: relative;
  overflow-y: auto;
}

/* 空状态样式 */
.empty-state {
  @apply flex flex-col items-center justify-center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.empty-icon {
  @apply text-6xl mb-4 opacity-30;
}

.empty-text {
  @apply text-gray-400 text-sm;
}

/* 预览块样式 */
.preview-block {
  @apply mb-2 bg-transparent transition-colors cursor-move;
  min-height: 60px;
  border: none;
}

.preview-block:hover {
  background-color: transparent;
}

/* 拖拽占位符样式 */
.drop-placeholder {
  @apply bg-blue-50 rounded;
  min-height: 60px;
  margin-bottom: 8px;
  border: 2px dashed rgba(59, 130, 246, 0.3);
}

.preview-block.is-selected {
  border: 1px solid #3b82f6;
  background-color: transparent;
  border-radius: 4px;
}

.preview-block[draggable="true"]:hover {
  border: 1px solid rgba(59, 130, 246, 0.3);
  background-color: rgba(59, 130, 246, 0.02);
  border-radius: 4px;
}

.preview-block[draggable="true"]:active {
  border: 1px solid #2563eb;
  background-color: rgba(37, 99, 235, 0.05);
  border-radius: 4px;
}

.preview-container {
  @apply min-h-full;
}
</style>
