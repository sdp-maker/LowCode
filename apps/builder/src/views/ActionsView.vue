<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 18:30:00
 * @FilePath: \LowCode\apps\builder\src\views\ActionsView.vue
 * @Description: 工作流编辑器页面
-->
<script setup lang="ts">
import FlowEditor from '../components/FlowEditer/FlowEditor.vue'
</script>

<template>
  <div class="workflow-view">
    <FlowEditor />
  </div>
</template>

<style scoped>
.workflow-view {
  @apply h-full w-full;
}
</style>