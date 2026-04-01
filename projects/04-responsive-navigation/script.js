/* ==========================================
   项目04：Fullscreen Overlay Responsive Navigation Menu - JavaScript
   ========================================== */

/**
 * 全屏覆盖导航菜单的交互逻辑
 *
 * 功能：点击图标切换菜单显示/隐藏
 */

// ========== 菜单切换功能 ==========

function menuToggle() {
    var nav = document.getElementById('menu-overlay');
    nav.classList.toggle('active');
}

// ========== 为切换图标绑定事件 ==========

document.addEventListener('DOMContentLoaded', function() {
    const toggleIcon = document.getElementById('toggleIcon');

    if (toggleIcon) {
        toggleIcon.addEventListener('click', menuToggle);
    }
});
