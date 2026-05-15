import { jonnyQuickQuestions, localJonnyReply } from "/jonny-knowledge.js";

const header = document.querySelector("[data-header]");
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
