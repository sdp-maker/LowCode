<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-01-27 10:45:00
 * @FilePath: \LowCode\apps\builder\src\views\LayoutView.vue
 * @Description: Glide 风格的布局管理页面
-->
<script setup lang="ts">
import IconLayout from '../components/icons/IconLayout.vue';
</script>

<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">布局管理</h2>
      <p class="text-gray-600">设计和管理您的应用布局结构</p>
    </div>
    
    <!-- 功能卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- 响应式布局卡片 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-100 transition-colors">
            <IconLayout :size="24" color="#4f46e5" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">响应式布局</h3>
            <p class="text-sm text-gray-500">适配不同设备</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">创建适配不同设备的响应式布局，确保在各种屏幕尺寸下都有良好的用户体验。</p>
        <div class="mt-4 flex items-center text-sm text-indigo-600 font-medium">
          <span>开始设计</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- 主题样式卡片 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-emerald-100 transition-colors">
            <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">主题样式</h3>
            <p class="text-sm text-gray-500">自定义外观</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">自定义应用的主题和样式，包括颜色、字体、间距等设计元素。</p>
        <div class="mt-4 flex items-center text-sm text-emerald-600 font-medium">
          <span>自定义主题</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- 组件库卡片 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-100 transition-colors">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">组件库</h3>
            <p class="text-sm text-gray-500">可复用组件</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">管理和配置可复用的组件，提高开发效率并保持设计一致性。</p>
        <div class="mt-4 flex items-center text-sm text-purple-600 font-medium">
          <span>浏览组件</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- 快速操作区域 -->
    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">快速开始</h3>
          <p class="text-gray-600 text-sm">选择一个模板快速开始您的项目</p>
        </div>
        <button class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          选择模板
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 卡片悬停效果 */
.group:hover .group-hover\:bg-indigo-100 {
  background-color: rgb(224 231 255);
}

.group:hover .group-hover\:bg-emerald-100 {
  background-color: rgb(209 250 229);
}

.group:hover .group-hover\:bg-purple-100 {
  background-color: rgb(243 232 255);
}
</style>