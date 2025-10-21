<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-01-27 10:00:00
 * @Description: 动作图标组件 - Glide 风格
-->
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  color?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 20,
  color: 'currentColor',
  className: ''
})
</script>
