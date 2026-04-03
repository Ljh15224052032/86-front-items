// ==============================
// 项目15：Constellation Loading Animation
// 星座连线Loading动画 - JavaScript
// ==============================

// ========== Canvas初始化 ==========
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W, H, cx, cy; // 画布宽度、高度、中心点
const bgStars = []; // 背景星星数组

// 调整画布大小
function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cx = W / 2;
    cy = H / 2;
}

resizeCanvas();

// 窗口大小改变时重新调整画布
let resizeTimer = null;
window.addEventListener("resize", () => {
    resizeCanvas();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        regenerateBgStars(); // 重新生成背景星星
    }, 200);
});

// ========== 星座数据定义 ==========
const constellations = [
    {
        name: "ORION",
        nameCN: "猎户座",
        desc: "冬季之王 · 腰带三星最易辨认",
        season: "冬",
        themeColor: [100, 180, 255],
        stars: [
            {
                x: 0.3333,
                y: 0.1333,
                mag: 0.5,
                color: "#ff9944",
                label: "参宿四",
            }, // 0 Betelgeuse
            { x: 0.6667, y: 0.1806, mag: 2.0, color: "#ffffff" }, // 1 参宿五
            { x: 0.25, y: 0.375, mag: 2.1, color: "#ffffff" }, // 2 左腰
            { x: 0.7778, y: 0.3611, mag: 2.2, color: "#ccd8ff" }, // 3 右腰
            { x: 0.3889, y: 0.4944, mag: 2.2, color: "#ccd8ff" }, // 4 参宿一 belt
            { x: 0.5, y: 0.4944, mag: 2.2, color: "#ccd8ff" }, // 5 参宿二 belt
            { x: 0.6111, y: 0.4861, mag: 2.2, color: "#ccd8ff" }, // 6 参宿三 belt
            { x: 0.2917, y: 0.8056, mag: 2.1, color: "#ffffff" }, // 7 参宿六
            {
                x: 0.7083,
                y: 0.8194,
                mag: 0.18,
                color: "#b8d4ff",
                label: "参宿七",
            }, // 8 Rigel
        ],
        links: [
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 4],
            [4, 5],
            [5, 6],
            [3, 6],
            [4, 7],
            [6, 8],
        ],
        // M42 星云位置
        nebula: {
            x: 0.4944,
            y: 0.6667,
            rx: 0.04,
            ry: 0.03,
            color: "rgba(255,130,130,0.12)",
        },
    },
    {
        name: "URSA MAJOR",
        nameCN: "大熊座",
        desc: "北斗七星 · 全年可见的导航星座",
        season: "全年",
        themeColor: [140, 190, 255],
        stars: [
            { x: 0.15, y: 0.43, mag: 2.4, color: "#ffffff", label: "天璇" },
            { x: 0.2, y: 0.28, mag: 1.8, color: "#ffffff", label: "天枢" },
            { x: 0.42, y: 0.48, mag: 2.4, color: "#ffffff" },
            { x: 0.4, y: 0.33, mag: 2.4, color: "#ffffff" },
            { x: 0.58, y: 0.38, mag: 1.8, color: "#ffffff", label: "玉衡" },
            { x: 0.74, y: 0.32, mag: 2.2, color: "#ffffff", label: "开阳" },
            { x: 0.87, y: 0.25, mag: 1.9, color: "#ffffff", label: "摇光" },
        ],
        links: [
            [0, 1],
            [1, 3],
            [3, 2],
            [2, 0],
            [3, 4],
            [4, 5],
            [5, 6],
        ],
        pointer: { fromA: 0, fromB: 1, label: "→ 北极星" },
    },
    {
        name: "CASSIOPEIA",
        nameCN: "仙后座",
        desc: "W 形标志 · 北天拱极星座",
        season: "全年",
        themeColor: [180, 200, 255],
        stars: [
            { x: 0.125, y: 0.4063, mag: 2.3, color: "#ffffff", label: "策" },
            {
                x: 0.3125,
                y: 0.5938,
                mag: 2.2,
                color: "#fff0dd",
                label: "王良一",
            },
            { x: 0.5, y: 0.3594, mag: 2.5, color: "#ccd8ff" },
            { x: 0.6875, y: 0.6094, mag: 2.7, color: "#ffffff" },
            {
                x: 0.8906,
                y: 0.3906,
                mag: 3.3,
                color: "#ffffff",
                label: "阁道二",
            },
        ],
        links: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
        ],
    },
    {
        name: "SCORPIUS",
        nameCN: "天蝎座",
        desc: "夏季之王 · S 形蝎尾极壮观",
        season: "夏",
        themeColor: [255, 120, 80],
        stars: [
            { x: 0.1563, y: 0.1563, mag: 2.9, color: "#ccd8ff" },
            { x: 0.2656, y: 0.2031, mag: 2.6, color: "#ccd8ff" },
            { x: 0.3438, y: 0.1406, mag: 2.9, color: "#ccd8ff" },
            {
                x: 0.3125,
                y: 0.2969,
                mag: 0.96,
                color: "#ff6644",
                label: "心宿二",
            },
            { x: 0.3594, y: 0.4063, mag: 2.8, color: "#aabbcc" },
            { x: 0.375, y: 0.5156, mag: 2.7, color: "#aabbcc" },
            { x: 0.4375, y: 0.6094, mag: 2.4, color: "#ccd8ff" },
            { x: 0.5313, y: 0.6719, mag: 2.7, color: "#aabbcc" },
            { x: 0.6563, y: 0.7031, mag: 2.4, color: "#ccd8ff" },
            { x: 0.7656, y: 0.7656, mag: 2.7, color: "#aabbcc" },
            { x: 0.8125, y: 0.8594, mag: 2.7, color: "#aabbcc" },
            { x: 0.7813, y: 0.9375, mag: 2.7, color: "#aabbcc" },
            { x: 0.8438, y: 0.9063, mag: 1.6, color: "#ccd8ff", label: "尾宿" },
        ],
        links: [
            [0, 1],
            [1, 2],
            [1, 3],
            [3, 4],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 8],
            [8, 9],
            [9, 10],
            [10, 11],
            [11, 12],
        ],
    },
    {
        name: "CYGNUS",
        nameCN: "天鹅座",
        desc: "北十字 · 夏季大三角成员",
        season: "夏",
        themeColor: [130, 200, 255],
        stars: [
            { x: 0.5, y: 0.125, mag: 1.25, color: "#ffd700", label: "天津四" },
            { x: 0.5, y: 0.3438, mag: 2.5, color: "#ccd8ff" },
            { x: 0.5, y: 0.5938, mag: 2.2, color: "#ffffff" },
            { x: 0.5, y: 0.8438, mag: 3.0, color: "#aabbcc" },
            { x: 0.1875, y: 0.4531, mag: 2.5, color: "#ccd8ff" },
            { x: 0.8438, y: 0.4375, mag: 2.5, color: "#ccd8ff" },
        ],
        links: [
            [0, 1],
            [1, 2],
            [2, 3],
            [4, 2],
            [2, 5],
        ],
    },
    {
        name: "TAURUS",
        nameCN: "金牛座",
        desc: "冬季 · V 形牛脸 · 昴星团",
        season: "冬",
        themeColor: [255, 180, 100],
        stars: [
            { x: 0.4643, y: 0.5, mag: 0.85, color: "#ff9944", label: "毕宿五" },
            { x: 0.3571, y: 0.3571, mag: 2.9, color: "#aabbcc" },
            { x: 0.6071, y: 0.375, mag: 2.9, color: "#aabbcc" },
            { x: 0.6071, y: 0.5357, mag: 3.0, color: "#aabbcc" },
            { x: 0.75, y: 0.5536, mag: 3.4, color: "#aabbcc" },
            { x: 0.25, y: 0.2857, mag: 2.8, color: "#ccd8ff" },
            { x: 0.6964, y: 0.2679, mag: 2.8, color: "#ccd8ff" },
        ],
        links: [
            [0, 1],
            [0, 2],
            [0, 3],
            [3, 4],
            [1, 5],
            [2, 6],
        ],
        cluster: { x: 0.8643, y: 0.4286, r: 0.05, count: 8, label: "昴星团" },
    },
    {
        name: "LYRA",
        nameCN: "天琴座",
        desc: "夏季大三角 · 织女星璀璨夺目",
        season: "夏",
        themeColor: [200, 230, 255],
        stars: [
            { x: 0.5, y: 0.12, mag: 0.03, color: "#fffff0", label: "织女星" },
            { x: 0.35, y: 0.42, mag: 3.3, color: "#aabbcc" },
            { x: 0.62, y: 0.38, mag: 3.5, color: "#aabbcc" },
            { x: 0.32, y: 0.72, mag: 3.2, color: "#aabbcc" },
            { x: 0.65, y: 0.68, mag: 3.4, color: "#aabbcc" },
        ],
        links: [
            [0, 1],
            [0, 2],
            [1, 2],
            [1, 3],
            [2, 4],
            [3, 4],
        ],
        nebula: {
            x: 0.485,
            y: 0.55,
            rx: 0.02,
            ry: 0.02,
            color: "rgba(130,180,255,0.10)",
        },
    },
    {
        name: "CRUX",
        nameCN: "南十字座",
        desc: "面积最小 · 南半球标志星座",
        season: "南天",
        themeColor: [160, 210, 255],
        stars: [
            { x: 0.5, y: 0.1875, mag: 2.8, color: "#ccd8ff" },
            {
                x: 0.5,
                y: 0.7188,
                mag: 0.76,
                color: "#b8d4ff",
                label: "十字架二",
            },
            { x: 0.2813, y: 0.4531, mag: 2.8, color: "#ccd8ff" },
            {
                x: 0.7344,
                y: 0.4375,
                mag: 1.25,
                color: "#ffffff",
                label: "十字架三",
            },
            { x: 0.5469, y: 0.4688, mag: 3.6, color: "#889999" },
        ],
        links: [
            [0, 1],
            [2, 3],
        ],
        darkNebula: { x: 0.41, y: 0.549, rx: 0.08, ry: 0.07 },
    },
];

