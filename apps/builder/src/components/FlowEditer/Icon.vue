<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 18:00:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 18:00:00
 * @FilePath: \LowCode\apps\builder\src\components\FlowEditer\Icon.vue
 * @Description: 图标组件
-->
<template>
    <svg :width="size" :height="size" :viewBox="viewBox" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Plus Icon -->
        <g v-if="name === 'plus'">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </g>

        <!-- Settings Icon -->
        <g v-else-if="name === 'settings'">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
            <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke="currentColor" stroke-width="2" />
        </g>

        <!-- Export Icon -->
        <g v-else-if="name === 'export'">
            <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </g>

        <!-- Save Icon -->
        <g v-else-if="name === 'save'">
            <path d="M19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H16L21 8V19A2 2 0 0 1 19 21Z" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            <polyline points="7,3 7,8 15,8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </g>

        <!-- Play Icon -->
        <g v-else-if="name === 'play'">
            <polygon points="5,3 19,12 5,21" fill="currentColor" />
        </g>

        <!-- Database Icon -->
        <g v-else-if="name === 'database'">
            <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2" />
            <path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" stroke="currentColor" stroke-width="2" />
            <path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" stroke="currentColor" stroke-width="2" />
        </g>

        <!-- Process Icon -->
        <g v-else-if="name === 'process'">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
            <circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="2" />
            <path d="M21 15L16 10L12 14L8 10L3 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </g>

        <!-- Default Icon -->
        <g v-else>
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    name: string
    size?: number | string
}>()

const size = props.size || 16
const viewBox = "0 0 24 24"
</script>
