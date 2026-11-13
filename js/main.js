/* =========================================================
   Uttam Ladani — Portfolio interactions
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => window.innerWidth >= 1000;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- Intro ---------- */
  const markLoaded = () => requestAnimationFrame(() => {
    body.classList.add('loaded');
    document.querySelectorAll('.hero .rv').forEach(el => el.classList.add('in'));
  });
  if (document.readyState === 'complete') markLoaded();
  else window.addEventListener('load', markLoaded);
  setTimeout(markLoaded, 1800); // safety net if fonts/images are slow

  $$('.yr').forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------- Scenes: drive the travelling portrait + nav ---------- */
  const navMap = { home: null, about: 'about', work: 'work', journey: 'journey', orbit: 'toolkit', layers: 'toolkit', awards: 'awards', contact: 'contact' };
  const navLinks = $$('.nav-links a');
  const pill = $('.nav-pill');

  function movePill(link) {
    if (!pill) return;
    if (!link) { pill.style.opacity = '0'; return; }
    pill.style.opacity = '1';
    pill.style.width = link.offsetWidth + 'px';
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
  }

  function setScene(name) {
    if (body.dataset.scene === name) return;
    body.dataset.scene = name;
    const key = navMap[name];
    let active = null;
    navLinks.forEach(a => {
      const on = a.dataset.nav === key;
      a.classList.toggle('is-active', on);
      if (on) active = a;
    });
    movePill(active);
  }

  const sceneIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setScene(e.target.dataset.scene); });
  }, { rootMargin: '-50% 0px -50% 0px' });
  $$('[data-scene]').forEach(s => { if (s !== body) sceneIO.observe(s); });

  window.addEventListener('resize', () => movePill($('.nav-links a.is-active')));

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach(el => revealIO.observe(el));

  /* ---------- Contact red wipe ---------- */
  const contact = $('#contact');
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) contact.classList.add('in');
  }, { threshold: 0.25 }).observe(contact);

  /* ---------- Work: sticky project stepper ---------- */
  const work = $('#work');
  const projects = $$('.project');
  const curWrap = $('.w-cur');
  const curNum = $('.w-cur span');
  const bar = $('.w-bar i');
  let currentProject = 0;

  function showProject(i) {
    if (i === currentProject) return;
    projects.forEach((p, idx) => {
      p.classList.toggle('is-leaving', idx === currentProject);
      p.classList.toggle('is-active', idx === i);
    });
    setTimeout(() => projects.forEach((p, idx) => idx !== i && p.classList.remove('is-leaving')), 700);
    currentProject = i;
    curWrap.classList.add('flip');
    setTimeout(() => {
      curNum.textContent = String(i + 1).padStart(2, '0');
      curWrap.classList.remove('flip');
    }, 260);
  }

  function updateWork() {
    if (!isDesktop()) return;
    const r = work.getBoundingClientRect();
    const total = work.offsetHeight - window.innerHeight;
    const p = clamp(-r.top / total, 0, 1);
    bar.style.transform = `scaleX(${p})`;
    showProject(Math.min(projects.length - 1, Math.floor(p * projects.length)));
  }

  /* ---------- Journey: big outlined year follows the timeline ---------- */
  const yearEl = $('.j-year');
  const steps = $$('.j-step');
  let shownYear = yearEl.textContent, pendingYear = null;
  function updateJourney() {
    // current step = last step whose top has passed 55% of the viewport
    const line = window.innerHeight * .55;
    let cur = steps[0];
    steps.forEach(s => { if (s.getBoundingClientRect().top < line) cur = s; });
    steps.forEach(s => s.classList.toggle('is-current', s === cur));
    const y = cur.dataset.year;
    if (y === shownYear || y === pendingYear) return;
    pendingYear = y;
    yearEl.classList.add('swap');
    setTimeout(() => { yearEl.textContent = pendingYear; shownYear = pendingYear; pendingYear = null; yearEl.classList.remove('swap'); }, 260);
  }

  /* ---------- Toolkit: skills orbiting the portrait ---------- */
  const orbit = $('#toolkit');
  const field = $('.orbit-field');
  const pills = $$('.pill', field);
  const ringEls = $$('.orbit-rings i');
  const mPhoto = $('.orbit-mphoto');
  const RINGS = [
    { rx: .19, ry: .10, tilt: -9, speed: .00023 },
    { rx: .28, ry: .16, tilt: 6, speed: -.00016 },
    { rx: .37, ry: .22, tilt: -4, speed: .00011 },
  ];
  // spread pills evenly around their ring
  const perRing = [0, 0, 0];
  pills.forEach(p => perRing[+p.dataset.ring]++);
  const seen = [0, 0, 0];
  pills.forEach(p => {
    const r = +p.dataset.ring;
    p._phase = (seen[r]++ / perRing[r]) * Math.PI * 2 + r * .7;
  });

  let geo = null;
  function measureOrbit() {
    const w = orbit.clientWidth, h = orbit.clientHeight;
    if (isDesktop()) {
      geo = { cx: w * .5, cy: h * .6, sx: w, sy: h, mobile: false };
      ringEls.forEach((el, i) => {
        el.style.width = RINGS[i].rx * 2 * w + 'px';
        el.style.height = RINGS[i].ry * 2 * h + 'px';
        el.style.setProperty('--t', RINGS[i].tilt + 'deg');
      });
    } else {
      const pr = mPhoto.getBoundingClientRect(), or = orbit.getBoundingClientRect();
      geo = { cx: pr.left - or.left + pr.width / 2, cy: pr.top - or.top + pr.height * .38, sx: Math.min(w, 620) * 1.02, sy: pr.height * 2.3, mobile: true };
    }
  }

  let orbitVisible = false;
  new IntersectionObserver(([e]) => { orbitVisible = e.isIntersecting; }, { rootMargin: '100px' }).observe(orbit);

  function drawOrbit(t) {
    if (!geo) return;
    pills.forEach(p => {
      const R = RINGS[+p.dataset.ring];
      const a = p._phase + t * R.speed;
      const ex = Math.cos(a) * R.rx * geo.sx;
      const ey = Math.sin(a) * R.ry * geo.sy;
      const tr = R.tilt * Math.PI / 180;
      const x = geo.cx + ex * Math.cos(tr) - ey * Math.sin(tr);
      const y = geo.cy + ex * Math.sin(tr) + ey * Math.cos(tr);
      const depth = Math.sin(a); // -1 = behind, 1 = in front
      const scale = .8 + .2 * (depth + 1) / 2;
      p.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      p.style.zIndex = depth < -0.05 ? 0 : 3;
      p.style.opacity = depth < 0 ? (0.5 + 0.5 * (1 + depth)).toFixed(2) : 1;
    });
  }

  /* ---------- Count-up stats ---------- */
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, to = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pad = +(el.dataset.pad || 0);
      const fmt = v => { const s = v.toFixed(dec); return pad ? s.padStart(pad, '0') : s; };
      if (reduceMotion) { el.textContent = fmt(to); return; }
      const t0 = performance.now(), dur = 1400;
      const tick = now => {
        const k = clamp((now - t0) / dur, 0, 1), eased = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(to * eased);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---------- Custom cursor ---------- */
  const cursor = $('.cursor');
  const dot = $('.cursor-dot'), ring = $('.cursor-ring');
  let mx = -100, my = -100, rx = -100, ry = -100;
  const fine = window.matchMedia('(pointer: fine)').matches;
  if (fine) {
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.classList.add('is-on'); }, { passive: true });
    document.addEventListener('mouseover', e => cursor.classList.toggle('is-hover', !!e.target.closest('a, button, .layer, .stat, .cert')));
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('.menu-btn');
  const menu = $('.mobile-menu');
  const toggleMenu = open => {
    body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', !open);
  };
  menuBtn.addEventListener('click', () => toggleMenu(!body.classList.contains('menu-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Main loop ---------- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateWork(); updateJourney(); ticking = false; });
  }, { passive: true });

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { measureOrbit(); updateWork(); }, 120);
  });

  function loop(t) {
    if (orbitVisible || !geo) drawOrbit(reduceMotion ? 0 : t);
    if (fine) {
      rx += (mx - rx) * .18; ry += (my - ry) * .18;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
    }
    requestAnimationFrame(loop);
  }

  const start = () => { measureOrbit(); drawOrbit(0); updateWork(); updateJourney(); requestAnimationFrame(loop); };
  if (mPhoto && !mPhoto.complete) mPhoto.addEventListener('load', () => { measureOrbit(); }, { once: true });
  start();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measureOrbit(); movePill($('.nav-links a.is-active')); });
})();
