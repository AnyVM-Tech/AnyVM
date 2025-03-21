"use client";
import { useEffect, useState } from "react";
import { initBackground } from "./BackgroundRenderer";

export default function ClientBackgroundWrapper() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const cleanup = initBackground();
    
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }

      const canvas = document.getElementById('background-canvas');
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);
  return null;
}
