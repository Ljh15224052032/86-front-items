/* ==========================================
   项目04：Fullscreen Overlay Responsive Navigation Menu - JavaScript
   ========================================== */

/**
 * 全屏覆盖导航菜单的交互逻辑
 *
 * 功能：
 * 1. 点击菜单图标，打开全屏菜单
 * 2. 点击关闭按钮，关闭菜单
 * 3. 点击菜单项，跳转后关闭菜单
 * 4. 汉堡图标动画状态切换
 */

// ========== 1. 等待DOM加载完成 ==========

document.addEventListener('DOMContentLoaded', function() {

    // ========== 2. 获取DOM元素 ==========

    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    const overlayMenu = document.querySelector('.overlay-menu');
    const menuLinks = document.querySelectorAll('.menu-items a');

    // ========== 3. 打开菜单功能 ==========

    /**
     * 点击菜单图标，打开全屏菜单
     */
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // 添加active类，触发CSS动画
            overlayMenu.classList.add('active');
            menuToggle.classList.add('active');
        });
    }

    // ========== 4. 关闭菜单功能 ==========

    /**
     * 点击关闭按钮，关闭全屏菜单
     */
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            // 移除active类，关闭菜单
            overlayMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    }

    // ========== 5. 点击菜单项后关闭菜单 ==========

    /**
     * 点击菜单项链接后，自动关闭菜单
     */
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // 延迟关闭，等待跳转开始
            setTimeout(function() {
                overlayMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }, 300);
        });
    });

});

// ========== 6. ESC键关闭菜单（可选功能）==========

/**
 * 按ESC键关闭菜单
 * 提升用户体验
 */
/*
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        overlayMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
*/

// ========== 7. 点击遮罩层外部关闭菜单（可选功能）==========

/**
 * 点击菜单内容区域外关闭菜单
 */
/*
overlayMenu.addEventListener('click', function(event) {
    if (event.target === overlayMenu) {
        overlayMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
*/

// ========== 8. 代码说明 ==========

/**
 * 核心实现原理：
 *
 * 1. 使用 transform: translateX(-100%) 隐藏菜单
 *    - -100%：移出视口左侧（完全隐藏）
 *    - 0：回到视口（显示菜单）
 *
 * 2. CSS transition 实现平滑动画
 *    - transform 0.5s ease：过渡时间和缓动函数
 *
 * 3. 汉堡菜单图标动画
 *    - span(1)：旋转45度 + 平移
 *    - span(2)：隐藏（opacity: 0）
 *    - span(3)：反向旋转45度 + 平移
 *    - 组合形成 X 形状
 *
 * 4. z-index 层级控制
 *    - navbar: z-index: 1000（最上层）
 *    - overlay-menu: z-index: 999（菜单层）
 *    - content: z-index: 1（内容层）
 */
