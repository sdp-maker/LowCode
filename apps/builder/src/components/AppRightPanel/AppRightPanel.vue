<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-22 13:31:37
 * @FilePath: \LowCode\apps\builder\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor'

const editorStore = useEditorStore()

// 属性编辑器配置
const propertyEditors = {
  // 文本属性
  content: { type: 'text', label: '内容', placeholder: '请输入内容' },
  text: { type: 'text', label: '文本', placeholder: '请输入文本' },
  title: { type: 'text', label: '标题', placeholder: '请输入标题' },

  // 对齐方式
  align: {
    type: 'select',
    label: '对齐方式',
    options: [
      { value: 'left', label: '左对齐' },
      { value: 'center', label: '居中' },
      { value: 'right', label: '右对齐' }
    ]
  },

  // 颜色属性
  color: { type: 'color', label: '文字颜色' },
  backgroundColor: { type: 'color', label: '背景颜色' },
  borderColor: { type: 'color', label: '边框颜色' },

  // 尺寸属性
  fontSize: { type: 'number', label: '字体大小', min: 8, max: 72, unit: 'px' },
  width: { type: 'number', label: '宽度', min: 50, max: 1000, unit: 'px' },
  height: { type: 'number', label: '高度', min: 20, max: 500, unit: 'px' },

  // 图片属性
  src: { type: 'url', label: '图片地址', placeholder: '请输入图片URL' },
  alt: { type: 'text', label: '图片描述', placeholder: '请输入图片描述' },

  // 按钮属性
  buttonText: { type: 'text', label: '按钮文字', placeholder: '请输入按钮文字' },
  buttonType: {
    type: 'select',
    label: '按钮类型',
    options: [
      { value: 'primary', label: '主要按钮' },
      { value: 'secondary', label: '次要按钮' },
      { value: 'danger', label: '危险按钮' }
    ]
  },

  // 表格属性
  tableData: { type: 'table', label: '表格数据' },
  columns: { type: 'number', label: '列数', min: 1, max: 10 },
  rows: { type: 'number', label: '行数', min: 1, max: 20 },

  // 图表属性 - 移除了图表类型选择器
  chartData: { type: 'json', label: '图表数据 (JSON)' },

  // 卡片属性
  description: { type: 'text', label: '描述', placeholder: '请输入描述' },
  imageUrl: { type: 'url', label: '图片地址', placeholder: '请输入图片URL' },
  imageAlt: { type: 'text', label: '图片描述', placeholder: '请输入图片描述' },
  showImage: { type: 'boolean', label: '显示图片' },
  showButton: { type: 'boolean', label: '显示按钮' },
  shadow: { type: 'boolean', label: '阴影效果' },

  // 列表属性
  items: { type: 'array', label: '列表项' },
  listType: {
    type: 'select',
    label: '列表类型',
    options: [
      { value: 'unordered', label: '无序列表' },
      { value: 'ordered', label: '有序列表' },
      { value: 'none', label: '无样式' }
    ]
  },
  showIcon: { type: 'boolean', label: '显示图标' },
  icon: { type: 'text', label: '图标', placeholder: '请输入图标' },
  itemSpacing: { type: 'number', label: '项目间距', min: 0, max: 50, unit: 'px' },

  // 容器属性
  placeholder: { type: 'text', label: '占位文字', placeholder: '请输入占位文字' },
  borderWidth: { type: 'number', label: '边框宽度', min: 0, max: 10, unit: 'px' },
  borderStyle: {
    type: 'select',
    label: '边框样式',
    options: [
      { value: 'solid', label: '实线' },
      { value: 'dashed', label: '虚线' },
      { value: 'dotted', label: '点线' }
    ]
  },
  borderRadius: { type: 'number', label: '圆角', min: 0, max: 50, unit: 'px' },
  padding: { type: 'number', label: '内边距', min: 0, max: 100, unit: 'px' },
  margin: { type: 'number', label: '外边距', min: 0, max: 100, unit: 'px' },
  minHeight: { type: 'number', label: '最小高度', min: 50, max: 1000, unit: 'px' },
  maxHeight: { type: 'number', label: '最大高度', min: 100, max: 2000, unit: 'px' },
  flexDirection: {
    type: 'select',
    label: '排列方向',
    options: [
      { value: 'row', label: '水平' },
      { value: 'column', label: '垂直' }
    ]
  },
  justifyContent: {
    type: 'select',
    label: '主轴对齐',
    options: [
      { value: 'flex-start', label: '起始' },
      { value: 'center', label: '居中' },
      { value: 'flex-end', label: '末尾' },
      { value: 'space-between', label: '两端对齐' },
      { value: 'space-around', label: '环绕对齐' }
    ]
  },
  alignItems: {
    type: 'select',
    label: '交叉轴对齐',
    options: [
      { value: 'flex-start', label: '起始' },
      { value: 'center', label: '居中' },
      { value: 'flex-end', label: '末尾' },
      { value: 'stretch', label: '拉伸' }
    ]
  },
  gap: { type: 'number', label: '间距', min: 0, max: 50, unit: 'px' },

  // 分隔符属性
  separatorType: {
    type: 'select',
    label: '分隔符类型',
    options: [
      { value: 'line', label: '线条' },
      { value: 'text', label: '文字' },
      { value: 'space', label: '空白' },
      { value: 'dots', label: '点状' }
    ]
  },
  thickness: { type: 'number', label: '厚度', min: 1, max: 20, unit: 'px' },
  style: {
    type: 'select',
    label: '样式',
    options: [
      { value: 'solid', label: '实线' },
      { value: 'dashed', label: '虚线' },
      { value: 'dotted', label: '点线' }
    ]
  },
  marginTop: { type: 'number', label: '上边距', min: 0, max: 100, unit: 'px' },
  marginBottom: { type: 'number', label: '下边距', min: 0, max: 100, unit: 'px' },

  // 引言属性
  author: { type: 'text', label: '作者', placeholder: '请输入作者' },
  source: { type: 'text', label: '来源', placeholder: '请输入来源' },
  authorPrefix: { type: 'text', label: '作者前缀', placeholder: '请输入前缀' },
  quoteStyle: {
    type: 'select',
    label: '引言样式',
    options: [
      { value: 'default', label: '默认' },
      { value: 'modern', label: '现代' },
      { value: 'minimal', label: '简约' },
      { value: 'bordered', label: '边框' }
    ]
  },
  textColor: { type: 'color', label: '文字颜色' },
  authorColor: { type: 'color', label: '作者颜色' },
  italic: { type: 'boolean', label: '斜体' },

  // 笔记属性
  showHeader: { type: 'boolean', label: '显示标题' },
  showTimestamp: { type: 'boolean', label: '显示时间戳' },
  timestamp: { type: 'text', label: '时间戳', placeholder: '请输入时间' },
  noteType: {
    type: 'select',
    label: '笔记类型',
    options: [
      { value: 'info', label: '信息' },
      { value: 'warning', label: '警告' },
      { value: 'success', label: '成功' },
      { value: 'error', label: '错误' },
      { value: 'note', label: '笔记' }
    ]
  },
  titleColor: { type: 'color', label: '标题颜色' }
}

