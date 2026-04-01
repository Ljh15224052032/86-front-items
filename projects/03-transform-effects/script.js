/* ==========================================
   项目03：CSS3 Transform Effects on Scroll - JavaScript
   ========================================== */

/**
 * 滚动触发CSS3变换效果
 *
 * 功能：监听滚动事件，对curve元素应用缩放变换
 */

// ========== 1. 获取DOM元素 ==========

var scroll = document.querySelector('.curve');

// ========== 2. 监听滚动事件 ==========

window.addEventListener('scroll', function() {
    // 获取当前滚动位置
    var value = 1 + window.scrollY / -500;

    // 应用变换效果
    // scaleY(): 在Y轴方向缩放元素
    // 滚动向下时，value从1逐渐变小，实现压缩效果
    scroll.style.transform = `scaleY(${value})`;
});

// ========== 代码说明 ==========

/**
 * 变换效果说明：
 *
 * value = 1 + window.scrollY / -500
 *
 * 滚动位置计算：
 * - scrollY = 0 时：value = 1 + 0 = 1（原始大小）
 * - scrollY = 500 时：value = 1 + (-1) = 0（完全压缩）
 * - scrollY = 250 时：value = 1 + (-0.5) = 0.5（压缩到50%）
 *
 * 效果：向下滚动时，curve元素在Y轴方向逐渐被压缩
 *
 * 为什么除以-500？
 * - 负号：使滚动向下时value变小
 * - 500：控制变换速度，数值越小变化越快
 *
 * 可以调整的参数：
 * - 500 → 改为其他数值，改变变换速度
 * - scaleY → 改为 scaleX, rotate, translate 等
 * - transform 可以组合多个变换
 */
