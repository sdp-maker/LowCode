import { ref } from 'vue'

// 缓存管理
const cachedViews = ref<string[]>([
  'AppView',
  'DataSourceView', 
  'LayoutView',
  'ActionsView',
  'FlowEditor',
  'DataSourceContent'
])

// 添加组件到缓存
export const addToCache = (componentName: string) => {
  if (!cachedViews.value.includes(componentName)) {
    cachedViews.value.push(componentName)
  }
}

// 从缓存中移除组件
export const removeFromCache = (componentName: string) => {
  const index = cachedViews.value.indexOf(componentName)
  if (index > -1) {
    cachedViews.value.splice(index, 1)
  }
}

// 清空所有缓存
export const clearAllCache = () => {
  cachedViews.value = []
}

// 获取当前缓存的组件列表
export const getCachedViews = () => {
  return cachedViews.value
}

// 检查组件是否被缓存
export const isCached = (componentName: string) => {
  return cachedViews.value.includes(componentName)
}

// 导出缓存列表的响应式引用
export { cachedViews }
