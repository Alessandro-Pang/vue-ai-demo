# Vue AI Demo

## 项目简介

Vue AI Demo 是一个基于 Vue 3 的演示项目，用于展示在 Web 应用中集成和使用各种 AI 工具和库。该项目提供了多个 AI 功能模块的实现示例，包括图像识别、文字识别和弹幕遮挡等功能，帮助开发者了解如何在前端应用中应用人工智能技术。

## 功能特点

- **Transformers 图像识别**：使用 Hugging Face Transformers 库实现图像到文本的转换
- **弹幕遮挡 (DanmuOcclusion)**：基于 TensorFlow.js 的 BodyPix 模型实现人像分割，自动为视频添加不遮挡人像的弹幕效果
- **文字识别 (TesseractOCR)**：集成 Tesseract.js 实现中文和多语言 OCR 功能，支持图像旋转、灰度化和二值化处理

## 技术栈

- **前端框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **路由管理**：Vue Router 4
- **AI 相关库**：
  - Hugging Face Transformers (图像识别)
  - TensorFlow.js 和 BodyPix (人像分割)
  - Tesseract.js (OCR 文字识别)
  - js-bullets (弹幕效果)

## 安装和使用

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 pnpm 包管理器

### 安装步骤

1. 克隆项目到本地

```bash
git clone <repository-url>
cd vue-app
```

2. 安装依赖

```bash
npm install
# 或使用 pnpm
pnpm install
```

3. 启动开发服务器

```bash
npm run dev
# 或使用 pnpm
pnpm run dev
```

## 项目结构

```
vue-app/
├── public/              # 静态资源
│   ├── lang/            # Tesseract OCR 语言数据
│   └── image.png        # 示例图片
├── src/
│   ├── assets/          # 项目资源文件
│   ├── components/      # 公共组件
│   ├── pages/           # 页面组件
│   │   ├── Transformers.vue    # 图像识别页面
│   │   ├── DanmuOcclusion.vue  # 弹幕遮挡页面
│   │   └── TesseractOCR.vue    # OCR文字识别页面
│   ├── router/          # 路由配置
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
└── package.json         # 项目依赖配置
```

## AI 功能模块说明

### 1. Transformers 图像识别

该模块使用 Hugging Face Transformers 库实现图像到文本的转换功能。用户可以上传图片，系统会自动分析图片内容并生成文字描述。

**主要特点**：

- 支持多种图像格式
- 使用 Mozilla/distilvit 模型进行图像分析
- 实时生成图像描述文本

### 2. 弹幕遮挡 (DanmuOcclusion)

该模块使用 TensorFlow.js 的 BodyPix 模型实现智能弹幕功能，可以自动识别视频中的人像，确保弹幕不会遮挡人物面部等重要区域。

**主要特点**：

- 实时人像分割
- 智能弹幕布局
- 自定义弹幕样式和内容
- 边缘模糊处理，使效果更自然

### 3. 文字识别 (TesseractOCR)

该模块集成 Tesseract.js 实现 OCR 文字识别功能，支持中文等多语言识别。

**主要特点**：

- 支持中文识别
- 图像预处理：旋转、灰度化、二值化
- 直观展示处理过程和结果
- 使用自定义训练数据提高识别准确率

## 贡献指南

欢迎贡献代码或提出建议！请通过 Issues 或 Pull Requests 参与项目改进。

## 许可证

本项目采用 MIT 许可证。详情请参阅 LICENSE 文件。
