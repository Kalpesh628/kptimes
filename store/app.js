/* KP Times Store — loads products from individual JSON files in
   store/products/ via the public GitHub API (1 request; file bodies come
   from the unlimited raw CDN). Results cached 30 min in localStorage.
   No build step, no backend.
   One bad file can never break the store: parse failures are skipped. */
(function () {
  "use strict";

  var state = { products: [], category: "All", query: "", sort: "featured" };
  var CACHE_KEY = "kptimes-products-v1";
  var CACHE_TTL = 30 * 60 * 1000;

  function $(sel) { return document.querySelector(sel); }

  function buyUrl(p) {
    var sep = p.amazon_url.indexOf("?") === -1 ? "?" : "&";
    return p.amazon_url + sep + "tag=" + encodeURIComponent(AFFILIATE_TAG);
  }

  function inr(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  function stars(r) {
    r = Number(r) || 0;
    var full = Math.round(r);
    var s = "";
    for (var i = 0; i < 5; i++) s += i < full ? "★" : "☆";
    return '<span class="stars">' + s + '<span class="n">' + r.toFixed(1) + "</span></span>";
  }

  function card(p) {
    var off = "";
    if (p.mrp && Number(p.mrp) > Number(p.price)) {
      var pct = Math.round((1 - Number(p.price) / Number(p.mrp)) * 100);
      off = '<span class="off">' + pct + "% off</span>";
    }
    var badge = p.badge ? '<span class="product-badge">' + esc(p.badge) + "</span>" : "";
    var mrp = p.mrp && Number(p.mrp) > Number(p.price)
      ? '<span class="mrp">' + inr(p.mrp) + "</span>" : "";
    return (
      '<article class="product">' + badge +
      '<div class="product-img"><img loading="lazy" src="' + esc(p.image) + '" alt="' + esc(p.name) + '"></div>' +
      '<div class="product-body">' +
      '<div class="product-cat">' + esc(p.category || "") + "</div>" +
      '<h3 class="product-name">' + esc(p.name) + "</h3>" +
      stars(p.rating) +
      (p.blurb ? '<p class="product-blurb">' + esc(p.blurb) + "</p>" : "") +
      '<div class="price-row"><span class="price">' + inr(p.price) + "</span>" + mrp + off + "</div>" +
      '<a class="buy" href="' + esc(buyUrl(p)) + '" target="_blank" rel="nofollow sponsored noopener">Buy on Amazon 🛒</a>' +
      "</div></article>"
    );
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function visible() {
    var q = state.query.trim().toLowerCase();
    var list = state.products.filter(function (p) {
      if (state.category !== "All" && p.category !== state.category) return false;
      if (q && (p.name + " " + (p.blurb || "")).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (state.sort === "low") list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === "high") list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === "rating") list.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
    return list;
  }

  function render() {
    var list = visible();
    var grid = $("#grid");
    if (!list.length) {
      grid.innerHTML = '<div class="status-line" style="grid-column:1/-1">No products match. Try a different search or category.</div>';
      return;
    }
    grid.innerHTML = list.map(card).join("");
    $("#count").textContent = list.length + (list.length === 1 ? " product" : " products");
  }

  function renderPills() {
    var cats = ["All"];
    state.products.forEach(function (p) {
      if (p.category && cats.indexOf(p.category) === -1) cats.push(p.category);
    });
    $("#pills").innerHTML = cats.map(function (c) {
      return '<button class="pill' + (c === state.category ? " active" : "") +
        '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");
    Array.prototype.forEach.call(document.querySelectorAll(".pill"), function (el) {
      el.addEventListener("click", function () {
        state.category = el.getAttribute("data-cat");
        renderPills(); render();
      });
    });
  }

  function load() {
    var status = $("#status");
    // Serve from cache when fresh — keeps the store instant and far under API limits.
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.at < CACHE_TTL && cached.products.length) {
        state.products = cached.products;
        status.style.display = "none";
        renderPills(); render();
        return;
      }
    } catch (e) { /* corrupted cache: fall through to network */ }

    var api = "https://api.github.com/repos/" + GITHUB_REPO + "/contents/store/products";
    fetch(api).then(function (r) {
      if (!r.ok) throw new Error("GitHub API " + r.status);
      return r.json();
    }).then(function (files) {
      var jsons = files.filter(function (f) { return f.name.slice(-5) === ".json" && f.download_url; });
      return Promise.all(jsons.map(function (f) {
        return fetch(f.download_url).then(function (r) { return r.text(); }).then(function (t) {
          try { var p = JSON.parse(t); return p && p.id && p.name ? p : null; }
          catch (e) { return null; } // bad file: skip, never break the store
        }).catch(function () { return null; });
      }));
    }).then(function (products) {
      state.products = products.filter(Boolean);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), products: state.products })); }
      catch (e) { /* private mode: fine without cache */ }
      status.style.display = "none";
      if (!state.products.length) {
        $("#grid").innerHTML = '<div class="status-line" style="grid-column:1/-1">No products yet — check back soon.</div>';
        return;
      }
      renderPills(); render();
    }).catch(function () {
      status.innerHTML = "Couldn't load products right now. Please check your connection and refresh.";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("#search").addEventListener("input", function (e) { state.query = e.target.value; render(); });
    $("#sort").addEventListener("change", function (e) { state.sort = e.target.value; render(); });
    load();
  });
})();
