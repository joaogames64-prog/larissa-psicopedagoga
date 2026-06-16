/* ===================== SCROLL ANIMATIONS ===================== */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

/* ===================== HEADER SCROLL ===================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ===================== HAMBURGER MENU ===================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

/* ===================== SMOOTH SCROLL ===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===================== ACTIVE NAV LINK ===================== */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('#main-nav a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--primary)';
          link.style.background = 'var(--primary-light)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

/* ===================== HERO CARD INIT ===================== */
// Trigger hero elements immediately
setTimeout(() => {
  document.querySelectorAll('#inicio .fade-up, #inicio .fade-in').forEach(el => {
    el.classList.add('visible');
  });
}, 100);

/* ===================== CAROUSEL ===================== */
(function () {
  const track   = document.getElementById('carouselTrack');
  const prev    = document.getElementById('carouselPrev');
  const next    = document.getElementById('carouselNext');
  const dots    = document.querySelectorAll('.carousel-dot');
  const slides  = document.querySelectorAll('.carousel-slide');
  const total   = slides.length;
  let current   = 0;
  let autoTimer = null;
  const DELAY   = 3800; // ms between slides

  function goTo(index) {
    // bounds wrap
    current = (index + total) % total;

    // move track
    track.style.transform = `translateX(-${current * 100}%)`;

    // active class on slide (for subtle zoom)
    slides.forEach((s, i) => s.classList.toggle('active', i === current));

    // update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), DELAY);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  // Arrow buttons
  prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Dot buttons
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(parseInt(dot.dataset.index));
      startAuto();
    });
  });

  // Pause on hover
  const wrapper = document.querySelector('.carousel-wrapper');
  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);

  // Touch / swipe support
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  wrapper.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      stopAuto();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  // Init
  goTo(0);
  startAuto();
})();

/* ===================== TAGS "VER MAIS" ===================== */
(function () {
  const toggle = document.getElementById('sobreTagsToggle');
  const tagsContainer = document.getElementById('sobreTags');
  if (!toggle || !tagsContainer) return;

  toggle.addEventListener('click', () => {
    const expanded = tagsContainer.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', expanded);
    toggle.textContent = expanded ? '− ver menos' : '+ ver mais';
  });
})();
