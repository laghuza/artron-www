"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { ViewState, PortalState } from '@/types/gateway';
import { GATEWAY_NODES } from '@/data/gatewayNodes';
import { FooterTelemetry } from '@/components/gateway/FooterTelemetry';
import { SidebarPanel } from '@/components/gateway/SidebarPanel';
import { NodeCanvas } from '@/components/gateway/NodeCanvas';
import { NodeDetailPanel } from '@/components/gateway/NodeDetailPanel';
import { EmeraldPortalGate } from '@/components/gateway/EmeraldPortalGate';
import { ArtronB2BDashboard } from '@/components/features/dashboard/ArtronB2BDashboard';
import { TemporaryGuestDashboard } from '@/components/features/dashboard/TemporaryGuestDashboard';
import { CyberErrorBoundary, soundEngine } from '@/core';

export default function GatewayPage() {
  const [viewState, setViewState] = useState<ViewState>('CORE_INIT');
  const [portalState, setPortalState] = useState<PortalState>('IDLE');
  const [accessMode, setAccessMode] = useState<'FULL_B2B' | 'TEMP_OTP'>('FULL_B2B');
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [activeSubChapterId, setActiveSubChapterId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTransitionTimers = useCallback(() => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  }, []);

  const handleStartPortalTransition = useCallback(() => {
    if (portalState !== 'IDLE') return;

    soundEngine.playSystemAccess();

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPortalState('ENTERED');
      return;
    }

    clearTransitionTimers();
    setPortalState('IGNITION');

    // Phase 2: Radial Shockwave Ignition (300ms) -> Phase 3: Core Expansion
    const t1 = setTimeout(() => {
      setPortalState('EXPANDING');
    }, 300);

    // Phase 3: Core Expansion (380ms) -> Phase 4: Console Reveal (ENTERED)
    const t2 = setTimeout(() => {
      setPortalState('ENTERED');
    }, 300 + 380);

    timerRef.current = [t1, t2];
  }, [portalState, clearTransitionTimers]);

  const handleAuthenticate = useCallback(
    (mode: 'FULL_B2B' | 'TEMP_OTP', _credentials?: any) => {
      setAccessMode(mode);
      handleStartPortalTransition();
    },
    [handleStartPortalTransition]
  );

  const handleBypassTransition = useCallback(() => {
    clearTransitionTimers();
    setPortalState('ENTERED');
  }, [clearTransitionTimers]);

  // Global Keyboard Triggers (ENTER to initiate, ESC to bypass)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && portalState === 'IDLE') {
        e.preventDefault();
        handleAuthenticate('FULL_B2B');
      } else if (e.key === 'Escape' && (portalState === 'IGNITION' || portalState === 'EXPANDING')) {
        e.preventDefault();
        handleBypassTransition();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [portalState, handleAuthenticate, handleBypassTransition]);

  useEffect(() => {
    return () => clearTransitionTimers();
  }, [clearTransitionTimers]);

  const activeNode = GATEWAY_NODES.find((node) => node.id === activeNodeId) || null;
  const activeSubChapter =
    activeNode?.subChapters.find((sub) => sub.id === activeSubChapterId) || null;

  const handleSelectNode = (nodeId: number) => {
    setActiveNodeId(nodeId);
    setActiveSubChapterId(null);
    setViewState('NODE_SELECTED');
  };

  const handleSelectSubChapter = (subId: string) => {
    if (subId === 'console-access' || subId === 'enter-core') {
      handleAuthenticate('FULL_B2B');
      return;
    }
    setActiveSubChapterId(subId);
    setViewState('SUBCHAPTER_VIEW');
  };

  const handleResetToCore = () => {
    setViewState('CORE_INIT');
    setActiveNodeId(null);
    setActiveSubChapterId(null);
  };

  const handleBackToNode = () => {
    setViewState('NODE_SELECTED');
    setActiveSubChapterId(null);
  };

  const handleResetToGateway = useCallback(() => {
    clearTransitionTimers();
    setPortalState('IDLE');
    setViewState('CORE_INIT');
    setActiveNodeId(null);
    setActiveSubChapterId(null);
  }, [clearTransitionTimers]);

  // Phase 4: Console Reveal (Dedicated ARt.pdf B2B Operator Console or Temporary OTP Guest Console)
  if (portalState === 'ENTERED') {
    return (
      <CyberErrorBoundary fallbackTitle="ARTRON B2B CONSOLE DIAGNOSTIC">
        <div className="w-screen h-screen overflow-x-hidden overflow-y-auto animate-console-reveal">
          {accessMode === 'TEMP_OTP' ? (
            <TemporaryGuestDashboard onExit={handleResetToGateway} />
          ) : (
            <ArtronB2BDashboard onReturnToGateway={handleResetToGateway} />
          )}
        </div>
      </CyberErrorBoundary>
    );
  }



  return (
    <CyberErrorBoundary fallbackTitle="ARTRON GATEWAY DIAGNOSTIC">
      <EmeraldPortalGate portalState={portalState} onBypass={handleBypassTransition} />

      <main
        className={`min-h-screen h-screen w-full flex flex-col justify-between overflow-hidden bg-[#090b0e] text-white transition-opacity duration-380 ${
          portalState === 'EXPANDING' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full border-b border-[#262a33]/40">
          <SidebarPanel
            viewState={viewState}
            activeNode={activeNode}
            activeSubChapterId={activeSubChapterId}
            onResetToCore={handleResetToCore}
            onSelectSubChapter={handleSelectSubChapter}
            onRequestAccess={() => handleSelectNode(9)}
            onSelectB2B={() => handleSelectNode(9)}
            onSelectOtp={() => handleAuthenticate('TEMP_OTP')}
          />




          {viewState === 'SUBCHAPTER_VIEW' && activeNodeId !== 1 ? (
            <NodeDetailPanel
              activeSubChapter={activeSubChapter}
              onBackToNode={handleBackToNode}
            />
          ) : (
            <NodeCanvas
              nodes={GATEWAY_NODES}
              activeNodeId={activeNodeId}
              activeSubChapterId={activeSubChapterId}
              viewState={viewState}
              onSelectNode={handleSelectNode}
              onPortalEntry={() => handleAuthenticate('FULL_B2B')}
              onAuthenticate={handleAuthenticate}
            />
          )}
        </div>

        <FooterTelemetry />
      </main>
    </CyberErrorBoundary>
  );
}





