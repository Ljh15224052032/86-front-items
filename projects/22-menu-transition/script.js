// ==============================
// 项目22：菜单过渡动画
// Menu Transition
// ==============================

const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const originalParent = menuToggle.parentElement;

function openMenu() {
    menuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.appendChild(menuToggle);  // 移到body
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    originalParent.appendChild(menuToggle);  // 移回原位
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    if (menuOverlay.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
    });
});
