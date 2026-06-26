/* Data Story — step navigation, Prev/Next, and stage spotlight. */
(function () {
  "use strict";
  var steps = Array.prototype.slice.call(document.querySelectorAll(".story-step"));
  var prev = document.getElementById("storyPrev");
  var next = document.getElementById("storyNext");
  if (!steps.length) return;
  var i = 0;

  function clearSpot() {
    document.querySelectorAll(".story__spotlight")
      .forEach(function (el) { el.classList.remove("story__spotlight"); });
  }

  function show(n) {
    i = Math.max(0, Math.min(steps.length - 1, n));
    steps.forEach(function (s, idx) { s.classList.toggle("is-active", idx === i); });
    clearSpot();
    var spot = steps[i].getAttribute("data-spot");
    if (spot) { var t = document.getElementById(spot); if (t) t.classList.add("story__spotlight"); }
    prev.disabled = i === 0;
    next.disabled = i === steps.length - 1;
    steps[i].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  steps.forEach(function (s, idx) {
    s.querySelector(".story-step__btn").addEventListener("click", function () { show(idx); });
  });
  prev.addEventListener("click", function () { show(i - 1); });
  next.addEventListener("click", function () { show(i + 1); });

  show(0);
})();
