/*
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-10-21 19:53:39
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-10-21 20:46:26
 * @FilePath: \LowCode\apps\builder\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import LayoutView from '@/views/LayoutView.vue'
import DataSourceView from '@/views/DataSourceView.vue'
import ActionsView from '@/views/ActionsView.vue'
import AppView from '@/components/AppNavigator.vue'

const router = createRouter({
  // 临时使用 Hash 模式避免刷新 404 问题
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/app', // 根路径重定向到app
    },
    {
      path: '/app',
      name: 'app',
      component: AppView,
      redirect: '/app/dataSource', // 默认重定向到数据源页面
      children: [
        {
          path: 'dataSource',
          name: 'dataSource',
          component: DataSourceView,
        },
        {
          path: 'layout',
          name: 'layout',
          component: LayoutView,
        },
        {
          path: 'actions',
          name: 'actions',
          component: ActionsView,
        },
      ],
    },
  ],
})

export default router
