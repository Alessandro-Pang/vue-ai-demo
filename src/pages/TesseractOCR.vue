<!--
 * @Author: zi.yang
 * @Date: 2024-12-10 09:15:22
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-01-14 08:06:25
 * @Description: 使用 tesseract.js 实现 OCR
 * @FilePath: /vue-app/src/components/HelloWorld.vue
-->
<script setup lang="ts">
import {ref} from 'vue'
import {createWorker, OEM} from 'tesseract.js';

const uploadFileName = ref<string>("");
const imgText = ref<string>("");

const imgInput = ref<string>("")
const imgOriginal = ref<string>("");
const imgGrey = ref<string>("");
const imgBinary = ref<string>("");

async function handleUpload(evt: any) {
  const file = evt.target.files?.[0];
  if (!file) return;
  uploadFileName.value = file.name;
  imgInput.value = URL.createObjectURL(file);
  const worker = await createWorker('chi_sim', OEM.DEFAULT,{
    langPath: 'https://unpkg.com/@tesseract.js-data/chi_sim/4.0.0_best_int',
    workerPath: 'https://unpkg.com/tesseract.js/dist/worker.min.js',
    corePath: 'https://unpkg.com/tesseract.js-core/tesseract-core-simd-lstm.wasm.js',
  });
  const ret = await worker.recognize(file, {rotateAuto: true}, {imageColor: true, imageGrey: true, imageBinary: true});
  imgText.value = ret.data.text || '';
  imgOriginal.value = ret.data.imageColor || '';
  imgGrey.value = ret.data.imageGrey || '';
  imgBinary.value = ret.data.imageBinary || '';
}

// 占位符 svg
const svgIcon =  encodeURIComponent('<svg t="1736901745913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4323" width="140" height="140"><path d="M804.9 243.4c8.1 0 17.1 10.5 17.1 24.5v390.9c0 14-9.1 24.5-17.3 24.5H219.3c-8 0-17.3-10.7-17.3-24.5V267.9c0-14 9.1-24.5 17.3-24.5h585.6m0-80H219.3c-53.5 0-97.3 47-97.3 104.5v390.9c0 57.3 43.8 104.5 97.3 104.5h585.4c53.5 0 97.3-47 97.3-104.5V267.9c0-57.5-43.7-104.5-97.1-104.5z" fill="#5E9EFC" p-id="4324"></path><path d="M678.9 294.5c28 0 50.6 22.7 50.6 50.6 0 28-22.7 50.6-50.6 50.6s-50.6-22.7-50.6-50.6c0-28 22.7-50.6 50.6-50.6z m-376 317.6l101.4-215.7c6-12.8 24.2-12.8 30.2 0l101.4 215.7c5.2 11-2.8 23.8-15.1 23.8H318c-12.2 0-20.3-12.7-15.1-23.8z" fill="#5E9EFC" p-id="4325"></path><path d="M492.4 617L573 445.7c4.8-10.1 19.2-10.1 24 0L677.6 617c4.1 8.8-2.3 18.9-12 18.9H504.4c-9.7 0-16.1-10.1-12-18.9z" fill="#5E9EFC" opacity=".5" p-id="4326"></path></svg>')
const placeholder = 'data:image/svg+xml,' + svgIcon;
</script>

<template>
  <div class="custom-file-upload">
    <label for="file-upload" class="custom-label">选择文件</label>
    <span id="file-name" class="file-name">{{ uploadFileName || '未选择文件' }}</span>
    <input id="file-upload" type="file" @change="handleUpload"/>
  </div>

  <div class="row">
    <div class="column">
      <p>输入图像</p>
      <img alt="原图" :src="imgInput || placeholder">
    </div>
    <div class="column">
      <p>旋转，原色</p>
      <img alt="原色" :src="imgOriginal || placeholder">
    </div>
    <div class="column">
      <p>旋转，灰度化</p>
      <img alt="灰度化" :src="imgGrey || placeholder">
    </div>
    <div class="column">
      <p>旋转，二值化</p>
      <img alt="二进制" :src="imgBinary || placeholder">
    </div>
  </div>

  <div class="result">
    <h2>识别结果</h2>
    <p>{{imgText || '暂无结果'}}</p>
  </div>
</template>

<style scoped>
/* 隐藏原生文件上传按钮 */
input[type="file"] {
  display: none;
}

/* 自定义样式 */
.custom-file-upload {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 30px;
}

.custom-label {
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
}

.custom-label:hover {
  background-color: #0056b3;
}
.file-name {
  margin-left: 10px;
  font-size: 14px;
  color: #555;
}
.row {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.column {
  width: 24%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  text-align: center;
  min-height: 100px;
}

.column > p {
  margin: 0 0 10px 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  font-weight: 600;
}

.column > img {
  width: 100%;
}

.result {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.result > h2 {
  margin: 0;
}

.result > p {
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin: 10px 0;
}
</style>


