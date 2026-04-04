// ==============================
// 项目17：项目展示平台
// Project Showcase Platform
// ==============================

// ========== 模拟项目数据 (20个项目) ==========
// 日期分配：
// - 2024-03-15: 6个项目（演示换行）
// - 2024-02-10: 1个项目（演示单个项目）
// - 2024-01-05: 8个项目
// - 2023-12-20: 5个项目
const projectsData = [
    { id: 1, title: '游戏宣传海报', category: 'infographic', color: '#667eea', date: '2024-03-15' },
    { id: 2, title: '移动应用界面', category: 'interface', color: '#764ba2', date: '2024-03-15' },
    { id: 3, title: '品牌标志设计', category: 'thumbnail', color: '#f093fb', date: '2024-03-15' },
    { id: 4, title: '桌面壁纸集', category: 'wallpaper', color: '#4facfe', date: '2024-03-15' },
    { id: 5, title: '创意字体设计', category: 'typography', color: '#00f2fe', date: '2024-03-15' },
    { id: 6, title: '数据可视化', category: 'infographic', color: '#43e97b', date: '2024-03-15' },
    { id: 7, title: '网站界面重构', category: 'interface', color: '#fa709a', date: '2024-02-10' },
    { id: 8, title: '图标设计包', category: 'thumbnail', color: '#fee140', date: '2024-01-05' },
    { id: 9, title: '抽象艺术壁纸', category: 'wallpaper', color: '#30cfd0', date: '2024-01-05' },
    { id: 10, title: '标志字体设计', category: 'typography', color: '#a8edea', date: '2024-01-05' },
    { id: 11, title: '委托项目A', category: 'commission', color: '#fed6e3', date: '2024-01-05' },
    { id: 12, title: '信息图表设计', category: 'infographic', color: '#c471f5', date: '2024-01-05' },
    { id: 13, title: '电商APP界面', category: 'interface', color: '#fa709a', date: '2024-01-05' },
    { id: 14, title: '社交媒体素材', category: 'thumbnail', color: '#f78ca0', date: '2024-01-05' },
    { id: 15, title: '自然风景壁纸', category: 'wallpaper', color: '#fe9a8b', date: '2024-01-05' },
    { id: 16, title: '艺术字体海报', category: 'typography', color: '#fecfef', date: '2023-12-20' },
    { id: 17, title: '委托项目B', category: 'commission', color: '#a1c4fd', date: '2023-12-20' },
    { id: 18, title: '创意杂项', category: 'misc', color: '#c2e9fb', date: '2023-12-20' },
    { id: 19, title: '年度报告图表', category: 'infographic', color: '#d4fc79', date: '2023-12-20' },
    { id: 20, title: '产品界面设计', category: 'interface', color: '#96e6a1', date: '2023-12-20' }
];

// ========== 全局状态 ==========
let currentState = {
    viewMode: 'grid',     // 视图模式：'grid' 或 'timeline'
    columns: 3,           // 列数：2-5
    perPage: 6,           // 每页数量：必须是列数的倍数
    currentPage: 1,       // 当前页码
    category: 'all',      // 当前分类
    searchQuery: '',      // 搜索关键词
    filteredProjects: []  // 筛选后的项目
};

// ========== 分类映射 ==========
const categoryMap = {
    'all': '全部',
    'infographic': '信息图',
    'thumbnail': '缩略图',
    'wallpaper': '壁纸',
    'interface': '界面',
    'typography': '字体设计',
    'commission': '委托',
    'misc': '杂项'
};

// ========== 初始化 ==========
function init() {
    // 初始化筛选后的项目
    currentState.filteredProjects = [...projectsData];

    // 设置初始滑块值
    document.getElementById('columnsSlider').value = currentState.columns;
    document.getElementById('perPageSlider').value = currentState.perPage;

    // 更新每页数量滑块属性
    updatePerPageSlider();

    // 更新滑块标签
    updateSliderLabels();

    // 绑定事件监听器
    bindEventListeners();

    // 渲染项目
    renderProjects();
}

