/* ============================================================
   FDRI shared chrome — header, burger dropdown, nav menubar,
   learn-about bar, footer, and landing intro-panel toggle.

   Each page sets `window.FDRI_PAGE` before loading this file:
     { type: 'landing'|'feature'|'learn'|'story'|'simple',
       active: 'catalogue-search'|'time-series-explorer'|...,
       learnHref: 'learn-...html',  learnLabel: 'Spatial Explorer' }
   ============================================================ */
(function () {
  "use strict";

  var PAGE = window.FDRI_PAGE || { type: "simple", active: "" };

  // Primary navigation (horizontal menu bar + footer)
  var NAV = [
    { key: "catalogue-search",    label: "Catalogue Search",          href: "feature-catalogue-search.html" },
    { key: "time-series-explorer", label: "Time Series Data Explorer", href: "feature-time-series-explorer.html" },
    { key: "spatial-explorer",    label: "Spatial Explorer",          href: "feature-spatial-explorer.html" },
    { key: "gridded-data",        label: "Gridded Data Service",      href: "feature-gridded-data.html" },
    { key: "lidar-data",          label: "LiDAR Data Service",        href: "feature-lidar-data.html" },
    { key: "github-repos",        label: "GitHub Repos",              href: "feature-github-repos.html" },
    { key: "faqs",                label: "FAQs",                      href: "faqs.html" }
  ];

  // Burger dropdown (labels kept verbatim from the mockup).
  // NOTE: the mockup labels "Gridded Data Viewer" / "LiDAR Viewer" differ from the
  // card + menu-bar labels "Gridded Data Service" / "LiDAR Data Service". Left as-is
  // for review — pick one naming convention before launch.
  var MENU = [
    { key: "home",                 label: "Home",                      href: "index.html" },
    { key: "catalogue-search",     label: "Catalogue Search",          href: "feature-catalogue-search.html" },
    { key: "time-series-explorer", label: "Time Series Data Explorer", href: "feature-time-series-explorer.html" },
    { key: "spatial-explorer",     label: "Spatial Explorer",          href: "feature-spatial-explorer.html" },
    { key: "gridded-data",         label: "Gridded Data Viewer",       href: "feature-gridded-data.html" },
    { key: "lidar-data",           label: "LiDAR Viewer",              href: "feature-lidar-data.html" },
    { key: "github-repos",         label: "Github Repos",              href: "feature-github-repos.html" },
    { key: "about",                label: "Learn about FDRI",          href: "about.html" }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  /* ---------------- header + dropdown ---------------- */
  function headerHTML() {
    var menu = MENU.map(function (m) {
      var cur = m.key === PAGE.active ? ' aria-current="page"' : "";
      return '<a href="' + m.href + '"' + cur + '>' + esc(m.label) + "</a>";
    }).join("");

    return '' +
      '<header class="site-header"><div class="container site-header__inner">' +
        '<a class="brand" href="index.html" aria-label="FDRI home">' +
          '<img class="brand__mark" src="assets/fdri-mark.svg" alt="">' +
          '<span><span class="brand__name">FDRI</span>' +
          '<span class="brand__tag">Floods &amp; Droughts Research Infrastructure</span></span>' +
        '</a>' +
        '<span class="header__spacer"></span>' +
        '<a class="btn-feedback" href="feedback.html">Share feedback</a>' +
        '<button class="burger" id="fdriBurger" aria-haspopup="true" aria-expanded="false" aria-label="Open menu">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
          '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>' +
        '</button>' +
        '<nav class="dropdown" id="fdriDropdown" aria-label="Main menu">' + menu + '</nav>' +
      '</div></header>';
  }

  /* ---------------- horizontal menu bar ---------------- */
  function menubarHTML() {
    var items = NAV.map(function (n, i) {
      var cur = n.key === PAGE.active ? ' aria-current="page"' : "";
      var sep = i < NAV.length - 1 ? '<span class="menubar__sep" aria-hidden="true">|</span>' : "";
      return '<a href="' + n.href + '"' + cur + '>' + esc(n.label) + "</a>" + sep;
    }).join("");
    return '<nav class="menubar" aria-label="Platform features"><div class="container menubar__inner">' + items + "</div></nav>";
  }

  /* ---------------- learn-about bar ---------------- */
  function learnbarHTML() {
    if (!PAGE.learnHref) return "";
    return '<a class="learnbar" href="' + PAGE.learnHref + '">Learn about <b>' +
           esc(PAGE.learnLabel || "this feature") + "</b></a>";
  }

  /* ---------------- footer ---------------- */
  function footerHTML() {
    var items = NAV.map(function (n, i) {
      var sep = i < NAV.length - 1 ? '<span class="site-footer__sep" aria-hidden="true">|</span>' : "";
      return '<a href="' + n.href + '">' + esc(n.label) + "</a>" + sep;
    }).join("");
    return '<footer class="site-footer"><div class="container site-footer__inner">' + items +
      '<p class="site-footer__legal">FDRI Digital Platform — UK Centre for Ecology &amp; Hydrology. Prototype for review.</p>' +
      "</div></footer>";
  }

  /* ---------------- mount ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("afterbegin", headerHTML());
    var header = document.querySelector(".site-header");

    if (PAGE.type === "feature" || PAGE.type === "learn" || PAGE.type === "simple") {
      header.insertAdjacentHTML("afterend", menubarHTML() + learnbarHTML());
    }

    if (PAGE.type !== "story") {
      document.body.insertAdjacentHTML("beforeend", footerHTML());
    }

    /* dropdown toggle */
    var burger = document.getElementById("fdriBurger");
    var dd = document.getElementById("fdriDropdown");
    function closeDD() { dd.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", function (e) {
      if (!dd.contains(e.target) && e.target !== burger) closeDD();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDD(); });

    /* landing: closable intro panel -> "Data Platform" tab bar */
    var closeIntro = document.getElementById("introClose");
    if (closeIntro) {
      closeIntro.addEventListener("click", function () { document.body.classList.add("intro-collapsed"); });
      var reopen = document.getElementById("platformTab");
      if (reopen) reopen.addEventListener("click", function () { document.body.classList.remove("intro-collapsed"); });
    }
  });
})();
