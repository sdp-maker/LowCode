<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-23 17:41:01
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-23 18:02:44
 * @FilePath: \LowCode\apps\builder\src\components\ChartRenderer\EchartsChartRenderer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <VChart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PolarComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { provide, defineProps, computed } from "vue";

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PolarComponent,
]);

provide(THEME_KEY, "light");

const props = defineProps<{
  chartType: 'line' | 'pie' | 'bar' | 'radial' | string,
  chartData: Record<string, any>
}>()

const option = computed(() => {
  const baseOption = {
    title: {
      text: props.chartData?.title?.text || '图表',
      left: "center",
    },
    tooltip: {},
    legend: {
      left: "left",
    },
    ...props.chartData
  };

  if (props.chartType === 'pie') {
    return {
      ...baseOption,
      legend: { ...baseOption.legend, orient: "vertical" },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
    };
  }

  if (props.chartType === 'line' || props.chartType === 'bar') {
    return {
      ...baseOption,
      legend: { ...baseOption.legend, orient: "horizontal", top: "bottom" },
      tooltip: {
        trigger: "axis",
      },
    };
  }

  // For radial chart and others
  return baseOption;
});
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
  min-height: 200px;
}
</style>