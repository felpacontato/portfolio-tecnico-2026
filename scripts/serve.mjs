import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT || 4173);
const root = resolve(fileURLToPath(new URL("../dist", import.meta.url)));

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

createServer(async (req, res) => {
  try {
    const cleanUrl = decodeURIComponent((req.url || "/").split("?")[0]);
    const filePath = join(root, cleanUrl === "/" ? "index.html" : cleanUrl);
    const info = await stat(filePath);
    const finalPath = info.isDirectory() ? join(filePath, "index.html") : filePath;
    const body = await readFile(finalPath);
    res.writeHead(200, { "content-type": types[extname(finalPath)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`preview: http://127.0.0.1:${port}`);
});
