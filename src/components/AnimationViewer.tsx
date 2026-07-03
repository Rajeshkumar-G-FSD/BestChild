import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Grid,
  Image as ImageIcon,
  Sliders,
  Tv,
  Download,
  Share2,
  Info,
  Layers,
  Sparkles,
  ArrowRightLeft
} from "lucide-react";

export default function AnimationViewer() {
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(24);
  const [playMode, setPlayMode] = useState<"loop" | "pingpong" | "once">("loop");
  const [viewMode, setViewMode] = useState<"player" | "grid">("player");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward, -1 = backward for pingpong
  const [gridPage, setGridPage] = useState<number>(1);
  const [searchFrame, setSearchFrame] = useState<string>("");
  const [preloadedPercent, setPreloadedPercent] = useState<number>(0);

  const totalFrames = 240;
  const itemsPerPage = 24;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to format frame number: e.g., 5 -> "005", 123 -> "123"
  const formatFrameNumber = (num: number): string => {
    return num.toString().padStart(3, "0");
  };

  // Helper to get image URL
  const getFrameUrl = (num: number): string => {
    return `/images/ezgif-frame-${formatFrameNumber(num)}.jpg`;
  };

  // Sequential image preloading for super-smooth animation
  useEffect(() => {
    let loadedCount = 0;
    const cache: HTMLImageElement[] = [];
    const step = 5; // load in chunks to prevent network choking
    
    const preloadBatch = (startIndex: number) => {
      const endIndex = Math.min(startIndex + step, totalFrames);
      let batchLoaded = 0;

      for (let i = startIndex; i <= endIndex; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          loadedCount++;
          batchLoaded++;
          setPreloadedPercent(Math.round((loadedCount / totalFrames) * 100));
          
          if (batchLoaded === (endIndex - startIndex + 1) && endIndex < totalFrames) {
            // Load next batch
            preloadBatch(endIndex + 1);
          }
        };
        img.onerror = () => {
          loadedCount++;
          batchLoaded++;
          if (batchLoaded === (endIndex - startIndex + 1) && endIndex < totalFrames) {
            preloadBatch(endIndex + 1);
          }
        };
        cache.push(img);
      }
    };

    preloadBatch(1);
  }, []);

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 1000 / fps;
      timerRef.current = setInterval(() => {
        setCurrentFrame((prevFrame) => {
          if (playMode === "loop") {
            return prevFrame === totalFrames ? 1 : prevFrame + 1;
          } else if (playMode === "pingpong") {
            let nextDirection = direction;
            let nextFrame = prevFrame + direction;

            if (nextFrame >= totalFrames) {
              nextFrame = totalFrames;
              nextDirection = -1;
              setDirection(-1);
            } else if (nextFrame <= 1) {
              nextFrame = 1;
              nextDirection = 1;
              setDirection(1);
            }
            return nextFrame;
          } else {
            // once mode
            if (prevFrame === totalFrames) {
              setIsPlaying(false);
              return prevFrame;
            }
            return prevFrame + 1;
          }
        });
      }, intervalMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, fps, playMode, direction]);

  const handlePrevFrame = () => {
    setCurrentFrame((prev) => (prev === 1 ? totalFrames : prev - 1));
  };

  const handleNextFrame = () => {
    setCurrentFrame((prev) => (prev === totalFrames ? 1 : prev + 1));
  };

  const handleReset = () => {
    setCurrentFrame(1);
    setIsPlaying(false);
    setDirection(1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = getFrameUrl(currentFrame);
    link.download = `ezgif-frame-${formatFrameNumber(currentFrame)}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Grid view pagination
  const filteredFrames = Array.from({ length: totalFrames }, (_, i) => i + 1).filter(
    (num) => {
      if (!searchFrame) return true;
      return num.toString().includes(searchFrame) || formatFrameNumber(num).includes(searchFrame);
    }
  );

  const totalPages = Math.ceil(filteredFrames.length / itemsPerPage);
  const startIndex = (gridPage - 1) * itemsPerPage;
  const currentGridFrames = filteredFrames.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl" id="animation-viewer-section">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#1a4f9c]/10 text-[#1a4f9c] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Diagnostics Tour</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Hospital Frame Showcase
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 font-medium">
          Explore our state-of-the-art facilities and diagnostic scans in crisp frame-by-frame details. Scrub, play, zoom, and inspect all 240 high-resolution images.
        </p>
      </div>

      {/* Progress Preloader Alert */}
      {preloadedPercent < 100 && (
        <div className="mb-6 bg-blue-50 border border-blue-100/60 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-full text-[#1a4f9c]">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-gray-900">Preloading high-fidelity frames for smooth animation...</span>
              <span className="text-xs font-bold text-[#1a4f9c] bg-blue-100 px-2 py-0.5 rounded-full">{preloadedPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#1a4f9c] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${preloadedPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Switcher */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-full flex gap-1">
          <button
            onClick={() => setViewMode("player")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
              viewMode === "player"
                ? "bg-[#1a4f9c] text-white shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
            id="view-player-btn"
          >
            <Tv className="w-4 h-4" />
            Interactive Player
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
              viewMode === "grid"
                ? "bg-[#1a4f9c] text-white shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
            id="view-grid-btn"
          >
            <Grid className="w-4 h-4" />
            Browse all 240 Frames ({totalFrames})
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {viewMode === "player" ? (
          /* ================= PLAYER MODE ================= */
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* Screen Area (Left / Center) */}
            <div className="md:col-span-2 bg-slate-950 p-6 flex flex-col justify-between relative min-h-[400px]">
              {/* Top HUD Overlay */}
              <div className="flex justify-between items-center text-xs text-gray-400 font-mono z-10">
                <div className="bg-black/55 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>LIVE SCREEN</span>
                </div>
                <div className="bg-black/55 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5 font-extrabold text-white">
                  FRAME: {formatFrameNumber(currentFrame)} / 240
                </div>
              </div>

              {/* Centered Image Showcase */}
              <div className="flex-grow flex items-center justify-center my-6 relative overflow-hidden group">
                <img
                  src={getFrameUrl(currentFrame)}
                  alt={`ezgif-frame-${currentFrame}`}
                  className="max-h-[380px] w-auto object-contain rounded-2xl shadow-2xl border border-white/10 transition-transform duration-200"
                  id="player-active-screen"
                />
              </div>

              {/* Navigation overlays */}
              <button
                onClick={handlePrevFrame}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#1a4f9c] text-white backdrop-blur-sm border border-white/10 transition-all shadow-md active:scale-95"
                title="Previous Frame"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextFrame}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#1a4f9c] text-white backdrop-blur-sm border border-white/10 transition-all shadow-md active:scale-95"
                title="Next Frame"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Progress HUD Bar */}
              <div className="w-full bg-black/40 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>INDEX_CODE: {formatFrameNumber(currentFrame)}</span>
                <span className="text-gray-500">FORMAT: JPEG 100%</span>
                <span className="text-[#1a4f9c] font-bold">STATUS: STABLE</span>
              </div>
            </div>

            {/* Controls Console Area (Right Side) */}
            <div className="p-6 md:p-8 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#1a4f9c]" />
                  Control Console
                </h3>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Use these fine-tuned playback dials to navigate the medical visualization.
                </p>

                {/* Main Playback State */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm shadow transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-[#1a4f9c] text-white hover:bg-[#133a75]"
                        : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                    }`}
                    id="console-play-toggle"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-current" />}
                    {isPlaying ? "Pause" : "Play Sequence"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                    id="console-reset-btn"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Tour
                  </button>
                </div>

                {/* Timeline Scrubber */}
                <div className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <label className="block text-xs font-bold text-gray-700 mb-2 flex justify-between">
                    <span>Timeline Scrubber</span>
                    <span className="text-[#1a4f9c] font-mono">Frame {currentFrame} / {totalFrames}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max={totalFrames}
                    value={currentFrame}
                    onChange={(e) => {
                      setCurrentFrame(parseInt(e.target.value));
                      setIsPlaying(false); // Pause while scrubbing
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a4f9c]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                    <span>FRAME 001</span>
                    <span>FRAME 120</span>
                    <span>FRAME 240</span>
                  </div>
                </div>

                {/* Playback Settings */}
                <div className="space-y-5">
                  
                  {/* Speed (FPS) Control */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <label className="block text-xs font-bold text-gray-700 mb-2 flex justify-between">
                      <span>Playback Frame Rate</span>
                      <span className="text-[#1a4f9c] font-mono font-bold">{fps} FPS</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={fps}
                      onChange={(e) => setFps(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a4f9c]"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                      <span>1 FPS (Slow)</span>
                      <span>24 (Film)</span>
                      <span>60 FPS (Fast)</span>
                    </div>
                  </div>

                  {/* Playback Mode */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="block text-xs font-bold text-gray-700 mb-2">Loop Behavior</span>
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold text-gray-600">
                      <button
                        onClick={() => setPlayMode("loop")}
                        className={`py-1.5 px-2 rounded-lg transition-all ${
                          playMode === "loop" ? "bg-white text-gray-900 shadow font-bold" : "hover:text-gray-900"
                        }`}
                      >
                        Loop
                      </button>
                      <button
                        onClick={() => setPlayMode("pingpong")}
                        className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                          playMode === "pingpong" ? "bg-white text-gray-900 shadow font-bold" : "hover:text-gray-900"
                        }`}
                        title="Bounce forward & backward"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        Bounce
                      </button>
                      <button
                        onClick={() => setPlayMode("once")}
                        className={`py-1.5 px-2 rounded-lg transition-all ${
                          playMode === "once" ? "bg-white text-gray-900 shadow font-bold" : "hover:text-gray-900"
                        }`}
                      >
                        Once
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Sharing & Download Panel */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-grow flex items-center justify-center gap-2 bg-[#1a4f9c]/10 text-[#1a4f9c] hover:bg-[#1a4f9c] hover:text-white py-3 px-4 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Save Image Frame
                </button>
                <button
                  onClick={() => {
                    const shareText = `Check out frame ${formatFrameNumber(currentFrame)} of the Children Hospital Interactive Diagnostic sequence!`;
                    navigator.clipboard.writeText(window.location.origin + getFrameUrl(currentFrame));
                    alert("Frame link copied to clipboard!");
                  }}
                  className="p-3 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all cursor-pointer active:scale-95"
                  title="Copy Direct Link to Current Frame"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* ================= GRID VIEW MODE ================= */
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter by frame number..."
                  value={searchFrame}
                  onChange={(e) => {
                    setSearchFrame(e.target.value);
                    setGridPage(1); // Reset page
                  }}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#1a4f9c] focus:ring-2 focus:ring-[#1a4f9c]/10"
                />
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              <div className="text-xs text-gray-500 font-bold">
                Showing {filteredFrames.length} of {totalFrames} frames
              </div>
            </div>

            {filteredFrames.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-medium">
                No matching frames found. Try another search!
              </div>
            ) : (
              <>
                {/* Image Frame Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
                  {currentGridFrames.map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setCurrentFrame(num);
                        setViewMode("player");
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`group relative bg-slate-900 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shadow hover:shadow-md ${
                        currentFrame === num
                          ? "border-[#1a4f9c] scale-105"
                          : "border-transparent hover:scale-102"
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={getFrameUrl(num)}
                        alt={`Frame ${num}`}
                        className="w-full aspect-square object-cover object-center group-hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                      {/* Hover Info Badge */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <span className="text-[10px] text-white font-bold bg-[#1a4f9c] px-1.5 py-0.5 rounded-full w-max">
                          #{formatFrameNumber(num)}
                        </span>
                        <span className="text-[11px] text-white font-bold text-center self-center bg-black/50 px-2 py-1 rounded">
                          Click to View
                        </span>
                        <span></span>
                      </div>
                      {/* Always-on label */}
                      <div className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white font-mono px-1.5 py-0.5 rounded">
                        #{formatFrameNumber(num)}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setGridPage((p) => Math.max(1, p - 1))}
                      disabled={gridPage === 1}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-full text-xs font-bold hover:bg-gray-50 transition-all disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Limit visible pages for tidy layout
                        if (
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - gridPage) <= 2
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => setGridPage(page)}
                              className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                                gridPage === page
                                  ? "bg-[#1a4f9c] text-white"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === 2 ||
                          page === totalPages - 1
                        ) {
                          return (
                            <span key={page} className="text-gray-400 text-xs px-1 self-center">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <button
                      onClick={() => setGridPage((p) => Math.min(totalPages, p + 1))}
                      disabled={gridPage === totalPages}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-full text-xs font-bold hover:bg-gray-50 transition-all disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Info Card Block */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-3xl p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-3 bg-blue-100 text-[#1a4f9c] rounded-2xl flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-extrabold text-gray-900 text-sm mb-1">
            Understanding the Medical Frame Sequence
          </h4>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
            This high-precision diagnostics module maps 240 distinct imaging coordinates into a sequential walkthrough. It allows pediatricians and caretakers to observe subtle trends and structural growth dynamics interactively. Use the scrubber to pinpoint individual frames, or dial the playback frame rate to match your inspection standards.
          </p>
        </div>
      </div>
    </div>
  );
}
