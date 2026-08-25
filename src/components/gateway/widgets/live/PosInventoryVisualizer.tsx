"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface PosInventoryVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const PosInventoryVisualizer: React.FC<PosInventoryVisualizerProps> = ({
  cardType,
}) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [stock, setStock] = useState({ shake: 14, water: 42, bar: 6 });

  const handleAddItem = (item: 'shake' | 'water' | 'bar', price: number) => {
    if (stock[item] <= 0) return;
    soundEngine.playPulseNode();
    setCartTotal((prev) => prev + price);
    setCartCount((prev) => prev + 1);
    setStock((prev) => ({ ...prev, [item]: prev[item] - 1 }));
  };

  const handleCheckout = () => {
    soundEngine.playSystemAccess();
    setCartTotal(0);
    setCartCount(0);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#090D14]/95 border border-[#D4AF37]/40 rounded-xl font-mono text-xs text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[#D4AF37] font-bold tracking-wider uppercase text-[11px]">
            FITNESS BAR POS // INSTANT SALE &amp; INVENTORY AUTO-DEDUCT
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 06 // POS
        </span>
      </div>

      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Quick POS Grid */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleAddItem('shake', 8.5)}
              className="p-2.5 bg-[#121722] hover:bg-[#121722]/80 border border-white/10 hover:border-[#D4AF37] rounded-lg text-left transition-all cursor-pointer"
            >
              <div className="text-[10px] font-bold text-white">პროტეინის შეიკი</div>
              <div className="text-[12px] text-[#D4AF37] font-bold mt-1">8.50 ₾</div>
              <div className="text-[9px] text-gray-400 mt-0.5">ნაშთი: {stock.shake} ცალი</div>
            </button>

            <button
              type="button"
              onClick={() => handleAddItem('water', 2.0)}
              className="p-2.5 bg-[#121722] hover:bg-[#121722]/80 border border-white/10 hover:border-[#00B0FF] rounded-lg text-left transition-all cursor-pointer"
            >
              <div className="text-[10px] font-bold text-white">იზოტონიკი 0.5L</div>
              <div className="text-[12px] text-[#00B0FF] font-bold mt-1">2.00 ₾</div>
              <div className="text-[9px] text-gray-400 mt-0.5">ნაშთი: {stock.water} ცალი</div>
            </button>

            <button
              type="button"
              onClick={() => handleAddItem('bar', 4.5)}
              className="p-2.5 bg-[#121722] hover:bg-[#121722]/80 border border-white/10 hover:border-[#00ff87] rounded-lg text-left transition-all cursor-pointer"
            >
              <div className="text-[10px] font-bold text-white">ენერგეტიკული ბარი</div>
              <div className="text-[12px] text-[#00ff87] font-bold mt-1">4.50 ₾</div>
              <div className="text-[9px] text-red-400 mt-0.5">ნაშთი: {stock.bar} ც (დაბალი)</div>
            </button>
          </div>

          {/* Cart & Checkout */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-400">კალათა: {cartCount} ერთეული</div>
              <div className="text-base font-bold text-white">{cartTotal.toFixed(2)} ₾</div>
            </div>

            <button
              type="button"
              disabled={cartTotal === 0}
              onClick={handleCheckout}
              className={`px-4 py-2 rounded text-[10px] uppercase font-bold tracking-wider transition-all ${
                cartTotal > 0
                  ? 'bg-[#D4AF37] text-black hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
              💳 ბარათიდან/ბალანსიდან ჩამოჭრა
            </button>
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              საწყობის ავტომატური ჩამოწერა &amp; ფისკალიზაცია
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">სალარო აპარატი / RS.GE სინქრონიზაცია:</span>
                <span className="text-[#00ff87] font-bold">ავტომატური ჩეკის გენერირება</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5">
                <span className="text-gray-300">ბარმენის წვდომა:</span>
                <span className="text-[#D4AF37] font-bold">მხოლოდ გაყიდვები (ინვენტარის ცვლილება შეზღუდულია)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              დამატებითი შემოსავალი (Secondary Revenue)
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">ბარის შემოსავლის წილი</div>
                <div className="text-sm font-bold text-[#00ff87]">+28.5%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">დანაკარგები საწყობში</div>
                <div className="text-sm font-bold text-[#00B0FF]">0.0%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">საშუალო ჩეკი (ARPU)</div>
                <div className="text-sm font-bold text-[#D4AF37]">+18 ₾ / ვიზიტზე</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>RS.GE FISCAL INTEGRATED</span>
        <span className="text-[#D4AF37]">AUTO-STOCK SYNC</span>
      </div>
    </div>
  );
};
