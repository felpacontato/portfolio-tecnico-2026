import { jonnyQuickQuestions, localJonnyReply } from "./jonny-knowledge.js";

const header = document.querySelector("[data-header]");
const oliSection = document.querySelector("#oli");
const helenaSection = document.querySelector("#helena");
const revealNodes = document.querySelectorAll(".reveal");
const lightboxRoot = document.querySelector("[data-lightbox-root]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const jonnyPanel = document.querySelector("[data-jonny-panel]");
const jonnyToggle = document.querySelector("[data-jonny-toggle]");
const jonnyClose = document.querySelector("[data-jonny-close]");
const jonnyMessagesRoot = document.querySelector("[data-jonny-messages]");
const jonnyPromptsRoot = document.querySelector("[data-jonny-prompts]");
const jonnyForm = document.querySelector("[data-jonny-form]");
const jonnyInput = document.querySelector("[data-jonny-input]");
const jonnySubmit = document.querySelector("[data-jonny-submit]");

const exactPortfolioPrints = {
  "": "/assets/exact-pages/portfolio-1.png",
  "#home": "/assets/exact-pages/portfolio-1.png",
  "#skills": "/assets/exact-pages/portfolio-2.png",
  "#projects": "/assets/exact-pages/portfolio-3.png",
  "#vitrinno": "/assets/exact-pages/portfolio-4.png",
  "#felpamusic": "/assets/exact-pages/portfolio-5.png",
  "#contact": "/assets/exact-pages/portfolio-6.png",
  "#ref-1": "/assets/exact-pages/portfolio-1.png",
  "#ref-2": "/assets/exact-pages/portfolio-2.png",
  "#ref-3": "/assets/exact-pages/portfolio-3.png",
  "#ref-4": "/assets/exact-pages/portfolio-4.png",
  "#ref-5": "/assets/exact-pages/portfolio-5.png",
  "#ref-6": "/assets/exact-pages/portfolio-6.png",
  "#improved-1": "/assets/exact-pages/portfolio-improved-1.png",
  "#improved-2": "/assets/exact-pages/portfolio-improved-2.png",
  "#improved-3": "/assets/exact-pages/portfolio-improved-3.png",
  "#improved-4": "/assets/exact-pages/portfolio-improved-4.png",
  "#improved-5": "/assets/exact-pages/portfolio-improved-5.png",
  "#improved-6": "/assets/exact-pages/portfolio-improved-6.png"
};

const exactOverlay = document.createElement("div");
const exactOverlayImage = document.createElement("img");
exactOverlay.className = "exact-print-overlay";
exactOverlay.setAttribute("aria-hidden", "true");
exactOverlayImage.alt = "";
exactOverlayImage.draggable = false;
exactOverlay.append(exactOverlayImage);
document.body.append(exactOverlay);

function syncExactPrintOverlay() {
  const src = exactPortfolioPrints[window.location.hash] ?? exactPortfolioPrints[""];
  exactOverlayImage.src = src;
  document.documentElement.classList.add("has-exact-print-overlay");
  window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
}

syncExactPrintOverlay();
window.addEventListener("hashchange", syncExactPrintOverlay);
window.setTimeout(syncExactPrintOverlay, 80);

if (
  oliSection &&
  helenaSection &&
  (oliSection.compareDocumentPosition(helenaSection) & Node.DOCUMENT_POSITION_FOLLOWING)
) {
  oliSection.before(helenaSection);
}

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-lightbox");
    const img = button.querySelector("img");
    if (!src || !lightboxRoot || !lightboxImg) return;

    lightboxImg.src = src;
    lightboxImg.alt = img?.alt || "Imagem ampliada do projeto";
    lightboxRoot.hidden = false;
    lightboxClose?.focus();
  });
});

function closeLightbox() {
  if (!lightboxRoot || !lightboxImg) return;
  lightboxRoot.hidden = true;
  lightboxImg.src = "";
}

lightboxClose?.addEventListener("click", closeLightbox);
lightboxRoot?.addEventListener("click", (event) => {
  if (event.target === lightboxRoot) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightboxRoot && !lightboxRoot.hidden) {
    closeLightbox();
  }
});

const jonnyHistory = [];
let jonnyPending = false;

function setJonnyOpen(isOpen) {
  if (!jonnyPanel || !jonnyToggle) return;

  jonnyPanel.hidden = !isOpen;
  jonnyToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    window.setTimeout(() => jonnyInput?.focus(), 80);
  } else {
    jonnyToggle.focus();
  }
}

function appendJonnyMessage(role, text, options = {}) {
  if (!jonnyMessagesRoot) return null;

  const message = document.createElement("div");
  message.className = `jonny-message ${role === "user" ? "jonny-message-user" : "jonny-message-bot"}`;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.append(paragraph);

  if (options.loading) {
    message.classList.add("is-loading");
    message.setAttribute("aria-label", "Jonny esta respondendo");
  }

  jonnyMessagesRoot.append(message);
  jonnyMessagesRoot.scrollTop = jonnyMessagesRoot.scrollHeight;
  return message;
}

function setJonnyPending(isPending) {
  jonnyPending = isPending;
  if (jonnySubmit) {
    jonnySubmit.disabled = isPending;
    jonnySubmit.textContent = isPending ? "..." : "Enviar";
  }
}

async function askJonny(question) {
  const cleanQuestion = String(question || "").trim();
  if (!cleanQuestion || jonnyPending) return;

  setJonnyOpen(true);
  appendJonnyMessage("user", cleanQuestion);
  jonnyHistory.push({ role: "user", content: cleanQuestion });
  setJonnyPending(true);

  const loadingMessage = appendJonnyMessage("assistant", "Pensando...", { loading: true });

  try {
    const response = await fetch("/api/jonny", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: jonnyHistory.slice(-8)
      })
    });

    if (!response.ok) {
      throw new Error(`Jonny API failed: ${response.status}`);
    }

    const payload = await response.json();
    const reply = payload?.reply || localJonnyReply(cleanQuestion);

    loadingMessage?.remove();
    appendJonnyMessage("assistant", reply);
    jonnyHistory.push({ role: "assistant", content: reply });
  } catch {
    const reply = localJonnyReply(cleanQuestion);
    loadingMessage?.remove();
    appendJonnyMessage("assistant", reply);
    jonnyHistory.push({ role: "assistant", content: reply });
  } finally {
    setJonnyPending(false);
    if (jonnyInput) jonnyInput.value = "";
  }
}

jonnyQuickQuestions.forEach((question) => {
  if (!jonnyPromptsRoot) return;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = question;
  button.addEventListener("click", () => askJonny(question));
  jonnyPromptsRoot.append(button);
});

jonnyToggle?.addEventListener("click", () => setJonnyOpen(Boolean(jonnyPanel?.hidden)));
jonnyClose?.addEventListener("click", () => setJonnyOpen(false));
jonnyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  askJonny(jonnyInput?.value);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && jonnyPanel && !jonnyPanel.hidden) {
    setJonnyOpen(false);
  }
});
