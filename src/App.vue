<!--
 * @Author: zi.yang
 * @Date: 2024-12-10 09:15:22
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-04-21 15:41:36
 * @Description:
 * @FilePath: /vue-app/src/App.vue
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function handleLogoClick() {
  window.open('https://github.com/Alessandro-Pang/vue-ai-demo')
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo" @click="">Vue AI Demo</div>
      <nav class="nav-menu">
        <ul>
          <li><router-link to="/">Transformers</router-link></li>
          <li><router-link to="/danmuocclusion">DanmuOcclusion</router-link></li>
          <li><router-link to="/tesseractocr">TesseractOCR</router-link></li>
        </ul>
      </nav>
    </header>
    <main class="content">
      <router-view />
    </main>
    <footer class="app-footer">
      <p>© 2025 Vue AI Demo - All rights reserved</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  background-color: var(--card-bg);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--border-color);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: -0.5px;
}

.nav-menu {
  padding: 0.5rem 0;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-menu a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: var(--transition);
}

.nav-menu a:hover {
  color: var(--primary-color);
  text-decoration: none;
}

.nav-menu a.router-link-active {
  color: var(--primary-color);
}

.nav-menu a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-menu a:hover::after,
.nav-menu a.router-link-active::after {
  width: 100%;
}

.content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  padding: 1.5rem;
  text-align: center;
  background-color: var(--card-bg);
  border-top: 1px solid var(--border-color);
  color: var(--text-color-light);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    padding: 1rem;
  }
  
  .logo {
    margin-bottom: 0.5rem;
  }
  
  .nav-menu ul {
    gap: 1rem;
  }
  
  .content {
    padding: 1rem;
  }
}
</style>
