<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 17:20:14
 * @FilePath: \LowCode\apps\builder\src\blocks\SeparatorBlock.vue
 * @Description: 分隔符组件
-->
<template>
    <div class="separator-block" :style="separatorBlockStyle">
        <div v-if="props.separatorType === 'line'" class="separator-line" :style="lineStyle"></div>
        <div v-else-if="props.separatorType === 'text'" class="separator-text-wrapper">
            <div class="separator-line" :style="lineStyle"></div>
            <span class="separator-text" :style="textStyle">{{ props.text || '分隔符' }}</span>
            <div class="separator-line" :style="lineStyle"></div>
        </div>
        <div v-else-if="props.separatorType === 'space'" class="separator-space" :style="spaceStyle"></div>
        <div v-else-if="props.separatorType === 'dots'" class="separator-dots" :style="dotsStyle">
            <span v-for="i in 3" :key="i" class="dot"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
    separatorType?: 'line' | 'text' | 'space' | 'dots'
    text?: string
    color?: string
    thickness?: number
    width?: number
    style?: 'solid' | 'dashed' | 'dotted'
    marginTop?: number
    marginBottom?: number
    textColor?: string
    textSize?: number
}>()

const separatorBlockStyle = computed(() => ({
    marginTop: `${props.marginTop || 16}px`,
    marginBottom: `${props.marginBottom || 16}px`,
    width: '100%'
}))

const lineStyle = computed(() => ({
    borderTopColor: props.color || '#e5e7eb',
    borderTopWidth: `${props.thickness || 1}px`,
    borderTopStyle: props.style || 'solid',
    width: props.width ? `${props.width}%` : '100%'
}))

const textStyle = computed(() => ({
    color: props.textColor || '#6b7280',
    fontSize: `${props.textSize || 14}px`
}))

const spaceStyle = computed(() => ({
    height: `${props.thickness || 24}px`
}))

const dotsStyle = computed(() => ({
    color: props.color || '#9ca3af'
}))
</script>

<style scoped>
.separator-block {
    @apply flex items-center justify-center w-full;
}

.separator-line {
    @apply border-t flex-1;
}

.separator-text-wrapper {
    @apply flex items-center w-full;
}

.separator-text {
    @apply px-4 font-medium whitespace-nowrap;
}

.separator-space {
    @apply w-full;
}

.separator-dots {
    @apply flex items-center justify-center space-x-1;
}

.dot {
    @apply w-1 h-1 rounded-full bg-current;
}

/* 动画效果 */
.separator-dots .dot {
    animation: pulse 2s infinite;
}

.separator-dots .dot:nth-child(2) {
    animation-delay: 0.2s;
}

.separator-dots .dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.4;
    }

    50% {
        opacity: 1;
    }
}

/* 悬停效果 */
.separator-block:hover .separator-line {
    @apply transition-colors duration-200;
}

.separator-block:hover .separator-text {
    @apply transition-colors duration-200;
}
</style>
