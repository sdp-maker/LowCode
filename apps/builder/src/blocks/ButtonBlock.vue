<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:31:33
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    buttonText?: string
    buttonType?: 'primary' | 'secondary' | 'danger'
    width?: number
    height?: number
    backgroundColor?: string
    color?: string
}>()

const buttonStyle = computed(() => {
    console.log('ButtonBlock props:', props)

    // 根据按钮类型设置默认颜色
    const getDefaultColors = (type: string) => {
        switch (type) {
            case 'primary':
                return { bg: '#3b82f6', text: '#ffffff' }
            case 'secondary':
                return { bg: '#6b7280', text: '#ffffff' }
            case 'danger':
                return { bg: '#ef4444', text: '#ffffff' }
            default:
                return { bg: '#3b82f6', text: '#ffffff' }
        }
    }

    const defaultColors = getDefaultColors(props.buttonType || 'primary')

    // 如果用户没有手动设置背景色，使用按钮类型的默认颜色
    const backgroundColor = props.backgroundColor === '#3b82f6' ? defaultColors.bg : (props.backgroundColor || defaultColors.bg)

    return {
        width: `${props.width || 120}px`,
        height: `${props.height || 40}px`,
        backgroundColor: backgroundColor,
        color: props.color || defaultColors.text,
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    }
})

const buttonClass = computed(() => {
    return 'button-block'
})
</script>

<template>
    <button :class="buttonClass" :style="buttonStyle">
        {{ buttonText || 'Click me' }}
    </button>
</template>

<style scoped>
.button-block {
    @apply transition-colors duration-200;
}

.button-block:hover {
    opacity: 0.9;
}

.button-block:active {
    transform: translateY(1px);
}

.button-primary {
    @apply bg-blue-500 text-white;
}

.button-secondary {
    @apply bg-gray-500 text-white;
}

.button-danger {
    @apply bg-red-500 text-white;
}
</style>