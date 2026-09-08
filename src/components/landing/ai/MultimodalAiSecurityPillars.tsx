"use client";

import React from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { ShieldCheck, Binary, Lock, FileCheck, EyeOff, Shield } from 'lucide-react';

interface SecurityPillar {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  badge: string;
  description: string;
  legalTag: string;
}

const SECURITY_PILLARS: SecurityPillar[] = [
  {
    icon: ShieldCheck,
    iconBg: 'bg-emerald-500/10 border-emerald-500/30',
    iconColor: 'text-emerald-400',
    title: 'სავალდებულო დადასტურება (Confirmation Step)',
    badge: 'Zero-Hallucination',
    description: 'AI არასდროს წერს ბაზაში ოპერატორის დადასტურების გარეშე. ეკრანზე გამოდის Smart Confirmation Card, სადაც მოლარე ამოწმებს ველებს და აჭერს „დადასტურებას“.',
    legalTag: 'Human-in-the-Loop Protocol'
  },
  {
    icon: Binary,
    iconBg: 'bg-[#00A3FF]/10 border-[#00A3FF]/30',
    iconColor: 'text-[#00E5FF]',
    title: 'სრული ბიზნეს ვალიდაცია & Sanitization',
    badge: '100% Data Integrity',
    description: 'ამოღებული მონაცემები გადის მკაცრ ვალიდაციას (11-ნიშნა ალგორითმი, ქართული მობილურის ფორმატი, დუბლირების პრევენცია ბაზაში).',
    legalTag: 'Prisma RLS & Schema Guard'
  },
  {
    icon: Lock,
    iconBg: 'bg-cyan-500/10 border-cyan-500/30',
    iconColor: 'text-cyan-400',
    title: 'Multi-Tenancy & Data Privacy Scoping',
    badge: 'Tenant Isolation',
    description: 'ყველა AI ოპერაცია მკაცრად შეზღუდულია თქვენი დარბაზის JWT საზღვრებში. სისტემას არ გააჩნია წვდომა სხვა სპორტკომპლექსების მონაცემებზე.',
    legalTag: 'Strict JWT Scoping'
  },
  {
    icon: FileCheck,
    iconBg: 'bg-purple-500/10 border-purple-500/30',
    iconColor: 'text-purple-400',
    title: 'სრული აუდიტ ლოგირება (Audit Trail)',
    badge: 'ISO-27001 Ready',
    description: 'ყველა AI ტრანზაქცია (ხმოვანი ბრძანება, OCR სკანირება თუ ჩატის მოქმედება) წამიერად აღირიცხება სისტემურ ჟურნალში ოპერატორის ID-ით.',
    legalTag: 'Immutable Event Logs'
  },
  {
    icon: EyeOff,
    iconBg: 'bg-rose-500/10 border-rose-500/30',
    iconColor: 'text-rose-400',
    title: 'ფოტოს კონფიდენციალურობა (Privacy First)',
    badge: 'GDPR & საქართველოს კანონი',
    description: 'პირადობის მოწმობის ფოტო მუშავდება მხოლოდ RAM მეხსიერებაში OCR-ისთვის და ტექსტის ამოღებისთანავე ნადგურდება. ფოტო არ ინახება სერვერზე.',
    legalTag: 'Ephemeral RAM Ingestion'
  }
];

export const MultimodalAiSecurityPillars: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#090D15] border border-white/10 space-y-6 relative overflow-hidden shadow-2xl">
      {/* Background neon ambient accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#00A3FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ENTERPRISE TRUST &amp; DATA SECURITY
          </div>
          <h3 className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>ორსაფეხურიანი უსაფრთხოება &amp; Zero-Hallucination არქიტექტურა</span>
          </h3>
          <p className="text-xs text-gray-400 max-w-2xl font-sans">
            როგორ იცავს Artron-ის AI თქვენი კლუბისა და მომხმარებლების პერსონალურ მონაცემებს უმაღლესი სტანდარტებით.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-300">
          <span className="text-[#00E5FF]">AES-256-GCM</span>
          <span className="text-gray-600">•</span>
          <span>საქართველოს კანონმდებლობა</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECURITY_PILLARS.map((p, idx) => {
          const IconComponent = p.icon;
          return (
            <GlowCard
              key={idx}
              className={`p-5 space-y-3 flex flex-col justify-between ${
                idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              glowColor="rgba(0, 163, 255, 0.14)"
              borderColor="rgba(0, 163, 255, 0.4)"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${p.iconBg} ${p.iconColor}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00A3FF]/10 text-[#00E5FF] border border-[#00A3FF]/30">
                    {p.badge}
                  </span>
                </div>

                <h4 className="font-mono text-xs sm:text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                  {p.title}
                </h4>

                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span className="text-gray-300 font-semibold">{p.legalTag}</span>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
};
