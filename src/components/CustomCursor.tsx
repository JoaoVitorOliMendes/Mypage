"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animFrame = useRef(0);
  const running = useRef(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPoints = useRef<{ x: number; y: number; time: number }[]>([]);
  const hoveringRef = useRef(false);

  useEffect(() => {
    // Touch devices — bail out entirely
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = containerRef.current;
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!container || !svg || !canvas) return;

    ctxRef.current = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent =
      "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const tick = () => {
      const { x, y } = mousePos.current;
      svg.style.transform = `translate(${x - 1}px, ${y - 1}px)`;

      const ctx = ctxRef.current;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = performance.now();
        const trailDuration = 200;

        const pts = trailPoints.current;
        let start = 0;
        while (start < pts.length && now - pts[start].time >= trailDuration) {
          start++;
        }
        if (start > 0) pts.splice(0, start);

        if (pts.length > 2) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          for (let i = 1; i < pts.length - 1; i++) {
            const age = (now - pts[i].time) / trailDuration;
            const opacity = (1 - age) * 0.7;
            const width = (1 - age) * 4;

            const prev = pts[i - 1];
            const curr = pts[i];
            const next = pts[i + 1];
            const mx1 = (prev.x + curr.x) / 2;
            const my1 = (prev.y + curr.y) / 2;
            const mx2 = (curr.x + next.x) / 2;
            const my2 = (curr.y + next.y) / 2;

            ctx.beginPath();
            ctx.moveTo(mx1, my1);
            ctx.quadraticCurveTo(curr.x, curr.y, mx2, my2);
            ctx.strokeStyle = `rgba(255, 117, 26, ${opacity})`;
            ctx.lineWidth = width;
            ctx.stroke();
          }
        }

        // Stop the loop when trail has fully faded
        if (pts.length === 0) {
          running.current = false;
          return;
        }
      }

      animFrame.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!running.current) {
        running.current = true;
        animFrame.current = requestAnimationFrame(tick);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        time: performance.now(),
      });

      // Move cursor immediately without waiting for rAF
      svg.style.transform = `translate(${e.clientX - 1}px, ${e.clientY - 1}px)`;

      const target = (e.target as HTMLElement).closest(
        "a, button, [role='button']"
      );
      const isHovering = !!target;
      if (isHovering !== hoveringRef.current) {
        hoveringRef.current = isHovering;
        svg.style.filter = isHovering
          ? "drop-shadow(0 0 6px #ff751a)"
          : "drop-shadow(0 0 2px rgba(255,117,26,0.3))";
      }

      startLoop();
    };

    const onMouseLeave = () => {
      container.style.display = "none";
    };
    const onMouseEnter = () => {
      container.style.display = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.documentElement.style.cursor = "";
      document.head.removeChild(style);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ display: "none" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <svg
        ref={svgRef}
        width="20"
        height="20"
        viewBox="0 0 16 16"
        className="absolute left-0 top-0"
        style={{
          willChange: "transform",
          filter: "drop-shadow(0 0 2px rgba(255,117,26,0.3))",
          transition: "filter 0.2s ease-out",
        }}
      >
        <path
          d="M1 1 L6 14 M1 1 L12 8"
          fill="none"
          stroke="#ff751a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
