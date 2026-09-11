'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  ArrowUpRight, 
  Radio, 
  Layers, 
  BarChart2,
  HeartPulse
} from 'lucide-react';
import { soundEngine } from '@/core';

interface NodeSpec {
  id: number;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  code: string;
  metric: string;
  status: string;
}

const NODES: NodeSpec[] = [
  { id: 1, nameKa: 'სამედიცინო ბაზა & 01-15/ნ', nameEn: 'Medical & Labor №01-15/ნ', nameRu: 'Мед-база и Приказ №01-15/н', code: 'NODE-01', metric: '100% Compliant', status: 'ONLINE' },
  { id: 2, nameKa: 'აკადემია & მწვრთნელები', nameEn: 'Academy & Coaches', nameRu: 'Академия и тренеры', code: 'NODE-02', metric: '38 Coaches', status: 'ACTIVE' },
  { id: 3, nameKa: 'ტელემეტრია & EKG Vitals', nameEn: 'Telemetry & EKG Vitals', nameRu: 'Телеметрия и ЭКГ', code: 'NODE-03', metric: '60 Hz Stream', status: 'SYNC' },
  { id: 4, nameKa: 'ინვენტარი & ჭკვიანი IoT', nameEn: 'Smart IoT & Inventory', nameRu: 'Инвентарь и Smart IoT', code: 'NODE-04', metric: '14 Gates Live', status: 'ONLINE' },
  { id: 5, nameKa: 'ტურნირები & რეიტინგები', nameEn: 'Tournaments & Rankings', nameRu: 'Турниры и рейтинги', code: 'NODE-05', metric: '12 Divisions', status: 'READY' },
  { id: 6, nameKa: 'ბიომეტრიული წვდომა', nameEn: 'Biometric Access & NFC', nameRu: 'Биометрия и NFC', code: 'NODE-06', metric: '0.2s Auth', status: 'ONLINE' },
  { id: 7, nameKa: 'ფინანსური ბირთვი (Fiscal)', nameEn: 'Fiscal Core & P&L', nameRu: 'Финансовое ядро', code: 'NODE-07', metric: '0% Fraud', status: 'ACTIVE' },
  { id: 8, nameKa: 'სკაუტინგი & რეზერვი', nameEn: 'Scouting & Talent Pool', nameRu: 'Скаутинг и резерв', code: 'NODE-08', metric: '320 Prospects', status: 'SYNC' },
  { id: 9, nameKa: 'EnneaCore Master Hub', nameEn: 'EnneaCore Master Hub', nameRu: 'EnneaCore Master Hub', code: 'NODE-09', metric: '9/9 Quantum Order', status: 'CORE' }
];

export const SportsOsPreviewSimulator: React.FC = () => {
  const { locale } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<NodeSpec>(NODES[8]); // Default to Master Hub

  const handleNodeClick = (node: NodeSpec) => {
    soundEngine.playPulseNode();
    setSelectedNode(node);
  };

  const getNodeName = (node: NodeSpec) => {
    if (locale === 'en') return node.nameEn;
    if (locale === 'ru') return node.nameRu;
    return node.nameKa;
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/15 border border-[#00A3FF]/30 text-[#00A3FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,163,255,0.25)]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                ENNEACORE // 9-NODE SPORTS MATRIX
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                QUANTUM SYNC
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8]">
              {locale === 'ka' 
                ? '9-ვე სპორტული მიმართულების სინქრონული მართვა ერთიან ბირთვში' 
                : locale === 'ru'
                ? 'Синхронное управление 9 спортивными кластерами в едином ядре'
                : 'Synchronous control of all 9 sports clusters in a unified OS core'}
            </p>
          </div>
        </div>

        <Link
          href="/sports-os"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00A3FF]/20 hover:bg-[#00A3FF]/30 border border-[#00A3FF]/40 text-[#00E5FF] text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,163,255,0.2)] group"
        >
          <span>{locale === 'ka' ? 'კონსოლში შესვლა' : locale === 'ru' ? 'В консоль' : 'Open Console'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* 9-Node Interactive Grid */}
      <div className="grid grid-cols-3 gap-2 flex-grow">
        {NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          const isMaster = node.id === 9;

          return (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? isMaster
                    ? 'bg-[#00E5FF]/15 border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)]'
                    : 'bg-[#00A3FF]/15 border-[#00A3FF] shadow-[0_0_18px_rgba(0,163,255,0.2)]'
                  : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[9px] font-mono font-bold tracking-wider ${
                  isSelected ? 'text-[#00E5FF]' : 'text-[#94A3B8]'
                }`}>
                  {node.code}
                </span>
                <span className={`text-[8px] font-mono px-1 py-0.2 rounded font-bold ${
                  isSelected 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : 'bg-white/5 text-[#94A3B8]'
                }`}>
                  {node.status}
                </span>
              </div>

              <div className="text-[11px] font-bold text-white leading-tight truncate w-full mb-1">
                {getNodeName(node)}
              </div>

              <div className="flex items-center justify-between text-[9px] text-[#94A3B8] font-mono">
                <span className="truncate">{node.metric}</span>
                <Activity className={`w-2.5 h-2.5 shrink-0 ${isSelected ? 'text-[#00E5FF] animate-pulse' : 'opacity-40'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Node Live Telemetry Bar */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-[#07111E]/90 to-[#0B1728]/90 border border-[#00A3FF]/30 flex items-center justify-between gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#00A3FF]/20 border border-[#00A3FF]/40 text-[#00E5FF] flex items-center justify-center shrink-0">
            <HeartPulse className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white truncate">
                {selectedNode.code}: {getNodeName(selectedNode)}
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded shrink-0">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] font-mono truncate">
              Telemetry Stream: {selectedNode.metric} // Zero-Latency Edge Sync
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <div className="h-6 w-px bg-white/10 hidden sm:block" />
          <Link
            href="/sports-os"
            className="text-[10px] font-bold text-[#00A3FF] hover:text-[#00E5FF] underline underline-offset-4 flex items-center gap-1 shrink-0"
          >
            <span>Sport-OS Engine</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
