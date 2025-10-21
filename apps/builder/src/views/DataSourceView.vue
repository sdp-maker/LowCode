<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-01-27 10:50:00
 * @FilePath: \LowCode\apps\builder\src\views\DataSourceView.vue
 * @Description: Glide 风格的数据源管理页面
-->
<script setup lang="ts">
import IconDatabase from '../components/icons/IconDatabase.vue';
</script>

<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">数据源管理</h2>
      <p class="text-gray-600">连接和管理您的数据源</p>
    </div>
    
    <!-- 数据源类型选择 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- MySQL 数据源 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
            <IconDatabase :size="24" color="#3b82f6" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">MySQL</h3>
            <p class="text-sm text-gray-500">关系型数据库</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">连接 MySQL 数据库，支持复杂的查询和事务处理。</p>
        <div class="mt-4 flex items-center text-sm text-blue-600 font-medium">
          <span>添加连接</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
      </div>
      
      <!-- PostgreSQL 数据源 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-100 transition-colors">
            <IconDatabase :size="24" color="#6366f1" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">PostgreSQL</h3>
            <p class="text-sm text-gray-500">高级关系型数据库</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">连接 PostgreSQL 数据库，支持 JSON 和高级数据类型。</p>
        <div class="mt-4 flex items-center text-sm text-indigo-600 font-medium">
          <span>添加连接</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
      </div>
      
      <!-- MongoDB 数据源 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-100 transition-colors">
            <IconDatabase :size="24" color="#10b981" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">MongoDB</h3>
            <p class="text-sm text-gray-500">文档数据库</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">连接 MongoDB 数据库，处理非结构化数据。</p>
        <div class="mt-4 flex items-center text-sm text-green-600 font-medium">
          <span>添加连接</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
      </div>
      
      <!-- API 数据源 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-100 transition-colors">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">REST API</h3>
            <p class="text-sm text-gray-500">HTTP 接口</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">连接 REST API 接口，获取外部数据服务。</p>
        <div class="mt-4 flex items-center text-sm text-purple-600 font-medium">
          <span>添加连接</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- 已连接的数据源列表 -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">已连接的数据源</h3>
      </div>
      <div class="p-6">
        <div class="text-center py-12">
          <IconDatabase :size="48" color="#94a3b8" />
          <h4 class="text-lg font-medium text-gray-900 mt-4 mb-2">暂无数据源</h4>
          <p class="text-gray-500 mb-6">添加您的第一个数据源开始构建应用</p>
          <button class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            添加数据源
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 卡片悬停效果 */
.group:hover .group-hover\:bg-blue-100 {
  background-color: rgb(219 234 254);
}

.group:hover .group-hover\:bg-indigo-100 {
  background-color: rgb(224 231 255);
}

.group:hover .group-hover\:bg-green-100 {
  background-color: rgb(220 252 231);
}

.group:hover .group-hover\:bg-purple-100 {
  background-color: rgb(243 232 255);
}
</style>