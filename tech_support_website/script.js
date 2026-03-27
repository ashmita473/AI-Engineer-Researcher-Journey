// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ===== CONTACT FORM VALIDATION =====
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('invalid');
  error.textContent = message;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('invalid');
  error.textContent = '';
}

function validateForm() {
  let valid = true;

  // Name
  const name = document.getElementById('name').value.trim();
  if (!name) {
    showError('name', 'nameError', 'Please enter your name.');
    valid = false;
  } else {
    clearError('name', 'nameError');
  }

  // Email
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('email', 'emailError', 'Please enter your email address.');
    valid = false;
  } else if (!emailPattern.test(email)) {
    showError('email', 'emailError', 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError('email', 'emailError');
  }

  // Service
  const service = document.getElementById('service').value;
  if (!service) {
    showError('service', 'serviceError', 'Please select a service.');
    valid = false;
  } else {
    clearError('service', 'serviceError');
  }

  // Message
  const message = document.getElementById('message').value.trim();
  if (!message) {
    showError('message', 'messageError', 'Please describe your issue.');
    valid = false;
  } else if (message.length < 20) {
    showError('message', 'messageError', 'Please provide a bit more detail (at least 20 characters).');
    valid = false;
  } else {
    clearError('message', 'messageError');
  }

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  successMsg.classList.remove('show');

  if (validateForm()) {
    // Simulate form submission
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      successMsg.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Support Request';
    }, 1200);
  }
});

// Clear errors on input
['name', 'email', 'service', 'message'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => clearError(id, `${id}Error`));
  el.addEventListener('change', () => clearError(id, `${id}Error`));
});

// ===== SMOOTH SCROLL ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--primary)'
          : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => observer.observe(section));
