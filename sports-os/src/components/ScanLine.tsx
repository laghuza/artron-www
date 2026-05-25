"use client";

interface ScanLineProps {
  trigger: number;
}

export default function ScanLine({ trigger }: ScanLineProps) {
  return (
    <div
      key={trigger}
      className="pointer-events-none fixed left-0 z-50 h-[2px] w-full bg-emerald-core shadow-[0_0_12px_#00E676] opacity-0 animate-laser"
    />
  );
}

