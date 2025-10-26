<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 15:30:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-26 15:30:00
 * @FilePath: \LowCode\apps\builder\src\blocks\RichEditorBlock.vue
 * @Description: 飞书风格富文本编辑器组件
-->
<template>
    <div class="rich-editor-block" :style="editorStyle">
        <div v-if="props.showTitle && props.title" class="editor-header">
            <h3 class="editor-title">{{ props.title }}</h3>
        </div>
        <div class="editor-container">
            <QuillEditor ref="quillEditor" :content="content" :options="editorOptions" :style="quillStyle"
                @update:content="handleContentChange" @selection-change="handleSelectionChange"
                @editor-change="handleEditorChange" @focus="handleFocus" @blur="handleBlur" />
        </div>
        <div v-if="showWordCount" class="editor-footer">
            <span class="word-count">{{ wordCount }} 字</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, defineProps, defineEmits } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps<{
    initialContent?: string
    title?: string
    showTitle?: boolean
    minHeight?: number
    maxHeight?: number
    placeholder?: string
    readOnly?: boolean
    theme?: 'snow' | 'bubble'
    showWordCount?: boolean
    backgroundColor?: string
    borderRadius?: number
    padding?: number
    shadow?: boolean
    toolbar?: 'basic' | 'full' | 'minimal'
}>()

const emit = defineEmits<{
    'update:content': [content: string]
    'word-count-change': [count: number]
    'focus': []
    'blur': []
}>()

const quillEditor = ref<any>(null)
const content = ref(props.initialContent || '')
const wordCount = ref(0)
const isFocused = ref(false)

// 计算编辑器样式
const editorStyle = computed(() => ({
    backgroundColor: props.backgroundColor || 'transparent',
    borderRadius: `${props.borderRadius || 16}px`,
    padding: `${props.padding || 0}px`,
    boxShadow: props.shadow !== false ? 'var(--shadow-lg)' : 'none',
    minHeight: props.minHeight ? `${props.minHeight}px` : '200px',
    maxHeight: props.maxHeight ? `${props.maxHeight}px` : 'none',
    overflow: 'hidden'
}))

const quillStyle = computed(() => ({
    minHeight: props.minHeight ? `${props.minHeight - 80}px` : '120px',
    maxHeight: props.maxHeight ? `${props.maxHeight - 80}px` : 'none'
}))

// 工具栏配置 - 简化版本
const getToolbarConfig = (toolbarType: string) => {
    switch (toolbarType) {
        case 'minimal':
            return [
                ['bold', 'italic', 'strike'],
                [{ 'color': ['#401f3e', '#3f2e56', '#faf2a1', '#759aab', '#FD9170', '#453f78', '#68CEF8', '#80cbc4', '#9DEF8F'] }]
            ]
        case 'basic':
            return [
                ['bold', 'italic', 'strike'],
                [{ 'color': ['#401f3e', '#3f2e56', '#faf2a1', '#759aab', '#FD9170', '#453f78', '#68CEF8', '#80cbc4', '#9DEF8F'] }]
            ]
        case 'full':
            return [
                ['bold', 'italic', 'strike'],
                [{ 'color': ['#401f3e', '#3f2e56', '#faf2a1', '#759aab', '#FD9170', '#453f78', '#68CEF8', '#80cbc4', '#9DEF8F'] }]
            ]
        default:
            return [
                ['bold', 'italic', 'strike'],
                [{ 'color': ['#401f3e', '#3f2e56', '#faf2a1', '#759aab', '#FD9170', '#453f78', '#68CEF8', '#80cbc4', '#9DEF8F'] }]
            ]
    }
}

// 编辑器配置
const editorOptions = computed(() => ({
    theme: props.theme || 'snow',
    placeholder: props.placeholder || '开始输入...',
    readOnly: props.readOnly || false,
    modules: {
        toolbar: getToolbarConfig(props.toolbar || 'basic'),
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
        }
    }
}))

// 计算字数
const calculateWordCount = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, '')
    return text.length
}

// 事件处理
const handleContentChange = (newContent: string) => {
    content.value = newContent
    wordCount.value = calculateWordCount(newContent)
    emit('update:content', newContent)
    emit('word-count-change', wordCount.value)
}

const handleSelectionChange = (range: any) => {
    // 处理选择变化
}

const handleEditorChange = (eventName: string, ...args: any[]) => {
    // 处理编辑器变化事件
}

const handleFocus = () => {
    isFocused.value = true
    emit('focus')
}

const handleBlur = () => {
    isFocused.value = false
    emit('blur')
}

