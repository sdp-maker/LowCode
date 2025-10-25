/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-25 16:30:00
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-25 16:30:00
 * @FilePath: \LowCode\apps\builder\src\components\DataSouceContent.vue\react_app\ReactSouceContent.jsx
 * @Description: Glide 风格数据表格组件
 */

import React, { useState, useCallback } from 'react'
import { DataEditor, GridCellKind } from '@glideapps/glide-data-grid'
import '@glideapps/glide-data-grid/dist/index.css'

const ReactDataGrid = () => {
  // 当前选中的表格
  const [activeSheet, setActiveSheet] = useState('users')
  
  // 随机头像生成函数
  const getRandomAvatar = () => {
    const avatars = ['👨', '👩', '🧑', '👴', '👵', '👦', '👧', '🧔', '👱‍♂️', '👱‍♀️', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦱', '👨‍🦲', '👩‍🦲', '👨‍🦳', '👩‍🦳', '🧑‍🦰', '🧑‍🦱', '🧑‍🦲', '🧑‍🦳']
    return avatars[Math.floor(Math.random() * avatars.length)]
  }

  // 不同表格的数据
  const sheetsData = {
    users: [
      ['000', '张三', '23', true, 'basketball', getRandomAvatar(), '篮球爱好者'],
      ['001', '李四', '28', false, 'football, swimming', getRandomAvatar(), '运动达人'],
      ['002', '王五', '32', true, 'reading, music', getRandomAvatar(), '文艺青年'],
      ['003', '赵六', '26', true, 'cooking, travel', getRandomAvatar(), '美食旅行家'],
      ['004', '钱七', '29', false, 'photography', getRandomAvatar(), '摄影师'],
      ['005', '孙八', '24', true, 'gaming, coding', getRandomAvatar(), '程序员'],
      ['006', '周九', '31', true, 'yoga, meditation', getRandomAvatar(), '瑜伽教练'],
      ['007', '吴十', '27', false, 'dancing, singing', getRandomAvatar(), '艺术表演者'],
      ['008', '郑一', '35', true, 'gardening, pets', getRandomAvatar(), '园艺爱好者'],
      ['009', '王二', '22', true, 'movies, books', getRandomAvatar(), '影视书迷'],
      ['010', '李三', '30', false, 'fitness, running', getRandomAvatar(), '健身教练'],
      ['011', '张四', '25', true, 'painting, drawing', getRandomAvatar(), '美术老师'],
      ['012', '陈五', '33', true, 'music, guitar', getRandomAvatar(), '音乐人'],
      ['013', '刘六', '28', false, 'writing, blogging', getRandomAvatar(), '自由撰稿人'],
      ['014', '杨七', '26', true, 'hiking, camping', getRandomAvatar(), '户外探险家'],
      ['015', '黄八', '29', true, 'chess, puzzles', getRandomAvatar(), '智力游戏爱好者'],
      ['016', '林九', '24', false, 'fashion, shopping', getRandomAvatar(), '时尚达人'],
      ['017', '何十', '31', true, 'volunteering, charity', getRandomAvatar(), '公益志愿者'],
      ['018', '马一', '27', true, 'languages, culture', getRandomAvatar(), '语言学习者'],
      ['019', '许二', '34', false, 'investing, finance', getRandomAvatar(), '金融分析师'],
      ['020', '邓三', '23', true, 'technology, AI', getRandomAvatar(), 'AI研究员'],
      ['021', '韩四', '28', true, 'environmental, green', getRandomAvatar(), '环保主义者'],
      ['022', '冯五', '25', false, 'entrepreneurship', getRandomAvatar(), '创业者'],
      ['023', '曹六', '30', true, 'education, teaching', getRandomAvatar(), '教育工作者'],
      ['024', '彭七', '26', true, 'healthcare, medicine', getRandomAvatar(), '医护人员'],
    ],
    orders: [
      ['O001', '电子产品订单', '3200', true, '已完成', '📦', '高端电子设备'],
      ['O002', '服装订单', '800', false, '处理中', '📦', '春季新款服装'],
      ['O003', '家具订单', '5500', true, '已完成', '📦', 'VIP客户定制家具'],
      ['O004', '食品订单', '600', false, '待处理', '📦', '有机食品订单'],
      ['O005', '图书订单', '280', true, '已完成', '📦', '教育类图书'],
      ['O006', '化妆品订单', '1200', true, '已发货', '📦', '进口化妆品'],
      ['O007', '运动器材订单', '2800', false, '处理中', '📦', '健身房设备'],
      ['O008', '汽车配件订单', '4500', true, '已完成', '📦', '原厂配件'],
      ['O009', '办公用品订单', '350', true, '已发货', '📦', '办公文具套装'],
      ['O010', '宠物用品订单', '180', false, '待处理', '📦', '宠物食品和玩具'],
      ['O011', '母婴用品订单', '950', true, '已完成', '📦', '婴儿护理用品'],
      ['O012', '数码配件订单', '420', true, '已发货', '📦', '手机配件'],
      ['O013', '家电订单', '6800', false, '处理中', '📦', '智能家电套装'],
      ['O014', '珠宝订单', '12000', true, '已完成', '📦', '定制珠宝'],
      ['O015', '药品订单', '150', true, '已发货', '📦', '常用药品'],
    ],
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
  }
  
  // 当前数据
  const [data, setData] = useState(sheetsData[activeSheet])

  // 根据当前表格动态定义列
  const getColumns = () => {
    switch (activeSheet) {
      case 'users':
        return [
          { title: 'ID', width: 80 },
          { title: '姓名', width: 100 },
          { title: '年龄', width: 80 },
          { title: '状态', width: 80 },
          { title: '爱好', width: 200 },
          { title: '头像', width: 80 },
          { title: '笔记', width: 250 },
        ]
      case 'orders':
        return [
          { title: 'ID', width: 80 },
          { title: '订单名', width: 120 },
          { title: '金额', width: 100 },
          { title: '状态', width: 80 },
          { title: '类型', width: 120 },
          { title: '图标', width: 80 },
          { title: '备注', width: 200 },
        ]
      case 'foods':
        return [
          { title: 'ID', width: 80 },
          { title: '食物名', width: 120 },
          { title: '价格', width: 80 },
          { title: '状态', width: 80 },
          { title: '分类', width: 100 },
          { title: '图标', width: 80 },
          { title: '描述', width: 200 },
        ]
      default:
        return [
          { title: 'ID', width: 80 },
          { title: '名称', width: 120 },
          { title: '数值', width: 80 },
          { title: '状态', width: 80 },
          { title: '类型', width: 120 },
          { title: '图标', width: 80 },
          { title: '备注', width: 200 },
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
          baseFontStyle: '400 14px system-ui, -apple-system, sans-serif',
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
          baseFontStyle: '400 14px system-ui, -apple-system, sans-serif',
        }
      }
    }
    
    // 其他列都可以编辑，设置字体为14px
    return {
      kind: GridCellKind.Text,
      data: cellData,
      displayData: cellData,
      allowOverlay: true,
      readonly: false,
      themeOverride: {
        baseFontStyle: '400 14px system-ui, -apple-system, sans-serif',
      }
    }
  }, [data])

  // 编辑单元格 - 简化版本，专注于双击编辑
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
    
    // 同时更新原始数据源
    if (sheetsData[activeSheet][row]) {
      sheetsData[activeSheet][row] = [...sheetsData[activeSheet][row]]
      sheetsData[activeSheet][row][col] = valueToSave
    }
  }, [activeSheet])

  // 切换表格
  const switchSheet = (sheetName) => {
    setActiveSheet(sheetName)
    setData(sheetsData[sheetName])
  }

  // 添加新行
  const addNewRow = () => {
    let newRow
    switch (activeSheet) {
      case 'users':
        const newId = String(data.length).padStart(3, '0')
        newRow = [newId, '新用户', '20', '✓', 'swimming', '👤', 'true']
        break
      case 'orders':
        const orderId = `O${String(data.length + 1).padStart(3, '0')}`
        newRow = [orderId, '新订单', '1000', '○', '待处理', '📦', '新订单']
        break
      case 'foods':
        const foodId = `F${String(data.length + 1).padStart(3, '0')}`
        newRow = [foodId, '新食物', '20', '✓', '其他', '🍽️', '新食物']
        break
      default:
        return
    }
    
    setData(prevData => [...prevData, newRow])
    // 同时更新原始数据
    sheetsData[activeSheet] = [...sheetsData[activeSheet], newRow]
  }

  // 删除选中行
  const deleteSelectedRows = (selection) => {
    if (selection.rows.length === 0) return
    
    const rowsToDelete = Array.from(selection.rows).sort((a, b) => b - a) // 从后往前删除
    
    setData(prevData => {
      let newData = [...prevData]
      rowsToDelete.forEach(rowIndex => {
        newData.splice(rowIndex, 1)
      })
      return newData
    })
    
    // 同时更新原始数据
    let updatedData = [...sheetsData[activeSheet]]
    rowsToDelete.forEach(rowIndex => {
      updatedData.splice(rowIndex, 1)
    })
    sheetsData[activeSheet] = updatedData
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

  // 获取表格标题
  const getSheetTitle = () => {
    switch (activeSheet) {
      case 'users': return 'Users'
      case 'orders': return 'Orders'  
      case 'foods': return 'Foods'
      default: return 'Data'
    }
  }

  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex',
      background: '#fafbfc'
    }}>
      {/* 左侧面板 - 模拟 Glide 的 SHEETS 面板 */}
      <div style={{
        width: '280px',
        background: 'white',
        borderRight: '1px solid #e1e5e9',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e1e5e9',
          background: '#fafbfc'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            letterSpacing: '0.5px'
          }}>
            SHEETS
          </h3>
        </div>
        
        <div style={{ flex: 1, padding: '12px' }}>
          <div 
            onClick={() => switchSheet('users')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '6px',
              background: activeSheet === 'users' ? '#f3f4f6' : 'transparent',
              marginBottom: '4px',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeSheet !== 'users') e.target.style.background = '#f9fafb'
            }}
            onMouseLeave={(e) => {
              if (activeSheet !== 'users') e.target.style.background = 'transparent'
            }}
          >
            <span style={{ 
              fontSize: '14px', 
              color: activeSheet === 'users' ? '#374151' : '#6b7280', 
              fontWeight: activeSheet === 'users' ? '500' : '400'
            }}>
              📊 Users {sheetsData.users.length} Rows
            </span>
          </div>
          
          <div 
            onClick={() => switchSheet('orders')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '6px',
              background: activeSheet === 'orders' ? '#f3f4f6' : 'transparent',
              marginBottom: '4px',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeSheet !== 'orders') e.target.style.background = '#f9fafb'
            }}
            onMouseLeave={(e) => {
              if (activeSheet !== 'orders') e.target.style.background = 'transparent'
            }}
          >
            <span style={{ 
              fontSize: '14px', 
              color: activeSheet === 'orders' ? '#374151' : '#6b7280',
              fontWeight: activeSheet === 'orders' ? '500' : '400'
            }}>
              📋 Orders {sheetsData.orders.length} Rows
            </span>
          </div>
          
          <div 
            onClick={() => switchSheet('foods')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '6px',
              background: activeSheet === 'foods' ? '#f3f4f6' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeSheet !== 'foods') e.target.style.background = '#f9fafb'
            }}
            onMouseLeave={(e) => {
              if (activeSheet !== 'foods') e.target.style.background = 'transparent'
            }}
          >
            <span style={{ 
              fontSize: '14px', 
              color: activeSheet === 'foods' ? '#374151' : '#6b7280',
              fontWeight: activeSheet === 'foods' ? '500' : '400'
            }}>
              🍔 Foods {sheetsData.foods.length} Rows
            </span>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 顶部工具栏 - 模拟 Glide 样式 */}
        <div style={{
          padding: '8px 16px',
          background: 'white',
          borderBottom: '1px solid #e1e5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '48px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* 表格图标 */}
            <div style={{
              width: '20px',
              height: '20px',
              background: '#3b82f6',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontSize: '14px' }}>📊</span>
            </div>
            
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#1f2937' 
            }}>
              {getSheetTitle()}
            </span>
            
            <button
              onClick={addNewRow}
              style={{
                padding: '4px 8px',
                background: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                marginLeft: '12px'
              }}
            >
              + 添加行
            </button>
            
            <button
              onClick={exportCurrentSheet}
              style={{
                padding: '4px 8px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                marginLeft: '8px'
              }}
            >
              📤 导出
            </button>
            
          </div>
          
          <div style={{ 
            fontSize: '14px', 
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <span>{data.length} 行</span>
            <span>{columns.length} 列</span>
            <span style={{ color: '#6b7280' }}>💡 双击单元格编辑</span>
          </div>
        </div>

        {/* 数据表格 */}
        <div style={{ flex: 1 }}>
          <DataEditor
            getCellContent={getCellContent}
            columns={columns}
            rows={data.length}
            onCellEdited={onCellEdited}
            smoothScrollX={true}
            smoothScrollY={true}
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
              headerFontStyle: '500 14px system-ui, -apple-system, sans-serif',
              baseFontStyle: '400 14px system-ui, -apple-system, sans-serif',
            }}
            headerHeight={36}
            rowHeight={36}
            overlayTarget={document.getElementById('portal')}
          />
        </div>
      </div>
    </div>
  )
}

export default ReactDataGrid