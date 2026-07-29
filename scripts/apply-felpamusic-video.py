from pathlib import Path

root = Path(__file__).resolve().parents[1]
index_path = root / "src/routes/index.tsx"
video_path = root / "public/assets/portfolio/felpamusic/Felpamusic-video-port-10x.mp4"

if not video_path.exists():
    raise RuntimeError(f"Uploaded video not found: {video_path}")

source = index_path.read_text(encoding="utf-8")
if "felpamusic-showcase-video" in source:
    raise RuntimeError("FelpaMusic showcase video is already present")

needle = '''          </div>
        </div>
      </article>

      <article id="vitrinno" class="project-section">'''

replacement = '''          </div>
        </div>

        <div class="section-shell reveal felpamusic-showcase-video" style="margin-top:clamp(42px,6vw,88px)">
          <video
            controls
            playsinline
            preload="metadata"
            poster="/assets/portfolio/felpamusic/screen-01.png"
            aria-label="Demonstração completa da plataforma FelpaMusic"
            style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border:1px solid rgba(139,255,191,.22);border-radius:clamp(18px,2.4vw,30px);background:#020706;box-shadow:0 30px 90px rgba(0,0,0,.48),0 0 60px rgba(44,255,145,.09)"
          >
            <source src="/assets/portfolio/felpamusic/Felpamusic-video-port-10x.mp4" type="video/mp4">
            Seu navegador não suporta reprodução de vídeo.
          </video>
        </div>
      </article>

      <article id="vitrinno" class="project-section">'''

if source.count(needle) != 1:
    raise RuntimeError("Could not identify the end of the FelpaMusic section exactly once")

index_path.write_text(source.replace(needle, replacement, 1), encoding="utf-8")