// 监听初始内容变化
watch(() => props.initialContent, (newContent) => {
    if (newContent !== content.value) {
        content.value = newContent || ''
        wordCount.value = calculateWordCount(content.value)
    }
}, { immediate: true })

// 组件挂载后初始化
onMounted(() => {
    if (content.value) {
        wordCount.value = calculateWordCount(content.value)
    }

    // 确保QuillEditor正确设置初始内容
    if (quillEditor.value && props.initialContent) {
        setTimeout(() => {
            if (quillEditor.value) {
                quillEditor.value.setHTML(props.initialContent)
                content.value = props.initialContent
                wordCount.value = calculateWordCount(props.initialContent)
            }
        }, 100)
    }
})

// 计算属性
const showWordCount = computed(() => props.showWordCount !== false)

// 暴露给父组件的方法
defineExpose({
    getContent: () => content.value,
    setContent: (newContent: string) => {
        content.value = newContent
        if (quillEditor.value) {
            quillEditor.value.setHTML(newContent)
        }
    },
    getWordCount: () => wordCount.value,
    focus: () => {
        if (quillEditor.value) {
            quillEditor.value.focus()
        }
    },
    blur: () => {
        if (quillEditor.value) {
            quillEditor.value.blur()
        }
    }
})
</script>

<style scoped>
.rich-editor-block {
    @apply w-full;
    background: #ffffff;
    border: none;
    position: relative;
    overflow: hidden;
}

.editor-header {
    @apply px-6 py-4 border-b border-gray-100;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.editor-title {
    @apply text-lg font-semibold m-0;
    color: var(--color-text-dark);
    font-family: var(--font-family-display);
}

.editor-container {
    @apply relative;
    background: var(--color-white);
}

.editor-footer {
    @apply px-6 py-2 border-t border-gray-100 flex justify-end;
    background: var(--color-gray-50);
}

.word-count {
    @apply text-xs text-gray-500;
    font-family: var(--font-family-mono);
}

/* Quill 编辑器样式覆盖 - 飞书风格 */
:deep(.ql-editor) {
    @apply p-4;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    border: none !important;
    outline: none !important;
    background: #ffffff;
    min-height: 120px;
}

:deep(.ql-editor.ql-blank::before) {
    color: #999;
    font-style: normal;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

:deep(.ql-toolbar) {
    border: none;
    background: #F7F8FA;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 4px;
}

:deep(.ql-toolbar .ql-formats) {
    margin-right: 8px;
    display: flex;
    align-items: center;
    gap: 2px;
}

:deep(.ql-toolbar button) {
    @apply transition-all duration-200;
    border-radius: 4px;
    padding: 6px;
    margin: 0 1px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: #666;
}

:deep(.ql-toolbar button:hover) {
    background: #f5f5f5;
    color: #333;
}

:deep(.ql-toolbar button.ql-active) {
    background: #e3f2fd;
    color: #1976d2;
}

:deep(.ql-toolbar .ql-stroke) {
    stroke: currentColor;
}

:deep(.ql-toolbar .ql-fill) {
    fill: currentColor;
}

:deep(.ql-container) {
    border: none !important;
    font-family: var(--font-family-sans);
    position: relative;
}

/* 文本样式优化 */
:deep(.ql-editor h1) {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-dark);
    margin: 1.5em 0 0.5em;
    line-height: 1.2;
    letter-spacing: -0.025em;
}

:deep(.ql-editor h2) {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text-dark);
    margin: 1.25em 0 0.5em;
    line-height: 1.3;
    letter-spacing: -0.02em;
}

:deep(.ql-editor h3) {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 1em 0 0.5em;
    line-height: 1.4;
}

:deep(.ql-editor p) {
    margin: 0.75em 0;
    line-height: 1.6;
    color: var(--color-text);
}

:deep(.ql-editor blockquote) {
    border-left: 4px solid var(--color-primary-400);
    margin: 1.5em 0;
    padding: 0.75em 1.5em;
    background: linear-gradient(135deg, var(--color-primary-50), var(--color-primary-25));
    border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
    font-style: italic;
    position: relative;
}

:deep(.ql-editor blockquote::before) {
    content: '“';
    font-size: 3em;
    color: var(--color-primary-300);
    position: absolute;
    top: -10px;
    left: 10px;
    line-height: 1;
    opacity: 0.5;
}

:deep(.ql-editor ul, .ql-editor ol) {
    margin: 1em 0;
    padding-left: 1.5em;
}

:deep(.ql-editor li) {
    margin: 0.5em 0;
    line-height: 1.5;
}

:deep(.ql-editor strong) {
    font-weight: 600;
    color: var(--color-text-dark);
}

