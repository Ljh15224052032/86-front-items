# 项目10：Neon Light Text Effects

## 📝 项目说明
这是一个模拟霓虹灯效果的文字动画项目。通过多层文字阴影和模糊滤镜，创建出逼真的霓虹灯发光效果。

## 🎯 实现功能
- 超大字体霓虹灯文字（6em）
- 多层文字阴影创建发光效果
- 使用伪元素创建模糊的光晕层
- 背景柔和光晕效果
- 使用 Google Fonts 的 Quicksand 字体

## 🔧 技术要点
- CSS text-shadow 多层阴影实现发光效果
- CSS filter: blur() 模糊滤镜
- CSS 伪元素（:before、:after）
- CSS attr() 函数读取 HTML 属性值
- CSS z-index 图层管理
- CSS opacity 透明度
- Google Fonts 外部字体引入

## 📌 踩坑记录

### ⚠️ 缺少背景图片

**现象**：CSS 中引用了 `bg.jpg` 背景图片，但项目中未提供

**影响**：
- 背景显示为空白或默认颜色
- 霓虹灯效果在白色背景上不够明显

**解决方案**：
1. ✅ 添加深色背景图片到 `assets` 文件夹
2. ✅ 或设置深色背景色作为备选：
   ```css
   body {
       background: url(bg.jpg);
       background-color: #000; /* 备选背景色 */
   }
   ```

### 📌 font-family 备选方案

**建议**：添加字体备选方案，防止 Google Fonts 加载失败
```css
font-family: 'Quicksand', sans-serif;
```
当前代码已包含 `sans-serif` 备选，无需修改。

## 📚 参考资源
- [MDN - CSS text-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)
- [MDN - CSS filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
- [MDN - CSS attr()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr)
- [Google Fonts - Quicksand](https://fonts.google.com/specimen/Quicksand)
