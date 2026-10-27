'use client';

import React from 'react';
import { MobileFeatureDeck } from './MobileFeatureDeck';
import { MobilePhoneChassis } from './MobilePhoneChassis';
import { MobileScreenViews } from './MobileScreenViews';
import { MobileShowcaseFooter } from './MobileShowcaseFooter';
import { MobileSlimCardCarousel } from './MobileSlimCardCarousel';
import { soundEngine } from '@/core';
import { useMobileShowcaseLogic } from './useMobileShowcaseLogic';

export const ArtronMobileShowcase: React.FC = () => {
  const logic = useMobileShowcaseLogic();

  return (
    <section
      id="mobile-app"
      data-screen-label="B2C Mobile Showcase"
      className="relative w-full overflow-hidden text-[#F8FAFC] select-none scroll-mt-20"
      style={{
        background:
          'radial-gradient(ellipse 38% 26% at 78% 10%, rgba(248,250,252,.03) 0%, rgba(224,242,254,.02) 45%, rgba(224,242,254,0) 75%), radial-gradient(ellipse 70% 55% at 75% 35%, rgba(14,34,61,.75) 0%, rgba(8,20,38,.4) 45%, rgba(4,6,10,0) 75%), radial-gradient(ellipse 50% 40% at 6% 0%, rgba(8,20,38,.55) 0%, rgba(4,6,10,0) 70%), linear-gradient(180deg, rgba(224,242,254,.018) 0%, rgba(224,242,254,0) 28%), #04060A',
      }}
    >
      {/* Anchor targets */}
      <span id="b2c-mobile" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Sacred Geometry Background Grid & Golden Ratio Lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none text-slate-200/[0.075]"
      >
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="21" y="13" width="958" height="974" vectorEffect="non-scaling-stroke" />
            <rect x="29" y="21" width="942" height="958" vectorEffect="non-scaling-stroke" opacity="0.55" />
            <line x1="381.97" y1="13" x2="381.97" y2="987" vectorEffect="non-scaling-stroke" />
            <line x1="618.03" y1="13" x2="618.03" y2="987" vectorEffect="non-scaling-stroke" />
            <line x1="21" y1="381.97" x2="979" y2="381.97" vectorEffect="non-scaling-stroke" />
            <line x1="21" y1="618.03" x2="979" y2="618.03" vectorEffect="non-scaling-stroke" />
            <line x1="236.07" y1="21" x2="236.07" y2="979" strokeDasharray="1 7" vectorEffect="non-scaling-stroke" />
            <line x1="763.93" y1="21" x2="763.93" y2="979" strokeDasharray="1 7" vectorEffect="non-scaling-stroke" />
            <line x1="29" y1="236.07" x2="971" y2="236.07" strokeDasharray="1 7" vectorEffect="non-scaling-stroke" />
            <line x1="29" y1="763.93" x2="971" y2="763.93" strokeDasharray="1 7" vectorEffect="non-scaling-stroke" />
            <line x1="29" y1="979" x2="618.03" y2="21" opacity="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="381.97" y1="21" x2="971" y2="979" opacity="0.5" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        {/* Parallax Facets */}
        <div
          className="absolute inset-0 text-cyan-100/[0.045] transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${(-logic.ry * 13).toFixed(1)}px, ${(logic.rx * 8).toFixed(1)}px, 0)`,
          }}
        >
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <g fill="currentColor" stroke="currentColor" strokeWidth="1">
              <polygon points="618.03,90 905,236.07 854,560 618.03,381.97" fillOpacity="0.9" vectorEffect="non-scaling-stroke" />
              <polygon points="618.03,381.97 854,560 763.93,854 560,700" fillOpacity="0.5" vectorEffect="non-scaling-stroke" />
              <polygon points="700,34 971,120 905,236.07" fillOpacity="0.35" vectorEffect="non-scaling-stroke" />
              <polygon points="854,560 971,480 971,800 763.93,854" fillOpacity="0.22" vectorEffect="non-scaling-stroke" />
              <polygon points="34,236.07 236.07,120 381.97,236.07 236.07,381.97" fillOpacity="0.28" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </div>

        {/* Golden Section Diamond Markers */}
        <span className="absolute left-[38.2%] top-[38.2%] w-[7px] h-[7px] -mt-1 -ml-1 rotate-45 border border-cyan-100/[0.24]" />
        <span className="absolute left-[61.8%] top-[38.2%] w-[7px] h-[7px] -mt-1 -ml-1 rotate-45 border border-cyan-100/[0.24]" />
        <span className="absolute left-[38.2%] top-[61.8%] w-[7px] h-[7px] -mt-1 -ml-1 rotate-45 border border-cyan-100/[0.24]" />
        <span className="absolute left-[61.8%] top-[61.8%] w-[7px] h-[7px] -mt-1 -ml-1 rotate-45 border border-cyan-100/[0.24]" />

        {/* Sacred Geometry Labels */}
        <span className="absolute left-[calc(38.2%+9px)] top-[34px] font-mono text-[11px] tracking-wider text-cyan-100/[0.24]">0.382</span>
        <span className="absolute left-[calc(61.8%+9px)] top-[34px] font-mono text-[11px] tracking-wider text-cyan-100/[0.24]">ψ · 0.618</span>
        <span className="absolute left-[calc(2.1%+14px)] top-[calc(61.8%+9px)] font-mono text-[11px] tracking-wider text-cyan-100/[0.24]">1 : 1.618</span>
      </div>

      <div
        id="b2c-experience"
        className="max-w-[1280px] mx-auto relative px-4 sm:px-8 py-10 sm:py-[89px] flex flex-col gap-5 sm:gap-[55px] box-border"
      >
        {/* Left-Aligned Master Header */}
        <header className="flex flex-col items-start gap-3 sm:gap-5 max-w-[860px]">
          <div className="flex items-center gap-3.5">
            <span className="w-7 h-[1px] bg-gradient-to-r from-transparent to-[#E0F2FE]" />
            <span className="font-mono text-xs tracking-[0.16em] text-[#A8B4C4]">
              B2C — ATHLETE DIGITAL FREEDOM
            </span>
          </div>

          <h2 className="m-0 font-semibold text-[clamp(26px,4.6vw,62px)] leading-[1.1] tracking-[-0.025em] text-[#F8FAFC]">
            სრული ციფრული თავისუფლება სპორტსმენისთვის
          </h2>

          <p className="m-0 text-sm sm:text-[19px] font-normal leading-[1.5] sm:leading-[1.62] text-[#9BA8B9] max-w-[620px]">
            <span className="hidden sm:inline">ნულოვანი ბიუროკრატია, მყისიერი წვდომა და პერსონალური პროგრესი ერთიან ეკოსისტემაში.</span>
            <span className="sm:hidden">ნულოვანი ბიუროკრატია, მყისიერი წვდომა & პერსონალური პროგრესი.</span>
          </p>
        </header>

        {/* Mobile-Only Slim Horizontal Cards Carousel */}
        <div className="block lg:hidden w-full -mt-2">
          <MobileSlimCardCarousel
            activeId={logic.activeId}
            onSelect={logic.handleSelect}
          />
        </div>

        {/* Main Showcase Row: Desktop 2-column flex, Mobile single-column flex */}
        <div
          ref={logic.rowRef}
          onMouseMove={logic.handleMouseMove}
          onMouseLeave={logic.handleMouseLeave}
          className="relative flex flex-col lg:flex-row gap-2 sm:gap-6 lg:gap-[34px] items-start w-full"
        >
          {/* Column A: Desktop-Only 3D Feature Deck */}
          <div className="hidden lg:block flex-[1.272_1_420px] min-w-0">
            <MobileFeatureDeck
              activeId={logic.activeId}
              onSelect={logic.handleSelect}
              cardsRef={logic.cardsRef}
              wide={logic.wide}
              bridgeW={logic.bridgeW}
            />
          </div>

          {/* Column B: 3D Smartphone Chassis & ƒ · LOGIC panel */}
          <div
            ref={logic.phoneColRef}
            className="w-full lg:flex-[1_1_440px] min-w-0 lg:sticky lg:top-3 self-start flex flex-col items-center gap-4 lg:gap-[18px]"
          >
            <MobilePhoneChassis
              activeId={logic.activeId}
              shownId={logic.shownId}
              phoneRef={logic.phoneRef}
              phoneColRef={logic.phoneColRef}
              rx={logic.rx}
              ry={logic.ry}
              onTilt={logic.handleMouseMove}
              onTiltLeave={logic.handleMouseLeave}
              onSwipeLeft={() => {
                soundEngine.playPulseNode();
                logic.handleSelect((logic.activeId + 1) % 8);
              }}
              onSwipeRight={() => {
                soundEngine.playPulseNode();
                logic.handleSelect((logic.activeId - 1 + 8) % 8);
              }}
              inner={logic.inner}
              notif={logic.notif}
              notifTilt={logic.notifTilt}
              visits={logic.visits}
              streak={logic.streak}
              frzDays={logic.frzDays}
              guestsLeft={logic.guestsLeft}
              occupancy={logic.occupancy}
              pickedSlot={logic.pickedSlot}
              renewStage={logic.renewStage}
              selectedPlan={logic.selectedPlan}
            >
              <MobileScreenViews
                shownId={logic.shownId}
                qrCells={logic.qrCells}
                sec={logic.sec}
                tap={logic.tap}
                visits={logic.visits}
                onTap={logic.handleTap}
                selectedPlan={logic.selectedPlan}
                onSelectPlan={logic.setSelectedPlan}
                autoRenew={logic.autoRenew}
                onToggleAutoRenew={() => logic.setAutoRenew(!logic.autoRenew)}
                renewStage={logic.renewStage}
                onRenew={logic.handleRenew}
                pickedSlot={logic.pickedSlot}
                onPickSlot={logic.setPickedSlot}
                bookStage={logic.bookStage}
                onBook={logic.handleBook}
                buyStage={logic.buyStage}
                onBuy={logic.handleBuy}
                streak={logic.streak}
                todayH={logic.todayH}
                frzDays={logic.frzDays}
                frzDone={logic.frzDone}
                onFreeze={logic.handleFreeze}
                guestSent={logic.guestSent}
                guestsLeft={logic.guestsLeft}
                onSendGuest={logic.handleSendGuest}
                occupancy={logic.occupancy}
                qrRef={logic.qrRef}
                payRef={logic.payRef}
                slotsRef={logic.slotsRef}
                sealRef={logic.sealRef}
                barsRef={logic.barsRef}
                freezeRef={logic.freezeRef}
                guestRef={logic.guestRef}
                occRef={logic.occRef}
              />
            </MobilePhoneChassis>
          </div>
        </div>

        {/* Section Footer: App Store & Google Play Badges with Conic Sweeps */}
        <MobileShowcaseFooter />
      </div>
    </section>
  );
};

