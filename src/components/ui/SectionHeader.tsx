import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  badge?: string | React.ReactNode;
  badgeIcon?: React.ComponentType<{ className?: string }>;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'center' | 'left';
  size?: 'default' | 'compact' | 'large';
  className?: string;
  badgeClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  align = 'center',
  size = 'default',
  className,
  badgeClassName,
  titleClassName,
  subtitleClassName,
  children,
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mx-auto w-full',
        isCenter ? 'text-center max-w-3xl' : 'text-left max-w-4xl',
        size === 'compact' ? 'mb-6 sm:mb-8' : size === 'large' ? 'mb-14 sm:mb-16' : 'mb-10 sm:mb-12',
        className
      )}
    >
      {/* Optional Badge */}
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-4',
            'bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF]',
            badgeClassName
          )}
        >
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#00A3FF] shrink-0" />}
          <span>{badge}</span>
        </div>
      )}

      {/* Main Title */}
      <h2
        className={cn(
          'font-black text-white tracking-tight leading-tight',
          size === 'compact'
            ? 'text-xl sm:text-2xl md:text-3xl'
            : size === 'large'
            ? 'text-3xl sm:text-5xl lg:text-6xl'
            : 'text-2xl sm:text-4xl lg:text-5xl',
          titleClassName
        )}
      >
        {title}
      </h2>

      {/* Subtitle / Description */}
      {subtitle && (
        <p
          className={cn(
            'mt-2.5 sm:mt-3 text-xs sm:text-base text-gray-400 font-normal leading-relaxed',
            isCenter && 'max-w-2xl mx-auto',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Optional Children slot (tabs, controls, metrics) */}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
