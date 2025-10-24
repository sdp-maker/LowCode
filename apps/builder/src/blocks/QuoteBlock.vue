<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-24 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-24 17:20:14
 * @FilePath: \LowCode\apps\builder\src\blocks\QuoteBlock.vue
 * @Description: 引言组件
-->
<template>
  <blockquote class="quote-block" :style="quoteStyle" :class="quoteClass">
    <div v-if="props.showIcon" class="quote-icon" :style="iconStyle">
      {{ props.icon || '"' }}
    </div>
    <div class="quote-content">
      <p class="quote-text" :style="textStyle">{{ props.content || '这是一段引言内容。' }}</p>
      <footer v-if="props.author || props.source" class="quote-footer" :style="footerStyle">
        <span v-if="props.author">{{ props.authorPrefix || '—' }} {{ props.author }}</span>
        <span v-if="props.source" class="quote-source">{{ props.source }}</span>
      </footer>
    </div>
  </blockquote>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  content?: string
  author?: string
  source?: string
  authorPrefix?: string
  showIcon?: boolean
  icon?: string
  quoteStyle?: 'default' | 'modern' | 'minimal' | 'bordered'
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  authorColor?: string
  fontSize?: number
  padding?: number
  borderWidth?: number
  borderRadius?: number
  italic?: boolean
}>()

const quoteStyle = computed(() => ({
  backgroundColor: props.backgroundColor || '#f9fafb',
  borderLeftColor: props.borderColor || '#6b7280',
  borderLeftWidth: `${props.borderWidth || 4}px`,
  borderRadius: `${props.borderRadius || 0}px`,
  padding: `${props.padding || 16}px`,
  fontStyle: props.italic !== false ? 'italic' : 'normal'
}))

const quoteClass = computed(() => ({
  'quote-block--modern': props.quoteStyle === 'modern',
  'quote-block--minimal': props.quoteStyle === 'minimal',
  'quote-block--bordered': props.quoteStyle === 'bordered'
}))

const textStyle = computed(() => ({
  color: props.textColor || '#374151',
  fontSize: `${props.fontSize || 16}px`
}))

const footerStyle = computed(() => ({
  color: props.authorColor || '#6b7280'
}))

const iconStyle = computed(() => ({
  color: props.borderColor || '#6b7280'
}))
</script>

<style scoped>
.quote-block {
  @apply border-l-4 transition-all duration-200;
}

.quote-block--modern {
  @apply bg-gradient-to-r from-blue-50 to-indigo-50 border-l-blue-400 rounded-lg shadow-sm;
}

.quote-block--minimal {
  @apply bg-transparent border-l-gray-300;
}

.quote-block--bordered {
  @apply border border-gray-200 rounded-lg shadow-sm;
}

.quote-content {
  @apply flex-1;
}

.quote-icon {
  @apply text-3xl font-bold mb-2 opacity-50;
}

.quote-text {
  @apply mb-3 leading-relaxed;
}

.quote-footer {
  @apply text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1;
}

.quote-source {
  @apply text-xs opacity-75;
}

/* 悬停效果 */
.quote-block:hover {
  @apply transform scale-[1.01] transition-transform duration-200;
}

.quote-block--modern:hover {
  @apply shadow-md;
}
</style>
