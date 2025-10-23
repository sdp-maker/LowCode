<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 18:41:19
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as zrender from 'zrender'

const chartContainer = ref<HTMLDivElement | null>(null)
let zr: zrender.ZRenderType | null = null

onMounted(() => {
  zr = zrender.init(chartContainer.value, {
    renderer: 'canvas',
  })
  const width = zr.getWidth()
  const height = zr.getHeight()

  // 简约渐变背景
  const bgGradient = new zrender.Rect({
    shape: {
      x: 0,
      y: 0,
      width: width,
      height: height,
    },
    style: {
      fill: new zrender.LinearGradient(0, 0, width as number, height as number, [
        { offset: 0, color: 'rgba(99, 102, 241, 0.05)' },
        { offset: 1, color: 'rgba(167, 139, 250, 0.05)' },
      ]),
    },
  })
  zr.add(bgGradient)

  // 主文本元素 - 确保始终清晰可见
  const t1 = new zrender.Text({
    style: {
      text: '小鸟游六花',
      align: 'center',
      verticalAlign: 'middle',
      fontSize: 24,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: '#333333', // 使用深色确保可读性
      x: (width as number) / 2 + 5,
      y: (height as number) / 2,
    },
  })
  zr.add(t1)
})

onUnmounted(() => {
  if (zr) {
    zr.dispose()
  }
})
</script>

<template>
  <div class="chart-container">
    <div class="canvas" ref="chartContainer"></div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.chart-container:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.12);
}

.canvas {
  width: 100%;
  height: 100px;
  border-radius: 6px;
  background: #ffffff;
  box-shadow:  0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chart-container {
    padding: 4px;
  }

  .canvas {
    height: 80px;
  }
}
</style>
