# 项目16：目标光标效果

## 📝 项目说明
这是一个极具创意的自定义光标效果，使用GSAP动画库实现。光标由4个角和1个中心点组成，默认情况下会360度旋转，当悬停在目标元素上时，4个角会移动到目标元素的四角，形成磁性吸附效果。

## 🎯 实现功能
- ✅ 自定义光标（4个角 + 1个中心点）
- ✅ 默认360度旋转动画
- ✅ 悬停时磁性吸附到目标元素
- ✅ 点击时光标缩放反馈
- ✅ 视差效果（鼠标移动时的延迟跟随）
- ✅ 移动端自动检测并禁用
- ✅ mix-blend-mode差值混合模式
- ✅ 完整的响应式设计

## 🏗️ 技术架构

### 核心技术
- **GSAP 3.12.2**：高性能动画库
- **原生JavaScript**：无框架依赖
- **CSS mix-blend-mode**：差值混合模式
- **事件监听**：mousemove, mouseover, mousedown等

### 代码结构
```
HTML（光标元素 + 演示内容）
  ↓
CSS（光标样式 + 布局）
  ↓
JavaScript（GSAP动画 + 事件处理）
```

## 📋 核心技术点

### 1. 光标结构
```html
<div class="target-cursor-wrapper">
    <div class="target-cursor-dot"></div>      <!-- 中心点 -->
    <div class="target-cursor-corner corner-tl"></div>  <!-- 左上角 -->
    <div class="target-cursor-corner corner-tr"></div>  <!-- 右上角 -->
    <div class="target-cursor-corner corner-br"></div>  <!-- 右下角 -->
    <div class="target-cursor-corner corner-bl"></div>  <!-- 左下角 -->
</div>
```

### 2. 光标样式
```css
.target-cursor-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    pointer-events: none;    /* 让鼠标事件穿透 */
    z-index: 9999;
    mix-blend-mode: difference;  /* 差值混合模式 */
    transform: translate(-50%, -50%);
}
```

**关键属性**：
- `pointer-events: none` - 让光标不影响鼠标事件
- `mix-blend-mode: difference` - 差值混合，让光标在任何背景上都可见
- `transform: translate(-50%, -50%)` - 居中定位

### 3. 初始化光标
```javascript
// 初始化位置（屏幕中心）
gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
});

// 创建旋转动画
spinTl = gsap.timeline({ repeat: -1 })
    .to(cursor, {
        rotation: '+=360',
        duration: 2,
        ease: 'none'
    });
```

### 4. 鼠标移动
```javascript
function handleMouseMove(e) {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out'
    });
}
```

### 5. 悬停效果（核心）
```javascript
// 计算目标元素的四角位置
const rect = target.getBoundingClientRect();
targetCornerPositions = [
    { x: rect.left - borderWidth, y: rect.top - borderWidth },
    { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
    { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
    { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
];

// 移动四个角到目标位置
corners.forEach((corner, i) => {
    gsap.to(corner, {
        x: targetCornerPositions[i].x - cursorX,
        y: targetCornerPositions[i].y - cursorY,
        duration: 0.2,
        ease: 'power2.out'
    });
});
```

### 6. 视差效果
```javascript
// 使用GSAP ticker实现实时更新
tickerFn = function() {
    const strength = activeStrength;
    corners.forEach((corner, i) => {
        const targetX = targetCornerPositions[i].x - cursorX;
        const targetY = targetCornerPositions[i].y - cursorY;

        // 渐变跟随
        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        gsap.to(corner, {
            x: finalX,
            y: finalY,
            duration: 0.2,
            overwrite: 'auto'
        });
    });
};

gsap.ticker.add(tickerFn);
```

### 7. 点击反馈
```javascript
function handleMouseDown() {
    gsap.to(dot, { scale: 0.7, duration: 0.3 });
    gsap.to(cursor, { scale: 0.9, duration: 0.2 });
}

function handleMouseUp() {
    gsap.to(dot, { scale: 1, duration: 0.3 });
    gsap.to(cursor, { scale: 1, duration: 0.2 });
}
```

