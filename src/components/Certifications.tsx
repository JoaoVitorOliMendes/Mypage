"use client";

import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

interface Badge {
  id: string;
  name: string;
  issuer: string;
  issued_at: string;
  image_url: string;
  badge_url: string;
}

export default function Certifications() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    async function fetchBadges() {
      try {
        const res = await fetch("/api/credly");
        if (!res.ok) return;
        const json = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsed: Badge[] = (json.data || []).map((b: any) => ({
          id: b.id,
          name: b.badge_template?.name || b.name || "Unknown",
          issuer:
            b.badge_template?.issuer?.entities?.[0]?.entity?.name ||
            b.issuer?.summary || "Unknown",
          issued_at: b.issued_at || b.issued_at_date || "",
          image_url: b.image_url || b.image?.url || "",
          badge_url: b.badge_template?.url || "#",
        }));

        // Sort by date descending
        parsed.sort(
          (a, b) =>
            new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime()
        );

        setBadges(parsed);
      } catch (err) {
        console.error("Failed to fetch badges:", err);
      }
    }

    fetchBadges();
  }, []);

  const issuers = ["All", ...Array.from(new Set(badges.map((b) => b.issuer)))];
  const filtered =
    filter === "All" ? badges : badges.filter((b) => b.issuer === filter);

  return (
    <div className="bg-primary py-[10vh] px-[5%] md:px-[8%]">
      {/* Header */}
      <FadeIn>
        <div className="mb-12">
          <span className="font-mono text-[16px] tracking-[0.24em] uppercase text-accent flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            Certifications & Badges
          </span>
          <h2 className="text-6xl md:text-8xl italic font-serif leading-[0.95] text-white">
            Credentials<span className="text-accent">.</span>
          </h2>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn>
        <div className="flex flex-wrap gap-1 mb-10 bg-primary border border-white/[0.08] rounded-lg p-1 w-fit">
          {issuers.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setFilter(issuer)}
              className={`px-3 py-1.5 rounded-md font-mono text-[10px] tracking-[0.14em] uppercase border-none cursor-pointer transition-all duration-300 ${
                filter === issuer
                  ? "bg-accent text-white"
                  : "bg-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {filtered.map((badge) => (
          <FadeIn key={badge.id}>
            <a
              href={badge.badge_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white/[0.03] border border-white/[0.08] rounded-sm p-4 transition-all duration-500 hover:border-accent hover:-translate-y-1 no-underline relative overflow-hidden"
            >
              {/* Badge image */}
              <div className="relative mb-3 flex justify-center">
                {badge.image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={badge.image_url}
                    alt={badge.name}
                    className="w-[7em] h-[7em] object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center bg-white/[0.03]">
                    <span className="font-serif italic text-sm text-accent">
                      {badge.name.slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <h4 className="font-serif text-sm text-white leading-tight mb-1 text-center">
                {badge.name}
              </h4>
              <div className="font-mono text-[8px] tracking-[0.16em] uppercase text-white/40 text-center mb-1">
                {badge.issuer}
              </div>
              <div className="font-serif italic text-xs text-accent text-center">
                {badge.issued_at
                  ? new Date(badge.issued_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })
                  : ""}
              </div>
            </a>
          </FadeIn>
        ))}
      </div>

      {/* Empty state */}
      {badges.length === 0 && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
