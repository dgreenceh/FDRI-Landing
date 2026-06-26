/* Spatial Explorer — full interactive map (MapLibre GL + CARTO positron). */
(function () {
  "use strict";
  var el = document.getElementById("spatialMap");
  if (!el || typeof maplibregl === "undefined") return;
  try {
    var map = new maplibregl.Map({
      container: "spatialMap",
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-2.0, 54.5], zoom: 5
    });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");
  } catch (err) { /* styled placeholder remains if the basemap can't load */ }
})();
