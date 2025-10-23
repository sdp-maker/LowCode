<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:58:22
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开karoFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import NavigationDrawer from './NavigationDrawer.vue'
import ComponentsDrawer from './ComponentsDrawer.vue'
import { useDisclosure } from '@/hooks/useDisclosure'
import BlocksDrawer from './BlocksDrawer.vue'
const [isOpen, { toggle }] = useDisclosure(false)
</script>

<template>
  <div class="app-left-panel" :class="{ 'expanded': isOpen }">
    <div class="panel-section">
      <NavigationDrawer />
    </div>
    <div class="panel-section">
      <ComponentsDrawer />
      <div class="button-container">
        <button class="add-button" @click="toggle">+</button>
      </div>
    </div>
    <div class="app-left-sub-panel" v-if="isOpen">
      <div class="sub-panel-header">
        <h3>组件库</h3>
        <button class="close-button" @click="toggle">×</button>
      </div>
      <div class="sub-panel-content">
        <BlocksDrawer />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-left-panel {
  @apply bg-gray-50 h-full border-r border-gray-200 flex flex-col relative;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  width: 256px;
  transition: width 0.3s ease-in-out;
}

.app-left-panel.expanded {
  width: 576px; /* 256px + 320px */
}

.panel-section {
  @apply flex-1 h-1/2 relative;
  transition: flex 0.3s ease-in-out;
  overflow: hidden; /* 确保内容不会溢出 */
}

.app-left-panel.expanded .panel-section {
  flex: 0 0 50%;
}

.button-container {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 5; /* 确保在组件库区域内，但低于弹出面板 */
}

.add-button {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors duration-200;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
}

.app-left-sub-panel {
  @apply bg-white border-l border-gray-200 shadow-lg;
  width: 320px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.sub-panel-header {
  @apply bg-gray-100 border-b border-gray-200 px-4 py-3 flex justify-between items-center;
  flex-shrink: 0; /* 确保头部不会缩小 */
}

.sub-panel-header h3 {
  @apply text-gray-800 font-medium text-base m-0;
}

.close-button {
  @apply text-gray-500 hover:text-gray-700 text-xl font-bold bg-transparent border-none cursor-pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sub-panel-content {
  @apply p-4 flex-1;
  overflow-y: auto; /* 允许内容区域滚动 */
}
</style>
