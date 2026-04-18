"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FaSearchPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DeepZoomViewer from "./DeepZoomViewer";

interface Painting {
  title: string;
  artist: string;
  image: string;
  imageId: string;
  imageWidth: number;
  imageHeight: number;
  lqip: string; // base64 low-quality image placeholder
  date: string;
}

const AIC_API = "https://api.artic.edu/api/v1";
const AIC_HEADERS = {
  "AIC-User-Agent": "MyPage (joaovitordeoliveiramendes@tutanota.com)",
};

async function searchPaintings(page: number, limit: number = 1) {
  const res = await fetch(`${AIC_API}/artworks/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...AIC_HEADERS },
    body: JSON.stringify({
      query: {
        bool: {
          must: [
            { term: { is_public_domain: true } },
            { match: { artwork_type_title: "Painting" } },
            { exists: { field: "image_id" } },
          ],
        },
      },
      fields: [
        "id",
        "title",
        "artist_title",
        "image_id",
        "date_display",
        "thumbnail",
        "dimensions",
        "dimensions_detail"
      ],
      limit,
      page,
    }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

function buildPainting(
  artwork: Record<string, unknown>,
  iiif: string
): Painting | null {
  const imageId = artwork.image_id as string | undefined;
  const thumb = artwork.thumbnail as
    | { width?: number; height?: number; lqip?: string }
    | undefined;
  if (!imageId || !thumb?.width || !thumb?.height) return null;

  return {
    title: (artwork.title as string) || "Untitled",
    artist: (artwork.artist_title as string) || "Unknown Artist",
    image: `/api/iiif/${imageId}/full/1280,/0/default.jpg`,
    imageId,
    imageWidth: thumb.width,
    imageHeight: thumb.height,
    lqip: thumb.lqip || "",
    date: (artwork.date_display as string) || "",
  };
}

export default function Banner() {
  const [painting, setPainting] = useState<Painting | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const totalPages = useRef(0);
  const iiifUrl = useRef("");
  const nextPainting = useRef<Painting | null>(null);
  const usedPages = useRef<Set<number>>(new Set());
  const history = useRef<Painting[]>([]);
  const historyIndex = useRef(-1);
  const bgRef = useRef<HTMLDivElement>(null);

  const fetchRandomPainting =
    useCallback(async (): Promise<Painting | null> => {
      if (totalPages.current === 0 || !iiifUrl.current) return null;

      for (let attempt = 0; attempt < 10; attempt++) {
        let page: number;
        do {
          page = Math.floor(Math.random() * totalPages.current) + 1;
        } while (
          usedPages.current.has(page) &&
          usedPages.current.size < totalPages.current
        );

        usedPages.current.add(page);
        if (usedPages.current.size > totalPages.current * 0.8) {
          usedPages.current.clear();
        }

        try {
          const data = await searchPaintings(page);
          const artwork = data.data?.[0];
          const p = artwork ? buildPainting(artwork, iiifUrl.current) : null;
          if (p) return p;
        } catch {
          continue;
        }
      }
      return null;
    }, []);

  const showPainting = useCallback((p: Painting, addToHistory = true) => {
    if (addToHistory) {
      history.current = history.current.slice(0, historyIndex.current + 1);
      history.current.push(p);
      historyIndex.current = history.current.length - 1;
    }
    setVisible(false);
    setTimeout(() => {
      setPainting(p);
      setVisible(true);
    }, painting ? 500 : 0);
  }, [painting]);

  const goNext = useCallback(async () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current++;
      const p = history.current[historyIndex.current];
      setVisible(false);
      setTimeout(() => { setPainting(p); setVisible(true); }, 500);
    } else {
      let next = nextPainting.current;
      nextPainting.current = null;
      if (!next) next = await fetchRandomPainting();
      if (next) showPainting(next);
    }
  }, [fetchRandomPainting, showPainting]);

  const goPrev = useCallback(() => {
    if (historyIndex.current <= 0) return;
    historyIndex.current--;
    const p = history.current[historyIndex.current];
    setVisible(false);
    setTimeout(() => { setPainting(p); setVisible(true); }, 500);
  }, []);

  // Get total painting count, iiif_url, and load a random painting
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // First call to get config and total pages
        const data = await searchPaintings(1);
        if (cancelled) return;

        iiifUrl.current = data.config?.iiif_url || "";
        totalPages.current = data.pagination?.total_pages || 0;
        if (totalPages.current === 0 || !iiifUrl.current) return;

        // Now fetch a random painting
        const first = await fetchRandomPainting();
        if (cancelled || !first) return;

        history.current = [first];
        historyIndex.current = 0;
        setPainting(first);
        setVisible(true);
      } catch (err) {
        console.error("Failed to load paintings:", err);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [fetchRandomPainting]);

  // Reset imageLoaded when painting changes
  useEffect(() => {
    setImageLoaded(false);
  }, [painting]);

  // Parallax — shift background image at 40% scroll speed
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Only apply parallax while hero is visible
          if (scrollY < window.innerHeight) {
            bg.style.transform = `translateY(-${scrollY * 0.3}px)`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prefetch next painting at 100s, auto-advance at 120s (2 minutes)
  useEffect(() => {
    if (!painting) return;
    let cancelled = false;

    const prefetchTimer = setTimeout(async () => {
      if (!cancelled) {
        const next = await fetchRandomPainting();
        if (next && !cancelled) {
          // Preload the image into browser cache
          const img = new Image();
          img.src = next.image;
          nextPainting.current = next;
        }
      }
    }, 100_000);

    const rotateTimer = setTimeout(() => {
      if (!cancelled) goNext();
    }, 120_000);

    return () => {
      cancelled = true;
      clearTimeout(prefetchTimer);
      clearTimeout(rotateTimer);
    };
  }, [painting, fetchRandomPainting, goNext]);

  return (
    <>
      <div
        ref={bgRef}
        className={`fixed inset-0 -z-10 bg-black transition-opacity duration-500 will-change-transform ${visible ? "opacity-100" : "opacity-0"
          }`}
        style={{ height: "140%" }}
      >
        {/* LQIP blur placeholder */}
        {painting?.lqip && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={painting.lqip}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover blur-2xl scale-110 transition-opacity duration-700 ${imageLoaded ? "opacity-0" : "opacity-100 animate-blurPulse"
              }`}
          />
        )}
        {/* Full resolution image */}
        {painting && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={painting.image}
            alt={painting.title}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"
              }`}
          />
        )}
        {/* Initial loading state — no painting yet */}
        {!painting && (
          <div className="absolute inset-0 bg-primary animate-blurPulse" />
        )}
      </div>
      {painting ? (
        <div className="absolute bottom-[7vh] left-6 flex items-end gap-3">
          <div className="flex flex-col bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white max-w-md">
            <span className="font-bold text-sm">{painting.title}</span>
            <span className="text-xs text-accent">
              {painting.artist}
              {painting.date && `, ${painting.date}`}
            </span>
          </div>
          <button
            onClick={goPrev}
            disabled={historyIndex.current <= 0}
            className="bg-black/50 backdrop-blur-sm rounded-lg p-2.5 text-white hover:bg-black/70 transition-colors cursor-pointer border-none disabled:opacity-30 disabled:cursor-default"
            title="Previous painting"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={() => setZoomOpen(true)}
            className="bg-black/50 backdrop-blur-sm rounded-lg p-2.5 text-white hover:bg-black/70 transition-colors cursor-pointer border-none"
            title="Explore painting details"
          >
            <FaSearchPlus className="text-sm" />
          </button>
          <button
            onClick={goNext}
            className="bg-black/50 backdrop-blur-sm rounded-lg p-2.5 text-white hover:bg-black/70 transition-colors cursor-pointer border-none"
            title="Next painting"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      ) : null}
      {zoomOpen && painting && (
        <DeepZoomViewer
          iiifUrl={iiifUrl.current}
          imageId={painting.imageId}
          imageWidth={painting.imageWidth}
          imageHeight={painting.imageHeight}
          title={painting.title}
          artist={painting.artist}
          date={painting.date}
          onClose={() => setZoomOpen(false)}
        />
      )}
    </>
  );
}
