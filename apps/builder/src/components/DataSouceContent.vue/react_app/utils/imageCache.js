/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 图片缓存工具函数
 */

// 全局头像缓存 - 在组件外部定义，避免切换表格时丢失
export const globalImageCache = new Map()
export const globalLoadingCache = new Set()

// 从localStorage恢复缓存
export const loadCacheFromStorage = () => {
  try {
    const cached = localStorage.getItem('avatar-cache')
    if (cached) {
      const cacheData = JSON.parse(cached)
      Object.entries(cacheData).forEach(([url, dataUrl]) => {
        globalImageCache.set(url, dataUrl)
      })
    }
  } catch (error) {
    console.log('无法从localStorage加载头像缓存:', error)
  }
}

// 保存缓存到localStorage
export const saveCacheToStorage = () => {
  try {
    const cacheData = Object.fromEntries(globalImageCache)
    localStorage.setItem('avatar-cache', JSON.stringify(cacheData))
  } catch (error) {
    console.log('无法保存头像缓存到localStorage:', error)
  }
}

// 初始化时加载缓存
loadCacheFromStorage()
