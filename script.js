const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let width, height, particles = [];
let mouse = { x: null, y: null, targetX: null, targetY: null, radius: 180 };
let activeTheme = 'dark';
let processingSpeedMultiplier = 1;

// Language Localization System Database Matrix
const translations = {
    en: {
        title: "Universal AI Hub.<br>One Search, All Engines.",
        subtitle: "An advanced, multi-agent framework that auto-detects your intent to generate copy, precise code, or ultra-realistic graphics instantly.",
        placeholder: "Ask anything... Try 'Write an essay' or 'Generate a futuristic gold core photo'",
        pricing: "Flexible Plans for Global Scaling",
        btn: "Ask AI →",
        tagCopy: "✦ Write Copy",
        tagArt: "🎨 Generate Art",
        planStarterTitle: "Starter",
        planStarterDesc: "Perfect for testing the AI cores.",
        featureStarter1: "3 Free Synapses / Day",
        featureStarter2: "Standard Text Engine",
        btnStarter: "Current Plan",
        badgePopular: "Popular",
        planProTitle: "Pro Node",
        planProDesc: "Accelerate output with infinite scalability.",
        featurePro1: "Unlimited Text Generations",
        featurePro2: "1,000 HD Image Credits",
        featurePro3: "Priority Server Routing",
        btnPro: "Upgrade with Stripe"
    },
    bn: {
        title: "ইউনিভার্সাল এআই হাব।<br>এক সার্চে সব ইঞ্জিন।",
        subtitle: "একটি উন্নত মাল্টি-এজেন্ট ফ্রেমওয়ার্ক যা আপনার উদ্দেশ্য বুঝতে পারে এবং মুহূর্তের মধ্যে কন্টেন্ট, নির্ভুল কোড বা ছবি তৈরি করে দেয়।",
        placeholder: "যেকোনো কিছু জিজ্ঞাসা করুন... যেমন: 'একটি ব্যবসায়িক আইডিয়া দাও' বা 'পাখির বাসার ছবি তৈরি করো'",
        pricing: "গ্লোবাল স্কেলিংয়ের জন্য ফ্লেক্সিবল প্ল্যানসমূহ",
        btn: "জিজ্ঞাসা করুন →",
        tagCopy: "✦ রাইটিং কবি",
        tagArt: "🎨 আর্ট জেনারেট",
        planStarterTitle: "স্টার্টার প্যাক",
        planStarterDesc: "এআই কোডগুলো ফ্রিতে টেস্ট করার জন্য পারফেক্ট।",
        featureStarter1: "প্রতিদিন ৩টি ফ্রি সার্চ",
        featureStarter2: "স্ট্যান্ডার্ড টেক্সট ইঞ্জিন",
        btnStarter: "বর্তমান প্ল্যান",
        badgePopular: "জনপ্রিয়",
        planProTitle: "প্রো নোড",
        planProDesc: "আনলিমিটেড এআই পাওয়ার ও হাই-স্পিড জেনারেশন।",
        featurePro1: "আনলিমিটেড টেক্সট জেনারেশন",
        featurePro2: "১,০০০টি এইচডি ইমেজ ক্রেডিট",
        featurePro3: "priority সার্ভার রাউটিং",
        btnPro: "বিকাশ / স্ট্রাইপ দিয়ে কিনুন"
    }
};

// ==========================================
// PURE 4D HIGH-FIDELITY PARTICLE CANVAS LOOP
// ==========================================
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => { mouse.targetX = e.clientX; mouse.targetY = e.clientY; });
window.addEventListener('mouseleave', () => { mouse.targetX = null; mouse.targetY = null; });

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.layer = Math.floor(Math.random() * 3) + 1; 
        this.radius = this.layer * 1.5;
        this.vx = (Math.random() - 0.5) * (this.layer * 0.5);
        this.vy = (Math.random() - 0.5) * (this.layer * 0.5);
        this.streamProgress = Math.random();
        this.streamSpeed = 0.006 + (Math.random() * 0.006);
    }
    update() {
        let cvx = this.vx * processingSpeedMultiplier;
        let cvy = this.vy * processingSpeedMultiplier;
        if (mouse.x !== null) {
            const depth = this.layer * 0.25;
            this.x += cvx - ((mouse.x - width / 2) * depth * 0.008);
            this.y += cvy - ((mouse.y - height / 2) * depth * 0.008);
        } else {
            this.x += cvx; this.y += cvy;
        }
        if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
        this.streamProgress += this.streamSpeed * processingSpeedMultiplier;
        if (this.streamProgress > 1) this.streamProgress = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme === 'dark' ? `rgba(251, 191, 36, ${0.2 * this.layer})` : `rgba(217, 119, 6, ${0.2 * this.layer})`;
        ctx.fill();
    }
}

