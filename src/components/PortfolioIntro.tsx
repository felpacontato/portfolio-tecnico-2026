import { useEffect, useRef, useState, useCallback } from "react";

interface Char {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}<>/[]=+*#$%&";

class TextScramble {
  el: HTMLElement;
  chars = "!<>-_\\/[]{}—=+*^?#";
  queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
  frame = 0;
  frameRequest = 0;
  resolve: () => void = () => {};
  constructor(el: HTMLElement) {
    this.el = el;
    this.update = this.update.bind(this);
  }
  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((res) => (this.resolve = res));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 8);
      const end = start + Math.floor(Math.random() * 10) + 6;
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:#9dffc8;opacity:.85">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

export default function PortfolioIntro({ onDone }: { onDone: () => void }) {
  const [chars, setChars] = useState<Char[]>([]);
  const [active, setActive] = useState<Set<number>>(new Set());
  const [exiting, setExiting] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const seed = useCallback(() => {
    const list: Char[] = [];
    for (let i = 0; i < 220; i++) {
      list.push({
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
            speed: 0.14 + Math.random() * 0.48,
        opacity: 0.25 + Math.random() * 0.55,
      });
    }
    return list;
  }, []);

  useEffect(() => {
    setChars(seed());
  }, [seed]);

  useEffect(() => {
    const id = setInterval(() => {
      const next = new Set<number>();
      const n = 4 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) next.add(Math.floor(Math.random() * 220));
      setActive(next);
    }, 60);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setChars((prev) =>
        prev.map((c) => ({
          ...c,
          y: c.y + c.speed,
          ...(c.y >= 102 && {
            y: -4,
            x: Math.random() * 100,
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
          }),
        }))
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const tx = new TextScramble(titleRef.current);
    const phrases = [
      "FELIPE  PRATES",
      "FULL  STACK  DEV",
      "FELIPE  PRATES",
    ];
    let i = 0;
    let cancelled = false;
    const next = () => {
      if (cancelled) return;
      tx.setText(phrases[i]).then(() => {
        i++;
          if (i < phrases.length) setTimeout(next, 260);
      });
    };
    next();
    const exitTimer = setTimeout(() => setExiting(true), 2150);
    const doneTimer = setTimeout(onDone, 2650);
    return () => {
      cancelled = true;
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  const skip = () => {
    setExiting(true);
    setTimeout(onDone, 300);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          "radial-gradient(circle at 50% 45%, rgba(44,255,145,0.14), transparent 55%), linear-gradient(180deg,#030706 0%,#06100c 50%,#030706 100%)",
        overflow: "hidden",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        opacity: exiting ? 0 : 1,
        transition: "opacity 600ms ease",
        pointerEvents: exiting ? "none" : "auto",
      }}
      aria-hidden={exiting}
    >
      {/* grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(139,255,191,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(139,255,191,0.04) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 50%, #000 0%, transparent 75%)",
        }}
      />
      {/* raining chars */}
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            color: active.has(i) ? "#2cff91" : "#9dffc8",
            opacity: active.has(i) ? 1 : c.opacity * 0.5,
            textShadow: active.has(i) ? "0 0 12px #2cff91, 0 0 22px #2cff91" : "none",
            fontSize: active.has(i) ? "20px" : "14px",
            transition: "color 90ms, font-size 90ms, text-shadow 90ms",
            pointerEvents: "none",
            userSelect: "none",
            fontWeight: 600,
          }}
        >
          {c.char}
        </span>
      ))}
      {/* title */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.42em",
            color: "rgba(157,255,200,0.7)",
            textTransform: "uppercase",
          }}
        >
          ◢ Portfolio Técnico 2026
        </span>
        <h1
          ref={titleRef}
          style={{
            margin: 0,
            color: "#f2fff8",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "clamp(2rem, 7vw, 5.5rem)",
            letterSpacing: "0.04em",
            textAlign: "center",
            textShadow: "0 0 30px rgba(44,255,145,0.45)",
            minHeight: "1.2em",
          }}
        >
          FELIPE  PRATES
        </h1>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(242,255,248,0.45)",
            textTransform: "uppercase",
          }}
        >
          carregando experiência…
        </span>
      </div>
      <button
        onClick={skip}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "rgba(44,255,145,0.08)",
          border: "1px solid rgba(44,255,145,0.4)",
          color: "#9dffc8",
          padding: "8px 16px",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          borderRadius: 6,
          pointerEvents: "auto",
        }}
      >
        Pular ↦
      </button>
    </div>
  );
}
