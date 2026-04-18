"use client";

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { projects as initialProjects } from "@/data/projects";
import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";

const gridSpans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-8",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-12",
];

export default function Projects() {
  const [items, setItems] = useState(initialProjects);
  const [active, setActive] = useState(false);
  const floatRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragging = useRef(false);
  const pending = useRef(false);
  const pendingIdx = useRef<number | null>(null);
  const pointerOrigin = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const currentIdx = useRef<number | null>(null);
  const floatProject = useRef<number | null>(null);
  const prevRects = useRef<Map<string, DOMRect>>(new Map());
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const lastSwapTime = useRef(0);

  const DRAG_THRESHOLD = 8;
  const SWAP_COOLDOWN = 350;

  // FLIP animation after reorder
  useLayoutEffect(() => {
    if (prevRects.current.size === 0) return;
    const saved = prevRects.current;
    prevRects.current = new Map();

    cardRefs.current.forEach((el, i) => {
      if (!el || !items[i]) return;
      // Skip the dragged card
      if (i === currentIdx.current) return;

      const oldRect = saved.get(items[i].name);
      if (!oldRect) return;
      const newRect = el.getBoundingClientRect();
      const dx = oldRect.left - newRect.left;
      const dy = oldRect.top - newRect.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)` },
          { transform: "translate(0, 0)" },
        ],
        { duration: 300, easing: "cubic-bezier(0.2, 0, 0, 1)" }
      );
    });
  }, [items]);

  const snapshotPositions = useCallback(() => {
    const map = new Map<string, DOMRect>();
    cardRefs.current.forEach((el, i) => {
      if (el && itemsRef.current[i]) {
        map.set(itemsRef.current[i].name, el.getBoundingClientRect());
      }
    });
    prevRects.current = map;
  }, []);

  // Use document-level listeners so drag works even outside the grid
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (pending.current && pendingIdx.current !== null) {
        const dx = e.clientX - pointerOrigin.current.x;
        const dy = e.clientY - pointerOrigin.current.y;
        if (Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;

        // Activate drag
        const i = pendingIdx.current;
        const card = cardRefs.current[i];
        if (!card) return;
        const rect = card.getBoundingClientRect();

        dragOffset.current = {
          x: pointerOrigin.current.x - rect.left,
          y: pointerOrigin.current.y - rect.top,
        };
        currentIdx.current = i;
        floatProject.current = i;
        dragging.current = true;
        pending.current = false;

        // Setup float card
        const fl = floatRef.current;
        if (fl) {
          fl.style.width = rect.width + "px";
          fl.style.left = (e.clientX - dragOffset.current.x) + "px";
          fl.style.top = (e.clientY - dragOffset.current.y) + "px";
          fl.style.display = "block";
          fl.style.opacity = "1";
        }

        setActive(true);
        document.body.style.userSelect = "none";
      }

      if (!dragging.current) return;

      const fl = floatRef.current;
      if (fl) {
        fl.style.left = (e.clientX - dragOffset.current.x) + "px";
        fl.style.top = (e.clientY - dragOffset.current.y) + "px";
      }

      // Hit test (with cooldown to prevent flicker)
      if (performance.now() - lastSwapTime.current < SWAP_COOLDOWN) return;

      for (let i = 0; i < cardRefs.current.length; i++) {
        if (i === currentIdx.current) continue;
        const el = cardRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const from = currentIdx.current!;
          currentIdx.current = i;
          lastSwapTime.current = performance.now();
          snapshotPositions();
          setItems((prev) => {
            const next = [...prev];
            const [moved] = next.splice(from, 1);
            next.splice(i, 0, moved);
            return next;
          });
          break;
        }
      }
    };

    const onUp = () => {
      pending.current = false;
      pendingIdx.current = null;
      if (!dragging.current) return;
      dragging.current = false;

      const fl = floatRef.current;
      if (fl) {
        fl.style.display = "none";
        fl.style.opacity = "0";
      }

      currentIdx.current = null;
      floatProject.current = null;
      setActive(false);
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [snapshotPositions]);

  const onPointerDown = useCallback((e: React.PointerEvent, i: number) => {
    if ((e.target as HTMLElement).closest("a")) return;
    pending.current = true;
    pendingIdx.current = i;
    pointerOrigin.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Get the project for the floating card
  const floatingProject = active && currentIdx.current !== null
    ? items[currentIdx.current]
    : null;

  return (
    <div>
      <div className="bg-surface min-h-[85vh] w-full py-[10vh] px-[5%] md:px-[8%]">
        <FadeIn>
          <div className="mb-16">
            <span className="font-mono text-[16px] tracking-[0.24em] uppercase text-primary flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-primary" />
              Selected works
            </span>
            <h2 className="text-6xl md:text-8xl italic font-serif leading-[0.95]">
              Projects<span className="text-accent">.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {items.map((project, i) => {
            const isDragged = active && i === currentIdx.current;
            return (
              <div
                key={project.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                onPointerDown={(e) => onPointerDown(e, i)}
                className={`col-span-1 ${gridSpans[i] || "md:col-span-6"}`}
                style={{ opacity: isDragged ? 0.15 : 1 }}
              >
                <FadeIn>
                  <ProjectCard project={project} index={i} />
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating card — always in DOM, toggled via display */}
      <div
        ref={floatRef}
        className="fixed z-[100] pointer-events-none"
        style={{
          display: "none",
          opacity: 0,
          transform: "rotate(1.5deg) scale(1.04)",
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
          willChange: "left, top",
        }}
      >
        {floatingProject && (
          <ProjectCard
            project={floatingProject}
            index={currentIdx.current!}
            isFloating
          />
        )}
      </div>
    </div>
  );
}

