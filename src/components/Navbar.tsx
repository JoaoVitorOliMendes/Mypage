"use client";

import { useState, useEffect, useCallback } from "react";

const sections = [
  { id: "home", num: "01", label: "Home" },
  { id: "projects", num: "02", label: "Projects" },
  { id: "work", num: "03", label: "Work" },
  { id: "certs", num: "04", label: "Certs" },
  { id: "aboutme", num: "05", label: "About Me" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = useCallback(() => {
    const offsets = sections.map((s) => {
      const el = document.getElementById(s.id);
      return { id: s.id, top: el?.getBoundingClientRect().top ?? Infinity };
    });
    const current = offsets.reduce((closest, s) =>
      Math.abs(s.top) < Math.abs(closest.top) ? s : closest
    );
    setActive(current.id);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between nav-bg">
      <div className="flex-1">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_theme(colors.accent)] animate-pulse" />
          <span className="font-serif italic text-[22px] tracking-wide text-white">
            João
            <span className="text-accent">.</span>
          </span>
        </button>
      </div>

      <div className="hidden md:flex items-center gap-9">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`group relative py-1.5 bg-transparent border-none cursor-pointer font-mono text-xs tracking-[0.14em] uppercase transition-colors duration-300 ${
              active === section.id
                ? "text-accent"
                : "text-white/50 hover:text-accent"
            }`}
          >
            <span className="text-accent mr-2 text-[10px]">{section.num}</span>
            {section.label}
            <span
              className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                active === section.id ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="flex-1 hidden md:block" />
    </nav>
  );
}
