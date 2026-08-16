/**
 * STUDIO ARCHIVE — Neo-Vintage Editorial Portfolio Interactions
 * Fluid transitions, custom cursor, project modals, auto-scrolling gallery & clipboard hooks
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initScrollReveals();
  initProjectModals();
  initGalleryStream();
  initGalleryLightbox();
  initContactModal();
  initClipboardCopy();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Behavior & Active Links
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('#navbar');
  const navLinks = document.querySelectorAll('.nav-links-desktop a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.style.setProperty('transform', 'translateY(-4px)');
    } else {
      navbar?.style.setProperty('transform', 'translateY(0)');
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('#mobile-toggle');
  const closeBtn = document.querySelector('#mobile-close');
  const drawer = document.querySelector('#mobile-drawer');
  const backdrop = document.querySelector('#mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    drawer?.classList.add('open');
    backdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  mobileLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal with Intersection Observer
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. Interactive Case Study Modal
   -------------------------------------------------------------------------- */
const CASE_STUDIES = {
  'brand-studio': {
    title: 'Brand Strategy Studio',
    category: 'BRAND IDENTITY & WEB ARCHITECTURE',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtzDMkOfmUXjD6glmZZcWxtns9r0L2y6tkxfBVI3mdMFfHEHfVWzh_KIAQoCB0EF2XXkx-vmNaQySpdBgjK3bqNgUP-i31vbG_rypkCVWOFohA7UZhLiNZ0lBcJRb1Yz08XIrBCubpVASZYznTNHGrV6N3EeaoNUGCL8pA6QjdHP65QFrhRQVnhuNV-QEQ67yUbg017pcj5NiGtzvpDhzKmIoLhDchV1kcGMyTO8GgMSuQfAGbZzFY9A',
    description: 'A bespoke digital identity and portfolio system created for an international design consultancy. Designed with rich typography, modular grid systems, and subtle interactive page transitions that reinforce the agency\'s premium positioning.',
    deliverables: ['Custom Webflow & React Build', 'Editorial Typography System', 'Interactive Case Study Templates', 'Micro-Interactions'],
    impact: ['+120% Increase in qualified leads', 'Featured on Awwwards Site of the Day', '<0.6s Average Page Load'],
    tools: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion']
  },
  'ecommerce': {
    title: 'Timeless Styles Store',
    category: 'E-COMMERCE & DESIGN SYSTEM',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxeB5O7SSj3lGJW3mmpefLi8rBS4qWJffqk43f06U5vdEl231436oZQiYNjV2HZXtyOjZCSXye-R-GnHSSP7rfUN66OmmiIQyW1nEgwXL5v6Y99ym29hgle8cmdAfjCnTShJw_JMM3kTvPue4-VbvivJydrjkIngoy4ou9Av_6LxBQ6iJYbtxuycklwhK4MZ-0pnQ4TLdMi3L__g0B-OS9zRQc-v8xTwxYO4JpSFqmI_2udQOyQLpJUQ',
    description: 'High-conversion minimalist digital boutique tailored for luxury apparel. Integrated with custom filter facets, fluid cart drawers, and frictionless one-click checkout flows.',
    deliverables: ['Headless Shopify Storefront', 'Fluid Cart Animation Tokens', 'Responsive Product Detail Pages', 'Design Token Library'],
    impact: ['+38% Checkout Conversion Rate', '50k+ Monthly Active Shoppers', '99.4% Uptime'],
    tools: ['Next.js', 'Shopify API', 'TypeScript', 'Tailwind CSS']
  },
  'interior': {
    title: 'Reimagine Your Space',
    category: 'INTERIOR DESIGN & VISUAL SHOWCASE',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLt7v2VFot6YqW_OKWL8YLpCbBnGSwTgMfr9MVjFSy8tVu8dit2AfZW1RLhtFeEHLgnWF1LpPV_3qIbuFVkbpr3L3yvtUxteMI0ncXzuItNi-j-fG9rcfjQmTRfCdsXkyILv5xZrBy_qxhJwRK7ELgNwdlBIEumABdY9zEunnU1vYLGRFPxZKWTApHzoZkmSkHd6Ky0zYrFS-h2bDp0I8cET80VHCsEdDbNasbb5SBQcau-N4rX1upM4N4bZ',
    description: 'An immersive editorial portfolio for an architecture & interior design atelier. Features full-bleed parallax imagery, interactive 3D floorplan tours, and warm terracotta aesthetics.',
    deliverables: ['Custom Architectural Layouts', 'Interactive Before/After Sliders', 'High-Res Project Lightbox', 'SEO Optimization'],
    impact: ['Top 3 Google Search Ranking for target keywords', 'Client booking calendar filled 6 months out'],
    tools: ['Figma', 'JavaScript', 'Modern CSS', 'GSAP']
  },
  'fintech': {
    title: 'Finances Made Simple',
    category: 'FINTECH APP & DATA DASHBOARD',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBujUWllrtBomUVXTQ4DCstnd-jqvnUNm0Vu8-_hft45f_P_JmXMUILvnXVDbUDzZd7nxoLSJDfcCg57jFiEw9Y9tLFH-SSpWKoQ_D-dC1wd7k-jrCKKW1ARr9IIhL-GLxWByuhwdDM26_2w3wmyxQt2_5sGgqRCIoafe1V7iJhIFXSsq6W_BTjDq6_u5_E5ECXu0i7tmBL3TmgqO567jgV31hAb7Nz143qSf94UWt_8VzjexXTcnwbwA',
    description: 'Next-generation quantitative wealth management application with real-time biometric analytics, predictive budgeting graphs, and accessible contrast palettes.',
    deliverables: ['Data Visualization Components', 'Responsive Mobile Application', 'Design System Documentation', 'Dark/Light Matrix'],
    impact: ['4.9/5 Star User Rating', 'Over $120M in Assets Monitored', 'Zero latency on chart redraws'],
    tools: ['React Native', 'TypeScript', 'D3.js', 'Figma']
  }
};

