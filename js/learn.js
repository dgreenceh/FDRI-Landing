/* Learn-about pages — link numbered screenshot markers to their notes. */
(function () {
  "use strict";
  var markers = Array.prototype.slice.call(document.querySelectorAll(".marker"));
  if (!markers.length) return;

  function setActive(n, on) {
    var m = document.querySelector('.marker[data-n="' + n + '"]');
    var note = document.querySelector('.note[data-n="' + n + '"]');
    if (m) m.classList.toggle("is-active", on);
    if (note) note.classList.toggle("is-active", on);
  }
  function clearAll() {
    document.querySelectorAll(".marker.is-active, .note.is-active")
      .forEach(function (el) { el.classList.remove("is-active"); });
  }

  function wire(el) {
    var n = el.getAttribute("data-n");
    el.addEventListener("mouseenter", function () { setActive(n, true); });
    el.addEventListener("mouseleave", function () { setActive(n, false); });
    el.addEventListener("focus", function () { setActive(n, true); });
    el.addEventListener("blur", function () { setActive(n, false); });
    el.addEventListener("click", function () {
      var wasActive = el.classList.contains("is-active");
      clearAll();
      if (!wasActive) setActive(n, true);
    });
  }
  markers.forEach(function (m) { m.tabIndex = 0; wire(m); });
  document.querySelectorAll(".note").forEach(wire);
})();
