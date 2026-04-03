# 项目14：Ripple Loader Animation

## 📝 项目说明
这是一个优雅的波纹扩散加载动画效果，中心有一个Logo，周围有多层同心圆圈依次向外扩散。

## 🎯 实现功能
- ✅ 5层同心圆圈波纹扩散动画
- ✅ 中心Logo颜色渐变动画（灰色 ↔ 白色）
- ✅ 玻璃态效果（backdrop-filter: blur）
- ✅ 响应式设计，适配不同设备
- ✅ 使用CSS变量，易于定制

## 🏗️ 技术架构
- **CSS变量**：使用 `--size`, `--duration`, `--logo-color` 等变量控制样式
- **CSS动画**：`@keyframes` 实现波纹扩散和颜色变化
- **nth-child选择器**：为每个圆圈设置不同的延迟和样式
- **绝对定位**：使用 `inset` 属性精确定位圆圈
- **backdrop-filter**：实现玻璃态模糊效果

## 📋 核心技术点

### 1. CSS变量的使用
```css
.loader {
    --size: 250px;
    --duration: 2s;
    --logo-color: grey;
}
```
使用CSS变量可以轻松定制动画的尺寸、时长和颜色，无需修改具体数值。

### 2. 多层动画延迟
通过 `nth-child` 选择器为每个圆圈设置不同的延迟：
```css
.loader .box:nth-child(1) { animation-delay: 0s; }
.loader .box:nth-child(2) { animation-delay: 0.2s; }
.loader .box:nth-child(3) { animation-delay: 0.4s; }
...
```
这样可以形成连续的波纹扩散效果。

### 3. inset属性
使用 `inset` 替代传统的 `top/right/bottom/left`：
```css
.loader .box:nth-child(1) {
    inset: 40%; /* 距离边缘40% */
}
```
`inset: 40%` 等同于 `top: 40%; right: 40%; bottom: 40%; left: 40%;`，代码更简洁。

### 4. 玻璃态效果
```css
backdrop-filter: blur(5px);
```
这会让圆圈背景呈现毛玻璃效果，增加视觉层次感。

### 5. 双重动画
- **波纹动画**：圆圈放大缩小（scale: 1 → 1.3 → 1）
- **颜色动画**：Logo颜色变化（灰色 → 白色 → 灰色）

## 🎨 设计特点

### 视觉效果
- **波纹扩散**：5个圆圈依次向外扩散，形成涟漪效果
- **颜色变化**：中心Logo在灰色和白色之间渐变
- **阴影效果**：圆圈带有动态阴影，增强立体感
- **玻璃态**：背景模糊效果，现代感十足

### 动画参数
- **时长**：2秒完成一个周期
- **延迟**：每个圆圈延迟0.2秒
- **缓动函数**：ease-in-out（平滑过渡）

## 📱 响应式适配

| 设备类型 | 容器尺寸 | 适用场景 |
|---------|---------|---------|
| 桌面（≥1200px） | 250px | 大屏幕显示 |
| 平板（≤1199px） | 200px | 中等屏幕 |
| 手机（≤768px） | 150px | 小屏幕 |
| 小屏手机（≤576px） | 120px | 超小屏幕 |
| 迷你屏幕（≤400px） | 100px | 极小屏幕 |

## 🔧 自定义修改

### 修改尺寸
```css
.loader {
    --size: 300px; /* 改为300px */
}
```

### 修改颜色
```css
.loader {
    --logo-color: #ff6b6b; /* 改为红色 */
}
```

### 修改动画速度
```css
.loader {
    --duration: 3s; /* 改为3秒，更慢 */
}
```

### 修改波纹层数
添加或删除 `<div class="box"></div>` 元素，并相应调整 `inset` 值和 `animation-delay`。

## 💡 适用场景
- 页面加载动画
- 数据加载等待
- 应用启动画面
- 品牌Logo展示
- 沉浸式加载体验

## 📚 技术总结

### 知识点
- CSS变量（Custom Properties）
- CSS动画（@keyframes）
- nth-child选择器
- 绝对定位（position: absolute）
- inset属性
- backdrop-filter玻璃态效果
- SVG图标
- 响应式设计

### 优势
- ✅ 代码简洁，使用CSS变量易于维护
- ✅ 性能优秀，纯CSS动画
- ✅ 可定制性强，易于修改颜色和尺寸
- ✅ 视觉效果现代，符合当前设计趋势
- ✅ 无JavaScript依赖

## 🌐 来源
- **设计作者**：Smit-Prajapati
- **来源平台**：Uiverse.io
- **原始链接**：https://uiverse.io/Smit-Prajapati/lingering-deer-36

## 📌 踩坑记录
项目刚完成，暂无问题记录。

## 🚀 后续优化方向
1. 添加加载进度文字显示
2. 支持暂停/播放动画
3. 添加自定义Logo功能
4. 增加多种预设配色方案
