"use client";

import { useI18n } from "@/context/I18nContext";
import { audioManager } from "@/lib/audioManager";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { lang, toggleLang } = useI18n();

  const handleClick = () => {
    audioManager.playClick();
    toggleLang();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle language"
      className={
        className ||
        "fixed top-4 left-[175px] z-50 hidden lg:flex font-mono text-[9px] uppercase tracking-[0.2em] text-[#9CA3AF] hover:text-[#F5F5F3] border border-[#9CA3AF]/18 hover:border-[#00E676]/40 bg-[#1A1D23]/60 hover:bg-[#1A1D23] px-3 py-1.5 rounded-sm backdrop-blur-[12px] transition-colors duration-300 items-center gap-2 cursor-pointer shadow-[0_0_8px_rgba(0,230,118,0.12)] group animate-fadeIn"
      }
    >
      <span
        className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125 bg-[#00E676]"
      />
      <span>[ LANG: {lang} ]</span>
    </button>
  );
}
