<template>
  <div class="view-block">
    <div class="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
        <polyline points="21,15 16,10 5,21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <span>View Container</span>
    </div>
  </div>
</template>

<style scoped>
.view-block {
  @apply p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500;
  min-height: 100px;
}
</style>
