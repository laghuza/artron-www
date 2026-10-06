'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface AboutRailNavProps {
  activeChapter: number;
}

const CHAPTERS = [
  { id: 's1', label: 'I' },
  { id: 's2', label: 'II' },
  { id: 's3', label: 'III' },
  { id: 's4', label: 'IV' },
];

export const AboutRailNav: React.FC<AboutRailNavProps> = ({ activeChapter }) => {
  const { locale } = useLanguage();
  const ariaLabel = locale === 'en' ? 'Chapters' : locale === 'ru' ? 'Главы' : 'თავები';

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="hidden md:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-4 items-end"
      aria-label={ariaLabel}
    >
      {CHAPTERS.map((ch, idx) => {
        const isActive = activeChapter === idx;

        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            onClick={(e) => scrollTo(ch.id, e)}
            className={`vision-mono text-[10px] tracking-widest flex items-center gap-2.5 transition-colors duration-300 py-1 ${
              isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{ch.label}</span>
            <span
              className={`block h-px transition-all duration-500 ${
                isActive ? 'w-8 bg-amber-400' : 'w-3.5 bg-slate-600'
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};
