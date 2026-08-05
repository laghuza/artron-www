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
        "fixed top-4 left-[175px] z-50 font-mono text-[9px] uppercase tracking-[0.2em] text-silver-structure/45 hover:text-white border border-silver-structure/10 hover:border-emerald-core/45 bg-iron-surface/40 hover:bg-iron-surface/90 px-3 py-1.5 rounded backdrop-blur-[6px] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] group animate-fadeIn"
      }
    >
      <span
        className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125 shadow-[0_0_8px_#00ff87]"
        style={{ backgroundColor: "#00ff87" }}
      />
      <span>[ LANG: {lang} ]</span>
    </button>
  );
}
