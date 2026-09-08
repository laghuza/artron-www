"use client";

import React from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Zap, ShieldCheck, Mic, Sparkles } from 'lucide-react';

interface PunchlineItem {
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const PUNCHLINES: PunchlineItem[] = [
  {
    icon: Zap,
    badge: '5-წამიანი რეგისტრაცია',
    badgeColor: 'border-[#00A3FF]/40 text-[#00E5FF] bg-[#00A3FF]/10',
    iconBg: 'bg-[#00A3FF]/10 border-[#00A3FF]/30',
    iconColor: 'text-[#00E5FF]',
    title: 'რეგისტრაცია 5 წამში',
    description: 'უბრალოდ უთხარით AI-ს ან მიიტანეთ პირადობა კამერასთან — ყველა ველი მყისიერად ივსება.'
  },
  {
    icon: ShieldCheck,
    badge: '0% შეცდომის რისკი',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    iconBg: 'bg-emerald-500/10 border-emerald-500/30',
    iconColor: 'text-emerald-400',
    title: 'ნულოვანი შეცდომა ბაზაში',
    description: 'დაივიწყეთ რუტინული ფორმები და შეცდომით აკრეფილი 11-ნიშნა პირადი ნომრები და ტელეფონები.'
  },
  {
    icon: Mic,
    badge: 'Google Gemini & STT',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    iconBg: 'bg-purple-500/10 border-purple-500/30',
    iconColor: 'text-purple-400',
    title: 'ქართული ხმის & ჩატის ძრავი',
    description: 'მართვის პანელს ესმის ქართული სალაპარაკო ხმა და ბუნებრივი ტექსტი Function Calling არქიტექტურით.'
  },
  {
    icon: Sparkles,
    badge: 'VIP გამოცდილება',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    iconBg: 'bg-amber-500/10 border-amber-500/30',
    iconColor: 'text-amber-400',
    title: 'პრემიუმ სერვისი & 0 რიგი',
    description: 'აღმოფხვერით რიგები რეცეფციაზე პიკის საათებში (18:00–21:00) და გააოცეთ კლიენტები პირველივე ვიზიტიდან.'
  }
];

export const MultimodalAiPunchlines: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {PUNCHLINES.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <GlowCard
            key={idx}
            className="p-5 flex flex-col justify-between"
            glowColor="rgba(0, 163, 255, 0.16)"
            borderColor="rgba(0, 163, 255, 0.45)"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${item.iconBg} ${item.iconColor}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <h3 className="font-mono text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#00A3FF]/80 group-hover:text-[#00E5FF] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
              <span>ავტომატიზებული პროცესი</span>
            </div>
          </GlowCard>
        );
      })}
    </div>
  );
};
