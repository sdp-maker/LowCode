<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-25 16:30:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-25 16:30:00
 * @FilePath: \LowCode\apps\builder\src\views\DataSourceView.vue
 * @Description: 数据源管理页面 - 使用 Glide Data Grid
-->
<script setup lang="ts">
import DataSourceContent from '../components/DataSouceContent.vue/DataSouceContent.vue'

// 定义组件名称，用于keep-alive缓存
defineOptions({
  name: 'DataSourceView'
})
</script>

<template>
  <div class="data-source-view">
    <DataSourceContent />
  </div>
</template>

<style scoped>
.data-source-view {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>