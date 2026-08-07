"use client";

import React, { useState } from 'react';
import { ViewState } from '@/types/gateway';
import { GATEWAY_NODES } from '@/data/gatewayNodes';
import { FooterTelemetry } from '@/components/gateway/FooterTelemetry';
import { SidebarPanel } from '@/components/gateway/SidebarPanel';
import { NodeCanvas } from '@/components/gateway/NodeCanvas';
import { NodeDetailPanel } from '@/components/gateway/NodeDetailPanel';
import { SystemAccessModal } from '@/components/gateway/SystemAccessModal';
import { CyberErrorBoundary } from '@/core';

export default function GatewayPage() {
  const [viewState, setViewState] = useState<ViewState>('CORE_INIT');
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [activeSubChapterId, setActiveSubChapterId] = useState<string | null>(null);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  const activeNode = GATEWAY_NODES.find((node) => node.id === activeNodeId) || null;
  const activeSubChapter =
    activeNode?.subChapters.find((sub) => sub.id === activeSubChapterId) || null;

  const handleSelectNode = (nodeId: number) => {
    if (nodeId === 9) {
      setIsAccessModalOpen(true);
      return;
    }
    setActiveNodeId(nodeId);
    setActiveSubChapterId(null);
    setViewState('NODE_SELECTED');
  };

  const handleSelectSubChapter = (subId: string) => {
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

  return (
    <CyberErrorBoundary fallbackTitle="ARTRON GATEWAY DIAGNOSTIC">
      <main className="min-h-screen h-screen w-full flex flex-col justify-between overflow-hidden bg-[#090b0e] text-white">
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full border-b border-[#262a33]/40">
          <SidebarPanel
            viewState={viewState}
            activeNode={activeNode}
            activeSubChapterId={activeSubChapterId}
            onResetToCore={handleResetToCore}
            onSelectSubChapter={handleSelectSubChapter}
            onRequestAccess={() => setIsAccessModalOpen(true)}
          />

          {viewState === 'SUBCHAPTER_VIEW' ? (
            <NodeDetailPanel
              activeSubChapter={activeSubChapter}
              onBackToNode={handleBackToNode}
            />
          ) : (
            <NodeCanvas
              nodes={GATEWAY_NODES}
              activeNodeId={activeNodeId}
              viewState={viewState}
              onSelectNode={handleSelectNode}
            />
          )}
        </div>

        <FooterTelemetry />

        {/* Unified System Access Modal for Pre-Registration & Authorization */}
        <SystemAccessModal
          isOpen={isAccessModalOpen}
          onClose={() => setIsAccessModalOpen(false)}
        />
      </main>
    </CyberErrorBoundary>
  );
}


