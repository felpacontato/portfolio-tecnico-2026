from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "src/routes/index.tsx"
QA_PATH = ROOT / "scripts/qa-portfolio-visual.mjs"
PACKAGE_PATH = ROOT / "package.json"

index_source = INDEX_PATH.read_text(encoding="utf-8")

index_source, gallery_items_removed = re.subn(
    r"\nconst GALLERY_ITEMS = \[.*?\n\];\n\n(?=const BODY_HTML)",
    "\n",
    index_source,
    count=1,
    flags=re.DOTALL,
)
if gallery_items_removed != 1:
    raise RuntimeError("Expected to remove exactly one dead GALLERY_ITEMS declaration")

old_gallery_open = """        <div id=\"projects-circular-gallery\" class=\"reveal\" style=\"height:640px;position:relative;width:100%;margin-top:32px\">\n          <div id=\"projects-circular-react\" aria-label=\"Projetos em galeria circular\"></div>\n          <div class=\"index-list project-card-grid gallery-fallback\" aria-label=\"Lista de projetos\">"""
new_gallery_open = """        <div class=\"index-list project-card-grid reveal\" aria-label=\"Lista de projetos\">"""
if old_gallery_open not in index_source:
    raise RuntimeError("Circular gallery wrapper was not found")
index_source = index_source.replace(old_gallery_open, new_gallery_open, 1)

old_gallery_close = """          </div>\n        </div>\n      </section>\n\n      <section class=\"image-slider reveal\""""
new_gallery_close = """        </div>\n      </section>\n\n      <section class=\"image-slider reveal\""""
if old_gallery_close not in index_source:
    raise RuntimeError("Circular gallery closing wrapper was not found")
index_source = index_source.replace(old_gallery_close, new_gallery_close, 1)

for dead_marker in ("GALLERY_ITEMS", "projects-circular-gallery", "projects-circular-react", "gallery-fallback"):
    if dead_marker in index_source:
        raise RuntimeError(f"Dead gallery marker still present: {dead_marker}")

if index_source.count('class=\"pcard\"') != 9:
    raise RuntimeError("The canonical project gallery must contain exactly nine cards")

INDEX_PATH.write_text(index_source, encoding="utf-8")

for relative_path in (
    "src/routes/api/jonny.ts",
    "src/components/CircularGallery.tsx",
    "src/components/CircularGallery.jsx",
):
    candidate = ROOT / relative_path
    if candidate.exists():
        candidate.unlink()

qa_source = r'''import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const baseURL = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:4187";
const outDir = join(process.cwd(), "output", "portfolio-qa");
mkdirSync(outDir, { recursive: true });

const requiredExternalProjects = [
  "https://www.felpamusic.com.br",
  "https://www.vitrinno.felpamusic.com.br",
  "https://www.helena-video.felpamusic.com.br",
  "https://www.lunna-helena-universe.felpamusic.com.br",
  "https://www.billie-brain.felpamusic.com.br",
  "https://www.verdant-crm.felpamusic.com.br",
  "https://www.vitaey.felpamusic.com.br",
  "https://www.olilocacao.com.br",
];

const requiredSections = [
  "felpamusic",
  "vitrinno",
  "helena",
  "lunna-helena",
  "billie-brain",
  "verdant",
  "vitaey",
  "oli",
  "crm",
];

const browser = await chromium.launch({ headless: true });
const results = [];

async function checkViewport(label, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3200);
  await page.waitForFunction(
    () => document.querySelectorAll("#projetos .project-card-grid .pcard").length === 9,
    { timeout: 10000 },
  );
  await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

  const metrics = await page.evaluate((sectionIds) => {
    const gallery = document.querySelector("#projetos .project-card-grid");
    const cards = Array.from(document.querySelectorAll("#projetos .project-card-grid .pcard"));
    const externalProjectLinks = cards
      .filter((card) => card.getAttribute("href")?.startsWith("https://"))
      .map((card) => ({
        href: card.getAttribute("href"),
        target: card.getAttribute("target"),
        rel: card.getAttribute("rel"),
        label: card.textContent?.trim().replace(/\s+/g, " "),
      }));

    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      galleryVisible: gallery
        ? getComputedStyle(gallery).display !== "none" && gallery.getBoundingClientRect().height > 200
        : false,
      projectCards: cards.length,
      visibleCards: cards.filter((card) => card.getBoundingClientRect().height > 100).length,
      deadCircularNodes: document.querySelectorAll(
        "#projects-circular-gallery, #projects-circular-react, .pcg-card, .gallery-fallback",
      ).length,
      requiredSectionsPresent: sectionIds.every((id) => Boolean(document.getElementById(id))),
      crmAnchorPresent: Boolean(document.querySelector('#projetos .project-card-grid a[href="#crm"]')),
      externalProjectLinks,
    };
  }, requiredSections);

  const screenshot = join(outDir, `${label}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });
  await context.close();
  results.push({ label, screenshot, consoleErrors, ...metrics });
}

try {
  await checkViewport("desktop", 1440, 1000);
  await checkViewport("tablet", 820, 1100);
  await checkViewport("mobile", 390, 844);
} finally {
  await browser.close();
}

writeFileSync(
  join(outDir, "qa-portfolio-visual.json"),
  JSON.stringify({ baseURL, generatedAt: new Date().toISOString(), results }, null, 2),
);
console.log(JSON.stringify(results, null, 2));

const failed = results.some((item) => {
  const links = item.externalProjectLinks.map((link) => link.href);
  const hasRequiredLinks = requiredExternalProjects.every((href) => links.includes(href));
  const externalLinksSafe = item.externalProjectLinks.every(
    (link) =>
      link.target === "_blank" &&
      (link.rel || "").includes("noopener") &&
      (link.rel || "").includes("noreferrer"),
  );

  return (
    item.consoleErrors.length > 0 ||
    item.scrollWidth > item.innerWidth + 2 ||
    item.bodyScrollWidth > item.innerWidth + 2 ||
    !item.galleryVisible ||
    item.projectCards !== 9 ||
    item.visibleCards !== 9 ||
    item.deadCircularNodes !== 0 ||
    !item.requiredSectionsPresent ||
    !item.crmAnchorPresent ||
    !hasRequiredLinks ||
    !externalLinksSafe
  );
});

if (failed) process.exitCode = 1;
'''
QA_PATH.write_text(qa_source, encoding="utf-8")

package_data = json.loads(PACKAGE_PATH.read_text(encoding="utf-8"))
package_data.setdefault("scripts", {})["qa:visual"] = "node scripts/qa-portfolio-visual.mjs"
PACKAGE_PATH.write_text(
    json.dumps(package_data, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)

print("Portfolio production-alignment cleanup applied successfully")
