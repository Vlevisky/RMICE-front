// --- Homepage Animations ---
document.addEventListener('DOMContentLoaded', () => {
  // Fade in logo and navbar
  const logo = document.querySelector('.home-logo');
  if (logo) {
    logo.style.opacity = 0;
    logo.style.transition = 'opacity 1s';
    setTimeout(() => { logo.style.opacity = 1; }, 100);
  }
  const navbar = document.querySelector('.home-navbar');
  if (navbar) {
    navbar.style.opacity = 0;
    navbar.style.transform = 'translateY(-30px)';
    navbar.style.transition = 'opacity 1s, transform 1s';
    setTimeout(() => {
      navbar.style.opacity = 1;
      navbar.style.transform = 'translateY(0)';
    }, 300);
  }

  // Fade in hero section
  const hero = document.querySelector('.home-hero');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transition = 'opacity 1.2s';
    setTimeout(() => { hero.style.opacity = 1; }, 500);
  }

  // Animate cards on scroll (staggered)
  const cards = document.querySelectorAll('.home-card1, .home-card2, .home-card3');
  const animateCards = () => {
    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setTimeout(() => {
          card.classList.add('animate__animated', 'animate__fadeInUp');
        }, idx * 150);
      }
    });
  };
  window.addEventListener('scroll', animateCards);
  animateCards();

  // Animate team section
  const team = document.querySelector('.home-team');
  if (team) {
    team.style.opacity = 0;
    team.style.transform = 'translateY(40px)';
    team.style.transition = 'opacity 1s, transform 1s';
    const showTeam = () => {
      const rect = team.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        team.style.opacity = 1;
        team.style.transform = 'translateY(0)';
        window.removeEventListener('scroll', showTeam);
      }
    };
    window.addEventListener('scroll', showTeam);
    showTeam();
  }

  // Animate footer
  const footer = document.querySelector('.home-footer');
  if (footer) {
    footer.style.opacity = 0;
    footer.style.transition = 'opacity 1s';
    setTimeout(() => { footer.style.opacity = 1; }, 1200);
  }
});

// --- Form Validation & Popup ---
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.home-form');
  if (!form) return;

  // Enable textarea for user input
  const textarea = form.querySelector('.home-textarea');
  if (textarea) textarea.removeAttribute('disabled');

  const nameInput = form.querySelector('.home-textinput1');
  const emailInput = form.querySelector('.home-textinput2');
  const submitBtn = form.querySelector('.secondary-button-button');

  // Helper: show error
  function showError(input, message) {
    let err = input.parentNode.querySelector('.form-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'form-error';
      err.style.color = 'red';
      err.style.fontSize = '0.9em';
      err.style.marginTop = '2px';
      input.parentNode.insertBefore(err, input.nextSibling);
    }
    err.textContent = message;
  }
  function clearError(input) {
    const err = input.parentNode.querySelector('.form-error');
    if (err) err.remove();
  }

  // Email regex
  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Popup utility
  function showPopup(message, isError = false) {
    let popup = document.createElement('div');
    popup.className = 'form-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = '#fff';
    popup.style.padding = '2em 2.5em';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
    popup.style.zIndex = 9999;
    popup.style.textAlign = 'center';
    popup.style.color = isError ? '#c00' : '#222';
    popup.innerHTML = message + '<br><button style="margin-top:1em;padding:0.5em 1.5em;border:none;background:#007bff;color:#fff;border-radius:5px;cursor:pointer;">OK</button>';
    document.body.appendChild(popup);
    popup.querySelector('button').onclick = () => popup.remove();
  }

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let valid = true;
    let errorMsg = '';

    // Name validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Por favor, insira seu nome.');
      errorMsg = 'Nome não preenchido.';
      valid = false;
    } else {
      clearError(nameInput);
    }

    // Email validation
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Por favor, insira seu email.');
      if (!errorMsg) errorMsg = 'Email não preenchido.';
      valid = false;
    } else if (!validEmail(emailInput.value.trim())) {
      showError(emailInput, 'Email inválido.');
      if (!errorMsg) errorMsg = 'Email inválido.';
      valid = false;
    } else {
      clearError(emailInput);
    }

    // Message validation
    if (!textarea.value.trim()) {
      showError(textarea, 'Por favor, escreva sua mensagem.');
      if (!errorMsg) errorMsg = 'Mensagem não preenchida.';
      valid = false;
    } else {
      clearError(textarea);
    }

    if (valid) {
      showPopup(
        `<strong>Obrigado pelo contato!</strong><br>
        <b>Nome:</b> ${nameInput.value.trim()}<br>
        <b>Email:</b> ${emailInput.value.trim()}<br>
        <b>Mensagem:</b> ${textarea.value.trim()}<br>
        <br>Entraremos em contato em breve.`
      );
      form.reset();
    } else {
      showPopup(`<strong>Erro ao enviar mensagem:</strong><br>${errorMsg}`, true);
    }
  });
});
