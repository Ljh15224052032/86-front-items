// ==============================
// 项目25：美元数字流背景
// Money Flow Background
// ==============================

const canvas = document.getElementById('moneyFlow');
const ctx = canvas.getContext('2d');

// ========== 配置 ==========
const CONFIG = {
    GREEN_RATIO: 0.68,
    MIN_FONT: 13,
    MAX_FONT: 17,
    MIN_SPEED: 0.6,
    MAX_SPEED: 2.2,
    GAP: 25,                // 数字之间的最小间距 (px)
    COLUMN_GAP: 65,         // 列间距 (px)
    GLOW_GREEN: 'rgba(0, 255, 136, 0.6)',
    GLOW_RED: 'rgba(255, 51, 68, 0.4)',
};

let W, H;
let columns = [];

// ========== 工具函数 ==========
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
}

function generateMoneyText() {
    const isGreen = Math.random() < CONFIG.GREEN_RATIO;
    const sign = isGreen ? '+' : '-';
    const dollars = randInt(1, 9999);
    const decimals = randInt(0, 2);
    const cents = decimals === 0 ? '' : '.' + String(randInt(0, Math.pow(10, decimals) - 1)).padStart(decimals, '0');
    return {
        text: `${sign}$${dollars}${cents}`,
        isGreen
    };
}

// 竖排文字的像素高度
function textHeight(text, fontSize) {
    return text.length * fontSize * 0.85;
}

// ========== 列 ==========
function createColumn(x) {
    const fontSize = rand(CONFIG.MIN_FONT, CONFIG.MAX_FONT);
    return {
        x,
        fontSize,
        speed: rand(CONFIG.MIN_SPEED, CONFIG.MAX_SPEED),
        chars: [],
        lastSpawnY: -Infinity,
    };
}

// ========== 初始化 ==========
function init() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    columns = [];
    const colCount = Math.floor(W / CONFIG.COLUMN_GAP);
    for (let i = 0; i < colCount; i++) {
        const x = (W / (colCount + 1)) * (i + 1);
        columns.push(createColumn(x));
    }
}

// ========== 更新 ==========
function update() {
    for (const col of columns) {
        // 移动该列所有数字（同速）
        for (let i = col.chars.length - 1; i >= 0; i--) {
            const ch = col.chars[i];
            ch.y += col.speed;

            // 渐隐
            const progress = ch.y / H;
            ch.opacity = Math.max(0, 1 - progress * 1.15);

            // 移除超出屏幕的
            if (ch.y > H + 50 || ch.opacity <= 0) {
                col.chars.splice(i, 1);
            }
        }

        // 检查是否可以生成新数字
        const lastChar = col.chars[col.chars.length - 1];

        if (!lastChar || lastChar.y >= CONFIG.GAP) {
            const { text, isGreen } = generateMoneyText();
            const h = textHeight(text, col.fontSize);
            col.chars.push({
                text,
                isGreen,
                y: -h,
                opacity: 1,
                fontSize: col.fontSize,
            });
        }
    }
}

// ========== 绘制 ==========
function draw() {
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, W, H);

    for (const col of columns) {
        for (const ch of col.chars) {
            ctx.save();
            ctx.font = `bold ${ch.fontSize}px 'Courier New', Consolas, monospace`;

            if (ch.isGreen) {
                ctx.fillStyle = `rgba(0, 255, 136, ${ch.opacity})`;
                ctx.shadowColor = CONFIG.GLOW_GREEN;
                ctx.shadowBlur = ch.opacity > 0.7 ? 10 : 3;
            } else {
                ctx.fillStyle = `rgba(255, 51, 68, ${ch.opacity})`;
                ctx.shadowColor = CONFIG.GLOW_RED;
                ctx.shadowBlur = ch.opacity > 0.7 ? 6 : 2;
            }

            // 竖排绘制：旋转90度
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.translate(ch.x, ch.y);
            ctx.rotate(Math.PI / 2);

            const spacing = ch.fontSize * 0.85;
            for (let i = 0; i < ch.text.length; i++) {
                ctx.fillText(ch.text[i], i * spacing, 0);
            }

            ctx.restore();
        }
    }
}

// ========== 动画循环 ==========
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// ========== 启动 ==========
window.addEventListener('resize', init);
init();
requestAnimationFrame(animate);
