<script setup lang="ts">
import {ref} from 'vue'
import { pipeline } from '@huggingface/transformers';

const img = ref('');
const textarea = ref('');

async function handleUpload(evt: any) {
  const file = evt.target.files[0];
  if (!file) return;
  textarea.value = '';
  // 将图片转换为 url
  const blobUrl = URL.createObjectURL(file)
  img.value = blobUrl;
  // 加载模型
  const pipe = await pipeline('image-to-text', 'Mozilla/distilvit');
  // 执行推理
  const output = await pipe(blobUrl);
  textarea.value = output.map(x => x.generated_text).join('\n');
}
</script>

<template>
  <div>
    <!-- 文件输入框 -->
    <div class="file-upload-container">
      <input id="file-upload" type="file" @change="handleUpload"/>
    </div>

    <!-- 图像和输出框 -->
    <div class="content-container">
      <!-- 原图容器 -->
      <div class="image-container">
        <h3>加载图片:</h3>
        <img :src="img" alt="Uploaded Image" />
      </div>
      <!-- AI 输出解释框 -->
      <div class="output-container">
        <h3>AI 输出：</h3>
        <textarea :value="textarea" rows="10"></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* 整体容器 */
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
}

/* 文件输入框容器 */
.file-upload-container {
  margin-bottom: 20px;
  text-align: center;
}

.file-upload-container input {
  padding: 10px;
  font-size: 16px;
}

/* 图像和输出框容器 */
.content-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}

/* 图像容器 */
.image-container {
  width: 50%;
  max-width: 700px;
  overflow: hidden;
  padding: 0 10px;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.output-container {
  width: 50%;
}

/* 输出框 */
.output-container textarea {
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>


