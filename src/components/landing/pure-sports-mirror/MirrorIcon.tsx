'use client';

import React from 'react';
import {
  Dumbbell,
  GraduationCap,
  Building2,
  Medal,
  Scale,
  Briefcase,
  ClipboardCheck,
  Stethoscope,
  Wrench,
  LifeBuoy,
  Award,
  BadgeCheck,
  Trophy,
  Swords,
  Target,
  Landmark,
  Users,
  Globe,
  Zap,
  Activity,
  LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  // Venues
  dumbbell: Dumbbell,
  'graduation-cap': GraduationCap,
  'building-2': Building2,
  medal: Medal,
  scale: Scale,

  // Workforce
  briefcase: Briefcase,
  'clipboard-check': ClipboardCheck,
  stethoscope: Stethoscope,
  wrench: Wrench,
  'life-buoy': LifeBuoy,

  // Mastery
  award: Award,
  'badge-check': BadgeCheck,
  trophy: Trophy,
  swords: Swords,
  target: Target,

  // Master Dimensions
  landmark: Landmark,
  users: Users,

  // Spec tiles
  globe: Globe,
  zap: Zap,

  // Fallback Emoji-to-Vector Mapping
  '👔': Briefcase,
  '📋': ClipboardCheck,
  '🩺': Stethoscope,
  '🛠️': Wrench,
  '🛟': LifeBuoy,
  '🥉': Award,
  '🥈': BadgeCheck,
  '🥇': Trophy,
  '🥊': Swords,
  '🥋': Target,
  '🏋️': Dumbbell,
  '🎓': GraduationCap,
  '🏛️': Landmark,
  '🇬🇪': Medal,
  '📜': Scale,
  '👥': Users,
  '🏅': Trophy,
  '🌐': Globe,
  '⚡': Zap,
  '🎯': Target,
  '🏆': Trophy,
};

interface MirrorIconProps {
  name: string;
  isActive?: boolean;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const MirrorIcon: React.FC<MirrorIconProps> = ({
  name,
  isActive = false,
  className = '',
  size = 20,
  strokeWidth = 1.8,
}) => {
  const IconComponent = ICON_MAP[name.toLowerCase()] || ICON_MAP[name] || Activity;

  return (
    <span
      className={`inline-flex items-center justify-center select-none transition-all duration-200 ${
        isActive ? 'text-[#00E5FF]' : 'text-slate-400 group-hover:text-cyan-300'
      } ${className}`}
      style={
        isActive
          ? {
              filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.75))',
            }
          : undefined
      }
      aria-hidden="true"
    >
      <IconComponent size={size} strokeWidth={strokeWidth} className="shrink-0" />
    </span>
  );
};
