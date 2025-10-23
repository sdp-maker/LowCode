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
import type { BaseBlock } from '@/types/block'
import ButtonBlock from './ButtonBlock.vue'
import TextBlock from './TextBlock.vue'
import ImageBlock from './ImageBlock.vue'
import ChartBlock from './ChartBlock.vue'

const props = defineProps<
    { block: Pick<BaseBlock, 'type'> }>()


const component = computed(() => {
    switch (props.block.type) {
        case 'button':
            return ButtonBlock
        case 'text':
            return TextBlock
        case 'image':
            return ImageBlock
        case 'chart':
            return ChartBlock
    }
})
</script>

<template>
    <div>
        <component :is="component" />
    </div>
</template>

<style scoped></style>
