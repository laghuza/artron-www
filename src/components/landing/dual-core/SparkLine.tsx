import React from 'react';

export const SparkLine: React.FC<{ values: number[]; color: string }> = ({ values, color }) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 96;
  const h = 32;
  const pts = values.length;
  const points = values
    .map((v, i) => `${(i / (pts - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <polyline points={points} stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};