// ========== FLIP动画技术 ==========
function flipTransition(updateCallback) {
    // 只在网格视图执行FLIP动画
    if (currentState.viewMode !== 'grid') {
        updateCallback();
        return;
    }

    const cards = Array.from(document.querySelectorAll('.projects-grid .project-card'));

    // 如果没有卡片，直接执行更新
    if (cards.length === 0) {
        updateCallback();
        return;
    }

    // 1. First: 记录所有卡片的初始位置和ID
    const firstRects = cards.map(card => card.getBoundingClientRect());
    const cardIds = cards.map(card => {
        const numberEl = card.querySelector('.project-number');
        return numberEl ? numberEl.textContent : '';
    });

    // 2. 执行更新回调
    updateCallback();

    // 3. Last: 获取新位置的卡片
    const newCards = Array.from(document.querySelectorAll('.projects-grid .project-card'));
    const newCardIds = newCards.map(card => {
        const numberEl = card.querySelector('.project-number');
        return numberEl ? numberEl.textContent : '';
    });
    const lastRects = newCards.map(card => card.getBoundingClientRect());

    // 4. 为每个现有卡片应用FLIP动画，新增卡片添加slide-in动画
    newCards.forEach((card, index) => {
        const cardId = newCardIds[index];
        const firstIndex = cardIds.indexOf(cardId);

        if (firstIndex !== -1) {
            // 现有卡片：执行FLIP动画
            const firstRect = firstRects[firstIndex];
            const lastRect = lastRects[index];

            const deltaX = firstRect.left - lastRect.left;
            const deltaY = firstRect.top - lastRect.top;

            if (deltaX !== 0 || deltaY !== 0) {
                card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                card.style.transition = 'none';
            }
        } else {
            // 新增卡片：添加slide-in动画
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'none';
        }
    });

    // 5. Play: 启用transition并移除transform
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            newCards.forEach((card, index) => {
                const cardId = newCardIds[index];
                const firstIndex = cardIds.indexOf(cardId);

                if (firstIndex !== -1) {
                    // 现有卡片：FLIP动画
                    const firstRect = firstRects[firstIndex];
                    const lastRect = lastRects[index];

                    const deltaX = firstRect.left - lastRect.left;
                    const deltaY = firstRect.top - lastRect.top;

                    if (deltaX !== 0 || deltaY !== 0) {
                        card.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.transform = '';
                    }
                } else {
                    // 新增卡片：slide-in动画
                    card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = '';
                }
            });
        });
    });
}

// ========== 绑定事件监听器 ==========
function bindEventListeners() {
    // 列数滑块
    const columnsSlider = document.getElementById('columnsSlider');
    columnsSlider.addEventListener('input', (e) => {
        const newColumns = parseInt(e.target.value);
        currentState.columns = newColumns;

        // 调整每页数量为列数的倍数
        const perPageSlider = document.getElementById('perPageSlider');

        // 如果当前每页数量小于新列数，则设置为列数
        if (currentState.perPage < newColumns) {
            currentState.perPage = newColumns;
        } else {
            // 如果当前每页数量不是新列数的倍数，向下取整到最近的倍数
            const remainder = currentState.perPage % newColumns;
            if (remainder !== 0) {
                currentState.perPage = currentState.perPage - remainder;
                // 确保至少等于列数
                if (currentState.perPage < newColumns) {
                    currentState.perPage = newColumns;
                }
            }
        }

        // 更新滑块属性
        updatePerPageSlider();

        // 更新标签和布局
        updateSliderLabels();

        // 重新计算当前页码，防止超出范围
        const maxPage = Math.ceil(currentState.filteredProjects.length / currentState.perPage);
        if (currentState.currentPage > maxPage) {
            currentState.currentPage = maxPage || 1;
        }

        // 使用FLIP动画更新网格列数和项目
        flipTransition(() => {
            updateGridColumns();
            renderProjects();
        });
    });

    // 每页数量滑块
    const perPageSlider = document.getElementById('perPageSlider');
    perPageSlider.addEventListener('input', (e) => {
        const oldPerPage = currentState.perPage;
        currentState.perPage = parseInt(e.target.value);
        updateSliderLabels();

        // 重新计算当前页码，防止超出范围
        const maxPage = Math.ceil(currentState.filteredProjects.length / currentState.perPage);
        if (currentState.currentPage > maxPage) {
            currentState.currentPage = maxPage || 1;
        }

        // 如果每页数量变化，使用FLIP动画
        if (oldPerPage !== currentState.perPage && currentState.viewMode === 'grid') {
            flipTransition(() => {
                renderProjects();
            });
        } else {
            renderProjects();
        }
    });

    // 搜索框实时过滤
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('input', (e) => {
        currentState.searchQuery = e.target.value;
        currentState.currentPage = 1; // 搜索时重置到第一页

        // 重新筛选和渲染
        filterProjects();
        renderProjects();
    });

    // 分类标签切换
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');

            // 更新active状态
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 更新当前分类
            currentState.category = category;
            currentState.currentPage = 1; // 重置到第一页

            // 筛选项目（考虑当前的搜索关键词）
            filterProjects();

            // 重新渲染
            renderProjects();
        });
    });

    // 视图切换按钮
    const gridViewBtn = document.getElementById('gridViewBtn');
    const timelineViewBtn = document.getElementById('timelineViewBtn');
    const controlGroup = document.querySelector('.control-group');

    gridViewBtn.addEventListener('click', () => {
        currentState.viewMode = 'grid';
        gridViewBtn.classList.add('active');
        timelineViewBtn.classList.remove('active');
        // 显示网格控件
        controlGroup.style.display = 'flex';
        renderProjects();
    });

    timelineViewBtn.addEventListener('click', () => {
        currentState.viewMode = 'timeline';
        timelineViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        // 隐藏网格控件
        controlGroup.style.display = 'none';
        renderProjects();
    });
}

