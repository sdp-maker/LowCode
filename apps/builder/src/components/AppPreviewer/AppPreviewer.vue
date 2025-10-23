<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:31:33
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref } from 'vue'
import { SmoothDndContainer } from "@/components/SmoothDnd/SmoothDndContainer"
import { SmoothDndDraggable } from "@/components/SmoothDnd/SmoothDndDraggable"
import { createBlock } from "@/blocks"
import type { Block } from "@/types/block"

// 预览区域的组件列表
const previewBlocks = ref<Block[]>([])

// 处理拖拽放置事件
const handleDrop = (result: any) => {
  if (result.addedIndex !== null && result.payload) {
    // 根据 payload 创建新的组件实例
    const newBlock = createBlock(result.payload.type, result.payload.defaultProps)
    if (newBlock) {
      previewBlocks.value.splice(result.addedIndex, 0, newBlock)
    }
  }
}

// 获取子元素载荷
const getChildPayload = (index: number) => {
  return previewBlocks.value[index]
}
</script>

<template>
 <div class="app-previewer">
  <SmoothDndContainer 
    group-name="blocks" 
    orientation="vertical" 
    :on-drop="handleDrop"
    :get-child-payload="getChildPayload"
    :drop-placeholder="{ className: 'drop-placeholder', animationDuration: '150ms', showOnTop: true }"
  >
    <SmoothDndDraggable v-for="block in previewBlocks" :key="block.id">
      <div class="preview-block">
        {{ block.label }}
      </div>
    </SmoothDndDraggable>
  </SmoothDndContainer>
 </div>
</template>

<style scoped>
.app-previewer {
  background-color: #ffffff;
  padding: 16px;
  flex: 1;
  height: 100%;
  font-weight: bold;
}

.preview-block {
  @apply p-4 m-2 border border-gray-200 rounded bg-gray-50 hover:bg-gray-100 transition-colors;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-placeholder {
  @apply border-2 border-dashed border-blue-400 bg-blue-50 rounded;
  min-height: 60px;
  margin: 8px 0;
}
</style>
