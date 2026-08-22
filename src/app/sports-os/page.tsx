"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { I18nProvider } from '@/context/I18nContext';

import { ViewState, PortalState, FacilityPreset } from '@/types/gateway';
import { GATEWAY_NODES } from '@/data/gatewayNodes';
import { FooterTelemetry } from '@/components/gateway/FooterTelemetry';
import { SidebarPanel } from '@/components/gateway/SidebarPanel';
import { NodeCanvas } from '@/components/gateway/NodeCanvas';
import { EmeraldPortalGate } from '@/components/gateway/EmeraldPortalGate';
import { SimpleOperatorDashboard } from '@/components/features/dashboard/SimpleOperatorDashboard';
import { TemporaryGuestDashboard } from '@/components/features/dashboard/TemporaryGuestDashboard';
import { OperatorLoginModal } from '@/components/gateway/OperatorLoginModal';
import { CyberErrorBoundary, soundEngine } from '@/core';

export default function GatewayPage() {
  return (
    <I18nProvider>
      <GatewayPageContent />
    </I18nProvider>
  );
}

function GatewayPageContent() {
  const router = useRouter();
  const [viewState, setViewState] = useState<ViewState>('CORE_INIT');
  const [portalState, setPortalState] = useState<PortalState>('IDLE');
  const [accessMode, setAccessMode] = useState<'FULL_B2B' | 'TEMP_OTP'>('FULL_B2B');
  const [facilityPreset, setFacilityPreset] = useState<FacilityPreset>('ALL');
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [activeSubChapterId, setActiveSubChapterId] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<{
    username: string;
    orgName?: string;
    discipline?: string;
    adminName?: string;
    isTrial?: boolean;
  } | null>(null);
  const [isMuted, setIsMuted] = useState(false);

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
    (
      mode: 'FULL_B2B' | 'TEMP_OTP',
      credentials?: { username?: string; orgName?: string; discipline?: string; adminName?: string; isTrial?: boolean }
    ) => {
      setAccessMode(mode);
      if (credentials) {
        setSessionUser({
          username: credentials.username || 'operator@artron.ge',
          orgName: credentials.orgName,
          discipline: credentials.discipline,
          adminName: credentials.adminName,
          isTrial: credentials.isTrial ?? false,
        });
      } else {
        setSessionUser({
          username: 'operator@artron.ge',
          isTrial: false,
        });
      }
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
    activeNode?.subChapters.find(
      (sub) =>
        sub.id === activeSubChapterId ||
        (activeSubChapterId === 'membership-init' && sub.id === '09.1') ||
        (activeSubChapterId === 'console-access' && sub.id === '09.3')
    ) || null;

  const handleSelectNode = (nodeId: number) => {
    setActiveNodeId(nodeId);
    setActiveSubChapterId(null);
    setViewState('NODE_SELECTED');
  };

  const handleSelectSubChapter = (subId: string) => {
    if (subId === '09.1' || subId === 'membership-init') {
      soundEngine.playSystemAccess();
      router.push('/get-started?mode=register');
      return;
    }
    if (subId === '09.2' || subId === 'sandbox-demo') {
      soundEngine.playPulseNode();
      router.push('/get-started?mode=demo');
      return;
    }
    if (subId === 'console-access' || subId === '09.3' || subId === 'enter-core') {
      soundEngine.playPulseNode();
      setIsLoginModalOpen(true);
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

  // Phase 4: Console Reveal (Dedicated B2B Operator Console or Temporary OTP Guest Console)
  if (portalState === 'ENTERED') {
    return (
      <CyberErrorBoundary fallbackTitle="ARTRON B2B CONSOLE DIAGNOSTIC">
        <div className="w-screen h-screen overflow-hidden animate-console-reveal">
          {accessMode === 'TEMP_OTP' ? (
            <TemporaryGuestDashboard onExit={handleResetToGateway} />
          ) : (
            <SimpleOperatorDashboard
              sessionUser={sessionUser}
              onReturnToGateway={handleResetToGateway}
              onOpenNode={(nodeId) => {
                handleResetToGateway();
                handleSelectNode(nodeId);
              }}
            />
          )}
        </div>
      </CyberErrorBoundary>
    );
  }

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
    if (!nextMute) soundEngine.playPulseNode();
  };

  const isNodeSelected = activeNodeId !== null;

  return (
    <CyberErrorBoundary fallbackTitle="ARTRON GATEWAY DIAGNOSTIC">
      <EmeraldPortalGate portalState={portalState} onBypass={handleBypassTransition} />

      {/* Operator Login Modal */}
      <OperatorLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setIsLoginModalOpen(false);
          handleAuthenticate('FULL_B2B', {
            username: user.username,
            orgName: user.orgName,
            discipline: user.discipline,
          });
        }}
      />

      <main
        className={`min-h-screen h-screen w-full flex flex-col justify-between overflow-hidden bg-[#090b0e] text-white transition-opacity duration-380 ${
          portalState === 'EXPANDING' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full border-b border-[#262a33]/40 relative">
          {/* Left 40% Control & Telemetry Panel (Animated reveal on node click) */}
          <div
            className={`h-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isNodeSelected
                ? "w-full lg:w-[40%] opacity-100 flex flex-col"
                : "w-0 opacity-0 pointer-events-none p-0 m-0 border-0 hidden"
            }`}
          >
            {isNodeSelected && (
              <SidebarPanel
                viewState={viewState}
                activeNode={activeNode}
                activeSubChapterId={activeSubChapterId}
                activePreset={facilityPreset}
                onSelectPreset={setFacilityPreset}
                onResetToCore={handleResetToCore}
                onSelectSubChapter={handleSelectSubChapter}
                onRequestAccess={() => {
                  soundEngine.playPulseNode();
                  router.push('/get-started?mode=demo');
                }}
                onSelectB2B={() => {
                  soundEngine.playSystemAccess();
                  router.push('/get-started?mode=register');
                }}
                onSelectOtp={() => {
                  soundEngine.playPulseNode();
                  router.push('/get-started?mode=demo');
                }}
              />
            )}
          </div>

          {/* Right / Full-Screen Quantum Node Canvas */}
          <div
            className={`h-full flex-1 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isNodeSelected ? "w-full lg:w-[60%]" : "w-full"
            }`}
          >
            <NodeCanvas
              nodes={GATEWAY_NODES}
              activeNodeId={activeNodeId}
              activeSubChapterId={activeSubChapterId}
              activePreset={facilityPreset}
              viewState={viewState}
              onSelectNode={handleSelectNode}
              onPortalEntry={() => setIsLoginModalOpen(true)}
              onAuthenticate={handleAuthenticate}
              isSplitMode={isNodeSelected}
              onSelectPreset={setFacilityPreset}
              isMuted={isMuted}
              onToggleMute={toggleMute}
            />
          </div>
        </div>

        <FooterTelemetry />
      </main>
    </CyberErrorBoundary>
  );
}





