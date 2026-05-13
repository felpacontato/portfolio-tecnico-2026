import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  opacity?: number;
}

/** Subtle Matrix-style code rain canvas, sized to its parent. */
export default function MatrixBackground({ className, opacity = 0.35 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "アァカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}<>/[]=+*#$%&".split("");
    let columns = 0;
    let drops: number[] = [];
    const fontSize = 11;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.floor(rect.width / fontSize));
      drops = new Array(columns).fill(0).map(() => Math.random() * (rect.height / fontSize));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let last = 0;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = "rgba(2, 12, 7, 0.10)";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const rows = Math.ceil(rect.height / fontSize) + 2;
        const head = Math.floor(drops[i]) % rows;
        for (let row = 0; row < rows; row++) {
          const yy = row * fontSize;
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const distance = (head - row + rows) % rows;
          const isHead = distance === 0;
          const tail = distance > 0 && distance < 18;
          const ambient = Math.random() > 0.42 ? 0.52 : 0.30;
          const strength = isHead ? 1 : tail ? Math.max(0.36, 0.92 - distance * 0.035) : ambient;
          ctx.fillStyle = isHead
            ? `rgba(218,255,230,${0.95 * opacity})`
            : `rgba(44,255,145,${strength * opacity})`;
          ctx.fillText(ch, x, yy);
        }
        drops[i] += 0.36 + (i % 5) * 0.035;
      }
    };
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 42) return;
      last = t;
      draw();
    };
    draw();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [opacity]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
