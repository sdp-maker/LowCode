/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 常量定义
 */

// 添加旋转动画样式
export const spinKeyframes = `
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`

// 将样式注入到页面
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = spinKeyframes
  document.head.appendChild(style)
}

// 表格模板配置
export const SHEET_TEMPLATES = {
  'products': { name: '产品管理', icon: '📱' },
  'employees': { name: '员工管理', icon: '👥' },
  'projects': { name: '项目管理', icon: '📋' },
  'custom': { name: '自定义表格', icon: '📄' }
}

// 模板选项
export const TEMPLATE_OPTIONS = [
  { key: 'products', name: '产品管理', icon: '📱', desc: '管理产品信息、价格、库存' },
  { key: 'employees', name: '员工管理', icon: '👥', desc: '员工信息、部门、职位管理' },
  { key: 'projects', name: '项目管理', icon: '📋', desc: '项目进度、状态跟踪' },
  { key: 'custom', name: '自定义表格', icon: '📄', desc: '通用数据表格模板' }
]

// 默认表格列表
export const DEFAULT_SHEETS = ['users', 'orders', 'foods']

// 头像颜色配置
export const AVATAR_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']
