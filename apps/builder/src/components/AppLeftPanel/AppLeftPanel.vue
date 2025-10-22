<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 13:45:15
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import NavigationDrawer from './NavigationDrawer.vue';
import ComponentsDrawer from './ComponentsDrawer.vue';



</script>

<template>
 <div class="app-left-panel">
  <div class="panel-section">
    <NavigationDrawer />
  </div>
  <div class="panel-section">
    <ComponentsDrawer />
  </div>
 </div>
</template>

<style scoped>
.app-left-panel {
  @apply bg-gray-50 w-64 h-full border-r border-gray-200 flex flex-col;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.panel-section {
  @apply flex-1 h-1/2;
}
</style>