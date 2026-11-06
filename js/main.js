/* ===================================================================
   MAIN APPLICATION SCRIPT
   Interactions, Cursor, Navigation, Filters, 3D Tilt, Clipboard & Form
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ================================================================
  // 1. CUSTOM CURSOR FOLLOWER
  // ================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');

  if (cursorDot && cursorGlow && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth lerp for outer glow
    function animateCursor() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;

      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactables = document.querySelectorAll('a, button, input, textarea, .glass-panel, .skill-card, .cert-card, .btn');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('hovered');
      });
    });
  }

  // ================================================================
  // 2. HEADER SCROLL & PROGRESS BAR
  // ================================================================
  const header = document.getElementById('header');
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // ================================================================
  // 3. SOUND TOGGLE BUTTON
  // ================================================================
  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn && window.soundFX) {
    const onIcon = soundToggleBtn.querySelector('.sound-on-icon');
    const offIcon = soundToggleBtn.querySelector('.sound-off-icon');

    soundToggleBtn.addEventListener('click', () => {
      const isEnabled = window.soundFX.toggle();
      if (isEnabled) {
        onIcon.classList.remove('hidden');
        offIcon.classList.add('hidden');
        window.soundFX.playClick();
      } else {
        onIcon.classList.add('hidden');
        offIcon.classList.remove('hidden');
      }
    });
  }

  // ================================================================
  // 4. MOBILE MENU DRAWER
  // ================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
      if (window.soundFX) window.soundFX.playClick();
    });

    // Close on navigation link click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // ================================================================
  // 5. SKILLS FILTERING
  // ================================================================
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      if (window.soundFX) window.soundFX.playClick();

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
          card.style.animation = 'fade-in 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ================================================================
  // 6. 3D CARD TILT EFFECT
  // ================================================================
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // ================================================================
  // 7. COPY TO CLIPBOARD HANDLERS
  // ================================================================
  // Copy Email Button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'tejasnikhil72@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyEmailText) copyEmailText.textContent = 'Copied!';
        copyEmailBtn.style.background = 'rgba(16, 185, 129, 0.2)';
        copyEmailBtn.style.borderColor = '#10b981';
        if (window.soundFX) window.soundFX.playSuccess();

        setTimeout(() => {
          if (copyEmailText) copyEmailText.textContent = 'Copy';
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      });
    });
  }

  // Copy Terminal Python Code Snippet
  const copyTerminalBtn = document.getElementById('copy-terminal-btn');
  if (copyTerminalBtn) {
    copyTerminalBtn.addEventListener('click', () => {
      const codeBlock = document.querySelector('.python-code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          const btnSpan = copyTerminalBtn.querySelector('span');
          if (btnSpan) btnSpan.textContent = 'Copied!';
          if (window.soundFX) window.soundFX.playSuccess();

          setTimeout(() => {
            if (btnSpan) btnSpan.textContent = 'Copy';
          }, 2000);
        });
      }
    });
  }

  // ================================================================
  // 8. INTERACTIVE CONTACT FORM SUBMISSION
  // ================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formToast = document.getElementById('form-toast');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('message').value.trim();

      const btnText = submitBtn.querySelector('.btn-text');
      const btnIcon = submitBtn.querySelector('.btn-icon');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');

      // Show sending state
      btnText.textContent = 'Transmitting...';
      btnIcon.classList.add('hidden');
      btnSpinner.classList.remove('hidden');
      submitBtn.disabled = true;

      if (window.soundFX) window.soundFX.playClick();

      setTimeout(() => {
        btnText.textContent = 'Transmitted!';
        btnSpinner.classList.add('hidden');
        btnIcon.classList.remove('hidden');

        if (formToast) {
          formToast.classList.remove('hidden');
        }

        if (window.soundFX) window.soundFX.playSuccess();

        // Also initiate mailto client dispatch
        const mailtoUrl = `mailto:tejasnikhil72@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Nikhil,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          btnText.textContent = 'Transmit Message';
          submitBtn.disabled = false;
        }, 3000);
      }, 900);
    });
  }

  // ================================================================
  // 9. STATS COUNTER ANIMATION
  // ================================================================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target'));
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          let current = 0;
          const steps = 40;
          const increment = target / steps;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current.toFixed(decimals);
          }, 30);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) observer.observe(statsStrip);
});
