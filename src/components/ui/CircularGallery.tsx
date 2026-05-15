import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";

type CircularGalleryItem = {
  image: string;
  text: string;
  href: string;
  description?: string;
  tag?: string;
};

interface CircularGalleryProps {
  items: CircularGalleryItem[];
}

const clampDrag = 0.32;

export default function CircularGallery({ items }: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const drag = useRef({ active: false, startX: 0, startRotation: 0, moved: false });
  const raf = useRef(0);

  const cards = useMemo(() => items.map((item, index) => ({ ...item, index })), [items]);

  useEffect(() => {
    const tick = () => {
      if (!drag.current.active) {
        setRotation(value => value + 0.055);
      }
      raf.current = window.requestAnimationFrame(tick);
    };
    raf.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf.current);
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 5) drag.current.moved = true;
    setRotation(drag.current.startRotation + delta * clampDrag);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className="portfolio-circular-gallery"
      aria-label="Projetos em galeria circular 3D"
      onPointerDown={(event) => {
        drag.current = { ...drag.current, active: true, startX: event.clientX, startRotation: rotation, moved: false };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={(event) => {
        event.preventDefault();
        setRotation(value => value + event.deltaY * 0.12);
      }}
    >
      <div className="pcg-stage">
        {cards.map((item) => {
          const baseAngle = (360 / cards.length) * item.index;
          const angle = baseAngle + rotation;
          const normalized = ((angle % 360) + 360) % 360;
          const facing = Math.cos((normalized * Math.PI) / 180);
          const isBack = facing < -0.15;
          return (
            <a
              key={`${item.text}-${item.index}`}
              className="pcg-card spotlight-card"
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                "--pcg-angle": `${angle}deg`,
                "--pcg-facing": `${-angle}deg`,
                "--pcg-opacity": String(isBack ? 0.28 : 0.98),
                "--pcg-scale": String(isBack ? 0.82 : 1),
                zIndex: Math.round((facing + 1) * 100),
              } as CSSProperties}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
                event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
                event.currentTarget.style.setProperty("--spotlight-opacity", "1");
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--spotlight-opacity", "0");
              }}
              onFocus={(event) => {
                event.currentTarget.style.setProperty("--spotlight-x", "50%");
                event.currentTarget.style.setProperty("--spotlight-y", "38%");
                event.currentTarget.style.setProperty("--spotlight-opacity", "0.78");
              }}
              onBlur={(event) => {
                event.currentTarget.style.setProperty("--spotlight-opacity", "0");
              }}
              onClick={(event) => {
                if (drag.current.moved) event.preventDefault();
              }}
            >
              <span className="spotlight-card-glow" aria-hidden="true" />
              <img src={item.image} alt={item.text} draggable={false} />
              <span className="pcg-shade" aria-hidden="true" />
              <span className="pcg-copy">
                <small>{String(item.index + 1).padStart(2, "0")}</small>
                <strong>{item.text}</strong>
                {item.description ? <em>{item.description}</em> : null}
                {item.tag ? <span className="pcg-tag">{item.tag}</span> : null}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
