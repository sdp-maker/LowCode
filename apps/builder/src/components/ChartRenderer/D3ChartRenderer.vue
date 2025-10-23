<template>
  <div class="d3-chart-container">
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as d3 from 'd3'

const chartContainer = ref<HTMLElement>()
let svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null

// 中国地图数据URL
const chinaMapUrl = 'https://gist.githubusercontent.com/zhulinpinyu/8e18d57b3b18fb74e776/raw/efbb74cfea53decb1fe7d6bf279fd351c28c4810/china_simplify.json'

onMounted(() => {
  if (!chartContainer.value) return

  // 设置SVG尺寸
  const width = chartContainer.value.clientWidth
  const height = chartContainer.value.clientHeight

  // 创建SVG
  svg = d3.select(chartContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // 创建投影
  const projection = d3.geoMercator()
    .center([104, 38]) // 中国中心经纬度
    .scale(width * 0.8) // 根据容器宽度调整缩放
    .translate([width / 2, height / 2])

  // 创建路径生成器
  const path = d3.geoPath().projection(projection)

  // 创建缩放行为
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 8])
    .on('zoom', (event) => {
      svg?.select('g').attr('transform', event.transform)
    })

  svg.call(zoom)

  // 添加容器组
  const g = svg.append('g')

  // 加载地图数据
  d3.json(chinaMapUrl).then((data: any) => {
    if (!data) return

    // 绘制省份
    const provinces = g.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', path as any)
      .attr('fill', '#e6f3ff')
      .attr('stroke', '#4a90e2')
      .attr('stroke-width', 1)
      .attr('opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this)
          .attr('fill', '#b3d9ff')
          .attr('opacity', 1)
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('fill', '#e6f3ff')
          .attr('opacity', 0.8)
      })

    // 添加省份标签
    const labels = g.selectAll('text')
      .data(data.features)
      .enter()
      .append('text')
      .attr('transform', (d: any) => {
        const centroid = path.centroid(d)
        return `translate(${centroid})`
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .text((d: any) => d.properties.name || d.properties.NAME || '')
  }).catch(error => {
    
    // 显示错误信息
    g.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', '#ff0000')
      .text('地图数据加载失败，请检查网络连接')
  })
})

// 处理窗口大小变化
const handleResize = () => {
  if (!chartContainer.value || !svg) return

  const width = chartContainer.value.clientWidth
  const height = chartContainer.value.clientHeight

  svg.attr('width', width).attr('height', height)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (svg) {
    svg.remove()
    svg = null
  }
})
</script>

<style scoped>
.d3-chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 4px;
  overflow: hidden;
}
</style>