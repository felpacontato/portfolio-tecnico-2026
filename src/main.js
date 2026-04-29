const header = document.querySelector("[data-header]");
const revealNodes = document.querySelectorAll(".reveal");
const lightboxRoot = document.querySelector("[data-lightbox-root]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

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
