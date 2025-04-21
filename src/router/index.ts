/*
 * @Author: zi.yang
 * @Date: 2025-04-21 15:15:05
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-04-21 16:59:44
 * @Description: 
 * @FilePath: /vue-app/src/router/index.ts
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// 自动导入pages目录下的所有页面组件
const pages = import.meta.glob('../pages/*.vue')

// 根据文件名生成路由配置
const routes: RouteRecordRaw[] = Object.keys(pages).map(path => {
  // 从路径中提取文件名作为路由名称
  const name = path.match(/\.\.\/pages\/(.+)\.vue$/)?.[1] || ''
  return {
    path: name === 'Transformers' ? '/' : `/${name.toLowerCase()}`,
    name,
    component: pages[path],
    meta: {
      title: name
    }
  }
})

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router