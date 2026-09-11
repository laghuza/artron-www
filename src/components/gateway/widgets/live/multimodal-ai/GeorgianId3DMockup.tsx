'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Check, Sparkles, Cpu } from 'lucide-react';
import { TiltCard } from '@/components/landing/dual-core/TiltCard';

interface GeorgianId3DMockupProps {
  ocrStep: 'IDLE' | 'SCANNING' | 'DONE';
  locale: string;
}

export const GeorgianId3DMockup: React.FC<GeorgianId3DMockupProps> = ({
  ocrStep,
  locale
}) => {
  return (
    <div className="relative flex flex-col items-center select-none w-full my-2">
      {/* Ambient background glow behind the 3D ID Card */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#0066FF]/20 via-[#00A3FF]/15 to-[#00ff87]/15 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* 3D Tilt Wrapper with Card Perspective */}
      <TiltCard className="w-full max-w-[360px] sm:max-w-[400px]" maxDeg={14}>
        {/* Physical ID-1 Card Chassis (Plastic Card Bevel & Border Glow) */}
        <div className="relative aspect-[1.586/1] rounded-2xl p-[2.5px] bg-gradient-to-br from-white/40 via-[#00A3FF]/50 to-white/15 shadow-[0_20px_50px_rgba(0,163,255,0.3),0_0_0_1px_rgba(255,255,255,0.18),inset_0_1px_2px_rgba(255,255,255,0.4)] overflow-hidden">
          
          {/* Inner Card Body with High-Res Georgian ID Graphic */}
          <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#0A0E17]">
            {/* Real Georgian ID Card Image */}
            <Image
              src="/video/georgian-id.png"
              alt="Georgian National ID Card"
              fill
              priority
              sizes="(max-width: 640px) 360px, 400px"
              className="object-cover rounded-[14px] brightness-105 contrast-[1.02]"
            />

            {/* Subtle Vignette & Contrast Film */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

            {/* Holographic Specular Sheen (Moves subtly across card) */}
            <div className="absolute -top-[120%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/[0.16] via-cyan-400/[0.08] to-transparent rotate-[32deg] pointer-events-none z-20" />

            {/* Cyber OCR Grid Overlay during scan or idle */}
            <div 
              className={`absolute inset-0 transition-opacity duration-300 pointer-events-none z-10 ${
                ocrStep === 'SCANNING' ? 'opacity-30' : 'opacity-10'
              }`}
              style={{
                backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.4) 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />

            {/* 4 Corner Targeting Reticles (HUD OCR Camera Target) */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00E5FF] z-30 shadow-[0_0_8px_#00E5FF]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00E5FF] z-30 shadow-[0_0_8px_#00E5FF]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00E5FF] z-30 shadow-[0_0_8px_#00E5FF]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00E5FF] z-30 shadow-[0_0_8px_#00E5FF]" />

            {/* Top HUD Badges */}
            <div className="absolute top-2.5 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-[#00E5FF]">
                <Cpu className="w-2.5 h-2.5 text-[#00E5FF]" />
                <span>GEORGIA ID // CHIP</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 backdrop-blur-md border border-emerald-500/40 text-[9px] font-mono text-emerald-400 font-bold">
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>AES-256</span>
              </div>
            </div>

            {/* DYNAMIC LASER SCANNING BEAM */}
            {ocrStep === 'SCANNING' && (
              <motion.div
                className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_18px_#00E5FF,0_0_30px_#00A3FF] pointer-events-none z-40"
                initial={{ top: '2%' }}
                animate={{ top: ['4%', '92%', '4%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Laser focal flare */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-[#00E5FF]/40 blur-sm rounded-full" />
              </motion.div>
            )}

            {/* AI OCR BOUNDING BOXES (Appear when DONE) */}
            <AnimatePresence>
              {ocrStep === 'DONE' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none z-30"
                >
                  {/* Name Bounding Box (Top Right Area) */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute top-[28%] left-[34%] w-[60%] h-[18%] rounded border border-emerald-400/80 bg-emerald-400/10 shadow-[0_0_12px_rgba(52,211,153,0.3)] flex items-center justify-between px-2"
                  >
                    <span className="text-[8px] font-mono text-emerald-300 font-bold bg-black/70 px-1 rounded">
                      NAME: 100%
                    </span>
                    <Check className="w-3 h-3 text-emerald-400" />
                  </motion.div>

                  {/* Personal ID Bounding Box (Middle Right) */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-[49%] left-[34%] w-[60%] h-[16%] rounded border border-[#00E5FF]/80 bg-[#00E5FF]/10 shadow-[0_0_12px_rgba(0,229,255,0.3)] flex items-center justify-between px-2"
                  >
                    <span className="text-[8px] font-mono text-[#00E5FF] font-bold bg-black/70 px-1 rounded">
                      ID_NUM: 99.9%
                    </span>
                    <Check className="w-3 h-3 text-[#00E5FF]" />
                  </motion.div>

                  {/* Date of Birth Bounding Box */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-[68%] left-[34%] w-[42%] h-[15%] rounded border border-cyan-400/80 bg-cyan-400/10 shadow-[0_0_12px_rgba(34,211,238,0.3)] flex items-center justify-between px-2"
                  >
                    <span className="text-[8px] font-mono text-cyan-300 font-bold bg-black/70 px-1 rounded">
                      DOB: 100%
                    </span>
                    <Check className="w-2.5 h-2.5 text-cyan-400" />
                  </motion.div>

                  {/* Photo Face Recognition Box */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="absolute top-[22%] left-[4%] w-[27%] h-[68%] rounded-lg border-2 border-dashed border-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_15px_rgba(0,229,255,0.4)] flex flex-col justify-between p-1"
                  >
                    <span className="text-[7px] font-mono text-[#00E5FF] font-black uppercase text-center bg-black/80 rounded py-0.5">
                      FACE DETECT
                    </span>
                    <div className="flex justify-center">
                      <Sparkles className="w-3 h-3 text-[#00ff87] animate-pulse" />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom ID Status Line */}
            <div className="absolute bottom-2 left-4 right-4 z-30 flex items-center justify-between text-[8px] font-mono text-white/80 pointer-events-none">
              <span className="bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                {locale === 'ka' ? 'საქართველოს მოქალაქე' : 'CITIZEN OF GEORGIA'}
              </span>
              <span className="text-emerald-400 font-bold bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                {ocrStep === 'SCANNING' 
                  ? (locale === 'ka' ? 'სკანირება...' : 'SCANNING...') 
                  : ocrStep === 'DONE'
                  ? 'VERIFIED ✓'
                  : 'READY'}
              </span>
            </div>
          </div>
        </div>
      </TiltCard>

      <div className="text-center mt-2">
        <p className="text-[10px] font-mono text-[#94A3B8]">
          {locale === 'ka' 
            ? 'დახარეთ კურსორი 3D პერსპექტივისთვის • Gemini Flash Vision OCR' 
            : 'Move cursor to inspect 3D perspective • Gemini Flash Vision OCR'}
        </p>
      </div>
    </div>
  );
};
