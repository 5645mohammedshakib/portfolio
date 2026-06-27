/* ================================================================
   SCRIPT.JS — Mohammed Shakib Portfolio
   ================================================================ */

/* ── NAVBAR ── */
const navbar  = document.getElementById('navbar');
const burger  = document.getElementById('burger');
const mobNav  = document.getElementById('mobNav');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  navbar  && navbar.classList.toggle('scrolled', s > 40);
  backTop && backTop.classList.toggle('show', s > 500);
}, { passive: true });

burger && burger.addEventListener('click', () => {
  const open = mobNav.classList.toggle('open');
  burger.classList.toggle('open', open);
});

window.closeMob = () => {
  mobNav  && mobNav.classList.remove('open');
  burger  && burger.classList.remove('open');
};

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    const offset = window.innerWidth < 768 ? 60 : 74;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });
});

/* ── ACTIVE NAV LINK ── */
const navAs   = document.querySelectorAll('.nb-links a');
const sections = document.querySelectorAll('section[id], .hero[id]');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    navAs.forEach(a => {
      const active = a.getAttribute('href') === '#' + id;
      a.style.color        = active ? 'var(--gold-dk)' : '';
      a.style.borderBottomColor = active ? 'var(--gold)' : '';
    });
  });
}, { threshold: 0.3, rootMargin: '-50px 0px -40% 0px' }).observe && sections.forEach(s => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navAs.forEach(a => {
        const active = a.getAttribute('href') === '#' + e.target.id;
        a.style.color             = active ? 'var(--gold-dk)' : '';
        a.style.borderBottomColor = active ? 'var(--gold)'    : '';
      });
    });
  }, { threshold: 0.35, rootMargin: '-50px 0px -40% 0px' }).observe(s);
});

/* ── REVEAL ON SCROLL ── */
new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
  });
}, { threshold: 0.1 }).observe && (() => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ── SKILL BARS ── */
(() => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const w = e.target.getAttribute('data-w');
      e.target.style.width = w + '%';
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sb-fill').forEach(f => obs.observe(f));
})();

/* ── COUNTER ANIMATION ── */
function countUp(el, target, suffix) {
  let v = 0, step = Math.ceil(target / 40);
  const t = setInterval(() => {
    v = Math.min(v + step, target);
    el.textContent = v + suffix;
    if (v >= target) clearInterval(t);
  }, 30);
}
(() => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const txt = el.textContent.trim();
      if (txt === '∞' || txt === '100%') return;
      const num    = parseInt(txt);
      const suffix = txt.includes('+') ? '+' : txt.includes('%') ? '%' : '';
      if (!isNaN(num)) countUp(el, num, suffix);
      obs.unobserve(el);
    });
  }, { threshold: 0.8 });
  document.querySelectorAll('.sc-num, .sg-num').forEach(el => obs.observe(el));
})();

/* ── TICKER PAUSE ON HOVER ── */
document.querySelectorAll('.ticker-track').forEach(t => {
  t.addEventListener('mouseenter', () => t.style.animationPlayState = 'paused');
  t.addEventListener('mouseleave', () => t.style.animationPlayState = 'running');
});

/* ── HERO CARD PARALLAX (desktop) ── */
const avatarFrame = document.querySelector('.avatar-frame');
if (avatarFrame && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', ev => {
    const rx = (ev.clientX / window.innerWidth  - 0.5) * 9;
    const ry = (ev.clientY / window.innerHeight - 0.5) * 9;
    avatarFrame.style.transform = `perspective(800px) rotateY(${rx}deg) rotateX(${-ry}deg)`;
  });
  avatarFrame.addEventListener('mouseleave', () => {
    avatarFrame.style.transform = '';
  });
}

/* ── BACK TO TOP ── */
backTop && backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── CONTACT FORM ── */
window.sendMsg = function(e) {
  e.preventDefault();
  const btn = document.getElementById('cBtn');
  const msg = document.getElementById('cfMsg');
  const frm = document.getElementById('cForm');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  setTimeout(() => {
    if (msg) msg.textContent = '✦ Message sent! I\'ll reply shortly.';
    if (btn) { btn.disabled = false; btn.textContent = 'Send Message →'; }
    if (frm) frm.reset();
    setTimeout(() => { if (msg) msg.textContent = ''; }, 5000);
  }, 1500);
};

/* ── PROJECT CARDS HOVER LIFT ── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-3px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── MASTHEAD EMBLEM SUBTLE ROTATE ── */
const emblem = document.querySelector('.emblem-svg');
if (emblem) {
  let angle = 0;
  setInterval(() => {
    angle += 0.15;
    const inner = emblem.querySelector('circle[stroke-dasharray]');
    if (inner) inner.setAttribute('transform', `rotate(${angle}, 60, 60)`);
  }, 60);
}
