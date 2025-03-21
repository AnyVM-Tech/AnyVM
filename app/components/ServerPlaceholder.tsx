import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ThreeCanvas with no SSR
const ThreeCanvasNoSSR = dynamic(
  () => import('./ThreeCanvas'),
  { ssr: false }
);

export const ServerPlaceholder = () => {
  return (
    <div className="relative w-full max-w-md h-80 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 flex flex-col items-center justify-center p-8">
        <ThreeCanvasNoSSR className="absolute inset-0" />
        <div className="h-24 w-24 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 z-10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        </div>
        <p className="text-white text-center z-10">Server Illustration</p>
        <p className="text-blue-200 text-sm text-center mt-2 z-10">Simple, efficient cloud infrastructure</p>
      </div>
    </div>
  );
};
