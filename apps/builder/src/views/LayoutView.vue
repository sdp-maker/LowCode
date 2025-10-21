<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 20:45:47
 * @FilePath: \LowCode\apps\builder\src\views\AppView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
// 布局管理相关的逻辑可以在这里添加
</script>

<template>
  <div class="layout-view">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">布局管理</h2>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <p class="text-blue-800">在这里您可以管理应用的布局结构，包括页面布局、组件布局等。</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center mb-2">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <span class="text-blue-600 text-lg">📱</span>
          </div>
          <h3 class="font-medium text-gray-800">响应式布局</h3>
        </div>
        <p class="text-gray-600 text-sm">创建适配不同设备的响应式布局</p>
      </div>
      
      <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center mb-2">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <span class="text-green-600 text-lg">🎨</span>
          </div>
          <h3 class="font-medium text-gray-800">主题样式</h3>
        </div>
        <p class="text-gray-600 text-sm">自定义应用的主题和样式</p>
      </div>
      
      <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center mb-2">
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <span class="text-purple-600 text-lg">🧩</span>
          </div>
          <h3 class="font-medium text-gray-800">组件库</h3>
        </div>
        <p class="text-gray-600 text-sm">管理和配置可复用的组件</p>
      </div>
    </div>
  </div>
</template>