// 获取当前选中块的属性编辑器配置
const currentPropertyEditors = computed(() => {
  if (!editorStore.selectedBlock) return []

  const props = editorStore.selectedBlock.props
  return Object.keys(props).map(key => ({
    key,
    value: props[key],
    ...propertyEditors[key] || { type: 'text', label: key }
  }))
})

function handlePropChange(key: string, value: any) {
  console.log('Property changed:', key, '=', value)
  editorStore.updateBlockProps({ [key]: value })
}

// function handleTableDataChange(key: string, tableData: any[][]) {
//   editorStore.updateBlockProps({ [key]: tableData })
// }

function handleJsonChange(key: string, jsonString: string) {
  try {
    const parsed = JSON.parse(jsonString)
    editorStore.updateBlockProps({ [key]: parsed })
  } catch (error) {
    // 忽略无效的JSON
  }
}

function addTableRow() {
  if (!editorStore.selectedBlock) return
  const currentData = (editorStore.selectedBlock.props.tableData as any[][]) || [[]]
  const newRow = new Array(currentData[0]?.length || 1).fill('')
  const newData = [...currentData, newRow]
  editorStore.updateBlockProps({ tableData: newData })
}

function addTableColumn() {
  if (!editorStore.selectedBlock) return
  const currentData = (editorStore.selectedBlock.props.tableData as any[][]) || [[]]
  const newData = currentData.map(row => [...row, ''])
  editorStore.updateBlockProps({ tableData: newData })
}

function updateTableCell(rowIndex: number, colIndex: number, value: string) {
  if (!editorStore.selectedBlock) return
  const currentData = (editorStore.selectedBlock.props.tableData as any[][]) || [[]]
  const newData = [...currentData]
  if (!newData[rowIndex]) newData[rowIndex] = []
  newData[rowIndex][colIndex] = value
  editorStore.updateBlockProps({ tableData: newData })
}

