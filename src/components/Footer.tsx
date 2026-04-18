"use client";

import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiLetterboxd } from "react-icons/si";

const socialLinks = [
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/jo%C3%A3o-vitor-de-oliveira-mendes-6874b11b3/",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    url: "https://github.com/JoaoVitorOliMendes",
  },
  {
    icon: SiLetterboxd,
    label: "Letterboxd",
    url: "https://letterboxd.com/OJoaozao/",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    url: "mailto:joaovitordeoliveiramendes@tutanota.com",
  },
];

interface Quote {
  q: string;
  a: string;
}

export default function Footer() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("/api/quote");
        if (!res.ok) return;
        const data = await res.json();
        setQuote(data);
      } catch {
        // silent fail
      }
    }
    fetchQuote();
  }, []);

  return (
    <footer className="bg-primary border-t border-white/[0.08]">
      <div className="px-[5%] md:px-[8%] py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left — brand + socials */}
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_theme(colors.accent)]" />
            <span className="font-serif italic text-[22px] tracking-wide text-white">
              João<span className="text-accent">.</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target={item.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-white/40 hover:text-accent transition-colors duration-300"
                title={item.label}
              >
                <item.icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Right — quote */}
        <div className="flex flex-col justify-center md:items-end">
          {quote && (
            <div className="max-w-md md:text-right">
              <p className="font-serif italic text-white/30 text-[15px] leading-relaxed mb-2">
                &ldquo;{quote.q}&rdquo;
              </p>
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent">
                — {quote.a}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-[5%] md:px-[8%] py-4 border-t border-white/[0.06]">
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/20">
          &copy; {new Date().getFullYear()} João Vitor de Oliveira Mendes
        </p>
      </div>
    </footer>
  );
}
