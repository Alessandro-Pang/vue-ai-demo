<!--
 * @Author: zi.yang
 * @Date: 2024-12-10 09:15:22
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-04-21 15:12:48
 * @Description:
 * @FilePath: /vue-app/src/App.vue
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="app-container">
    <nav class="nav-menu">
      <ul>
        <li><router-link to="/">Transformers</router-link></li>
        <li><router-link to="/danmuocclusion">DanmuOcclusion</router-link></li>
        <li><router-link to="/tesseractocr">TesseractOCR</router-link></li>
      </ul>
    </nav>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav-menu {
  background-color: #f0f0f0;
  padding: 1rem;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 0;
}

.nav-menu a.router-link-active {
  color: #4f46e5;
  border-bottom: 2px solid #4f46e5;
}

.content {
  flex: 1;
  padding: 1rem;
}
</style>