// ========== 背景星星系统 ==========
const BG_STAR_COUNT = 300; // 背景星星数量

// 创建单个背景星星
function createBgStar() {
    const colorRoll = Math.random();
    let r = 255, g = 255, b = 255;

    if (colorRoll < 0.08) {
        r = 180; g = 200; b = 255; // 偏蓝
    } else if (colorRoll < 0.14) {
        r = 255; g = 230; b = 180; // 偏黄
    } else if (colorRoll < 0.17) {
        r = 255; g = 200; b = 180; // 偏橙
    }

    return {
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.5 + 0.15,
        twinkleSpeed: Math.random() * 0.025 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        r, g, b,
    };
}

// 初始化背景星星
function initBgStars() {
    bgStars.length = 0;
    for (let i = 0; i < BG_STAR_COUNT; i++) {
        bgStars.push(createBgStar());
    }
}

// 重新生成背景星星
function regenerateBgStars() {
    initBgStars();
}

initBgStars();

// ========== 动画状态管理 ==========
let currentIndex = 0; // 当前星座索引
let phase = "drawing"; // 当前阶段：drawing | labeling | holding | fading
let drawProgress = 0; // 绘制进度
let holdTimer = 0; // 保持计时器
let fadeAlpha = 1; // 淡出透明度
let labelAlpha = 0; // 标签透明度

