const payload = window.SECRET_FIFTH || null;

const title = document.getElementById("title");
const tagline = document.getElementById("tagline");
const helperLabel = document.getElementById("helper-label");
const fileLabel = document.getElementById("file-label");
const fileSummary = document.getElementById("file-summary");
const aimText = document.getElementById("aim-text");
const summaryText = document.getElementById("summary-text");
const stepsList = document.getElementById("steps-list");
const notesList = document.getElementById("notes-list");
const updatedAt = document.getElementById("updated-at");
const codeBlock = document.getElementById("code-block");
const copyButton = document.getElementById("copy-button");
const copyStatus = document.getElementById("copy-status");

function normaliseCode(value) {
  return String(value || "").replace(/\r\n?/g, "\n");
}

function setStatus(message, type = "info") {
  copyStatus.textContent = message;
  copyStatus.className = `status-chip ${type}`;
}

function renderList(target, items, fallbackText) {
  target.innerHTML = "";
  const values = Array.isArray(items) && items.length ? items : [fallbackText];

  values.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    target.appendChild(listItem);
  });
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

function renderPayload() {
  if (!payload) {
    title.textContent = "Experiment 5";
    tagline.textContent = "The generated data file is missing.";
    aimText.textContent = "Aim is not available because fifth.generated.js was not loaded.";
    summaryText.textContent = "Run build_secret_site.py and upload the generated files again.";
    renderList(stepsList, [], "No steps available until the generated file is rebuilt.");
    renderList(notesList, [], "No notes available until the generated file is rebuilt.");
    updatedAt.textContent = "Offline";
    fileLabel.textContent = "5.py";
    fileSummary.textContent = "5.py";
    codeBlock.textContent = "# fifth.generated.js is missing.\n";
    copyButton.disabled = true;
    setStatus("Generated data missing. Rebuild the dedicated page files.", "error");
    return;
  }

  const code = payload.available
    ? normaliseCode(payload.code)
    : "# 5.py is empty or missing. Update the file and rerun build_secret_site.py.\n";

  document.title = payload.title || "Experiment 5";
  title.textContent = payload.title || "Experiment 5";
  tagline.textContent = payload.tagline || "Dedicated page for the fifth experiment.";
  helperLabel.textContent = payload.helperLabel || "Helped by anonymous friend";
  fileLabel.textContent = payload.fileName || "5.py";
  fileSummary.textContent = payload.fileName || "5.py";
  aimText.textContent = payload.aim || "Aim is not available yet.";
  summaryText.textContent = payload.summary || "Summary is not available yet.";
  updatedAt.textContent = "Live";
  codeBlock.textContent = code;

  renderList(stepsList, payload.steps, "How to perform steps are not added yet.");
  renderList(notesList, payload.notes, "No viva notes added yet.");

  copyButton.disabled = !payload.available;
  setStatus(
    payload.available
      ? `${payload.fileName || "5.py"} is ready. Copy when needed.`
      : "5.py is empty or missing. Rebuild the dedicated page after updating the file.",
    payload.available ? "success" : "error"
  );
}

copyButton.addEventListener("click", async () => {
  if (!(payload && payload.available)) {
    setStatus("There is no code to copy yet.", "error");
    return;
  }

  const copied = await copyText(codeBlock.textContent);
  if (!copied) {
    setStatus("Clipboard copy failed in this browser.", "error");
    return;
  }

  setStatus(`${payload.fileName || "5.py"} copied with indentation preserved.`, "success");
});

renderPayload();
