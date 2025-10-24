<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 17:20:14
 * @FilePath: \LowCode\apps\builder\src\blocks\NotesBlock.vue
 * @Description: 笔记组件
-->
<template>
  <div class="notes-block" :style="notesStyle" :class="notesClass">
    <div class="notes-header" v-if="props.showHeader">
      <div class="notes-icon" :style="iconStyle">
        {{ props.icon || '📝' }}
      </div>
      <h4 v-if="props.title" class="notes-title" :style="titleStyle">{{ props.title }}</h4>
    </div>
    <div class="notes-content" :style="contentStyle">
      <p class="notes-text">{{ props.content || '这是一条笔记内容。你可以在这里记录重要信息。' }}</p>
    </div>
    <div v-if="props.showTimestamp" class="notes-footer">
      <span class="notes-timestamp">{{ formattedTimestamp }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  title?: string
  content?: string
  icon?: string
  showHeader?: boolean
  showTimestamp?: boolean
  timestamp?: string | Date
  noteType?: 'info' | 'warning' | 'success' | 'error' | 'note'
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  titleColor?: string
  borderRadius?: number
  padding?: number
  fontSize?: number
}>()

const notesStyle = computed(() => {
  const typeColors = {
    info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af' },
    warning: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e' },
    success: { bg: '#f0fdf4', border: '#10b981', text: '#065f46' },
    error: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
    note: { bg: '#fefce8', border: '#eab308', text: '#a16207' }
  }

  const colors = typeColors[props.noteType || 'note']

  return {
    backgroundColor: props.backgroundColor || colors.bg,
    borderColor: props.borderColor || colors.border,
    color: props.textColor || colors.text,
    borderRadius: `${props.borderRadius || 8}px`,
    padding: `${props.padding || 16}px`
  }
})

const notesClass = computed(() => ({
  [`notes-block--${props.noteType || 'note'}`]: true
}))

const titleStyle = computed(() => ({
  color: props.titleColor || 'inherit',
  fontSize: `${(props.fontSize || 14) + 2}px`
}))

const contentStyle = computed(() => ({
  fontSize: `${props.fontSize || 14}px`
}))

const iconStyle = computed(() => ({
  fontSize: `${(props.fontSize || 14) + 4}px`
}))

const formattedTimestamp = computed(() => {
  if (!props.timestamp) return new Date().toLocaleString()

  const date = typeof props.timestamp === 'string' ? new Date(props.timestamp) : props.timestamp
  return date.toLocaleString()
})
</script>

<style scoped>
.notes-block {
  @apply border rounded-lg transition-all duration-200;
}

.notes-block:hover {
  @apply shadow-md transform scale-[1.01];
}

.notes-header {
  @apply flex items-center gap-2 mb-3;
}

.notes-icon {
  @apply flex-shrink-0;
}

.notes-title {
  @apply font-semibold flex-1;
}

.notes-content {
  @apply mb-2;
}

.notes-text {
  @apply leading-relaxed;
}

.notes-footer {
  @apply pt-2 border-t border-current border-opacity-20;
}

.notes-timestamp {
  @apply text-xs opacity-75;
}

/* 类型特定样式 */
.notes-block--info {
  @apply border-blue-200;
}

.notes-block--warning {
  @apply border-yellow-200;
}

.notes-block--success {
  @apply border-green-200;
}

.notes-block--error {
  @apply border-red-200;
}

.notes-block--note {
  @apply border-yellow-200;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .notes-header {
    @apply flex-col items-start gap-1;
  }
}
</style>
