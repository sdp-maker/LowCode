<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 21:20:02
 * @FilePath: \LowCode\apps\builder\src\views\AppView.vue
 * @Description: 导航组件样式优化
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">低代码平台</h1>
    
    <div class="flex gap-0.5 bg-gray-100 rounded-lg p-1 my-4 shadow-sm">
      <RouterLink 
        to="/app/dataSource" 
        class="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-gray-600 text-sm font-medium transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
        active-class="bg-blue-500 text-white shadow-sm"
      >
        <span class="text-base">📊</span>
        <span>数据源</span>
      </RouterLink>
      <RouterLink 
        to="/app/layout" 
        class="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-gray-600 text-sm font-medium transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
        active-class="bg-blue-500 text-white shadow-sm"
      >
        <span class="text-base">📐</span>
        <span>布局</span>
      </RouterLink>
      <RouterLink 
        to="/app/actions" 
        class="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-gray-600 text-sm font-medium transition-all duration-300 hover:bg-gray-200 hover:text-gray-800"
        active-class="bg-blue-500 text-white shadow-sm"
      >
        <span class="text-base">⚡</span>
        <span>动作</span>
      </RouterLink>
    </div>
    
    <!-- 子路由内容将在这里显示 -->
    <div class="mt-6 bg-white rounded-lg shadow-sm p-6">
      <RouterView />
    </div>
  </div>
</template>
