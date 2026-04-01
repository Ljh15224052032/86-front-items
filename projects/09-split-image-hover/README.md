# 项目09：Split Image on Hover

## 📝 项目说明
这是一个悬停分裂图片效果项目。鼠标悬停时，图片从中间分裂成左右两半，分别向外旋转打开，露出底部的文字内容。

## 🎯 实现功能
- 600px × 400px 图片容器
- 使用伪元素（:before、:after）分别显示图片的左右两半
- 悬停时两半图片分别旋转90度打开
- 中间文字内容在图片打开时可见
- 平滑的过渡动画效果

## 🔧 技术要点
- CSS 伪元素（:before、:after）实现图片分裂
- CSS transform（rotateX、translateY）实现3D旋转
- CSS transform-origin 控制旋转起点
- CSS background-position 精确控制图片显示区域
- CSS overflow 隐藏溢出内容
- CSS z-index 图层管理
- position 绝对定位实现层叠效果

## ⚠️ 已知问题

### 问题1：使用外部图片链接
- **现象**：图片来自 freepik.com 外部链接
- **影响**：可能存在防盗链或链接失效风险
- **建议**：替换为本地图片文件或稳定的CDN资源

### 问题2：图片尺寸计算复杂
- **现象**：background-size 和 background-position 需要精确计算
- **影响**：更换图片时需要重新计算参数
- **建议**：使用 CSS 变量或 JavaScript 动态计算

### 问题3：缺少响应式设计
- **现象**：固定宽度 600px，在小屏幕上可能溢出
- **建议**：添加媒体查询实现响应式布局

### 问题4：Lorem ipsum 占位文本
- **现象**：使用无意义的拉丁文占位符
- **建议**：替换为有意义的中文或英文内容

## 📌 踩坑记录
无开发过程中的技术问题，但存在上述已知瑕疵。

## 📚 参考资源
- [MDN - CSS transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
- [MDN - CSS transform-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)
- [MDN - CSS background-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)
