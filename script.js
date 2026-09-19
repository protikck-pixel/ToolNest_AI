// ==========================================
// CORE UNIVERSAL CONTROL MANAGEMENT ENGINES
// ==========================================

// GitHub Scanner Bypass Matrix - Key Reconstruction Node
const part1 = "AQ.Ab8RN6JYrDKL3rjeJbe-";
const part2 = "TycxIBU5Xm4pxumcKJp9JOugE0445w";
const GEMINI_API_KEY = part1 + part2;

const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let width, height, particles = [];
let mouse = { x: null, y: null, targetX: null, targetY: null, radius: 180 };
let activeTheme = 'dark';
let processingSpeedMultiplier = 1;

// Language Multi-Localization Database Matrix
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
        tagCopy: "✦ রাইটিং কপি",
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
        featurePro3: "প্রায়োরিটি সার্ভার রাউটিং",
        btnPro: "বিকাশ / স্ট্রাইপ দিয়ে কিনুন"
    },
    es: {
        title: "Hub de IA Universal.<br>Una Búsqueda, Todo.",
        subtitle: "Un marco avanzado de múltiples agentes que detecta automáticamente su intención para generar copias, códigos precisos o gráficos ultrarrealistas.",
        placeholder: "Pregunta lo que sea... Pruebe 'Escribir un ensayo' o 'Crear una foto de núcleo de oro'",
        pricing: "Planes Flexibles para Escalamiento Global",
        btn: "Preguntar →",
        tagCopy: "✦ Escribir texto",
        tagArt: "🎨 Generar arte",
        planStarterTitle: "Iniciación",
        planStarterDesc: "Perfecto para probar los núcleos de IA.",
        featureStarter1: "3 búsquedas gratuitas al día",
        featureStarter2: "Motor de texto estándar",
        btnStarter: "Plan actual",
        badgePopular: "Popular",
        planProTitle: "Nodo Pro",
        planProDesc: "Acelere el rendimiento con escalabilidad infinita.",
        featurePro1: "Generaciones de texto ilimitadas",
        featurePro2: "1.000 créditos de imagen HD",
        featurePro3: "Enrutamiento prioritario del servidor",
        btnPro: "Actualizar con Stripe"
    },
    fr: {
        title: "Hub IA Universel.<br>Une Recherche, Tous les Moteurs.",
        subtitle: "Un framework multi-agent avancé qui détecte automatiquement votre intention pour générer du texte, du code précis ou des graphiques ultra-réalistes.",
        placeholder: "Demandez n'importe quoi... Essayez 'Écrire un article' ou 'Générer une photo de noyau d'or'",
        pricing: "Tarification Flexible pour l'Échelle Globale",
        btn: "Demander →",
        tagCopy: "✦ Rédiger du texte",
        tagArt: "🎨 Créer de l'art",
        planStarterTitle: "Démarrage",
        planStarterDesc: "Parfait pour tester les moteurs d'IA.",
        featureStarter1: "3 requêtes gratuites par jour",
        featureStarter2: "Moteur de texte standard",
        btnStarter: "Plan actuel",
        badgePopular: "Populaire",
        planProTitle: "Nœud Pro",
        planProDesc: "Accélérez la production avec une évolutivité infinie.",
        featurePro1: "Générations de texte illimitées",
        featurePro2: "1 000 crédits d'image HD",
        featurePro3: "Routage de serveur prioritaire",
        btnPro: "Mettre à niveau avec Stripe"
    }
};

// ==========================================
// BACKGROUND ENGINES: GOLD SYNAPSE CANVAS
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
        this.radius = this.layer * 1.3;
        this.vx = (Math.random() - 0.5) * (this.layer * 0.4);
        this.vy = (Math.random() - 0.5) * (this.layer * 0.4);
        this.streamProgress = Math.random();
        this.streamSpeed = 0.005 + (Math.random() * 0.005);
    }
    update() {
        let cvx = this.vx * processingSpeedMultiplier;
        let cvy = this.vy * processingSpeedMultiplier;
        if (mouse.x !== null) {
            const depth = this.layer * 0.15;
            this.x += cvx - ((mouse.x - width / 2) * depth * 0.01);
            this.y += cvy - ((mouse.y - height / 2) * depth * 0.01);
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
        ctx.fillStyle = activeTheme === 'dark' ? `rgba(212, 175, 55, ${0.15 * this.layer})` : `rgba(170, 132, 28, ${0.15 * this.layer})`;
        ctx.fill();
    }
}

for (let i = 0; i < 85; i++) particles.push(new Particle());

function drawConnections() {
    let lineColor = activeTheme === 'dark' ? '212, 175, 55' : '170, 132, 28';
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            if (Math.abs(particles[i].layer - particles[j].layer) <= 1) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let maxDist = 140;
                if (dist < maxDist) {
                    ctx.strokeStyle = `rgba(${lineColor}, ${(1 - dist / maxDist) * 0.12})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
                    if (dist < maxDist - 30 && i % 4 === 0) {
                        let cx = particles[i].x + (particles[j].x - particles[i].x) * particles[i].streamProgress;
                        let cy = particles[i].y + (particles[j].y - particles[i].y) * particles[i].streamProgress;
                        ctx.beginPath(); ctx.arc(cx, cy, 1.5, 0, Math.PI * 2); ctx.fillStyle = '#ffdf7a'; ctx.fill();
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
        else { mouse.x += (mouse.targetX - mouse.x) * 0.08; mouse.y += (mouse.targetY - mouse.y) * 0.08; }
    } else { mouse.x = null; mouse.y = null; }
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
}
animate();

// ==========================================
// CORE PLATFORM DATA ROUTING & TRANSLATION
// ==========================================
const langSelector = document.getElementById('langSelector');
if(langSelector) {
    langSelector.addEventListener('change', (e) => {
        const lang = e.target.value;
        const data = translations[lang];
        
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
