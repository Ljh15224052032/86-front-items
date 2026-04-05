# 项目18：灯塔光束效果（单层摆动版）

## 项目概述

使用CSS `conic-gradient` 实现简洁的灯塔光束效果，光束从屏幕外部射入，在指定角度范围内摆动扫描。

## 核心功能

### 1. 单层光束效果
- **光束方向**：从屏幕右侧外射入，照向左边
- **摆动范围**：左边60度（150°-210°）
- **摆动动画**：使用 `ease-in-out alternate` 实现来回扫描
- **发光位置**：屏幕外（top: 20%, left: 120%）

### 2. 背景星星
- 20颗随机分布的星星
- 闪烁动画（2-3.5秒周期）
- 不同大小（1-2px）

### 3. 交互控制
- **速度滑块**：调节摆动速度（3-20秒）
- 毛玻璃效果控制面板

## 技术实现

### HTML结构
```html
<div class="lighthouse-scene">
    <div class="stars-container">...</div>
    <div class="beam-primary"></div>
</div>
```

### CSS关键技术

#### 1. Conic Gradient（圆锥渐变）
```css
background: conic-gradient(
    from 180deg,  /* 中心角度180度，正左边 */
    transparent 0deg,
    transparent 30deg,
    
    /* 光束强度（透明度已减弱） */
    rgba(255, 230, 150, 0.1) 180deg,     /* 边缘 */
    rgba(255, 240, 180, 0.2) 195deg,     /* 中等 */
    rgba(255, 250, 200, 0.3) 210deg,     /* 核心 */
    rgba(255, 240, 180, 0.2) 225deg,
    rgba(255, 230, 150, 0.1) 240deg,
    
    transparent 270deg,
    transparent 360deg
);
```

#### 2. 屏幕外发光
```css
.beam-primary {
    top: 20%;     /* 垂直位置保持不变 */
    left: 120%;   /* 水平位置在屏幕右侧外20% */
    width: 250vmax;
    height: 250vmax;
    transform: translate(-50%, -50%);
}
```

#### 3. 摆动动画（非360度旋转）
```css
@keyframes swing {
    from {
        transform: translate(-50%, -50%) rotate(150deg);  /* 左上 */
    }
    to {
        transform: translate(-50%, -50%) rotate(210deg);  /* 左下 */
    }
}

.beam-primary {
    animation: swing 10s ease-in-out infinite alternate;
}
```

**关键点**：
- `alternate`：来回摆动
- `ease-in-out`：两端减速，中间加速
- `150deg` 到 `210deg`：60度范围

## 当前配置

| 参数 | 值 | 说明 |
|------|-----|------|
| 发光位置 | top: 20%, left: 120% | 屏幕右侧外 |
| 摆动范围 | 150° - 210° | 左边60度 |
| 中心角度 | 180° | 正左边 |
| 摆动速度 | 10s | 来回一次 |
| 光束强度 | 0.1 - 0.3 | 已减弱 |

## 视觉效果

```
    屏幕外              屏幕内
        ↓ 120% left          
    【光束】━━━━━━━━━━━━━━→
     ↖   ↗           
   ↖       ↗         
 150°      180°      210°
  (左上)   (正左)      (左下)
  60度摆动范围
```

## 使用场景

### 适合作为
- ✅ 背景特效（不是主体）
- ✅ 加载页面动画
- ✅ 404页面特效
- ✅ 技术类网站装饰
- ✅ 演示页面背景

### 不适合作为
- ❌ 主要视觉焦点
- ❌ 需要交互的场景
- ❌ 高对比度要求的页面

## 技术要点

### conic-gradient语法
```css
conic-gradient(
    from 起始角度,
    颜色1 角度1,
    颜色2 角度2,
    ...
)
```

### 摆动 vs 旋转
```css
/* 360度旋转 */
animation: rotate 10s linear infinite;

/* 来回摆动 */
animation: swing 10s ease-in-out infinite alternate;
```

### 屏幕外定位
```css
left: 120%;  /* 屏幕右侧外 */
/* 100% = 右边缘，>100% = 屏幕外 */
```

## 浏览器兼容性

- **conic-gradient**: Chrome 69+, Firefox 72+, Safari 12.1+
- **CSS变量**: 所有现代浏览器
- **backdrop-filter**: Chrome 76+, Firefox 103+, Safari 9+

## 性能优化

1. **GPU加速**
   - 使用 `transform` 而非改变位置属性
   - `will-change: transform` 提示浏览器优化

2. **单层光束**
   - 减少DOM元素
   - 减少重绘
   - 提升性能

3. **响应式降级**
   ```css
   @media (prefers-reduced-motion: reduce) {
       .beam-primary { animation-duration: 30s; }
   }
   ```

## 文件结构
```
18-lighthouse-beacon/
├── index.html      # HTML结构
├── style.css       # 所有样式
├── script.js       # 速度控制
├── README.md       # 本文档
└── 调整指南.md     # 参数调整说明
```

## 参数调整

详见 [调整指南.md](./调整指南.md)

### 快速调整

**调整发光位置**：
```css
/* 在 style.css 第58-59行 */
top: 20%;    /* 垂直位置 */
left: 120%;  /* 水平位置：>100%表示屏幕外 */
```

**调整摆动范围**：
```css
/* 在 style.css 第101-107行 */
@keyframes swing {
    from { transform: translate(-50%, -50%) rotate(150deg); }
    to { transform: translate(-50%, -50%) rotate(210deg); }
}
```

**调整光束强度**：
```css
/* 在 style.css 第77-81行 */
rgba(255, 250, 200, 0.3) 210deg,  /* 核心亮度 */
```

## 学习要点

1. **conic-gradient**：创建锥形渐变，适合光束效果
2. **屏幕外定位**：left > 100% 可以把元素放在屏幕外
3. **摆动动画**：`alternate` + `ease-in-out` 实现来回扫描
4. **透明度控制**：使用 rgba 的第四个参数调整亮度
5. **性能优化**：单层光束 + GPU加速

## 应用建议

### 作为背景使用
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="path/to/lighthouse-beacon/style.css">
</head>
<body>
    <!-- 你的内容 -->
    <div class="your-content">
        <h1>你的标题</h1>
        <p>你的内容</p>
    </div>
    
    <!-- 灯塔光束背景 -->
    <div class="lighthouse-scene">
        <div class="beam-primary"></div>
    </div>
</body>
</html>
```

### 作为独立特效
直接打开 `index.html` 查看效果

## 项目状态

- **状态**：✅ 已完成（单层光束版）
- **实现方式**：纯CSS + conic-gradient
- **性能**：优秀（单层光束，GPU加速）
- **实用性**：中等（作为背景特效）
