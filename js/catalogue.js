/* Catalogue Search — tabs, filter-column toggles, filters popup, spatial map */
(function () {
  "use strict";

  /* ---- Filter / Spatial tabs ---- */
  var tabFilter  = document.getElementById("tab-filter");
  var tabSpatial = document.getElementById("tab-spatial");
  var panelFilter  = document.getElementById("panel-filter");
  var panelSpatial = document.getElementById("panel-spatial");
  var mapReady = false;

  function selectTab(which) {
    var spatial = which === "spatial";
    tabSpatial.setAttribute("aria-selected", String(spatial));
    tabFilter.setAttribute("aria-selected", String(!spatial));
    panelSpatial.hidden = !spatial;
    panelFilter.hidden = spatial;
    if (spatial) initMap();
  }
  tabFilter.addEventListener("click", function () { selectTab("filter"); });
  tabSpatial.addEventListener("click", function () { selectTab("spatial"); });

  /* ---- filter column on/off toggles ---- */
  document.querySelectorAll(".col-toggle").forEach(function (t) {
    t.setAttribute("role", "button");
    t.tabIndex = 0;
    function flip() { t.setAttribute("aria-pressed", t.getAttribute("aria-pressed") === "true" ? "false" : "true"); }
    t.addEventListener("click", flip);
    t.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
  });

  /* ---- "Filters" master toggle pill ---- */
  var filtersToggle = document.getElementById("filtersToggle");
  filtersToggle.addEventListener("click", function () {
    var on = filtersToggle.getAttribute("aria-pressed") === "true";
    filtersToggle.setAttribute("aria-pressed", String(!on));
    filtersToggle.style.background = on ? "var(--chip-grey)" : "var(--chip-green)";
    filtersToggle.style.color = on ? "var(--muted)" : "#1f4d24";
  });

  /* ---- Filters popup (chips) ---- */
  var CHIPS = [
    ["Title"], ["Owner"], ["Catalogue", "used"], ["Type"], ["Description"],
    ["Tags"], ["Organisation"], ["Summary"], ["Category", "unused"], ["Creator"],
    ["Format"], ["Record Type"], ["Language"], ["Geographic"],
    ["Topic", "used"], ["Date Created"], ["Audience"], ["Temporal Scope"],
    ["Date Updated"], ["License", "unused"], ["Theme"], ["Version"],
    ["Access Method"], ["Collection Steward"], ["Related Records"],
    ["Record Type", "unused"]
  ];
  var chipWrap = document.getElementById("filterChips");
  chipWrap.innerHTML = CHIPS.map(function (c) {
    var state = c[1] || "inactive";
    return '<button class="chip" data-state="' + state + '">' + c[0] + "</button>";
  }).join("");

  var modal = document.getElementById("filtersModal");
  var addFilter = document.getElementById("addFilter");
  function openModal()  { modal.classList.add("is-open"); document.getElementById("filtersModalClose").focus(); }
  function closeModal() { modal.classList.remove("is-open"); addFilter.focus(); }
  addFilter.addEventListener("click", openModal);
  document.getElementById("filtersModalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });

  /* clicking a chip cycles its state, mirroring the legend */
  chipWrap.addEventListener("click", function (e) {
    var chip = e.target.closest(".chip"); if (!chip) return;
    var order = ["inactive", "unused", "used"];
    var next = order[(order.indexOf(chip.dataset.state) + 1) % order.length];
    chip.dataset.state = next;
  });

  /* ---- spatial map (MapLibre + CARTO positron) ---- */
  function initMap() {
    if (mapReady) return;
    mapReady = true;
    if (typeof maplibregl === "undefined") return;
    try {
      var map = new maplibregl.Map({
        container: "catalogueMap",
        style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        center: [-2.4, 54.2], zoom: 4.4
      });
      map.addControl(new maplibregl.NavigationControl(), "top-right");
      map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");
    } catch (err) { /* keep the styled placeholder */ }
  }
})();
