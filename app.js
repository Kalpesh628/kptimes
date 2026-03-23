const PASSWORD = "acpce6969";
const SPECIAL_PASSWORD = "kpbhai";
const SPECIAL_PAGE_URL = "./site/5th/";

const quickCopyView = document.getElementById("quick-copy-view");
const vaultView = document.getElementById("vault-view");
const lockOverlay = document.getElementById("lock-overlay");
const quickButtons = document.getElementById("quick-buttons");
const quickStatus = document.getElementById("quick-status");
const passwordStatus = document.getElementById("password-status");
const searchStatus = document.getElementById("search-status");
const experimentStream = document.getElementById("experiment-stream");
const vaultNav = document.getElementById("vault-nav");
const generatedAt = document.getElementById("generated-at");
const quickCopyForm = document.getElementById("quick-copy-form");
const quickNumberInput = document.getElementById("quick-number-input");
const forgotNumberTrigger = document.getElementById("forgot-number-trigger");
const backToQuickCopy = document.getElementById("back-to-quick-copy");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const closeOverlay = document.getElementById("close-overlay");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const experiments = buildExperimentState();

function normaliseCode(value) {
  return String(value || "").replace(/\r\n?/g, "\n");
}

function buildExperimentState() {
  const loaded = Array.isArray(window.EXPERIMENTS) ? window.EXPERIMENTS : [];
  return loaded
    .map((experiment) => {
      const number = Number(experiment.number);
      const code = normaliseCode(experiment.code);

      return {
        number,
        fileName: experiment.fileName || `${number}.py`,
        title: experiment.title || `Experiment ${number}`,
        aim: experiment.aim || "Aim not found in the source file.",
        code,
        available: Boolean(code.trim()),
        premiumLocked: Boolean(experiment.premiumLocked),
      };
    })
    .sort((left, right) => left.number - right.number);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function setStatus(target, message, type = "info") {
  target.textContent = message;
  target.className = `status-chip ${type}`;
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn("Clipboard API failed, using fallback.", error);
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "-999px";
  document.body.appendChild(helper);
  helper.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    document.body.removeChild(helper);
  }

  return copied;
}

async function copyExperimentByNumber(number, statusTarget) {
  const experiment = experiments.find((item) => item.number === number);
  if (!experiment) {
    setStatus(statusTarget, `Experiment ${number} is not available on this page.`, "error");
    return;
  }

  if (experiment.premiumLocked) {
    setStatus(statusTarget, "Experiment 5 requires premium access.", "error");
    return;
  }

  if (!experiment.available) {
    setStatus(
      statusTarget,
      `${experiment.fileName} is empty or missing. Fill the file, then run build_experiments.py.`,
      "error"
    );
    return;
  }

  const copied = await copyText(experiment.code);
  if (!copied) {
    setStatus(statusTarget, `Could not copy ${experiment.fileName}. Try another browser.`, "error");
    return;
  }

  setStatus(statusTarget, `${experiment.fileName} copied to clipboard.`, "success");
}

function renderQuickButtons() {
  quickButtons.innerHTML = "";

  experiments.forEach((experiment) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-tile";
    button.innerHTML = `
      <strong>${experiment.number}</strong>
      <span>${experiment.premiumLocked ? "Premium access" : experiment.available ? experiment.fileName : "Not loaded yet"}</span>
    `;
    button.addEventListener("click", () => {
      copyExperimentByNumber(experiment.number, quickStatus);
    });
    quickButtons.appendChild(button);
  });
}

