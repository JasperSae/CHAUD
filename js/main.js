const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const header = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');

// Active navigation underline on scroll (scrollspy)
const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]');

function getSortedSections() {
  const uniqueIds = Array.from(new Set(Array.from(navLinks).map(link => link.getAttribute('href').slice(1))));
  return uniqueIds
    .map(id => document.getElementById(id))
    .filter(Boolean)
    .sort((a, b) => a.offsetTop - b.offsetTop);
}

function updateActiveNav() {
  const sections = getSortedSections();
  const scrollPosition = window.scrollY + 160; // offset for fixed header
  let currentSection = null;

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
    currentSection = sections[sections.length - 1];
  } else {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section;
        break;
      }
    }
  }

  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    if (currentSection && currentSection.id === id) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Header scroll state
  if (scrollY > window.innerHeight - 100) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }

  // Back to top button visibility (appears after scrolling past hero/first section)
  if (backToTop) {
    if (scrollY > 650) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  }

  updateActiveNav();
}, { passive: true });

// Run once on load
updateActiveNav();

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobileNav.classList.toggle('is-open', !open);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
    });
  });
}

// Merch Carousel Arrow Controls with Infinite Loop
const merchSlider = document.getElementById('merchSlider');
const merchPrev = document.querySelector('.merch-nav-prev');
const merchNext = document.querySelector('.merch-nav-next');

if (merchSlider && merchPrev && merchNext) {
  merchNext.addEventListener('click', () => {
    const firstCard = merchSlider.querySelector('.merch-card');
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 320;
    const maxScroll = merchSlider.scrollWidth - merchSlider.clientWidth;

    if (merchSlider.scrollLeft >= maxScroll - 15) {
      merchSlider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      merchSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });

  merchPrev.addEventListener('click', () => {
    const firstCard = merchSlider.querySelector('.merch-card');
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 320;
    const maxScroll = merchSlider.scrollWidth - merchSlider.clientWidth;

    if (merchSlider.scrollLeft <= 15) {
      merchSlider.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      merchSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  });
}
