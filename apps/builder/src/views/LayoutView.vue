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
import { createBlock } from '@/blocks'

// 定义组件名称，用于keep-alive缓存
defineOptions({
  name: 'LayoutView'
})

// 创建默认组件的函数
const createDefaultBlocks = (): Block[] => {
  const blocks: Block[] = []

  // 1. 创建标题组件
  const titleBlock = createBlock('simpleTitle', {
    content: '小鸟游六花',
    fontSize: 28,
    align: 'center',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20
  })
  if (titleBlock) blocks.push(titleBlock)

  // 2. 创建富文本编辑器组件 - 明确设置初始内容
  const richEditorBlock = createBlock('richEditor', {
    minHeight: 150,
    initialContent: '<p>我正在使用<strong>Vue.js</strong> 运行 <strong>Tiptap</strong>。 🎉</p><p><br></p><p>您还可以教给编辑器新事物。例如，识别十六进制颜色并添加颜色</p><p><br></p><p>动态颜色：<span style="color: #401f3e">#401f3e</span> <span style="color: #3f2e56">#3f2e56</span> <span style="color: #faf2a1">#faf2a1</span> <span style="color: #759aab">#759aab</span> <span style="color: #FD9170">#FD9170</span> <span style="color: #453f78">#453f78</span> <span style="color: #68CEF8">#68CEF8</span> <span style="color: #80cbc4">#80cbc4</span> <span style="color: #9DEF8F">#9DEF8F</span></p>'
  })
  if (richEditorBlock) blocks.push(richEditorBlock)

  // 3. 创建饼图组件 - 使用默认props
  const pieChartBlock = createBlock('pieChart')
  if (pieChartBlock) blocks.push(pieChartBlock)

  return blocks
}

// 预览区的组件列表 - 初始化时加载默认组件
const previewBlocks = ref<Block[]>(createDefaultBlocks())

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
    <AppLeftPanel :blocks="previewBlocks" @add-component="handleAddComponent" @remove-component="handleRemoveComponent"
      @reorder-components="handleReorderComponents" />
    <AppPreview :blocks="previewBlocks" />
    <AppRightPanel />
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: grid;
  grid-template-columns: 256px 1fr 320px;
  height: 100vh;
  background-color: #f3f4f6;
}
</style>
