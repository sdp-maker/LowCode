<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 14:31:33
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Block } from '@/types/block'

// 导入所有物料组件
import ButtonBlock from './ButtonBlock.vue'
import TextBlock from './TextBlock.vue'
import ImageBlock from './ImageBlock.vue'
import ChartBlock from './ChartBlock.vue'
import NotesBlock from './NotesBlock.vue'
import ViewBlock from './ViewBlock.vue'
import FormBlock from './FormBlock.vue'
import QuoteBlock from './QuoteBlock.vue'

const props = defineProps<{ block: Block }>()

const component = computed(() => {
    switch (props.block.type) {
        case 'heroTitle': return TextBlock
        case 'quote': return QuoteBlock
        case 'chart': return ChartBlock
        case 'image': return ImageBlock
        case 'notes': return NotesBlock
        case 'view': return ViewBlock
        case 'button': return ButtonBlock
        case 'form': return FormBlock
        case 'text': return TextBlock
        default: return TextBlock
    }
})
</script>

<template>
    <component :is="component" v-bind="props.block.props" />
</template>

<style scoped></style>
