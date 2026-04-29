import { cp, mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const srcDir = join(root, "src");
const publicDir = join(root, "public");
const distDir = join(root, "dist");
const checkOnly = process.argv.includes("--check");

const required = [
  "src/index.html",
  "src/styles.css",
  "src/main.js",
  "public/assets/felpamusic/felpamusic-main.mp4",
  "public/assets/felpamusic/projects.png",
  "public/assets/oli/home.png"
];

const forbiddenPatterns = [
  /Felpa060695@/i,
  /Ravi123@/i,
  /root@72\.61\.58\.113/i,
  /SUPABASE_SERVICE_ROLE_KEY\s*=/i,
  /ASAAS_CAUCAO_API_KEY\s*=/i
];

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "dist" || entry.name === ".vercel" || entry.name === "qa" || entry.name === "qa-copy") {
        continue;
      }
      files.push(...await walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

for (const rel of required) {
  const full = join(root, rel);
  if (!await exists(full)) {
    throw new Error(`Arquivo obrigatório ausente: ${rel}`);
  }
}

const textFiles = (await walk(root)).filter((file) => {
  return /\.(html|css|js|json|md|txt|xml)$/i.test(file);
});

for (const file of textFiles) {
  const content = await readFile(file, "utf8");
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      throw new Error(`Possível segredo encontrado em ${file}`);
    }
  }
}

if (checkOnly) {
  console.log("check ok");
  process.exit(0);
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(srcDir, distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true });

console.log(`build ok: ${distDir}`);
