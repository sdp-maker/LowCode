<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 18:45:06
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3'




const chartContainer = ref<HTMLDivElement>()

onMounted(() => {
  if (chartContainer.value) {
    d3.select(chartContainer.value).append('svg').attr('width', 100).attr('height', 100).append('circle').attr('cx', 50).attr('cy', 50).attr('r', 40).style('fill', 'red')
  }
})
</script>

<template>
  <div>
    <div ref="chartContainer">d3</div>
  </div>
</template>

<style scoped></style>
