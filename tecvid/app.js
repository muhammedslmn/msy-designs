/* =============================================================================
   Tuhfetü'l-Etfâl — Dijital Şerh · Uygulama Mantığı (vanilla JS)
   Yönlendirme tamamen JS ile yapılır (gerçek sayfa navigasyonu yoktur); bu
   sayede sandbox/iframe ortamlarında "Forbidden" hatası oluşmaz.
   ============================================================================= */
(function () {
  "use strict";

  var VERSES = window.VERSES, CONTENT = window.CONTENT, I18N = window.I18N,
      LANGS = window.LANGS, THEMES = window.THEMES;

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var state = {
    lang: lsGet("tuhfe-lang") || "tr",
    theme: lsGet("tuhfe-theme") || "light",
    route: { view: "home" }
  };
  if (!I18N[state.lang]) state.lang = "tr";

  var app = document.getElementById("app");

  /* ---------- helpers ---------- */
  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || (I18N.tr[key] || key); }
  function pick(obj) { if (!obj) return null; return obj[state.lang] != null ? obj[state.lang] : (obj.tr != null ? obj.tr : null); }
  function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function fmt(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function sectionById(id) { for (var i=0;i<CONTENT.sections.length;i++) if (CONTENT.sections[i].id===id) return CONTENT.sections[i]; return null; }

  /* ---------- theme / lang ---------- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    lsSet("tuhfe-theme", state.theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", state.theme === "dark" ? "#0b1512" : (state.theme === "sepia" ? "#e9ddc4" : "#f3f1ea"));
  }
  function setLang(code) {
    if (!I18N[code]) return;
    state.lang = code; lsSet("tuhfe-lang", code);
    var L = LANGS.filter(function(l){return l.code===code;})[0];
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("dir", (L && L.dir) || "ltr");
    render();
  }
  function setTheme(code) { state.theme = code; applyTheme(); syncControls(); }

  /* ---------- router (JS-only, no page navigation) ---------- */
  function hashFor(r) { if (r.view==="section") return "#/section/"+r.id; if (r.view==="intro") return "#/intro"; return "#/"; }
  function go(r) {
    state.route = r;
    try { history.replaceState(null, "", hashFor(r)); } catch (e) {}
    render();
    try { window.scrollTo(0, 0); } catch (e) {}
  }
  function nav(spec) {
    if (!spec) return;
    if (spec === "home") go({ view:"home" });
    else if (spec === "intro") go({ view:"intro" });
    else if (spec.indexOf("section:") === 0) go({ view:"section", id: spec.slice(8) });
  }

  /* ---------- top bar ---------- */
  function topbar() {
    var view = state.route.view;
    var navItems = [
      { nav:"home", key:"nav_home", active: view==="home" },
      { nav:"intro", key:"nav_intro", active: view==="intro" },
      { nav:"section:"+CONTENT.sections[0].id, key:"nav_sections", active: view==="section" }
    ];
    var navHtml = navItems.map(function (n) {
      return '<a class="navlink '+(n.active?"active":"")+'" data-nav="'+n.nav+'" role="link" tabindex="0">'+t(n.key)+"</a>";
    }).join("");

    var langSeg = '<div class="seg lang" role="group" aria-label="'+t("language")+'">' +
      LANGS.map(function (l) {
        return '<button data-lang="'+l.code+'" class="'+(state.lang===l.code?"on":"")+'" title="'+l.label+'">'+l.code.toUpperCase()+"</button>";
      }).join("") + "</div>";

    var themeSeg = '<div class="seg theme" role="group" aria-label="'+t("theme")+'">' +
      THEMES.map(function (th) {
        return '<button data-theme="'+th.code+'" class="'+(state.theme===th.code?"on":"")+'" title="'+pick(th.label)+'"><span class="ti">'+th.icon+'</span></button>';
      }).join("") + "</div>";

    return '' +
    '<header class="topbar"><div class="wrap topbar-in">' +
      '<a class="brand" data-nav="home" role="link" tabindex="0" aria-label="'+t("appName")+'">' +
        '<span class="brand-mark">ت</span>' +
        '<span class="brand-txt"><b>'+t("appName")+'</b><span>'+t("appTag")+'</span></span>' +
      '</a>' +
      '<nav class="nav">'+navHtml+'</nav>' +
      '<div class="controls">'+langSeg+themeSeg+
        '<button class="icon-btn menu-toggle" aria-label="Menu" id="menuBtn">☰</button>' +
      '</div>' +
    '</div></header>' +
    mobileNav(navItems, langSeg, themeSeg);
  }

  function mobileNav(navItems, langSeg, themeSeg) {
    var links = navItems.map(function (n) {
      return '<a class="'+(n.active?"active":"")+'" data-nav="'+n.nav+'" role="link" tabindex="0">'+t(n.key)+"</a>";
    }).join("");
    return '<div class="mobile-nav" id="mobileNav"><div class="sheet">' +
      '<div class="mn-head"><b>'+t("appName")+'</b><button class="icon-btn" data-close="1">✕</button></div>' +
      links +
      '<div class="mn-block"><span class="mn-lbl">'+t("language")+'</span>'+langSeg+'</div>' +
      '<div class="mn-block"><span class="mn-lbl">'+t("theme")+'</span>'+themeSeg+'</div>' +
    '</div></div>';
  }

  /* ---------- footer ---------- */
  function footer() {
    return '<footer class="footer"><div class="wrap footer-in">' +
      '<div class="f-bism">﷽</div>' +
      '<div class="f-ayah">وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا</div>' +
      '<div class="f-ayah-tr">'+t("ayah_tr")+' <span class="f-ayah-ref">'+t("ayah_ref")+'</span></div>' +
      '<div class="f-sep"></div>' +
      '<div class="f-note">'+t("footer_note")+'</div>' +
      '<div class="f-fine">'+CONTENT.meta.workTitleAr+' · '+t("footer_rights")+'</div>' +
    '</div></footer>';
  }

  /* ---------- home ---------- */
  function homeView() {
    var cards = CONTENT.sections.map(function (s) {
      var done = s.status !== "draft";
      var count = (s.range[1]-s.range[0]+1);
      return '<a class="card fade-in" data-nav="section:'+s.id+'" role="link" tabindex="0">' +
        '<div class="card-top"><div class="card-num">'+String(s.num).padStart(2,"0")+'</div>' +
        '<span class="chip '+(done?"done":"draft")+'">'+(done?"✓ "+t("chip_done"):"…")+'</span></div>' +
        '<div class="card-ar">'+s.arTitle+'</div>' +
        '<h3>'+pick(s.title)+'</h3>' +
        '<div class="card-range">'+t("beyit")+' '+s.range[0]+'–'+s.range[1]+' · '+count+' '+t("beyits")+
          '<span class="card-go">→</span>' +
        '</div>' +
      '</a>';
    }).join("");

    return '' +
    '<section class="hero wrap">' +
      '<span class="kicker">'+t("appTag")+'</span>' +
      '<div class="hero-ar">'+CONTENT.meta.workTitleAr+'</div>' +
      '<h1>'+t("hero_title")+'</h1>' +
      '<p>'+t("hero_sub")+'</p>' +
      '<div class="hero-actions">' +
        '<a class="btn btn-primary" data-nav="section:mukaddime" role="link" tabindex="0">'+t("hero_cta")+' →</a>' +
        '<a class="btn btn-ghost" data-nav="intro" role="link" tabindex="0">'+t("hero_cta2")+'</a>' +
      '</div>' +
      '<div class="divider"><span>﴾﴿</span></div>' +
    '</section>' +

    '<section class="block wrap">' +
      '<div class="sec-head"><h2>'+t("home_sections_title")+'</h2><p>'+t("home_sections_sub")+'</p></div>' +
      '<div class="grid">'+cards+'</div>' +
    '</section>';
  }

  /* ---------- intro ---------- */
  function introView() {
    var I = CONTENT.intro;
    function block(node) {
      var body = pick(node.body);
      var paras = Array.isArray(body) ? body : [body];
      return '<div class="panel fade-in">' +
        '<div class="panel-label"><span class="dot"></span>'+pick(node.title)+'</div>' +
        (node.arabic ? '<div class="quote-box hadith"><div class="quote-ar">'+node.arabic+'</div>'+
            '<div class="quote-meta"><span class="quote-ref">'+t("lbl_source")+': '+pick(node.source)+'</span></div></div>' : '') +
        '<div class="sharh">'+paras.map(function(p){return "<p>"+fmt(p)+"</p>";}).join("")+'</div>' +
      '</div>';
    }
    return '<section class="block wrap">' +
      '<div class="reader-top"><a class="back-link" data-nav="home" role="link" tabindex="0">← '+t("nav_home")+'</a>' +
        '<div class="reader-title"><h2>'+t("home_intro_title")+'</h2></div></div>' +
      block(I.fazilet) +
      '<div class="panel fade-in"><div class="panel-label"><span class="dot"></span>'+t("lbl_hadiths")+'</div>' +
        '<div class="quote-box hadith"><div class="quote-ar">'+I.hadith.arabic+'</div>' +
        '<div class="quote-meta"><span class="quote-ref">'+t("lbl_source")+': '+pick(I.hadith.source)+'</span></div>' +
        '<div class="quote-tr">'+fmt(pick(I.hadith.body))+'</div></div></div>' +
      block(I.biography) +
      '<div class="beyit-nav"><a class="btn btn-primary" data-nav="section:mukaddime" role="link" tabindex="0">'+t("hero_cta")+' →</a></div>' +
    '</section>';
  }

  /* ---------- section reader ---------- */
  function sectionView(id) {
    var s = sectionById(id);
    if (!s) return homeView();
    var idx = CONTENT.sections.indexOf(s);
    var prev = CONTENT.sections[idx-1], next = CONTENT.sections[idx+1];

    var beyitsHtml = s.beyits.map(function (b) { return beyitCard(b, s); }).join("");

    var overview = pick(s.overview);
    var overviewHtml = overview ? '<div class="panel overview fade-in">' +
      '<div class="panel-label"><span class="dot"></span>'+t("lbl_overview")+'</div>' +
      '<p>'+fmt(overview)+'</p></div>' : '';

    var prov = s.provenance && pick(s.provenance);
    var provHtml = prov ? '<div class="provenance fade-in"><span>ℹ️</span><p>'+fmt(prov)+'</p></div>' : '';

    var notesHtml = (s.notes && s.notes.length) ? s.notes.map(function (nt) {
      var body = pick(nt.body) || "";
      var paras = body.split("\n").filter(function(x){return x.trim();});
      return '<div class="panel fade-in"><div class="panel-label"><span class="dot"></span>'+pick(nt.title)+'</div>' +
        '<div class="sharh">'+paras.map(function(p){return "<p>"+fmt(p)+"</p>";}).join("")+'</div></div>';
    }).join("") : '';

    var summary = s.summary && pick(s.summary);
    var summaryHtml = summary ? '<div class="panel summary fade-in">' +
      '<div class="panel-label"><span class="dot"></span>'+t("lbl_summary")+'</div>' +
      '<div class="summary"><ul>'+summary.map(function(li){return "<li>"+fmt(li)+"</li>";}).join("")+'</ul></div></div>' : '';

    var secNav = '<div class="beyit-nav">' +
      (prev ? '<a class="btn btn-ghost" data-nav="section:'+prev.id+'" role="link" tabindex="0">← '+t("prev_section")+'</a>' : '<span class="btn btn-ghost disabled">← '+t("prev_section")+'</span>') +
      (next ? '<a class="btn btn-primary" data-nav="section:'+next.id+'" role="link" tabindex="0">'+t("next_section")+' →</a>' : '<a class="btn btn-primary" data-nav="home" role="link" tabindex="0">'+t("back_home")+'</a>') +
    '</div>';

    return '<section class="block wrap">' +
      '<div class="reader-top">' +
        '<a class="back-link" data-nav="home" role="link" tabindex="0">← '+t("back_home")+'</a>' +
        '<div class="reader-title"><div class="r-ar">'+s.arTitle+'</div><h2>'+pick(s.title)+'</h2></div>' +
        '<div class="reader-meta">'+t("section")+' '+s.num+' '+t("of")+' '+CONTENT.sections.length+' · '+t("beyit")+' '+s.range[0]+'–'+s.range[1]+'</div>' +
      '</div>' +
      overviewHtml + provHtml + beyitsHtml + notesHtml + summaryHtml + secNav +
    '</section>';
  }

  function beyitCard(b) {
    var v = VERSES[b.n] || { a:"", b:"" };
    var verseHtml = '<div class="verse-ar"><span class="shatr">'+v.a+'</span><span class="sep"></span><span class="shatr">'+v.b+'</span></div>';

    var fields = "";

    var tr = b.translation && pick(b.translation);
    if (tr) fields += field("lbl_translation", '<div class="translation">'+fmt(tr)+'</div>');

    if (b.words && b.words.length) {
      var chips = b.words.map(function (w, i) {
        return '<button class="word-chip" data-w="'+b.n+'-'+i+'">'+w.ar+'</button>';
      }).join("");
      fields += field("lbl_words", '<div class="words-hint">'+t("lbl_words_hint")+'</div><div class="words">'+chips+'</div>');
    }

    var sharh = b.sharh && pick(b.sharh);
    if (sharh) {
      var paras = Array.isArray(sharh) ? sharh : [sharh];
      fields += field("lbl_sharh", '<div class="sharh">'+paras.map(function(p){return "<p>"+fmt(p)+"</p>";}).join("")+'</div>');
    }

    if (b.examples && b.examples.length)
      fields += field("lbl_examples", b.examples.map(function(e){ return quoteBox(e, "ayah"); }).join(""));
    if (b.verses && b.verses.length)
      fields += field("lbl_verses", b.verses.map(function(q){ return quoteBox(q, "ayah"); }).join(""));
    if (b.hadiths && b.hadiths.length)
      fields += field("lbl_hadiths", b.hadiths.map(function(q){ return quoteBox(q, "hadith"); }).join(""));
    if (b.witnesses && b.witnesses.length)
      fields += field("lbl_witnesses", b.witnesses.map(function(q){ return quoteBox(q, "hadith"); }).join(""));

    return '<article class="beyit fade-in" id="beyit-'+b.n+'">' +
      '<div class="beyit-head"><span class="beyit-badge">'+b.n+'</span><span class="bh-label">'+t("beyit")+' '+b.n+'</span></div>' +
      verseHtml +
      (fields ? '<div class="beyit-body">'+fields+'</div>' : '') +
    '</article>';
  }

  function field(labelKey, inner) {
    return '<div class="field"><div class="field-label">'+t(labelKey)+'</div>'+inner+'</div>';
  }

  function quoteBox(q, kind) {
    var ref = "";
    if (q.ref) {
      var name = q.ref.sura || q.ref.name || "";
      ref = '<span class="quote-ref">'+esc(name)+(q.ref.ayah?(" : "+q.ref.ayah):"")+'</span>';
    } else if (q.source) {
      ref = '<span class="quote-ref">'+t("lbl_source")+': '+pick(q.source)+'</span>';
    }
    var trn = pick({ tr:q.tr, de:q.de, en:q.en });
    return '<div class="quote-box '+kind+'">' +
      '<div class="quote-ar">'+q.ar+'</div>' +
      (ref ? '<div class="quote-meta">'+ref+'</div>' : '') +
      (trn ? '<div class="quote-tr">'+fmt(trn)+'</div>' : '') +
    '</div>';
  }

  /* ---------- word popover ---------- */
  var currentPop = null;
  function closePop() {
    if (currentPop) { currentPop.remove(); currentPop = null; }
    var open = document.querySelector(".word-chip.open"); if (open) open.classList.remove("open");
  }
  function openPop(chip) {
    closePop();
    var ref = chip.getAttribute("data-w").split("-");
    var n = parseInt(ref[0],10), wi = parseInt(ref[1],10);
    var word = null;
    CONTENT.sections.forEach(function (sec) {
      sec.beyits.forEach(function (b) { if (b.n===n && b.words) word = b.words[wi] || word; });
    });
    if (!word) return;
    var note = word.note ? pick(word.note) : null;
    var pop = el('<div class="popover" role="dialog">' +
      '<div class="pv-ar">'+word.ar+'</div>' +
      '<div class="pv-mean">'+esc(pick({tr:word.tr,de:word.de,en:word.en})||"")+'</div>' +
      (note ? '<div class="pv-note"><b>'+t("lbl_grammar")+':</b> '+esc(note)+'</div>' : '') +
    '</div>');
    document.body.appendChild(pop);
    var r = chip.getBoundingClientRect();
    var sx = window.pageXOffset || document.documentElement.scrollLeft || 0;
    var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
    var vw = document.documentElement.clientWidth;
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width/2 - pw/2), vw - pw - 8) + sx;
    var top = r.top + sy - ph - 10;
    if (r.top - ph - 10 < 8) top = r.bottom + sy + 10;
    pop.style.left = left + "px"; pop.style.top = top + "px";
    chip.classList.add("open");
    currentPop = pop;
  }

  /* ---------- render ---------- */
  function render() {
    var r = state.route, body = "";
    if (r.view === "intro") body = introView();
    else if (r.view === "section") body = sectionView(r.id);
    else body = homeView();
    app.innerHTML = topbar() + '<main class="app-main">' + body + '</main>' + footer();
    wire();
  }

  /* ---------- per-render wiring (controls + chips) ---------- */
  function wire() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-lang]"), function (btn) {
      btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-theme]"), function (btn) {
      btn.addEventListener("click", function () { setTheme(btn.getAttribute("data-theme")); });
    });
    Array.prototype.forEach.call(document.querySelectorAll(".word-chip"), function (chip) {
      chip.addEventListener("click", function (e) {
        e.stopPropagation();
        if (chip.classList.contains("open")) { closePop(); return; }
        openPop(chip);
      });
    });
    var menuBtn = document.getElementById("menuBtn");
    var mnav = document.getElementById("mobileNav");
    if (menuBtn && mnav) {
      menuBtn.addEventListener("click", function (e) { e.stopPropagation(); mnav.classList.add("open"); });
      mnav.addEventListener("click", function (e) {
        if (e.target === mnav || e.target.getAttribute("data-close")) mnav.classList.remove("open");
      });
    }
  }

  function syncControls() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-theme]"), function (btn) {
      btn.classList.toggle("on", btn.getAttribute("data-theme") === state.theme);
    });
  }

  /* ---------- delegated global handlers (attached once) ---------- */
  function handleNav(e) {
    var link = e.target.closest ? e.target.closest("[data-nav]") : null;
    if (link) {
      e.preventDefault();
      var mnav = document.getElementById("mobileNav"); if (mnav) mnav.classList.remove("open");
      nav(link.getAttribute("data-nav"));
      return true;
    }
    return false;
  }
  document.addEventListener("click", function (e) {
    if (handleNav(e)) return;
    if (currentPop && !(e.target.closest && (e.target.closest(".popover") || e.target.closest(".word-chip")))) closePop();
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target && e.target.getAttribute && e.target.getAttribute("data-nav")) {
      e.preventDefault(); nav(e.target.getAttribute("data-nav"));
    }
    if (e.key === "Escape" && currentPop) closePop();
  });
  window.addEventListener("resize", function () { if (currentPop) closePop(); });

  /* ---------- açılış ekranı (besmele + âyet, otomatik einblenden/ausblenden) ---------- */
  function showSplash() {
    var sp = document.createElement("div");
    sp.className = "splash";
    sp.setAttribute("aria-hidden", "true");
    sp.innerHTML = '<div class="splash-in">' +
      '<div class="splash-bism-wrap"><span class="splash-bism">﷽</span></div>' +
      '<div class="splash-line"></div>' +
      '<div class="splash-ayah-wrap"><span class="splash-ayah">وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا</span></div>' +
      '<div class="splash-ref">'+t("ayah_ref")+'</div>' +
      '<div class="splash-hint">'+t("splash_hint")+'</div>' +
    '</div>';
    document.body.appendChild(sp);
    document.documentElement.style.overflow = "hidden"; // sayfa kaymasın

    // Arapça hat dar ekrana taşmasın diye: iki aşamada (1) sığdır, (2) tam ortala.
    function fit(wrapSel, glyphSel) {
      try {
        var wrap = sp.querySelector(wrapSel), g = sp.querySelector(glyphSel);
        if (!wrap || !g) return;
        wrap.style.transform = "";
        var margin = Math.max(12, window.innerWidth * 0.06);
        var avail = window.innerWidth - margin * 2;
        var r = g.getBoundingClientRect();
        var scale = (r.width > avail && r.width > 0) ? (avail / r.width) : 1;
        wrap.style.transform = "scale(" + scale.toFixed(4) + ")";
        var r2 = g.getBoundingClientRect();
        var dx = (window.innerWidth / 2) - ((r2.left + r2.right) / 2);
        wrap.style.transform = "translateX(" + dx.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
      } catch (e) {}
    }
    function doFit() { fit(".splash-bism-wrap", ".splash-bism"); fit(".splash-ayah-wrap", ".splash-ayah"); }
    function reveal() {
      sp.classList.add("show");
      doFit();
      try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(doFit); } catch (e) {}
      setTimeout(doFit, 350);
    }
    try { requestAnimationFrame(reveal); } catch (e) { reveal(); }

    var closed = false;
    function done() {
      if (closed) return; closed = true;
      sp.classList.add("out");
      setTimeout(function () {
        if (sp.parentNode) sp.parentNode.removeChild(sp);
        document.documentElement.style.overflow = "";
      }, 850);
    }
    var tmr = setTimeout(done, 4200);          // beliriş + bekleme + kayboluş
    sp.addEventListener("click", function () { clearTimeout(tmr); done(); });
  }

  /* ---------- boot ---------- */
  (function initRoute() {
    var h = ""; try { h = location.hash || ""; } catch (e) {}
    var parts = h.replace(/^#/, "").split("/").filter(Boolean);
    if (parts[0] === "section" && parts[1] && sectionById(parts[1])) state.route = { view:"section", id:parts[1] };
    else if (parts[0] === "intro") state.route = { view:"intro" };
    else state.route = { view:"home" };
  })();
  applyTheme();
  document.documentElement.setAttribute("lang", state.lang);
  var L0 = LANGS.filter(function(l){return l.code===state.lang;})[0];
  document.documentElement.setAttribute("dir", (L0 && L0.dir) || "ltr");
  render();
  showSplash();
})();
