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
    // value = 1 + window.scrollY / -500
    // 分母500控制压缩速度，数值越小压缩越快

    var value = 1 + window.scrollY / -250;  // 从500改为250，压缩速度加快1倍

    // 应用变换效果
    // scaleY(): 在Y轴方向缩放元素
    scroll.style.transform = `scaleY(${value})`;
});

// ========== 代码说明 ==========

/**
 * 变换效果说明：
 *
 * value = 1 + window.scrollY / -250
 *
 * 滚动位置计算（分母250）：
 * - scrollY = 0 时：value = 1 + 0 = 1（原始大小）
 * - scrollY = 125 时：value = 1 + (-0.5) = 0.5（压缩到50%）
 * - scrollY = 250 时：value = 1 + (-1) = 0（完全压缩）
 *
 * 效果：向下滚动时，curve元素在Y轴方向逐渐被压缩
 *
 * 分母对速度的影响：
 * - 分母500：滚动500px才完全压缩（慢速）
 * - 分母250：滚动250px就完全压缩（中速）✅ 当前
 * - 分母125：滚动125px就完全压缩（快速）
 *
 * 可以调整的参数：
 * - 250 → 改为更小的数值，压缩更快
 * - 250 → 改为更大的数值，压缩更慢
 * - scaleY → 改为 scaleX, rotate, translate 等
 */