:deep(.ql-editor em) {
    font-style: italic;
    color: var(--color-text);
}

:deep(.ql-editor u) {
    text-decoration: underline;
    text-decoration-color: var(--color-primary-400);
    text-underline-offset: 2px;
}

:deep(.ql-editor a) {
    color: var(--color-primary-600);
    text-decoration: none;
    border-bottom: 1px solid var(--color-primary-200);
    transition: all 0.2s ease;
}

:deep(.ql-editor a:hover) {
    color: var(--color-primary-700);
    border-bottom-color: var(--color-primary-400);
}

:deep(.ql-editor code) {
    background: var(--color-gray-100);
    padding: 0.2em 0.4em;
    border-radius: var(--border-radius);
    font-family: var(--font-family-mono);
    font-size: 0.9em;
    color: var(--color-primary-700);
}

:deep(.ql-editor pre) {
    background: var(--color-gray-900);
    color: var(--color-gray-100);
    padding: 1.5em;
    border-radius: var(--border-radius-sm);
    margin: 1.5em 0;
    overflow-x: auto;
    font-family: var(--font-family-mono);
    font-size: 0.9em;
    line-height: 1.5;
}

/* 自定义滚动条 */
:deep(.ql-editor::-webkit-scrollbar) {
    width: 6px;
}

:deep(.ql-editor::-webkit-scrollbar-track) {
    background: var(--color-gray-100);
    border-radius: 3px;
}

:deep(.ql-editor::-webkit-scrollbar-thumb) {
    background: var(--color-gray-300);
    border-radius: 3px;
}

:deep(.ql-editor::-webkit-scrollbar-thumb:hover) {
    background: var(--color-gray-400);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .rich-editor-block {
        border-radius: var(--border-radius-sm);
        margin: 0 -4px;
    }

    .editor-header,
    .editor-footer {
        @apply px-4 py-3;
    }

    :deep(.ql-editor) {
        @apply p-4;
        font-size: 0.9rem;
    }

    :deep(.ql-toolbar) {
        padding: 12px;
        flex-wrap: wrap;
        gap: 8px;
    }

    :deep(.ql-toolbar .ql-formats) {
        margin-right: 6px;
        margin-bottom: 6px;
    }

    :deep(.ql-editor h1) {
        font-size: 1.75rem;
    }

    :deep(.ql-editor h2) {
        font-size: 1.4rem;
    }

    :deep(.ql-editor h3) {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    :deep(.ql-toolbar) {
        padding: 8px;
    }

    :deep(.ql-toolbar button) {
        padding: 6px;
        margin: 0 1px;
    }

    :deep(.ql-editor) {
        padding: 1rem;
    }

    .editor-title {
        font-size: 1rem;
    }
}

/* 焦点状态 */
.rich-editor-block:focus-within {
    border-color: var(--color-primary-400);
    box-shadow: var(--shadow-lg), 0 0 0 3px var(--color-primary-100);
    transform: translateY(-2px);
}

/* 动画效果 */
.rich-editor-block {
    animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 显示光标的美化效果 */
:deep(.ql-editor .ql-cursor) {
    background: var(--color-primary-500);
    animation: cursor-blink 1.2s infinite;
}

@keyframes cursor-blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}

/* 选中文本的样式 */
:deep(.ql-editor ::selection) {
    background: rgba(79, 70, 229, 0.2);
    color: inherit;
}

/* 读取模式样式 */
.rich-editor-block[data-read-only="true"] :deep(.ql-toolbar) {
    display: none;
}

.rich-editor-block[data-read-only="true"] :deep(.ql-editor) {
    padding: 2rem;
    background: var(--color-gray-50);
    border-radius: var(--border-radius-sm);
}

/* 工具栏下拉框样式 */
:deep(.ql-picker) {
    color: var(--color-text);
}

:deep(.ql-picker-options) {
    background: white;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-lg);
    padding: 0.5rem 0;
    margin-top: 0.25rem;
}

:deep(.ql-picker-item) {
    padding: 0.5rem 1rem;
    transition: background 0.2s ease;
}

:deep(.ql-picker-item:hover) {
    background: var(--color-primary-50);
    color: var(--color-primary-700);
}

/* 颜色选择器美化 */
:deep(.ql-color .ql-picker-options) {
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-width: 200px;
}

:deep(.ql-color .ql-picker-item) {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid #ddd;
    transition: transform 0.1s ease;
    padding: 0;
    cursor: pointer;
}

:deep(.ql-color .ql-picker-item:hover) {
    transform: scale(1.1);
    border-color: #999;
}
</style>
