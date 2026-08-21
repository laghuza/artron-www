'use client';

import React, { useState, useEffect } from 'react';
import { SPORTS_TAXONOMY, SportCategoryKey } from '@/core/sports/sports.taxonomy';

export interface SportsSelectValue {
  categoryKey: SportCategoryKey;
  sportId: string;
  variationId: string;
}

export interface SportsSelectProps {
  value?: Partial<SportsSelectValue>;
  onChange?: (selection: SportsSelectValue) => void;
  className?: string;
}

export const SportsSelect: React.FC<SportsSelectProps> = ({ value, onChange, className = '' }) => {
  const categoryKeys = Object.keys(SPORTS_TAXONOMY) as SportCategoryKey[];

  const [categoryKey, setCategoryKey] = useState<SportCategoryKey>(value?.categoryKey || categoryKeys[0]);
  const currentCategory = SPORTS_TAXONOMY[categoryKey] || SPORTS_TAXONOMY[categoryKeys[0]];

  const [sportId, setSportId] = useState<string>(value?.sportId || currentCategory.sports[0]?.id || '');
  const currentSport = currentCategory.sports.find((s) => s.id === sportId) || currentCategory.sports[0];

  const [variationId, setVariationId] = useState<string>(value?.variationId || currentSport?.variations[0]?.id || '');

  useEffect(() => {
    if (value?.categoryKey && value.categoryKey !== categoryKey) {
      setCategoryKey(value.categoryKey);
    }
  }, [value?.categoryKey, categoryKey]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCatKey = e.target.value as SportCategoryKey;
    const newCat = SPORTS_TAXONOMY[newCatKey];
    const newSport = newCat.sports[0];
    const newVar = newSport?.variations[0];
    setCategoryKey(newCatKey);
    setSportId(newSport?.id || '');
    setVariationId(newVar?.id || '');
    if (onChange && newSport && newVar) onChange({ categoryKey: newCatKey, sportId: newSport.id, variationId: newVar.id });
  };

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSportId = e.target.value;
    const newSport = currentCategory.sports.find((s) => s.id === newSportId) || currentCategory.sports[0];
    const newVar = newSport?.variations[0];
    setSportId(newSportId);
    setVariationId(newVar?.id || '');
    if (onChange && newSport && newVar) onChange({ categoryKey, sportId: newSportId, variationId: newVar.id });
  };

  const handleVariationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVarId = e.target.value;
    setVariationId(newVarId);
    if (onChange) onChange({ categoryKey, sportId, variationId: newVarId });
  };

  const selectStyle = "bg-neutral-900/90 text-emerald-400 border border-emerald-500/30 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 rounded px-2.5 py-1.5 text-xs font-mono outline-none transition-all duration-200 cursor-pointer";

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 bg-black/60 border border-emerald-500/20 rounded-lg shadow-[0_0_15px_rgba(64,145,108,0.1)] ${className}`}>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-semibold">Category</label>
        <select value={categoryKey} onChange={handleCategoryChange} className={selectStyle}>
          {categoryKeys.map((k) => <option key={k} value={k} className="bg-neutral-900 text-emerald-300">{SPORTS_TAXONOMY[k].name}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-semibold">Sport</label>
        <select value={sportId} onChange={handleSportChange} className={selectStyle}>
          {currentCategory.sports.map((s) => <option key={s.id} value={s.id} className="bg-neutral-900 text-emerald-300">{s.name}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-semibold">Discipline / Variation</label>
        <select value={variationId} onChange={handleVariationChange} className={selectStyle}>
          {currentSport?.variations.map((v) => <option key={v.id} value={v.id} className="bg-neutral-900 text-emerald-300">{v.name} ({v.code})</option>)}
        </select>
      </div>
    </div>
  );
};
