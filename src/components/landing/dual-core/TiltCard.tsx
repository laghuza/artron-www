'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxDeg?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', maxDeg = 8 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 160, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 160, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [maxDeg, -maxDeg]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxDeg, maxDeg]);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY, shouldReduceMotion]
  );

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        shouldReduceMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};
