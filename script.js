// ==============================
// 项目16：Target Cursor Effect
// 目标光标效果 - JavaScript
// ==============================

// ========== 配置参数 ==========
const config = {
    targetSelector: '.cursor-target',
    spinDuration: 2,
    hideDefaultCursor: true,
    hoverDuration: 0.2,
    parallaxOn: true
};

// ========== 全局变量 ==========
let cursor = null;
let dot = null;
let corners = null;
let spinTl = null;
let isActive = false;
let targetCornerPositions = null;
let tickerFn = null;
let activeStrength = 0;
let activeTarget = null;
let currentLeaveHandler = null;
let resumeTimeout = null;

// 常量
const constants = {
    borderWidth: 3,
    cornerSize: 12
};

// ========== 工具函数 ==========

// 检测移动端
function isMobileDevice() {
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
}

// 移动光标
function moveCursor(x, y) {
    if (!cursor) return;
    gsap.to(cursor, {
        x,
        y,
        duration: 0.1,
        ease: 'power3.out'
    });
}

// ========== 初始化函数 ==========

function initCursor() {
    // 检测移动端，如果是移动端则不初始化
    if (isMobileDevice()) {
        console.log('移动端设备，禁用自定义光标');
        return;
    }

    // 获取DOM元素
    cursor = document.getElementById('cursor');
    if (!cursor) {
        console.error('找不到光标元素');
        return;
    }

    dot = cursor.querySelector('.target-cursor-dot');
    corners = cursor.querySelectorAll('.target-cursor-corner');

    // 隐藏默认光标
    const originalCursor = document.body.style.cursor;
    if (config.hideDefaultCursor) {
        document.body.style.cursor = 'none';
    }

    // 初始化光标位置（屏幕中心）
    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });

    // 创建旋转动画时间轴
    createSpinTimeline();

    // 添加事件监听
    addEventListeners();

    // 返回清理函数
    return function cleanup() {
        removeEventListeners();

        if (tickerFn) {
            gsap.ticker.remove(tickerFn);
        }

        if (spinTl) {
            spinTl.kill();
        }

        document.body.style.cursor = originalCursor;

        isActive = false;
        targetCornerPositions = null;
        activeStrength = 0;
    };
}

// 创建旋转动画
function createSpinTimeline() {
    if (spinTl) {
        spinTl.kill();
    }
    spinTl = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: '+=360', duration: config.spinDuration, ease: 'none' });
}

// ========== 事件处理 ==========

function addEventListeners() {
    // 鼠标移动
    window.addEventListener('mousemove', handleMouseMove);

    // 滚动事件
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 鼠标按下/抬起
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 悬停进入
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
}

function removeEventListeners() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mouseover', handleMouseOver);
}

// 鼠标移动处理
function handleMouseMove(e) {
    moveCursor(e.clientX, e.clientY);
}

// 滚动处理
function handleScroll() {
    if (!activeTarget || !cursor) return;

    const mouseX = gsap.getProperty(cursor, 'x');
    const mouseY = gsap.getProperty(cursor, 'y');
    const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);

    const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget ||
         elementUnderMouse.closest(config.targetSelector) === activeTarget);

    if (!isStillOverTarget) {
        if (currentLeaveHandler) {
            currentLeaveHandler();
        }
    }
}

// 鼠标按下处理
function handleMouseDown() {
    if (!dot) return;
    gsap.to(dot, { scale: 0.7, duration: 0.3 });
    gsap.to(cursor, { scale: 0.9, duration: 0.2 });
}

// 鼠标抬起处理
function handleMouseUp() {
    if (!dot) return;
    gsap.to(dot, { scale: 1, duration: 0.3 });
    gsap.to(cursor, { scale: 1, duration: 0.2 });
}

