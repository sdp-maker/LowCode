/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 表格数据管理相关的Hook
 */

import { useState, useCallback } from 'react'
import { generateLargeUserData, generateLargeOrderData, getSheetTemplate } from '../utils/dataGenerators'
import { SHEET_TEMPLATES } from '../utils/constants'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useSheetData = () => {
  // 当前选中的表格
  const [activeSheet, setActiveSheet] = useState('users')
  
  // 为每个表格维护独立的状态
  const [sheetStates, setSheetStates] = useState({
    users: {
      loadedRows: 100,
      isLoading: false,
      scrollPosition: { x: 0, y: 0 },
      selectedRows: [],
      sortConfig: null,
      filterConfig: null
    },
    orders: {
      loadedRows: 100, // 初始加载100行，支持懒加载
      isLoading: false,
      scrollPosition: { x: 0, y: 0 },
      selectedRows: [],
      sortConfig: null,
      filterConfig: null
    },
    foods: {
      loadedRows: 18,
      isLoading: false,
      scrollPosition: { x: 0, y: 0 },
      selectedRows: [],
      sortConfig: null,
      filterConfig: null
    }
  })

  // 不同表格的数据 - 使用React状态管理
  const [sheetsData, setSheetsData] = useState({
    users: generateLargeUserData(),
    orders: generateLargeOrderData(),
    foods: [
      ['F001', '经典汉堡', '25', true, '快餐', '🍔', '牛肉汉堡配薯条'],
      ['F002', '意式披萨', '35', true, '意式', '🍕', '手工制作披萨'],
      ['F003', '凯撒沙拉', '18', true, '健康', '🥗', '新鲜蔬菜沙拉'],
      ['F004', '现磨咖啡', '12', true, '饮品', '☕', '精品咖啡豆'],
      ['F005', '生日蛋糕', '68', false, '甜品', '🍰', '定制生日蛋糕'],
      ['F006', '日式拉面', '28', true, '日式', '🍜', '豚骨拉面'],
      ['F007', '牛排套餐', '88', true, '西餐', '🥩', '澳洲牛排'],
      ['F008', '寿司拼盘', '45', true, '日式', '🍣', '新鲜刺身寿司'],
      ['F009', '泰式咖喱', '32', true, '泰式', '🍛', '椰浆咖喱鸡'],
      ['F010', '法式甜点', '22', false, '甜品', '🧁', '马卡龙套装'],
      ['F011', '中式炒饭', '16', true, '中式', '🍚', '扬州炒饭'],
      ['F012', '墨西哥卷饼', '24', true, '墨式', '🌯', '牛肉卷饼'],
      ['F013', '印度咖喱', '26', true, '印式', '🍛', '香料咖喱'],
      ['F014', '韩式烤肉', '58', true, '韩式', '🥓', '韩式烤五花肉'],
      ['F015', '意式面条', '30', true, '意式', '🍝', '奶油蘑菇面'],
      ['F016', '希腊沙拉', '20', true, '地中海', '🥗', '橄榄油沙拉'],
      ['F017', '英式下午茶', '38', false, '英式', '🫖', '三层下午茶'],
      ['F018', '德式香肠', '22', true, '德式', '🌭', '传统德式香肠'],
    ]
  })

  // 获取当前表格的状态
  const getCurrentState = useCallback(() => sheetStates[activeSheet], [sheetStates, activeSheet])
  
  // 更新当前表格的状态
  const updateCurrentState = useCallback((updates) => {
    setSheetStates(prev => ({
      ...prev,
      [activeSheet]: { ...prev[activeSheet], ...updates }
    }))
  }, [activeSheet])

  // 当前数据 - 根据懒加载状态返回部分数据
  const getCurrentData = useCallback(() => {
    const fullData = sheetsData[activeSheet]
    if (!fullData || !Array.isArray(fullData)) {
      return []
    }
    const currentState = getCurrentState()
    if (activeSheet === 'users' || activeSheet === 'orders') {
      return fullData.slice(0, currentState.loadedRows)
    }
    return fullData
  }, [sheetsData, activeSheet, getCurrentState])

  // 切换表格
  const switchSheet = useCallback((sheetName) => {
    setActiveSheet(sheetName)
  }, [])

  // 创建新表格
  const createNewSheet = useCallback((sheetName, selectedTemplate) => {
    if (!sheetName.trim()) {
      ElMessage.warning('请输入表格名称')
      return false
    }

    const template = SHEET_TEMPLATES[selectedTemplate]
    const newSheetKey = `sheet_${Date.now()}`
    const templateData = getSheetTemplate(selectedTemplate)
    
    // 添加到sheetsData - 使用状态更新
    setSheetsData(prevSheets => {
      const newSheets = { ...prevSheets }
      newSheets[newSheetKey] = templateData
      // 保存自定义名称
      newSheets[newSheetKey].customName = sheetName.trim()
      return newSheets
    })
    
    // 添加到状态管理
    setSheetStates(prev => ({
      ...prev,
      [newSheetKey]: {
        loadedRows: templateData.length,
        isLoading: false,
        scrollPosition: { x: 0, y: 0 },
        selectedRows: [],
        sortConfig: null,
        filterConfig: null
      }
    }))

    // 切换到新表格
    switchSheet(newSheetKey)
    
    // 提示用户
    ElMessage.success(`已创建新表格: ${sheetName} (${template.name}模板, ${templateData.length}行数据)`)
    
    return true
  }, [switchSheet])

  // 删除表格
  const deleteSheet = useCallback(async (sheetKey) => {
    // 不允许删除默认表格
    if (['users', 'orders', 'foods'].includes(sheetKey)) {
      ElMessage.warning('不能删除默认表格')
      return
    }

    // 获取表格名称用于确认
    const sheetName = sheetsData[sheetKey]?.customName || 'Custom Sheet'
    
    try {
      // 使用 Element Plus 的确认对话框
      await ElMessageBox.confirm(
        `此操作不可撤销，将永久删除该表格及其所有数据。`,
        `确定要删除表格 "${sheetName}" 吗？`,
        {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'el-button--danger',
          center: true
        }
      )

      // 用户确认删除，执行删除操作
      // 从sheetsData中删除表格
      setSheetsData(prevSheets => {
        const newSheets = { ...prevSheets }
        delete newSheets[sheetKey]
        return newSheets
      })

      // 如果删除的是当前活动表格，切换到默认表格
      if (activeSheet === sheetKey) {
        const remainingSheets = Object.keys(sheetsData).filter(key => key !== sheetKey)
        const nextSheet = remainingSheets.length > 0 ? remainingSheets[0] : 'users'
        switchSheet(nextSheet)
      }

      // 清理相关状态
      setSheetStates(prevStates => {
        const newStates = { ...prevStates }
        delete newStates[sheetKey]
        return newStates
      })

      // 显示成功消息
      ElMessage.success(`表格 "${sheetName}" 已成功删除`)
      
    } catch (error) {
      // 用户取消删除或发生错误
      if (error === 'cancel') {
        ElMessage.info('已取消删除操作')
      } else {
        console.error('删除表格时发生错误:', error)
        ElMessage.error('删除表格失败')
      }
    }
  }, [activeSheet, sheetsData, switchSheet])

  // 获取表格标题
  const getSheetTitle = useCallback(() => {
    switch (activeSheet) {
      case 'users': return 'Users'
      case 'orders': return 'Orders'  
      case 'foods': return 'Foods'
      default: 
        if (activeSheet.startsWith('sheet_')) {
          // 优先使用自定义名称
          const customName = sheetsData[activeSheet]?.customName
          if (customName) return customName
          
          // 根据数据内容推断表格类型
          const firstRow = sheetsData[activeSheet]?.[0]
          if (firstRow) {
            const firstCell = firstRow[0]
            if (firstCell?.startsWith('P')) return 'Products'
            if (firstCell?.startsWith('E')) return 'Employees'
            if (firstCell?.startsWith('PR')) return 'Projects'
          }
          return 'Custom Sheet'
        }
        return 'Data'
    }
  }, [activeSheet, sheetsData])

  return {
    activeSheet,
    sheetStates,
    sheetsData,
    setSheetsData,
    getCurrentState,
    updateCurrentState,
    getCurrentData,
    switchSheet,
    createNewSheet,
    deleteSheet,
    getSheetTitle
  }
}
