const canvas = document.getElementById('attracting_circles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
}
window.addEventListener('resize', () => {
    resizeCanvas();
});
resizeCanvas();

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

document.querySelectorAll('.card-button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.portfolio-card');

        if (card.id === 'Animation') {
            document.getElementById('modal-titleAn').textContent = card.dataset.title;
            document.getElementById('modal-descriptionAn').textContent = card.dataset.description;
            openModal('animation-modal');
        } else {
            document.getElementById('modal-title').textContent = card.dataset.title;
            document.getElementById('modal-description').textContent = card.dataset.description;
            document.getElementById('modal-tools').textContent = card.dataset.tools;
            document.getElementById('modal-link').href = card.dataset.link;
            openModal('glass-panel');
        }
    });
});

document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        closeModal('glass-panel');
        closeModal('animation-modal');
    });
});

document.querySelectorAll('.glass-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal('glass-panel');
            closeModal('animation-modal');
        }
    });
});



class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = 2 + Math.random() * 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particlesCount = 100;
const particles = [];
for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    const maxDist = 220;
    for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.hypot(dx, dy);
            if (dist < maxDist) {
                const alpha = 1 - dist / maxDist;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    connectParticles();

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});