<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:31:33
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// import { VueDraggableNext } from "vue-draggable-next"
import { createBlock } from "@/blocks"
import type { Block } from "@/types/block"
import BlockRenderer from '@/blocks/BlockRenderer.vue'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()

// 视口类型
type ViewportType = 'pc' | 'h5'

// 视口状态
const currentViewport = ref<ViewportType>('pc')
const isFullscreen = ref(false)

// 发布地址
const publishUrl = ref('https://example.com/path/to/yoursite')

// 手机状态栏状态
const phoneStatus = ref({
  time: '22:37',
  battery: 85,
  signal: 4,
  wifi: true,
  carrier: 'MiaoMa vBuilder'
})

// 更新时间
const updateTime = () => {
  const now = new Date()
  phoneStatus.value.time = now.toTimeString().slice(0, 5)
}

// 每分钟更新时间
setInterval(updateTime, 60000)
updateTime() // 初始化时间

// 视口尺寸配置
const viewportSizes = {
  pc: { width: '100%', height: '100%' },
  h5: { width: '395px', height: '832px' }
}

// 当前视口样式
const viewportStyle = computed(() => {
  const size = viewportSizes[currentViewport.value]
  return {
    width: size.width,
    height: size.height,
    maxWidth: currentViewport.value === 'h5' ? '395px' : 'none',
    margin: currentViewport.value === 'h5' ? '0 auto' : '0',
    borderRadius: currentViewport.value === 'h5' ? '12px' : '0',
    overflow: 'hidden'
  }
})

// 切换视口
const switchViewport = (viewport: ViewportType) => {
  currentViewport.value = viewport
}

