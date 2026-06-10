document.addEventListener('DOMContentLoaded', () => {

  // ==================== CURSOR GLOW ====================
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      // Set variables for radial gradient positioning
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    });
  }

  // ==================== FLOATING PARTICLES ====================
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer);
    }
  }

  function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize size, position, and duration
    const size = Math.random() * 5 + 2; // 2px to 7px
    const left = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 15 + 10; // 10s to 25s
    const delay = Math.random() * -20; // negative delay so particles start spread out
    const opacity = Math.random() * 0.15 + 0.05;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.opacity = opacity;
    particle.style.bottom = `-10px`;
    
    // Add custom keyframe animation inline to float upwards
    particle.style.animation = `floatUp ${duration}s linear infinite`;
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
  }

  // Add keyframe dynamic injection for particles
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: var(--active-opacity, 0.15);
      }
      90% {
        opacity: var(--active-opacity, 0.15);
      }
      100% {
        transform: translateY(-105vh) translateX(50px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);


  // ==================== NAVBAR SCROLL EFFECT ====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ==================== MOBILE TOGGLE MENU ====================
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.textContent = '☰';
      });
    });
  }


  // ==================== SCROLL REVEAL ANIMATION ====================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ==================== STATS AUTO-COUNTER ====================
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(num => counterObserver.observe(num));

  function animateCounter(element, target) {
    let count = 0;
    const duration = 2000; // 2 seconds
    const interval = Math.floor(duration / target);
    
    const timer = setInterval(() => {
      count++;
      if (count > target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = count;
      }
    }, Math.max(interval, 30));
  }


  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a:not(.nav-resume)');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  });


  // ==================== CONTACT FORM HANDLER ====================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Select button and change state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      
      // Simulate API call
      setTimeout(() => {
        // Show success animation state
        contactForm.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; animation: fadeIn 0.8s forwards;">
            <div style="font-size: 4rem; margin-bottom: 20px;">✉️</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--accent-cyan);">Message Sent Successfully!</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">Thank you, ${nameInput.value}. I'll get back to you at ${emailInput.value} as soon as possible.</p>
            <button onclick="window.location.reload();" class="btn-outline" style="padding: 10px 20px; font-size: 0.9rem;">Send Another Message</button>
          </div>
        `;
      }, 1500);
    });
  }

});
