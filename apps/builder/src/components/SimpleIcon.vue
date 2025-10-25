<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-25 21:00:00
 * @Description: 简约图标组件 - 纯色背景+白色内容
-->
<template>
    <div :class="['simple-icon', className]" :style="iconStyle">
        <i :class="`iconfont ${iconClass}`" v-if="iconClass"></i>
        <span v-else>{{ iconText }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    type?: string
    size?: number | string
    backgroundColor?: string
    className?: string
    noBackground?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'default',
    size: 48,
    backgroundColor: '',
    className: '',
    noBackground: false
})

// 图标配置映射 - 使用iconfont中的实际类名
const iconConfig = {
    // 内容类图标
    'image': { class: 'icon-tupian', color: '#ef4444', text: '图' },
    'note': { class: 'icon-bijijilu', color: '#3b82f6', text: '记' },
    'form': { class: 'icon-biaodanzujian-biaoge', color: '#10b981', text: '表' },
    'chart': { class: 'icon-tubiao-zhexiantu', color: '#f59e0b', text: '图' },
    'list': { class: 'icon-liebiao', color: '#06b6d4', text: '列' },
    'quote': { class: 'icon-yinyan', color: '#ec4899', text: '引' },
    'button': { class: 'icon-anniu', color: '#8b5cf6', text: '钮' },
    'container': { class: 'icon-rongqi', color: '#6366f1', text: '容' },

    // 标题类图标
    'title': { class: 'icon-biaotizhengwenqiehuan', color: '#8b5cf6', text: '标' },
    'image-title': { class: 'icon-tupian', color: '#ef4444', text: '图' },

    // 系列类图标
    'card': { class: 'icon-qiapianxingshi', color: '#06b6d4', text: '卡' },

    // 布局类图标
    'separator': { class: 'icon-fengefu', color: '#9ca3af', text: '分' },

    // 图表类图标
    'line-chart': { class: 'icon-tubiao-zhexiantu', color: '#f59e0b', text: '线' },
    'bar-chart': { class: 'icon-tiaoxingtu-xianxing', color: '#10b981', text: '柱' },
    'pie-chart': { class: 'icon-bingtu-xianxing', color: '#ec4899', text: '饼' },
    'radial-chart': { class: 'icon-baobiao', color: '#8b5cf6', text: '径' },

    // 流程节点图标
    'add': { class: 'icon-jiahao', color: '#ffffff', text: '+' },
    'input-node': { class: 'icon-shurujiedian', color: '#10b981', text: '入' },
    'output-node': { class: 'icon-shuchu', color: '#ef4444', text: '出' },
    'math-operation': { class: 'icon-yunsuancaozuo_o', color: '#8b5cf6', text: '算' },

    // 操作图标
    'run': { class: 'icon-yunhang', color: '#10b981', text: '▶' },
    'edit': { class: 'icon-genggai', color: '#f59e0b', text: '✏' },
    'copy': { class: 'icon-fuzhi', color: '#3b82f6', text: '📄' },
    'export': { class: 'icon-daochu', color: '#8b5cf6', text: '↓' },
    'delete': { class: 'icon-icon_huabanfuben', color: '#ef4444', text: '🗑' },

    // 默认图标
    'default': { class: '', color: '#9ca3af', text: '?' }
}

const config = computed(() => iconConfig[props.type as keyof typeof iconConfig] || iconConfig.default)

const iconClass = computed(() => config.value.class)
const iconText = computed(() => config.value.text)

const iconStyle = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
    backgroundColor: props.noBackground ? 'transparent' : (props.backgroundColor || config.value.color),
    borderRadius: props.noBackground ? '0' : '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: props.noBackground ? config.value.color : 'white',
    fontSize: typeof props.size === 'number' ? `${props.size * 0.5}px` : '14px',
    fontWeight: '500',
    transition: 'opacity 0.2s ease',
    cursor: 'pointer',
    flexShrink: 0
}))
</script>

<style scoped>
.simple-icon:hover {
    opacity: 0.85;
}
</style>
