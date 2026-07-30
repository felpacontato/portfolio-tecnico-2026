const HELENA_LOCAL_BASE = "/assets/portfolio/helena";
const HELENA_RAW_BASE = "https://raw.githubusercontent.com/felpacontato/portfolio-tecnico-2026/main";

const helenaScreenshots = [
  ["gallery-01.png", "Capturar.PNG", "Captura 1 do Helena Video"],
  ["gallery-02.png", "Capturar2.PNG", "Captura 2 do Helena Video"],
  ["gallery-03.png", "Capturar3.PNG", "Captura 3 do Helena Video"],
  ["gallery-04.png", "Capturar4.PNG", "Captura 4 do Helena Video"],
  ["gallery-05.png", "Capturar5.PNG", "Captura 5 do Helena Video"],
  ["gallery-06.png", "Capturar6.PNG", "Captura 6 do Helena Video"],
  ["gallery-07.png", "Capturar7.PNG", "Captura 7 do Helena Video"],
  ["gallery-08.png", "Capturar8.PNG", "Captura 8 do Helena Video"],
  ["gallery-09.png", "Capturar9.PNG", "Captura 9 do Helena Video"],
];

function rawAssetUrl(filename) {
  return `${HELENA_RAW_BASE}/${encodeURIComponent(filename)}`;
}

function applyImageFallback(image, button, rawFilename) {
  image.addEventListener(
    "error",
    () => {
      if (image.dataset.rawFallbackApplied === "true") return;
      image.dataset.rawFallbackApplied = "true";
      const fallback = rawAssetUrl(rawFilename);
      image.src = fallback;
      button.dataset.lightbox = fallback;
    },
    { once: true },
  );
}

function buildGallery(grid) {
  grid.innerHTML = "";

  helenaScreenshots.forEach(([localFilename, rawFilename, alt], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "media-thumb";
    button.dataset.lightbox = `${HELENA_LOCAL_BASE}/${localFilename}`;
    button.setAttribute("aria-label", `Abrir captura ${index + 1} do Helena Video`);

    const image = document.createElement("img");
    image.src = `${HELENA_LOCAL_BASE}/${localFilename}`;
    image.alt = alt;
    image.loading = "lazy";
    applyImageFallback(image, button, rawFilename);

    button.append(image);
    grid.append(button);
  });
}

function createExecutionVideo() {
  const wrapper = document.createElement("div");
  wrapper.className = "section-shell reveal helena-showcase-video is-visible";
  wrapper.style.marginTop = "clamp(42px,6vw,88px)";

  const video = document.createElement("video");
  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.poster = `${HELENA_LOCAL_BASE}/gallery-01.png`;
  video.setAttribute("aria-label", "Demonstração completa da plataforma Helena Video");
  video.style.cssText = "display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border:1px solid rgba(139,255,191,.22);border-radius:clamp(18px,2.4vw,30px);background:#020706;box-shadow:0 30px 90px rgba(0,0,0,.48),0 0 60px rgba(44,255,145,.09)";

  const source = document.createElement("source");
  source.src = `${HELENA_LOCAL_BASE}/helena-video-execucao.mp4`;
  source.type = "video/mp4";
  video.append(source);
  video.append(document.createTextNode("Seu navegador não suporta reprodução de vídeo."));

  let fallbackApplied = false;
  video.addEventListener("error", () => {
    if (fallbackApplied) return;
    fallbackApplied = true;
    source.src = rawAssetUrl("helena-vdeo-execusão.mp4");
    video.poster = rawAssetUrl("Capturar.PNG");
    video.load();
  });

  const posterProbe = new Image();
  posterProbe.onerror = () => {
    video.poster = rawAssetUrl("Capturar.PNG");
  };
  posterProbe.src = video.poster;

  wrapper.append(video);
  return wrapper;
}

function applyHelenaPortfolioUpdate() {
  const article = document.querySelector("#helena");
  const gallery = article?.querySelector(".project-media .media-grid");
  if (!article || !gallery) return false;

  buildGallery(gallery);

  let showcase = article.querySelector(".helena-showcase-video");
  if (!showcase) showcase = createExecutionVideo();
  article.append(showcase);

  return true;
}

if (!applyHelenaPortfolioUpdate()) {
  window.addEventListener("DOMContentLoaded", applyHelenaPortfolioUpdate, { once: true });
}
