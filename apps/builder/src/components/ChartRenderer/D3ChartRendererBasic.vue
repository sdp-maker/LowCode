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

// 中国地图数据URL - 使用备用数据源
const chinaMapUrl = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
// 原始数据源作为备用
const fallbackMapUrl = 'https://gist.githubusercontent.com/zhulinpinyu/8e18d57b3b18fb74e776/raw/efbb74cfea53decb1fe7d6bf279fd351c28c4810/china_simplify.json'

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
  const loadMapData = (url: string, isFallback: boolean = false) => {
    d3.json(url).then((data: any) => {
      if (!data) {
        throw new Error('地图数据为空')
      }

      // 处理不同数据格式的数据结构
      const features = data.features || (data.type === 'FeatureCollection' ? data.features : null)
      if (!features || features.length === 0) {
        throw new Error('地图数据格式不正确')
      }

      // 绘制省份
      const provinces = g.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', path as any)
        .attr('fill', '#e6f3ff')
        .attr('stroke', '#4a90e2')
        .attr('stroke-width', 1)
        .attr('opacity', 0.8)
        .on('mouseover', function () {
          d3.select(this)
            .attr('fill', '#b3d9ff')
            .attr('opacity', 1)
        })
        .on('mouseout', function () {
          d3.select(this)
            .attr('fill', '#e6f3ff')
            .attr('opacity', 0.8)
        })

      // 添加省份标签 - 添加错误检查
      const labels = g.selectAll('text')
        .data(features)
        .enter()
        .append('text')
        .attr('transform', (d: any) => {
          try {
            const centroid = path.centroid(d)
            // 检查centroid是否有效
            if (isNaN(centroid[0]) || isNaN(centroid[1])) {
              return null // 返回null而不是无效的transform
            }
            return `translate(${centroid[0]},${centroid[1]})`
          } catch (e) {
  
            return null
          }
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', '#333')
        .text((d: any) => {
          // 尝试不同的属性名来获取省份名称
          return d.properties?.name || d.properties?.NAME || d.properties?.adname || ''
        })
        .filter(function () {
          // 过滤掉没有有效transform的文本元素
          return d3.select(this).attr('transform') !== null
        })
    }).catch(error => {
   

      // 如果不是备用数据源且加载失败，尝试加载备用数据源
      if (!isFallback) {
     
        loadMapData(fallbackMapUrl, true)
      } else {
        // 显示错误信息
        g.append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor', 'middle')
          .attr('font-size', '16px')
          .attr('fill', '#ff0000')
          .text('地图数据加载失败，请检查网络连接')
      }
    })
  }

  // 开始加载地图数据
  loadMapData(chinaMapUrl)
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