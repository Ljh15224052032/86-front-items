# 项目11：Login Form

## 📝 项目说明
这是一个分屏式登录表单项目，左侧显示图片，右侧为登录表单。包含用户名、密码输入框和提交按钮。

## 🎯 实现功能
- 分屏布局（左侧图片 + 右侧表单）
- 用户名和密码输入框
- 提交按钮（带悬停效果）
- "忘记密码"链接
- 输入框聚焦时边框颜色变化
- 表单容器阴影效果

## 🔧 技术要点
- CSS float 布局（左右分栏）
- CSS box-shadow 阴影效果
- CSS box-sizing 盒模型
- CSS 伪类（:focus、:hover）
- CSS border 边框样式
- 表单元素样式定制

## ⚠️ 已知问题（多处瑕疵）

### 问题1：使用外部图片链接（严重）

**现象**：
- 背景图片：`https://pic.5tu.cn/uploads/allimg/2405/pic_5tu_big_6672913_663dc24d0f9b3-thumb-650.jpg`
- 左侧图片：`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYNzkGN3F2EJcrg2FtX3kdbyjLDYXDwxPkETVjvsUSEkcuIbqRhSqtUnoK&s=10`

**影响**：
- 外部链接可能失效或被防盗链
- 加载速度受网络影响
- 5tu.cn 是中文图库网站，稳定性未知

**解决方案**：
1. ✅ 下载图片到本地 `assets` 文件夹
2. ✅ 替换为本地路径
3. ✅ 或使用纯色背景作为备选

---

### 问题2：使用 float 布局（过时）

**现象**：
- 使用 `float: left` 和 `float: right` 实现左右分栏
- 代码结构较老

**影响**：
- float 布局已过时，现代项目推荐使用 Flexbox 或 Grid
- 可能出现高度塌陷问题
- 代码可读性和维护性较差
还有就是，没有自适应，导致非笔记本屏幕会不协调
**建议改进**：
```css
.container {
    display: flex; /* 使用 Flexbox */
    width: 50%;
    height: 400px;
    background: #fff;
    margin: 0 auto;
    box-shadow: 0 15px 40px rgba(0,0,0,.5);
}

.left {
    width: 50%;
    height: 400px;
    background: url(...) no-repeat;
    background-size: cover;
}

.right {
    width: 50%;
    height: 400px;
}
```

---

### 问题3：HTML 结构不规范

**现象**：
- 原代码中标签没有正确闭合（如 `<p>Username` 后面没有 `</p>`）
- 表单元素的 name 属性值为空字符串

**影响**：
- 不符合 HTML5 规范
- 影响代码可读性
- 可能导致表单提交时数据丢失

**已修正**：
- ✅ 添加了正确的 `</p>` 标签
- ✅ 为 input 添加了有意义的 name 属性值

---

### 问题4：缺少响应式设计

**现象**：
- 容器固定宽度 `50%`，在移动设备上可能过小
- 固定高度 `400px`，内容可能溢出
- 使用 float 布局，小屏幕上无法适配

**建议添加**：
```css
@media (max-width: 768px) {
    .container {
        width: 90%;
        height: auto;
    }

    .left, .right {
        width: 100%;
        float: none;
    }

    .left {
        height: 200px;
    }
}
```

---

### 问题5：缺少表单验证

**现象**：
- 没有前端验证（必填项、格式检查等）
- 没有密码强度提示
- 没有确认密码字段

**建议**：
- 添加 `required` 属性标记必填字段
- 添加密码强度检测
- 添加表单提交前的 JavaScript 验证

---

### 问题6：可访问性问题

**现象**：
- 输入框缺少 `<label>` 标签
- 使用纯文本作为标签（`<p>Username</p>`），语义不正确

**建议改进**：
```html
<form>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" placeholder="Online">

    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="••••••">
</form>
```

---

## 📌 踩坑记录
本项目存在多处设计和实现上的问题，不建议直接用于生产环境。

## 📚 参考资源
- [MDN - CSS Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN - HTML form](https://developer.mozilla.org/zh-CN/docs/Learn/Forms)
- [MDN - HTML label](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label)
