<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 21:56:32
 * @FilePath: \LowCode\apps\builder\src\views\LayoutView.vue
 * @Description: Glide 风格的布局管理页面
-->
<script setup lang="ts">
import { ref } from 'vue'
import AppLeftPanel from '@/components/AppLeftPanel/AppLeftPanel.vue'
import AppPreview from '@/components/AppPreviewer/AppPreviewer.vue'
import AppRightPanel from '@/components/AppRightPanel/AppRightPanel.vue'
import type { Block } from '@/types/block'

// 预览区的组件列表
const previewBlocks = ref<Block[]>([])

// 处理添加组件事件
const handleAddComponent = (block: Block) => {
  previewBlocks.value.push(block)
}

// 处理删除组件事件
const handleRemoveComponent = (blockId: string) => {
  const index = previewBlocks.value.findIndex(b => b.id === blockId)
  if (index !== -1) {
    previewBlocks.value.splice(index, 1)
  }
}

// 处理重新排序事件
const handleReorderComponents = (blocks: Block[]) => {
  console.log('LayoutView: Received reorder event with blocks:', blocks)
  previewBlocks.value = [...blocks]
  console.log('LayoutView: Updated previewBlocks:', previewBlocks.value)
}
</script>
<template>
  <div class="layout-wrapper">
    <AppLeftPanel @add-component="handleAddComponent" @remove-component="handleRemoveComponent"
      @reorder-components="handleReorderComponents" />
    <AppPreview :blocks="previewBlocks" />
    <AppRightPanel />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: grid;
  grid-template-columns: 256px 1fr 320px;
  height: 100%;
  background-color: #f3f4f6;
}
</style>
