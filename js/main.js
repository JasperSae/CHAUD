const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const header = document.querySelector('.site-header');

// Active navigation underline on scroll (scrollspy)
const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]');
const sections = Array.from(navLinks).map(link => {
  const id = link.getAttribute('href').slice(1);
  return document.getElementById(id);
}).filter(Boolean);

function updateActiveNav() {
  const scrollPosition = window.scrollY + 150; // offset for fixed header
  let currentSection = null;

  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
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
  if (window.scrollY > window.innerHeight - 100) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
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
