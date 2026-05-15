import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const baseURL = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:4187";
const outDir = join(process.cwd(), "output", "portfolio-qa");
mkdirSync(outDir, { recursive: true });

const requiredExternalProjects = [
  "https://www.felpamusic.com.br",
  "https://www.vitrinno.felpamusic.com.br",
  "https://www.helena-video.felpamusic.com.br",
  "https://www.billie-brain.felpamusic.com.br",
  "https://www.verdant-crm.felpamusic.com.br",
  "https://www.olilocacao.com.br",
];

const browser = await chromium.launch({ headless: true });
const results = [];

async function checkViewport(label, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  await page.goto(baseURL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3200);
  await page.waitForFunction(
    () => document.querySelectorAll(".pcg-card").length >= 7,
    { timeout: 10000 }
  ).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

  const metrics = await page.evaluate(() => {
    const gallery = document.querySelector("#projects-circular-gallery");
    const cards = Array.from(document.querySelectorAll(".pcg-card"));
    const fallbackCards = Array.from(document.querySelectorAll(".gallery-fallback .pcard"));
    const sections = ["felpamusic", "vitrinno", "billie-brain", "verdant", "helena", "oli", "crm"].map((id) => Boolean(document.getElementById(id)));
    const externalProjectLinks = Array.from(document.querySelectorAll("#projects-circular-gallery a[href^='https://']")).map((a) => ({
      href: a.getAttribute("href"),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel"),
      label: a.textContent?.trim().replace(/\s+/g, " "),
    }));
    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      galleryVisible: gallery ? getComputedStyle(gallery).display !== "none" && gallery.getBoundingClientRect().height > 200 : false,
      pcgCards: cards.length,
      fallbackCards: fallbackCards.length,
      requiredSectionsPresent: sections.every(Boolean),
      projectLinks: Array.from(document.querySelectorAll('a[href^="#"]')).map((a) => a.getAttribute("href")),
      externalProjectLinks,
    };
  });

  const screenshot = join(outDir, `${label}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });
  await context.close();
  results.push({ label, screenshot, consoleErrors, ...metrics });
}

await checkViewport("desktop", 1440, 1000);
await checkViewport("tablet", 820, 1100);
await checkViewport("mobile", 390, 844);
await browser.close();

writeFileSync(join(outDir, "qa-portfolio-visual.json"), JSON.stringify({ baseURL, generatedAt: new Date().toISOString(), results }, null, 2));
console.log(JSON.stringify(results, null, 2));

const failed = results.some((item) => {
  const links = item.externalProjectLinks.map((link) => link.href);
  const hasRequiredLinks = requiredExternalProjects.every((href) => links.includes(href));
  const externalLinksSafe = item.externalProjectLinks.every((link) => link.target === "_blank" && (link.rel || "").includes("noopener") && (link.rel || "").includes("noreferrer"));
  return item.consoleErrors.length || item.scrollWidth > item.innerWidth + 2 || !item.galleryVisible || item.pcgCards < 7 || !item.requiredSectionsPresent || !hasRequiredLinks || !externalLinksSafe;
});
if (failed) process.exitCode = 1;
