/* Time Series Data Explorer — empty dual-axis chart ("blank by default"). */
(function () {
  "use strict";
  var el = document.getElementById("tseChart");
  if (!el || typeof Plotly === "undefined") return;

  var layout = {
    margin: { l: 48, r: 48, t: 12, b: 36 },
    showlegend: false,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { family: "Segoe UI, system-ui, sans-serif", size: 11, color: "#6b7177" },
    xaxis: {
      type: "date",
      range: ["2026-05-22", "2026-06-02"],
      showgrid: false, zeroline: false,
      linecolor: "#cdd3d8", ticks: "outside", tickcolor: "#cdd3d8"
    },
    yaxis: {
      title: { text: "g/m³", font: { size: 10 } },
      range: [0, 15], showgrid: false, zeroline: false,
      linecolor: "#cdd3d8", ticks: "outside", tickcolor: "#cdd3d8"
    },
    yaxis2: {
      title: { text: "m⁻³", font: { size: 10 } },
      range: [0, 1.5], overlaying: "y", side: "right",
      showgrid: false, zeroline: false, linecolor: "#cdd3d8", ticks: "outside", tickcolor: "#cdd3d8"
    }
  };

  Plotly.newPlot(el, [], layout, { displayModeBar: false, responsive: true });
})();