// 切换全屏
const toggleFullscreen = () => {
  const previewerElement = document.querySelector('.app-previewer') as HTMLElement
  if (!document.fullscreenElement && previewerElement) {
    previewerElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 监听全屏状态变化
document.addEventListener('fullscreenchange', () => {
  isFullscreen.value = !!document.fullscreenElement
})

// 复制发布地址
const copyPublishUrl = async () => {
  try {
    await navigator.clipboard.writeText(publishUrl.value)
    // 可以添加提示消息
  } catch (err) {
    console.error('复制失败:', err)
  }
}

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
  <div class="app-previewer">
    <!-- 顶部工具栏 -->
    <div class="preview-toolbar">
      <!-- 发布地址 -->
      <div class="publish-url-section">
        <div class="url-display" @click="copyPublishUrl" title="点击复制地址">
          <i class="iconfont icon-fuzhi url-icon"></i>
          <span class="url-text">{{ publishUrl }}</span>
        </div>
      </div>

      <!-- 右侧控制区 -->
      <div class="toolbar-controls">
        <!-- 视口切换 -->
        <div class="viewport-switcher">
          <button class="viewport-btn" :class="{ active: currentViewport === 'pc' }" @click="switchViewport('pc')"
            title="PC视图">
            <i class="iconfont icon-diannao_o"></i>

          </button>
          <button class="viewport-btn" :class="{ active: currentViewport === 'h5' }" @click="switchViewport('h5')"
            title="手机视图">
            <i class="iconfont icon-shouji"></i>

          </button>
        </div>

        <!-- 全屏按钮 - 只在PC视图下显示 -->
        <button v-if="currentViewport === 'pc'" class="fullscreen-btn" @click="toggleFullscreen"
          :title="isFullscreen ? '退出全屏' : '全屏预览'">
          <i class="iconfont icon-quanping_o"></i>
        </button>
      </div>
    </div>

    <!-- 预览内容区 -->
    <div class="preview-content" :style="viewportStyle">
      <!-- 手机模拟器 -->
      <div v-if="currentViewport === 'h5'" class="phone-simulator">
        <!-- 手机外壳 -->
        <div class="phone-frame">
          <!-- 屏幕区域 -->
          <div class="phone-screen">
            <!-- 状态栏 -->
            <div class="status-bar">
              <div class="status-left">
                <span class="time">{{ phoneStatus.time }}</span>
              </div>
              <div class="status-center">
                <div class="notch"></div>
              </div>
              <div class="status-right">
                <!-- 信号强度 -->
                <div class="signal-bars">
                  <div v-for="i in 4" :key="i" class="signal-bar" :class="{ active: i <= phoneStatus.signal }"></div>
                </div>
                <!-- WiFi图标 -->
                <div v-if="phoneStatus.wifi" class="wifi-icon">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                    <path
                      d="M7.5 0C11.6421 0 15 1.79086 15 4C15 4.55228 14.5523 5 14 5C13.4477 5 13 4.55228 13 4C13 2.89543 10.7614 2 7.5 2C4.23858 2 2 2.89543 2 4C2 4.55228 1.55228 5 1 5C0.447715 5 0 4.55228 0 4C0 1.79086 3.35786 0 7.5 0Z"
                      fill="currentColor" />
                    <path
                      d="M7.5 3C9.98528 3 12 4.34315 12 6C12 6.55228 11.5523 7 11 7C10.4477 7 10 6.55228 10 6C10 5.44772 8.98528 5 7.5 5C6.01472 5 5 5.44772 5 6C5 6.55228 4.55228 7 4 7C3.44772 7 3 6.55228 3 6C3 4.34315 5.01472 3 7.5 3Z"
                      fill="currentColor" />
                    <circle cx="7.5" cy="9" r="2" fill="currentColor" />
                  </svg>
                </div>
                <!-- 电池 -->
                <div class="battery">
                  <div class="battery-body">
                    <div class="battery-level" :style="{ width: phoneStatus.battery + '%' }"></div>
                  </div>
                  <div class="battery-tip"></div>
                </div>
              </div>
            </div>

            <!-- 应用内容区 -->
            <div class="app-content" @click.self="editorStore.selectBlock(null)" @drop="handleDrop"
              @dragover="handleDragOver">
              <div v-if="previewBlocks.length === 0" class="empty-state">
                <div class="empty-icon">📦</div>
                <p class="empty-text">从左侧拖拽组件到这里开始构建</p>
              </div>
              <div v-else class="preview-container">
                <div v-for="(block, index) in previewBlocks" :key="block.id" class="preview-block"
                  @click="handleBlockClick(block)"
                  :class="{ 'is-selected': editorStore.selectedBlock?.id === block.id }" draggable="true"
                  @dragstart="handleBlockDragStart($event, index)" @dragover="handleBlockDragOver($event)"
                  @drop="handleBlockDrop($event, index)" @dragend="handleBlockDragEnd($event)">
                  <BlockRenderer :block="block" />
                </div>
              </div>
            </div>

            <!-- 底部指示器 -->
            <div class="home-indicator"></div>
          </div>
        </div>
      </div>

      <!-- PC视图 -->
      <div v-else class="pc-content" @click.self="editorStore.selectBlock(null)" @drop="handleDrop"
        @dragover="handleDragOver">
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
    </div>
  </div>
</template>

<style scoped>
.app-previewer {
  background-color: #f8f9fa;
  flex: 1;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 顶部工具栏 */
.preview-toolbar {
  @apply bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between;
  min-height: 56px;
}

.publish-url-section {
  @apply flex-1 max-w-md;
}

.url-display {
  @apply flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors;
}

.url-icon {
  @apply text-gray-500 flex-shrink-0;
  font-size: 16px;
}

.url-text {
  @apply text-sm text-gray-700 truncate;
}

.toolbar-controls {
  @apply flex items-center gap-3;
}

/* 视口切换器 */
.viewport-switcher {
  @apply flex bg-gray-100 rounded-lg p-1;
}

.viewport-btn {
  @apply flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 rounded-md transition-all duration-200 hover:text-gray-900;
}

.viewport-btn.active {
  @apply bg-white text-blue-600 shadow-sm;
}

.viewport-btn i {
  font-size: 16px;
  margin-right: 4px;
}

/* 全屏按钮 */
.fullscreen-btn {
  @apply w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center transition-colors;
}

.fullscreen-btn:hover {
  @apply text-gray-900;
}

.fullscreen-btn i {
  font-size: 18px;
}

/* 预览内容区 */
.preview-content {
  @apply flex-1 overflow-y-auto;
  transition: all 0.3s ease;
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

/* 手机模拟器样式 */
.phone-simulator {
  @apply flex justify-center items-center;
  min-height: 100vh;
}

.phone-frame {
  position: relative;
  width: 395px;
  height: 832px;
  background: #000;
  border-radius: 45px;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}


.phone-screen {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 35px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 状态栏样式 */
.status-bar {
  @apply flex items-center justify-between px-6 py-2;
  height: 44px;
  background: rgba(0, 0, 0, 0.02);
  color: #000;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  z-index: 5;
}

.status-left .time {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
}

.status-center {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 150px;
}

.notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 30px;
  background: #000;
  border-radius: 0 0 20px 20px;
}

.status-right {
  @apply flex items-center gap-2;
}

/* 信号强度 */
.signal-bars {
  @apply flex items-end gap-1;
}

.signal-bar {
  width: 3px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1px;
}

.signal-bar:nth-child(1) {
  height: 4px;
}

.signal-bar:nth-child(2) {
  height: 6px;
}

.signal-bar:nth-child(3) {
  height: 8px;
}

.signal-bar:nth-child(4) {
  height: 10px;
}

.signal-bar.active {
  background: #000;
}

/* WiFi图标 */
.wifi-icon {
  @apply flex items-center;
  color: #000;
}

/* 电池样式 */
.battery {
  @apply flex items-center;
}

.battery-body {
  width: 24px;
  height: 12px;
  border: 1.5px solid #000;
  border-radius: 2px;
  position: relative;
  background: #fff;
}

.battery-level {
  height: 100%;
  background: #000;
  border-radius: 1px;
  transition: width 0.3s ease;
}

.battery-tip {
  width: 2px;
  height: 6px;
  background: #000;
  border-radius: 0 1px 1px 0;
  margin-left: 1px;
}

/* 应用内容区 */
.app-content {
  @apply flex-1 bg-white overflow-y-auto;
  padding: 16px;
  /* 隐藏滚动条 */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.app-content::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* 底部指示器 */
.home-indicator {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 134px;
  height: 5px;
  background: #000;
  border-radius: 3px;
  opacity: 0.3;
}


/* PC内容区样式 */
.pc-content {
  @apply bg-white overflow-y-auto;
  padding: 16px;
  height: 100%;
  /* 隐藏滚动条 */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.pc-content::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* 全屏模式样式 */
:fullscreen {
  background: #000 !important;
}

:fullscreen .app-previewer {
  @apply bg-black;
  height: 100vh !important;
  width: 100vw !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 9999 !important;
}

:fullscreen .preview-toolbar {
  @apply bg-gray-900 border-gray-700;
  position: relative;
  z-index: 10000;
}

:fullscreen .url-display {
  @apply bg-gray-800 hover:bg-gray-700;
}

:fullscreen .url-text {
  @apply text-gray-300;
}

:fullscreen .viewport-switcher {
  @apply bg-gray-800;
}

:fullscreen .viewport-btn {
  @apply text-gray-400 hover:text-gray-200;
}

:fullscreen .viewport-btn.active {
  @apply bg-gray-700 text-blue-400;
}

:fullscreen .fullscreen-btn {
  @apply bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200;
}

:fullscreen .preview-content {
  @apply bg-white;
  height: calc(100vh - 56px) !important;
  width: 100vw !important;
  position: relative;
  overflow: hidden;
}

:fullscreen .pc-content {
  @apply bg-white;
  height: 100% !important;
  width: 100% !important;
  padding: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
