'use client';

import React from 'react';
import { ScreenEntryPass } from './ScreenEntryPass';
import { ScreenCoach } from './ScreenCoach';
import { ScreenShield } from './ScreenShield';
import { ScreenRenewal } from './ScreenRenewal';

interface GroupOneScreensProps {
  shownId: number;
  qrCells: { c: string }[];
  sec: number;
  tap: 'idle' | 'reading' | 'ok';
  visits: number;
  onTap: () => void;
  // Plan/Renew
  selectedPlan: number;
  onSelectPlan: (idx: number) => void;
  autoRenew: boolean;
  onToggleAutoRenew: () => void;
  renewStage: 'idle' | 'scan' | 'done';
  onRenew: () => void;
  // Coach/Booking
  pickedSlot: number;
  onPickSlot: (idx: number) => void;
  bookStage: 'idle' | 'done';
  onBook: () => void;
  // Guarantee
  buyStage: 'idle' | 'scan' | 'done';
  onBuy: () => void;
  // Target Refs for inner beam
  qrRef: React.RefObject<HTMLDivElement | null>;
  payRef: React.RefObject<HTMLDivElement | null>;
  slotsRef: React.RefObject<HTMLDivElement | null>;
  sealRef: React.RefObject<HTMLDivElement | null>;
}

export const GroupOneScreens: React.FC<GroupOneScreensProps> = ({
  shownId,
  qrCells,
  sec,
  tap,
  visits,
  onTap,
  selectedPlan,
  onSelectPlan,
  autoRenew,
  onToggleAutoRenew,
  renewStage,
  onRenew,
  pickedSlot,
  onPickSlot,
  bookStage,
  onBook,
  buyStage,
  onBuy,
  qrRef,
  payRef,
  slotsRef,
  sealRef,
}) => {
  return (
    <>
      {/* SCREEN 0: ENTRY PASS (01) */}
      {shownId === 0 && (
        <ScreenEntryPass
          qrCells={qrCells}
          sec={sec}
          tap={tap}
          visits={visits}
          onTap={onTap}
          qrRef={qrRef}
        />
      )}

      {/* SCREEN 1: MENTOR / COACH (02) */}
      {shownId === 1 && (
        <ScreenCoach
          pickedSlot={pickedSlot}
          onPickSlot={onPickSlot}
          bookStage={bookStage}
          onBook={onBook}
          slotsRef={slotsRef}
        />
      )}

      {/* SCREEN 2: LEGAL SHIELD / GUARANTEE (03) */}
      {shownId === 2 && (
        <ScreenShield
          buyStage={buyStage}
          onBuy={onBuy}
          sealRef={sealRef}
        />
      )}

      {/* SCREEN 3: RENEWAL (04) */}
      {shownId === 3 && (
        <ScreenRenewal
          selectedPlan={selectedPlan}
          onSelectPlan={onSelectPlan}
          autoRenew={autoRenew}
          onToggleAutoRenew={onToggleAutoRenew}
          renewStage={renewStage}
          onRenew={onRenew}
          payRef={payRef}
        />
      )}
    </>
  );
};
