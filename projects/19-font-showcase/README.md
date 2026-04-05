# 项目19：字体展示平台

## 项目概述

一个简洁的字体展示平台，用于预览和比较常见字体的显示效果。支持点击卡片全屏放大查看，让字体设计细节更加清晰。

## 功能特点

### 1. 分类展示

#### 系统字体（本地字体）
- **衬线字体 (Serif)**: Times New Roman, Georgia, 宋体
- **无衬线字体 (Sans-serif)**: Arial, Helvetica, Verdana, 微软雅黑
- **等宽字体 (Monospace)**: Courier New, Consolas
- **手写字体 (Cursive)**: Comic Sans MS
- **系统字体 (System)**: System UI

#### Google Fonts（在线字体）
- **衬线字体**: Uchen, DM Serif Display, Cinzel
- **无衬线字体**: Dosis, Orbitron, Bungee
- **等宽字体**: Doto
- **手写字体**: Lobster, Caveat, Satisfy

### 2. 样例文本
每个字体卡片包含：
- 英文测试句："Design is about making things clear, not making them beautiful."
- 中文测试句："设计是让事物变得清晰，而不是让它变得漂亮。"
- 字体特点说明

### 3. 交互功能
- **点击全屏**: 点击任意字体卡片，弹出全屏黑色背景展示
- **超大字号**: 英文6rem、中文4rem，清晰展示字体设计细节
- **沉浸式体验**: 黑色背景 + 白色文字，无干扰纯净展示
- **多种关闭方式**:
  - 点击右上角关闭按钮（×）
  - 点击遮罩层背景
  - 按 ESC 键

### 4. 视觉设计
- 黑白简洁配色
- 全屏黑色背景模态窗口
- 白色文字高对比度显示
- 左侧导航栏快速跳转
- 卡片式布局
- 悬停动画效果
- 响应式设计

## 技术实现

### HTML结构
```html
<section class="font-category">
    <h2 class="category-title">分类名称</h2>
    <div class="font-card">
        <h3 class="font-name">字体名称</h3>
        <p class="font-sample" style="font-family: ...">英文示例</p>
        <p class="font-sample" style="font-family: ...">中文示例</p>
        <p class="font-info">字体说明</p>
    </div>
</section>

<!-- 模态窗口 -->
<div class="modal-overlay" id="fontModal">
    <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h2 class="modal-font-name"></h2>
        <p class="modal-font-info"></p>
        <div class="modal-sample modal-sample-large"></div>
        <div class="modal-sample"></div>
    </div>
</div>
```

### CSS关键样式
```css
/* 字体卡片 */
.font-card {
    background: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 25px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.font-card:hover {
    transform: translateX(5px);
    border-color: #000;
}

/* 模态窗口 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #000;
    padding: 80px 60px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-sample-large {
    font-size: 6rem;
    color: #fff;
    line-height: 1.4;
}

.modal-close {
    position: fixed;
    top: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
}
```

### JavaScript交互
```javascript
// 点击卡片打开模态窗口
fontCards.forEach(card => {
    card.addEventListener('click', function() {
        // 获取字体信息
        const fontName = this.querySelector('.font-name').textContent;
        const fontFamily = this.querySelector('.font-sample').style.fontFamily;

        // 填充并显示模态窗口
        modal.classList.add('active');
    });
});

// 关闭模态窗口
modalClose.addEventListener('click', function() {
    modal.classList.remove('active');
});
```

## 字体列表

### 系统字体 - 衬线字体 (Serif)
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Times New Roman | 传统衬线 | 印刷文档、正式报告 |
| Georgia | 现代衬线 | 屏幕阅读、标题 |
| 宋体 (SimSun) | 中文衬线 | 中文正文阅读 |

### 系统字体 - 无衬线字体 (Sans-serif)
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Arial | 经典通用 | 网页正文、UI界面 |
| Helvetica | 设计经典 | 品牌设计、海报 |
| Verdana | 宽体设计 | 小字号文本 |
| 微软雅黑 | 中文无衬线 | Windows系统中文 |

### 系统字体 - 等宽字体 (Monospace)
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Courier New | 经典等宽 | 代码显示、终端 |
| Consolas | 现代等宽 | 编程编辑器 |

### 系统字体 - 手写字体 (Cursive)
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Comic Sans MS | 休闲手写 | 非正式场合、儿童内容 |

### Google Fonts - 衬线字体
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Uchen | 古典风格 | 古典标题、正文 |
| DM Serif Display | 高端优雅 | 优雅标题、品牌 |
| Cinzel | 罗马古典 | 罗马风格标题 |

### Google Fonts - 无衬线字体
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Dosis | 圆润现代 | 标题、UI文本 |
| Orbitron | 科技感 | 科技标题、HUD |
| Bungee | 粗体冲击 | 海报标题、Logo |

### Google Fonts - 等宽字体
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Doto | 像素风格 | 代码、像素风UI |

### Google Fonts - 手写字体
| 字体 | 特点 | 适用场景 |
|------|------|----------|
| Lobster | 装饰性强 | Logo、品牌标识 |
| Caveat | 自然手写 | 手写引文、签名 |
| Satisfy | 优雅流畅 | 优雅签名、短文案 |

## 使用说明

1. **浏览字体**: 直接打开 `index.html` 查看字体展示
2. **查看分类**: 使用左侧导航栏快速跳转到不同分类
3. **放大查看**: 点击任意字体卡片，弹出全屏模态窗口
4. **关闭窗口**: 点击关闭按钮、背景或按 ESC 键

## 注意事项

- 字体显示效果取决于用户系统中是否安装了相应字体
- Google Fonts 需要网络连接才能加载
- 如果字体不存在，浏览器会使用备用字体
- 不同操作系统下字体可能有所不同
- 中文字体在不同系统上可能差异较大

## 文件结构
```
19-font-showcase/
├── index.html      # HTML结构
├── style.css       # 样式文件
├── script.js       # 交互逻辑
└── README.md       # 本文档
```

## 学习要点

1. **font-family 属性**：设置字体系列
2. **字体回退机制**：提供多个字体备选
3. **字体分类**：serif, sans-serif, monospace, cursive
4. **系统字体**：使用 system-ui 自动适配
5. **响应式设计**：移动端字体大小调整
6. **模态窗口**：全屏展示、点击交互
7. **事件处理**：点击、键盘事件监听
8. **DOM操作**：动态获取和设置内容

## 浏览器兼容性

- 所有现代浏览器
- 字体支持依赖系统安装情况
- Google Fonts 需要网络连接
- ES6+ JavaScript 语法

## 未来改进方向

- 添加更多 Web Fonts
- 支持自定义文本输入预览
- 添加字体大小、粗细、间距调节
- 支持中英文字体对比
- 添加字体下载链接
- 支持暗色模式切换
- 添加字体收藏功能
- 支持字体相似度推荐

## 项目状态

- **状态**：✅ 已完成
- **实现方式**：HTML + CSS + JavaScript
- **性能**：优秀
- **实用性**：高（字体参考工具）
- **交互**：完整（点击放大功能）
