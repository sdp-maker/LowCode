import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Block } from '@/types/block'

export const useEditorStore = defineStore('editor', () => {
  const selectedBlock = ref<Block | null>(null)

  function selectBlock(block: Block | null) {
    selectedBlock.value = block
  }

  function updateBlockProps(props: Record<string, unknown>) {
    if (selectedBlock.value) {
      console.log('Updating block props:', selectedBlock.value.id, props)
      selectedBlock.value.props = {
        ...selectedBlock.value.props,
        ...props,
      }
      console.log('Updated block props:', selectedBlock.value.props)
    }
  }

  return { selectedBlock, selectBlock, updateBlockProps }
})
