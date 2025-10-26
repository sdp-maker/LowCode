<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 17:49:05
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { defineProps } from 'vue'
import EchartsChartRenderer from '@/components/ChartRenderer/EchartsChartRenderer.vue'

// 定义props
const props = defineProps<{
    chartType: 'line' | 'pie' | 'bar' | 'radial' | string,
    chartData: Record<string, any>
}>()
</script>

<template>
    <div class="chart-block-wrapper">
        <EchartsChartRenderer
            v-if="props.chartType === 'line' || props.chartType === 'pie' || props.chartType === 'bar' || props.chartType === 'radial'"
            :chart-type="props.chartType" :chart-data="props.chartData" />
        <div v-else class="chart-placeholder">
            <p>未知的图表类型: {{ props.chartType }}</p>
        </div>
    </div>
</template>

<style scoped>
.chart-block-wrapper {
    width: 100%;
    height: 400px;
    /* 您可以根据需要调整默认高度 */
}

.chart-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #999;
    background-color: #f5f5f5;
    border: none;
}
</style>