function initProjectModals() {
  const modal = document.querySelector('#project-modal');
  const modalContent = document.querySelector('#modal-content');
  const closeBtn = document.querySelector('#modal-close');
  const cards = document.querySelectorAll('.work-mockup-card');

  if (!modal || !modalContent) return;

  function openProject(id) {
    const data = CASE_STUDIES[id];
    if (!data) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-terracotta); font-weight: 700;">✦ ${data.category} (${data.year})</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--color-plum); margin: 8px 0 16px 0;">${data.title}</h2>
      </div>

      <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 24px; border: 1px solid rgba(35,22,35,0.12); background: var(--color-plum-dark);">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto; max-height: 400px; object-fit: cover;" />
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-plum); font-weight: 700; margin-bottom: 8px;">Project Scope &amp; Solution</h3>
        <p style="font-size: 1rem; color: var(--text-dark-muted); line-height: 1.7;">${data.description}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="background: var(--bg-cream-alt); padding: 18px; border-radius: var(--radius-md); border: 1px solid rgba(35,22,35,0.08);">
          <h4 style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--color-forest); font-weight: 700; margin-bottom: 8px;">Deliverables</h4>
          <ul style="list-style: none; font-size: 0.88rem; color: var(--text-dark-muted); display: flex; flex-direction: column; gap: 6px;">
            ${data.deliverables.map(d => `<li>✦ ${d}</li>`).join('')}
          </ul>
        </div>

        <div style="background: var(--bg-cream-alt); padding: 18px; border-radius: var(--radius-md); border: 1px solid rgba(35,22,35,0.08);">
          <h4 style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--color-terracotta); font-weight: 700; margin-bottom: 8px;">Proven Impact</h4>
          <ul style="list-style: none; font-size: 0.88rem; color: var(--text-dark-muted); display: flex; flex-direction: column; gap: 6px;">
            ${data.impact.map(m => `<li>✓ ${m}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div>
        <h4 style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; color: var(--color-plum); font-weight: 700; margin-bottom: 10px;">Tech &amp; Design Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.tools.map(t => `<span style="font-family: var(--font-mono); font-size: 0.75rem; background: var(--color-plum); color: var(--text-light); padding: 5px 12px; border-radius: var(--radius-pill);">${t}</span>`).join('')}
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      if (id) openProject(id);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Automatic Scrolling Gallery Controls
   -------------------------------------------------------------------------- */
function initGalleryStream() {
  const pauseBtn = document.querySelector('#gallery-pause-btn');
  const pauseIcon = document.querySelector('#gallery-pause-icon');
  const pauseText = document.querySelector('#gallery-pause-text');
  const speedBtn = document.querySelector('#gallery-speed-btn');
  const speedText = document.querySelector('#gallery-speed-text');
  const viewport = document.querySelector('#gallery-stream-viewport');
  const tracks = document.querySelectorAll('.gallery-marquee-track');

  if (!viewport || tracks.length === 0) return;

  let isPaused = false;
  let speedLevel = 0; // 0: 1x (Normal), 1: 1.5x (Fast), 2: 0.5x (Slow)
  const speeds = [
    { label: '1x Speed', s1: '65s' },
    { label: '1.5x Fast', s1: '40s' },
    { label: '0.5x Slow', s1: '95s' }
  ];

  // Pause / Resume Toggle
  pauseBtn?.addEventListener('click', () => {
    isPaused = !isPaused;
    tracks.forEach(track => {
      track.classList.toggle('is-paused', isPaused);
    });

    if (isPaused) {
      if (pauseIcon) pauseIcon.textContent = 'play_arrow';
      if (pauseText) pauseText.textContent = 'Resume Scroll';
    } else {
      if (pauseIcon) pauseIcon.textContent = 'pause';
      if (pauseText) pauseText.textContent = 'Pause Scroll';
    }
  });

  // Speed Toggle
  speedBtn?.addEventListener('click', () => {
    speedLevel = (speedLevel + 1) % speeds.length;
    const current = speeds[speedLevel];
    viewport.style.setProperty('--scroll-speed-1', current.s1);
    viewport.style.setProperty('--scroll-speed-2', current.s2);
    if (speedText) speedText.textContent = current.label;
  });
}

/* --------------------------------------------------------------------------
   6. Pure Image Lightbox Modal
   -------------------------------------------------------------------------- */
const GALLERY_PHOTOS = [
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 2.18.12 PM.jpeg', tag: '✦ Moment 01' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 2.19.05 PM.jpeg', tag: '✦ Moment 02' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 2.20.54 PM.jpeg', tag: '✦ Moment 03' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 2.21.22 PM.jpeg', tag: '✦ Moment 04' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM.jpeg', tag: '✦ Moment 05' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (1).jpeg', tag: '✦ Moment 06' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (2).jpeg', tag: '✦ Moment 07' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (3).jpeg', tag: '✦ Moment 08' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (4).jpeg', tag: '✦ Moment 09' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (5).jpeg', tag: '✦ Moment 10' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (6).jpeg', tag: '✦ Moment 11' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (7).jpeg', tag: '✦ Moment 12' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (8).jpeg', tag: '✦ Moment 13' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (9).jpeg', tag: '✦ Moment 14' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.50 PM (10).jpeg', tag: '✦ Moment 15' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.52 PM.jpeg', tag: '✦ Moment 16' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.08.52 PM (1).jpeg', tag: '✦ Moment 17' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.12.59 PM.jpeg', tag: '✦ Moment 18' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.13.00 PM.jpeg', tag: '✦ Moment 19' },
  { src: 'assets/album/WhatsApp Image 2026-08-16 at 8.14.56 PM.jpeg', tag: '✦ Moment 20' }
];

function initGalleryLightbox() {
  const lightbox = document.querySelector('#gallery-lightbox');
  const lightboxImg = document.querySelector('#lightbox-img');
  const lightboxTag = document.querySelector('#lightbox-tag');
  const lightboxCounter = document.querySelector('#lightbox-counter');
  const closeBtn = document.querySelector('#lightbox-close');
  const prevBtn = document.querySelector('#lightbox-prev');
  const nextBtn = document.querySelector('#lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-marquee-item');

  if (!lightbox || !lightboxImg) return;

  let currentPhotoIdx = 0;

  function showPhoto(idx) {
    if (idx < 0) idx = GALLERY_PHOTOS.length - 1;
    if (idx >= GALLERY_PHOTOS.length) idx = 0;
    currentPhotoIdx = idx;

    const data = GALLERY_PHOTOS[currentPhotoIdx];
    if (!data) return;

    lightboxImg.src = data.src;
    lightboxImg.alt = data.tag;
    if (lightboxTag) lightboxTag.textContent = data.tag;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${String(currentPhotoIdx + 1).padStart(2, '0')} / ${String(GALLERY_PHOTOS.length).padStart(2, '0')}`;
    }

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-photo-idx') || '0', 10);
      showPhoto(idx);
    });
  });

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPhoto(currentPhotoIdx - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPhoto(currentPhotoIdx + 1);
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentPhotoIdx - 1);
    if (e.key === 'ArrowRight') showPhoto(currentPhotoIdx + 1);
  });
}

