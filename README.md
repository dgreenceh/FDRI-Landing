# FDRI Digital Platform — front-end build

A responsive, multi-page static site built from the review mockups. Plain HTML, CSS and
vanilla JS — no build step. Open `index.html` in a browser to view (an internet connection
lets the maps and charts load; see *Libraries* below).

## Page map

| Page | File | Fidelity |
|---|---|---|
| Landing | `index.html` | Faithful to mockup |
| Catalogue Search | `feature-catalogue-search.html` | Faithful |
| Time Series Data Explorer | `feature-time-series-explorer.html` | Faithful (blank default state) |
| Spatial Explorer | `feature-spatial-explorer.html` | Faithful |
| Gridded Data Service | `feature-gridded-data.html` | **Extrapolated** (not in mockups) |
| LiDAR Data Service | `feature-lidar-data.html` | **Extrapolated** |
| GitHub Repos | `feature-github-repos.html` | **Extrapolated** |
| Learn — Time Series | `learn-time-series-explorer.html` | Faithful (annotated) |
| Learn — Spatial | `learn-spatial-explorer.html` | Faithful (annotated) |
| Learn — Catalogue / Gridded / LiDAR / GitHub | `learn-*.html` | Templated |
| Data Story #1 | `story-rainfall-to-river-flow.html` | Faithful |
| Share feedback | `feedback.html` | Faithful |
| Learn about FDRI / FAQs | `about.html`, `faqs.html` | Added so all nav links resolve |

## Architecture

Flat file structure — every page is in the root, so paths stay simple (`css/…`, `js/…`, `assets/…`).

Shared chrome (header, burger dropdown, horizontal nav bar, "Learn about" bar, footer) is injected
by **one** file, `js/components.js`. Each page just sets a small config object before loading it:

```html
<script>window.FDRI_PAGE = {
  type: "feature",                 // landing | feature | learn | story | simple
  active: "catalogue-search",      // highlights the current nav item
  learnHref: "learn-catalogue-search.html",
  learnLabel: "Catalogue Search"
};</script>
```

Change a nav label or link once in `components.js` and it updates everywhere.
Per-page behaviour lives in its own file: `catalogue.js`, `time-series.js`, `spatial.js`,
`learn.js`, `data-story.js`.

## Assets to replace

All placeholders are in **`assets/`**, sized to the layout so swapping them needs no CSS changes:

- `fdri-mark.svg` — the circular logo mark (the "FDRI" wordmark beside it is HTML text, styled in CSS).
- `illus-catalogue/​time-series/​spatial/​gridded/​lidar/​github.svg` — the six landing-card illustrations.
- `shot-timeseries.svg`, `shot-spatial.svg` — the screenshots on the two annotated Learn pages.
- `story-rainfall.svg` — the Data Story hero image.

Each carries a visible "— REPLACE" tag so nothing ships by accident.

## Typography

The whole site reads from one variable. To use the FDRI brand face, set `--font-sans` near the
top of `css/fdri.css` (currently a clean system stack).

## Libraries (loaded from CDN in the browser)

- **MapLibre GL JS 3.6.2** — Spatial Explorer + Catalogue spatial map.
- **Plotly 2.27.0** — Time Series Explorer chart.
- **CARTO positron** basemap style for the maps.

These load over the network when the page is opened in a browser with internet access. If a preview
sandbox blocks third-party CDNs, the map and chart areas fall back to styled placeholders and there
are no errors — they work as soon as the site is hosted or opened with a connection. Pin or update the
versions in the page `<head>`/script tags as needed.

## Flags for review

- **Naming inconsistency (kept verbatim):** the burger menu says *Gridded Data Viewer* and *LiDAR Viewer*,
  while the cards and nav bar say *Gridded Data Service* and *LiDAR Data Service*. Both point to the same
  pages. Pick one convention before launch — see the note in `js/components.js`.
- **Typo corrected:** the intro paragraph's "revelant" → "relevant". All other copy is verbatim from the mockup.
- **Extrapolated pages:** Gridded, LiDAR and GitHub feature + Learn pages aren't specified in the mockups;
  they follow the platform's patterns as sensible placeholders for you to refine.

## Quality floor

Responsive to mobile (breakpoints at 900px and 620px), keyboard focus styles, `aria` roles on tabs,
dropdown, modal and steps, and `prefers-reduced-motion` respected.