### 8. 移动端检测
```javascript
function isMobileDevice() {
    const hasTouchScreen = 'ontouchstart' in window;
    const isSmallScreen = window.innerWidth <= 768;
    const mobileRegex = /android|webos|iphone|ipad|ipod/i;
    return hasTouchScreen && isSmallScreen;
}
```

## 🎨 设计特点

### 视觉效果
- **自定义光标**：4个角 + 1个中心点
- **旋转动画**：默认360度旋转，2秒一圈
- **磁性吸附**：悬停时四个角移动到目标元素四角
- **点击反馈**：点击时光标缩小
- **差值混合**：mix-blend-mode让光标在任何背景上都可见

### 交互动画
- **平滑跟随**：鼠标移动时0.1秒延迟
- **悬停动画**：0.2秒渐变到目标位置
- **视差效果**：strength控制吸附强度（0-1）
- **恢复动画**：离开目标后0.3秒恢复原位

### 配置参数
```javascript
const config = {
    targetSelector: '.cursor-target',  // 目标元素选择器
    spinDuration: 2,                   // 旋转时长（秒）
    hideDefaultCursor: true,           // 隐藏默认光标
    hoverDuration: 0.2,                // 悬停动画时长
    parallaxOn: true                   // 开启视差效果
};
```

## 📱 响应式设计

| 设备类型 | 字体调整 | 光标效果 |
|---------|---------|---------|
| 桌面（≥1200px） | 标准尺寸 | 完整效果 |
| 平板（≤1199px） | 缩小10-15% | 完整效果 |
| 手机（≤768px） | 缩小20-30% | 禁用（使用默认光标） |

## 🔧 自定义修改

### 修改目标元素
```javascript
const config = {
    targetSelector: '.my-custom-target',  // 改为自定义选择器
};
```

### 修改旋转速度
```javascript
const config = {
    spinDuration: 1,  // 改为1秒一圈（更快）
};
```

### 修改光标大小
```css
.target-cursor-dot {
    width: 6px;   /* 改为6px */
    height: 6px;
}

.target-cursor-corner {
    width: 16px;  /* 改为16px */
    height: 16px;
}
```

### 修改光标颜色
```css
.target-cursor-dot {
    background: #ff0000;  /* 改为红色 */
}

.target-cursor-corner {
    border-color: #ff0000;
}
```

## 💡 适用场景
- 创意网站
- 作品集展示
- 互动体验页面
- 品牌宣传页面
- 艺术设计网站

## 📚 技术总结

### 知识点
- GSAP动画库（timeline, ticker, tweens）
- 原生JavaScript事件监听
- CSS mix-blend-mode差值混合
- DOM操作（getBoundingClientRect, querySelector）
- 坐标系统转换
- 移动端检测

### React → JS转换要点

| React | JavaScript |
|-------|-----------|
| `useRef()` | 普通变量 |
| `useEffect()` | 初始化函数 + 事件监听 |
| `useCallback()` | 普通函数 |
| `useMemo()` | 普通计算或缓存 |
| JSX | DOM操作 |
| 组件状态 | 全局变量 |

### 优势
- ✅ 无框架依赖，纯JS实现
- ✅ GSAP性能优秀
- ✅ 代码清晰，易于理解
- ✅ 效果流畅，用户体验好
- ✅ 自动适配移动端

### 性能优化
- 使用`will-change: transform`提示浏览器优化
- 使用`gsap.ticker`实现高效更新
- 事件监听使用`{ passive: true }`
- 及时清理定时器和事件监听

## 📌 踩坑记录

### 问题1：光标在移动端不工作
**解决**：添加移动端检测，移动端禁用自定义光标

### 问题2：光标阻挡鼠标事件
**解决**：设置`pointer-events: none`

### 问题3：光标在某些背景上看不清
**解决**：使用`mix-blend-mode: difference`

### 问题4：滚动时光标位置不准确
**解决**：添加scroll事件监听，检测元素是否还在光标下

## 🌐 来源
- **原始项目**：React组件库
- **转换实现**：使用GSAP + 原生JavaScript
- **GSAP版本**：3.12.2

## 🚀 后续优化方向
1. 添加更多悬停效果（如旋转、缩放）
2. 支持自定义光标样式
3. 添加音效反馈
4. 优化性能（减少计算）
5. 添加配置面板
