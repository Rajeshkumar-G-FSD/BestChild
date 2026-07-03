import React, { useRef, useState, useEffect } from "react";
import { Activity } from "lucide-react";

interface HeroProps {
  onLearnMore: () => void;
  onCheckSymptoms: () => void;
}

export default function Hero({ onLearnMore, onCheckSymptoms }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [preloadProgress, setPreloadProgress] = useState<number>(0);
  const [isPreloadComplete, setIsPreloadComplete] = useState<boolean>(false);

  const totalFrames = 240;

  // Format frame number to match file names (e.g., 5 -> "005")
  const formatFrameNumber = (num: number): string => {
    return num.toString().padStart(3, "0");
  };

  // Get frame image URL
  const getFrameUrl = (num: number): string => {
    return `/images/ezgif-frame-${formatFrameNumber(num)}.jpg`;
  };

  // Programmatic parallel preloading to ensure instant, lag-free rendering
  useEffect(() => {
    let loadedCount = 0;
    const cache: HTMLImageElement[] = [];
    const batchSize = 10; // Load images in batches to prevent network congestion

    const preloadBatch = (startIndex: number) => {
      const endIndex = Math.min(startIndex + batchSize, totalFrames);
      let batchLoaded = 0;

      for (let i = startIndex; i <= endIndex; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        
        const onImageLoad = () => {
          loadedCount++;
          batchLoaded++;
          
          const progress = Math.round((loadedCount / totalFrames) * 100);
          setPreloadProgress(progress);

          if (loadedCount === totalFrames) {
            setIsPreloadComplete(true);
          }

          // Trigger next batch when this batch completes
          if (batchLoaded === (endIndex - startIndex + 1) && endIndex < totalFrames) {
            preloadBatch(endIndex + 1);
          }
        };

        img.onload = onImageLoad;
        img.onerror = onImageLoad; // Continue even on failure
        cache.push(img);
      }
    };

    preloadBatch(1);
  }, []);

  // requestAnimationFrame scroll listener for perfect 60fps/120fps fluid scrolling
  useEffect(() => {
    let requestRef: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollRange = rect.height - viewportHeight;

      if (totalScrollRange <= 0) return;

      // Scrolled height from the top of the container
      const scrolled = -rect.top;
      
      // Calculate scroll progress (clamped strictly between 0 and 1)
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollRange));

      // Map progress to frame index 1 to 240
      const calculatedFrame = Math.round(progress * (totalFrames - 1)) + 1;
      
      setCurrentFrame(calculatedFrame);
    };

    const onScrollUpdate = () => {
      requestRef = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScrollUpdate, { passive: true });
    // Execute initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScrollUpdate);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    /* Outer scroll track container - pins the inner section during the animation */
    <div 
      ref={containerRef} 
      className="relative w-full h-[250vh]" 
      id="hero-scroll-container"
    >
      {/* Sticky viewport content - remains locked on screen while scrolling */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-slate-950 select-none">
        
        {/* Big Screen Central Image Showcase */}
        <div className="flex-grow w-full h-full relative">
          
          {/* Loader Overlay */}
          {!isPreloadComplete && (
            <div className="absolute inset-0 bg-slate-950 z-30 flex flex-col items-center justify-center p-6 text-center">
              <Activity className="w-10 h-10 text-[#1a4f9c] animate-pulse mb-3" />
              <p className="text-sm font-bold text-gray-200">Preloading Clinical Sequences...</p>
              <div className="w-48 bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-[#1a4f9c] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${preloadProgress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 font-mono mt-2">{preloadProgress}% Loaded</span>
            </div>
          )}

          {/* Big-screen responsive image - Completely Full Width and Full Height with no UI overlay */}
          <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
            <img
              src={getFrameUrl(currentFrame)}
              alt={`Diagnostic Scan Frame ${currentFrame}`}
              className="w-full h-full object-cover select-none pointer-events-none transition-all duration-75"
              draggable={false}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
