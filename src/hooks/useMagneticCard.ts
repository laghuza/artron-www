'use client';

import { useRef } from 'react';
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from 'framer-motion';

interface UseMagneticCardOptions {
  /** Max rotation in degrees. Default: 8 */
  rotateStrength?: number;
  /** CSS perspective depth in px. Default: 1000 */
  perspective?: number;
}

/**
 * Magnetic 3D tilt hook for card hover interactions.
 *
 * GPU-accelerated: animates only `rotateX`/`rotateY` (transform).
 * Zero layout cost. Respects `prefers-reduced-motion`.
 *
 * Usage:
 * ```tsx
 * const mag = useMagneticCard({ rotateStrength: 8 });
 * <div style={{ perspective: '1000px' }}>
 *   <motion.div ref={mag.ref} style={mag.motionStyle}
 *     onMouseMove={mag.onMouseMove} onMouseLeave={mag.onMouseLeave}>
 *     ...
 *   </motion.div>
 * </div>
 * ```
 */
export function useMagneticCard({
  rotateStrength = 8,
  perspective = 1000,
}: UseMagneticCardOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalised mouse position: -0.5 → +0.5 within card bounds
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map normalised position → rotation angle (degrees), spring-smoothed
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [rotateStrength, -rotateStrength]),
    { stiffness: 120, damping: 20, mass: 0.8 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-rotateStrength, rotateStrength]),
    { stiffness: 120, damping: 20, mass: 0.8 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    // Spring back to resting position
    mouseX.set(0);
    mouseY.set(0);
  };

  const motionStyle: MotionStyle = shouldReduceMotion
    ? {}
    : { rotateX, rotateY, transformPerspective: perspective };

  return {
    ref,
    motionStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
