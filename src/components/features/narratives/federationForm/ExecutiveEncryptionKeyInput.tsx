"use client";

interface ExecutiveEncryptionKeyInputProps {
  accessCode: string;
  setAccessCode: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
}

export default function ExecutiveEncryptionKeyInput({
  accessCode,
  setAccessCode,
  showPassword,
  setShowPassword,
}: ExecutiveEncryptionKeyInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full font-mono text-[9.5px] mb-4 select-none">
      <span className="text-[#9CA3AF] tracking-widest uppercase mb-1">[ ENCRYPTION_KEY // SYSTEM_PASSWORD ]</span>
      <div className="relative w-full">
        <span className={`absolute -top-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>┌</span>
        <span className={`absolute -top-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>┐</span>
        <span className={`absolute -bottom-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>└</span>
        <span className={`absolute -bottom-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00ff87] drop-shadow-[0_0_3px_rgba(0,255,135,0.4)]' : 'text-[#9CA3AF]/20'}`}>┘</span>

        <div className={`relative w-full border ${showPassword ? 'border-[#00ff87]/30 bg-[#121418]' : 'border-[#9CA3AF]/10 bg-transparent'} transition-all duration-300`}>
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full bg-transparent py-2.5 px-3.5 pr-16 text-[#F5F5F7] font-sans text-sm placeholder-[#9CA3AF]/30 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[11px] text-[#9CA3AF] hover:text-[#00ff87] text-[9px] font-mono focus:outline-none uppercase cursor-pointer"
          >
            {showPassword ? '[ HIDE ]' : '[ SHOW ]'}
          </button>
        </div>
      </div>
      <div className="h-3 flex justify-end mt-0.5">
        {accessCode.trim() !== "" && (
          <span className="text-[#00ff87] text-[9px] tracking-wider animate-pulse">[ NODE_VALID: TRUE ]</span>
        )}
      </div>
    </div>
  );
}
