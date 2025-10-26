/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 左侧表格面板组件
 */

import React from 'react'
import { formatNumber } from '../utils/dataGenerators'
import { DEFAULT_SHEETS } from '../utils/constants'

const SheetPanel = ({ 
  sheetsData, 
  activeSheet, 
  switchSheet, 
  deleteSheet, 
  onCreateSheet 
}) => {
  const getSheetInfo = (key) => {
    switch (key) {
      case 'users':
        return { 
          name: 'Users', 
          icon: '#667eea', 
          iconPaths: [
            'M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21',
            'M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z',
            'M23 21V19C23 18.1645 22.7155 17.3541 22.2094 16.6977C21.7033 16.0414 20.9983 15.5759 20.2 15.3726',
            'M16 3.37256C16.7983 3.57586 17.5033 4.04139 18.0094 4.69773C18.5155 5.35407 18.8 6.16454 18.8 7C18.8 7.83546 18.5155 8.64593 18.0094 9.30227C17.5033 9.95861 16.7983 10.4241 16 10.6274'
          ]
        }
      case 'orders':
        return { 
          name: 'Orders', 
          icon: '#f093fb', 
          iconPaths: [
            'M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z',
            'M3.27 6.96L12 12.01L20.73 6.96',
            'M12 22.08V12'
          ]
        }
      case 'foods':
        return { 
          name: 'Foods', 
          icon: '#4facfe', 
          iconPaths: [
            'M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z',
            'M3 6H21',
            'M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10'
          ]
        }
      default:
        // 获取自定义名称
        const customName = sheetsData[key]?.customName || 'Custom'
        return { 
          name: customName, 
          icon: '#10b981', 
          iconPaths: [
            'M9 12H15',
            'M9 16H15', 
            'M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 17 21Z'
          ]
        }
    }
  }

  return (
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
        background: '#fafbfc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        <button
          onClick={onCreateSheet}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            background: 'white',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#f8fafc'
            e.target.style.color = '#4f46e5'
            e.target.style.borderColor = '#c7d2fe'
            e.target.style.boxShadow = '0 2px 4px rgba(79, 70, 229, 0.1)'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'white'
            e.target.style.color = '#6b7280'
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
            e.target.style.transform = 'scale(1)'
          }}
          title="添加新表格 (随机模板)"
        >
          +
        </button>
      </div>
      
      <div style={{ flex: 1, padding: '12px' }}>
        {/* 动态渲染所有表格 */}
        {Object.keys(sheetsData).map((sheetKey) => {
          const sheetInfo = getSheetInfo(sheetKey)
          
          return (
            <div 
              key={sheetKey}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                background: activeSheet === sheetKey ? '#f3f4f6' : 'transparent',
                marginBottom: '4px',
                transition: 'background 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (activeSheet !== sheetKey) e.target.style.background = '#f9fafb'
              }}
              onMouseLeave={(e) => {
                if (activeSheet !== sheetKey) e.target.style.background = 'transparent'
              }}
            >
              {/* 主要内容区域 - 可点击切换表格 */}
              <div
                onClick={() => switchSheet(sheetKey)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  cursor: 'pointer'
                }}
              >
                <span style={{ 
                  fontSize: '14px', 
                  color: activeSheet === sheetKey ? '#374151' : '#6b7280', 
                  fontWeight: activeSheet === sheetKey ? '500' : '400',
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
                    {sheetInfo.iconPaths ? (
                      sheetInfo.iconPaths.map((path, index) => (
                        <path
                          key={index}
                          d={path}
                          stroke={activeSheet === sheetKey ? sheetInfo.icon : '#9ca3af'}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      ))
                    ) : (
                      <path
                        d={sheetInfo.iconPath}
                        stroke={activeSheet === sheetKey ? sheetInfo.icon : '#9ca3af'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    )}
                  </svg>
                  {sheetInfo.name} {formatNumber(sheetsData[sheetKey].length)} Rows
                </span>
              </div>

              {/* 删除按钮 - 只对自定义表格显示 */}
              {!DEFAULT_SHEETS.includes(sheetKey) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation() // 防止触发表格切换
                    deleteSheet(sheetKey)
                  }}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: 'none',
                    background: 'transparent',
                    color: '#ef4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    opacity: 0.6,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1'
                    e.target.style.background = '#fef2f2'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.6'
                    e.target.style.background = 'transparent'
                  }}
                  title={`删除表格: ${sheetInfo.name}`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline
                      points="3,6 5,6 21,6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19,6V20C19,20.5304 18.7893,21.0391 18.4142,21.4142C18.0391,21.7893 17.5304,22 17,22H7C6.46957,22 5.96086,21.7893 5.58579,21.4142C5.21071,21.0391 5,20.5304 5,20V6M8,6V4C8,3.46957 8.21071,2.96086 8.58579,2.58579C8.96086,2.21071 9.46957,2 10,2H14C14.5304,2 15.0391,2.21071 15.4142,2.58579C15.7893,2.96086 16,3.46957 16,4V6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SheetPanel
