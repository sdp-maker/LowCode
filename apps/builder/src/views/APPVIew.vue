<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 20:30:56
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 20:54:23
 * @FilePath: \LowCode\apps\builder\src\views\AppView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import AppNavigator from '@/components/AppNavigator.vue'
import {RouterView} from 'vue-router'
</script>
<template>
  <div>
    <AppNavigator />
  </div>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>