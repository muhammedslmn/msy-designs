/* =============================================================================
   Tuhfetü'l-Etfâl — Dijital Şerh · Uygulama Mantığı (vanilla JS)
   ============================================================================= */
(function () {
  "use strict";

  var VERSES = window.VERSES, CONTENT = window.CONTENT, I18N = window.I18N,
      LANGS = window.LANGS, THEMES = window.THEMES;

  var state = {
    lang: localStorage.getItem("tuhfe-lang") || "tr",
    theme: localStorage.getItem("tuhfe-theme") || "light"
  };
  if (!I18N[state.lang]) state.lang = "tr";

  var app = document.getElementById("app");

  /* ---------- helpers ---------- */
  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || (I18N.tr[key] || key); }
  function pick(obj) { if (!obj) return null; return obj[state.lang] != null ? obj[state.lang] : (obj.tr != null ? obj.tr : null); }
  function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function fmt(s) { // markdown-lite: **bold** and *italic*  ·  keeps Arabic/quotes intact
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function sectionById(id) { for (var i=0;i<CONTENT.sections.length;i++) if (CONTENT.sections[i].id===id) return CONTENT.sections[i]; return null; }

  /* ---------- theme / lang ---------- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("tuhfe-theme", state.theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", state.theme === "dark" ? "#0e1512" : (state.theme === "sepia" ? "#e9ddc4" : "#f4efe4"));
  }
  function setLang(code) {
    if (!I18N[code]) return;
    state.lang = code; localStorage.setItem("tuhfe-lang", code);
    var L = LANGS.filter(function(l){return l.code===code;})[0];
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute("dir", (L && L.dir) || "ltr");
    render();
  }
  function setTheme(code) { state.theme = code; applyTheme(); syncControls(); }

  /* ---------- top bar ---------- */
  function topbar() {
    var route = parseHash();
    var navItems = [
      { href: "#/", key: "nav_home", active: route.view === "home" },
      { href: "#/intro", key: "nav_intro", active: route.view === "intro" },
      { href: "#/sections", key: "nav_sections", active: route.view === "section" }
    ];
    var nav = navItems.map(function (n) {
      return '<a href="'+n.href+'" class="'+(n.active?"active":"")+'">'+t(n.key)+"</a>";
    }).join("");

    var langSeg = '<div class="seg lang" role="group" aria-label="'+t("language")+'">' +
      LANGS.map(function (l) {
        return '<button data-lang="'+l.code+'" class="'+(state.lang===l.code?"on":"")+'" title="'+l.label+'">'+l.code.toUpperCase()+"</button>";
      }).join("") + "</div>";

    var themeSeg = '<div class="seg theme" role="group" aria-label="'+t("theme")+'">' +
      THEMES.map(function (th) {
        return '<button data-theme="'+th.code+'" class="'+(state.theme===th.code?"on":"")+'" title="'+pick(th.label)+'">'+th.icon+"</button>";
      }).join("") + "</div>";

    return '' +
    '<header class="topbar"><div class="wrap topbar-in">' +
      '<a href="#/" class="brand" aria-label="'+t("appName")+'">' +
        '<span class="brand-mark">ت</span>' +
        '<span class="brand-txt"><b>'+t("appName")+'</b><span>'+t("appTag")+'</span></span>' +
      '</a>' +
      '<nav class="nav">'+nav+'</nav>' +
      '<div class="controls">'+langSeg+themeSeg+
        '<button class="icon-btn menu-toggle" aria-label="Menu" id="menuBtn">☰</button>' +
      '</div>' +
    '</div></header>' +
    mobileNav(navItems, langSeg);
  }

  function mobileNav(navItems, langSeg) {
    var links = navItems.map(function (n) {
      return '<a href="'+n.href+'" class="'+(n.active?"active":"")+'" data-close="1">'+t(n.key)+"</a>";
    }).join("");
    var themeSeg = '<div class="seg theme">' + THEMES.map(function (th) {
      return '<button data-theme="'+th.code+'" class="'+(state.theme===th.code?"on":"")+'">'+th.icon+"</button>";
    }).join("") + "</div>";
    return '<div class="mobile-nav" id="mobileNav"><div class="sheet">' +
      '<div class="mn-head"><b>'+t("appName")+'</b><button class="icon-btn" data-close="1">✕</button></div>' +
      links +
      '<div class="mn-row">'+langSeg+themeSeg+'</div>' +
    '</div></div>';
  }

  /* ---------- footer ---------- */
  function footer() {
    return '<footer class="footer"><div class="wrap footer-in">' +
      '<div class="f-ar">﷽</div>' +
      '<div class="f-note">'+t("footer_note")+'</div>' +
      '<div>'+CONTENT.meta.workTitleAr+' · '+t("footer_rights")+'</div>' +
    '</div></footer>';
  }

  /* ---------- home ---------- */
  function homeView() {
    var cards = CONTENT.sections.map(function (s) {
      var done = s.status !== "draft";
      var count = (s.range[1]-s.range[0]+1);
      return '<a class="card fade-in" href="#/section/'+s.id+'">' +
        '<div class="card-num">'+String(s.num).padStart(2,"0")+'</div>' +
        '<div class="card-ar">'+s.arTitle+'</div>' +
        '<h3>'+pick(s.title)+'</h3>' +
        '<div class="card-range">'+t("beyit")+' '+s.range[0]+'–'+s.range[1]+' · '+count+' '+t("beyits")+
          '<span style="margin-inline-start:auto"></span>' +
          '<span class="chip '+(done?"done":"draft")+'">'+(done?"✓":"…")+'</span>' +
        '</div>' +
      '</a>';
    }).join("");

    var introCards = [
      { emoji:"⭐", key:"fazilet" }, { emoji:"📜", key:"hadith" }, { emoji:"🕰️", key:"biography" }
    ];

    return '' +
    '<section class="hero wrap">' +
      '<span class="kicker">'+t("appTag")+'</span>' +
      '<div class="hero-ar">'+CONTENT.meta.workTitleAr+'</div>' +
      '<h1>'+t("hero_title")+'</h1>' +
      '<p>'+t("hero_sub")+'</p>' +
      '<div class="hero-actions">' +
        '<a class="btn btn-primary" href="#/section/mukaddime">'+t("hero_cta")+' →</a>' +
        '<a class="btn btn-ghost" href="#/intro">'+t("hero_cta2")+'</a>' +
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
      '<div class="reader-top"><a class="back-link" href="#/">← '+t("nav_home")+'</a>' +
        '<div class="reader-title"><h2>'+t("home_intro_title")+'</h2></div></div>' +
      block(I.fazilet) +
      // hadith as its own panel
      '<div class="panel fade-in"><div class="panel-label"><span class="dot"></span>'+t("lbl_hadiths")+'</div>' +
        '<div class="quote-box hadith"><div class="quote-ar">'+I.hadith.arabic+'</div>' +
        '<div class="quote-meta"><span class="quote-ref">'+t("lbl_source")+': '+pick(I.hadith.source)+'</span></div>' +
        '<div class="quote-tr">'+fmt(pick(I.hadith.body))+'</div></div></div>' +
      block(I.biography) +
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

    var draftHtml = s.status === "draft" ? '<div class="draft-banner"><span>✍️</span><div><b>'+pick(s.title)+'</b> — '+t("draft_note")+'</div></div>' : '';

    var summary = s.summary && pick(s.summary);
    var summaryHtml = summary ? '<div class="panel summary fade-in">' +
      '<div class="panel-label"><span class="dot"></span>'+t("lbl_summary")+'</div>' +
      '<div class="summary"><ul>'+summary.map(function(li){return "<li>"+fmt(li)+"</li>";}).join("")+'</ul></div></div>' : '';

    var count = (s.range[1]-s.range[0]+1);
    var secNav = '<div class="beyit-nav">' +
      (prev ? '<a class="btn btn-ghost" href="#/section/'+prev.id+'">← '+t("prev_section")+'</a>' : '<span class="btn btn-ghost disabled">← '+t("prev_section")+'</span>') +
      (next ? '<a class="btn btn-primary" href="#/section/'+next.id+'">'+t("next_section")+' →</a>' : '<a class="btn btn-primary" href="#/">'+t("back_home")+'</a>') +
    '</div>';

    return '<section class="block wrap">' +
      '<div class="reader-top">' +
        '<a class="back-link" href="#/">← '+t("back_home")+'</a>' +
        '<div class="reader-title"><div class="r-ar">'+s.arTitle+'</div><h2>'+pick(s.title)+'</h2></div>' +
        '<div class="reader-meta">'+t("section")+' '+s.num+' '+t("of")+' '+CONTENT.sections.length+' · '+t("beyit")+' '+s.range[0]+'–'+s.range[1]+'</div>' +
      '</div>' +
      overviewHtml + draftHtml + beyitsHtml + summaryHtml + secNav +
    '</section>';
  }

  function beyitCard(b, s) {
    var v = VERSES[b.n] || { a:"", b:"" };
    var verseHtml = '<div class="verse-ar"><span class="shatr">'+v.a+'</span><span class="sep"></span><span class="shatr">'+v.b+'</span></div>';

    var fields = "";

    // translation
    var tr = b.translation && pick(b.translation);
    if (tr) fields += field("lbl_translation", '<div class="translation">'+fmt(tr)+'</div>');

    // word by word
    if (b.words && b.words.length) {
      var chips = b.words.map(function (w, i) {
        return '<button class="word-chip" data-w="'+b.n+'-'+i+'">'+w.ar+'</button>';
      }).join("");
      fields += field("lbl_words", '<div class="words-hint">'+t("lbl_words_hint")+'</div><div class="words">'+chips+'</div>');
    }

    // sharh
    var sharh = b.sharh && pick(b.sharh);
    if (sharh) {
      var paras = Array.isArray(sharh) ? sharh : [sharh];
      fields += field("lbl_sharh", '<div class="sharh">'+paras.map(function(p){return "<p>"+fmt(p)+"</p>";}).join("")+'</div>');
    }

    // examples
    if (b.examples && b.examples.length) {
      var ex = b.examples.map(function(e){ return quoteBox(e, "ayah"); }).join("");
      fields += field("lbl_examples", ex);
    }

    // ayat
    if (b.verses && b.verses.length) {
      var vs = b.verses.map(function(q){ return quoteBox(q, "ayah"); }).join("");
      fields += field("lbl_verses", vs);
    }

    // hadiths
    if (b.hadiths && b.hadiths.length) {
      var hs = b.hadiths.map(function(q){ return quoteBox(q, "hadith"); }).join("");
      fields += field("lbl_hadiths", hs);
    }

    // witnesses
    if (b.witnesses && b.witnesses.length) {
      var ws = b.witnesses.map(function(q){ return quoteBox(q, "hadith"); }).join("");
      fields += field("lbl_witnesses", ws);
    }

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
    var s = null, n = parseInt(ref[0],10), wi = parseInt(ref[1],10);
    // find beyit across sections
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
    // position anchored to the page (absolute) so scroll/focus jumps don't misplace or close it
    var r = chip.getBoundingClientRect();
    var sx = window.pageXOffset || document.documentElement.scrollLeft || 0;
    var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
    var vw = document.documentElement.clientWidth;
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width/2 - pw/2), vw - pw - 8) + sx;
    var top = r.top + sy - ph - 10;
    if (r.top - ph - 10 < 8) top = r.bottom + sy + 10; // flip below if no room above
    pop.style.left = left + "px"; pop.style.top = top + "px";
    chip.classList.add("open");
    currentPop = pop;
  }

  /* ---------- routing ---------- */
  function parseHash() {
    var h = (location.hash || "#/").replace(/^#/, "");
    var parts = h.split("/").filter(Boolean); // ["", ...]
    if (parts[0] === "section" && parts[1]) return { view:"section", id:parts[1] };
    if (parts[0] === "sections") return { view:"section", id: CONTENT.sections[0].id, redirect:true };
    if (parts[0] === "intro") return { view:"intro" };
    return { view:"home" };
  }

  function render() {
    var route = parseHash();
    var body = "";
    if (route.view === "home") body = homeView();
    else if (route.view === "intro") body = introView();
    else if (route.view === "section") body = sectionView(route.id);

    app.innerHTML = topbar() + '<main class="app-main">' + body + '</main>' + footer();
    wire();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /* ---------- event wiring ---------- */
  function wire() {
    // lang buttons
    Array.prototype.forEach.call(document.querySelectorAll("[data-lang]"), function (btn) {
      btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
    });
    // theme buttons
    Array.prototype.forEach.call(document.querySelectorAll("[data-theme]"), function (btn) {
      btn.addEventListener("click", function () { setTheme(btn.getAttribute("data-theme")); });
    });
    // word chips
    Array.prototype.forEach.call(document.querySelectorAll(".word-chip"), function (chip) {
      chip.addEventListener("click", function (e) {
        e.stopPropagation();
        if (chip.classList.contains("open")) { closePop(); return; }
        openPop(chip);
      });
    });
    // mobile menu
    var menuBtn = document.getElementById("menuBtn");
    var mnav = document.getElementById("mobileNav");
    if (menuBtn && mnav) {
      menuBtn.addEventListener("click", function () { mnav.classList.add("open"); });
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

  // global: close popover on outside interaction
  document.addEventListener("click", function (e) {
    if (currentPop && !e.target.closest(".popover") && !e.target.closest(".word-chip")) closePop();
  });
  // Popover is absolutely positioned (anchored to the page), so it scrolls with content;
  // no need to close on scroll. Closing on resize keeps placement sane.
  window.addEventListener("resize", function () { if (currentPop) closePop(); });

  /* ---------- boot ---------- */
  window.addEventListener("hashchange", render);
  applyTheme();
  var L0 = LANGS.filter(function(l){return l.code===state.lang;})[0];
  document.documentElement.setAttribute("lang", state.lang);
  document.documentElement.setAttribute("dir", (L0 && L0.dir) || "ltr");
  render();
})();
