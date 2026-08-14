"use client";

interface BootSequenceConsoleProps {
  bootLogs: string[];
}

export default function BootSequenceConsole({ bootLogs }: BootSequenceConsoleProps) {
  return (
    <div className="z-20 font-mono text-[10px] text-emerald-core max-w-lg w-full px-6 space-y-1.5 text-left select-none">
      {bootLogs.map((log, idx) => (
        <div key={idx} className="opacity-90 tracking-wide">
          &gt; {log}
        </div>
      ))}
      <div className="inline-block w-1.5 h-3 bg-emerald-core animate-blink ml-1" />
    </div>
  );
}
