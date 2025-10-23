<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 22:10:42
 * @FilePath: \LowCode\apps\builder\src\views\AppView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import AppNavigator from '@/components/AppNavigator.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="app-wrapper">
    <header>
      <AppNavigator />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  position: fixed;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

main {
  height: calc(100% - 48px);
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条样式 */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>