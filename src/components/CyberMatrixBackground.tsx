import { useEffect, useRef } from "react";

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?;:"[]{}\\|!@#$%^&*()_+-=';

export default function CyberMatrixBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const tileSize = 60;

    const createGrid = () => {
      const columns = Math.max(1, Math.ceil(window.innerWidth / tileSize));
      const rows = Math.max(1, Math.ceil(window.innerHeight / tileSize));

      grid.style.setProperty("--columns", String(columns));
      grid.style.setProperty("--rows", String(rows));
      grid.innerHTML = "";

      for (let index = 0; index < columns * rows; index += 1) {
        const tile = document.createElement("span");
        tile.className = "cyber-matrix-tile";
        tile.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        tile.style.setProperty("--cyber-intensity", "0");
        grid.appendChild(tile);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const radius = Math.max(260, window.innerWidth / 4);

      for (const tile of Array.from(grid.children) as HTMLElement[]) {
        const rect = tile.getBoundingClientRect();
        const tileX = rect.left + rect.width / 2;
        const tileY = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - tileX, event.clientY - tileY);
        const intensity = Math.max(0, 1 - distance / radius);

        tile.style.setProperty("--cyber-intensity", intensity.toFixed(3));
      }
    };

    createGrid();
    window.addEventListener("resize", createGrid);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", createGrid);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={gridRef} className="cyber-matrix-background" aria-hidden="true" />;
}
