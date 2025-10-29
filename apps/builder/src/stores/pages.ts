import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Block } from '@/types/block'

export interface Page {
  id: string
  name: string
  description?: string
  blocks: Block[]
  createdAt: Date
  updatedAt: Date
}

export const usePagesStore = defineStore('pages', () => {
  // 页面列表
  const pages = ref<Page[]>([
    {
      id: 'home',
      name: '首页',
      description: '默认首页',
      blocks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  // 当前活动页面ID
  const currentPageId = ref<string>('home')

  // 获取当前页面
  const currentPage = computed(() => {
    return pages.value.find(page => page.id === currentPageId.value) || pages.value[0] || null
  })

  // 添加新页面
  const addPage = (name: string, description?: string): Page => {
    const newPage: Page = {
      id: `page_${Date.now()}`,
      name,
      description,
      blocks: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    pages.value.push(newPage)
    return newPage
  }

  // 删除页面
  const deletePage = (pageId: string): boolean => {
    if (pages.value.length <= 1) {
      return false // 至少保留一个页面
    }
    
    const index = pages.value.findIndex(page => page.id === pageId)
    if (index === -1) return false
    
    pages.value.splice(index, 1)
    
    // 如果删除的是当前页面，切换到第一个页面
    if (currentPageId.value === pageId && pages.value.length > 0) {
      currentPageId.value = pages.value[0]?.id || ''
    }
    
    return true
  }

  // 切换页面
  const switchToPage = (pageId: string) => {
    const page = pages.value.find(p => p.id === pageId)
    if (page) {
      currentPageId.value = pageId
    }
  }

  // 更新页面信息
  const updatePage = (pageId: string, updates: Partial<Omit<Page, 'id' | 'createdAt'>>) => {
    const page = pages.value.find(p => p.id === pageId)
    if (page) {
      Object.assign(page, updates, { updatedAt: new Date() })
    }
  }

  // 更新页面的组件列表
  const updatePageBlocks = (pageId: string, blocks: Block[]) => {
    const page = pages.value.find(p => p.id === pageId)
    if (page) {
      page.blocks = [...blocks]
      page.updatedAt = new Date()
    }
  }

  return {
    pages,
    currentPageId,
    currentPage,
    addPage,
    deletePage,
    switchToPage,
    updatePage,
    updatePageBlocks
  }
})