function addArrayItem(key: string) {
  if (!editorStore.selectedBlock) return
  const currentArray = (editorStore.selectedBlock.props[key] as string[]) || []
  const newArray = [...currentArray, '新项目']
  editorStore.updateBlockProps({ [key]: newArray })
}

function removeArrayItem(key: string, index: number) {
  if (!editorStore.selectedBlock) return
  const currentArray = (editorStore.selectedBlock.props[key] as string[]) || []
  const newArray = currentArray.filter((_, i) => i !== index)
  editorStore.updateBlockProps({ [key]: newArray })
}

function updateArrayItem(key: string, index: number, value: string) {
  if (!editorStore.selectedBlock) return
  const currentArray = (editorStore.selectedBlock.props[key] as string[]) || []
  const newArray = [...currentArray]
  newArray[index] = value
  editorStore.updateBlockProps({ [key]: newArray })
}
</script>

<template>
  <div class="app-right-panel">
    <div v-if="editorStore.selectedBlock" class="props-editor">
      <h3 class="panel-title">属性编辑</h3>
      <div class="block-info">
        <div class="block-type">{{ editorStore.selectedBlock.type }}</div>
        <div class="block-label">{{ editorStore.selectedBlock.label }}</div>
      </div>

      <div class="properties-list">
        <div v-for="editor in currentPropertyEditors" :key="editor.key" class="prop-item">
          <label :for="`prop-${editor.key}`">{{ editor.label }}</label>

          <!-- 文本输入框 -->
          <input v-if="editor.type === 'text'" :id="`prop-${editor.key}`" :value="String(editor.value)"
            :placeholder="editor.placeholder"
            @input="handlePropChange(editor.key, ($event.target as HTMLInputElement).value)" class="prop-input" />

          <!-- 数字输入框 -->
          <div v-else-if="editor.type === 'number'" class="number-input-group">
            <input :id="`prop-${editor.key}`" type="number" :value="Number(editor.value)" :min="editor.min"
              :max="editor.max" @input="handlePropChange(editor.key, Number(($event.target as HTMLInputElement).value))"
              class="prop-input" />
            <span class="unit">{{ editor.unit }}</span>
          </div>

          <!-- 颜色选择器 -->
          <input v-else-if="editor.type === 'color'" :id="`prop-${editor.key}`" type="color"
            :value="String(editor.value)"
            @input="handlePropChange(editor.key, ($event.target as HTMLInputElement).value)" class="prop-color" />

          <!-- 下拉选择框 -->
          <select v-else-if="editor.type === 'select'" :id="`prop-${editor.key}`" :value="String(editor.value)"
            @change="handlePropChange(editor.key, ($event.target as HTMLSelectElement).value)" class="prop-select">
            <option v-for="option in editor.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <!-- URL输入框 -->
          <input v-else-if="editor.type === 'url'" :id="`prop-${editor.key}`" type="url" :value="String(editor.value)"
            :placeholder="editor.placeholder"
            @input="handlePropChange(editor.key, ($event.target as HTMLInputElement).value)" class="prop-input" />

          <!-- 布尔值开关 -->
          <label v-else-if="editor.type === 'boolean'" class="boolean-switch">
            <input type="checkbox" :checked="Boolean(editor.value)"
              @change="handlePropChange(editor.key, ($event.target as HTMLInputElement).checked)" />
            <span class="switch-slider"></span>
          </label>

          <!-- 数组编辑器 -->
          <div v-else-if="editor.type === 'array'" class="array-editor">
            <div class="array-controls">
              <button @click="addArrayItem(editor.key)" class="btn-small">添加项</button>
            </div>
            <div class="array-items">
              <div v-for="(item, index) in (editor.value || [])" :key="index" class="array-item">
                <input :value="item"
                  @input="updateArrayItem(editor.key, index, ($event.target as HTMLInputElement).value)"
                  class="array-item-input" />
                <button @click="removeArrayItem(editor.key, index)" class="btn-remove">×</button>
              </div>
            </div>
          </div>

          <!-- 表格编辑器 -->
          <div v-else-if="editor.type === 'table'" class="table-editor">
            <div class="table-controls">
              <button @click="addTableRow" class="btn-small">添加行</button>
              <button @click="addTableColumn" class="btn-small">添加列</button>
            </div>
            <div class="table-preview">
              <table>
                <tr v-for="(row, rowIndex) in (editor.value || [])" :key="rowIndex">
                  <td v-for="(cell, colIndex) in row" :key="colIndex">
                    <input :value="cell"
                      @input="updateTableCell(rowIndex, colIndex, ($event.target as HTMLInputElement).value)"
                      class="table-cell-input" />
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <!-- JSON编辑器 -->
          <textarea v-else-if="editor.type === 'json'" :id="`prop-${editor.key}`"
            :value="JSON.stringify(editor.value, null, 2)"
            @input="handleJsonChange(editor.key, ($event.target as HTMLTextAreaElement).value)" class="prop-textarea"
            rows="16"></textarea>

          <!-- 默认文本输入框 -->
          <input v-else :id="`prop-${editor.key}`" :value="String(editor.value)"
            @input="handlePropChange(editor.key, ($event.target as HTMLInputElement).value)" class="prop-input" />
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>请选择一个组件以编辑属性</p>
    </div>
  </div>
