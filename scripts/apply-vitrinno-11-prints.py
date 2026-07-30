from pathlib import Path

INDEX_PATH = Path("src/routes/index.tsx")
text = INDEX_PATH.read_text(encoding="utf-8")

video_poster = 'poster="/assets/portfolio/vitrinno/screen-01.png"'
video_source = '<source src="/assets/portfolio/vitrinno/screen-01-loop.mp4" type="video/mp4">'

if video_poster not in text or video_source not in text:
    raise SystemExit("Protected Vitrinno login video markup was not found exactly as expected.")

old_block = '''            <div class="media-grid">
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

items = [
    ("01-mensagens.avif", "Mensagens do Vitrinno"),
    ("02-studio-lancamentos.avif", "Studio — lançamentos recentes"),
    ("03-catalogo-cards.avif", "Catálogo — cards de releases"),
    ("04-feed.avif", "Feed do Vitrinno"),
    ("05-catalogo-visao-geral.avif", "Catálogo — visão geral"),
    ("06-hall.avif", "Hall do Vitrinno"),
    ("07-configuracoes.avif", "Configurações do Vitrinno"),
    ("08-studio-perfil.avif", "Studio — perfil do artista"),
    ("09-perfil-visao-geral.avif", "Perfil — visão geral"),
    ("10-perfil-posts.avif", "Perfil — publicações"),
    ("11-notificacoes.avif", "Notificações do Vitrinno"),
]

buttons = []
for filename, label in items:
    src = f"/assets/portfolio/vitrinno/{filename}"
    buttons.append(
        f'              <button class="media-thumb" data-lightbox="{src}" aria-label="Abrir {label}">\n'
        f'                <img src="{src}" alt="{label}" loading="lazy" decoding="async">\n'
        f'              </button>'
    )

new_block = '            <div class="media-grid">\n' + "\n".join(buttons) + '\n            </div>'

if text.count(old_block) != 1:
    raise SystemExit(f"Expected exactly one old Vitrinno gallery block, found {text.count(old_block)}.")

updated = text.replace(old_block, new_block)

old_refs = [
    "gallery-feed.webp",
    "gallery-catalogo.webp",
    "gallery-studio.webp",
    "gallery-analytics.webp",
    "gallery-perfil.jpg",
]
for old_ref in old_refs:
    if old_ref in updated:
        raise SystemExit(f"Old Vitrinno screenshot reference remains: {old_ref}")

for filename, _ in items:
    ref = f"/assets/portfolio/vitrinno/{filename}"
    if updated.count(ref) != 2:
        raise SystemExit(f"Expected two references for {filename}, found {updated.count(ref)}.")

if updated.count(video_poster) != text.count(video_poster):
    raise SystemExit("Protected Vitrinno video poster changed.")
if updated.count(video_source) != text.count(video_source):
    raise SystemExit("Protected Vitrinno video source changed.")

INDEX_PATH.write_text(updated, encoding="utf-8")
print("Vitrinno gallery updated with 11 screenshots; login video markup preserved.")
