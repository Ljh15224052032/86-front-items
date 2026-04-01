/* ==========================================
   项目03：CSS3 Transform Effects on Scroll - JavaScript
   ========================================== */

/**
 * 滚动触发CSS3变换效果
 *
 * 功能：
 * 1. 监听页面滚动事件
 * 2. 检测元素是否进入视口
 * 3. 根据滚动位置应用不同的变换效果
 * 4. 性能优化
 */

// ========== 1. 等待DOM加载完成 ==========

document.addEventListener('DOMContentLoaded', function() {

    // ========== 2. 获取DOM元素 ==========

    const navbar = document.querySelector('.navbar');
    const boxes = document.querySelectorAll('.box');
    const sections = document.querySelectorAll('.section');

    // ========== 3. 导航栏滚动效果 ==========

    /**
     * 监听滚动事件，改变导航栏样式
     */
    window.addEventListener('scroll', function() {
        // 检查滚动位置
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========== 4. 元素进入视口检测 ==========

    /**
     * 检查元素是否在视口中可见
     * @param {HTMLElement} element - 要检测的元素
     * @returns {boolean} - 是否可见
     */
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // 元素顶部进入视口
        const isVisible = (rect.top <= windowHeight * 0.75) && (rect.bottom >= 0);

        return isVisible;
    }

    // ========== 5. 滚动事件监听 - 应用变换效果 ==========

    /**
     * 监听滚动事件，为进入视口的元素添加变换效果
     */
    window.addEventListener('scroll', function() {

        // 遍历所有box元素
        boxes.forEach(function(box) {

            // 检查是否在视口中
            if (isElementInViewport(box)) {

                // 添加active类，触发CSS变换
                box.classList.add('active');

            } else {

                // 可选：移出视口时移除效果
                // box.classList.remove('active');

            }
        });

    });

    // ========== 6. 初始化检查 ==========

    // 页面加载时立即检查一次
    boxes.forEach(function(box) {
        if (isElementInViewport(box)) {
            box.classList.add('active');
        }
    });

});

// ========== 7. 性能优化版本（可选）==========

/**
 * 使用节流（throttle）优化滚动事件
 * 避免滚动事件触发过于频繁
 */
/*
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用节流版本的滚动监听
window.addEventListener('scroll', throttle(function() {
    // 滚动处理代码
}, 100));
*/

// ========== 8. 使用 Intersection Observer API（现代浏览器推荐）==========

/**
 * 使用 Intersection Observer API 替代滚动事件监听
 * 性能更好，代码更简洁
 */
/*
const observerOptions = {
    root: null,           // 使用视口作为根元素
    rootMargin: '0px',    // 不添加边距
    threshold: 0.25       // 元素出现25%时触发
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // 可选：移出视口时移除效果
            // entry.target.classList.remove('active');
        }
    });
}, observerOptions);

// 观察所有box元素
boxes.forEach(function(box) {
    observer.observe(box);
});
*/

// ========== 9. 代码说明 ==========

/**
 * CSS3 Transform 常用属性：
 *
 * translate(x, y) - 平移
 *   单位：px, %, em, rem, vw, vh
 *
 * rotate(angle) - 旋转
 *   单位：deg（度）, rad（弧度）, turn（圈）
 *
 * scale(x, y) - 缩放
 *   无单位，1 = 原始大小
 *
 * skew(x, y) - 倾斜
 *   单位：deg
 *
 * 复合变换：
 * transform: rotate(45deg) scale(1.5) translate(10px, 20px);
 *
 * 性能优化：
 * - 使用 transform 替代 position 动画
 * - 使用 will-change 提示浏览器
 * - 使用 requestAnimationFrame
 * - 避免在滚动事件中执行重排操作
 */
