<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 13:47:08
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">

</script>

<template>
 <div class="navigation-drawer h-full flex flex-col h-[200px]">
   <div class="drawer-header">
     <h3 class="header-title">导航</h3>
   </div>
  
 </div>
</template>

<style scoped>




.header-title {
  @apply text-sm font-semibold text-gray-800;
}

.drawer-content {
  @apply flex-1 p-2;
  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

/* Webkit 滚动条样式 */
.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

.nav-item {
  @apply flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors;
}

.nav-item.active {
  @apply bg-blue-50 text-blue-700;
}

.nav-icon {
  @apply w-5 h-5 mr-3;
}
</style>
