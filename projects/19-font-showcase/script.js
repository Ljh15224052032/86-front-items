// ========== 平滑滚动导航 ==========
document.addEventListener('DOMContentLoaded', function() {

    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-link');

    // 为每个链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 获取目标ID
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // 平滑滚动到目标位置
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 更新URL（不跳转）
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========== 滚动时高亮当前导航 ==========
    const sections = document.querySelectorAll('.font-category');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ========== 移动端导航平滑滚动 ==========
    // 在移动设备上，点击导航后确保能看到完整内容
    if (window.innerWidth <= 968) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 等待滚动完成后清除高亮
                setTimeout(() => {
                    this.classList.add('active');
                }, 500);
            });
        });
    }

    // ========== 模态窗口功能 ==========
    const modal = document.getElementById('fontModal');
    const modalClose = document.getElementById('modalClose');
    const modalFontName = document.getElementById('modalFontName');
    const modalFontInfo = document.getElementById('modalFontInfo');
    const modalSampleEn = document.getElementById('modalSampleEn');
    const modalSampleZh = document.getElementById('modalSampleZh');

    // 为所有字体卡片添加点击事件
    const fontCards = document.querySelectorAll('.font-card');

    fontCards.forEach(card => {
        card.addEventListener('click', function() {
            // 获取字体信息
            const fontName = this.querySelector('.font-name').textContent;
            const fontInfo = this.querySelector('.font-info').textContent;
            const samples = this.querySelectorAll('.font-sample');
            const sampleEn = samples[0] ? samples[0].textContent : '';
            const sampleZh = samples[1] ? samples[1].textContent : '';
            const fontFamily = samples[0] ? samples[0].style.fontFamily : '';

            // 填充模态窗口内容
            modalFontName.textContent = fontName;
            modalFontInfo.textContent = fontInfo;
            modalSampleEn.textContent = sampleEn;
            modalSampleEn.style.fontFamily = fontFamily;
            modalSampleZh.textContent = sampleZh;
            modalSampleZh.style.fontFamily = fontFamily;

            // 显示模态窗口
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        });
    });

    // 关闭按钮点击事件
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    });

    // 点击遮罩层关闭模态窗口
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ESC键关闭模态窗口
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