</template>

<style scoped>
.app-right-panel {
  @apply bg-white p-4 border-l border-gray-200 h-full overflow-y-auto;
}

.app-right-panel {
  scrollbar-width: thin;
  scrollbar-color: rgba(203, 213, 225, 0.8) rgba(241, 245, 249, 0.5);
}

.app-right-panel::-webkit-scrollbar {
  width: 8px;
}

.app-right-panel::-webkit-scrollbar-track {
  background: rgba(248, 250, 252, 0.9);
  border-radius: 4px;
  margin: 2px 0;
  border: 1px solid rgba(226, 232, 240, 0.3);
}

.app-right-panel::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(203, 213, 225, 0.9) 0%, rgba(148, 163, 184, 0.9) 100%);
  border-radius: 4px;
  border: 1px solid rgba(203, 213, 225, 0.3);
  transition: all 0.2s ease;
}

.app-right-panel::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(148, 163, 184, 1) 0%, rgba(100, 116, 139, 1) 100%);
  border-color: rgba(148, 163, 184, 0.5);
  transform: scaleX(1.1);
}

.app-right-panel::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, rgba(100, 116, 139, 1) 0%, rgba(71, 85, 105, 1) 100%);
  border-color: rgba(100, 116, 139, 0.7);
}

.panel-title {
  @apply text-lg font-semibold mb-4 text-gray-800;
}

.block-info {
  @apply mb-4 p-3 bg-gray-50 rounded-md;
}

.block-type {
  @apply text-xs text-gray-500 uppercase tracking-wider;
}

.block-label {
  @apply text-sm font-medium text-gray-700 mt-1;
}

.properties-list {
  @apply space-y-4;
}

.prop-item {
  @apply flex flex-col;
}

label {
  @apply text-sm text-gray-600 mb-2 font-medium;
}

.prop-input {
  @apply px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.prop-select {
  @apply px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.prop-color {
  @apply w-full h-10 border border-gray-300 rounded-md cursor-pointer;
}

.prop-textarea {
  @apply px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm;
}

.number-input-group {
  @apply flex items-center gap-2;
}

.unit {
  @apply text-sm text-gray-500;
}

.table-editor {
  @apply space-y-3;
}

.table-controls {
  @apply flex gap-2;
}

.btn-small {
  @apply px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600;
}

.table-preview {
  @apply border border-gray-300 rounded-md overflow-x-auto;
}

.table-preview table {
  @apply w-full;
}

.table-preview td {
  @apply border border-gray-200 p-1;
}

.table-cell-input {
  @apply w-full px-1 py-0.5 text-xs border-none focus:ring-1 focus:ring-blue-500;
}

.empty-state {
  @apply text-center text-gray-500 mt-8;
}

/* 布尔值开关样式 */
.boolean-switch {
  @apply relative inline-block w-12 h-6 cursor-pointer;
}

.boolean-switch input {
  @apply opacity-0 w-0 h-0;
}

.switch-slider {
  @apply absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-200;
}

.switch-slider:before {
  @apply absolute content-[''] h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-200;
}

.boolean-switch input:checked+.switch-slider {
  @apply bg-blue-500;
}

.boolean-switch input:checked+.switch-slider:before {
  @apply transform translate-x-6;
}

/* 数组编辑器样式 */
.array-editor {
  @apply space-y-2;
}

.array-controls {
  @apply flex justify-end;
}

.array-items {
  @apply space-y-1;
}

.array-item {
  @apply flex items-center gap-2;
}

.array-item-input {
  @apply flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500;
}

.btn-remove {
  @apply w-6 h-6 text-xs bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center;
}
</style>