// 悬停进入处理
function handleMouseOver(e) {
    const directTarget = e.target;

    // 查找所有匹配的父元素
    const allTargets = [];
    let current = directTarget;
    while (current && current !== document.body) {
        if (current.matches(config.targetSelector)) {
            allTargets.push(current);
        }
        current = current.parentElement;
    }

    const target = allTargets[0] || null;
    if (!target || !cursor || !corners) return;

    // 如果已经在同一个目标上，不做处理
    if (activeTarget === target) return;

    // 清理之前的目标
    if (activeTarget) {
        cleanupTarget(activeTarget);
    }

    // 清除超时
    if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
    }

    activeTarget = target;

    // 停止所有角的动画
    corners.forEach(corner => gsap.killTweensOf(corner));

    // 停止旋转动画
    gsap.killTweensOf(cursor, 'rotation');
    if (spinTl) {
        spinTl.pause();
    }
    gsap.set(cursor, { rotation: 0 });

    // 计算目标元素的四角位置
    const rect = target.getBoundingClientRect();
    const { borderWidth, cornerSize } = constants;
    const cursorX = gsap.getProperty(cursor, 'x');
    const cursorY = gsap.getProperty(cursor, 'y');

    targetCornerPositions = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
    ];

    isActive = true;

    // 添加ticker函数
    tickerFn = createTickerFn();
    gsap.ticker.add(tickerFn);

    // 渐变强度
    gsap.to({ activeStrength }, {
        activeStrength: 1,
        duration: config.hoverDuration,
        ease: 'power2.out',
        onUpdate: function() {
            activeStrength = this.targets()[0].activeStrength;
        }
    });

    // 移动四个角到目标位置
    corners.forEach((corner, i) => {
        gsap.to(corner, {
            x: targetCornerPositions[i].x - cursorX,
            y: targetCornerPositions[i].y - cursorY,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    // 创建离开处理函数
    const leaveHandler = () => {
        // 移除ticker
        if (tickerFn) {
            gsap.ticker.remove(tickerFn);
        }

        isActive = false;
        targetCornerPositions = null;
        activeStrength = 0;

        // 恢复四个角的位置
        if (corners) {
            corners.forEach(corner => gsap.killTweensOf(corner));

            const { cornerSize } = constants;
            const positions = [
                { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
                { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
                { x: cornerSize * 0.5, y: cornerSize * 0.5 },
                { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
            ];

            const tl = gsap.timeline();
            corners.forEach((corner, index) => {
                tl.to(
                    corner,
                    {
                        x: positions[index].x,
                        y: positions[index].y,
                        duration: 0.3,
                        ease: 'power3.out'
                    },
                    0
                );
            });
        }

        // 延迟后恢复旋转动画
        resumeTimeout = setTimeout(() => {
            if (!activeTarget && cursor && spinTl) {
                const currentRotation = gsap.getProperty(cursor, 'rotation');
                const normalizedRotation = currentRotation % 360;

                spinTl.kill();
                spinTl = gsap
                    .timeline({ repeat: -1 })
                    .to(cursor, { rotation: '+=360', duration: config.spinDuration, ease: 'none' });

                gsap.to(cursor, {
                    rotation: normalizedRotation + 360,
                    duration: config.spinDuration * (1 - normalizedRotation / 360),
                    ease: 'none',
                    onComplete: () => {
                        if (spinTl) {
                            spinTl.restart();
                        }
                    }
                });
            }
            resumeTimeout = null;
        }, 50);

        cleanupTarget(target);
        activeTarget = null;
    };

    currentLeaveHandler = leaveHandler;
    target.addEventListener('mouseleave', leaveHandler);
}

// 创建ticker函数
function createTickerFn() {
    return function() {
        if (!targetCornerPositions || !cursor || !corners) {
            return;
        }

        const strength = activeStrength;
        if (strength === 0) return;

        const cursorX = gsap.getProperty(cursor, 'x');
        const cursorY = gsap.getProperty(cursor, 'y');

        corners.forEach((corner, i) => {
            const currentX = gsap.getProperty(corner, 'x');
            const currentY = gsap.getProperty(corner, 'y');

            const targetX = targetCornerPositions[i].x - cursorX;
            const targetY = targetCornerPositions[i].y - cursorY;

            const finalX = currentX + (targetX - currentX) * strength;
            const finalY = currentY + (targetY - currentY) * strength;

            const duration = strength >= 0.99 ? (config.parallaxOn ? 0.2 : 0) : 0.05;

            gsap.to(corner, {
                x: finalX,
                y: finalY,
                duration: duration,
                ease: duration === 0 ? 'none' : 'power1.out',
                overwrite: 'auto'
            });
        });
    };
}

// 清理目标
function cleanupTarget(target) {
    if (currentLeaveHandler) {
        target.removeEventListener('mouseleave', currentLeaveHandler);
    }
    currentLeaveHandler = null;
}

// ========== 页面加载完成后初始化 ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
} else {
    initCursor();
}

// ========== 窗口大小改变时重新计算 ==========
let resizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 可以在这里添加重新计算逻辑
        console.log('窗口大小改变');
    }, 200);
});


// ========== 分类过滤功能 ==========
function initCategoryFilter() {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // 移除所有Tab的active状态
            tabs.forEach(t => t.classList.remove('active'));
            // 激活当前Tab
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // 过滤项目卡片
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // 移除动画以重新触发
                card.style.animation = 'none';
                card.offsetHeight; // 触发重绘

                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            // 过滤后重新应用分页
            refreshPagination();
        });
    });
}

