/**
 * 3D Colorful Interactive Space
 * Triggers when "The sweet is never as sweet without the sour" is clicked
 */

class EasterEgg3D {
    constructor() {
        this.isActive = false;
        this.animationId = null;
        this.time = 0;
        this.mousePos = { x: 0, y: 0 };
        
        this.particles = [];
        this.waves = [];
        this.trails = [];
        
        this.colors = [
            '#ff006e', '#8338ec', '#3a86ff', '#06ffa5', 
            '#ffbe0b', '#fb5607', '#ff4081', '#00e676',
            '#ff5722', '#9c27b0', '#2196f3', '#4caf50'
        ];
        
        this.init();
    }

    init() {
        // Only initialize if explicitly called (lazy loading)
        // Auto-initialization removed for performance
    }

    setupTrigger() {
        const quoteElement = document.querySelector('.connect-quote');
        if (quoteElement) {
            quoteElement.style.cursor = 'pointer';
            quoteElement.style.userSelect = 'none';
            quoteElement.style.transition = 'all 0.3s ease';
            
            quoteElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.launch();
            });
        }
    }

    launch() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.createCanvas();
        this.initializeParticles();
        this.addEventListeners();
        this.animate();
    }

    createCanvas() {
        // Create overlay container
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, #000428 0%, #004e92 100%);
            z-index: 10000;
            cursor: crosshair;
            overflow: hidden;
        `;

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.cssText = `
            display: block;
            width: 100%;
            height: 100%;
        `;

        this.ctx = this.canvas.getContext('2d');
        this.overlay.appendChild(this.canvas);
        
        // Create exit button
        const exitBtn = document.createElement('div');
        exitBtn.innerHTML = '×';
        exitBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #fff;
            border-radius: 50%;
            color: #fff;
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10001;
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
            backdrop-filter: blur(10px);
        `;
        
        exitBtn.addEventListener('mouseenter', () => {
            exitBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            exitBtn.style.transform = 'scale(1.1)';
        });
        
        exitBtn.addEventListener('mouseleave', () => {
            exitBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            exitBtn.style.transform = 'scale(1)';
        });
        
        exitBtn.addEventListener('click', () => this.close());
        
        this.overlay.appendChild(exitBtn);
        document.body.appendChild(this.overlay);
        
        // Animate in
        this.overlay.style.opacity = '0';
        requestAnimationFrame(() => {
            this.overlay.style.transition = 'opacity 0.8s ease-out';
            this.overlay.style.opacity = '1';
        });
    }

    initializeParticles() {
        // Create floating particles throughout the space
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 300 - 150,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                vz: (Math.random() - 0.5) * 2,
                size: Math.random() * 8 + 3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                pulse: Math.random() * Math.PI * 2,
                life: 1.0
            });
        }
        
        // Create flowing waves
        for (let i = 0; i < 8; i++) {
            this.waves.push({
                x: (i / 8) * this.canvas.width,
                y: this.canvas.height / 2,
                amplitude: 50 + Math.random() * 100,
                frequency: 0.02 + Math.random() * 0.01,
                phase: Math.random() * Math.PI * 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speed: 0.05 + Math.random() * 0.03
            });
        }
    }

    addEventListeners() {
        // Mouse movement for 3D interaction
        this.overlay.addEventListener('mousemove', (e) => {
            this.mousePos.x = (e.clientX / this.canvas.width) * 2 - 1;
            this.mousePos.y = (e.clientY / this.canvas.height) * 2 - 1;
        });

        // Click to create color burst
        this.canvas.addEventListener('click', (e) => {
            this.createColorBurst(e.clientX, e.clientY);
        });

        // Escape key to close
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }
    
    createColorBurst(x, y) {
        // Create burst of colorful particles
        const burstColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        for (let i = 0; i < 25; i++) {
            const angle = (i / 25) * Math.PI * 2;
            const speed = Math.random() * 8 + 4;
            
            this.particles.push({
                x: x,
                y: y,
                z: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                vz: (Math.random() - 0.5) * 6,
                size: Math.random() * 12 + 8,
                color: burstColor,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                pulse: 0,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.01
            });
        }
        
        // Create expanding ring
        this.trails.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 150,
            color: burstColor,
            life: 1.0,
            decay: 0.015
        });
    }

    animate() {
        if (!this.isActive) return;
        
        this.time += 0.016;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw everything
        this.updateParticles();
        this.updateWaves();
        this.updateTrails();
        
        this.drawBackground();
        this.drawWaves();
        this.drawParticles();
        this.drawTrails();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawBackground() {
        // Dynamic background with moving gradients
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2 + Math.sin(this.time * 0.5) * 200,
            this.canvas.height / 2 + Math.cos(this.time * 0.3) * 150,
            0,
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.max(this.canvas.width, this.canvas.height)
        );
        
        gradient.addColorStop(0, 'rgba(0, 4, 40, 0.1)');
        gradient.addColorStop(0.5, 'rgba(0, 78, 146, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 4, 40, 0.1)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.z += particle.vz;
            
            // Update rotation and pulse
            particle.rotation += particle.rotationSpeed;
            particle.pulse += 0.1;
            
            // Mouse attraction
            const dx = this.mousePos.x * this.canvas.width / 2 - particle.x;
            const dy = this.mousePos.y * this.canvas.height / 2 - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200 * 0.1;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Boundary wrapping
            if (particle.x < -50) particle.x = this.canvas.width + 50;
            if (particle.x > this.canvas.width + 50) particle.x = -50;
            if (particle.y < -50) particle.y = this.canvas.height + 50;
            if (particle.y > this.canvas.height + 50) particle.y = -50;
            
            // Life cycle for burst particles
            if (particle.decay) {
                particle.life -= particle.decay;
                if (particle.life <= 0) {
                    this.particles.splice(index, 1);
                }
            }
        });
    }
    
    updateWaves() {
        this.waves.forEach(wave => {
            wave.phase += wave.speed;
        });
    }
    
    updateTrails() {
        this.trails.forEach((trail, index) => {
            trail.radius += 3;
            trail.life -= trail.decay;
            
            if (trail.life <= 0 || trail.radius > trail.maxRadius) {
                this.trails.splice(index, 1);
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            const x = particle.x + particle.z * 0.2;
            const y = particle.y + particle.z * 0.1;
            const size = particle.size * (1 + particle.z * 0.005) * (0.8 + Math.sin(particle.pulse) * 0.2);
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(particle.rotation);
            
            // Outer glow
            this.ctx.globalAlpha = (particle.life || 1) * 0.6;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = particle.color;
            this.ctx.fillRect(-size, -size, size * 2, size * 2);
            
            // Inner particle
            this.ctx.shadowBlur = 5;
            this.ctx.globalAlpha = particle.life || 1;
            this.ctx.fillRect(-size * 0.6, -size * 0.6, size * 1.2, size * 1.2);
            
            this.ctx.restore();
        });
    }
    
    drawWaves() {
        this.waves.forEach(wave => {
            this.ctx.save();
            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 3;
            this.ctx.globalAlpha = 0.3;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = wave.color;
            
            this.ctx.beginPath();
            for (let x = 0; x <= this.canvas.width; x += 5) {
                const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
            
            this.ctx.restore();
        });
    }
    
    drawTrails() {
        this.trails.forEach(trail => {
            this.ctx.save();
            this.ctx.strokeStyle = trail.color;
            this.ctx.lineWidth = 4;
            this.ctx.globalAlpha = trail.life * 0.5;
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = trail.color;
            
            this.ctx.beginPath();
            this.ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            this.ctx.restore();
        });
    }



    close() {
        if (!this.isActive) return;
        
        this.isActive = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.overlay) {
            this.overlay.style.transition = 'opacity 0.5s ease-out';
            this.overlay.style.opacity = '0';
            
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
            }, 500);
        }
        
        // Clean up
        this.particles = [];
        this.waves = [];
        this.trails = [];
        this.mousePos = { x: 0, y: 0 };
        this.time = 0;
    }
}

// Easter egg initialization moved to lazy loader
// No auto-initialization for performance 