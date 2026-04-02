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



// Facilities Section — Scroll Entrance
const facilityCards = document.querySelectorAll('.facility-card');
const facilityObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('opacity-0', 'translate-y-10');
      e.target.classList.add('opacity-100', 'translate-y-0');
      facilityObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

facilityCards.forEach(c => facilityObs.observe(c));


  // Auto Slider
  const slider = document.getElementById('campusSlider');
  let scrollPos = 0;

  setInterval(() => {
    if (!slider) return;

    scrollPos += slider.clientWidth * 0.6;
    if (scrollPos >= slider.scrollWidth - slider.clientWidth) {
      scrollPos = 0;
    }

    slider.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
  }, 5000);

  // Scroll Animation
  const campusSlides = document.querySelectorAll('[data-campus-slide]');
  const campusObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('opacity-0', 'translate-y-8');
        e.target.classList.add('opacity-100', 'translate-y-0');
        campusObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });




  document.addEventListener('DOMContentLoaded', () => {
    // 1. Slider Logic
    const track = document.getElementById('tourTrack');
    const cards = document.querySelectorAll('.tour-card');
    const nextBtn = document.getElementById('tourNext');
    const prevBtn = document.getElementById('tourPrev');
    let currentIndex = 0;

    function updateSlider() {
      // يحرك المسار بنسبة مئوية بناءً على عدد البطاقات
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSlider();
    });

    // 2. Scroll Animation Logic
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-x-10', '-translate-x-10');
          entry.target.classList.add('opacity-100', 'translate-x-0');
        }
      });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.tour-video, .tour-slider');
    elementsToReveal.forEach(el => revealObserver.observe(el));
  });

  // Student Life Section — Scroll Entrance
const slCards = document.querySelectorAll('.sl-card');
const slObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('opacity-0', 'translate-y-8');
      e.target.classList.add('opacity-100', 'translate-y-0');
      slObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

slCards.forEach(c => slObs.observe(c));


// Latest News Section — Scroll Entrance
const newsCards = document.querySelectorAll('.news-card');
const newsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('opacity-0', 'translate-y-8');
      e.target.classList.add('opacity-100', 'translate-y-0');
      newsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
newsCards.forEach(c => newsObs.observe(c));


// Gallery Section — Scroll Entrance
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 80);
      galleryObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

galleryItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  galleryObs.observe(item);
});



// Call To Action Section — Scroll Entrance Animation
const ctaSection = document.querySelector('#admissions');
const ctaBadge = ctaSection?.querySelector('span');
const ctaTitle = ctaSection?.querySelector('h2');
const ctaDivider = ctaSection?.querySelector('.w-16');
const ctaText = ctaSection?.querySelector('p');
const ctaButtons = ctaSection?.querySelector('.flex.flex-col');

const ctaElements = [ctaBadge, ctaTitle, ctaDivider, ctaText, ctaButtons];

const ctaObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      ctaElements.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 120);
      });
      ctaObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

if (ctaSection) ctaObs.observe(ctaSection);


// Footer — Scroll Entrance Animation
const footerCols = document.querySelectorAll('footer .grid > div');

const footerObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      footerCols.forEach((col, i) => {
        col.style.opacity = '0';
        col.style.transform = 'translateY(20px)';
        col.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
          col.style.opacity = '1';
          col.style.transform = 'translateY(0)';
        }, i * 120);
      });
      footerObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

const footerGrid = document.querySelector('footer .grid');
if (footerGrid) footerObs.observe(footerGrid);