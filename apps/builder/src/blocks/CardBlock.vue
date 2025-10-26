<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 17:20:14
 * @FilePath: \LowCode\apps\builder\src\blocks\CardBlock.vue
 * @Description: 卡片组件
-->
<template>
    <div class="card-block" :style="cardStyle">
        <div v-if="props.showImage && props.imageUrl" class="card-image">
            <img :src="props.imageUrl" :alt="props.imageAlt || '卡片图片'" />
        </div>
        <div class="card-content">
            <h3 v-if="props.title" class="card-title">{{ props.title }}</h3>
            <p v-if="props.description" class="card-description">{{ props.description }}</p>
            <div v-if="props.showButton" class="card-actions">
                <button :class="buttonClass" @click="handleButtonClick">
                    {{ props.buttonText || '了解更多' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
    title?: string
    description?: string
    imageUrl?: string
    imageAlt?: string
    showImage?: boolean
    showButton?: boolean
    buttonText?: string
    buttonType?: 'primary' | 'secondary' | 'outline'
    backgroundColor?: string
    borderColor?: string
    borderRadius?: number
    padding?: number
    shadow?: boolean
}>()

const cardStyle = computed(() => ({
    backgroundColor: props.backgroundColor || '#ffffff',
    borderColor: props.borderColor || '#e5e7eb',
    borderRadius: `${props.borderRadius || 8}px`,
    padding: `${props.padding || 16}px`,
    boxShadow: props.shadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
}))

const buttonClass = computed(() => {
    const baseClass = 'card-button'
    switch (props.buttonType) {
        case 'primary':
            return `${baseClass} ${baseClass}--primary`
        case 'secondary':
            return `${baseClass} ${baseClass}--secondary`
        case 'outline':
            return `${baseClass} ${baseClass}--outline`
        default:
            return `${baseClass} ${baseClass}--primary`
    }
})

function handleButtonClick() {
    console.log('Card button clicked')
}
</script>

<style scoped>
.card-block {
    @apply overflow-hidden;
    border: none;
}

.card-image {
    @apply w-full h-48 overflow-hidden;
}

.card-image img {
    @apply w-full h-full object-cover;
}

.card-content {
    @apply p-4;
}

.card-title {
    @apply text-lg font-semibold text-gray-900 mb-2;
}

.card-description {
    @apply text-gray-600 text-sm mb-4 leading-relaxed;
}

.card-actions {
    @apply flex justify-end;
}

.card-button {
    @apply px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer;
}

.card-button--primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
}

.card-button--secondary {
    @apply bg-gray-500 text-white hover:bg-gray-600;
}

.card-button--outline {
    @apply border border-blue-500 text-blue-500 hover:bg-blue-50;
}
</style>
