/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 顶部工具栏组件
 */

import React from 'react'
import { formatNumber } from '../utils/dataGenerators'

const Toolbar = ({ 
  sheetTitle,
  data,
  columns,
  activeSheet,
  sheetsData,
  loadedRows,
  selection,
  getSelectedRowsCount,
  onAddRow,
  onDeleteRows,
  onExport
}) => {
  return (
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
          {sheetTitle}
        </span>
        
        <button
          onClick={onAddRow}
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
          onClick={() => onDeleteRows(selection)}
          disabled={getSelectedRowsCount(selection) === 0}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            color: getSelectedRowsCount(selection) === 0 ? '#d1d5db' : '#dc2626',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: getSelectedRowsCount(selection) === 0 ? 'not-allowed' : 'pointer',
            marginLeft: '8px',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: getSelectedRowsCount(selection) === 0 ? 0.5 : 1
          }}
          onMouseEnter={(e) => {
            if (getSelectedRowsCount(selection) > 0) {
              e.target.style.color = '#b91c1c'
              e.target.style.borderColor = '#fecaca'
              e.target.style.background = '#fef2f2'
            }
          }}
          onMouseLeave={(e) => {
            if (getSelectedRowsCount(selection) > 0) {
              e.target.style.color = '#dc2626'
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.background = 'transparent'
            }
          }}
        >
          <svg
            width="14"
            height="14"
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
            <line
              x1="10"
              y1="11"
              x2="10"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="14"
              y1="11"
              x2="14"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          删除行 {getSelectedRowsCount(selection) > 0 && `(${getSelectedRowsCount(selection)})`}
        </button>
        
        <button
          onClick={onExport}
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
        <span>{data?.length || 0} 行</span>
        <span>{columns?.length || 0} 列</span>
        {(activeSheet === 'users' || activeSheet === 'orders') && (
          <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
            已加载 {formatNumber(loadedRows)}/{formatNumber(sheetsData[activeSheet].length)}
          </span>
        )}
        <span style={{ color: '#6b7280' }}>💡 双击单元格编辑</span>
      </div>
    </div>
  )
}

export default Toolbar
