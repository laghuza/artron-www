---
name: framer-motion
description: Master guide for creating 60 FPS physics-based animations, layout transitions, scroll effects, gestures, SVG path drawing, and micro-interactions using Framer Motion (Motion) in React and Next.js App Router. Use when creating animated UI components, interactive charts, EnneaCore graphs, modal dialogs, tab transitions, ROI calculators, or when optimizing animation performance (LazyMotion, bundle splitting, zero CLS, prefers-reduced-motion).
license: MIT
metadata:
  author: Artron Matrix Architects
  version: "2.0.0"
---

# 🌀 Framer Motion & Motion Engineering Skill

Production-grade animation standards for high-performance React & Next.js App Router applications.

---

## ⚡ Core Principles & Performance Hierarchy

1. **60 FPS & Zero CLS:** Animate ONLY GPU-composited properties (`transform: translate/scale/rotate`, `opacity`). Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`) unless using `layout` or `layoutId`.
2. **Lazy Loading via `LazyMotion`:** In production Next.js apps, wrap large trees in `<LazyMotion features={domAnimation}>` and use `<m.div>` to save ~25KB from the initial JavaScript bundle.
3. **Accessibility First (`prefers-reduced-motion`):** Honor user motion preferences automatically using `useReducedMotion()`.
4. **Clean Exit Animations:** Wrap conditionally rendered components in `<AnimatePresence mode="wait">` and ensure every child has a unique `key`.

---

## 🛠️ Next.js App Router & Client Boundary Rule

Framer Motion hooks and `<motion.*>` components require browser APIs. Always place them inside `'use client'` component boundaries or create lightweight animated wrappers.

### Pattern 1: Lightweight Client Wrapper
```tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function FadeIn({ children, delay = 0, direction = 'up', className = '' }: FadeInProps) {
  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## 🚀 Advanced Animation Patterns

### 1. Bundle Optimization with `LazyMotion`
```tsx
'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';

export function OptimizedShowcase({ items }: { items: string[] }) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {items.map((item, idx) => (
          <m.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 rounded-2xl bg-[#121722] border border-white/10 shadow-xl"
          >
            {item}
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
}
```

---

### 2. Smooth Shared Layout Transitions (`layoutId`)
For active tabs, pill selectors, and indicator backgrounds:
```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = ['KPI Dashboard', 'Win-Back', 'Churn AI', 'Market Intel'];

export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex gap-2 p-1.5 rounded-xl bg-[#0B0E14] border border-white/10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00A3FF] shadow-lg shadow-cyan-500/20"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
```

---

### 3. SVG Path Drawing & Laser Link Animations (EnneaCore Graph)
```tsx
'use client';

import { motion } from 'framer-motion';

export function DynamicLaserConnection({ startX, startY, endX, endY }: { startX: number; startY: number; endX: number; endY: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <motion.line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="url(#cyanGlow)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.2, 0.8, 0.4] }}
        transition={{
          pathLength: { duration: 1.2, ease: 'easeInOut' },
          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <defs>
        <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
```

---

### 4. Interactive ROI Spring Counter
```tsx
'use client';

import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}
```

---

## 📋 Best Practices Checklist

- [x] Use `cubic-bezier(0.16, 1, 0.3, 1)` for snappy, enterprise-grade spring eases.
- [x] Always add `viewport={{ once: true }}` to scroll animations unless cyclical replay is intended.
- [x] Apply `overflow-hidden` cautiously to avoid clipping 3D tilt and floating glow effects.
- [x] Use `mode="wait"` or `mode="popLayout"` on `<AnimatePresence>` for seamless exit/enter transitions.
- [x] Combine with CSS Tokens: `#00A3FF` (Cyan), `#0066FF` (Electric Blue), `#0B0E14` (Dark Canvas).