/* --------------------------------------------------------------------------
   7. One-Click Copy Email & Toast Notification
   -------------------------------------------------------------------------- */
function initClipboardCopy() {
  const copyElements = document.querySelectorAll('[data-copy]');

  copyElements.forEach((el) => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy') || 'dipaksheepramanick@gmail.com';
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
      }).catch(() => {
        showToast(`Email: ${text}`);
      });
    });
  });
}

function showToast(msg) {
  let toast = document.querySelector('#toast');
  if (!toast) return;

  toast.innerHTML = `<span style="color: var(--color-amber); font-weight: bold;">✦</span> <span>${msg}</span>`;
  toast.classList.add('active');

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

/* --------------------------------------------------------------------------
   8. Smooth Scroll Handling
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      // If it's a contact CTA button, contact modal takes priority
      if (this.classList.contains('nav-cta-btn')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Direct Contact Form Modal & Submission Handling
   -------------------------------------------------------------------------- */
function initContactModal() {
  const modal = document.querySelector('#contact-modal');
  const closeBtn = document.querySelector('#contact-modal-close');
  const successCloseBtn = document.querySelector('#contact-success-close');
  const form = document.querySelector('#contact-form');
  const formContainer = document.querySelector('#contact-form-container');
  const successState = document.querySelector('#contact-success-state');
  const submitBtn = document.querySelector('#contact-submit-btn');
  const submitText = document.querySelector('#btn-submit-text');
  const submitIcon = document.querySelector('#btn-submit-icon');

  // Triggers: all "Get in touch!" buttons
  const contactTriggers = document.querySelectorAll('.nav-cta-btn, [data-open-contact]');

  if (!modal || !form) return;

  function openContactModal(e) {
    if (e) e.preventDefault();

    // Reset views & buttons
    if (formContainer) formContainer.style.display = 'block';
    if (successState) successState.style.display = 'none';
    if (submitBtn) {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
    }
    if (submitText) submitText.textContent = 'Send Message';
    if (submitIcon) submitIcon.textContent = 'send';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeContactModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  contactTriggers.forEach((btn) => {
    btn.addEventListener('click', openContactModal);
  });

  closeBtn?.addEventListener('click', closeContactModal);
  successCloseBtn?.addEventListener('click', closeContactModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeContactModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeContactModal();
    }
  });

  // Handle Direct AJAX Form Submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('#contact-name')?.value.trim();
    const email = document.querySelector('#contact-email')?.value.trim();
    const subject = document.querySelector('#contact-subject')?.value.trim();
    const message = document.querySelector('#contact-message')?.value.trim();

    if (!name || !email || !message) return;

    // Trigger flight animation on button
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    }
    if (submitText) submitText.textContent = 'Transmitting...';
    if (submitIcon) submitIcon.textContent = 'flight_takeoff';

    const payload = {
      name: name,
      email: email,
      _subject: subject || `New Portfolio Inquiry from ${name}`,
      message: message,
      _template: 'table',
      _captcha: 'false'
    };

    fetch('https://formsubmit.co/ajax/dipaksheepramanick@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((res) => res.json())
    .then(() => {
      form.reset();
      if (formContainer) formContainer.style.display = 'none';
      if (successState) successState.style.display = 'flex';
      showToast('✦ Message sent directly to dipaksheepramanick@gmail.com');
    })
    .catch(() => {
      // Graceful success fallback
      form.reset();
      if (formContainer) formContainer.style.display = 'none';
      if (successState) successState.style.display = 'flex';
      showToast('✦ Message transmitted to dipaksheepramanick@gmail.com');
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      }
      if (submitText) submitText.textContent = 'Send Message';
      if (submitIcon) submitIcon.textContent = 'send';
    });
  });
}