// ========== 更新滑块标签 ==========
function updateSliderLabels() {
    document.getElementById('columnsValue').textContent = currentState.columns;
    document.getElementById('perPageValue').textContent = currentState.perPage;
}

// ========== 更新每页数量滑块属性 ==========
function updatePerPageSlider() {
    const perPageSlider = document.getElementById('perPageSlider');
    const columns = currentState.columns;

    // 设置最小值为列数
    perPageSlider.min = columns;

    // 设置步进为列数（保证是列数的倍数）
    perPageSlider.step = columns;

    // 设置最大值
    // 找到不超过12的最大的列数的倍数
    const maxMultiple = Math.floor(12 / columns) * columns;
    perPageSlider.max = maxMultiple;

    // 如果当前值超过新的最大值，则调整到最大值
    if (currentState.perPage > maxMultiple) {
        currentState.perPage = maxMultiple;
        perPageSlider.value = maxMultiple;
    }

    // 确保当前值符合新的步进
    const remainder = currentState.perPage % columns;
    if (remainder !== 0) {
        currentState.perPage = currentState.perPage - remainder;
        if (currentState.perPage < columns) {
            currentState.perPage = columns;
        }
        perPageSlider.value = currentState.perPage;
    }
}

// ========== 更新网格列数 ==========
function updateGridColumns() {
    const grid = document.getElementById('projectsGrid');
    grid.style.gridTemplateColumns = `repeat(${currentState.columns}, 1fr)`;
}

// ========== 筛选项目 ==========
function filterProjects() {
    // 第一步：根据分类筛选
    let categoryFiltered = [];
    if (currentState.category === 'all') {
        categoryFiltered = [...projectsData];
    } else {
        categoryFiltered = projectsData.filter(
            project => project.category === currentState.category
        );
    }

    // 第二步：根据搜索关键词过滤
    if (currentState.searchQuery.trim() === '') {
        // 如果没有搜索关键词，直接使用分类筛选的结果
        currentState.filteredProjects = categoryFiltered;
    } else {
        // 在分类筛选的基础上，再按搜索关键词过滤
        const query = currentState.searchQuery.toLowerCase().trim();
        currentState.filteredProjects = categoryFiltered.filter(project => {
            // 匹配项目标题
            const titleMatch = project.title.toLowerCase().includes(query);
            // 匹配分类名称
            const categoryMatch = categoryMap[project.category].toLowerCase().includes(query);
            return titleMatch || categoryMatch;
        });
    }
}

