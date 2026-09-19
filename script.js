const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: null, y: null, targetX: null, targetY: null, radius: 180 };
let activeTheme = 'dark';

// 4D Parallax Multi-layer Configuration
const LAYER_COUNT = 3; 
const PARTICLE_COUNT = 90;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Track mouse coordinate offsets for smooth inertia
window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Layer assigns depth (1 to 3). Higher layer = closer, larger, faster
        this.layer = Math.floor(Math.random() * LAYER_COUNT) + 1; 
        this.radius = this.layer * 1.2;
        this.baseSpeedX = (Math.random() - 0.5) * (this.layer * 0.4);
        this.baseSpeedY = (Math.random() - 0.5) * (this.layer * 0.4);
        this.vx = this.baseSpeedX;
        this.vy = this.baseSpeedY;
        
        // For animated data stream tracking
        this.streamProgress = Math.random();
        this.streamSpeed = 0.005 + (Math.random() * 0.005);
    }

    update() {
        // Smooth Mouse Inertia Mapping for 4D Parallax
        if (mouse.x !== null && mouse.targetX !== null) {
            // Parallax structural offset based on depth layer weight
            const depthFactor = this.layer * 0.15;
            const dx = mouse.x - width / 2;
            const dy = mouse.y - height / 2;
            
            this.x += this.vx - (dx * depthFactor * 0.01);
            this.y += this.vy - (dy * depthFactor * 0.01);
        } else {
            this.x += this.vx;
            this.y += this.vy;
        }

        // Screen boundaries warp loop
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Neural streams progression tick
        this.streamProgress += this.streamSpeed;
        if (this.streamProgress > 1) {
            this.streamProgress = 0;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme === 'dark' 
            ? `rgba(0, 242, 254, ${0.2 * this.layer})` 
            : `rgba(59, 130, 246, ${0.2 * this.layer})`;
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    // Match line styling dynamically to UI state variables
    let lineColor = activeTheme === 'dark' ? '0, 242, 254' : '59, 130, 246';
    let streamColor = activeTheme === 'dark' ? '#7f00ff' : '#9333ea';

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            // Only connect nodes residing on compatible structural layers
            if (Math.abs(particles[i].layer - particles[j].layer) <= 1) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let maxDist = 130 + (particles[i].layer * 20);

                if (dist < maxDist) {
                    let alpha = (1 - dist / maxDist) * 0.15;
                    ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                    ctx.lineWidth = 0.5 * (particles[i].layer * 0.5);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();

                    // Render flowing live data processing nodes on lines
                    if (dist < maxDist - 30 && i % 3 === 0) {
                        let p1 = particles[i];
                        let p2 = particles[j];
                        // Interpolated point based on stream progress metrics
                        let cx = p1.x + (p2.x - p1.x) * p1.streamProgress;
                        let cy = p1.y + (p2.y - p1.y) * p1.streamProgress;

                        ctx.beginPath();
                        ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
                        ctx.fillStyle = streamColor;
                        ctx.shadowBlur = 4;
                        ctx.shadowColor = streamColor;
                        ctx.fill();
                        ctx.shadowBlur = 0; // reset
                    }
                }
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Smooth interpolation for mouse responsiveness
    if (mouse.targetX !== null) {
        if (mouse.x === null) {
            mouse.x = mouse.targetX;
            mouse.y = mouse.targetY;
        } else {
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
    } else {
        mouse.x = null;
        mouse.y = null;
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
}

init();
animate();

// Theme Toggle Controller Node logic
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    if (activeTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.innerText = '☀️ Light Mode';
        activeTheme = 'light';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.innerText = '🌙 Dark Mode';
        activeTheme = 'dark';
    }
});
