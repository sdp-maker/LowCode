/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-25 17:00:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-25 17:00:00
 * @FilePath: \LowCode\apps\builder\src\components\DataSouceContent.vue\react_app\Icons.jsx
 * @Description: 数据源页面图标组件
 */

import React from 'react'

// 表格图标
export const TableIcon = ({ size = 20, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/>
    <path d="M3 9h18M9 21V9" stroke={color} strokeWidth="2"/>
  </svg>
)

// 用户图标
export const UsersIcon = ({ size = 20, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2"/>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2"/>
  </svg>
)

// 订单图标
export const OrdersIcon = ({ size = 20, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" stroke={color} strokeWidth="2"/>
    <path d="M9 7V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" stroke={color} strokeWidth="2"/>
  </svg>
)

// 食物图标
export const FoodsIcon = ({ size = 20, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" stroke={color} strokeWidth="2"/>
    <path d="M6 1v3M10 1v3M14 1v3" stroke={color} strokeWidth="2"/>
  </svg>
)

// 添加图标
export const PlusIcon = ({ size = 16, color = '#ffffff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// 导出图标
export const ExportIcon = ({ size = 16, color = '#ffffff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// 搜索图标
export const SearchIcon = ({ size = 16, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// 过滤图标
export const FilterIcon = ({ size = 16, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
)

// 设置图标
export const SettingsIcon = ({ size = 16, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth="2"/>
  </svg>
)

// 更多操作图标
export const MoreIcon = ({ size = 16, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="1" fill={color}/>
    <circle cx="19" cy="12" r="1" fill={color}/>
    <circle cx="5" cy="12" r="1" fill={color}/>
  </svg>
)

// 编辑图标
export const EditIcon = ({ size = 16, color = '#6b7280' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2"/>
  </svg>
)

// 删除图标
export const DeleteIcon = ({ size = 16, color = '#ef4444' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polyline points="3,6 5,6 21,6" stroke={color} strokeWidth="2"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2"/>
    <line x1="10" y1="11" x2="10" y2="17" stroke={color} strokeWidth="2"/>
    <line x1="14" y1="11" x2="14" y2="17" stroke={color} strokeWidth="2"/>
  </svg>
)
