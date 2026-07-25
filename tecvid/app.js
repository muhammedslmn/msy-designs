/* =============================================================================
   Tuhfetü'l-Etfâl — Dijital Şerh · Uygulama Mantığı (vanilla JS)
   Yönlendirme tamamen JS ile yapılır (gerçek sayfa navigasyonu yok) → sandbox/
   iframe ortamlarında "Forbidden" hatası oluşmaz. Görünümler: home · intro ·
   nazm · sherh · section.
   ============================================================================= */
(function () {
  "use strict";

  var VERSES = window.VERSES, CONTENT = window.CONTENT, I18N = window.I18N,
      LANGS = window.LANGS, THEMES = window.THEMES, QUIZ = window.QUIZ || {};

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var state = {
    lang: lsGet("tuhfe-lang") || "tr",
    theme: lsGet("tuhfe-theme") || "light",
    nazmTrans: lsGet("tuhfe-nazmtrans") !== "0",
    route: { view: "home" }
  };
  if (!I18N[state.lang]) state.lang = "tr";

  var app = document.getElementById("app");

  /* ---------- helpers ---------- */
  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || (I18N.tr[key] || key); }
  function pick(obj) { if (!obj) return null; return obj[state.lang] != null ? obj[state.lang] : (obj.tr != null ? obj.tr : null); }
  function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  var ARC = "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
  var AR_RUN = new RegExp("([" + ARC + "]+(?:\\s+[" + ARC + "]+)*)", "g");
  function fmt(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(AR_RUN, '<bdi class="ar-inline">$1</bdi>');
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  // Şerh paragrafı: "@nazm ..." → iki şatırlık ortalı Arapça blok;
  // "@ar ..." → tek satır ortalı Arapça (harf listeleri); değilse normal <p>.
  function sharhPara(p) {
    if (typeof p === "string" && p.indexOf("@nazm ") === 0) {
      var parts = p.slice(6).split(" · ");
      var inner = parts.map(function (x) { return '<span class="shatr">' + esc(x.trim()) + '</span>'; }).join('<span class="sep"></span>');
      return '<div class="verse-ar sharh-nazm">' + inner + '</div>';
    }
    if (typeof p === "string" && p.indexOf("@ar ") === 0) {
      return '<div class="sharh-arline">' + esc(p.slice(4).trim()) + '</div>';
    }
    return "<p>" + fmt(p) + "</p>";
  }
  function sectionById(id) { for (var i=0;i<CONTENT.sections.length;i++) if (CONTENT.sections[i].id===id) return CONTENT.sections[i]; return null; }
  function sectionForBeyit(n) {
    for (var i=0;i<CONTENT.sections.length;i++) {
      var s = CONTENT.sections[i];
      if (n >= s.range[0] && n <= s.range[1]) return s;
    }
    return CONTENT.sections[0];
  }

  /* ---------- geometrik yıldız süsü (rub'-ül-hizb / 8 köşeli) ---------- */
  function star(cls) {
    return '<svg class="star '+(cls||"")+'" viewBox="0 0 100 100" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round">' +
        '<rect x="24" y="24" width="52" height="52" rx="2"/>' +
        '<rect x="24" y="24" width="52" height="52" rx="2" transform="rotate(45 50 50)"/>' +
      '</g>' +
      '<circle cx="50" cy="50" r="6.5" fill="currentColor"/></svg>';
  }

  /* ---------- Hidayah markası (davet sayfası kimliği) ----------
     Her yerde gerçek foto logo. Beyaz yazılı olduğu için açık zeminlerde
     küçük siyah bir zemin (pill) üzerinde gösterilir; açılışta koyu zemin var. */
  function hidayahImg() {
    return window.HIDAYAH_LOGO
      ? '<img class="hb-logo" src="' + window.HIDAYAH_LOGO + '" alt="Hidayah" loading="lazy" />'
      : '<span class="hb-word">HIDAYAH</span>';
  }
  function hidayahBrand(variant) {
    if (variant === "splash") {
      // açılış koyu zemin → logo doğrudan, pill yok
      return '<div class="hidayah-brand hb-splash">' + hidayahImg() +
        '<span class="hb-by">' + t("brand_by") + '</span></div>';
    }
    if (variant === "head") {
      // header (her zaman görünür) → küçük siyah pill üzerinde logo
      return '<div class="hidayah-brand hb-head"><span class="hb-pill" title="' + t("brand_by") + '" aria-label="Hidayah">' +
        hidayahImg() + '</span></div>';
    }
    // footer → küçük siyah pill üzerinde logo + künye
    return '<div class="hidayah-brand hb-footer"><span class="hb-pill">' + hidayahImg() + '</span>' +
      '<span class="hb-by">' + t("brand_by") + '</span></div>';
  }

  /* ---------- tema ikonları (SVG) ---------- */
  function themeIcon(code) {
    var s = '<svg class="th-ic" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    if (code === "light") return s + '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.4 19.6l1.6-1.6M18 6l1.6-1.6"/></svg>';
    if (code === "dark") return s + '<path d="M20.5 14.2A8.2 8.2 0 1 1 9.8 3.5a6.4 6.4 0 0 0 10.7 10.7z"/></svg>';
    return s + '<path d="M12 6.2C10.5 5 8.3 4.6 5.8 4.6c-.7 0-1.3.05-1.8.13v13.2c.6-.09 1.2-.13 1.9-.13 2.4 0 4.5.4 6.1 1.6 1.6-1.2 3.7-1.6 6.1-1.6.7 0 1.3.04 1.9.13V4.73c-.5-.08-1.1-.13-1.8-.13-2.5 0-4.7.4-6.2 1.6z"/><path d="M12 6.2v12"/></svg>';
  }

  /* ---------- tablo oluşturucu ---------- */
  function tableCell(c) {
    if (c == null) return '<td></td>';
    if (typeof c === "string") return '<td class="c-ar">'+c+'</td>';
    if (c.ar != null) {
      var sub = c.sub ? pick(c.sub) : null;
      return '<td class="c-ar">'+c.ar+(sub?'<span class="c-sub">'+esc(sub)+'</span>':'')+'</td>';
    }
    return '<td>'+fmt(pick(c) || "")+'</td>';
  }
  function renderTable(tbl) {
    var head = tbl.head ? (pick(tbl.head) || []) : [];
    var thead = head.length ? '<thead><tr>'+head.map(function(h){return '<th>'+esc(h)+'</th>';}).join("")+'</tr></thead>' : '';
    var body = '<tbody>'+(tbl.rows||[]).map(function(row){
      return '<tr>'+row.map(tableCell).join("")+'</tr>';
    }).join("")+'</tbody>';
    return '<div class="tbl-wrap"><table class="ex-table">'+thead+body+'</table></div>';
  }

  /* ---------- tema / dil ---------- */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    lsSet("tuhfe-theme", state.theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", state.theme === "dark" ? "#0b1512" : (state.theme === "sepia" ? "#e6dabf" : "#f4efe4"));
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

  /* ---------- router (JS-only) ---------- */
  function hashFor(r) {
    if (r.view==="section") return "#/section/"+r.id;
    if (r.view==="intro") return "#/tecvid";
    if (r.view==="nazm") return "#/nazm";
    if (r.view==="sherh") return "#/sherh";
    return "#/";
  }
  function go(r) {
    state.route = r;
    try { history.replaceState(null, "", hashFor(r)); } catch (e) {}
    render();
    if (r.beyit) {
      // beyit'e kaydır — font/yükleme kaynaklı reflow'a karşı birkaç kez dene
      var target = "beyit-" + r.beyit;
      function scrollToBeyit() {
        var t2 = document.getElementById(target);
        if (!t2) return;
        var y = t2.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - 82;
        try { window.scrollTo(0, Math.max(0, y)); } catch (e) { t2.scrollIntoView(); }
      }
      try { window.scrollTo(0, 0); } catch (e) {}
      requestAnimationFrame(scrollToBeyit);
      setTimeout(scrollToBeyit, 120);
      setTimeout(scrollToBeyit, 450);
      try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(scrollToBeyit); } catch (e) {}
    } else {
      try { window.scrollTo(0, 0); } catch (e) {}
    }
  }
  function nav(spec) {
    if (!spec) return;
    if (spec === "home") return go({ view:"home" });
    if (spec === "intro") return go({ view:"intro" });
    if (spec === "nazm") return go({ view:"nazm" });
    if (spec === "sherh") return go({ view:"sherh" });
    if (spec.indexOf("section:") === 0) {
      var rest = spec.slice(8), at = rest.indexOf("@");
      if (at >= 0) return go({ view:"section", id: rest.slice(0, at), beyit: parseInt(rest.slice(at+1), 10) });
      return go({ view:"section", id: rest });
    }
  }

  /* ---------- top bar ---------- */
  function topbar() {
    var view = state.route.view;
    var navItems = [
      { nav:"home",  key:"nav_home",  active: view==="home" },
      { nav:"intro", key:"nav_intro", active: view==="intro" },
      { nav:"nazm",  key:"nav_nazm",  active: view==="nazm" },
      { nav:"sherh", key:"nav_sherh", active: view==="sherh" || view==="section" }
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
        return '<button data-theme="'+th.code+'" class="'+(state.theme===th.code?"on":"")+'" title="'+pick(th.label)+'" aria-label="'+pick(th.label)+'">'+themeIcon(th.code)+'</button>';
      }).join("") + "</div>";

    return '' +
    '<header class="topbar"><div class="wrap topbar-in">' +
      '<a class="brand" data-nav="home" role="link" tabindex="0" aria-label="'+t("appName")+'">' +
        '<span class="brand-mark">'+star("brand-star")+'</span>' +
        '<span class="brand-txt"><b>'+t("appName")+'</b><span>'+t("appTag")+'</span></span>' +
      '</a>' +
      '<nav class="nav">'+navHtml+'</nav>' +
      '<div class="controls">'+hidayahBrand("head")+langSeg+themeSeg+
        '<button class="icon-btn menu-toggle" aria-label="Menu" id="menuBtn"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
      '</div>' +
    '</div></header>' +
    mobileNav(navItems, langSeg, themeSeg);
  }

  function mobileNav(navItems, langSeg, themeSeg) {
    var links = navItems.map(function (n) {
      return '<a class="'+(n.active?"active":"")+'" data-nav="'+n.nav+'" role="link" tabindex="0">'+t(n.key)+"</a>";
    }).join("");
    return '<div class="mobile-nav" id="mobileNav"><div class="sheet">' +
      '<div class="mn-head"><b>'+t("appName")+'</b><button class="icon-btn" data-close="1" aria-label="'+t("close")+'">✕</button></div>' +
      links +
      '<div class="mn-block"><span class="mn-lbl">'+t("language")+'</span>'+langSeg+'</div>' +
      '<div class="mn-block"><span class="mn-lbl">'+t("theme")+'</span>'+themeSeg+'</div>' +
    '</div></div>';
  }

  /* ---------- footer ---------- */
  function footer() {
    return '<footer class="footer"><div class="wrap footer-in">' +
      '<div class="f-orn">'+star("f-star")+'</div>' +
      '<div class="f-bism">﷽</div>' +
      '<div class="f-ayah">وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا</div>' +
      '<div class="f-ayah-tr">'+t("ayah_tr")+'</div>' +
      '<div class="f-ayah-ref">'+t("ayah_ref")+'</div>' +
      '<div class="f-sep"></div>' +
      '<div class="f-note">'+t("footer_note")+'</div>' +
      '<div class="f-fine">'+CONTENT.meta.workTitleAr+' · '+pick(CONTENT.meta.author)+'</div>' +
      hidayahBrand("footer") +
    '</div></footer>';
  }

  /* ---------- portal (giriş) kartı ---------- */
  function portalCard(spec, ar, titleKey, subKey, ctaKey, meta, kind) {
    return '<a class="portal '+kind+' fade-in" data-nav="'+spec+'" role="link" tabindex="0">' +
      '<div class="portal-orn">'+star()+'</div>' +
      '<div class="portal-ar">'+ar+'</div>' +
      '<h3>'+t(titleKey)+'</h3>' +
      '<p>'+t(subKey)+'</p>' +
      '<div class="portal-foot"><span class="portal-meta">'+meta+'</span>' +
        '<span class="portal-cta">'+t(ctaKey)+' <span class="arw">→</span></span></div>' +
    '</a>';
  }

  /* ---------- home ---------- */
  function homeView() {
    var stats = '<div class="stats fade-in">' +
      '<div class="stat"><b>61</b><span>'+t("stat_beyit")+'</span></div>' +
      '<div class="stat"><b>10</b><span>'+t("stat_bolum")+'</span></div>' +
      '<div class="stat"><b>3</b><span>'+t("stat_dil")+'</span></div>' +
    '</div>';

    var portals = '<div class="portals">' +
      portalCard("intro", "التَّجْوِيد", "entry_tecvid_title", "entry_tecvid_sub", "entry_tecvid_cta", t("home_intro_title"), "p-tecvid") +
      portalCard("nazm", "النَّظْم", "entry_nazm_title", "entry_nazm_sub", "entry_nazm_cta", "61 "+t("beyit"), "p-nazm") +
      portalCard("sherh", "الشَّرْح", "entry_sherh_title", "entry_sherh_sub", "entry_sherh_cta", "10 "+t("section"), "p-sherh") +
    '</div>';

    var why = '<section class="block wrap why">' +
      '<div class="sec-head center"><span class="eyebrow">'+t("why_title")+'</span></div>' +
      '<div class="why-grid">' +
        whyCard("why_1_t","why_1_b") + whyCard("why_2_t","why_2_b") + whyCard("why_3_t","why_3_b") +
      '</div></section>';

    return '' +
    '<section class="hero">' +
      '<div class="hero-bg" aria-hidden="true"></div>' +
      '<div class="wrap hero-in">' +
        '<div class="hero-orn">'+star("hero-star")+'</div>' +
        '<span class="kicker">'+t("hero_kicker")+'</span>' +
        '<h1 class="hero-title">'+t("hero_title")+'</h1>' +
        '<div class="hero-ar">'+CONTENT.meta.workTitleAr+'</div>' +
        '<div class="hero-bism">﷽</div>' +
        '<p class="hero-sub">'+t("hero_sub")+'</p>' +
      '</div>' +
    '</section>' +

    '<section class="block wrap portals-wrap">' +
      '<div class="sec-head center"><h2>'+t("portal_title")+'</h2><p>'+t("portal_sub")+'</p></div>' +
      portals + stats +
    '</section>' +
    why;
  }
  function whyCard(tk, bk) {
    return '<div class="why-card fade-in"><div class="why-mark">'+star()+'</div>' +
      '<h4>'+t(tk)+'</h4><p>'+t(bk)+'</p></div>';
  }

  /* ---------- intro (Tecvid İlmi) ---------- */
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
    return '<section class="block wrap reader">' +
      '<div class="reader-top">' +
        '<a class="back-link" data-nav="home" role="link" tabindex="0">← '+t("back_home")+'</a>' +
        '<div class="reader-title"><div class="r-orn">'+star()+'</div><div class="r-ar">التَّجْوِيد</div><h2>'+t("home_intro_title")+'</h2>' +
          '<p class="reader-lead">'+t("intro_lead")+'</p></div>' +
      '</div>' +
      block(I.fazilet) +
      '<div class="panel fade-in"><div class="panel-label"><span class="dot"></span>'+t("lbl_hadiths")+'</div>' +
        '<div class="quote-box hadith"><div class="quote-ar">'+I.hadith.arabic+'</div>' +
        '<div class="quote-meta"><span class="quote-ref">'+t("lbl_source")+': '+pick(I.hadith.source)+'</span></div>' +
        '<div class="quote-tr">'+fmt(pick(I.hadith.body))+'</div></div></div>' +
      block(I.biography) +
      '<div class="beyit-nav">' +
        '<a class="btn btn-ghost" data-nav="nazm" role="link" tabindex="0">'+t("intro_to_nazm")+' →</a>' +
        '<a class="btn btn-primary" data-nav="sherh" role="link" tabindex="0">'+t("intro_to_sherh")+' →</a>' +
      '</div>' +
    '</section>';
  }

  /* ---------- Nazm okuyucu ---------- */
  function nazmView() {
    var groups = CONTENT.sections.map(function (s) {
      var verses = s.beyits.map(function (b) {
        var v = VERSES[b.n] || { a:"", b:"" };
        var tr = pick(b.translation);
        return '<article class="nverse fade-in" id="nazm-'+b.n+'">' +
          '<div class="nv-num">'+b.n+'</div>' +
          '<div class="nv-body">' +
            '<div class="verse-ar nv-ar"><span class="shatr">'+v.a+'</span><span class="sep"></span><span class="shatr">'+v.b+'</span></div>' +
            (tr ? '<div class="nv-tr">'+fmt(tr)+'</div>' : '') +
            '<a class="nv-link" data-nav="section:'+s.id+'@'+b.n+'" role="link" tabindex="0">'+t("nazm_go_sherh")+' <span class="arw">→</span></a>' +
          '</div>' +
        '</article>';
      }).join("");
      return '<div class="nazm-group">' +
        '<div class="nazm-shead" data-nav="section:'+s.id+'" role="link" tabindex="0">' +
          '<span class="ns-num">'+pad2(s.num)+'</span>' +
          '<div class="ns-txt"><span class="ns-ar">'+s.arTitle+'</span><b>'+pick(s.title)+'</b></div>' +
          '<span class="ns-range">'+t("beyit")+' '+s.range[0]+'–'+s.range[1]+'</span>' +
        '</div>' + verses +
      '</div>';
    }).join("");

    return '<section class="block wrap reader nazm-reader'+(state.nazmTrans?"":" no-trans")+'">' +
      '<div class="reader-top">' +
        '<a class="back-link" data-nav="home" role="link" tabindex="0">← '+t("back_home")+'</a>' +
        '<div class="reader-title"><div class="r-orn">'+star()+'</div><div class="r-ar">النَّظْم</div><h2>'+t("nazm_title")+'</h2>' +
          '<p class="reader-lead">'+t("nazm_sub")+'</p></div>' +
      '</div>' +
      '<div class="nazm-bar">' +
        '<button class="toggle '+(state.nazmTrans?"on":"")+'" id="transToggle" role="switch" aria-checked="'+(state.nazmTrans?"true":"false")+'">' +
          '<span class="tg-knob"></span><span class="tg-lbl">'+(state.nazmTrans?t("nazm_trans_on"):t("nazm_trans_off"))+'</span>' +
        '</button>' +
      '</div>' +
      groups +
      '<div class="beyit-nav"><a class="btn btn-primary" data-nav="sherh" role="link" tabindex="0">'+t("entry_sherh_cta")+' →</a></div>' +
    '</section>';
  }

  /* ---------- Şerh index (bölümler) ---------- */
  function sherhIndexView() {
    var cards = CONTENT.sections.map(function (s) {
      var count = (s.range[1]-s.range[0]+1);
      return '<a class="card fade-in" data-nav="section:'+s.id+'" role="link" tabindex="0">' +
        '<div class="card-top"><div class="card-num">'+pad2(s.num)+'</div>' +
        '<span class="card-star">'+star()+'</span></div>' +
        '<div class="card-ar">'+s.arTitle+'</div>' +
        '<h3>'+pick(s.title)+'</h3>' +
        '<div class="card-range">'+t("beyit")+' '+s.range[0]+'–'+s.range[1]+' · '+count+' '+(count===1?t("beyits_one"):t("beyits"))+
          '<span class="card-go">→</span></div>' +
      '</a>';
    }).join("");
    return '<section class="block wrap reader">' +
      '<div class="reader-top">' +
        '<a class="back-link" data-nav="home" role="link" tabindex="0">← '+t("back_home")+'</a>' +
        '<div class="reader-title"><div class="r-orn">'+star()+'</div><div class="r-ar">الشَّرْح</div><h2>'+t("sherh_title")+'</h2>' +
          '<p class="reader-lead">'+t("sherh_sub")+'</p></div>' +
      '</div>' +
      '<div class="grid">'+cards+'</div>' +
    '</section>';
  }

  /* ---------- section reader (şerh) ---------- */
  function sectionView(id) {
    var s = sectionById(id);
    if (!s) return sherhIndexView();
    var idx = CONTENT.sections.indexOf(s);
    var prev = CONTENT.sections[idx-1], next = CONTENT.sections[idx+1];

    var beyitsHtml = s.beyits.map(function (b) { return beyitCard(b, s); }).join("");

    var overview = pick(s.overview);
    var overviewHtml = overview ? '<div class="panel overview fade-in">' +
      '<div class="panel-label"><span class="dot"></span>'+t("lbl_overview")+'</div>' +
      '<p>'+fmt(overview)+'</p></div>' : '';

    var notesHtml = (s.notes && s.notes.length) ? s.notes.map(function (nt) {
      var body = pick(nt.body) || "";
      var paras = body.split("\n").filter(function(x){return x.trim();});
      return '<div class="panel note fade-in"><div class="panel-label"><span class="dot"></span>'+pick(nt.title)+'</div>' +
        '<div class="sharh">'+paras.map(function(p){return sharhPara(p);}).join("")+'</div></div>';
    }).join("") : '';

    var summary = s.summary && pick(s.summary);
    var summaryHtml = summary ? '<div class="panel summary fade-in">' +
      '<div class="panel-label"><span class="dot"></span>'+t("lbl_summary")+'</div>' +
      '<div class="summary"><ul>'+summary.map(function(li){return "<li>"+fmt(li)+"</li>";}).join("")+'</ul></div></div>' : '';

    var secNav = '<div class="beyit-nav">' +
      (prev ? '<a class="btn btn-ghost" data-nav="section:'+prev.id+'" role="link" tabindex="0">← '+t("prev_section")+'</a>' : '<a class="btn btn-ghost" data-nav="sherh" role="link" tabindex="0">← '+t("back_sherh")+'</a>') +
      (next ? '<a class="btn btn-primary" data-nav="section:'+next.id+'" role="link" tabindex="0">'+t("next_section")+' →</a>' : '<a class="btn btn-primary" data-nav="sherh" role="link" tabindex="0">'+t("back_sherh")+' →</a>') +
    '</div>';

    var progress = Math.round(s.num / CONTENT.sections.length * 100);
    var examHtml = examPanel(idx);

    return '<section class="block wrap reader">' +
      '<div class="reader-top section-top">' +
        '<a class="back-link" data-nav="sherh" role="link" tabindex="0">← '+t("back_sherh")+'</a>' +
        '<div class="reader-title"><div class="r-ar">'+s.arTitle+'</div><h2>'+pick(s.title)+'</h2></div>' +
        '<div class="reader-meta">'+t("section")+' '+s.num+' '+t("of")+' '+CONTENT.sections.length+' · '+t("beyit")+' '+s.range[0]+'–'+s.range[1]+'</div>' +
        '<div class="sec-progress"><span style="width:'+progress+'%"></span></div>' +
      '</div>' +
      overviewHtml + beyitsHtml + notesHtml + summaryHtml + examHtml + secNav +
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
      fields += field("lbl_sharh", '<div class="sharh">'+paras.map(function(p){return sharhPara(p);}).join("")+'</div>');
    }

    if (b.tables && b.tables.length) {
      b.tables.forEach(function (tbl) {
        var label = tbl.label ? pick(tbl.label) : t("lbl_examples");
        fields += fieldRaw(label, (tbl.intro ? '<p class="tbl-intro">'+fmt(pick(tbl.intro)||"")+'</p>' : '') + renderTable(tbl));
      });
    }
    if (b.examples && b.examples.length)
      fields += field("lbl_examples", b.examples.map(function(e){ return quoteBox(e, "ayah"); }).join(""));
    if (b.verses && b.verses.length)
      fields += field("lbl_verses", b.verses.map(function(q){ return quoteBox(q, "ayah"); }).join(""));
    if (b.hadiths && b.hadiths.length)
      fields += field("lbl_hadiths", b.hadiths.map(function(q){ return quoteBox(q, "hadith"); }).join(""));

    return '<article class="beyit fade-in" id="beyit-'+b.n+'">' +
      '<div class="beyit-head"><span class="beyit-badge">'+b.n+'</span><span class="bh-label">'+t("beyit")+' '+b.n+'</span></div>' +
      verseHtml +
      (fields ? '<div class="beyit-body">'+fields+'</div>' : '') +
    '</article>';
  }

  /* ---------- Prüfungssimulation (kümülatif sınav) ---------- */
  function examPanel(idx) {
    var groups = [], total = 0, qi = 0;
    for (var i = 0; i <= idx; i++) {
      var sec = CONTENT.sections[i];
      var qs = QUIZ[sec.id];
      if (!qs || !qs.length) continue;
      var items = qs.map(function (q) {
        var opts = q.opts.map(function (o, oi) {
          return '<button class="eq-opt" data-i="'+oi+'"><span class="eq-mark"></span>' +
                 '<span class="eq-otext">'+fmt(pick(o))+'</span></button>';
        }).join("");
        qi++;
        return '<div class="eq" data-correct="'+q.correct+'" data-answered="0">' +
          '<div class="eq-q"><span class="eq-qn">'+qi+'</span><span class="eq-qt">'+fmt(pick(q.q))+'</span></div>' +
          '<div class="eq-opts">'+opts+'</div>' +
          '<div class="eq-why" hidden><b>'+t("exam_why")+':</b> '+fmt(pick(q.why))+'</div>' +
        '</div>';
      }).join("");
      total += qs.length;
      groups.push('<div class="exam-group"><div class="exam-glabel">'+t("exam_section_lbl")+' '+sec.num+' · '+pick(sec.title)+'</div>'+items+'</div>');
    }
    if (!total) return "";
    var scope = t("exam_scope") + (idx + 1) + ' · ' + total + ' ' + t("exam_qcount");
    return '<section class="exam" id="exam">' +
      '<div class="exam-intro">' +
        '<div class="exam-orn">'+star()+'</div>' +
        '<h3>'+t("exam_title")+'</h3>' +
        '<p class="exam-lead">'+t("exam_lead")+'</p>' +
        '<div class="exam-scope">'+scope+'</div>' +
        '<button class="btn btn-primary exam-start">'+t("exam_start")+' →</button>' +
      '</div>' +
      '<div class="exam-body">' +
        '<div class="exam-scorebar"><div class="exam-scorenum"><span class="exam-score">0 / '+total+'</span><span class="exam-scorelbl">'+t("exam_correct")+'</span></div>' +
          '<div class="exam-prog"><span></span></div></div>' +
        groups.join("") +
        '<div class="exam-result" hidden></div>' +
        '<button class="btn btn-ghost exam-reset">'+t("exam_restart")+'</button>' +
      '</div>' +
    '</section>';
  }
  function updateExamScore(examEl) {
    var qs = examEl.querySelectorAll(".eq");
    var total = qs.length, answered = 0, ok = 0;
    Array.prototype.forEach.call(qs, function (q) {
      if (q.getAttribute("data-answered") === "1") answered++;
      if (q.classList.contains("q-ok")) ok++;
    });
    var sc = examEl.querySelector(".exam-score"); if (sc) sc.textContent = ok + " / " + total;
    var prog = examEl.querySelector(".exam-prog span"); if (prog) prog.style.width = (total ? (answered/total*100) : 0) + "%";
    var res = examEl.querySelector(".exam-result");
    if (res) {
      if (answered === total && total) {
        var pct = ok/total;
        var msg = pct === 1 ? t("exam_result_perfect") : (pct >= 0.6 ? t("exam_result_good") : t("exam_result_more"));
        res.innerHTML = '<b>'+ok+' / '+total+'</b> — ' + esc(msg);
        res.hidden = false;
      } else { res.hidden = true; }
    }
  }
  function resetExam(examEl) {
    Array.prototype.forEach.call(examEl.querySelectorAll(".eq"), function (q) {
      q.setAttribute("data-answered", "0"); q.classList.remove("q-ok");
      Array.prototype.forEach.call(q.querySelectorAll(".eq-opt"), function (o) { o.classList.remove("locked","correct","wrong"); });
      var why = q.querySelector(".eq-why"); if (why) why.hidden = true;
    });
    updateExamScore(examEl);
    var body = examEl.querySelector(".exam-body"); if (body) { try { body.scrollIntoView({ block:"start" }); } catch (e) {} }
  }

  function field(labelKey, inner) {
    return '<div class="field"><div class="field-label">'+t(labelKey)+'</div>'+inner+'</div>';
  }
  function fieldRaw(labelText, inner) {
    return '<div class="field"><div class="field-label">'+esc(labelText)+'</div>'+inner+'</div>';
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

  /* ---------- kelime popover ---------- */
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
    else if (r.view === "nazm") body = nazmView();
    else if (r.view === "sherh") body = sherhIndexView();
    else if (r.view === "section") body = sectionView(r.id);
    else body = homeView();
    app.innerHTML = topbar() + '<main class="app-main">' + body + '</main>' + footer();
    wire();
  }

  /* ---------- her render sonrası bağlama ---------- */
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
    var tg = document.getElementById("transToggle");
    if (tg) tg.addEventListener("click", function () {
      state.nazmTrans = !state.nazmTrans;
      lsSet("tuhfe-nazmtrans", state.nazmTrans ? "1" : "0");
      render();
    });
    var menuBtn = document.getElementById("menuBtn");
    var mnav = document.getElementById("mobileNav");
    if (menuBtn && mnav) {
      menuBtn.addEventListener("click", function (e) { e.stopPropagation(); mnav.classList.add("open"); });
      mnav.addEventListener("click", function (e) {
        if (e.target === mnav || e.target.getAttribute("data-close")) mnav.classList.remove("open");
      });
    }
    // Sınav (Prüfungssimulation)
    var examEl = document.getElementById("exam");
    if (examEl) {
      var startBtn = examEl.querySelector(".exam-start");
      if (startBtn) startBtn.addEventListener("click", function () {
        examEl.classList.add("started");
        var body = examEl.querySelector(".exam-body");
        if (body) { try { body.scrollIntoView({ block:"start" }); } catch (e) {} }
      });
      Array.prototype.forEach.call(examEl.querySelectorAll(".eq-opt"), function (opt) {
        opt.addEventListener("click", function () {
          var q = opt.closest(".eq");
          if (!q || q.getAttribute("data-answered") === "1") return;
          q.setAttribute("data-answered", "1");
          var correct = parseInt(q.getAttribute("data-correct"), 10);
          var chosen = parseInt(opt.getAttribute("data-i"), 10);
          Array.prototype.forEach.call(q.querySelectorAll(".eq-opt"), function (o) {
            o.classList.add("locked");
            if (parseInt(o.getAttribute("data-i"), 10) === correct) o.classList.add("correct");
          });
          if (chosen !== correct) opt.classList.add("wrong");
          if (chosen === correct) q.classList.add("q-ok");
          var why = q.querySelector(".eq-why"); if (why) why.hidden = false;
          updateExamScore(examEl);
        });
      });
      var resetBtn = examEl.querySelector(".exam-reset");
      if (resetBtn) resetBtn.addEventListener("click", function () { resetExam(examEl); });
    }
  }

  function syncControls() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-theme]"), function (btn) {
      btn.classList.toggle("on", btn.getAttribute("data-theme") === state.theme);
    });
  }

  /* ---------- delegated global handlers ---------- */
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

  /* ---------- açılış ekranı (besmele + âyet) ---------- */
  function showSplash() {
    var sp = document.createElement("div");
    sp.className = "splash";
    sp.setAttribute("aria-hidden", "true");
    sp.innerHTML = '<div class="splash-in">' +
      '<div class="splash-orn">'+star("splash-star")+'</div>' +
      '<div class="splash-bism-wrap"><span class="splash-bism">﷽</span></div>' +
      '<div class="splash-line"></div>' +
      '<div class="splash-ayah-wrap"><span class="splash-ayah">وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا</span></div>' +
      '<div class="splash-ref">'+t("ayah_ref")+'</div>' +
      hidayahBrand("splash") +
      '<div class="splash-hint">'+t("splash_hint")+'</div>' +
    '</div>';
    document.body.appendChild(sp);
    document.documentElement.style.overflow = "hidden";

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
    var tmr = setTimeout(done, 4800);
    sp.addEventListener("click", function () { clearTimeout(tmr); done(); });
  }

  /* ---------- boot ---------- */
  (function initRoute() {
    var h = ""; try { h = location.hash || ""; } catch (e) {}
    var parts = h.replace(/^#/, "").split("/").filter(Boolean);
    if (parts[0] === "section" && parts[1] && sectionById(parts[1])) state.route = { view:"section", id:parts[1] };
    else if (parts[0] === "tecvid" || parts[0] === "intro") state.route = { view:"intro" };
    else if (parts[0] === "nazm") state.route = { view:"nazm" };
    else if (parts[0] === "sherh") state.route = { view:"sherh" };
    else state.route = { view:"home" };
  })();
  applyTheme();
  document.documentElement.setAttribute("lang", state.lang);
  var L0 = LANGS.filter(function(l){return l.code===state.lang;})[0];
  document.documentElement.setAttribute("dir", (L0 && L0.dir) || "ltr");
  render();
  showSplash();
})();
