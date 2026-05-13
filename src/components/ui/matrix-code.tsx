import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  fontSize?: number;
  color?: string;
  characters?: string;
  fadeOpacity?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  fontSize = 18,
  color = "#00ff66",
  characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
  fadeOpacity = 0.08,
  speed = 1,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = characters.split("");
    const columnCount = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columnCount }, () => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speed;
      }
    };

    const interval = setInterval(draw, 33 / speed);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [fontSize, color, characters, fadeOpacity, speed]);

  return <canvas ref={canvasRef} className={className} style={style} aria-hidden="true" />;
};

export default MatrixRain;
