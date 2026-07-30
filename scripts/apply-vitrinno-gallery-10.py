from __future__ import annotations

import base64
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "src/routes/index.tsx"
ASSET_DIR = ROOT / "public/assets/portfolio/vitrinno"
MESSAGE_B64_PATH = ROOT / "tmp/vitrinno-messages.webp.b64"

VIDEO_BLOCK = '''            <video class="media-main" autoplay muted loop playsinline preload="metadata" poster="/assets/portfolio/vitrinno/screen-01.png" aria-label="Home do Vitrinno">
              <source src="/assets/portfolio/vitrinno/screen-01-loop.mp4" type="video/mp4">
            </video>'''

OLD_GALLERY = '''            <div class="media-grid">
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

NEW_GALLERY = '''            <div class="media-grid">
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-01-feed.png" aria-label="Abrir feed e publicação do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-01-feed.png" alt="Feed e publicação do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-02-hall.png" aria-label="Abrir Hall do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-02-hall.png" alt="Hall do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-03-catalogo.png" aria-label="Abrir catálogo do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-03-catalogo.png" alt="Catálogo do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-04-catalogo-releases.png" aria-label="Abrir releases do catálogo do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-04-catalogo-releases.png" alt="Releases do catálogo do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-05-studio.png" aria-label="Abrir Studio do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-05-studio.png" alt="Studio do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-06-studio-profile.png" aria-label="Abrir perfil do Studio do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-06-studio-profile.png" alt="Perfil do Studio do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-07-mensagens.webp" aria-label="Abrir mensagens do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-07-mensagens.webp" alt="Mensagens do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-08-notificacoes.png" aria-label="Abrir notificações do Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-08-notificacoes.png" alt="Notificações do Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-09-perfil.png" aria-label="Abrir perfil do artista no Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-09-perfil.png" alt="Perfil do artista no Vitrinno">
              </button>
              <button class="media-thumb" data-lightbox="/assets/portfolio/vitrinno/gallery-10-perfil-posts.png" aria-label="Abrir posts do perfil no Vitrinno">
                <img src="/assets/portfolio/vitrinno/gallery-10-perfil-posts.png" alt="Posts do perfil no Vitrinno">
              </button>
            </div>'''

SOURCE_ASSETS = {
    "image.png": "gallery-01-feed.png",
    "image (1).png": "gallery-02-hall.png",
    "image (2).png": "gallery-03-catalogo.png",
    "image (3).png": "gallery-04-catalogo-releases.png",
    "image (4).png": "gallery-05-studio.png",
    "image (5).png": "gallery-06-studio-profile.png",
    "image (8).png": "gallery-08-notificacoes.png",
    "image (6).png": "gallery-09-perfil.png",
    "image (7).png": "gallery-10-perfil-posts.png",
}

OLD_ASSETS = (
    "gallery-feed.webp",
    "gallery-catalogo.webp",
    "gallery-studio.webp",
    "gallery-analytics.webp",
    "gallery-perfil.jpg",
)


def main() -> None:
    source = INDEX_PATH.read_text(encoding="utf-8")

    if source.count(VIDEO_BLOCK) != 1:
        raise RuntimeError("The Vitrinno video block was not found exactly once")
    if source.count(OLD_GALLERY) != 1:
        raise RuntimeError("The current five-image Vitrinno gallery was not found exactly once")

    ASSET_DIR.mkdir(parents=True, exist_ok=True)

    for source_name, destination_name in SOURCE_ASSETS.items():
        source_path = ROOT / source_name
        if not source_path.is_file():
            raise FileNotFoundError(f"Missing uploaded screenshot: {source_name}")
        shutil.copyfile(source_path, ASSET_DIR / destination_name)

    message_data = base64.b64decode(MESSAGE_B64_PATH.read_text(encoding="ascii"))
    if not message_data.startswith(b"RIFF") or b"WEBP" not in message_data[:16]:
        raise RuntimeError("The messages screenshot payload is not a valid WebP file")
    (ASSET_DIR / "gallery-07-mensagens.webp").write_bytes(message_data)

    for old_asset in OLD_ASSETS:
        (ASSET_DIR / old_asset).unlink(missing_ok=True)

    updated = source.replace(OLD_GALLERY, NEW_GALLERY, 1)

    if updated.count(VIDEO_BLOCK) != 1:
        raise RuntimeError("The Vitrinno video changed unexpectedly")
    if updated.count('class="media-thumb"') < source.count('class="media-thumb"') + 5:
        raise RuntimeError("The Vitrinno gallery did not expand from five to ten images")

    INDEX_PATH.write_text(updated, encoding="utf-8")


if __name__ == "__main__":
    main()
