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
    content?: string
    align?: 'left' | 'center' | 'right'
    fontSize?: number
    color?: string
    backgroundColor?: string
}>()

const textStyle = computed(() => {
    console.log('TextBlock props:', props)
    return {
        textAlign: props.align || 'left',
        fontSize: `${props.fontSize || 24}px`,
        color: props.color || '#000000',
        backgroundColor: props.backgroundColor || 'transparent'
    }
})
</script>

<template>
    <div class="text-block">
        <h1 :style="textStyle">
            {{ content || 'Text Block' }}
        </h1>
    </div>
</template>

<style scoped>
.text-block {
    @apply p-4;
    min-height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    border: none;
}

.text-block h1 {
    @apply font-bold m-0 p-0;
    width: 100%;
}
</style>