<!--
 * @Author: zi.yang
 * @Date: 2025-04-18 17:06:20
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-04-21 15:32:53
 * @Description:
 * @FilePath: /vue-app/src/pages/DanmuOcclusion.vue
-->
<script setup lang="ts">
import '@tensorflow/tfjs-backend-cpu';

import { onMounted, onUnmounted } from 'vue';

import BulletJs from 'js-bullets';

import * as bodyPix from '@tensorflow-models/body-pix';

// 常量定义
const DANMU_LIST = [
  '😍 美到窒息！',
  'awsl！！！（啊我死了）',
  '姐姐的腿不是腿，是塞纳河畔的春水~',
  '✨仙女下凡辛苦了！',
  '(๑•̀ㅂ•́)و✧ 这颜值是真实的吗？',
  '💘 心脏暴击！',
  '老婆！！！（狗头保命）',
  '🥵 救命，眼神杀我！',
  '妈妈问我为什么跪着看手机',
  '( ˘ ³˘)♥ 比个心心~',
  '这气质绝了！！',
  '🌹玫瑰玫瑰玫瑰',
  '姐姐性别不要卡太死！',
  '🤯 美得我脑壳空白！',
  '疯狂截图ing…',
  '(;´༎ຶД༎ຶ`) 美到哭出来！',
  '👑女王请踩我！（不是）',
  '这笑容由我来守护！',
  '⚡️颜值高到带电！',
  '弹幕护体！美颜暴击！',
]

// 类型定义
type ImageElement = HTMLImageElement
type CanvasElement = HTMLCanvasElement
type DivElement = HTMLDivElement

// 工具函数
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 全局变量
let segmenter: bodyPix.BodyPix | null = null
let bulletScreen: BulletJs | null = null
let refreshTimer: number | null = null
let danmuTimer: number | null = null
let isFirstLoad = true

// 加载模型
const loadBodyPixModel = async (): Promise<bodyPix.BodyPix> => {
  return await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2,
  })
}

// 绘制遮罩
const drawMask = (segmentation: bodyPix.SemanticPersonSegmentation, canvas: CanvasElement): void => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 创建前景掩码
  const foregroundColor = { r: 0, g: 0, b: 0, a: 0 }
  const backgroundColor = { r: 255, g: 255, b: 255, a: 255 }

  const maskImageData = bodyPix.toMask(segmentation, foregroundColor, backgroundColor)

  // 绘制遮罩
  ctx.putImageData(maskImageData, 0, 0)

  // 对遮罩进行模糊处理使边缘更自然
  ctx.filter = 'blur(5px)'
  ctx.drawImage(canvas, 0, 0)
  ctx.filter = 'none'
}

// 处理图像分割
const processImageSegmentation = async (
  image: ImageElement,
  canvas: CanvasElement,
  container: DivElement
): Promise<void> => {
  if (!segmenter) return

  try {
    const segmentation = await segmenter.segmentPerson(image, {
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      maxDetections: 1,
      scoreThreshold: 0.4,
    })

    drawMask(segmentation, canvas)
    container.style.maskImage = `url(${canvas.toDataURL()})`
  } catch (error) {
    console.error('图像分割处理失败:', error)
  }
}

// 初始化弹幕
const initDanmu = (container: DivElement): void => {
  bulletScreen = new BulletJs(container, {})
  
  danmuTimer = window.setInterval(() => {
    if (!bulletScreen) return
    const randomDanmu = DANMU_LIST[getRandomInt(0, DANMU_LIST.length - 1)]
    bulletScreen.push(`<span>${randomDanmu}</span>`)
  }, 1000)
}

// 加载新图片
const loadNewImage = async (): Promise<void> => {
  const imageElement = document.getElementById('img') as ImageElement
  const canvas = document.getElementById('mask-canvas') as CanvasElement
  const danmuContainer = document.getElementById('danmu-container') as DivElement

  if (!imageElement || !canvas || !danmuContainer) return

  try {
    // 设置图片跨域属性
    imageElement.crossOrigin = 'Anonymous'
    
    // 加载新图片
    imageElement.src = `https://v2.xxapi.cn/api/meinvpic?return=302&t_${Date.now()}`

    // 等待图片加载完成
    await new Promise<void>((resolve) => {
      imageElement.onload = () => resolve()
      imageElement.onerror = () => {
        console.error('图片加载失败')
        resolve()
      }
    })

    // 设置画布尺寸
    canvas.width = imageElement.width
    canvas.height = imageElement.height
    danmuContainer.style.width = `${imageElement.width}px`
    danmuContainer.style.height = `${imageElement.height}px`

    // 处理图像分割
    await processImageSegmentation(imageElement, canvas, danmuContainer)

    // 第一次加载时初始化弹幕
    if (isFirstLoad) {
      isFirstLoad = false
      initDanmu(danmuContainer)
    }
  } catch (error) {
    console.error('加载新图片失败:', error)
  }
}

// 初始化
const init = async (): Promise<void> => {
  try {
    // 加载模型
    segmenter = await loadBodyPixModel()
    console.log('模型加载完成')
    
    // 加载第一张图片
    await loadNewImage()
    
    // 设置定时刷新
    refreshTimer = window.setInterval(loadNewImage, 30000)
  } catch (error) {
    console.error('初始化失败:', error)
  }
}

// 清理
const cleanup = (): void => {
  if (refreshTimer) clearInterval(refreshTimer)
  if (danmuTimer) clearInterval(danmuTimer)
  bulletScreen = null
  segmenter = null
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <h1>美女弹幕</h1>
  <div id="container">
    <img src="https://v2.xxapi.cn/api/meinvpic?return=302" alt="" id="img" width="500px" />
    <div id="danmu-container"></div>
    <canvas id="mask-canvas"></canvas>
  </div>
</template>

<style>
#container {
  position: relative;
}

#danmu-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
}

#mask-canvas {
  display: none;
}
</style>
