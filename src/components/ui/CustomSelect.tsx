import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
  label?: string;
  disabled?: boolean;
}

export default function CustomSelect({ options, selected, onChange, label, disabled = false }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative font-mono text-[10px] w-full mb-6 select-none">
      {label && <label className="text-[#9CA3AF] uppercase tracking-widest block mb-1.5">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center bg-transparent border-b py-2.5 px-1 focus:outline-none transition-all uppercase ${
          disabled 
            ? 'border-[#9CA3AF]/10 text-[#F5F5F7]/40 cursor-not-allowed' 
            : isOpen
              ? 'border-[#00ff87] text-white'
              : 'border-[#9CA3AF]/20 text-[#F5F5F7] hover:border-[#00ff87]'
        }`}
      >
        <span className="font-sans text-sm normal-case">{selected}</span>
        <span className="text-[#9CA3AF] text-[9px]">{disabled ? '[ LOCKED ]' : '[ v ]'}</span>
      </button>
      {isOpen && !disabled && (
        <ul className="absolute z-50 w-full mt-1 bg-[#121418]/95 backdrop-blur-md border border-[#00ff87]/30 text-[#F5F5F7] shadow-[0_0_20px_rgba(0,255,135,0.06)] py-1 text-sm font-sans uppercase no-scrollbar">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className="px-3 py-2 cursor-pointer hover:bg-[#00ff87]/10 hover:text-[#00ff87] transition-all flex items-center gap-1 group normal-case"
            >
              <span className="invisible group-hover:visible font-mono text-[10px] mr-1">&gt;</span>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
