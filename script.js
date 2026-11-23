// 1. Ano automático no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Menu mobile
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));

// 3. Brilho seguindo o cursor
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// 4. Animação de entrada ao rolar a página (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// 5. Efeito 3D sutil nos cards de projeto
document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// 6. Modo Edição Rápida no navegador
const editToggle = document.getElementById('edit-toggle');
const editableSlots = document.querySelectorAll('.editable-slot');
let isEditing = false;

editToggle.addEventListener('click', () => {
  isEditing = !isEditing;
  document.body.classList.toggle('editing-active', isEditing);
  editToggle.classList.toggle('active', isEditing);
  editToggle.textContent = isEditing ? '✓ Modo Edição: ON' : '✎ Modo Edição: OFF';
  editableSlots.forEach((slot) => {
    slot.contentEditable = isEditing;
  });
});

// 7. Copiar e-mail com notificação Toast
const copyBtn = document.getElementById('copy-email');
const toast = document.getElementById('toast');

copyBtn.addEventListener('click', () => {
  const textToCopy = copyBtn.innerText.replace('✉', '').trim() || copyBtn.dataset.email;
  navigator.clipboard.writeText(textToCopy);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
});

// 8. Fundo de partículas tecnológicas conectadas (Canvas)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.radius = Math.random() * 1.6 + 0.6;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.min(65, Math.floor((canvas.width * canvas.height) / 18000));
  particles = Array.from({ length: count }, () => new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 135) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.14 * (1 - dist / 135)})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();



// 9. Controle da Foto de Perfil (exibe automaticamente se houver src ou via clique para teste)
const profileImg = document.getElementById('profile-img');
const photoPlaceholder = document.getElementById('photo-placeholder');
const photoUpload = document.getElementById('photo-upload');

function showProfileImage() {
  if (profileImg.getAttribute('src')) {
    profileImg.classList.add('loaded');
    photoPlaceholder.style.display = 'none';
  }
}

// Verifica se você já colocou uma foto no atributo src="" do HTML
showProfileImage();
profileImg.addEventListener('load', showProfileImage);

// Permite clicar no quadro para pré-visualizar uma foto do computador
photoPlaceholder.addEventListener('click', () => photoUpload.click());

photoUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    profileImg.src = URL.createObjectURL(file);
    showProfileImage();
  }
});