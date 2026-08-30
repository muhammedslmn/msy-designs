/* =============================================================
   HIDAYAH — site.js
   ============================================================= */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var LANG = document.body.getAttribute('data-lang') || 'de';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LANGS = ['de', 'en', 'tr', 'ar'];

  var TXT = {
    de: { copied:'Kopiert', soon:'Diese Funktion braucht noch einen Server. Der Bezahl- und Kursbereich wird gerade eingerichtet — melde dich zum Newsletter an, dann erfährst du es zuerst.',
          sending:'Wird gesendet …', ok:'Jazak Allahu khayran. Deine Nachricht ist bei uns angekommen.',
          err:'Das hat leider nicht geklappt. Schreib uns gerne direkt an salam@hidayah.de.',
          nocfg:'Das Formular ist noch nicht mit einem E-Mail-Dienst verbunden. Trage in _build/content.py deine Formspree-ID ein und baue die Seite neu.',
          results:'Treffer', empty:'Keine Treffer. Versuche es mit einem anderen Begriff.' },
    en: { copied:'Copied', soon:'This feature still needs a server. Payments and the course area are being set up — subscribe to the newsletter to hear first.',
          sending:'Sending …', ok:'Jazak Allahu khayran. Your message has reached us.',
          err:'That did not work. Please write to us at salam@hidayah.de.',
          nocfg:'The form is not connected to an email service yet. Add your Formspree ID in _build/content.py and rebuild.',
          results:'results', empty:'No results. Try a different term.' },
    tr: { copied:'Kopyalandı', soon:'Bu özellik için henüz sunucu gerekiyor. Ödeme ve ders alanı hazırlanıyor — ilk sen haberdar ol, bültene kaydol.',
          sending:'Gönderiliyor …', ok:'Cezâkallâhu hayran. Mesajın bize ulaştı.',
          err:'Maalesef olmadı. Bize doğrudan yaz: salam@hidayah.de.',
          nocfg:'Form henüz e-posta servisine bağlı değil. _build/content.py içine Formspree kimliğini gir ve yeniden derle.',
          results:'sonuç', empty:'Sonuç yok. Başka bir kelime dene.' },
    ar: { copied:'تم النسخ', soon:'تحتاج هذه الميزة إلى خادم. يجري إعداد قسم الدفع والدورات — اشترك في النشرة لتكون أول من يعلم.',
          sending:'جارٍ الإرسال …', ok:'جزاك الله خيرًا. وصلتنا رسالتك.',
          err:'لم ينجح الإرسال. راسلنا على salam@hidayah.de.',
          nocfg:'النموذج غير موصول بخدمة بريد بعد. أضف معرّف Formspree في _build/content.py وأعد البناء.',
          results:'نتيجة', empty:'لا نتائج. جرّب كلمة أخرى.' }
  };
  var L = TXT[LANG] || TXT.de;

  /* ---------------------------------------------------------- Intro */
  (function intro() {
    var el = $('[data-intro]');
    if (!el) return;
    var KEY = 'hidayah:intro';
    var seen = null;
    try { seen = sessionStorage.getItem(KEY); } catch (e) {}
    if (seen) { el.parentNode.removeChild(el); return; }
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}

    var root = document.documentElement;
    root.classList.add('intro-lock');
    var done = false;
    function end() {
      if (done) return;
      done = true;
      el.classList.add('is-leaving');
      root.classList.remove('intro-lock');
      window.setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 900);
    }
    window.setTimeout(end, REDUCED ? 900 : 3400);
    el.addEventListener('click', end);
    var skip = $('[data-intro-skip]');
    if (skip) skip.addEventListener('click', end);
    window.addEventListener('keydown', function () { end(); }, { once: true });
    window.addEventListener('wheel', end, { once: true, passive: true });
    window.addEventListener('touchstart', end, { once: true, passive: true });
  }());

  /* ---------------------------------------------------------- Header / Drawer */
  var header = $('#siteHeader');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var drawer = $('[data-drawer]');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.setAttribute('data-open', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  $$('[data-drawer-open]').forEach(function (b) { b.addEventListener('click', function () { setDrawer(true); }); });
  $$('[data-drawer-close]').forEach(function (b) { b.addEventListener('click', function () { setDrawer(false); }); });

  /* ---------------------------------------------------------- Sprache */
  function pathFor(lang) {
    var p = location.pathname.replace(/^\/(en|tr|ar)(?=\/|$)/, '');
    if (!p) p = '/';
    if (lang !== 'de') {
      if (/^\/artikel\/.+/.test(p)) p = '/artikel.html';
      else if (/^\/kurse\/.+/.test(p)) p = '/kurse.html';
    }
    if (p === '/index.html') p = '/';
    return (lang === 'de' ? '' : '/' + lang) + p;
  }
  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) return;
    try { localStorage.setItem('hidayah:lang', lang); } catch (e) {}
    location.href = pathFor(lang);
  }
  $$('button[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  /* ---------------------------------------------------------- Aufklappmenues */
  var pops = $$('[data-pop]');
  pops.forEach(function (pop) {
    var trigger = pop.querySelector('button');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = pop.getAttribute('aria-expanded') === 'true';
      pops.forEach(function (p) { p.setAttribute('aria-expanded', 'false'); });
      pop.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    pop.addEventListener('click', function (e) { e.stopPropagation(); });
  });
  document.addEventListener('click', function () {
    pops.forEach(function (p) { p.setAttribute('aria-expanded', 'false'); });
  });

  /* ---------------------------------------------------------- Darstellung */
  (function appearance() {
    var root = document.documentElement;
    function readTheme() {
      var v = root.getAttribute('data-theme');
      return (v === 'light' || v === 'dark') ? v : 'auto';
    }
    function readAccent() { return root.getAttribute('data-accent') || 'smaragd'; }

    function markTheme() {
      var cur = readTheme();
      $$('[data-theme-set]').forEach(function (b) {
        b.setAttribute('aria-selected', b.getAttribute('data-theme-set') === cur ? 'true' : 'false');
      });
    }
    function markAccent() {
      var cur = readAccent();
      $$('[data-accent-set]').forEach(function (b) {
        b.setAttribute('aria-selected', b.getAttribute('data-accent-set') === cur ? 'true' : 'false');
      });
    }

    $$('[data-theme-set]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-theme-set');
        if (v === 'auto') root.removeAttribute('data-theme');
        else root.setAttribute('data-theme', v);
        try { localStorage.setItem('hidayah:theme', v); } catch (e) {}
        markTheme();
      });
    });
    $$('[data-accent-set]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-accent-set');
        root.setAttribute('data-accent', v);
        try { localStorage.setItem('hidayah:accent', v); } catch (e) {}
        markAccent();
      });
    });
    markTheme(); markAccent();
  }());

  /* ---------------------------------------------------------- Cookie */
  (function cookie() {
    var box = $('[data-cookie]');
    if (!box) return;
    var KEY = 'hidayah:cookie';
    function show() { box.setAttribute('data-open', 'true'); }
    function hide() { box.setAttribute('data-open', 'false'); }
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (!stored) window.setTimeout(show, 1600);
    var ok = $('[data-cookie-ok]', box);
    if (ok) ok.addEventListener('click', function () {
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
      hide();
    });
    $$('[data-cookie-open]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); show(); });
    });
  }());

  /* ---------------------------------------------------------- Reveal */
  (function reveal() {
    var els = $$('.reveal');
    if (!els.length) return;
    if (REDUCED || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }());

  /* ---------------------------------------------------------- Fuzzy-Helfer */
  var Fuzzy = (function () {
    var MAP = {
      'a':'a','á':'a','à':'a','â':'a','ä':'a','ạ':'a','':'','':'','':'','’':'',
      'i':'i','í':'i','ì':'i','î':'i','u':'u','ú':'u','ù':'u','û':'u','ü':'u','ö':'o','o':'o',
      'e':'e','é':'e','è':'e','ê':'e','h':'h','kh':'h','d':'d','dh':'d','s':'s','sh':'s','ş':'s',
      't':'t','th':'t','z':'z','gh':'g','ğ':'g','j':'g','ç':'c','ı':'i','ñ':'n','ß':'ss'
    };
    function base(s) {
      s = String(s).toLowerCase();
      var out = '', i, c;
      for (i = 0; i < s.length; i++) {
        c = s.charAt(i);
        out += (Object.prototype.hasOwnProperty.call(MAP, c) ? MAP[c] : c);
      }
      try { out = out.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) {}
      return out.replace(/[^a-z0-9؀-ۿ ]+/g, ' ').replace(/\s+/g, ' ').trim();
    }
    function fold(w) {
      return w
        .replace(/kh/g, 'h').replace(/gh/g, 'g').replace(/th/g, 't').replace(/dh/g, 'd')
        .replace(/sh/g, 's').replace(/ph/g, 'f').replace(/ck/g, 'k')
        .replace(/q/g, 'k').replace(/w/g, 'v').replace(/ee/g, 'i').replace(/oo/g, 'u')
        .replace(/(.)\1+/g, '$1')
        .replace(/h$/, '');
    }
    function lev(a, b) {
      if (a === b) return 0;
      var m = a.length, n = b.length, i, j;
      if (Math.abs(m - n) > 2) return 9;
      var prev = [], cur = [];
      for (j = 0; j <= n; j++) prev[j] = j;
      for (i = 1; i <= m; i++) {
        cur[0] = i;
        for (j = 1; j <= n; j++) {
          cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1,
                            prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        }
        for (j = 0; j <= n; j++) prev[j] = cur[j];
      }
      return prev[n];
    }
    return { base: base, fold: fold, lev: lev };
  }());

  /* ---------------------------------------------------------- Suche */
  var searchBox   = $('[data-search]');
  var searchInput = $('[data-search-input]');
  var searchOut   = $('[data-search-results]');
  var searchCount = $('[data-search-count]');
  var GROUP_LABEL = ({
    de: { articles:'Artikel', courses:'Kurse', qa:'Frage &amp; Antwort', terms:'Begriffe' },
    en: { articles:'Articles', courses:'Courses', qa:'Q &amp; A', terms:'Terms' },
    tr: { articles:'Makaleler', courses:'Dersler', qa:'Soru &amp; Cevap', terms:'Kavramlar' },
    ar: { articles:'المقالات', courses:'الدورات', qa:'سؤال وجواب', terms:'المصطلحات' }
  })[LANG] || { articles:'Artikel', courses:'Kurse', qa:'Frage &amp; Antwort', terms:'Begriffe' };

  var PREPPED = null;
  function prep() {
    if (PREPPED) return PREPPED;
    PREPPED = (window.HIDAYAH_INDEX || []).map(function (it) {
      var title = Fuzzy.base(it.t);
      var body  = Fuzzy.base((it.k || '') + ' ' + (it.s || ''));
      return {
        raw: it, title: title, body: body,
        tTok: title.split(' ').map(Fuzzy.fold),
        bTok: (title + ' ' + body).split(' ').map(Fuzzy.fold)
      };
    });
    return PREPPED;
  }

  function score(item, qBase, qTok) {
    var s = 0;
    if (item.title.indexOf(qBase) === 0) s += 120;
    else if (item.title.indexOf(qBase) > -1) s += 90;
    if (item.body.indexOf(qBase) > -1) s += 40;
    qTok.forEach(function (q) {
      if (!q) return;
      var hit = 0, i, w;
      for (i = 0; i < item.tTok.length; i++) {
        w = item.tTok[i];
        if (!w) continue;
        if (w === q) hit = Math.max(hit, 60);
        else if (w.indexOf(q) === 0) hit = Math.max(hit, 45);
        else if (q.length >= 4 && Fuzzy.lev(w, q) <= (q.length >= 6 ? 2 : 1)) hit = Math.max(hit, 34);
      }
      if (!hit) {
        for (i = 0; i < item.bTok.length; i++) {
          w = item.bTok[i];
          if (!w) continue;
          if (w === q) hit = Math.max(hit, 26);
          else if (w.indexOf(q) === 0) hit = Math.max(hit, 18);
          else if (q.length >= 4 && Fuzzy.lev(w, q) <= 1) hit = Math.max(hit, 12);
        }
      }
      s += hit;
    });
    return s;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' })[c];
    });
  }
  function mark(text, q) {
    var b = Fuzzy.base(text), i = q ? b.indexOf(q) : -1;
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>'
         + esc(text.slice(i + q.length));
  }

  var START_TEXT = '';
  function runSearch(qRaw) {
    if (!searchOut) return;
    // Noch keine Inhalte hinterlegt -> Hinweis statt Fehlanzeige
    if (!prep().length) {
      searchOut.innerHTML = '<p class="search-empty">' + esc(START_TEXT) + '</p>';
      if (searchCount) searchCount.textContent = '';
      return;
    }
    var q = Fuzzy.base(qRaw);
    if (q.length < 2) {
      searchOut.innerHTML = '<p class="search-empty">' + esc(START_TEXT) + '</p>';
      if (searchCount) searchCount.textContent = '';
      return;
    }
    var qTok = q.split(' ').map(Fuzzy.fold).filter(Boolean);
    var hits = prep().map(function (it) { return { it: it, s: score(it, q, qTok) }; })
                     .filter(function (h) { return h.s > 20; })
                     .sort(function (a, b) { return b.s - a.s; })
                     .slice(0, 24);
    if (searchCount) searchCount.textContent = hits.length + ' ' + L.results;
    if (!hits.length) {
      searchOut.innerHTML = '<p class="search-empty">' + esc(L.empty) + '</p>';
      return;
    }
    var by = { articles: [], courses: [], qa: [], terms: [] };
    hits.forEach(function (h) { (by[h.it.raw.g] || by.terms).push(h.it.raw); });
    var html = '';
    ['articles', 'courses', 'qa', 'terms'].forEach(function (g) {
      if (!by[g].length) return;
      html += '<div class="search-group"><p class="search-group__title">' + GROUP_LABEL[g] + '</p>';
      by[g].forEach(function (r) {
        html += '<a class="search-hit" href="' + r.u + '"><span class="search-hit__title">'
             + mark(r.t, q) + '</span><span class="search-hit__sub">' + esc(r.s || '') + '</span></a>';
      });
      html += '</div>';
    });
    searchOut.innerHTML = html;
  }

  if (searchBox && searchInput && searchOut) {
    var startEl = $('.search-empty', searchOut);
    START_TEXT = startEl ? startEl.textContent : '';

    var openSearch = function () {
      searchBox.setAttribute('data-open', 'true');
      searchBox.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      window.setTimeout(function () { searchInput.focus(); }, 60);
    };
    var closeSearch = function () {
      searchBox.setAttribute('data-open', 'false');
      searchBox.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
    };
    $$('[data-search-open]').forEach(function (b) {
      b.addEventListener('click', function () { setDrawer(false); openSearch(); });
    });
    searchBox.addEventListener('click', function (e) { if (e.target === searchBox) closeSearch(); });

    var timer;
    searchInput.addEventListener('input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { runSearch(searchInput.value); }, 110);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSearch(); setDrawer(false); }
      if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === '/' && document.activeElement === document.body) { e.preventDefault(); openSearch(); }
    });
    searchInput.addEventListener('keydown', function (e) {
      var hits = $$('.search-hit', searchOut);
      if (!hits.length) return;
      var active = $('.search-hit.is-active', searchOut);
      var i = hits.indexOf(active);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (i > -1) hits[i].classList.remove('is-active');
        var n = e.key === 'ArrowDown' ? (i + 1) % hits.length : (i <= 0 ? hits.length - 1 : i - 1);
        hits[n].classList.add('is-active');
        hits[n].scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter' && i > -1) { e.preventDefault(); hits[i].click(); }
    });
  }

  /* ---------------------------------------------------------- Filter */
  $$('[data-filters]').forEach(function (bar) {
    var scope = bar.parentElement;
    var list  = $('[data-article-list]', scope);
    var empty = $('[data-empty]', scope);
    if (!list) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-filter]') : null;
      if (!btn) return;
      $$('[data-filter]', bar).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var f = btn.getAttribute('data-filter');
      var shown = 0;
      $$('[data-keys]', list).forEach(function (row) {
        var ok = (f === 'all') ||
                 (' ' + row.getAttribute('data-keys') + ' ').indexOf(' ' + f + ' ') > -1;
        row.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  /* ---------------------------------------------------------- Konto-Tabs */
  (function tabs() {
    var nav = $('.account-nav');
    if (!nav) return;
    nav.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-acc-tab]') : null;
      if (!b) return;
      var key = b.getAttribute('data-acc-tab');
      $$('[data-acc-tab]', nav).forEach(function (x) {
        x.setAttribute('aria-selected', x === b ? 'true' : 'false');
      });
      $$('[data-acc-panel]').forEach(function (p) {
        p.hidden = p.getAttribute('data-acc-panel') !== key;
      });
    });
  }());

  /* ---------------------------------------------------------- Teilen */
  (function share() {
    var url = location.href, title = document.title;
    var enc = encodeURIComponent(url), et = encodeURIComponent(title);
    $$('[data-share]').forEach(function (el) {
      var kind = el.getAttribute('data-share');
      if (kind === 'copy') {
        el.addEventListener('click', function () {
          var old = el.textContent;
          var done = function () {
            el.textContent = L.copied;
            window.setTimeout(function () { el.textContent = old; }, 1600);
          };
          if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done);
          else done();
        });
        return;
      }
      if (kind === 'whatsapp') el.href = 'https://wa.me/?text=' + et + '%20' + enc;
      if (kind === 'telegram') el.href = 'https://t.me/share/url?url=' + enc + '&text=' + et;
      if (kind === 'x')        el.href = 'https://x.com/intent/tweet?url=' + enc + '&text=' + et;
    });
  }());

  /* ---------------------------------------------------------- Formulare */
  var ENDPOINT = (window.HIDAYAH_FORM_ENDPOINT || '').trim();
  $$('[data-form]').forEach(function (form) {
    var status = $('[data-status]', form) ||
                 (form.parentElement ? $('[data-status]', form.parentElement) : null);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      function say(state, msg) {
        if (!status) { window.alert(msg); return; }
        status.setAttribute('data-state', state);
        status.textContent = msg;
      }
      if (!ENDPOINT || ENDPOINT.indexOf('DEINE-FORM-ID') > -1) { say('err', L.nocfg); return; }
      if (btn) { btn.disabled = true; btn.textContent = L.sending; }
      fetch(ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' },
                        body: new FormData(form) })
        .then(function (r) {
          if (!r.ok) throw new Error('bad');
          form.reset(); say('ok', L.ok);
        })
        .catch(function () { say('err', L.err); })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });
  });

  /* ---------------------------------------------------------- Kurs: Währung / Kauf */
  $$('[data-currency]').forEach(function (sel) {
    var card = sel.closest ? sel.closest('.card') : null;
    var out = card ? $('.course__price', card) : null;
    if (!out) return;
    var eur = out.getAttribute('data-eur') || '';
    var tryv = out.getAttribute('data-try') || '';
    if (!eur) {
      var parts = out.textContent.split('/');
      eur = (parts[0] || '').trim();
      tryv = (parts[1] || '').trim();
      out.setAttribute('data-eur', eur);
      out.setAttribute('data-try', tryv);
    }
    sel.addEventListener('change', function () {
      out.innerHTML = sel.value === 'try'
        ? esc(tryv) + ' <small>/ ' + esc(eur) + '</small>'
        : esc(eur) + ' <small>/ ' + esc(tryv) + '</small>';
    });
  });

  $$('[data-checkout],[data-preview]').forEach(function (b) {
    b.addEventListener('click', function () {
      var host = b.parentElement;
      var note = host.querySelector('[data-soon]');
      if (!note) {
        note = document.createElement('p');
        note.className = 'form-status';
        note.setAttribute('data-soon', '1');
        host.appendChild(note);
      }
      note.setAttribute('data-state', 'ok');
      note.textContent = L.soon;
    });
  });

  /* ---------------------------------------------------------- Lesefortschritt */
  (function progress() {
    var bar = $('[data-progress]');
    if (!bar) return;
    var body = $('.article-body') || $('.prose');
    if (!body) return;
    function update() {
      var r = body.getBoundingClientRect();
      var total = r.height - window.innerHeight;
      var done = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : (r.top < 0 ? 1 : 0);
      bar.style.width = (done * 100).toFixed(2) + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }());

  /* ---------------------------------------------------------- Kleinkram */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  (function courseLayout() {
    var el = $('[data-course-layout]');
    if (!el) return;
    var mq = window.matchMedia('(min-width: 980px)');
    var apply = function () {
      el.style.gridTemplateColumns = mq.matches ? 'minmax(0,1.6fr) minmax(300px,.9fr)' : '1fr';
    };
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply); else mq.addListener(apply);
  }());
}());