function renderVaultNav(items) {
  vaultNav.innerHTML = "";

  items.forEach((experiment) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "vault-pill";
    button.innerHTML = `
      <strong>${experiment.number}</strong>
      <span>${escapeHtml(experiment.title)}</span>
    `;
    button.addEventListener("click", () => {
      const card = document.getElementById(`experiment-${experiment.number}`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    vaultNav.appendChild(button);
  });
}

function renderExperimentCards(items) {
  if (!items.length) {
    experimentStream.innerHTML = `
      <div class="empty-card">
        No experiments matched your search. Try a different number, title, aim, or keyword.
      </div>
    `;
    return;
  }

  experimentStream.innerHTML = items
    .map((experiment) => {
      const code = experiment.premiumLocked
        ? "# Premium access required for Experiment 5.\n"
        : experiment.available
        ? experiment.code
        : "# Code not loaded yet. Fill the file and rebuild the generated data.";
      const availability = experiment.premiumLocked
        ? "Premium only"
        : experiment.available
        ? "Ready to copy"
        : "Waiting for file";
      const buttonMarkup = experiment.premiumLocked
        ? `<button class="copy-button" type="button" disabled>Premium only</button>`
        : `<button class="copy-button" type="button" data-number="${experiment.number}">
                  Copy code
                </button>`;

      return `
        <article class="message-card" id="experiment-${experiment.number}">
          <div class="message-avatar">P${experiment.number}</div>
          <div class="message-body">
            <div class="message-meta">
              <div class="message-title">
                <span class="experiment-tag">Experiment ${experiment.number}</span>
                <h3>${escapeHtml(experiment.title)}</h3>
              </div>

              <div class="message-actions">
                <span class="availability">${availability}</span>
                ${buttonMarkup}
              </div>
            </div>

            <div class="aim-label">Aim</div>
            <p class="aim-text">${escapeHtml(experiment.aim)}</p>
            <pre class="code-shell"><code class="code-content" data-number="${experiment.number}"></code></pre>
          </div>
        </article>
      `;
    })
    .join("");

  experimentStream.querySelectorAll(".code-content").forEach((block) => {
    const number = Number(block.dataset.number);
    const experiment = items.find((item) => item.number === number);
    if (!experiment) {
      block.textContent = "# Experiment not found.\n";
      return;
    }

    if (experiment.premiumLocked) {
      block.textContent = "# Premium access required for Experiment 5.\n";
      return;
    }

    block.textContent = experiment.available
      ? experiment.code
      : "# Code not loaded yet. Fill the file and rebuild the generated data.\n";
  });

  experimentStream.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", () => {
      const number = Number(button.dataset.number);
      copyExperimentByNumber(number, searchStatus);
    });
  });
}

function filterExperiments(query) {
  const normalisedQuery = query.trim().toLowerCase();
  if (!normalisedQuery) {
    return experiments;
  }

  return experiments.filter((experiment) => {
    const haystack = [
      experiment.number,
      experiment.fileName,
      experiment.title,
      experiment.aim,
      experiment.code,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalisedQuery);
  });
}

function updateSearch(query) {
  const matches = filterExperiments(query);
  renderVaultNav(matches);
  renderExperimentCards(matches);

  if (!query.trim()) {
    searchStatus.textContent = `Showing all ${experiments.length} experiments.`;
    return;
  }

  searchStatus.textContent = `Showing ${matches.length} result(s) for "${query.trim()}".`;
}

function openOverlay() {
  lockOverlay.classList.remove("overlay-hidden");
  lockOverlay.setAttribute("aria-hidden", "false");
  passwordInput.focus();
}

function closeOverlayPanel() {
  lockOverlay.classList.add("overlay-hidden");
  lockOverlay.setAttribute("aria-hidden", "true");
  passwordForm.reset();
  setStatus(passwordStatus, "Password required.", "info");
}

function showVault() {
  quickCopyView.classList.remove("view-active");
  quickCopyView.classList.add("view-hidden");
  vaultView.classList.remove("view-hidden");
  vaultView.classList.add("view-active");
  generatedAt.textContent = `All experiments available.`;
  updateSearch(searchInput.value);
}

function showQuickCopy() {
  vaultView.classList.remove("view-active");
  vaultView.classList.add("view-hidden");
  quickCopyView.classList.remove("view-hidden");
  quickCopyView.classList.add("view-active");
}

quickCopyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const number = Number(quickNumberInput.value);
  copyExperimentByNumber(number, quickStatus);
});

forgotNumberTrigger.addEventListener("click", openOverlay);
closeOverlay.addEventListener("click", closeOverlayPanel);
backToQuickCopy.addEventListener("click", showQuickCopy);

  passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === SPECIAL_PASSWORD) {
    setStatus(passwordStatus, "Premium password accepted. Opening Experiment 5...", "success");
    window.setTimeout(() => {
      window.location.href = SPECIAL_PAGE_URL;
    }, 450);
    return;
  }

  if (enteredPassword !== PASSWORD) {
    setStatus(passwordStatus, "Wrong password. Vault access denied.", "error");
    return;
  }

  closeOverlayPanel();
  showVault();
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateSearch(searchInput.value);
});

searchInput.addEventListener("input", () => {
  updateSearch(searchInput.value);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lockOverlay.classList.contains("overlay-hidden")) {
    closeOverlayPanel();
  }
});

renderQuickButtons();
updateSearch("");
