<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 17:20:14
 * @FilePath: \LowCode\apps\builder\src\blocks\ContainerBlock.vue
 * @Description: 容器组件
-->
<template>
    <div class="container-block" :style="containerStyle" :class="containerClass">
        <div v-if="props.title" class="container-header">
            <h3 class="container-title">{{ props.title }}</h3>
        </div>
        <div class="container-content" :style="contentStyle">
            <div v-if="!hasContent" class="container-placeholder">
                <div class="placeholder-icon">📦</div>
                <p class="placeholder-text">{{ props.placeholder || '拖拽组件到这里' }}</p>
            </div>
            <slot v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, useSlots } from 'vue'

const props = defineProps<{
    title?: string
    placeholder?: string
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
    borderStyle?: 'solid' | 'dashed' | 'dotted'
    borderRadius?: number
    padding?: number
    margin?: number
    minHeight?: number
    maxHeight?: number
    flexDirection?: 'row' | 'column'
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
    gap?: number
    shadow?: boolean
}>()

const slots = useSlots()

const hasContent = computed(() => {
    return slots.default && slots.default().length > 0
})

const containerStyle = computed(() => ({
    backgroundColor: props.backgroundColor || '#ffffff',
    borderColor: props.borderColor || '#e5e7eb',
    borderWidth: `${props.borderWidth || 1}px`,
    borderStyle: props.borderStyle || 'solid',
    borderRadius: `${props.borderRadius || 8}px`,
    padding: `${props.padding || 16}px`,
    margin: `${props.margin || 0}px`,
    minHeight: props.minHeight ? `${props.minHeight}px` : '120px',
    maxHeight: props.maxHeight ? `${props.maxHeight}px` : 'none',
    boxShadow: props.shadow ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none'
}))

const contentStyle = computed(() => ({
    display: 'flex',
    flexDirection: props.flexDirection || 'column',
    justifyContent: props.justifyContent || 'flex-start',
    alignItems: props.alignItems || 'stretch',
    gap: `${props.gap || 8}px`,
    height: '100%'
}))

const containerClass = computed(() => {
    return {
        'container-block--empty': !hasContent.value
    }
})
</script>

<style scoped>
.container-block {
    @apply w-full transition-all duration-200;
}

.container-block--empty {
    @apply border-dashed;
}

.container-block--empty:hover {
    @apply border-blue-300 bg-blue-50;
}

.container-header {
    @apply mb-3 pb-2 border-b border-gray-200;
}

.container-title {
    @apply text-lg font-semibold text-gray-900;
}

.container-content {
    @apply w-full;
}

.container-placeholder {
    @apply flex flex-col items-center justify-center py-8 text-gray-400;
}

.placeholder-icon {
    @apply text-3xl mb-2;
}

.placeholder-text {
    @apply text-sm font-medium;
}

/* 响应式设计 */
@media (max-width: 640px) {
    .container-content {
        flex-direction: column !important;
    }
}
</style>