for (let i = 0; i < 95; i++) particles.push(new Particle());

function drawConnections() {
    let lineColor = activeTheme === 'dark' ? '251, 191, 36' : '217, 119, 6';
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            if (particles[i].layer === particles[j].layer) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let maxDist = 150;
                if (dist < maxDist) {
                    ctx.strokeStyle = `rgba(${lineColor}, ${(1 - dist / maxDist) * 0.18})`;
                    ctx.lineWidth = particles[i].layer * 0.4;
                    ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
                    if (dist < maxDist - 20 && i % 3 === 0) {
                        let cx = particles[i].x + (particles[j].x - particles[i].x) * particles[i].streamProgress;
                        let cy = particles[i].y + (particles[j].y - particles[i].y) * particles[i].streamProgress;
                        ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
                    }
                }
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    if (mouse.targetX !== null) {
        if (mouse.x === null) { mouse.x = mouse.targetX; mouse.y = mouse.targetY; }
        else { mouse.x += (mouse.targetX - mouse.x) * 0.1; mouse.y += (mouse.targetY - mouse.y) * 0.1; }
    } else { mouse.x = null; mouse.y = null; }
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
}
animate();

// ==========================================
// CORE TRANSLATION SYSTEM HANDLERS
// ==========================================
const langSelector = document.getElementById('langSelector');
if(langSelector) {
    langSelector.addEventListener('change', (e) => {
        const lang = e.target.value;
        const data = translations[lang] || translations['en'];
        
        document.getElementById('heroTitle').innerHTML = data.title;
        document.getElementById('heroSubtitle').innerText = data.subtitle;
        document.getElementById('aiPrompt').placeholder = data.placeholder;
        document.getElementById('pricingTitle').innerText = data.pricing;
        document.getElementById('generateBtn').innerText = data.btn;
        document.getElementById('tagCopy').innerText = data.tagCopy;
        document.getElementById('tagArt').innerText = data.tagArt;
        document.getElementById('planStarterTitle').innerText = data.planStarterTitle;
        document.getElementById('planStarterDesc').innerText = data.planStarterDesc;
        document.getElementById('featureStarter1').innerText = data.featureStarter1;
        document.getElementById('featureStarter2').innerText = data.featureStarter2;
        document.getElementById('btnStarter').innerText = data.btnStarter;
        if(document.getElementById('badgePopular')) document.getElementById('badgePopular').innerText = data.badgePopular;
        document.getElementById('planProTitle').innerText = data.planProTitle;
        document.getElementById('planProDesc').innerText = data.planProDesc;
        document.getElementById('featurePro1').innerText = data.featurePro1;
        document.getElementById('featurePro2').innerText = data.featurePro2;
        document.getElementById('featurePro3').innerText = data.featurePro3;
        document.getElementById('btnPro').innerText = data.btnPro;
    });
}

function setQuickPrompt(text) {
    document.getElementById('aiPrompt').value = text;
    document.getElementById('aiPrompt').focus();
}

// ==========================================
// SECURE AI ROUTING ENGINE
// ==========================================
document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('aiPrompt').value.trim();
    if (!prompt) return;

    const outputWindow = document.getElementById('outputWindow');
    const outputBody = document.getElementById('outputBody');
    const agentBadge = document.getElementById('agentBadge');
    const selectedMode = document.getElementById('modelAgent').value;

    outputWindow.classList.remove('hidden');
    outputBody.innerHTML = `<span class="ai-loading-pulse">⚡ Core Nodes spinning up. Streaming intelligence data array...</span>`;
    processingSpeedMultiplier = 5; 

    if (selectedMode === 'image') {
        agentBadge.innerText = "🎨 Creative Vision Agent";
        setTimeout(() => {
            processingSpeedMultiplier = 1;
            // High speed proxy render engine channel
            const randomSeed = Math.floor(Math.random() * 100000);
            outputBody.innerHTML = `
                <p style="margin-bottom: 12px; color: var(--accent-color);">✦ Luxury Visual Architecture Render Compiled successfully:</p>
                <img src="https://pollinations.ai{encodeURIComponent(prompt)}?width=800&height=500&nologo=true&seed=${randomSeed}" class="generated-image">
            `;
        }, 3000);
    } else {
        agentBadge.innerText = "🧠 Deep Cognition Agent";
        try {
            // Free Public Serverless Gateway (No Key Required Endpoint)
            const response = await fetch(`https://pollinations.ai`, {
                method: 'POST',
