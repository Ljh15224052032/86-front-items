# 项目17：项目展示平台

## 项目概述

一个功能完整的项目展示平台，支持网格视图和时间线视图两种展示模式，具有动态列数调整、分类筛选、搜索过滤等功能。

## 核心功能

### 1. 网格视图
- **动态列数调整**：支持2-5列可调
- **智能分页**：每页数量自动适配列数（必须是列数的倍数）
- **分类筛选**：8个分类标签（全部、信息图、缩略图、壁纸、界面、字体设计、委托、杂项）
- **实时搜索**：支持按标题和分类名称搜索，搜索只在当前分类内进行
- **悬停效果**：卡片默认变暗（brightness: 0.6），悬停时恢复亮度并显示项目信息
- **渐变蒙版**：项目信息使用渐变蒙版（从底部黑色80%不透明到70%位置完全透明）

### 2. 时间线视图
- **按日期分组**：项目按日期自动分组显示
- **行布局**：每行固定4个项目位置
- **日期显示**：
  - 大号日期数字（48px，白色+橙色发光）
  - 月份和年份同行显示（14px，橙色）
  - 同一日期只在第一行显示，后续行留空
- **空位占位**：不足4个的位置用虚线边框占位
- **固定高度**：每个卡片固定250px高度，确保对齐
- **居中对齐**：整个时间线框架水平居中显示

### 3. 视图切换
- 点击"网格"/"时间线"按钮切换视图
- 时间线视图下自动隐藏列数和每页数量控件
- 保持筛选和搜索状态

## 技术实现

### HTML结构
```html
<header class="navbar">          <!-- 顶部导航栏 -->
<div class="category-bar">        <!-- 分类标签栏 -->
<div class="search-container">     <!-- 搜索框 -->
<div class="projects-container">   <!-- 项目容器 -->
  <div class="projects-grid">      <!-- 网格/时间线 -->
  <div class="pagination">         <!-- 分页（仅网格视图） -->
```

### CSS关键技术
1. **CSS Grid**：动态列数调整 `grid-template-columns: repeat(n, 1fr)`
2. **CSS Variables**：主题颜色管理
3. **Filter Brightness**：卡片变暗效果 `filter: brightness(0.6)`
4. **Linear Gradient**：渐变蒙版 `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 70%)`
5. **Flexbox**：时间线行布局和居中对齐
6. **Pointer Events**：禁止非交互元素的鼠标事件

### JavaScript核心逻辑

#### 1. 状态管理
```javascript
let currentState = {
    viewMode: 'grid',     // 视图模式
    columns: 3,           // 列数：2-5
    perPage: 6,           // 每页数量：列数的倍数
    currentPage: 1,
    category: 'all',
    searchQuery: '',
    filteredProjects: []
};
```

#### 2. 动态滑块逻辑
- 每页数量滑块的 min、max、step 会根据列数动态调整
- 列数改变时，自动调整每页数量为列数的倍数
- 示例：列数=3时，每页可以是3、6、9、12；列数=5时，每页可以是5、10

#### 3. 两阶段筛选
```javascript
// 阶段1：按分类筛选
// 阶段2：在分类结果内按搜索关键词筛选
```
这样确保搜索只在当前分类内进行

#### 4. 视图切换
```javascript
// 网格视图：恢复grid样式，显示分页
grid.style.display = 'grid';

// 时间线视图：清除grid样式，隐藏分页
grid.style.display = 'block';
grid.style.gridTemplateColumns = 'none';
```

#### 5. 时间线布局算法
- 按日期分组项目
- 每组按4个一行排列
- 只在每组的第一个项目行显示日期
- 不足4个的位置用空位占位

## 响应式设计

### 桌面端（>768px）
- 网格：3列默认
- 时间线：4个项目/行
- 容器padding：40px

### 平板端（576px-768px）
- 网格：2列
- 时间线：保持4个项目/行
- 容器padding：30px 20px

### 手机端（<576px）
- 网格：1列
- 时间线：2个项目/行（竖向布局）
- 容器padding：20px 15px

## 关键设计决策

### 1. 卡片信息显示方式
- **网格视图**：悬停显示（opacity: 0 → 1）
- **时间线视图**：常驻显示（opacity: 1）

### 2. 搜索范围
- 搜索只在当前选中的分类内进行
- 避免"选中壁纸后搜索信息图无结果"的困惑

### 3. 滑块联动
- 每页数量必须是列数的倍数
- 列数改变时自动调整每页数量
- 滑块的min、max、step动态计算

### 4. 时间线布局
- 每行固定4个位置，保持对齐
- 同一日期跨行时，只在第一行显示日期
- 使用 `align-items: center` 确保项目卡片和日期矩形的中心线对齐

## 文件结构
```
17-project-showcase/
├── index.html          # HTML结构
├── style.css           # 样式文件
├── script.js           # 交互逻辑
└── README.md           # 本文档
```

## 浏览器兼容性
- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- IE11: 不支持（使用了CSS Grid和现代JS）

## 开发注意事项

### 1. 视图切换时的样式清除
切换到时间线视图时，必须清除 `projects-grid` 的网格样式：
```javascript
grid.style.display = 'block';
grid.style.gridTemplateColumns = 'none';
```

### 2. 卡片固定高度
时间线视图中，卡片必须固定高度（250px），使用flex布局：
```css
.timeline-projects .project-card {
    height: 250px;
    display: flex;
    flex-direction: column;
}
```

### 3. 渐变蒙版的透明度范围
使用 `70%` 而不是 `50%` 或 `60%`，让蒙版更自然：
```css
background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%);
```

## 未来改进方向
- [ ] 添加项目详情模态框
- [ ] 支持按日期范围筛选
- [ ] 添加动画过渡效果
- [ ] 支持自定义主题颜色
- [ ] 添加项目收藏功能
