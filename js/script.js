document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Menu ──
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');
  let menuOpen = false;

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;

      mobileMenu.style.maxHeight = menuOpen ? mobileMenu.scrollHeight + 'px' : '0';
      mobileMenu.style.borderTopColor = menuOpen ? '#f1f5f9' : 'transparent';

      bar1.style.transform = menuOpen ? 'translateY(7px) rotate(45deg)' : '';
      bar2.style.opacity   = menuOpen ? '0' : '1';
      bar3.style.transform = menuOpen ? 'translateY(-7px) rotate(-45deg)' : '';
    });
  }

  // ── Close menu on link click ──
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.style.maxHeight = '0';
      mobileMenu.style.borderTopColor = 'transparent';
      bar1.style.transform = '';
      bar2.style.opacity = '1';
      bar3.style.transform = '';
    });
  });

  // ── Scroll Spy ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mob-link');

  function updateActiveLink() {
    let currentSection = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

});


const ovEls = document.querySelectorAll('.overview-img, .overview-content');
const ovObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('opacity-0', '-translate-x-10', 'translate-x-10');
      e.target.classList.add('opacity-100', 'translate-x-0');
    }
  });
}, { threshold: 0.2 });
ovEls.forEach(el => ovObs.observe(el));

function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
      return;
    }
    el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

const statCards = document.querySelectorAll('.stat-card');
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('opacity-0', 'translate-y-9');
      e.target.classList.add('opacity-100', 'translate-y-0');
      const counter = e.target.querySelector('.counter');
      const target = parseInt(e.target.dataset.target);
      setTimeout(() => animateCounter(counter, target), 200);
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });

statCards.forEach(c => statObs.observe(c));


// Academic Programs — Scroll Entrance
const progCards = document.querySelectorAll('.prog-card');
const progObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('opacity-0', 'translate-y-8');
      e.target.classList.add('opacity-100', 'translate-y-0');
      progObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
progCards.forEach(c => progObs.observe(c));