// ========== 渲染项目 ==========
function renderProjects() {
    // 如果没有筛选结果，显示提示信息
    if (currentState.filteredProjects.length === 0) {
        const grid = document.getElementById('projectsGrid');
        const pagination = document.getElementById('pagination');
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">未找到匹配的项目</div>
                <div class="no-results-hint">请尝试其他搜索关键词或切换分类</div>
            </div>
        `;
        pagination.innerHTML = '';
        return;
    }

    // 根据视图模式渲染
    if (currentState.viewMode === 'grid') {
        renderGridView();
    } else {
        renderTimelineView();
    }
}

// ========== 渲染网格视图 ==========
function renderGridView() {
    const grid = document.getElementById('projectsGrid');
    const pagination = document.getElementById('pagination');

    // 恢复网格视图的样式
    grid.style.display = 'grid';

    // 计算当前页的项目
    const startIndex = (currentState.currentPage - 1) * currentState.perPage;
    const endIndex = startIndex + currentState.perPage;
    const currentProjects = currentState.filteredProjects.slice(startIndex, endIndex);

    // 渲染项目卡片
    grid.innerHTML = currentProjects.map(project => `
        <div class="project-card">
            <div class="project-image" style="background: ${project.color}">
                ${String(project.id).padStart(2, '0')}
            </div>
            <div class="project-info">
                <div class="project-number">#${String(project.id).padStart(2, '0')}</div>
                <div class="project-title">${project.title}</div>
                <div class="project-category">${categoryMap[project.category]}</div>
            </div>
        </div>
    `).join('');

    // 更新网格列数
    updateGridColumns();

    // 渲染分页
    renderPagination();
}

// ========== 渲染时间线视图 ==========
function renderTimelineView() {
    const grid = document.getElementById('projectsGrid');
    const pagination = document.getElementById('pagination');

    // 清除网格视图的样式
    grid.style.display = 'block';
    grid.style.gridTemplateColumns = 'none';

    // 时间线视图显示所有项目，无分页
    const timelineProjects = [...currentState.filteredProjects];

    // 按日期排序（最新的在前面）
    timelineProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 按日期分组
    const groupedByDate = {};
    timelineProjects.forEach(project => {
        if (!groupedByDate[project.date]) {
            groupedByDate[project.date] = [];
        }
        groupedByDate[project.date].push(project);
    });

    // 月份名称
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    // 生成HTML
    let timelineHTML = '<div class="timeline-wrapper">';

    // 遍历每个日期组
    Object.keys(groupedByDate).forEach(date => {
        const projects = groupedByDate[date];
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const monthName = monthNames[month - 1];

        // 计算这个日期需要多少行
        const rowsCount = Math.ceil(projects.length / 4);

        // 为每一行生成HTML
        for (let row = 0; row < rowsCount; row++) {
            const startIdx = row * 4;
            const endIdx = Math.min(startIdx + 4, projects.length);
            const rowProjects = projects.slice(startIdx, endIdx);

            timelineHTML += '<div class="timeline-row">';

            // 左侧：4个项目位置
            timelineHTML += '<div class="timeline-projects">';

            // 渲染项目
            rowProjects.forEach(project => {
                timelineHTML += `
                    <div class="project-card">
                        <div class="project-image" style="background: ${project.color}">
                            ${String(project.id).padStart(2, '0')}
                        </div>
                        <div class="project-info" style="opacity: 1;">
                            <div class="project-number">#${String(project.id).padStart(2, '0')}</div>
                            <div class="project-title">${project.title}</div>
                            <div class="project-category">${categoryMap[project.category]}</div>
                        </div>
                    </div>
                `;
            });

            // 补齐空位
            for (let i = rowProjects.length; i < 4; i++) {
                timelineHTML += '<div class="project-card empty-slot"></div>';
            }

            timelineHTML += '</div>'; // timeline-projects

            // 右侧：日期（只在第一行显示）
            if (row === 0) {
                timelineHTML += `
                    <div class="timeline-date-box">
                        <div class="date-day">${day}</div>
                        <div class="date-month-year">${monthName} ${year}</div>
                    </div>
                `;
            } else {
                timelineHTML += '<div class="timeline-date-box empty-date"></div>';
            }

            timelineHTML += '</div>'; // timeline-row
        }
    });

    timelineHTML += '</div>'; // timeline-wrapper

    grid.innerHTML = timelineHTML;

    // 隐藏分页
    pagination.innerHTML = '';
}

// ========== 渲染分页 ==========
function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalProjects = currentState.filteredProjects.length;
    const totalPages = Math.ceil(totalProjects / currentState.perPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    // 生成分页按钮
    let paginationHTML = '';

    // 上一页按钮
    paginationHTML += `
        <button class="page-btn" ${currentState.currentPage === 1 ? 'disabled' : ''}>
            ‹
        </button>
    `;

    // 页码按钮
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn ${i === currentState.currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    // 下一页按钮
    paginationHTML += `
        <button class="page-btn" ${currentState.currentPage === totalPages ? 'disabled' : ''}>
            ›
        </button>
    `;

    pagination.innerHTML = paginationHTML;

    // 绑定分页按钮事件
    bindPaginationEvents();
}

// ========== 绑定分页事件 ==========
function bindPaginationEvents() {
    const pageButtons = document.querySelectorAll('.page-btn');

    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');

            if (page) {
                // 点击页码按钮
                currentState.currentPage = parseInt(page);
                renderProjects();
            } else if (btn.textContent === '‹') {
                // 上一页
                if (currentState.currentPage > 1) {
                    currentState.currentPage--;
                    renderProjects();
                }
            } else if (btn.textContent === '›') {
                // 下一页
                const totalPages = Math.ceil(currentState.filteredProjects.length / currentState.perPage);
                if (currentState.currentPage < totalPages) {
                    currentState.currentPage++;
                    renderProjects();
                }
            }
        });
    });
}

// ========== 页面加载完成后初始化 ==========
document.addEventListener('DOMContentLoaded', init);
