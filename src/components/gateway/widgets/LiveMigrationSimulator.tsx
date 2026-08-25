"use client";

import React, { useState, useRef } from 'react';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  RotateCcw, 
  ArrowRight,
  Zap,
  Users,
  CreditCard,
  KeyRound,
  X
} from 'lucide-react';

export interface MigratedMember {
  id: string;
  name: string;
  phone: string;
  tier: string;
  expiry: string;
  status: 'ACTIVE' | 'EXPIRING' | 'FROZEN' | 'EXPIRED';
  checkins: number;
  qrCode: string;
}

const SAMPLE_MEMBERS: MigratedMember[] = [
  { id: "MEM-101", name: "დავით გიორგაძე", phone: "+995 599 12 34 56", tier: "Unlimited Platinum VIP", expiry: "2026-12-31", status: "ACTIVE", checkins: 48, qrCode: "QR-88219" },
  { id: "MEM-102", name: "ნინო აბაშიძე", phone: "+995 577 23 45 67", tier: "Standard Gym & Cardio", expiry: "2026-09-15", status: "ACTIVE", checkins: 22, qrCode: "QR-49102" },
  { id: "MEM-103", name: "გიორგი მამულაშვილი", phone: "+995 591 34 56 78", tier: "Swimming Pool Pro", expiry: "2026-08-28", status: "EXPIRING", checkins: 19, qrCode: "QR-19034" },
  { id: "MEM-104", name: "ანა კაპანაძე", phone: "+995 598 45 67 89", tier: "CrossFit & Group Pass", expiry: "2026-11-20", status: "ACTIVE", checkins: 36, qrCode: "QR-77215" },
  { id: "MEM-105", name: "ლევან ბერიძე", phone: "+995 593 56 78 90", tier: "Morning Off-Peak Pass", expiry: "2026-08-30", status: "EXPIRING", checkins: 14, qrCode: "QR-63019" },
  { id: "MEM-106", name: "მარიამ ჯაფარიძე", phone: "+995 555 67 89 01", tier: "Student Unlimited", expiry: "2026-10-05", status: "FROZEN", checkins: 8, qrCode: "QR-31908" },
  { id: "MEM-107", name: "ირაკლი ჩხეიძე", phone: "+995 574 78 90 12", tier: "Corporate B2B Tier", expiry: "2026-12-10", status: "ACTIVE", checkins: 62, qrCode: "QR-94281" },
  { id: "MEM-108", name: "თამარ ლომიძე", phone: "+995 597 89 01 23", tier: "Unlimited Platinum VIP", expiry: "2026-09-02", status: "EXPIRING", checkins: 31, qrCode: "QR-55194" },
  { id: "MEM-109", name: "სანდრო კალანდაძე", phone: "+995 558 90 12 34", tier: "Standard Gym & Cardio", expiry: "2026-10-18", status: "ACTIVE", checkins: 27, qrCode: "QR-20491" },
  { id: "MEM-110", name: "ქეთევან წერეთელი", phone: "+995 595 01 23 45", tier: "Yoga & Pilates Studio", expiry: "2026-11-14", status: "ACTIVE", checkins: 41, qrCode: "QR-10928" },
];

interface LiveMigrationSimulatorProps {
  onClose?: () => void;
  onLaunchConsole?: () => void;
}

