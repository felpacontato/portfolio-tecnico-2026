import { jonnyQuickQuestions, localJonnyReply } from "/jonny-knowledge.js";
import { portfolioLanguages, portfolioMeta, portfolioTranslations } from "/portfolio-i18n.js";

const header = document.querySelector("[data-header]");
const languageSwitcher = document.querySelector("[data-language-switcher]");
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
const blogCarousel = document.querySelector("[data-blog-carousel]");
const spotlightCardSelector = [
  ".cap-card",
  ".principle",
  ".pcard",
  ".proof-grid > div",
  ".detail-block",
  ".media-thumb",
  ".api-grid > span",
  ".capability",
  ".blog-grid > a",
  ".contact-card",
].join(",");

const supportedLanguages = Object.keys(portfolioLanguages);
const translationIndex = new Map(
  Object.entries(portfolioTranslations).map(([key, value]) => [key.normalize("NFC"), value])
);
let activeLanguage = localStorage.getItem("portfolio:language") || "pt";
if (!supportedLanguages.includes(activeLanguage)) activeLanguage = "pt";

function getOriginalText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.__portfolioOriginalText ??= node.nodeValue;
    return node.__portfolioOriginalText;
  }

  if (node instanceof HTMLElement) {
    node.dataset.i18nOriginal ??= node.textContent;
    return node.dataset.i18nOriginal;
  }

  return "";
}

function translateValue(value, language) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  if (!clean) return value;
  if (language === "pt") return clean;
  return translationIndex.get(clean.normalize("NFC"))?.[language] || clean;
}

function translateTextNodes(root, language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script, style, textarea, code, pre")) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const original = getOriginalText(node);
    const prefix = String(original || "").match(/^\s*/)?.[0] || "";
    const suffix = String(original || "").match(/\s*$/)?.[0] || "";
    const originalTrimmed = String(original || "").replace(/\s+/g, " ").trim();
    const translated = translateValue(originalTrimmed, language);
    node.nodeValue = `${prefix}${translated}${suffix}`;
  });
}

function translateAttributes(language) {
  document.querySelectorAll("[aria-label], [placeholder], [title], img[alt]").forEach((element) => {
    ["aria-label", "placeholder", "title", "alt"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const key = `i18nOriginal${attribute.replace(/[^a-z]/gi, "")}`;
      element.dataset[key] ??= element.getAttribute(attribute) || "";
      element.setAttribute(attribute, translateValue(element.dataset[key], language));
    });
  });
}

function syncDocumentMeta(language) {
  const meta = portfolioMeta[language] || portfolioMeta.pt;
  document.title = meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.ogDescription);
}

function syncLanguageSwitcher(language) {
  languageSwitcher?.querySelectorAll("[data-language-option]").forEach((button) => {
    const isActive = button.getAttribute("data-language-option") === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const currentLanguage = portfolioLanguages[activeLanguage];
  if (languageSwitcher && currentLanguage) {
    languageSwitcher.setAttribute("aria-label", currentLanguage.aria);
  }
}

function applyPortfolioLanguage(language) {
  activeLanguage = supportedLanguages.includes(language) ? language : "pt";
  localStorage.setItem("portfolio:language", activeLanguage);
  document.documentElement.lang = portfolioLanguages[activeLanguage].htmlLang;
  syncDocumentMeta(activeLanguage);
  translateTextNodes(document.body, activeLanguage);
  translateAttributes(activeLanguage);
  syncLanguageSwitcher(activeLanguage);
}

function initLanguageSwitcher() {
  languageSwitcher?.querySelectorAll("[data-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      applyPortfolioLanguage(button.getAttribute("data-language-option") || "pt");
    });
  });

  applyPortfolioLanguage(activeLanguage);

  const observer = new MutationObserver((mutations) => {
    if (activeLanguage === "pt") return;
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          translateTextNodes(node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement || document.body, activeLanguage);
          translateAttributes(activeLanguage);
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

initLanguageSwitcher();

function initSpotlightCards() {
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.querySelectorAll(spotlightCardSelector).forEach((card) => {
    if (card.dataset.spotlightReady === "true") return;
    card.dataset.spotlightReady = "true";
    card.classList.add("spotlight-card");

    const glow = document.createElement("span");
    glow.className = "spotlight-card-glow";
    glow.setAttribute("aria-hidden", "true");
    card.prepend(glow);

    card.addEventListener("focusin", () => {
      card.style.setProperty("--spotlight-opacity", "0.78");
      card.style.setProperty("--spotlight-x", "50%");
      card.style.setProperty("--spotlight-y", "38%");
    });

    card.addEventListener("focusout", () => {
      card.style.setProperty("--spotlight-opacity", "0");
    });

    if (!supportsHover) return;

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--spotlight-x", `${x}%`);
      card.style.setProperty("--spotlight-y", `${y}%`);
      card.style.setProperty("--spotlight-opacity", "1");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--spotlight-opacity", "0");
    });
  });
}

