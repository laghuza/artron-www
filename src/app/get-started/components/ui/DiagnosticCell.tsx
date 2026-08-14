import React, { useState, ReactNode } from 'react';

interface DiagnosticCellProps {
  coordinate: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  isValid: boolean;
  disabled?: boolean;
  type?: string;
  telemetryStatus?: string;
  suffix?: ReactNode;
}

export default function DiagnosticCell({ 
  coordinate, placeholder, value, onChange, isValid, disabled = false, type = "text", telemetryStatus, suffix 
}: DiagnosticCellProps) {
  const [isFocused, setIsFocused] = useState(false);

  const renderStatus = () => {
    if (telemetryStatus) return telemetryStatus;
    return isFocused ? '[ COMPILING... ]' : '[ INPUT_MUTABILITY: STATIC_WRITE ]';
  };

  return (
    <div className="flex flex-col gap-1 w-full font-mono text-[9.5px] mb-2.5 select-none">
      <div className="flex justify-between items-center text-[#9CA3AF] tracking-widest uppercase mb-1">
        <span>{coordinate}</span>
        <span className={isFocused ? 'text-[#00ff87] animate-pulse' : 'text-[#9CA3AF]/40'}>{renderStatus()}</span>
      </div>
      <div className="relative w-full">
        {/* Typographic Corner Brackets */}
        <span className={`absolute -top-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${isFocused ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>┌</span>
        <span className={`absolute -top-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${isFocused ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>┐</span>
        <span className={`absolute -bottom-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${isFocused ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>└</span>
        <span className={`absolute -bottom-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${isFocused ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>┘</span>

        <div className={`relative w-full border ${isFocused ? 'border-[#00ff87]/30 bg-[#121418]' : 'border-[#9CA3AF]/10 bg-transparent'} transition-all duration-300`}>
          {isFocused && (
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,135,0.01)_50%,rgba(0,0,0,0)_50%)] bg-[length:100%_4px]" />
          )}
          <input
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent py-2.5 px-3.5 pr-12 text-[#F5F5F7] font-sans text-sm placeholder-[#9CA3AF]/30 focus:outline-none uppercase"
          />
          {suffix && (
            <div className="absolute right-3 top-[11px] flex items-center z-10">
              {suffix}
            </div>
          )}
        </div>
      </div>
      <div className="h-3 flex justify-end mt-0.5">
        {isValid && (
          <span className="text-[#00ff87] text-[9px] tracking-wider animate-pulse">[ NODE_VALID: TRUE ]</span>
        )}
      </div>
    </div>
  );
}
