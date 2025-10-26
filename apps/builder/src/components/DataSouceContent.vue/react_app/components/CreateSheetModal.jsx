/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-26 16:30:00
 * @Description: 创建表格模态框组件
 */

import React, { useState } from 'react'
import { TEMPLATE_OPTIONS } from '../utils/constants'

const CreateSheetModal = ({ 
  showModal, 
  onClose, 
  onCreateSheet 
}) => {
  const [sheetName, setSheetName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('products')

  const handleCreate = () => {
    const success = onCreateSheet(sheetName, selectedTemplate)
    if (success) {
      setSheetName('')
      setSelectedTemplate('products')
      onClose()
    }
  }

  const handleClose = () => {
    setSheetName('')
    setSelectedTemplate('products')
    onClose()
  }

  if (!showModal) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        width: '480px',
        maxWidth: '90vw',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* 模态框标题 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            创建新表格
          </h3>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#374151'}
            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
          >
            ×
          </button>
        </div>

        {/* 表格名称输入 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            表格名称
          </label>
          <input
            type="text"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            placeholder="请输入表格名称"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        {/* 模板选择 */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '12px'
          }}>
            选择模板
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {TEMPLATE_OPTIONS.map((template) => (
              <div
                key={template.key}
                onClick={() => setSelectedTemplate(template.key)}
                style={{
                  padding: '12px',
                  border: selectedTemplate === template.key ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedTemplate === template.key ? '#f8fafc' : 'white'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '16px', marginRight: '8px' }}>{template.icon}</span>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: selectedTemplate === template.key ? '#4f46e5' : '#374151'
                  }}>
                    {template.name}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: '1.4'
                }}>
                  {template.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 按钮组 */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={handleClose}
            style={{
              padding: '8px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f9fafb'
              e.target.style.borderColor = '#9ca3af'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.borderColor = '#d1d5db'
            }}
          >
            取消
          </button>
          <button
            onClick={handleCreate}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#4f46e5',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4338ca'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4f46e5'}
          >
            创建表格
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateSheetModal
