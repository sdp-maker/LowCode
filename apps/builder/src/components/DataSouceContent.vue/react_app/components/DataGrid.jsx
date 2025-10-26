/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 数据表格组件
 */

import React from 'react'
import { DataEditor, GridCellKind } from '@glideapps/glide-data-grid'
import '@glideapps/glide-data-grid/dist/index.css'
import { globalImageCache } from '../utils/imageCache'
import { AVATAR_COLORS } from '../utils/constants'

const DataGrid = ({ 
  dataEditorRef,
  getCellContent,
  columns,
  data,
  onCellEdited,
  selection,
  onGridSelectionChange,
  onVisibleRegionChanged,
  imageCache,
  loadingCache,
  preloadAvatar
}) => {
  return (
    <div style={{ 
      flex: 1, 
      height: 'calc(100vh - 64px)', 
      overflow: 'hidden',
      position: 'relative'
    }}>
      {data && columns && (
      <DataEditor
        ref={dataEditorRef}
        getCellContent={getCellContent}
        columns={columns}
        rows={data?.length || 0}
        onCellEdited={onCellEdited}
        gridSelection={selection}
        onGridSelectionChange={onGridSelectionChange}
        rowSelect="multi"
        columnSelect="none"
        rowMarkers="both"
        keybindings={{
          selectAll: true,
          selectRow: true,
          selectColumn: true,
        }}
        customRenderers={[
          {
            kind: GridCellKind.Custom,
            isMatch: (cell) => {
              return cell.data?.kind === "avatar-cell-v2"
            },
            draw: (args, cell) => {
              const { ctx, rect, theme } = args
              const { url, name, row, col } = cell.data
              
              // 确保只在头像列渲染
              if (col !== 5) return false
              
              // 绘制单元格背景
              ctx.fillStyle = theme.bgCell
              ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
              
              // 计算头像位置和大小
              const size = Math.min(rect.width - 8, rect.height - 8, 32)
              const x = rect.x + (rect.width - size) / 2
              const y = rect.y + (rect.height - size) / 2
              const centerX = x + size / 2
              const centerY = y + size / 2
              const radius = size / 2
              
              // 根据用户名生成背景色
              const colorIndex = name.charCodeAt(0) % AVATAR_COLORS.length
              
              // 绘制彩色圆形背景
              ctx.beginPath()
              ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
              ctx.fillStyle = AVATAR_COLORS[colorIndex]
              ctx.fill()
              
              // 绘制白色边框
              ctx.strokeStyle = '#ffffff'
              ctx.lineWidth = 2
              ctx.stroke()
              
              // 绘制白色首字母
              ctx.fillStyle = '#ffffff'
              ctx.font = `bold ${size * 0.5}px system-ui, -apple-system, sans-serif`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillText(name.charAt(0).toUpperCase(), centerX, centerY)
              
              // 检查是否有缓存的真实头像
              if (url && typeof url === 'string' && url.startsWith('http')) {
                // 首先检查全局缓存
                let cachedImg = globalImageCache.get(url)
                if (cachedImg && typeof cachedImg === 'string') {
                  // 如果是base64字符串，转换为Image对象
                  const img = new Image()
                  img.src = cachedImg
                  cachedImg = img
                }
                
                // 然后检查组件缓存
                if (!cachedImg) {
                  cachedImg = imageCache.current.get(url)
                  if (cachedImg) {
                  }
                }
                
                if (cachedImg && cachedImg !== null) {
                  // 绘制真实头像（覆盖首字母）
                  ctx.save()
                  ctx.beginPath()
                  ctx.arc(centerX, centerY, radius - 1, 0, 2 * Math.PI)
                  ctx.clip()
                  ctx.drawImage(cachedImg, x + 1, y + 1, size - 2, size - 2)
                  ctx.restore()
                  
                  // 重新绘制白色边框
                  ctx.beginPath()
                  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                  ctx.strokeStyle = '#ffffff'
                  ctx.lineWidth = 2
                  ctx.stroke()
                } else if (!loadingCache.current.has(url) && !imageCache.current.has(url) && !globalImageCache.has(url)) {
                  // 开始预加载图片（避免重复加载）
                  preloadAvatar(url)
                }
              }
              
              return true
            },
            provideEditor: () => undefined,
          }
        ]}
        smoothScrollX={true}
        smoothScrollY={true}
        width="100%"
        height="100%"
        theme={{
          accentColor: '#3b82f6',
          accentFg: '#ffffff',
          accentLight: '#dbeafe',
          textDark: '#1f2937',
          textMedium: '#6b7280',
          textLight: '#9ca3af',
          bgCell: '#ffffff',
          bgCellMedium: '#f8fafc',
          bgHeader: '#fafbfc',
          borderColor: '#e1e5e9',
          headerFontStyle: '700 16px system-ui, -apple-system, sans-serif',
          baseFontStyle: '400 16px system-ui, -apple-system, sans-serif',
        }}
        fillHandle={true}
        rangeSelect="rect"
        headerHeight={40}
        rowHeight={40}
        overlayTarget={document.getElementById('portal')}
        onVisibleRegionChanged={onVisibleRegionChanged}
      />
      )}
    </div>
  )
}

export default DataGrid