// DOM元素引用
const nameEl = document.getElementById("constellationName");
const nameCNEl = document.getElementById("constellationNameCN");
const descEl = document.getElementById("constellationDesc");

// 获取当前星座
function getCurrent() {
    return constellations[currentIndex % constellations.length];
}

// 坐标转换：将相对坐标转换为Canvas坐标
function toCanvas(star) {
    const scale = Math.min(W, H) * 0.48;
    const ox = (W - scale) / 2;
    const oy = (H - scale) / 2;
    return { x: ox + star.x * scale, y: oy + star.y * scale };
}

// ========== 绘图函数 ==========

// 绘制背景
function drawBackground(t) {
    ctx.fillStyle = "#070b1a";
    ctx.fillRect(0, 0, W, H);

    // 绘制背景星星
    bgStars.forEach((s) => {
        const tw = Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const a = s.alpha * (0.5 + tw * 0.5);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a})`;
        ctx.fill();
    });
}

// 绘制星座
function drawConstellation(t, c, progress, alpha, showLabels) {
    const totalSeg = c.links.length;
    const starsDrawn = new Set();
    const tc = c.themeColor || [100, 180, 255];

    // 绘制连线
    c.links.forEach((link, i) => {
        const seg = Math.max(0, Math.min(1, progress * totalSeg - i));
        if (seg <= 0) return;

        const from = toCanvas(c.stars[link[0]]);
        const to = toCanvas(c.stars[link[1]]);
        const curX = from.x + (to.x - from.x) * seg;
        const curY = from.y + (to.y - from.y) * seg;

        // 渐变连线
        const grad = ctx.createLinearGradient(from.x, from.y, curX, curY);
        grad.addColorStop(0, `rgba(${tc[0]},${tc[1]},${tc[2]},${0.6 * alpha})`);
        grad.addColorStop(1, `rgba(${tc[0]},${tc[1]},${tc[2]},${0.85 * alpha})`);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 连线光晕
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = `rgba(${tc[0]},${tc[1]},${tc[2]},${0.12 * alpha})`;
        ctx.lineWidth = 7;
        ctx.stroke();

        starsDrawn.add(link[0]);
        if (seg >= 1) starsDrawn.add(link[1]);

        // 绘制连接点
        if (seg > 0 && seg < 1) {
            ctx.beginPath();
            ctx.arc(curX, curY, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220,240,255,${alpha})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(curX, curY, 9, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${tc[0]},${tc[1]},${tc[2]},${0.18 * alpha})`;
            ctx.fill();
        }
    });

    // 绘制星云
    if (c.nebula && progress > 0.4) {
        const np = toCanvas(c.nebula);
        const scale = Math.min(W, H) * 0.48;
        const na = Math.min(1, (progress - 0.4) * 3) * alpha;

        ctx.beginPath();
        ctx.ellipse(np.x, np.y, c.nebula.rx * scale, c.nebula.ry * scale, 0, 0, Math.PI * 2);
        ctx.fillStyle = c.nebula.color.replace(/[\d.]+\)$/, `${0.12 * na})`);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(np.x, np.y, c.nebula.rx * scale * 0.5, c.nebula.ry * scale * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = c.nebula.color.replace(/[\d.]+\)$/, `${0.2 * na})`);
        ctx.fill();
    }

    // 绘制暗星云
    if (c.darkNebula && progress > 0.5) {
        const dp = toCanvas(c.darkNebula);
        const scale = Math.min(W, H) * 0.48;
        const da = Math.min(1, (progress - 0.5) * 3) * alpha;

        ctx.beginPath();
        ctx.ellipse(dp.x, dp.y, c.darkNebula.rx * scale, c.darkNebula.ry * scale, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${0.25 * da})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(80,80,120,${0.2 * da})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // 绘制星团
    if (c.cluster && progress > 0.3) {
        const cp = toCanvas(c.cluster);
        const scale = Math.min(W, H) * 0.48;
        const ca = Math.min(1, (progress - 0.3) * 3) * alpha;
        const cr = c.cluster.r * scale;

        for (let k = 0; k < c.cluster.count; k++) {
            const angle = (k / c.cluster.count) * Math.PI * 2 + t * 0.001;
            const dist = cr * (0.3 + Math.random() * 0.7);
            const sx = cp.x + Math.cos(angle) * dist * (0.8 + Math.sin(t * 0.01 + k) * 0.2);
            const sy = cp.y + Math.sin(angle) * dist * (0.8 + Math.cos(t * 0.01 + k) * 0.2);
            const ss = 1.0 + Math.sin(t * 0.03 + k * 1.5) * 0.5;

            ctx.beginPath();
            ctx.arc(sx, sy, ss, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(170,190,230,${0.5 * ca})`;
            ctx.fill();
        }

        // 星团标签
        if (showLabels && c.cluster.label) {
            ctx.font = '10px "PingFang SC", sans-serif';
            ctx.fillStyle = `rgba(170,190,230,${0.5 * ca * labelAlpha})`;
            ctx.textAlign = "center";
            ctx.fillText(c.cluster.label, cp.x, cp.y - cr - 6);
        }
    }

    // 绘制星星
    c.stars.forEach((star, i) => {
        if (!starsDrawn.has(i)) return;

        const pos = toCanvas(star);
        const mag = star.mag !== undefined ? star.mag : 3;
        const baseSize = Math.max(1.5, 5.5 - mag * 0.9);
        const pulse = Math.sin(t * 0.025 + i * 1.7) * 0.2 + 1;
        const size = baseSize * pulse;
        const col = star.color || "#ffffff";

        // 星星光晕
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 6);
        glow.addColorStop(0, hexToRgba(col, 0.4 * alpha));
        glow.addColorStop(0.4, hexToRgba(col, 0.1 * alpha));
        glow.addColorStop(1, hexToRgba(col, 0));

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // 亮星十字光芒
        if (mag < 2) {
            const sLen = size * 8;
            const sLen2 = size * 5;
            ctx.strokeStyle = hexToRgba(col, 0.22 * alpha);
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            ctx.moveTo(pos.x - sLen, pos.y);
            ctx.lineTo(pos.x + sLen, pos.y);
            ctx.moveTo(pos.x, pos.y - sLen);
            ctx.lineTo(pos.x, pos.y + sLen);
            ctx.moveTo(pos.x - sLen2, pos.y - sLen2);
            ctx.lineTo(pos.x + sLen2, pos.y + sLen2);
            ctx.moveTo(pos.x + sLen2, pos.y - sLen2);
            ctx.lineTo(pos.x - sLen2, pos.y + sLen2);
            ctx.stroke();
        }

        // 星星本体
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(col, alpha);
        ctx.fill();

        // 星星标签
        if (showLabels && star.label && labelAlpha > 0) {
            ctx.font = '11px "PingFang SC", sans-serif';
            ctx.fillStyle = hexToRgba(col, 0.7 * alpha * labelAlpha);
            ctx.textAlign = "center";
            ctx.fillText(star.label, pos.x, pos.y - size * 6 - 6);
        }
    });

    // 绘制指示线（如北斗七星指向北极星）
    if (c.pointer && progress > 0.9) {
        const pa = Math.min(1, (progress - 0.9) * 10) * alpha * 0.35;
        const fromA = toCanvas(c.stars[c.pointer.fromA]);
        const fromB = toCanvas(c.stars[c.pointer.fromB]);

        const dx = fromB.x - fromA.x;
        const dy = fromB.y - fromA.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const endX = fromB.x + (dx / len) * len * 4;
        const endY = fromB.y + (dy / len) * len * 4;

        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(fromB.x, fromB.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255,215,0,${pa})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        // 北极星
        ctx.beginPath();
        ctx.arc(endX, endY, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${pa * 1.5})`;
        ctx.fill();

        if (showLabels && labelAlpha > 0) {
            ctx.font = '10px "PingFang SC", sans-serif';
            ctx.fillStyle = `rgba(255,215,0,${pa * labelAlpha * 2})`;
            ctx.textAlign = "center";
            ctx.fillText("北极星 Polaris", endX, endY - 12);
        }
    }
}

// ========== 流星系统 ==========
let shootingStars = [];

// 更新流星
function updateShootingStars() {
    if (Math.random() < 0.004) { // 0.4%概率生成流星
        shootingStars.push({
            x: Math.random() * W * 0.8 + W * 0.1,
            y: 0,
            vx: (Math.random() - 0.35) * 7,
            vy: Math.random() * 5 + 3.5,
            life: 1,
            len: Math.random() * 60 + 40,
        });
    }

    shootingStars = shootingStars.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.014;

        if (s.life > 0) {
            const tx = s.x - s.vx * (s.len / 8);
            const ty = s.y - s.vy * (s.len / 8);

            const g = ctx.createLinearGradient(tx, ty, s.x, s.y);
            g.addColorStop(0, "rgba(255,255,255,0)");
            g.addColorStop(1, `rgba(255,255,255,${s.life * 0.55})`);

            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.life})`;
            ctx.fill();
        }

        return s.life > 0;
    });
}

// ========== 工具函数 ==========

// 颜色转换：hex/rgb → rgba
function hexToRgba(hex, a) {
    if (hex.startsWith("rgba") || hex.startsWith("rgb")) {
        return hex.replace(/[\d.]+\)$/, `${a})`);
    }

    let c = hex.replace("#", "");
    if (c.length === 3) {
        c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }

    const n = parseInt(c, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

// ========== 主动画循环 ==========
let time = 0;

function animate() {
    time++;
    const c = getCurrent();

    // 绘制背景和星星
    drawBackground(time);

    // 更新流星
    updateShootingStars();

    // 根据当前阶段执行不同逻辑
    switch (phase) {
        case "drawing": // 连线绘制阶段
            drawProgress += 0.004;
            drawConstellation(time, c, drawProgress, 1, false);
            if (drawProgress >= 1.05) {
                phase = "labeling";
                labelAlpha = 0;
            }
            break;

        case "labeling": // 标签淡入阶段
            labelAlpha = Math.min(1, labelAlpha + 0.02);
            drawConstellation(time, c, 1, 1, true);
            if (labelAlpha >= 1) {
                phase = "holding";
                holdTimer = 0;
            }
            break;

        case "holding": // 保持阶段
            drawConstellation(time, c, 1, 1, true);
            holdTimer++;
            if (holdTimer > 160) { // 保持约2.7秒
                phase = "fading";
                fadeAlpha = 1;
            }
            break;

        case "fading": // 淡出阶段
            fadeAlpha -= 0.012;
            labelAlpha = Math.max(0, labelAlpha - 0.025);
            drawConstellation(time, c, 1, Math.max(0, fadeAlpha), true);

            if (fadeAlpha <= 0) {
                // 切换到下一个星座
                phase = "drawing";
                drawProgress = 0;
                labelAlpha = 0;
                currentIndex++;

                // 更新文字信息
                const next = getCurrent();
                nameCNEl.style.opacity = "0";
                nameEl.style.opacity = "0";
                descEl.style.opacity = "0";

                setTimeout(() => {
                    nameCNEl.textContent = next.nameCN;
                    nameEl.textContent = next.name;
                    descEl.textContent = next.desc;
                    nameCNEl.style.opacity = "";
                    nameEl.style.opacity = "";
                    descEl.style.opacity = "";
                }, 300);
            }
            break;
    }

    requestAnimationFrame(animate);
}

// 启动动画
animate();
