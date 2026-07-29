from pathlib import Path

root = Path(__file__).resolve().parents[1]
index_path = root / "src/routes/index.tsx"
source = index_path.read_text(encoding="utf-8")

video_block = '''            <video class="media-main" autoplay muted loop playsinline preload="metadata" poster="/assets/portfolio/vitrinno/screen-01.png" aria-label="Home do Vitrinno">
              <source src="/assets/portfolio/vitrinno/screen-01-loop.mp4" type="video/mp4">
            </video>'''

if source.count(video_block) != 1:
    raise RuntimeError("The Vitrinno login video block was not found exactly once")

old_gallery = '''            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-03.png" aria-label="Abrir feed do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-03.png" alt="Feed do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-05.png" aria-label="Abrir player do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-05.png" alt="Player do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-08.png" aria-label="Abrir catalogo do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-08.png" alt="Catálogo do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-12.png" aria-label="Abrir analytics do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-12.png" alt="Analytics do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/screen-15.png" aria-label="Abrir configuracoes do Vitrinno">
                <img src="/assets/portfolio/vitrinno/screen-15.png" alt="Configurações do Vitrinno">
              </button>
            </div>'''

new_gallery = '''            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-feed.webp" aria-label="Abrir feed do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-feed.webp" alt="Feed do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-catalogo.webp" aria-label="Abrir catálogo do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-catalogo.webp" alt="Catálogo do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-studio.webp" aria-label="Abrir studio do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-studio.webp" alt="Studio do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-analytics.webp" aria-label="Abrir analytics do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-analytics.webp" alt="Analytics do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-perfil.jpg" aria-label="Abrir perfil do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-perfil.jpg" alt="Perfil do Vitrinno">
              </button>
            </div>'''

if source.count(old_gallery) != 1:
    raise RuntimeError("The current Vitrinno gallery was not found exactly once")

updated = source.replace(old_gallery, new_gallery, 1)
if updated.count(video_block) != 1:
    raise RuntimeError("The Vitrinno login video changed unexpectedly")

index_path.write_text(updated, encoding="utf-8")
