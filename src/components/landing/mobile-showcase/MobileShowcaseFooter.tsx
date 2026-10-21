'use client';

import React from 'react';

export const MobileShowcaseFooter: React.FC = () => {
  return (
    <footer className="flex flex-col items-center gap-[22px] pt-6">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Apple App Store */}
        <a
          href="#b2c-mobile"
          className="group relative flex items-center gap-3.5 min-h-[64px] px-5 py-3 rounded-2xl text-[#F8FAFC] transition-all duration-400 hover:-translate-y-1"
          style={{
            background:
              'radial-gradient(120% 160% at 0% 0%, rgba(119,164,246,0.20) 0%, transparent 52%), radial-gradient(120% 160% at 100% 100%, rgba(168,148,238,0.18) 0%, transparent 52%), linear-gradient(172deg, #171E29 0%, #0C1017 52%, #06080C 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.85), inset 0 -14px 22px -14px rgba(168,148,238,0.3), inset 0 14px 22px -16px rgba(119,164,246,0.22), 0 0 0 1px rgba(0,0,0,0.9), 0 8px 14px rgba(0,0,0,0.6), 0 26px 44px -14px rgba(0,0,0,0.85), -14px 28px 52px -24px rgba(119,164,246,0.42), 14px 28px 52px -24px rgba(168,148,238,0.42)',
          }}
        >
          {/* Conic specular border */}
          <span
            className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none opacity-80"
            style={{
              background:
                'conic-gradient(from 210deg, #77A4F6 0deg, rgba(255,255,255,0.9) 40deg, #A894EE 110deg, rgba(168,148,238,0.15) 180deg, rgba(119,164,246,0.15) 250deg, #77A4F6 360deg)',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
            }}
          />

          <svg
            viewBox="0 0 24 24"
            className="w-[26px] h-[26px] shrink-0 fill-current"
            style={{
              filter:
                'drop-shadow(0 1px 0 rgba(0,0,0,0.7)) drop-shadow(0 0 8px rgba(119,164,246,0.45))',
            }}
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.56.65-.96 1.7-0.83 2.72.99.08 2.02-.48 2.53-1.22z" />
          </svg>

          <div className="flex flex-col gap-[1px]">
            <span className="text-[11px] font-normal tracking-[0.02em] text-[#B4C0D0]">
              Download on the
            </span>
            <span className="text-[19px] font-semibold tracking-[-0.015em] leading-[1.1] text-white">
              App Store
            </span>
          </div>

          <span
            className="font-mono text-[10px] font-medium tracking-[0.1em] text-[#E2C06D] rounded-full px-2.5 py-1 ml-2.5"
            style={{
              background:
                'linear-gradient(180deg, rgba(198,159,50,0.14), rgba(198,159,50,0.03))',
              boxShadow:
                'inset 0 1px 1px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(198,159,50,0.42), 0 1px 0 rgba(255,255,255,0.08), 0 0 14px rgba(198,159,50,0.18)',
            }}
          >
            v2.4 AVAILABLE
          </span>
        </a>

        {/* Google Play */}
        <a
          href="#b2c-mobile"
          className="group relative flex items-center gap-3.5 min-h-[64px] px-5 py-3 rounded-2xl text-[#F8FAFC] transition-all duration-400 hover:-translate-y-1"
          style={{
            background:
              'radial-gradient(120% 160% at 0% 0%, rgba(76,189,136,0.20) 0%, transparent 52%), radial-gradient(120% 160% at 100% 100%, rgba(198,159,50,0.18) 0%, transparent 52%), linear-gradient(172deg, #171E29 0%, #0C1017 52%, #06080C 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.85), inset 0 -14px 22px -14px rgba(198,159,50,0.3), inset 0 14px 22px -16px rgba(76,189,136,0.22), 0 0 0 1px rgba(0,0,0,0.9), 0 8px 14px rgba(0,0,0,0.6), 0 26px 44px -14px rgba(0,0,0,0.85), -14px 28px 52px -24px rgba(76,189,136,0.42), 14px 28px 52px -24px rgba(198,159,50,0.42)',
          }}
        >
          {/* Conic specular border */}
          <span
            className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none opacity-80"
            style={{
              background:
                'conic-gradient(from 210deg, #4CBD88 0deg, rgba(255,255,255,0.9) 40deg, #C69F32 110deg, rgba(198,159,50,0.15) 180deg, rgba(76,189,136,0.15) 250deg, #4CBD88 360deg)',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
            }}
          />

          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 shrink-0 fill-current"
            style={{
              filter:
                'drop-shadow(0 1px 0 rgba(0,0,0,0.7)) drop-shadow(0 0 8px rgba(76,189,136,0.45))',
            }}
          >
            <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
          </svg>

          <div className="flex flex-col gap-[1px]">
            <span className="text-[11px] font-normal tracking-[0.06em] text-[#B4C0D0]">
              GET IT ON
            </span>
            <span className="text-[19px] font-semibold tracking-[-0.015em] leading-[1.1] text-white">
              Google Play
            </span>
          </div>

          <span
            className="font-mono text-[10px] font-medium tracking-[0.1em] text-[#E2C06D] rounded-full px-2.5 py-1 ml-2.5"
            style={{
              background:
                'linear-gradient(180deg, rgba(198,159,50,0.14), rgba(198,159,50,0.03))',
              boxShadow:
                'inset 0 1px 1px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(198,159,50,0.42), 0 1px 0 rgba(255,255,255,0.08), 0 0 14px rgba(198,159,50,0.18)',
            }}
          >
            v2.4 AVAILABLE
          </span>
        </a>
      </div>

      <span className="font-mono text-xs tracking-[0.14em] text-[#8E99A8] text-center">
        iOS · ANDROID — NATIVE
      </span>
    </footer>
  );
};
