/* msy-designs — Interaktionen
   Vanilla JS, keine externen Abhängigkeiten (DSGVO-konform). */
(function () {
  'use strict';

  /* =========================================================
     KONFIGURATION
     - email:    Hier landen alle Anfragen (Standard: E-Mail-Programm öffnet sich).
     - formspree: Optional. Tragen Sie hier Ihre Formspree-URL ein
                  (z. B. 'https://formspree.io/f/xxxxxxxx'), damit Anfragen
                  OHNE E-Mail-Programm direkt an Sie gesendet werden.
     ========================================================= */
  var CONFIG = {
    email: 'msywebdesign@gmail.com',
    formspree: 'https://formspree.io/f/xaqgbjvp'
  };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme-Umschalter (Hell/Dunkel) ---------- */
  var themeBtn = document.getElementById('themeToggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    if (themeBtn) themeBtn.setAttribute('aria-checked', t === 'dark' ? 'true' : 'false');
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#0e0f13' : '#f6f5f2');
  }
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch (e) {}
      applyTheme(next);
    });
  }
  // Systemwechsel folgen, solange der Nutzer noch nicht selbst gewählt hat
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var stored = null;
      try { stored = localStorage.getItem('theme'); } catch (err) {}
      if (stored !== 'dark' && stored !== 'light') applyTheme(e.matches ? 'dark' : 'light');
    });
  } catch (e) {}

  /* ---------- Jahr im Footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile-Navigation ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var closeNav = function (restoreFocus) {
    if (!nav || !nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    if (restoreFocus) toggle.focus();
  };
  if (nav && toggle) {
    var firstLink = nav.querySelector('a');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      if (open && firstLink) firstLink.focus();
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeNav(false); });
    });
  }

  /* ---------- Hero: animierte Background Paths (nach Vorbild kokonutd) ---------- */
  var heroPaths = document.querySelector('.hero-paths');
  if (heroPaths) {
    var SVG_NS = 'http://www.w3.org/2000/svg';
    var buildPathSet = function (position) {
      var svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('viewBox', '0 0 696 316');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
      svg.setAttribute('aria-hidden', 'true');
      for (var i = 0; i < 36; i++) {
        var x1 = 380 - i * 5 * position;
        var y1 = 189 + i * 6;
        var x2 = 312 - i * 5 * position;
        var x3 = 152 - i * 5 * position;
        var y3 = 343 - i * 6;
        var x4 = 616 - i * 5 * position;
        var y4 = 470 - i * 6;
        var x5 = 684 - i * 5 * position;
        var y5 = 875 - i * 6;
        var d = 'M-' + x1 + ' -' + y1 +
                'C-' + x1 + ' -' + y1 +
                ' -' + x2 + ' ' + y3 +
                ' ' + x3 + ' ' + y3 +
                'C' + x4 + ' ' + y4 +
                ' ' + x5 + ' ' + y5 +
                ' ' + x5 + ' ' + y5;
        var p = document.createElementNS(SVG_NS, 'path');
        p.setAttribute('d', d);
        p.setAttribute('class', 'hero-path');
        p.setAttribute('pathLength', '1');
        p.setAttribute('stroke-width', (0.5 + i * 0.03).toFixed(2));
        p.setAttribute('stroke-opacity', (0.05 + i * 0.013).toFixed(3));
        // variierende Dauer & Versatz -> organischer Fluss, ohne Math.random-Flimmern
        p.style.animationDuration = (16 + (i % 9) * 2) + 's';
        p.style.animationDelay = '-' + (i * 0.6).toFixed(1) + 's';
        if (position < 0) { p.style.animationDirection = 'reverse'; }
        svg.appendChild(p);
      }
      return svg;
    };
    heroPaths.appendChild(buildPathSet(1));
    heroPaths.appendChild(buildPathSet(-1));
  }

  /* ---------- Sticky-Header Zustand ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll-Reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* =========================================================
     MODAL-SYSTEM
     ========================================================= */
  var openModalEl = null;
  var lastFocused = null;
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function openModal(id, pkg) {
    var modal = document.getElementById(id);
    if (!modal) return;
    lastFocused = document.activeElement;

    var form = modal.querySelector('form');
    if (form) form.classList.remove('is-sent');

    // Paket in verstecktes Feld + Untertitel übernehmen
    if (pkg) {
      var hidden = modal.querySelector('input[name="paket"]');
      if (hidden) hidden.value = pkg;
      var label = modal.querySelector('[data-package-label]');
      if (label && pkg !== 'Allgemeine Anfrage') {
        label.textContent = 'Ihr Interesse: ' + pkg + '. Erzählen Sie kurz von Ihrem Vorhaben – ich melde mich persönlich bei Ihnen.';
      }
    }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    openModalEl = modal;

    var first = modal.querySelector(FOCUSABLE);
    if (first) {
      // erstes echtes Eingabefeld bevorzugen (nicht der Schließen-Button)
      var firstField = modal.querySelector('input:not([type="hidden"]):not([tabindex="-1"]), select, textarea');
      (firstField || first).focus();
    }
  }

  function closeModal() {
    if (!openModalEl) return;
    openModalEl.hidden = true;
    openModalEl = null;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  // Öffner-Buttons (data-open="modal-id" data-package="…")
  document.querySelectorAll('[data-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-open'), btn.getAttribute('data-package'));
    });
  });

  // Schließen via Backdrop / Schließen-Button (data-close)
  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  /* ---------- Tastatur: ESC schließt, Tab bleibt im Modal ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (openModalEl) { closeModal(); return; }
      closeNav(true);
      return;
    }
    if (e.key === 'Tab' && openModalEl) {
      var nodes = Array.prototype.slice.call(openModalEl.querySelectorAll(FOCUSABLE))
        .filter(function (n) { return n.offsetParent !== null; });
      if (!nodes.length) return;
      var firstN = nodes[0], lastN = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstN) { e.preventDefault(); lastN.focus(); }
      else if (!e.shiftKey && document.activeElement === lastN) { e.preventDefault(); firstN.focus(); }
    }
  });

  /* =========================================================
     TERMIN-MODAL: Datum & Uhrzeit
     ========================================================= */
  var dateEl = document.getElementById('t-date');
  if (dateEl) {
    var now = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    dateEl.min = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  }
  var timeSel = document.getElementById('t-time');
  var customWrap = document.getElementById('customTimeWrap');
  var customInput = document.getElementById('t-time-custom');
  if (timeSel && customWrap) {
    timeSel.addEventListener('change', function () {
      var isCustom = timeSel.value === 'Andere Uhrzeit';
      customWrap.hidden = !isCustom;
      if (customInput) {
        if (isCustom) { customInput.setAttribute('required', 'required'); customInput.focus(); }
        else { customInput.removeAttribute('required'); }
      }
    });
  }

  /* =========================================================
     FORMULAR-VERSAND (mailto-Standard, optional Formspree)
     ========================================================= */
  function val(form, name) {
    var el = form.elements[name];
    return (el && el.value ? el.value : '').trim();
  }

  function markSent(form, mode) {
    var box = form.querySelector('.form-success');
    if (box && mode === 'fetch') {
      var h = box.querySelector('h3'), p = box.querySelector('p');
      if (h) h.textContent = 'Danke für Ihre Anfrage!';
      if (p) p.textContent = 'Ich habe Ihre Nachricht erhalten und melde mich zeitnah persönlich bei Ihnen.';
    }
    form.classList.add('is-sent');
  }

  function showError(form) {
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = false; }
    var err = form.querySelector('.form-error');
    if (!err && btn) {
      err = document.createElement('p');
      err.className = 'form-error';
      err.setAttribute('role', 'alert');
      btn.parentNode.insertBefore(err, btn.nextSibling);
    }
    if (err) {
      err.innerHTML = 'Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie direkt an <a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a>.';
    }
  }

  function send(form, subject, body) {
    var existing = form.querySelector('.form-error');
    if (existing) existing.remove();

    if (CONFIG.formspree) {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; }
      var fd = new FormData(form);
      if (subject) fd.append('_subject', subject);
      fetch(CONFIG.formspree, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) { markSent(form, 'fetch'); if (btn) btn.disabled = false; }
        else { showError(form); }
      }).catch(function () { showError(form); });
    } else {
      window.location.href = 'mailto:' + CONFIG.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      markSent(form, 'mailto');
    }
  }

  function bindForm(id, build) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var honey = form.querySelector('[name="_gotcha"]');
      if (honey && honey.value) return; // Bot -> still abbrechen
      if (!form.reportValidity()) return;
      var data = build(form);
      send(form, data.subject, data.body);
    });
  }

  // Angebot anfragen
  bindForm('formAnfrage', function (form) {
    var paket = val(form, 'paket') || 'Allgemeine Anfrage';
    return {
      subject: 'Anfrage über msy-designs – ' + paket,
      body:
        'Neue Anfrage über msy-designs.de\n\n' +
        'Paket / Interesse: ' + paket + '\n' +
        'E-Mail: ' + val(form, 'email') + '\n' +
        'Telefon: ' + val(form, 'telefon') + '\n\n' +
        'Nachricht:\n' + val(form, 'nachricht') + '\n'
    };
  });

  // Termin buchen
  bindForm('formTermin', function (form) {
    var uhrzeit = val(form, 'uhrzeit');
    if (uhrzeit === 'Andere Uhrzeit') {
      uhrzeit = (val(form, 'wunsch_uhrzeit') || 'Wunschzeit nicht angegeben') + ' (Wunschzeit)';
    }
    return {
      subject: 'Terminanfrage über msy-designs',
      body:
        'Terminanfrage (kostenloses 30-Minuten-Erstgespräch) über msy-designs.de\n\n' +
        'Telefon: ' + val(form, 'telefon') + '\n' +
        'E-Mail: ' + val(form, 'email') + '\n' +
        'Wunschtag: ' + val(form, 'datum') + '\n' +
        'Uhrzeit: ' + uhrzeit + '\n'
    };
  });
})();
