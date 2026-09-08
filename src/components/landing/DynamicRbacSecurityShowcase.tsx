"use client";

import React, { useState } from 'react';
import { DynamicRbacSecurityStage } from '../gateway/widgets/live/rbac/DynamicRbacSecurityStage';

export const DynamicRbacSecurityShowcase: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#080B10] border-t border-b border-white/10 overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-8 w-80 h-80 bg-[#00A3FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-8 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Header Title Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 font-mono text-[11px] text-[#00A3FF] uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse" />
            DYNAMIC RBAC &amp; CASL ISOMORPHIC AUTHORIZATION
          </div>

          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            👑 100% დინამიური როლები &amp; შიდა თაღლითობისგან დაცვა
          </h2>

          <p className="font-sans text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            მიეცით თითოეულ თანამშრომელს მხოლოდ ის უფლება, რაც მათ სამუშაოდ სჭირდებათ.
            დაბლოკეთ სალაროზე ჩეკების წაშლა, დამალეთ სენსიტიური ველები და მართეთ ფილიალები სრული იზოლაციით.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#121722]/80 border border-white/10 hover:border-[#00A3FF]/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-xl text-rose-400">
              🛑
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              1. 0% შიდა თაღლითობა
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              მოლარეს აქვს აბონემენტის გაყიდვის უფლება, მაგრამ <span className="text-rose-400 font-semibold">DELETE მკაცრად დაბლოკილია</span>. გამოირიცხება ჩეკების თვითნებური წაშლა და ნაღდი ფულის მითვისება.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121722]/80 border border-white/10 hover:border-emerald-500/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl text-emerald-400">
              🔒
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              2. Field-Level Security
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              კლიენტის პირადი ნომერი, ტელეფონი და თანამშრომელთა ხელფასები <span className="text-emerald-400 font-semibold">სერვერიდანვე იფილტრება</span> (ExcludedFields), რაც გამორიცხავს ბაზის მოპარვას.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121722]/80 border border-white/10 hover:border-purple-500/40 transition-all space-y-2 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xl text-purple-400">
              🏢
            </div>
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              3. ფილიალების იზოლაცია
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              საბურთალოს მოლარე <span className="text-purple-400 font-semibold">ვერასდროს ნახავს</span> ვაკის ან ბათუმის ფილიალის შემოსავლებსა და კლიენტებს. გენერალური დირექტორი კი მართავს მთელ ქსელს.
            </p>
          </div>
        </div>

        {/* Live Interactive RBAC & Permissions Console Stage */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#090D15]/95 border border-[#00A3FF]/30 shadow-[0_16px_50px_rgba(0,0,0,0.85)]">
          <DynamicRbacSecurityStage />
        </div>
      </div>
    </section>
  );
};
