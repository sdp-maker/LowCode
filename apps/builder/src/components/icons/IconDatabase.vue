<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-01-27 10:00:00
 * @Description: 数据库图标组件 - Glide 风格
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
      d="M4 7C4 4.79086 5.79086 3 8 3H16C18.2091 3 20 4.79086 20 7V17C20 19.2091 18.2091 21 16 21H8C5.79086 21 4 19.2091 4 17V7Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4 7H20"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 7V21"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 7V21"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      :fill="color"
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
