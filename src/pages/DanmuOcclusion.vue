<!--
 * @Author: zi.yang
 * @Date: 2025-04-18 17:06:20
 * @LastEditors: zi.yang
 * @LastEditTime: 2025-04-21 15:10:26
 * @Description:
 * @FilePath: /vue-app/src/components/Danmu.vue
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import BulletJs from 'js-bullets'
import '@tensorflow/tfjs-backend-cpu'
import * as bodyPix from '@tensorflow-models/body-pix'

const danmuList = [
  '😍 美到窒息！​​',
  '​​awsl！！！（啊我死了）​​',
  '​​姐姐的腿不是腿，是塞纳河畔的春水~​​',
  '​​✨仙女下凡辛苦了！​​',
  '​​(๑•̀ㅂ•́)و✧ 这颜值是真实的吗？​​',
  '​​💘 心脏暴击！​​',
  '​​老婆！！！（狗头保命）​​',
  '​​🥵 救命，眼神杀我！​​',
  '​​妈妈问我为什么跪着看手机​​',
  '​​( ˘ ³˘)♥ 比个心心~​​',
  '​​这气质绝了！！​​',
  '​​🌹玫瑰玫瑰玫瑰​​',
  '​​姐姐性别不要卡太死！​​',
  '​​🤯 美得我脑壳空白！​​',
  '​​疯狂截图ing…​​',
  '​​(;´༎ຶД༎ຶ`) 美到哭出来！​​',
  '​​👑女王请踩我！（不是）​​',
  '​​这笑容由我来守护！​​',
  '​​⚡️颜值高到带电！​​',
  '​​弹幕护体！美颜暴击！​',
]

const getRandom = (min, max) => parseInt(Math.random() * (max - min + 1)) + min


function run() {
  let segmenter;
  const imageElement = document.getElementById('img') as HTMLImageElement
  const canvas = document.getElementById('mask-canvas') as HTMLCanvasElement
  const danmuContainer = document.getElementById('danmu-container') as HTMLDivElement

  async function loadModel() {
    segmenter = await bodyPix.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2,
    })
    console.log('模型加载完成')
  }

  function drawMask(segmentation) {
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

  async function processFrame() {
    if (!segmenter) return
    const segmentation = await segmenter.segmentPerson(imageElement, {
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      maxDetections: 1,
      scoreThreshold: 0.4,
    })

    drawMask(segmentation)
    danmuContainer.style.maskImage = `url(${canvas.toDataURL()})`
  }

  // 启动处理
  loadModel().then(() => {
    canvas.width = imageElement.width
    canvas.height = imageElement.height
    danmuContainer.style.width = `${imageElement.width}px`
    danmuContainer.style.height = `${imageElement.height}px`
    processFrame()
  })
}

let first = true
function refreshImage() {
  const imageElement = document.getElementById('img') as HTMLImageElement
  const screen = new BulletJs('#danmu-container', {})
  // 让图片支持跨域，否则 canvas 无法绘制图片
  img.crossOrigin = "Anonymous";
  imageElement.src = `https://v2.xxapi.cn/api/meinvpic?return=302&t_${Date.now()}`
  img.onload = () => {
    if (first) {
      first = false
      setInterval(() => {
        const dom = `<span>${danmuList[getRandom(0, 19)]}</span>`
        screen.push(dom)
      }, 1000)
    }
    run()
  }
}

onMounted(() => {
  refreshImage()
  setInterval(refreshImage, 10000)
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
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

#mask-canvas {
  display: none;
}
</style>
