<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-01-27 10:55:00
 * @FilePath: \LowCode\apps\builder\src\views\ActionsView.vue
 * @Description: Glide 风格的动作管理页面
-->
<script setup lang="ts">
import IconAction from '../components/icons/IconAction.vue';
</script>

<template>
  <div class="p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">动作管理</h2>
      <p class="text-gray-600">配置和管理应用的交互动作</p>
    </div>
    
    <!-- 动作类型选择 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- 数据操作动作 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">数据操作</h3>
            <p class="text-sm text-gray-500">CRUD 操作</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">创建、读取、更新和删除数据的操作，支持复杂的业务逻辑。</p>
        <div class="mt-4 flex items-center text-sm text-blue-600 font-medium">
          <span>创建动作</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- 页面导航动作 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-100 transition-colors">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">页面导航</h3>
            <p class="text-sm text-gray-500">路由跳转</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">配置页面间的导航跳转，支持参数传递和条件跳转。</p>
        <div class="mt-4 flex items-center text-sm text-indigo-600 font-medium">
          <span>创建动作</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- API 调用动作 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-100 transition-colors">
            <IconAction :size="24" color="#10b981" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">API 调用</h3>
            <p class="text-sm text-gray-500">外部接口</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">调用外部 API 接口，处理请求和响应数据。</p>
        <div class="mt-4 flex items-center text-sm text-green-600 font-medium">
          <span>创建动作</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- 表单提交动作 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-purple-100 transition-colors">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">表单提交</h3>
            <p class="text-sm text-gray-500">数据处理</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">处理表单数据提交，包括验证、转换和存储。</p>
        <div class="mt-4 flex items-center text-sm text-purple-600 font-medium">
          <span>创建动作</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- 条件判断动作 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-100 transition-colors">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">条件判断</h3>
            <p class="text-sm text-gray-500">逻辑控制</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">根据条件执行不同的逻辑分支，支持复杂的业务规则。</p>
        <div class="mt-4 flex items-center text-sm text-orange-600 font-medium">
          <span>创建动作</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- 消息通知动作 -->
      <div class="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-pink-200 transition-all duration-200 cursor-pointer">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-pink-100 transition-colors">
            <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828zM4.828 17l2.586-2.586a2 2 0 012.828 0L12.828 17H4.828z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">消息通知</h3>
            <p class="text-sm text-gray-500">用户反馈</p>
          </div>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed">显示消息通知、提示和确认对话框，提升用户体验。</p>
        <div class="mt-4 flex items-center text-sm text-pink-600 font-medium">
          <span>创建动作</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- 已创建的动作列表 -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">已创建的动作</h3>
      </div>
      <div class="p-6">
        <div class="text-center py-12">
          <IconAction :size="48" color="#94a3b8" />
          <h4 class="text-lg font-medium text-gray-900 mt-4 mb-2">暂无动作</h4>
          <p class="text-gray-500 mb-6">创建您的第一个动作来定义应用行为</p>
          <button class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            创建动作
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

.group:hover .group-hover\:bg-orange-100 {
  background-color: rgb(255 237 213);
}

.group:hover .group-hover\:bg-pink-100 {
  background-color: rgb(252 231 243);
}
</style>