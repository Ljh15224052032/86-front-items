// ==============================
// 项目18：灯塔光束效果（单层光束）
// Lighthouse Beacon - Single Beam
// ==============================

// ========== 全局变量 ==========
const speedControl = document.getElementById('speedControl');
const speedValue = document.getElementById('speedValue');

// ========== 初始化星星位置 ==========
function initStars() {
    const stars = document.querySelectorAll('.star');
    const positions = [
        {top: '10%', left: '15%'}, {top: '20%', left: '80%'},
        {top: '30%', left: '25%'}, {top: '15%', left: '60%'},
        {top: '40%', left: '90%'}, {top: '50%', left: '10%'},
        {top: '60%', left: '70%'}, {top: '70%', left: '30%'},
        {top: '80%', left: '85%'}, {top: '25%', left: '45%'},
        {top: '35%', left: '55%'}, {top: '45%', left: '20%'},
        {top: '55%', left: '75%'}, {top: '65%', left: '40%'},
        {top: '75%', left: '65%'}, {top: '85%', left: '15%'},
        {top: '12%', left: '35%'}, {top: '22%', left: '95%'},
        {top: '32%', left: '5%'}, {top: '42%', left: '50%'}
    ];
    
    stars.forEach((star, index) => {
        if (positions[index]) {
            star.style.top = positions[index].top;
            star.style.left = positions[index].left;
            star.style.setProperty('--duration', (2 + Math.random() * 2) + 's');
        }
    });
}

// ========== 速度控制 ==========
function updateSpeed(value) {
    const speed = value + 's';
    speedValue.textContent = speed;
    
    // 更新主光束速度
    document.querySelector('.beam-primary').style.setProperty('--rotation-speed', speed);
}

// ========== 事件监听 ==========
speedControl.addEventListener('input', (e) => {
    updateSpeed(e.target.value);
});

// ========== 页面加载完成后初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    console.log('灯塔光束效果已初始化（单层光束）');
});
