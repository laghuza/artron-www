'use client';

import React from 'react';
import { GroupOneScreens } from './GroupOneScreens';
import { GroupTwoScreens } from './GroupTwoScreens';

interface MobileScreenViewsProps {
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
  // Streak
  streak: number;
  todayH: number;
  // Freeze
  frzDays: number;
  frzDone: boolean;
  onFreeze: () => void;
  // Guest
  guestSent: 'idle' | 'sending' | 'done';
  guestsLeft: number;
  onSendGuest: () => void;
  // Live load
  occupancy: number;
  // Target Refs for inner beam
  qrRef: React.RefObject<HTMLDivElement | null>;
  payRef: React.RefObject<HTMLDivElement | null>;
  slotsRef: React.RefObject<HTMLDivElement | null>;
  sealRef: React.RefObject<HTMLDivElement | null>;
  barsRef: React.RefObject<HTMLDivElement | null>;
  freezeRef: React.RefObject<HTMLDivElement | null>;
  guestRef: React.RefObject<HTMLDivElement | null>;
  occRef: React.RefObject<HTMLDivElement | null>;
}

export const MobileScreenViews: React.FC<MobileScreenViewsProps> = (props) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between">
      {props.shownId < 4 ? (
        <GroupOneScreens
          shownId={props.shownId}
          qrCells={props.qrCells}
          sec={props.sec}
          tap={props.tap}
          visits={props.visits}
          onTap={props.onTap}
          selectedPlan={props.selectedPlan}
          onSelectPlan={props.onSelectPlan}
          autoRenew={props.autoRenew}
          onToggleAutoRenew={props.onToggleAutoRenew}
          renewStage={props.renewStage}
          onRenew={props.onRenew}
          pickedSlot={props.pickedSlot}
          onPickSlot={props.onPickSlot}
          bookStage={props.bookStage}
          onBook={props.onBook}
          buyStage={props.buyStage}
          onBuy={props.onBuy}
          qrRef={props.qrRef}
          payRef={props.payRef}
          slotsRef={props.slotsRef}
          sealRef={props.sealRef}
        />
      ) : (
        <GroupTwoScreens
          shownId={props.shownId}
          qrCells={props.qrCells}
          streak={props.streak}
          todayH={props.todayH}
          frzDays={props.frzDays}
          frzDone={props.frzDone}
          onFreeze={props.onFreeze}
          guestSent={props.guestSent}
          guestsLeft={props.guestsLeft}
          onSendGuest={props.onSendGuest}
          occupancy={props.occupancy}
          barsRef={props.barsRef}
          freezeRef={props.freezeRef}
          guestRef={props.guestRef}
          occRef={props.occRef}
        />
      )}
    </div>
  );
};
