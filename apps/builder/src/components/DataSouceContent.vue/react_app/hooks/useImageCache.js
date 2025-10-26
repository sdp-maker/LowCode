/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 图片缓存相关的Hook
 */

import { useState, useCallback, useRef } from 'react'
import { globalImageCache, globalLoadingCache, saveCacheToStorage } from '../utils/imageCache'

export const useImageCache = () => {
  // 头像图片缓存 - 使用全局缓存，避免切换表格时丢失
  const imageCache = useRef(globalImageCache)
  const loadingCache = useRef(globalLoadingCache) // 正在加载的URL集合
  const [cacheVersion, setCacheVersion] = useState(0) // 用于强制重绘

  // 预加载头像函数 - 带持久化缓存
  const preloadAvatar = useCallback((url, onLoad) => {
    if (!url || !url.startsWith('http')) return
    
    // 首先检查全局缓存
    if (globalImageCache.has(url)) {
      const base64 = globalImageCache.get(url)
      const img = new Image()
      img.onload = () => {
        imageCache.current.set(url, img)
        if (onLoad) onLoad(img)
      }
      img.src = base64
      return
    }
    
    // 如果已经缓存，直接返回
    if (imageCache.current.has(url)) {
      const img = imageCache.current.get(url)
      if (img && onLoad) onLoad(img)
      return
    }
    
    // 如果正在加载，避免重复请求
    if (loadingCache.current.has(url)) return
    
    loadingCache.current.add(url)
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      // 缓存成功加载的图片
      imageCache.current.set(url, img)
      loadingCache.current.delete(url)
      
      // 将图片转换为base64并存储到localStorage
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 64
        canvas.height = 64
        ctx.drawImage(img, 0, 0, 64, 64)
        const base64 = canvas.toDataURL('image/jpeg', 0.8)
        // 使用encodeURIComponent处理包含中文字符的URL
        const encodedUrl = encodeURIComponent(url)
        localStorage.setItem(`avatar_${encodedUrl}`, base64)
        
        // 同时保存到全局缓存
        globalImageCache.set(url, base64)
        saveCacheToStorage()
      } catch (e) {
        // 忽略错误
      }
      
      setCacheVersion(prev => prev + 1) // 触发重绘
      if (onLoad) onLoad(img)
    }
    
    img.onerror = () => {
      imageCache.current.set(url, null) // 标记为失败
      loadingCache.current.delete(url)
    }
    
    img.src = url
  }, [])

  // 从localStorage恢复缓存的头像
  const restoreCachedAvatar = useCallback((url) => {
    try {
      // 首先检查全局缓存
      if (globalImageCache.has(url)) {
        const base64 = globalImageCache.get(url)
        const img = new Image()
        img.onload = () => {
          imageCache.current.set(url, img)
          setCacheVersion(prev => prev + 1)
        }
        img.src = base64
        return true
      }
      
      // 然后检查localStorage
      const encodedUrl = encodeURIComponent(url)
      const base64 = localStorage.getItem(`avatar_${encodedUrl}`)
      if (base64) {
        const img = new Image()
        img.onload = () => {
          imageCache.current.set(url, img)
          setCacheVersion(prev => prev + 1)
        }
        img.src = base64
        return true
      }
    } catch (e) {
      // 忽略localStorage错误
    }
    return false
  }, [])

  return {
    imageCache,
    loadingCache,
    cacheVersion,
    preloadAvatar,
    restoreCachedAvatar
  }
}
