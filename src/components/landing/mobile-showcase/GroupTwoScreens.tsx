'use client';

import React from 'react';
import { ScreenProgress } from './ScreenProgress';
import { ScreenFreeze } from './ScreenFreeze';
import { ScreenGuestPass } from './ScreenGuestPass';
import { ScreenLiveLoad } from './ScreenLiveLoad';

interface GroupTwoScreensProps {
  shownId: number;
  qrCells: { c: string }[];
  streak: number;
  todayH: number;
  frzDays: number;
  frzDone: boolean;
  onFreeze: () => void;
  guestSent: 'idle' | 'sending' | 'done';
  guestsLeft: number;
  onSendGuest: () => void;
  occupancy: number;
  // Target Refs for inner beam
  barsRef: React.RefObject<HTMLDivElement | null>;
  freezeRef: React.RefObject<HTMLDivElement | null>;
  guestRef: React.RefObject<HTMLDivElement | null>;
  occRef: React.RefObject<HTMLDivElement | null>;
}

export const GroupTwoScreens: React.FC<GroupTwoScreensProps> = ({
  shownId,
  qrCells,
  streak,
  todayH,
  frzDays,
  frzDone,
  onFreeze,
  guestSent,
  guestsLeft,
  onSendGuest,
  occupancy,
  barsRef,
  freezeRef,
  guestRef,
  occRef,
}) => {
  return (
    <>
      {/* SCREEN 4: PROGRESS & STREAK (05) */}
      {shownId === 4 && (
        <ScreenProgress
          streak={streak}
          todayH={todayH}
          barsRef={barsRef}
        />
      )}

      {/* SCREEN 5: 1-CLICK FREEZE (06) */}
      {shownId === 5 && (
        <ScreenFreeze
          frzDays={frzDays}
          frzDone={frzDone}
          onFreeze={onFreeze}
          freezeRef={freezeRef}
        />
      )}

      {/* SCREEN 6: GUEST PASS (07) */}
      {shownId === 6 && (
        <ScreenGuestPass
          qrCells={qrCells}
          guestSent={guestSent}
          guestsLeft={guestsLeft}
          onSendGuest={onSendGuest}
          guestRef={guestRef}
        />
      )}

      {/* SCREEN 7: LIVE LOAD & HEATMAP (08) */}
      {shownId === 7 && (
        <ScreenLiveLoad
          occupancy={occupancy}
          occRef={occRef}
        />
      )}
    </>
  );
};
