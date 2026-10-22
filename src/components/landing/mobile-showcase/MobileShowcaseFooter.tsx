'use client';

import React from 'react';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';

export const MobileShowcaseFooter: React.FC = () => {
  return (
    <footer className="flex flex-col items-center gap-[22px] pt-6">
      <AppStoreBadges align="center" showPlatformSubtext={true} />
    </footer>
  );
};
