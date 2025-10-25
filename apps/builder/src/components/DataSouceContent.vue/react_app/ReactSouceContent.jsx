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

// 添加旋转动画样式
const spinKeyframes = `
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

const ReactDataGrid = () => {
  // 当前选中的表格
  const [activeSheet, setActiveSheet] = useState('users')
  
  // 懒加载相关状态
  const [loadedRows, setLoadedRows] = useState(100) // 初始加载100行，适应大数据量
  const [isLoading, setIsLoading] = useState(false)
  
  // 头像图片缓存 - 使用持久化缓存
  const imageCache = React.useRef(new Map())
  const loadingCache = React.useRef(new Set()) // 正在加载的URL集合
  const [cacheVersion, setCacheVersion] = useState(0) // 用于强制重绘
  
  // 预加载头像函数 - 带持久化缓存
  const preloadAvatar = useCallback((url, onLoad) => {
    if (!url || !url.startsWith('http')) return
    
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
      
      // 将图片转换为base64并存储到localStorage（可选）
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 64
        canvas.height = 64
        ctx.drawImage(img, 0, 0, 64, 64)
        const base64 = canvas.toDataURL('image/jpeg', 0.8)
        localStorage.setItem(`avatar_${btoa(url)}`, base64)
      } catch (e) {
        // localStorage可能已满，忽略错误
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
      const base64 = localStorage.getItem(`avatar_${btoa(url)}`)
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
  
  // 真实头像生成函数 - 使用真实人物头像API
  const getRandomAvatar = (seed, index) => {
    // 使用多个真实头像服务
    const avatarServices = [
      // ThisPersonDoesNotExist - AI生成的真实人脸
      `https://thispersondoesnotexist.com/image?${index}`,
      // Pravatar - 真实头像库
      `https://i.pravatar.cc/64?img=${(index % 70) + 1}`,
      // Picsum Photos - 人物照片
      `https://picsum.photos/seed/${seed}/64/64?random=${index}`,
      // 备用：使用更真实的DiceBear风格
      `https://api.dicebear.com/7.x/notionists/png?seed=${seed}&size=64`,
      `https://api.dicebear.com/7.x/lorelei/png?seed=${seed}&size=64`,
      // JSONPlaceholder 头像
      `https://robohash.org/${seed}?set=set4&size=64x64&bgset=bg1`,
    ]
    
    // 优先使用真实头像服务
    const serviceIndex = index % avatarServices.length
    return avatarServices[serviceIndex]
  }

  // 随机姓名生成函数
  const getRandomName = () => {
    const surnames = ['张', '李', '王', '赵', '钱', '孙', '周', '吴', '郑', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹']
    const names = ['伟', '芳', '娜', '敏', '静', '立', '丽', '强', '磊', '军', '洋', '勇', '艳', '杰', '娟', '涛', '明', '超', '秀英', '霞', '平', '刚', '桂英', '建华', '文', '华', '金凤', '志强', '秀兰', '秀珍', '建国', '国强', '玉兰', '秀云', '桂兰', '志明', '春梅', '建军', '海燕', '志华', '玉梅', '秀梅', '丽娟', '志刚', '桂珍', '建平', '玉珍', '桂花', '志勇', '丽华', '晓明', '小红', '小丽', '小华', '小军', '小燕', '小峰', '小雨', '小雪', '小月', '小阳', '小春', '小夏', '小秋', '小冬', '晨曦', '雨露', '星辰', '月亮', '阳光', '彩虹', '梦想', '希望', '未来', '成功', '幸福', '快乐', '健康', '平安', '吉祥', '如意', '美好', '温馨', '和谐', '宁静']
    return surnames[Math.floor(Math.random() * surnames.length)] + names[Math.floor(Math.random() * names.length)]
  }

  // 随机爱好生成函数
  const getRandomHobbies = () => {
    const hobbies = ['basketball', 'football', 'swimming', 'reading', 'music', 'cooking', 'travel', 'photography', 'gaming', 'coding', 'yoga', 'meditation', 'dancing', 'singing', 'gardening', 'pets', 'movies', 'books', 'fitness', 'running', 'painting', 'drawing', 'guitar', 'writing', 'blogging', 'hiking', 'camping', 'chess', 'puzzles', 'fashion', 'shopping', 'volunteering', 'charity', 'languages', 'culture', 'investing', 'finance', 'technology', 'AI', 'environmental', 'green', 'entrepreneurship', 'education', 'teaching', 'healthcare', 'medicine']
    const count = Math.floor(Math.random() * 3) + 1 // 1-3个爱好
    const selectedHobbies = []
    for (let i = 0; i < count; i++) {
      const hobby = hobbies[Math.floor(Math.random() * hobbies.length)]
      if (!selectedHobbies.includes(hobby)) {
        selectedHobbies.push(hobby)
      }
    }
    return selectedHobbies.join(', ')
  }

  // 随机描述生成函数
  const getRandomDescription = () => {
    const descriptions = ['热爱生活的人', '积极向上', '乐观开朗', '工作认真', '学习能力强', '团队合作', '创新思维', '责任心强', '沟通能力佳', '执行力强', '细心负责', '勤奋努力', '善于思考', '富有创意', '专业技能强', '经验丰富', '适应能力强', '学习新技术', '解决问题能力强', '领导能力', '组织协调', '客户服务', '市场敏感', '数据分析', '项目管理']
    return descriptions[Math.floor(Math.random() * descriptions.length)]
  }

  // 生成大量用户数据的函数
  const generateLargeUserData = () => {
    const users = []
    for (let i = 0; i < 100000; i++) { // 生成10万个用户数据，模拟大型应用场景
      const id = String(i).padStart(3, '0')
      const name = getRandomName()
      const age = Math.floor(Math.random() * 40) + 18 // 18-58岁
      const status = Math.random() > 0.3 // 70%概率为true
      const hobbies = getRandomHobbies()
      const avatar = getRandomAvatar(`${name}-${i}`, i) // 使用姓名和索引生成真实头像
      const description = getRandomDescription()
      
      users.push([id, name, age.toString(), status, hobbies, avatar, description])
    }
    return users
  }

  // 不同表格的数据
  const sheetsData = {
    users: generateLargeUserData(),
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
  
  // 当前数据 - 根据懒加载状态返回部分数据
  const getCurrentData = () => {
    const fullData = sheetsData[activeSheet]
    if (activeSheet === 'users') {
      return fullData.slice(0, loadedRows)
    }
    return fullData
  }
  
  const [data, setData] = useState(getCurrentData())

  // 预加载可见区域的头像
  React.useEffect(() => {
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
    if (activeSheet !== 'users' || isLoading) return
    
    const fullData = sheetsData[activeSheet]
    if (loadedRows >= fullData.length) return
    
    setIsLoading(true)
    
    // 模拟网络延迟，每次加载更多数据
    setTimeout(() => {
      const newLoadedRows = Math.min(loadedRows + 100, fullData.length) // 每次加载100行
      setLoadedRows(newLoadedRows)
      setData(fullData.slice(0, newLoadedRows))
      setIsLoading(false)
    }, 300) // 减少延迟时间
  }, [activeSheet, isLoading, loadedRows])

  // 处理可见区域变化，检测是否需要加载更多数据
  const handleScroll = useCallback((region) => {
    if (activeSheet !== 'users' || isLoading) return
    
    const { y, height } = region
    const visibleEndRow = y + height
    const totalRows = sheetsData.users.length
    
    // 当可见区域接近已加载数据的末尾时，加载更多数据
    if (visibleEndRow > loadedRows - 50 && loadedRows < totalRows) {
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
  }, [activeSheet, isLoading, loadedRows, loadMoreData, data, preloadAvatar])

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
    
    if (sheetName === 'users') {
      // 重置懒加载状态
      setLoadedRows(100)
      setData(sheetsData[sheetName].slice(0, 100))
    } else {
      setData(sheetsData[sheetName])
    }
  }

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
      background: '#fafbfc',
      overflow: 'hidden'
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
              fontWeight: activeSheet === 'users' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '4px' }}
              >
                <path
                  d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                  stroke={activeSheet === 'users' ? '#667eea' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="8.5"
                  cy="7"
                  r="4"
                  stroke={activeSheet === 'users' ? '#667eea' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9983 15.5759 20.2 15.3726"
                  stroke={activeSheet === 'users' ? '#667eea' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 3.37256C16.7983 3.57586 17.5033 4.04139 18.0094 4.69773C18.5155 5.35407 18.8 6.16454 18.8 7C18.8 7.83546 18.5155 8.64593 18.0094 9.30227C17.5033 9.95861 16.7983 10.4241 16 10.6274"
                  stroke={activeSheet === 'users' ? '#667eea' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Users {sheetsData.users.length} Rows
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
              fontWeight: activeSheet === 'orders' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '4px' }}
              >
                <path
                  d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
                  stroke={activeSheet === 'orders' ? '#f093fb' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="3.27,6.96 12,12.01 20.73,6.96"
                  stroke={activeSheet === 'orders' ? '#f093fb' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="22.08"
                  x2="12"
                  y2="12"
                  stroke={activeSheet === 'orders' ? '#f093fb' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Orders {sheetsData.orders.length} Rows
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
              fontWeight: activeSheet === 'foods' ? '500' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: '4px' }}
              >
                <path
                  d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                  stroke={activeSheet === 'foods' ? '#4facfe' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="3,6 21,6"
                  stroke={activeSheet === 'foods' ? '#4facfe' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                  stroke={activeSheet === 'foods' ? '#4facfe' : '#9ca3af'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Foods {sheetsData.foods.length} Rows
            </span>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }}>
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '8px' }}
            >
              <path
                d="M4 7C4 4.79086 5.79086 3 8 3H16C18.2091 3 20 4.79086 20 7V17C20 19.2091 18.2091 21 16 21H8C5.79086 21 4 19.2091 4 17V7Z"
                stroke="#667eea"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 7H20"
                stroke="#667eea"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 7V21"
                stroke="#667eea"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 7V21"
                stroke="#667eea"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="2"
                fill="#667eea"
              />
            </svg>
            
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
                padding: '6px 12px',
                background: 'transparent',
                color: '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                marginLeft: '12px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#374151'
                e.target.style.borderColor = '#d1d5db'
                e.target.style.background = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6b7280'
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.background = 'transparent'
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              添加行
            </button>
            
            <button
              onClick={exportCurrentSheet}
              style={{
                padding: '6px 12px',
                background: 'transparent',
                color: '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                marginLeft: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#374151'
                e.target.style.borderColor = '#d1d5db'
                e.target.style.background = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6b7280'
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.background = 'transparent'
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="7,10 12,15 17,10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="15"
                  x2="12"
                  y2="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              导出
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
            {activeSheet === 'users' && (
              <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {isLoading ? (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ animation: 'spin 1s linear infinite' }}
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.25"
                      />
                      <path
                        d="M21 12C21 7.02944 16.9706 3 12 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    加载中...
                  </>
                ) : (
                  <>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    已加载 {loadedRows}/{sheetsData.users.length}
                  </>
                )}
              </span>
            )}
            <span style={{ color: '#6b7280' }}>💡 双击单元格编辑</span>
          </div>
        </div>

        {/* 数据表格 */}
        <div style={{ 
          flex: 1, 
          height: 'calc(100vh - 64px)', 
          overflow: 'hidden',
          position: 'relative'
        }}>
          <DataEditor
            getCellContent={getCellContent}
            columns={columns}
            rows={data.length}
            onCellEdited={onCellEdited}
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
                  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']
                  const colorIndex = name.charCodeAt(0) % colors.length
                  
                  // 绘制彩色圆形背景
                  ctx.beginPath()
                  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                  ctx.fillStyle = colors[colorIndex]
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
                    const cachedImg = imageCache.current.get(url)
                    
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
                    } else if (!loadingCache.current.has(url) && !imageCache.current.has(url)) {
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
            onVisibleRegionChanged={handleScroll}
          />
        </div>
      </div>
    </div>
  )
}

export default ReactDataGrid