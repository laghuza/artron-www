"use client";

import React from "react";
import { CreditCard } from "lucide-react";
import { EnneaStrings } from "./types";

interface EnneaPartnerCardProps {
  locale?: string;
  t?: EnneaStrings;
  onFocusPartner?: () => void;
}

export const EnneaPartnerCard: React.FC<EnneaPartnerCardProps> = ({
  locale = "ka",
  t,
  onFocusPartner,
}) => {
  const isKa = locale === "ka";
  const isRu = locale === "ru";

  const partnerData = {
    title: "Bank of Georgia",
    sub: isKa
      ? "საქართველოს ბანკი · სტრატეგიული ფინტექი"
      : isRu
      ? "Банк Грузии · Стратегический финтех"
      : "Bank of Georgia · Strategic FinTech",
    desc: isKa
      ? "მობილური აპლიკაციის და ონლაინ გაყიდვების ცენტრალური ექვაირინგი: Apple Pay & Google Pay 1-კლიკით გადახდა, 0% საბანკო განვადება და საბანკო ბარათების დაშიფრული ტოკენიზაცია."
      : isRu
      ? "Центральный эквайринг мобильного приложения и онлайн-продаж: Apple Pay и Google Pay в 1 клик, рассрочка 0% и защищенная токенизация банковских карт."
      : "Mobile App & online sales central acquiring: 1-click Apple Pay & Google Pay checkout, 0% bank installments, and encrypted card tokenization.",
    footer: isKa
      ? "სრული ინტეგრაცია საქართველოს ბანკის ოფიციალურ iPAY API სერვისთან."
      : isRu
      ? "Полная интеграция с официальным iPAY API сервисом Банка Грузии."
      : "Complete enterprise integration with the official Bank of Georgia iPAY API.",
    badges: isKa
      ? [" Apple Pay", "G Pay", "BOG განვადება 0%", "საბანკო ტოკენიზაცია", "iPAY Gateway 24/7"]
      : isRu
      ? [" Apple Pay", "G Pay", "Рассрочка BOG 0%", "Токенизация карт", "iPAY Gateway 24/7"]
      : [" Apple Pay", "G Pay", "BOG 0% Installments", "Card Tokenization", "iPAY Gateway 24/7"],
    showOnMap: t?.showOnMap || (isKa ? "რუკაზე ჩვენება" : isRu ? "Показать на карте" : "Show on Map"),
  };

  return (
    <div className="flex flex-col p-4 gap-3.5 animate-in fade-in duration-200">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FF5E00]/20 via-[#FF5E00]/5 to-transparent border border-[#FF5E00]/40 shadow-[0_0_30px_rgba(255,94,0,0.18)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5E00] to-[#FF8C00] flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,94,0,0.4)]">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-mono text-sm font-bold text-white leading-tight">
                {partnerData.title}
              </h4>
              <span className="text-[10px] text-[#FFA066] font-mono font-medium">
                {partnerData.sub}
              </span>
            </div>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#FF5E00]/20 text-[#FFA066] border border-[#FF5E00]/40 font-bold">
            PCI-DSS L1
          </span>
        </div>
        <p className="text-xs text-[#CFE6F2] leading-relaxed mb-3">
          {partnerData.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1 mb-3">
          {partnerData.badges.map((b) => (
            <span
              key={b}
              className="text-[10px] font-mono px-2 py-0.5 bg-black/50 border border-white/10 text-white/90 rounded-md"
            >
              {b}
            </span>
          ))}
        </div>

        {onFocusPartner && (
          <button
            type="button"
            onClick={onFocusPartner}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#FF5E00]/20 hover:bg-[#FF5E00]/30 border border-[#FF5E00]/50 text-white font-mono text-[11px] font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(255,94,0,0.25)]"
          >
            <span>{partnerData.showOnMap}</span>
            <span>→</span>
          </button>
        )}
      </div>

      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#FF5E00] shadow-[0_0_8px_#FF5E00] animate-pulse shrink-0" />
        <p className="text-[11px] text-[#8AA3B2] leading-snug font-mono">
          {partnerData.footer}
        </p>
      </div>
    </div>
  );
};
