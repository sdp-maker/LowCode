<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 17:20:14
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-27 23:00:00
 * @FilePath: \LowCode\apps\builder\src\components\AppLeftPanel\NavigationDrawer.vue
 * @Description: 导航面板，显示页面列表和管理功能
-->
<script setup lang="ts">
import { ref } from 'vue'
import { usePagesStore } from '@/stores/pages'

const pagesStore = usePagesStore()

// 添加页面弹窗状态
const showAddPageModal = ref(false)
const newPageName = ref('')
const newPageDescription = ref('')

// 显示添加页面弹窗
const showAddModal = () => {
  newPageName.value = ''
  newPageDescription.value = ''
  showAddPageModal.value = true
}

// 添加页面
const handleAddPage = () => {
  if (newPageName.value.trim()) {
    const newPage = pagesStore.addPage(newPageName.value.trim(), newPageDescription.value.trim() || undefined)
    pagesStore.switchToPage(newPage.id)
    showAddPageModal.value = false
  }
}

// 切换页面
const handlePageClick = (pageId: string) => {
  pagesStore.switchToPage(pageId)
}

// 删除页面
const handleDeletePage = (pageId: string, event: Event) => {
  event.stopPropagation()
  pagesStore.deletePage(pageId)
}
</script>

<template>
  <div class="navigation-drawer h-full flex flex-col h-[200px]">
    <div class="drawer-header">
      <h3 class="header-title">导航</h3>
      <button class="add-page-button" @click="showAddModal" title="添加页面">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1V15M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <div class="drawer-content">
      <div class="pages-list">
        <div v-for="page in pagesStore.pages" :key="page.id" class="nav-item"
          :class="{ 'active': page.id === pagesStore.currentPageId }" @click="handlePageClick(page.id)">
          <div class="nav-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z"
                stroke="currentColor" stroke-width="1.5" />
              <path d="M6 6H10M6 8H10M6 10H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          <div class="nav-text">
            <div class="nav-name">{{ page.name }}</div>
            <div v-if="page.description" class="nav-description">{{ page.description }}</div>
          </div>
          <button v-if="pagesStore.pages.length > 1" class="delete-page-button"
            @click="handleDeletePage(page.id, $event)" title="删除页面">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 添加页面弹窗 -->
    <div v-if="showAddPageModal" class="modal-overlay" @click="showAddPageModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>添加新页面</h3>
          <button class="close-button" @click="showAddPageModal = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-content">
          <div class="form-group">
            <label for="pageName">页面名称 *</label>
            <input id="pageName" v-model="newPageName" type="text" placeholder="请输入页面名称" @keyup.enter="handleAddPage" />
          </div>
          <div class="form-group">
            <label for="pageDescription">页面描述</label>
            <textarea id="pageDescription" v-model="newPageDescription" placeholder="请输入页面描述（可选）" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-button" @click="showAddPageModal = false">取消</button>
          <button class="confirm-button" :disabled="!newPageName.trim()" @click="handleAddPage">
            添加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navigation-drawer {
  @apply bg-white h-full;
}

.drawer-header {
  @apply border-b border-gray-100 flex items-center justify-between pb-4;
}

.header-title {
  @apply text-sm font-semibold text-gray-800 m-0;
}

.add-page-button {
  @apply w-7 h-7 bg-white border border-gray-300 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors;
}

.drawer-content {
  @apply flex-1 py-2 overflow-y-auto;
  max-height: calc(100vh - 200px);
  /* 美化滚动条 */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

/* Webkit 滚动条样式 */
.drawer-content::-webkit-scrollbar {
  width: 6px;
}

.drawer-content::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.drawer-content::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.drawer-content::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}

.pages-list {
  @apply flex flex-col gap-1;
}

.nav-item {
  @apply flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors relative;
  min-height: 48px;
}

.nav-item.active {
  @apply bg-blue-50 text-blue-700;
}

.nav-icon {
  @apply w-4 h-4 mr-3 flex-shrink-0;
}

.nav-text {
  @apply flex-1 min-w-0;
}

.nav-name {
  @apply font-medium truncate;
}

.nav-description {
  @apply text-xs text-gray-500 truncate mt-0.5;
}

.delete-page-button {
  @apply w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 ml-2 flex-shrink-0;
  transition: opacity 0.2s;
}

.nav-item:hover .delete-page-button {
  opacity: 1;
}

/* 弹窗样式 */
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.modal {
  @apply bg-white rounded-lg shadow-xl w-96 max-w-[90vw];
  animation: modal-appear 0.2s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.modal-header h3 {
  @apply text-lg font-semibold text-gray-900 m-0;
}

.close-button {
  @apply w-8 h-8 text-gray-500 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors;
}

.modal-content {
  @apply p-4 space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-group label {
  @apply block text-sm font-medium text-gray-700;
}

.form-group input,
.form-group textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

.form-group textarea {
  @apply resize-none;
}

.modal-footer {
  @apply flex items-center justify-end gap-3 p-4 border-t border-gray-200;
}

.cancel-button {
  @apply px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors;
}

.confirm-button {
  @apply px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed;
}
</style>
