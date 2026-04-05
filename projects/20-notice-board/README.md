# 项目20：告示板 (Notice Board)

## 项目概述

一个航海主题的告示板界面，用于展示文档和知识资料的导航入口。采用木质木板背景和泛黄信纸卡片，营造船上的资料板氛围。

## 功能特点

### 1. 视觉设计
- **木质木板背景**：CSS渐变模拟木纹纹理
- **做旧效果**：划痕和磨损质感
- **泛黄信纸**：羊皮纸/旧纸质感
- **铁钉图钉**：左上角固定信纸的视觉效果
- **手写标题**：使用 Satisfy 字体，手写风格

### 2. 布局结构
- **网格布局**：每行3个卡片
- **响应式设计**：
  - 大屏幕（>1024px）：3列
  - 平板（768-1024px）：2列
  - 手机（<768px）：1列

### 3. 卡片信息
每个信纸卡片包含：
- **分类标签**：Logbook, Sea Chart, Maintenance, Supplies
- **文档标题**：手写风格英文标题
- **链接按钮**：View Document →

### 4. 交互效果
- **悬停效果**：卡片上浮 + 阴影加深
- **点击准备**：为后续添加模态框跳转预留

## 技术实现

### HTML结构
```html
<div class="paper-card" data-id="1">
    <div class="pin"></div>
    <div class="paper-content">
        <span class="category-tag">Logbook</span>
        <h2 class="paper-title">First Voyage Record</h2>
        <a href="#" class="paper-link">View Document →</a>
    </div>
</div>
```

### CSS关键样式

#### 木板背景
```css
.notice-board {
    background:
        repeating-linear-gradient(90deg, ...),  /* 横向木纹 */
        repeating-linear-gradient(0deg, ...),    /* 纵向木纹 */
        #4e342e;                                 /* 底色 */
}
```

#### 泛黄信纸
```css
.paper-card {
    background:
        repeating-linear-gradient(0deg, ...),     /* 纸张纹理 */
        linear-gradient(to bottom right, ...);    /* 泛黄渐变 */
}
```

#### 铁钉图钉
```css
.pin {
    background: radial-gradient(...);  /* 金属光泽 */
    box-shadow: ...;                    /* 阴影 */
}
```

#### 手写字体
```css
.paper-title {
    font-family: 'Satisfy', cursive;   /* Google Fonts */
    font-size: 1.8rem;
}
```

## 数据结构

```javascript
{
    id: "唯一标识",
    title: "文档标题（英文，手写显示）",
    category: "分类标签",
    link: "外部文档链接（WPS/飞书）"
}
```

## 使用场景

- **文档导航**：作为跳转到WPS/飞书文档的入口
- **知识管理**：展示船上/团队的资料目录
- **主题网站**：航海、探险、海盗主题网站的知识板块

## 未来改进方向

### 短期改进
- [ ] 添加点击模态框，显示文档详情
- [ ] 添加搜索/筛选功能
- [ ] 添加文档预览功能
- [ ] 优化木板背景（使用真实木纹图片）

### 长期规划
- [ ] 实现漂流瓶信息架（导航入口）
- [ ] 实现航海日志书架（分类展示）
- [ ] 实现岛屿地图导航（作品集界面）
- [ ] 添加船只动画效果

## 设计理念

**主题定位**：小岛 + 航海探险

**逻辑结构**：
- 船上的告示板 → 存放文档/知识
- 小岛地图 → 展示作品/项目
- 坐船访问 → 不同区域的内容

**视觉风格**：
- 古旧、做旧、手工感
- 羊皮纸、木质、铁钉
- 手写字体、航海元素

## 浏览器兼容性

- ✅ Chrome/Edge (推荐)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE11 (部分CSS特性不支持)

## 依赖资源

- **Google Fonts**: Satisfy (手写字体)
- **纯CSS实现**：无需图片资源
- **响应式**：支持移动端

## 文件结构

```
20-notice-board/
├── index.html      # HTML结构
├── style.css       # 所有样式
└── README.md       # 本文档
```

## 开发说明

当前版本为**基础版本**，主要实现了：
- ✅ 视觉效果（木板、信纸、图钉）
- ✅ 网格布局
- ✅ 响应式设计
- ✅ 基础交互（悬停）

暂未实现：
- ⏸️ 点击跳转逻辑
- ⏸️ 模态框详情展示
- ⏸️ 搜索筛选功能

## 项目状态

- **状态**：✅ 基础版本完成
- **进度**：视觉效果完成，交互待开发
- **优先级**：中（文档导航系统）
- **复杂度**：低（纯CSS实现）

## 相关项目

- 项目19：字体展示平台
- 项目18：灯塔光束效果
- 未来项目：漂流瓶信息架、航海日志书架
