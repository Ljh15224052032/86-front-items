/* ==========================================
   项目02：Fullscreen Video Background - JavaScript
   ========================================== */

/**
 * 视频背景控制脚本（可选）
 *
 * 功能：
 * 1. 控制视频播放/暂停
 * 2. 检测浏览器支持情况
 * 3. 响应式调整
 */

// ========== 1. 等待DOM加载完成 ==========

document.addEventListener('DOMContentLoaded', function() {

    // 获取视频元素
    const video = document.getElementById('video-bg');

    // ========== 2. 检查浏览器支持 ==========

    if (video) {
        // 监听视频加载情况
        video.addEventListener('canplay', function() {
            console.log('视频可以播放');
        });

        // 监听播放错误
        video.addEventListener('error', function() {
            console.error('视频加载失败');
            // 可以在这里添加降级方案
        });
    }

    // ========== 3. 性能优化（可选） ==========

    /**
     * 移动设备优化
     * 在移动设备上可以暂停视频以节省流量
     */
    function checkMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log('检测到移动设备');
            // 可以选择在移动设备上不播放视频
            // if (video) video.pause();
        }
    }

    // 检查设备类型
    checkMobile();

    // ========== 4. 滚动效果（可选） ==========

    /**
     * 视差滚动效果
     * 根据滚动位置改变视频的transform
     */
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (video) {
            // 可选：添加滚动视差效果
            // video.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });

});

// ========== 代码说明 ==========

/**
 * HTML5 Video 重要属性：
 *
 * autoplay: 自动播放（注意：浏览器要求必须静音才能自动播放）
 * loop: 循环播放
 * muted: 静音（必须，否则自动播放会被阻止）
 * playsinline: iOS设备内联播放，不全屏
 * controls: 显示播放控件（不需要可以不加）
 * preload: 预加载策略（auto/metadata/none）
 *
 * object-fit 属性：
 * - fill: 拉伸填满容器（可能变形）
 * - contain: 保持比例，完整显示视频（可能有黑边）
 * - cover: 保持比例，填满容器（可能裁剪）✅ 推荐
 * - none: 不缩放
 * - scale-down: 同contain或none中较小的尺寸
 */
