<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 18:44:21
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import D3ChartRenderer from './D3ChartRenderer.vue'
import EchartsChartRenderer from './EchartsChartRenderer.vue'
import ZrenderChartRenderer from './ZrenderChartRenderer.vue'

const component = {
  d3: D3ChartRenderer,
  echarts: EchartsChartRenderer,
  zrender: ZrenderChartRenderer,
}
</script>

<template>
  <div>
    <component :is="component['echarts']" />
    <component :is="component['zrender']" />
    <component :is="component['d3']" />
  </div>
</template>

<style scoped></style>