// ========== 动态更新统计信息 ==========
function updateStats() {
    const total = 86;
    const cards = document.querySelectorAll('.project-card');
    let completed = 0;

    cards.forEach(card => {
        const status = card.querySelector('.project-status');
        if (status.classList.contains('status-done')) {
            completed++;

            // 为已完成的卡片添加查阅按钮
            if (!card.querySelector('.view-btn')) {
                const viewBtn = document.createElement('button');
                viewBtn.className = 'view-btn cursor-target'; // 添加cursor-target类
                viewBtn.textContent = '查阅';

                // 只有点击按钮时才跳转
                viewBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const href = card.getAttribute('data-href');
                    if (href) {
                        window.location.href = href;
                    }
                });

                card.appendChild(viewBtn);
            }
        }
    });

    const percentage = Math.round((completed / total) * 100);

    document.querySelectorAll('.stat-number')[1].textContent = completed;
    document.querySelectorAll('.stat-number')[2].textContent = percentage + '%';
}

// ========== 更新分类计数 ==========
function updateCategoryCounts() {
    const cards = document.querySelectorAll('.project-card');
    const tabs = document.querySelectorAll('.category-tab');

    tabs.forEach(tab => {
        const category = tab.getAttribute('data-category');
        let count = 0;

        if (category === 'all') {
            count = cards.length;
        } else {
            cards.forEach(card => {
                if (card.getAttribute('data-category') === category) {
                    count++;
                }
            });
        }

        const countSpan = tab.querySelector('.count');
        if (countSpan) {
            countSpan.textContent = count;
        }
    });
}

// ========== 分页功能 ==========
const itemsPerPage = 15; // 每页15个项目（5列 x 3行）
let currentPage = 1;


// 更新分页信息（不重新绑定事件）
function refreshPagination() {
    const cards = Array.from(document.querySelectorAll('.project-card:not(.hidden)'));
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    
    // 更新总页数
    document.getElementById('totalPages').textContent = totalPages;
    
    // 重置到第一页
    currentPage = 1;
    showPage(1);
}

function initPagination() {
    // 只获取未被筛选隐藏的卡片
    const cards = Array.from(document.querySelectorAll('.project-card:not(.hidden)'));
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    // 更新总页数
    document.getElementById('totalPages').textContent = totalPages;

    // 显示第一页
    showPage(1);

    // 绑定翻页按钮事件
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
}

function showPage(page) {
    // 只处理未被筛选隐藏的卡片
    const cards = Array.from(document.querySelectorAll('.project-card:not(.hidden)'));
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 隐藏所有卡片
    cards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.classList.remove('hidden');
            card.style.display = 'flex';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });

    // 更新当前页码
    document.getElementById('currentPage').textContent = page;

    // 更新按钮状态
    document.getElementById('prevBtn').disabled = (page === 1);
    document.getElementById('nextBtn').disabled = (page === Math.ceil(cards.length / itemsPerPage));

    // 更新统计（只统计当前页）
    updateCurrentPageStats();
}

function updateCurrentPageStats() {
    const visibleCards = Array.from(document.querySelectorAll('.project-card:not(.hidden)'));
    let completed = 0;

    visibleCards.forEach(card => {
        const status = card.querySelector('.project-status');
        if (status && status.classList.contains('status-done')) {
            completed++;

            // 为已完成的卡片添加查阅按钮
            if (!card.querySelector('.view-btn')) {
                const viewBtn = document.createElement('button');
                viewBtn.className = 'view-btn cursor-target'; // 添加cursor-target类
                viewBtn.textContent = '查阅';

                viewBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const href = card.getAttribute('data-href');
                    if (href) {
                        window.location.href = href;
                    }
                });

                card.appendChild(viewBtn);
            }
        }
    });

    // 更新统计显示当前页的完成数
    document.querySelectorAll('.stat-number')[1].textContent = completed;
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function () {
    updateStats(); // 更新全局统计（总共86个）
    initPagination(); // 初始化分页
    updateCategoryCounts();
    initCategoryFilter();
});
