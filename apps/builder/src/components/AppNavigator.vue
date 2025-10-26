<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 13:23:49
 * @FilePath: \LowCode\apps\builder\src\components\AppNavigator.vue
 * @Description: Glide 风格的现代化导航组件
-->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import IconDatabase from './icons/IconDatabase.vue';
import IconLayout from './icons/IconLayout.vue';
import IconAction from './icons/IconAction.vue';
import IconSettings from './icons/IconSettings.vue';
import { cachedViews } from '@/composables/useKeepAlive';

// 定义组件名称，用于keep-alive缓存
defineOptions({
  name: 'AppView'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="px-[16px]">
        <div class="flex justify-between items-center h-16">
          <!-- 左侧：Logo -->
          <div class="flex items-center gap-3">
            <!-- Logo图标 -->
            <div class="flex-shrink-0">
              <RouterLink to="/app" class="block   cursor-pointer">
                <img src="/logo.png" alt="Logo" class="w-8 h-8 rounded-lg object-cover " />
              </RouterLink>
            </div>

            <!-- 你的图片 -->
            <div class="flex-shrink-0">
              <img src="/src/assets/images/liuhua.jpg" alt="Avatar"
                class="w-8 h-8 rounded-full object-cover border-2 border-indigo-200 shadow-sm" />
            </div>

            <!-- 应用名称 -->
            <div class="flex-shrink-0">
              <RouterLink to="/app" class="block transition-colors duration-200 hover:text-indigo-600 cursor-pointer">
                <h1 class="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                  低代码平台</h1>
              </RouterLink>
            </div>
          </div>

          <!-- 中间：导航菜单 -->
          <nav class="flex items-center space-x-[8px] justify-center">
            <RouterLink to="/app/dataSource"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
              active-class="bg-indigo-50 text-indigo-600 shadow-sm">
              <IconDatabase :size="16" class="flex-shrink-0" />
              <span>数据源</span>
            </RouterLink>
            <RouterLink to="/app/layout"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
              active-class="bg-indigo-50 text-indigo-600 shadow-sm">
              <IconLayout :size="16" class="flex-shrink-0" />
              <span>布局</span>
            </RouterLink>
            <RouterLink to="/app/actions"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50"
              active-class="bg-indigo-50 text-indigo-600 shadow-sm">
              <IconAction :size="16" class="flex-shrink-0" />
              <span>动作</span>
            </RouterLink>
          </nav>

          <!-- 右侧：设置按钮 -->
          <div class="flex items-center">
            <button class="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
              <IconSettings :size="20" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <div class=" ">
      <div class="bg-white  shadow-sm  h-full overflow-hidden">
        <RouterView v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component" />
          </keep-alive>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Glide 风格的过渡动画 */
.router-link-active {
  @apply bg-indigo-50 text-indigo-600 shadow-sm;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