initSpotlightCards();

document.querySelectorAll("[data-blog-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!blogCarousel) return;
    const direction = Number(button.getAttribute("data-blog-scroll") || "1");
    blogCarousel.scrollBy({
      left: direction * Math.min(blogCarousel.clientWidth * 0.9, 520),
      behavior: "smooth",
    });
  });
});

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
let jonnyAutoOpened = false;

function setJonnyOpen(isOpen, options = {}) {
  if (!jonnyPanel || !jonnyToggle) return;

  const shouldFocus = options.focus !== false;
  jonnyPanel.hidden = !isOpen;
  jonnyToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen && shouldFocus) {
    window.setTimeout(() => jonnyInput?.focus(), 80);
  } else if (!isOpen) {
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
    jonnySubmit.textContent = isPending ? "..." : translateValue("Enviar", activeLanguage);
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

window.addEventListener("scroll", () => {
  if (jonnyAutoOpened || !jonnyPanel?.hidden || window.scrollY < 420) return;
  jonnyAutoOpened = true;
  setJonnyOpen(true, { focus: false });
}, { passive: true });

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && jonnyPanel && !jonnyPanel.hidden) {
    setJonnyOpen(false);
  }
});

// ===== Matrix rain canvas behind profile photo =====
(function initMatrixBg() {
  const canvases = document.querySelectorAll("canvas[data-matrix-bg]");
  canvases.forEach((canvas) => {
    if (canvas.dataset.matrixReady === "true") return;
    canvas.dataset.matrixReady = "true";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const fontSize = 14;
    const speed = 0.64;
    let columns = 0;
    let drops = [];
    let raf = 0;
    let last = 0;
    let frameWidth = 0;
    let frameHeight = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      frameWidth = Math.max(1, Math.floor(rect.width));
      frameHeight = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.max(1, Math.floor(frameWidth * dpr));
      canvas.height = Math.max(1, Math.floor(frameHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.floor(frameWidth / fontSize));
      drops = Array.from({ length: columns }, () => Math.random() * -24);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const tick = (time) => {
      raf = requestAnimationFrame(tick);
      if (time - last < 64) return;
      last = time;

      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, frameWidth, frameHeight);

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;

      for (let i = 0; i < columns; i += 1) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const char = chars[Math.floor(Math.random() * chars.length)] || "0";

        ctx.fillStyle = "rgba(160,255,214,0.38)";
        ctx.fillText(char, x, y);
        ctx.fillStyle = "rgba(44,255,145,0.18)";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)] || "1", x, y - fontSize);

        if (y > frameHeight && Math.random() > 0.979) {
          drops[i] = Math.random() * -12;
        }

        drops[i] += speed;
      }
    };

    raf = requestAnimationFrame(tick);

    window.addEventListener("beforeunload", () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    }, { once: true });
  });
})();

// ===== Auto-scrolling image slider / circular gallery (duplicate items for seamless loop) =====
(function initLoops() {
  document.querySelectorAll("[data-auto-slider], .circular-gallery .cg-track").forEach((track) => {
    if (track.dataset.loopReady === "true") return;
    const items = Array.from(track.children);
    items.forEach((it) => track.appendChild(it.cloneNode(true)));
    track.dataset.loopReady = "true";
  });
})();
