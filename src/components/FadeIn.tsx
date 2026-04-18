"use client";

import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  leftToRight?: 1 | 2;
  topToBottom?: 1 | 2;
}

export default function FadeIn({ children, leftToRight, topToBottom }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("fade-in-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build initial transform
  const x = leftToRight ? (leftToRight === 1 ? "-40px" : "40px") : "0";
  const y = topToBottom ? (topToBottom === 1 ? "-40px" : "40px") : "0";

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: `translate(${x}, ${y})`,
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}
