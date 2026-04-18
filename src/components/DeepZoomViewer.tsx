"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type OpenSeadragon from "openseadragon";
import { FaTimes, FaPlus, FaMinus, FaExpand, FaCompress } from "react-icons/fa";
import { MdOutlineCenterFocusWeak } from "react-icons/md";

interface DeepZoomViewerProps {
  iiifUrl: string;
  imageId: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  artist: string;
  date: string;
  onClose: () => void;
}

export default function DeepZoomViewer({
  iiifUrl,
  imageId,
  imageWidth,
  imageHeight,
  title,
  artist,
  date,
  onClose,
}: DeepZoomViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let destroyed = false;

    import("openseadragon").then((OSD) => {
      if (destroyed || !containerRef.current) return;

      // Build scale factors based on image size
      const maxDim = Math.max(imageWidth, imageHeight);
      const scaleFactors: number[] = [];
      let sf = 1;
      while (sf * 256 < maxDim) {
        scaleFactors.push(sf);
        sf *= 2;
      }
      scaleFactors.push(sf);

      const viewer = OSD.default({
        element: containerRef.current,
        // IIIF tile source via local proxy to avoid CORS
        tileSources: {
          "@context": "http://iiif.io/api/image/2/context.json",
          "@id": `/api/iiif/${imageId}`,
          protocol: "http://iiif.io/api/image",
          width: imageWidth,
          height: imageHeight,
          tiles: [{ width: 256, scaleFactors }],
          profile: ["http://iiif.io/api/image/2/level2.json"],
        } as unknown as OpenSeadragon.TileSourceOptions,
        // Controls — we use our own custom UI
        showNavigationControl: false,
        showFullPageControl: false,
        // Navigator minimap
        showNavigator: true,
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorSizeRatio: 0.15,
        navigatorAutoFade: true,
        navigatorOpacity: 0.85,
        navigatorBackground: "#000",
        navigatorBorderColor: "#ff751a",
        // Zoom behavior
        defaultZoomLevel: 0,
        minZoomLevel: 0.5,
        maxZoomLevel: 20,
        zoomPerClick: 2,
        zoomPerScroll: 1.3,
        visibilityRatio: 0.3,
        constrainDuringPan: false,
        // Gestures
        gestureSettingsMouse: {
          scrollToZoom: true,
          clickToZoom: true,
          dblClickToZoom: true,
          dragToPan: true,
          flickEnabled: false,
        },
        gestureSettingsTouch: {
          scrollToZoom: false,
          pinchToZoom: true,
          dblClickToZoom: true,
          dragToPan: true,
          flickEnabled: true,
          flickMinSpeed: 120,
          flickMomentum: 0.25,
        },
        // Animation
        animationTime: 0.6,
        springStiffness: 10,
        // Preloading
        immediateRender: true,
        imageLoaderLimit: 5,
      });

      viewerRef.current = viewer;
    });

    return () => {
      destroyed = true;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [iiifUrl, imageId, imageWidth, imageHeight]);

  // Escape key to close (only when not in browser fullscreen)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Track fullscreen state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const handleZoomIn = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer?.viewport) return;
    viewer.viewport.zoomBy(2);
    viewer.viewport.applyConstraints();
  }, []);

  const handleZoomOut = useCallback(() => {
    const viewer = viewerRef.current;
    if (!viewer?.viewport) return;
    viewer.viewport.zoomBy(0.5);
    viewer.viewport.applyConstraints();
  }, []);

  const handleReset = useCallback(() => {
    viewerRef.current?.viewport?.goHome();
  }, []);

  const handleFullscreen = useCallback(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-fadeIn">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm z-10">
        <div className="text-white min-w-0">
          <h3 className="text-lg font-bold truncate">{title}</h3>
          <p className="text-sm text-accent truncate">
            {artist}
            {date && ` · ${date}`}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-2 text-white hover:text-accent transition-colors cursor-pointer bg-transparent border-none flex-shrink-0"
          title="Close (Esc)"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>

      {/* Viewer */}
      <div className="flex-1 relative">
        <div ref={containerRef} className="absolute inset-0" />

        {/* Custom zoom controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors cursor-pointer border-none flex items-center justify-center"
            title="Zoom in"
          >
            <FaPlus className="text-sm" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors cursor-pointer border-none flex items-center justify-center"
            title="Zoom out"
          >
            <FaMinus className="text-sm" />
          </button>
          <button
            onClick={handleReset}
            className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors cursor-pointer border-none flex items-center justify-center"
            title="Reset view"
          >
            <MdOutlineCenterFocusWeak className="text-lg" />
          </button>
          <button
            onClick={handleFullscreen}
            className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors cursor-pointer border-none flex items-center justify-center"
            title="Toggle fullscreen"
          >
            {isFullscreen ? (
              <FaCompress className="text-sm" />
            ) : (
              <FaExpand className="text-sm" />
            )}
          </button>
        </div>

        {/* Hint text */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none z-10">
          Scroll to zoom · Drag to pan · Click to zoom in
        </div>
      </div>
    </div>
  );
}
