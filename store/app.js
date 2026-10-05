/* KP Times Store — loads products from individual JSON files in
   store/products/ via the jsDelivr CDN (file tree + file contents).
   No build step, no backend, no API rate limits.
   One bad file can never break the store: parse failures are skipped. */
(function () {
  "use strict";

  var state = { products: [], category: "All", query: "", sort: "featured" };

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
    var cdn = "https://cdn.jsdelivr.net/gh/" + GITHUB_REPO + "@main";
    // Walk the jsDelivr file tree to find store/products/*.json
    fetch("https://data.jsdelivr.com/v1/packages/gh/" + GITHUB_REPO + "@main")
      .then(function (r) {
        if (!r.ok) throw new Error("CDN " + r.status);
        return r.json();
      }).then(function (tree) {
        var paths = [];
        (function walk(files, prefix) {
          (files || []).forEach(function (f) {
            var p = prefix + "/" + f.name;
            if (f.type === "directory") walk(f.files, p);
            else if (p.indexOf("/store/products/") === 0 && f.name.slice(-5) === ".json") paths.push(p);
          });
        })(tree.files, "");
        return Promise.all(paths.map(function (p) {
          return fetch(cdn + p).then(function (r) { return r.text(); }).then(function (t) {
            try { var pr = JSON.parse(t); return pr && pr.id && pr.name ? pr : null; }
            catch (e) { return null; } // bad file: skip, never break the store
          }).catch(function () { return null; });
        }));
      }).then(function (products) {
      state.products = products.filter(Boolean);
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
