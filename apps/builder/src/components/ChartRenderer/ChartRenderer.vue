<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 18:44:21
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import EchartsChartRenderer from './EchartsChartRenderer.vue'
import ZrenderChartRenderer from './ZrenderChartRenderer.vue'

// 定义props接口
const props = defineProps<{
    chartType?: string
    chartData?: Record<string, any>
}>()

const component = {
    echarts: EchartsChartRenderer,
    zrender: ZrenderChartRenderer,
}

// 为EchartsChartRenderer提供默认的props
const echartsProps = {
    chartType: props.chartType || 'line',
    chartData: props.chartData || {
        title: { text: '默认图表' },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value' },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line'
        }]
    }
}
</script>

<template>
    <div>
        <component :is="component['echarts']" v-bind="echartsProps" />
        <component :is="component['zrender']" />
    </div>
</template>

<style scoped></style>
