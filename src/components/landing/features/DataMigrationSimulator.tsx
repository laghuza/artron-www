'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  Lock, 
  Database,
  UploadCloud,
  FileCheck2,
  Sparkles,
  Play
} from 'lucide-react';
import { soundEngine } from '@/core';

export const DataMigrationSimulator: React.FC = () => {
  const { locale } = useLanguage();
  const [migrationState, setMigrationState] = useState<'idle' | 'analyzing' | 'encrypting' | 'completed'>('completed');
  const [recordCount, setRecordCount] = useState<number>(1420);

  const handleSimulateImport = () => {
    soundEngine.playPulseNode();
    setMigrationState('analyzing');

    setTimeout(() => {
      setMigrationState('encrypting');
      setTimeout(() => {
        soundEngine.playPulseNode();
        setMigrationState('completed');
      }, 1200);
    }, 1200);
  };

  return (
    <div className="space-y-4 flex-grow flex flex-col justify-between">
      {/* Top Guarantee Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/30">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{locale === 'ka' ? '48-საათიანი უდანაკარგო მიგრაციის გარანტია' : locale === 'ru' ? '48-часовая гарантия безопасного переноса' : '48-Hour Zero-Downtime Migration Guarantee'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>0 Downtime SLA</span>
        </div>
      </div>

      {/* Migration Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* Left: Interactive File Mapping & Audit */}
        <div className="md:col-span-7 bg-black/40 border border-white/10 rounded-2xl p-4 space-y-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 pb-2 border-b border-white/5">
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#00ff87]" />
                <span>members_legacy_export.xlsx</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">1.4 MB • 1,420 Rows</span>
            </div>

            {/* Field Matching Table */}
            <div className="mt-3 space-y-2">
              <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                {locale === 'ka' ? 'ველების ავტომატური დაკავშირება (AI Mapping):' : 'Automated Field Auto-Mapping:'}
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400">Excel: [სახელი / გვარი]</span>
                  <ArrowRight className="w-3 h-3 text-[#00A3FF]" />
                  <span className="text-emerald-400 font-bold">Artron: member.full_name</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400">Excel: [პირადი N / ID]</span>
                  <ArrowRight className="w-3 h-3 text-[#00A3FF]" />
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> AES-256 Encrypted
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400">Excel: [აბონემენტის ვადა]</span>
                  <ArrowRight className="w-3 h-3 text-[#00A3FF]" />
                  <span className="text-emerald-400 font-bold">Artron: pass.valid_until</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simulate Action Button */}
          <button
            type="button"
            onClick={handleSimulateImport}
            disabled={migrationState === 'analyzing' || migrationState === 'encrypting'}
            className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${migrationState === 'analyzing' || migrationState === 'encrypting' ? 'animate-spin text-[#00A3FF]' : 'text-emerald-400'}`} />
            <span>
              {migrationState === 'analyzing'
                ? (locale === 'ka' ? 'ფაილის ანალიზი...' : 'Analyzing File...')
                : migrationState === 'encrypting'
                  ? (locale === 'ka' ? 'AES-256 შიფრაცია...' : 'Encrypting Fields...')
                  : (locale === 'ka' ? 'მიგრაციის ხელახალი ტესტირება' : 'Retest Migration Import')}
            </span>
          </button>
        </div>

        {/* Right: Real-time Import Health & Guarantees */}
        <div className="md:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5 pb-2 border-b border-white/5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{locale === 'ka' ? 'იმპორტის რეპორტი' : 'Migration Health Report'}</span>
            </div>

            <div className="mt-4 text-center space-y-1">
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {recordCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#94A3B8] font-mono">
                {locale === 'ka' ? 'წევრი უსაფრთხოდ გადატანილია' : 'Members Safely Migrated'}
              </div>
            </div>

            <div className="mt-4 space-y-2 font-mono text-[10px]">
              <div className="flex justify-between text-slate-300">
                <span>დუბლიკატი ჩანაწერები:</span>
                <span className="text-emerald-400 font-bold">0 აღმოჩენილი</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>კონფიდენციალობის დაცვა:</span>
                <span className="text-emerald-400 font-bold">100% AES-256</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>დარბაზის გაჩერების დრო:</span>
                <span className="text-emerald-400 font-bold">0 წუთი (Live Sync)</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <Link
              href="/get-started?mode=demo"
              className="w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.3)] hover:shadow-[0_0_20px_rgba(0,163,255,0.5)] transition-all"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{locale === 'ka' ? 'უფასო მიგრაციის მოთხოვნა' : 'Request Free Migration'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
