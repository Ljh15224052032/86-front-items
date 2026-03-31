/* ==========================================
   项目01：Moon Light Parallax Effects - JavaScript
   ========================================== */

/**
 * 视差滚动效果实现
 * 原理：监听scroll事件，根据滚动距离调整各图层的位置
 * 不同图层使用不同的移动速度，创造3D深度感
 */

// ========== 1. 获取DOM元素 ==========
// 使用getElementById通过ID获取页面元素
// 这些元素在HTML中都有对应的id属性
let bg = document.getElementById('bg');          // 背景层
let moon = document.getElementById('moon');      // 月亮层
let mountain = document.getElementById('mountain'); // 山脉层
let road = document.getElementById('road');      // 道路层
let text = document.getElementById('text');      // 文字层

// ========== 2. 监听滚动事件 ==========
// window.addEventListener: 监听浏览器窗口的滚动事件
// 'scroll': 事件类型，当用户滚动页面时触发
// function(){ ... }: 事件处理函数，滚动时执行的代码
window.addEventListener('scroll', function() {

    // ========== 3. 获取滚动距离 ==========
    // window.scrollY: 返回文档垂直滚动的像素值
    // 例如：向下滚动100px，scrollY = 100
    let value = window.scrollY;

    // ========== 4. 应用视差效果 ==========
    // 根据滚动距离，计算每个图层的新位置
    // 不同图层使用不同的系数，创造深度感

    /**
     * 背景层 (bg)
     * 移动速度：0.5倍（中等速度）
     * 方向：向下移动（正数）
     * 效果：背景随滚动缓慢移动，营造空间感
     */
    bg.style.top = value * 0.5 + 'px';

    /**
     * 月亮层 (moon)
     * 移动速度：0.5倍（中等速度）
     * 方向：向左移动（负数）
     * 效果：月亮横向移动，增加动态感
     */
    moon.style.left = -value * 0.5 + 'px';

    /**
     * 山脉层 (mountain)
     * 移动速度：0.15倍（慢速）
     * 方向：向上移动（负数）
     * 效果：山脉作为远景，移动缓慢，突出距离感
     */
    mountain.style.top = -value * 0.15 + 'px';

    /**
     * 道路层 (road)
     * 移动速度：0.15倍（慢速）
     * 方向：向下移动（正数）
     * 效果：道路作为前景，移动缓慢，增强透视感
     */
    road.style.top = value * 0.15 + 'px';

    /**
     * 文字层 (text)
     * 移动速度：1倍（快速）
     * 方向：向下移动（正数）
     * 使用marginTop：外边距改变位置，而不是transform
     * 效果：文字快速移动，吸引注意力
     */
    text.style.top = value * 1 + 'px';

});

// ========== 代码说明 ==========
/**
 * 以前用var，现在用let：
 *
 * var:
 * - 函数作用域
 * - 可以重复声明
 * - 存在变量提升
 *
 * let:
 * - 块级作用域（更安全）
 * - 不能重复声明
 * - 不存在变量提升
 * - 推荐在现代JavaScript中使用let
 */
