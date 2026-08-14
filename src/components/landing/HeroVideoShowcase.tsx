'use client';

import React, { useState, useEffect } from 'react';

interface HeroVideoShowcaseProps {
  className?: string;
  videoPath?: string;
}

export const HeroVideoShowcase: React.FC<HeroVideoShowcaseProps> = ({
  className = '',
  videoPath = '/video/ეს_ვიდეო_მომწონს_უბრალოდ_ცისფე.mp4'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div 
      className={`relative overflow-hidden bg-[#0B0F17]/90 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(0,163,255,0.15)] transition-all duration-700 ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {/* Glow highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3FF]/5 via-transparent to-[#00D2FF]/5 pointer-events-none z-10" />

      {/* Video element */}
      {isMounted && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Subtle loader fallback */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F17]/80">
          <div className="w-8 h-8 border-2 border-[#00A3FF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
