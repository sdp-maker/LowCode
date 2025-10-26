/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-25 16:30:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-26 16:30:00
 * @FilePath: \LowCode\apps\builder\src\components\DataSouceContent.vue\react_app\ReactSouceContent.jsx
 * @Description: Glide 风格数据表格组件 - 重构版本
 */

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { GridCellKind, CompactSelection } from '@glideapps/glide-data-grid'
import { getRandomAvatar } from './utils/dataGenerators'
import { useSheetData } from './hooks/useSheetData'
import { useImageCache } from './hooks/useImageCache'
import SheetPanel from './components/SheetPanel'
import Toolbar from './components/Toolbar'
import DataGrid from './components/DataGrid'
import CreateSheetModal from './components/CreateSheetModal'

const ReactDataGrid = () => {
  // 使用自定义Hooks
  const {
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
  } = useSheetData()

  const {
    imageCache,
    loadingCache,
    cacheVersion,
    preloadAvatar,
    restoreCachedAvatar
  } = useImageCache()

  // 懒加载相关状态 - 使用当前表格的状态
  const currentState = getCurrentState()
  const loadedRows = currentState.loadedRows
  const isLoading = currentState.isLoading
  
  // 模态框状态
  const [showModal, setShowModal] = useState(false)
  
  // DataEditor引用，用于恢复滚动位置
  const dataEditorRef = useRef(null)
  
  // 选中的行状态 - 使用glide-data-grid期望的格式
  const [selection, setSelection] = useState({
    rows: CompactSelection.empty(),
    columns: CompactSelection.empty()
  })
  
  // 获取选中行数量的辅助函数
  const getSelectedRowsCount = (selection) => {
    if (!selection || !selection.rows) {
      return 0
    }
    
    // 直接使用CompactSelection的size属性
    return selection.rows.size || 0
  }
  
  // 当前数据
  const [data, setData] = useState([])

  // 当sheetsData或activeSheet变化时更新data
  useEffect(() => {
    const newData = getCurrentData()
    setData(newData)
  }, [getCurrentData])
  
  // 上一次选择的行数量，用于比较变化
  const prevSelectedCountRef = useRef(0)
  
  // 监听选择变化（只在实际变化时输出日志）
  useEffect(() => {
    const currentCount = getSelectedRowsCount(selection)
    if (currentCount !== prevSelectedCountRef.current) {
      console.log('✅ 选择状态变化 - 选中行数量:', currentCount)
      prevSelectedCountRef.current = currentCount
    }
  }, [selection])

  // 切换表格时恢复滚动位置和选择状态
  useEffect(() => {
    const currentState = getCurrentState()
    if (dataEditorRef.current && currentState.scrollPosition && typeof dataEditorRef.current.scrollTo === 'function') {
      // 延迟恢复滚动位置，确保组件已渲染
      setTimeout(() => {
        try {
          if (dataEditorRef.current && dataEditorRef.current.scrollTo) {
            dataEditorRef.current.scrollTo(currentState.scrollPosition.x, currentState.scrollPosition.y)
          }
        } catch (error) {
          console.log('无法恢复滚动位置:', error)
        }
      }, 100)
    }
  }, [activeSheet, data])

  // 预加载可见区域的头像
  useEffect(() => {
    if (activeSheet === 'users' && data.length > 0) {
      // 预加载前100个用户的头像
      const preloadCount = Math.min(data.length, 100)
      for (let i = 0; i < preloadCount; i++) {
        const avatarUrl = data[i]?.[5]
        if (avatarUrl) {
          // 先尝试从localStorage恢复，然后预加载
          if (!restoreCachedAvatar(avatarUrl)) {
            preloadAvatar(avatarUrl)
          }
        }
      }
    }
  }, [data, activeSheet, preloadAvatar, restoreCachedAvatar])

  // 懒加载更多数据
  const loadMoreData = useCallback(() => {
    const currentState = getCurrentState()
    if ((activeSheet !== 'users' && activeSheet !== 'orders') || currentState.isLoading) return
    
    const fullData = sheetsData[activeSheet]
    if (currentState.loadedRows >= fullData.length) return
    
    updateCurrentState({ isLoading: true })
    
    // 模拟网络延迟，每次加载更多数据
    setTimeout(() => {
      const newLoadedRows = Math.min(currentState.loadedRows + 100, fullData.length) // 每次加载100行
      updateCurrentState({ 
        loadedRows: newLoadedRows,
        isLoading: false 
      })
      setData(fullData.slice(0, newLoadedRows))
    }, 300) // 减少延迟时间
  }, [activeSheet, getCurrentState, updateCurrentState, sheetsData])

  // 处理可见区域变化，检测是否需要加载更多数据
  const handleScroll = useCallback((region) => {
    const currentState = getCurrentState()
    if ((activeSheet !== 'users' && activeSheet !== 'orders') || currentState.isLoading) return
    
    const { y, height } = region
    const visibleEndRow = y + height
    const totalRows = sheetsData[activeSheet].length
    
    // 保存滚动位置
    updateCurrentState({
      scrollPosition: { x: region.x || 0, y: y || 0 }
    })
    
    // 当可见区域接近已加载数据的末尾时，加载更多数据
    if (visibleEndRow > currentState.loadedRows - 50 && currentState.loadedRows < totalRows) {
      loadMoreData()
    }
    
    // 预加载可见区域及其周围的头像
    const startRow = Math.max(0, y - 20) // 提前20行开始预加载
    const endRow = Math.min(data.length - 1, visibleEndRow + 20) // 延后20行结束预加载
    
    for (let i = startRow; i <= endRow; i++) {
      const avatarUrl = data[i]?.[5]
      if (avatarUrl && !imageCache.current.has(avatarUrl)) {
        preloadAvatar(avatarUrl)
      }
    }
  }, [activeSheet, getCurrentState, updateCurrentState, loadMoreData, data, preloadAvatar, sheetsData, imageCache])

  // 根据当前表格动态定义列
  const getColumns = () => {
    switch (activeSheet) {
      case 'users':
        return [
          { title: 'ID', width: 80, grow: 0 },
          { title: '姓名', width: 120, grow: 1 },
          { title: '年龄', width: 80, grow: 0 },
          { title: '状态', width: 80, grow: 0 },
          { title: '爱好', width: 200, grow: 2 },
          { title: '头像', width: 80, grow: 0 },
          { title: '笔记', width: 250, grow: 2 },
        ]
      case 'orders':
        return [
          { title: 'ID', width: 80, grow: 0 },
          { title: '订单名', width: 150, grow: 2 },
          { title: '金额', width: 100, grow: 0 },
          { title: '状态', width: 80, grow: 0 },
          { title: '类型', width: 120, grow: 1 },
          { title: '图标', width: 80, grow: 0 },
          { title: '备注', width: 200, grow: 2 },
        ]
      case 'foods':
        return [
          { title: 'ID', width: 80, grow: 0 },
          { title: '食物名', width: 120, grow: 1 },
          { title: '价格', width: 80, grow: 0 },
          { title: '状态', width: 80, grow: 0 },
          { title: '分类', width: 100, grow: 1 },
          { title: '图标', width: 80, grow: 0 },
          { title: '描述', width: 200, grow: 2 },
        ]
      default:
        // 为新创建的表格提供通用列定义
        if (activeSheet.startsWith('sheet_')) {
          return [
            { title: 'ID', width: 80, grow: 0 },
            { title: '名称', width: 120, grow: 1 },
            { title: '数值', width: 100, grow: 0 },
            { title: '状态', width: 80, grow: 0 },
            { title: '类型', width: 120, grow: 1 },
            { title: '图标', width: 80, grow: 0 },
            { title: '描述', width: 200, grow: 2 },
          ]
        }
        return [
          { title: 'ID', width: 80, grow: 0 },
          { title: '名称', width: 120, grow: 1 },
          { title: '数值', width: 80, grow: 0 },
          { title: '状态', width: 80, grow: 0 },
          { title: '类型', width: 120, grow: 1 },
          { title: '图标', width: 80, grow: 0 },
          { title: '备注', width: 200, grow: 2 },
        ]
    }
  }

  const columns = getColumns()

  // 获取单元格内容
  const getCellContent = useCallback((cell) => {
    const [col, row] = cell
    const cellData = data[row]?.[col] || ''
    
    // ID 列只读
    if (col === 0) {
      return {
        kind: GridCellKind.Text,
        data: cellData,
        displayData: cellData,
        allowOverlay: false,
        readonly: true,
        themeOverride: {
          baseFontStyle: '400 16px system-ui, -apple-system, sans-serif',
        }
      }
    }
    
    // 状态列 (第3列) 显示为可选框
    if (col === 3) {
      return {
        kind: GridCellKind.Boolean,
        data: cellData === true || cellData === 'true' || cellData === '✓',
        allowOverlay: false,
        readonly: false,
        themeOverride: {
          baseFontStyle: '400 16px system-ui, -apple-system, sans-serif',
        }
      }
    }
    
    // 头像列 (第5列) 显示为自定义头像
    if (col === 5) {
      const userName = data[row]?.[1] || 'User'
      return {
        kind: GridCellKind.Custom,
        data: {
          kind: "avatar-cell-v2",
          url: cellData,
          name: userName,
          row: row,
          col: col
        },
        displayData: userName.charAt(0).toUpperCase(),
        allowOverlay: false,
        readonly: true,
        copyData: cellData,
        themeOverride: {
          baseFontStyle: '400 14px system-ui, -apple-system, sans-serif',
        }
      }
    }
    
    // 其他列都可以编辑，设置字体为16px
    return {
      kind: GridCellKind.Text,
      data: cellData,
      displayData: cellData,
      allowOverlay: true,
      readonly: false,
      themeOverride: {
        baseFontStyle: '400 16px system-ui, -apple-system, sans-serif',
      }
    }
  }, [data])

  // 编辑单元格
  const onCellEdited = useCallback((cell, newValue) => {
    const [col, row] = cell
    
    // 获取要保存的值
    let valueToSave = newValue.data
    
    // 如果是状态列(布尔值)，保存布尔值
    if (col === 3) {
      valueToSave = newValue.data
    }
    
    // 更新当前显示的数据
    setData(prevData => {
      const newData = [...prevData]
      if (newData[row] && newData[row][col] !== undefined) {
        newData[row] = [...newData[row]]
        newData[row][col] = valueToSave
      }
      return newData
    })
    
    // 同时更新原始数据源 - 添加安全检查
    setSheetsData(prevSheets => {
      if (prevSheets[activeSheet] && prevSheets[activeSheet][row] && Array.isArray(prevSheets[activeSheet][row])) {
        const newSheets = { ...prevSheets }
        newSheets[activeSheet] = [...newSheets[activeSheet]]
        newSheets[activeSheet][row] = [...newSheets[activeSheet][row]]
        newSheets[activeSheet][row][col] = valueToSave
        return newSheets
      }
      return prevSheets
    })
  }, [activeSheet, setSheetsData])

  // 添加新行
  const addNewRow = () => {
    let newRow
    switch (activeSheet) {
      case 'users':
        const newId = String(data.length).padStart(3, '0')
        const newUserName = '新用户'
        const newAvatar = getRandomAvatar(`${newUserName}-${data.length}`, data.length)
        newRow = [newId, newUserName, '20', true, 'swimming', newAvatar, '新用户']
        break
      case 'orders':
        const orderId = `O${String(data.length + 1).padStart(3, '0')}`
        newRow = [orderId, '新订单', '1000', true, '待处理', '📦', '新订单']
        break
      case 'foods':
        const foodId = `F${String(data.length + 1).padStart(3, '0')}`
        newRow = [foodId, '新食物', '20', true, '其他', '🍽️', '新食物']
        break
      default:
        // 为新创建的表格添加行
        if (activeSheet.startsWith('sheet_')) {
          const newId = String(data.length + 1).padStart(3, '0')
          newRow = [newId, '新项目', '100', true, '默认类型', '📄', '新项目描述']
        } else {
          return
        }
    }
    
    setData(prevData => [...prevData, newRow])
    // 同时更新原始数据
    setSheetsData(prevSheets => {
      const newSheets = { ...prevSheets }
      newSheets[activeSheet] = [...newSheets[activeSheet], newRow]
      return newSheets
    })
  }

  // 删除选中行
  const deleteSelectedRows = (selection) => {
    console.log('删除函数被调用，选择状态:', selection)
    
    // 检查选择状态
    if (!selection || !selection.rows) {
      console.log('没有选择状态或行选择')
      return
    }
    
    // 获取选中的行索引 - 尝试不同的CompactSelection API
    let selectedRows = []
    
    // 尝试不同的方式获取选中的行
    if (selection.rows.items) {
      selectedRows = selection.rows.items
    } else if (selection.rows.toArray) {
      selectedRows = selection.rows.toArray()
    } else if (typeof selection.rows[Symbol.iterator] === 'function') {
      selectedRows = Array.from(selection.rows)
    } else {
      // 如果是数字，表示单个选择
      if (typeof selection.rows === 'number') {
        selectedRows = [selection.rows]
      }
    }
    
    console.log('选中的行:', selectedRows, '选择对象:', selection.rows)
    
    if (selectedRows.length === 0) {
      console.log('没有选中任何行')
      return
    }
    
    const rowsToDelete = [...selectedRows].sort((a, b) => b - a) // 从后往前删除
    console.log('要删除的行索引:', rowsToDelete)
    
    setData(prevData => {
      let newData = [...prevData]
      rowsToDelete.forEach(rowIndex => {
        console.log('删除行索引:', rowIndex)
        newData.splice(rowIndex, 1)
      })
      console.log('删除后的数据长度:', newData.length)
      return newData
    })
    
    // 同时更新原始数据
    setSheetsData(prevSheets => {
      const newSheets = { ...prevSheets }
      let updatedData = [...newSheets[activeSheet]]
      rowsToDelete.forEach(rowIndex => {
        updatedData.splice(rowIndex, 1)
      })
      newSheets[activeSheet] = updatedData
      return newSheets
    })
    
    // 清空选择
    setSelection({
      rows: CompactSelection.empty(),
      columns: CompactSelection.empty()
    })
  }

  // 导出当前表格数据
  const exportCurrentSheet = () => {
    const exportData = {
      sheet: activeSheet,
      title: getSheetTitle(),
      columns: columns.map(col => col.title),
      data: data,
      timestamp: new Date().toISOString(),
      totalRows: data.length
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeSheet}_data.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 处理创建表格模态框
  const handleCreateSheet = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex',
      background: '#fafbfc',
      overflow: 'hidden'
    }}>
      {/* 左侧表格面板 */}
      <SheetPanel
        sheetsData={sheetsData}
        activeSheet={activeSheet}
        switchSheet={switchSheet}
        deleteSheet={deleteSheet}
        onCreateSheet={handleCreateSheet}
      />

      {/* 主要内容区域 */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* 顶部工具栏 */}
        <Toolbar
          sheetTitle={getSheetTitle()}
          data={data}
          columns={columns}
          activeSheet={activeSheet}
          sheetsData={sheetsData}
          loadedRows={loadedRows}
          selection={selection}
          getSelectedRowsCount={getSelectedRowsCount}
          onAddRow={addNewRow}
          onDeleteRows={deleteSelectedRows}
          onExport={exportCurrentSheet}
        />

        {/* 数据表格 */}
        <DataGrid
          dataEditorRef={dataEditorRef}
          getCellContent={getCellContent}
          columns={columns}
          data={data}
          onCellEdited={onCellEdited}
          selection={selection}
          onGridSelectionChange={setSelection}
          onVisibleRegionChanged={handleScroll}
          imageCache={imageCache}
          loadingCache={loadingCache}
          preloadAvatar={preloadAvatar}
        />
      </div>

      {/* 创建表格模态框 */}
      <CreateSheetModal
        showModal={showModal}
        onClose={handleCloseModal}
        onCreateSheet={createNewSheet}
      />
    </div>
  )
}

export default ReactDataGrid