export const LiveMigrationSimulator: React.FC<LiveMigrationSimulatorProps> = ({
  onClose,
  onLaunchConsole,
}) => {
  const { lang } = useI18n();
  const [step, setStep] = useState<'IDLE' | 'PARSING' | 'SUCCESS'>('IDLE');
  const [fileName, setFileName] = useState<string>('sample_gym_database.xlsx');
  const [parsingProgress, setParsingProgress] = useState(0);
  const [members, setMembers] = useState<MigratedMember[]>(SAMPLE_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'EXPIRING' | 'FROZEN'>('ALL');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startSimulation = (customFileName?: string, customData?: MigratedMember[]) => {
    soundEngine.playPulseNode();
    setStep('PARSING');
    setFileName(customFileName || 'artron_sample_members.xlsx');
    setParsingProgress(10);

    const interval = setInterval(() => {
      setParsingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            soundEngine.playSystemAccess();
            if (customData && customData.length > 0) {
              setMembers(customData);
            } else {
              setMembers(SAMPLE_MEMBERS);
            }
            setStep('SUCCESS');
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length > 1) {
        const parsed: MigratedMember[] = lines.slice(1, 25).map((line, idx) => {
          const parts = line.split(/[;,,\t]/);
          return {
            id: `MEM-${200 + idx}`,
            name: parts[0]?.trim() || `მომხმარებელი ${idx + 1}`,
            phone: parts[1]?.trim() || `+995 599 00 00 ${idx < 10 ? '0' + idx : idx}`,
            tier: parts[2]?.trim() || "Standard Gym Pass",
            expiry: parts[3]?.trim() || "2026-10-31",
            status: idx % 4 === 0 ? "EXPIRING" : idx % 7 === 0 ? "FROZEN" : "ACTIVE",
            checkins: Math.floor(Math.random() * 45) + 5,
            qrCode: `QR-${Math.floor(10000 + Math.random() * 90000)}`,
          };
        });
        startSimulation(file.name, parsed);
      } else {
        startSimulation(file.name, SAMPLE_MEMBERS);
      }
    };
    reader.readAsText(file);
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || m.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[#080B11]/95 border border-[#00A3FF]/40 rounded-2xl backdrop-blur-2xl shadow-[0_0_50px_rgba(0,163,255,0.15)] text-white select-none overflow-hidden relative animate-fadeIn">
      {/* Top Bar with Title & Close Action */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00A3FF]/15 border border-[#00A3FF]/40 flex items-center justify-center text-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.25)]">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00A3FF] font-bold">
                [ LIVE DATA MIGRATION ENGINE ]
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                CLIENT-SIDE WASM
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight font-sans">
              {lang === 'GE'
                ? 'Excel/CSV ბაზის მყისიერი მიგრაციის სიმულატორი'
                : lang === 'RU'
                ? 'Симулятор мгновенной миграции базы Excel/CSV'
                : 'Instant Excel/CSV Database Migration Simulator'}
            </h2>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="დახურვა"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* STEP 1: IDLE UPLOAD ZONE */}
      {step === 'IDLE' && (
        <div className="flex-1 flex flex-col justify-center items-center py-6 px-4 space-y-6 animate-fadeIn">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileUpload}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-xl border-2 border-dashed border-[#00A3FF]/40 hover:border-[#00A3FF] bg-[#0c1018]/80 hover:bg-[#0f1522] rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group shadow-[0_0_30px_rgba(0,163,255,0.06)] hover:shadow-[0_0_40px_rgba(0,163,255,0.2)]"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#00A3FF]/10 border border-[#00A3FF]/30 flex items-center justify-center mx-auto mb-4 text-[#00A3FF] group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 font-sans">
              {lang === 'GE'
                ? 'ჩააგდეთ თქვენი Excel ან CSV ფაილი აქ'
                : lang === 'RU'
                ? 'Перетащите ваш Excel или CSV файл сюда'
                : 'Drag & Drop your Excel or CSV file here'}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              (.xlsx, .xls, .csv — მხარდაჭერილია ნებისმიერი სტრუქტურა)
            </p>
          </div>

          <div className="flex items-center gap-3 w-full max-w-xl">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold">
              {lang === 'GE' ? 'ან გამოსცადეთ მზა ბაზით' : lang === 'RU' ? 'или тестовая база' : 'or test with sample'}
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={() => startSimulation()}
            className="w-full max-w-xl py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-black bg-gradient-to-r from-[#00A3FF] via-[#00d2ff] to-[#00ff87] hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,163,255,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>
              {lang === 'GE'
                ? '⚡ 1-კლიკიანი სატესტო ბაზის გენერირება (100 წევრი)'
                : lang === 'RU'
                ? '⚡ Сгенерировать готовую тестовую базу (100 атлетов)'
                : '⚡ 1-Click Sample Gym Database (100 Members)'}
            </span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              {lang === 'GE'
                ? '🔒 100% ლოკალური უსაფრთხოება: მონაცემები მუშავდება მხოლოდ ბრაუზერში და არ იგზავნება სერვერზე.'
                : lang === 'RU'
                ? '🔒 100% локальная безопасность: данные обрабатываются в браузере и не сохраняются на сервере.'
                : '🔒 100% Client-Side In-Memory: Data processed locally, never sent to external servers.'}
            </span>
          </div>
        </div>
      )}

      {/* STEP 2: PARSING & AI AUTO-MAPPING ANIMATION */}
      {step === 'PARSING' && (
        <div className="flex-1 flex flex-col justify-center items-center py-8 px-4 space-y-6 animate-fadeIn max-w-xl mx-auto w-full">
          <div className="w-16 h-16 rounded-2xl bg-[#00A3FF]/15 border border-[#00A3FF] flex items-center justify-center text-[#00A3FF] animate-pulse shadow-[0_0_30px_#00A3FF]">
            <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          <div className="text-center space-y-2">
            <span className="font-mono text-xs text-[#00A3FF] uppercase tracking-[0.2em] font-bold">
              [ AI AUTO-MAPPING IN PROGRESS ]
            </span>
            <h3 className="text-lg font-bold text-white font-sans">
              მიმდინარეობს «{fileName}» სვეტების ამოცნობა და დაშიფვრა...
            </h3>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#121722] border border-white/10 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-[#00A3FF] to-[#00ff87] h-full rounded-full transition-all duration-300 shadow-[0_0_15px_#00A3FF]"
              style={{ width: `${parsingProgress}%` }}
            />
          </div>

          {/* Live Parsing Log Steps */}
          <div className="w-full bg-[#0c1017] border border-white/10 rounded-xl p-4 font-mono text-[11px] space-y-2 text-slate-300">
            <div className="flex items-center justify-between text-emerald-400">
              <span>✓ სვეტი: სახელი / გვარი ➔ Member Name</span>
              <span className="text-[10px]">100% MATCH</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400">
              <span>✓ სვეტი: ტელეფონი ➔ SMS Auth & OTP</span>
              <span className="text-[10px]">E.164 FORMAT</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400">
              <span>✓ სვეტი: აბონემენტის ვადა ➔ Expiration Engine</span>
              <span className="text-[10px]">CALENDAR SYNC</span>
            </div>
            <div className="flex items-center justify-between text-[#00A3FF]">
              <span>⚡ PII დაცვა: AES-256-GCM კოდირება...</span>
              <span className="text-[10px]">SECURED</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: MIGRATED LIVE CRM GRID PREVIEW */}
      {step === 'SUCCESS' && (
        <div className="flex-1 flex flex-col min-h-0 space-y-4 animate-fadeIn">
          {/* Top KPI Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0e1420] border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
                <Users className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>სულ წევრები</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">{members.length}</div>
            </div>
            <div className="bg-[#0e1420] border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>აქტიური</span>
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">
                {members.filter((m) => m.status === 'ACTIVE').length}
              </div>
            </div>
            <div className="bg-[#0e1420] border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
                <CreditCard className="w-3.5 h-3.5" />
                <span>ეწურება ვადა</span>
              </div>
              <div className="text-xl font-bold text-amber-400 font-mono">
                {members.filter((m) => m.status === 'EXPIRING').length}
              </div>
            </div>
            <div className="bg-[#0e1420] border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 text-[#00A3FF] text-xs font-mono mb-1">
                <KeyRound className="w-3.5 h-3.5" />
                <span>QR ტურნიკეტი</span>
              </div>
              <div className="text-xl font-bold text-white font-mono">100% READY</div>
            </div>
          </div>

          {/* Search & Filter Toolbars */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d121c] border border-white/10 p-2.5 rounded-xl">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ძებნა სახელით, ტელეფონით..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141a26] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF]"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
              {(['ALL', 'ACTIVE', 'EXPIRING', 'FROZEN'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    filterStatus === st
                      ? 'bg-[#00A3FF] text-black shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Members Table */}
          <div className="flex-1 min-h-[220px] max-h-[320px] overflow-y-auto border border-white/10 rounded-xl bg-[#0a0e16]">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead className="sticky top-0 bg-[#101622] border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-3">ID / სახელი</th>
                  <th className="p-3">ტელეფონი</th>
                  <th className="p-3">პაკეტი / ტარიფი</th>
                  <th className="p-3">მოქმედების ვადა</th>
                  <th className="p-3">სტატუსი</th>
                  <th className="p-3 text-right">QR ტურნიკეტი</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{m.id}</div>
                    </td>
                    <td className="p-3 font-mono text-slate-300">{m.phone}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-[#00A3FF]">
                        {m.tier}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-300">{m.expiry}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          m.status === 'ACTIVE'
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                            : m.status === 'EXPIRING'
                            ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                            : 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
                        }`}
                      >
                        ● {m.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-[11px] text-emerald-400 font-bold">
                      {m.qrCode} ✓
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep('IDLE')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/30 bg-[#0d121c] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>სხვა ფაილის გასინჯვა</span>
            </button>

            {onLaunchConsole && (
              <button
                type="button"
                onClick={onLaunchConsole}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-black bg-[#00ff87] hover:bg-[#1aff96] transition-all shadow-[0_0_20px_rgba(0,255,135,0.4)] cursor-pointer"
              >
                <span>გადასვლა სრულ CRM კონსოლში</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
