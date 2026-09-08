"use client";

import React from 'react';
import { Calendar, MessageCircle, Check } from 'lucide-react';

export const MultimodalAiCtaBanner: React.FC = () => {
  const handleScrollToBooking = () => {
    const el = document.getElementById('booking-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#booking-engine';
    }
  };

  return (
    <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0C121E] via-[#0E1626] to-[#0A101C] border border-[#00A3FF]/30 shadow-[0_12px_40px_rgba(0,163,255,0.12)] overflow-hidden">
      {/* Decorative cyber grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00A3FF_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[11px] font-mono text-[#00E5FF]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            LIVE B2B DEMO RESERVATION
          </div>

          <h3 className="font-mono text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            გსურთ გამოსცადოთ AI ასისტენტი თქვენს რეცეფციაზე?
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            დაჯავშნეთ პერსონალური ონლაინ დემო — ჩვენი სპეციალისტი პირდაპირ ეთერში გაჩვენებთ,
            როგორ ამოიცნობს Artron-ი ქართულ ხმას, როგორ ასკანირებს პირადობას 1 წამში და როგორ ათავისუფლებს თქვენს მოლარეს რუტინული შეცდომებისგან.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> 20-წუთიანი ონლაინ პრეზენტაცია
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> მორგებული თქვენს ფილიალებზე
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> ყოველგვარი ვალდებულების გარეშე
            </span>
          </div>
        </div>

        {/* CTA Buttons Cluster */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={handleScrollToBooking}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00A3FF] hover:from-[#0052cc] hover:to-[#008fe0] text-white font-mono text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(0,163,255,0.45)] hover:shadow-[0_0_35px_rgba(0,163,255,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>დაჯავშნეთ ონლაინ დემო</span>
          </button>

          <a
            href="https://wa.me/995599000000?text=%E1%83%92%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0%E1%83%AF%E1%83%9D%E1%83%91%E1%83%90%2C%20%E1%83%9B%E1%83%A1%E1%83%A3%E1%83%A0%E1%83%A1%20Artron%20AI%20%E1%83%90%E1%83%A1%E1%83%98%E1%83%A1%E1%83%A2%E1%83%94%E1%83%9C%E1%83%A2%E1%83%98%E1%83%A1%20%E1%83%93%E1%83%94%E1%83%9B%E1%83%9D%20%E1%83%9E%E1%83%A0%E1%83%94%E1%83%96%E1%83%94%E1%83%9C%E1%83%A2%E1%83%90%E1%83%AA%E1%83%98%E1%83%90."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 text-gray-200 hover:text-white font-mono text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp კონსულტაცია</span>
          </a>
        </div>
      </div>
    </div>
  );
};
