<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 21:56:32
 * @FilePath: \LowCode\apps\builder\src\views\LayoutView.vue
 * @Description: Glide 风格的布局管理页面
-->
<script setup lang="ts">
import AppLeftPanel from '@/components/AppLeftPanel/AppLeftPanel.vue'
import AppPreview from '@/components/AppPreviewer/AppPreviewer.vue'
import AppRightPanel from '@/components/AppRightPanel/AppRightPanel.vue'
</script>
<template>
  <div class="layout-wrapper">
    <AppLeftPanel />
    <AppPreview />
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
