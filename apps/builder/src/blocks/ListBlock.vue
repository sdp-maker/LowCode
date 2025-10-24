<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 17:20:14
 * @FilePath: \LowCode\apps\builder\src\blocks\ListBlock.vue
 * @Description: 列表组件
-->
<template>
    <div class="list-block" :style="listStyle">
        <h3 v-if="props.title" class="list-title">{{ props.title }}</h3>
        <component :is="listTag" class="list-content">
            <li v-for="(item, index) in listItems" :key="index" class="list-item" :style="itemStyle">
                <span v-if="props.showIcon" class="list-icon">{{ props.icon || '•' }}</span>
                <span class="list-text">{{ item }}</span>
            </li>
        </component>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
    title?: string
    items?: string[]
    listType?: 'unordered' | 'ordered' | 'none'
    showIcon?: boolean
    icon?: string
    itemSpacing?: number
    textColor?: string
    backgroundColor?: string
    borderColor?: string
    borderRadius?: number
    padding?: number
}>()

const listItems = computed(() => {
    return props.items || ['列表项 1', '列表项 2', '列表项 3']
})

const listTag = computed(() => {
    switch (props.listType) {
        case 'ordered':
            return 'ol'
        case 'unordered':
        case 'none':
        default:
            return 'ul'
    }
})

const listStyle = computed(() => ({
    backgroundColor: props.backgroundColor || 'transparent',
    borderColor: props.borderColor || 'transparent',
    borderRadius: `${props.borderRadius || 0}px`,
    padding: `${props.padding || 16}px`,
    color: props.textColor || '#374151'
}))

const itemStyle = computed(() => ({
    marginBottom: `${props.itemSpacing || 8}px`
}))
</script>

<style scoped>
.list-block {
    @apply w-full;
}

.list-title {
    @apply text-lg font-semibold mb-3 text-gray-900;
}

.list-content {
    @apply space-y-2;
    list-style: none;
    padding: 0;
    margin: 0;
}

.list-content[data-type="ordered"] {
    counter-reset: list-counter;
}

.list-item {
    @apply flex items-start;
}

.list-icon {
    @apply mr-2 text-blue-500 font-medium flex-shrink-0;
    min-width: 1rem;
}

.list-text {
    @apply flex-1 leading-relaxed;
}

/* 有序列表样式 */
ol.list-content {
    counter-reset: list-counter;
}

ol.list-content .list-item {
    counter-increment: list-counter;
}

ol.list-content .list-item .list-icon::before {
    content: counter(list-counter) ".";
}

/* 无序列表样式 */
ul.list-content .list-item .list-icon {
    @apply text-gray-400;
}

/* 无样式列表 */
.list-content[data-type="none"] .list-icon {
    display: none;
}
</style>
