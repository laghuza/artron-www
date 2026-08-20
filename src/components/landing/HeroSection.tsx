'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HeroVideoShowcase } from './HeroVideoShowcase';
import { HeroTelemetryLogs } from './HeroTelemetryLogs';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';
import { 
  Activity, 
  Users, 
  TrendingUp, 
  Smartphone, 
  Cpu, 
  QrCode, 
  Wifi, 
  CheckCircle2, 
  Check,
  ArrowRight,
  PhoneCall,
  Terminal,
  Globe,
  Lock,
  Search,
  X
} from 'lucide-react';

interface TelemetryLog {
  id: string;
  time: string;
  user: string;
  type: string; // 'IN' | 'OUT'
  role: string; // 'Employee' | 'Member' | 'Trainer' | 'Guest'
  status: string; // 'Granted' | 'Denied'
}

export const HeroSection: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [logs, setLogs] = useState<TelemetryLog[]>([
    { id: '1', time: '17:58:21', user: 'ირაკლი კ.', role: 'Trainer', type: 'IN', status: 'Granted' },
    { id: '2', time: '17:59:04', user: 'Alex M.', role: 'Member', type: 'IN', status: 'Granted' },
    { id: '3', time: '18:01:10', user: 'ანა ბ.', role: 'Employee', type: 'IN', status: 'Granted' },
    { id: '4', time: '18:03:45', user: 'David T.', role: 'Member', type: 'OUT', status: 'Granted' },
  ]);

  const [stats, setStats] = useState({
    activeMembers: '1,248',
    dailyEntries: '384',
    winbackRate: '+18%'
  });
  
  const [activeTab, setActiveTab] = useState<'b2b' | 'b2c'>('b2b');
  const [qrCodeVal, setQrCodeVal] = useState<string>('ART-88301-GCM');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanSuccess, setScanSuccess] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [b2bView, setB2bView] = useState<'telemetry' | 'screenshot'>('telemetry');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // ESC key listener for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Set client flag for server/client hydration safety
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch initial telemetry stats and logs from backend DB
  useEffect(() => {
    const fetchTelemetryData = async () => {
      try {
        const res = await fetch('/api/v1/telemetry/stats');
        const data = await res.json();
        if (data.status === 'success' || data.status === 'fallback') {
          if (data.stats) setStats(data.stats);
          if (data.logs) setLogs(data.logs);
        }
      } catch (err) {
        console.warn('[ARTRON TELEMETRY] Failed to fetch live telemetry stats:', err);
      }
    };
    fetchTelemetryData();
  }, []);

  // Connect to SSE stream for real-time turnstile telemetry
  useEffect(() => {
    let eventSource: EventSource | null = null;
    
    const connectSSE = () => {
      eventSource = new EventSource('/api/v1/telemetry/stream');
      
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'scan') {
            let userName = data.message 
              ? data.message.replace('Access granted: User ', '').replace(' checked in', '').replace(' checked out', '') 
              : 'Guest';
            
            // Anonymize user name for GDPR
            const parts = userName.trim().split(/\s+/);
            if (parts.length > 1) {
              userName = `${parts[0]} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
            }

            const newLog: TelemetryLog = {
              id: data.userId + '-' + data.timestamp,
              time: new Date(data.timestamp).toTimeString().split(' ')[0],
              user: userName,
              role: 'Member',
              type: data.direction || 'IN',
              status: 'Granted'
            };

            setLogs(prev => [newLog, ...prev.slice(0, 4)]);
            
            if (data.direction === 'IN') {
              setStats(prev => {
                const current = parseInt(prev.dailyEntries.replace(/,/g, ''), 10);
                if (!isNaN(current)) {
                  return {
                    ...prev,
                    dailyEntries: (current + 1).toLocaleString()
                  };
                }
                return prev;
              });
            }
          }
        } catch (err) {
          console.error('[ARTRON TELEMETRY SSE] Event parsing error:', err);
        }
      };

      eventSource.onerror = () => {
        if (eventSource) eventSource.close();
        setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  // Periodic QR Code regeneration to show "Dynamic QR Pass" security
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCode = `ART-${Math.floor(10000 + Math.random() * 90000)}-${locale.toUpperCase()}`;
      setQrCodeVal(randomCode);
    }, 5000);
    return () => clearInterval(interval);
  }, [locale]);

  // Handle interactive scanning simulation from mobile phone to dashboard telemetry
  const triggerQrScan = () => {
    if (isScanning || scanSuccess) return;
    setIsScanning(true);
    
    setTimeout(async () => {
      setIsScanning(false);
      setScanSuccess(true);

      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      try {
        const res = await fetch('/api/v1/telemetry/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            qrToken: qrCodeVal,
            direction: 'IN',
            tenantId: '00000000-0000-0000-0000-000000000000'
          })
        });

        if (!res.ok) {
          throw new Error('Scan post rejected');
        }
      } catch (err) {
        // Fallback simulation if DB offline
        const newLog: TelemetryLog = {
          id: Date.now().toString(),
          time: timeStr,
          user: locale === 'ka' ? 'გიორგი ს. (მობილურით)' : locale === 'ru' ? 'Георгий С. (моб.)' : 'George S. (Mobile)',
          role: 'Member',
          type: 'IN',
          status: 'Granted'
        };

        setLogs(prev => [newLog, ...prev.slice(0, 4)]);
        
        setStats(prev => {
          const current = parseInt(prev.dailyEntries.replace(/,/g, ''), 10);
          if (!isNaN(current)) {
            return {
              ...prev,
              dailyEntries: (current + 1).toLocaleString()
            };
          }
          return prev;
        });
      }

      // Reset success status after a delay
      setTimeout(() => {
        setScanSuccess(false);
      }, 3000);
    }, 1200);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between bg-[#0B0F17] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#121b2d] via-[#0B0F17] to-[#080b11] overflow-hidden pt-12 md:pt-20 px-4 md:px-8 border-b border-white/5">
      
      {/* Background Neon Grid Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#00A3FF_1px,transparent_1px),linear-gradient(to_bottom,#00A3FF_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Navigation & Language Picker Header */}
      <Header />

      {/* Main Hero Content Area */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 md:py-16 z-10 flex-grow">
        
        {/* Left Column: Copy & Value Proposition */}
        <div className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center space-y-6">
          


          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight animate-fadeIn opacity-0 [animation-delay:150ms]">
            {t('hero_title_1')}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] via-[#0066FF] to-[#00D2FF] drop-shadow-[0_0_15px_rgba(0,163,255,0.2)] block sm:inline">
              {t('hero_title_gradient')}
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fadeIn opacity-0 [animation-delay:300ms]">
            {t('hero_subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2 animate-fadeIn opacity-0 [animation-delay:450ms]">
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('booking-engine');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 text-sm font-extrabold shadow-lg shadow-[#00ff87]/25 hover:shadow-[#00ff87]/45 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ minHeight: '48px' }}
            >
              <PhoneCall className="w-4.5 h-4.5" />
              {t('cta_b2b')}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'b2b' ? 'b2c' : 'b2b')}
              className="py-3 px-6 rounded-xl border border-white/10 bg-white/5 text-[#E2E8F0] text-sm font-bold hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] active:scale-[0.98] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ minHeight: '48px' }}
            >
              <Smartphone className="w-4.5 h-4.5 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
              {t('cta_b2c')}
            </button>
          </div>

          {/* Official App Store & Google Play Badges */}
          <div className="pt-2 animate-fadeIn opacity-0 [animation-delay:500ms]">
            <AppStoreBadges align="left" className="items-center lg:items-start" />
          </div>

          {/* Highlight Stats Info */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-4 animate-fadeIn opacity-0 [animation-delay:600ms]">
            <div className="text-center lg:text-left">
              <div className="text-[#00A3FF] font-black text-lg md:text-xl tracking-tight leading-none">
                {t('stat_admin_title')}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1 leading-snug">
                {t('stat_admin_desc')}
              </div>
            </div>
            <div className="text-center lg:text-left border-l border-white/5 pl-4">
              <div className="text-[#00D2FF] font-black text-lg md:text-xl tracking-tight leading-none">
                {t('stat_access_title')}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1 leading-snug">
                {t('stat_access_desc')}
              </div>
            </div>
            <div className="text-center lg:text-left border-l border-white/5 pl-4">
              <div className="text-emerald-400 font-black text-lg md:text-xl tracking-tight leading-none">
                {t('stat_bookings_title')}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1 leading-snug">
                {t('stat_bookings_desc')}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Dual-Core Showcase */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center animate-fadeIn opacity-0 [animation-delay:400ms]">
          
          {/* Tabs Selector for Small screens */}
          <div className="flex lg:hidden bg-[#121722]/80 border border-white/10 p-1 rounded-xl mb-6 w-full max-w-sm">
            <button
              onClick={() => setActiveTab('b2b')}
              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${
                activeTab === 'b2b' ? 'bg-[#00ff87]/20 text-[#00ff87]' : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '44px' }}
            >
              {t('db_title')}
            </button>
            <button
              onClick={() => setActiveTab('b2c')}
              className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${
                activeTab === 'b2c' ? 'bg-[#00ff87]/20 text-[#00ff87]' : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '44px' }}
            >
              {t('mobile_title')}
            </button>
          </div>

          {/* Desktop Dual-Core Showcase Box */}
          <div className="w-full relative flex flex-col md:flex-row items-stretch justify-center gap-6">
            
            {/* Core 1: Admin Panel Dashboard Preview */}
            <div className={`w-full md:flex-1 bg-[#05070a]/85 backdrop-blur-xl border border-[#8a99ad]/20 rounded-2xl p-5 shadow-2xl relative transition-all duration-300 overflow-hidden cursor-pointer ${
              isClient && activeTab === 'b2b' ? 'ring-1 ring-[#00ff87]/50 shadow-[0_0_25px_rgba(0,255,135,0.15)] scale-[1.01] z-10' : 'opacity-50 hidden lg:block hover:opacity-90 hover:scale-[1.005] hover:border-[#00ff87]/15'
            }`}
            onClick={() => setActiveTab('b2b')}
            >
              {/* L-Shape Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

              {/* Terminal corner brackets */}
              <div className="absolute top-2 left-2 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">┌</div>
              <div className="absolute top-2 right-2 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">┐</div>
              <div className="absolute bottom-2 left-2 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">└</div>
              <div className="absolute bottom-2 right-2 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">┘</div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3.5 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse drop-shadow-[0_0_8px_#00ff87]"></span>
                  <h4 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5 font-sans">
                    {t('db_title')}
                  </h4>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                  {/* View Selector Tabs */}
                  <div className="flex bg-black/40 border border-white/5 rounded-lg p-0.5">
                    <button 
                      onClick={() => setB2bView('telemetry')}
                      className={`px-2 py-0.5 text-[8.5px] font-mono uppercase font-bold rounded transition-all cursor-pointer ${
                        b2bView === 'telemetry' ? 'bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/20' : 'text-[#94A3B8] hover:text-white border border-transparent'
                      }`}
                      style={{ minHeight: '20px' }}
                    >
                      {t('db_toggle_live')}
                    </button>
                    <button 
                      onClick={() => setB2bView('screenshot')}
                      className={`px-2 py-0.5 text-[8.5px] font-mono uppercase font-bold rounded transition-all cursor-pointer ${
                        b2bView === 'screenshot' ? 'bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/20' : 'text-[#94A3B8] hover:text-white border border-transparent'
                      }`}
                      style={{ minHeight: '20px' }}
                    >
                      {t('db_toggle_screenshot')}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#00ff87] font-semibold bg-[#00ff87]/15 px-2 py-0.5 rounded border border-[#00ff87]/20 shrink-0">
                    <Wifi className="w-3 h-3 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
                    {t('db_status')}
                  </div>
                </div>
              </div>

              {b2bView === 'telemetry' ? (
                <>
                  {/* Grid KPIs */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-center">
                      <div className="flex justify-center text-[#00A3FF] mb-1">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-[#94A3B8] block">{t('db_kpi_members')}</span>
                      <span className="text-sm font-black text-white mt-0.5 block">{stats.activeMembers}</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-center">
                      <div className="flex justify-center text-[#00FF87] mb-1">
                        <Activity className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-[#94A3B8] block">{t('db_kpi_entries')}</span>
                      <span className="text-sm font-black text-white mt-0.5 block">{stats.dailyEntries}</span>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-center">
                      <div className="flex justify-center text-emerald-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-[#94A3B8] block">{t('db_kpi_winback')}</span>
                      <span className="text-sm font-black text-emerald-400 mt-0.5 block">{stats.winbackRate}</span>
                    </div>
                  </div>

                  {/* Telemetry Gate Log Panel */}
                  <HeroTelemetryLogs logs={logs} />
                </>
              ) : (
                <div 
                  className="relative group/img overflow-hidden rounded-xl border border-white/5 bg-[#0B0F17]/30 flex items-center justify-center min-h-[290px] w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  <img 
                    src="/control_panel_showcase.png" 
                    alt={t('db_screenshot_alt')} 
                    className="w-full h-[290px] object-cover transition-transform duration-700 group-hover/img:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-2 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] shadow-lg shadow-[#00ff87]/10 animate-bounce">
                      <Search className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/10">
                      {t('db_screenshot_zoom')}
                    </span>
                  </div>
                </div>
              )}

              {/* Glowing overlay shadow */}
              <div className="absolute -inset-px bg-gradient-to-r from-[#00A3FF]/10 to-[#00D2FF]/10 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300"></div>
            </div>

             {/* Core 2: Mobile App Simulated Shell */}
            <div className={`w-full md:max-w-[280px] bg-[#05070a]/85 backdrop-blur-xl border border-[#8a99ad]/20 rounded-3xl p-4 shadow-2xl relative transition-all duration-300 flex flex-col justify-between cursor-pointer ${
              isClient && activeTab === 'b2c' ? 'ring-1 ring-[#00ff87]/50 shadow-[0_0_25px_rgba(0,255,135,0.15)] scale-[1.01] z-10' : 'opacity-50 hidden lg:flex hover:opacity-90 hover:scale-[1.005] hover:border-[#00ff87]/15'
            }`}
            onClick={() => setActiveTab('b2c')}
            >
              {/* L-Shape Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

              {/* Terminal corner brackets */}
              <div className="absolute top-2.5 left-2.5 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">┌</div>
              <div className="absolute top-2.5 right-2.5 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">┐</div>
              <div className="absolute bottom-2.5 left-2.5 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">└</div>
              <div className="absolute bottom-2.5 right-2.5 text-[#00ff87]/40 font-mono text-[9px] pointer-events-none select-none">┘</div>

              {/* Phone Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-[#0B0F17] rounded-full border border-white/5 flex items-center justify-center z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-900"></div>
                </div>
              </div>

              {/* Screen Content */}
              <div className="bg-[#0B0F17] border border-white/5 rounded-2xl p-4 mt-3 flex-grow flex flex-col justify-between min-h-[360px] relative overflow-hidden">
                
                {/* Internal App Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5">
                  <div>
                    <h5 className="text-[10px] text-[#94A3B8] font-sans">{t('mobile_welcome')}</h5>
                    <span className="text-xs font-black text-white tracking-wide">David Todua</span>
                  </div>
                  <Smartphone className="w-4 h-4 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
                </div>

                {/* Simulated QR Code Pass Section */}
                <div className="bg-[#05070a]/80 border border-[#8a99ad]/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ff87]/5 to-transparent pointer-events-none"></div>
                  
                  <span className="text-[9px] font-mono font-bold text-[#94A3B8] tracking-widest uppercase flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-[#00ff87]" />
                    {t('mobile_qr_pass')}
                  </span>

                  {/* Hero Video Showcase / QR Pass Simulation */}
                  <div className="relative w-32 h-32">
                    <HeroVideoShowcase className="w-full h-full !rounded-xl" />
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F17]/85 rounded-xl z-20">
                        <div className="w-10 h-10 border-4 border-[#00ff87] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    {scanSuccess && (
                      <div className="absolute inset-0 bg-[#00ff87]/90 rounded-xl flex flex-col items-center justify-center text-slate-950 p-2 z-20">
                        <CheckCircle2 className="w-10 h-10 mb-1 text-slate-950 drop-shadow-[0_0_8px_#00ff87]" />
                        <span className="text-[10px] font-extrabold tracking-wider uppercase">Unlocked</span>
                      </div>
                    )}
                  </div>

                  <span className="font-mono text-[9px] text-[#94A3B8] tracking-wider bg-white/5 px-2 py-0.5 rounded">
                    {qrCodeVal}
                  </span>

                  {/* Scan Interactive Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent switching active tabs
                      triggerQrScan();
                    }}
                    disabled={isScanning || scanSuccess}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#00ff87] hover:bg-[#00ff87]/80 disabled:bg-[#1e293b] disabled:text-[#64748b] text-slate-950 text-xs font-bold tracking-wider shadow-lg hover:shadow-[#00ff87]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    style={{ minHeight: '44px' }}
                  >
                    <QrCode className="w-4 h-4 text-slate-950" />
                    {scanSuccess ? 'ACCESS GRANTED' : isScanning ? 'COMMUNICATING...' : 'SCAN PASS'}
                  </button>
                </div>

                {/* Sub & Active Metrics */}
                <div className="mt-3.5 space-y-2.5">
                  <div className="bg-[#05070a]/80 border border-[#8a99ad]/10 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-[#94A3B8] block uppercase tracking-wider">{t('mobile_sub_status')}</span>
                      <span className="text-[10px] font-bold text-white block mt-0.5">{t('mobile_sub_active')}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 flex items-center justify-center text-[#00ff87]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="bg-[#05070a]/80 border border-[#8a99ad]/10 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-mono text-[#94A3B8] block uppercase tracking-wider">{t('mobile_progress')}</span>
                      <span className="text-[10px] font-bold text-[#00ff87] block mt-0.5">{t('mobile_workouts')}: 28</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/20 flex items-center justify-center text-[#00ff87] drop-shadow-[0_0_6px_#00ff87]">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer Branding Notes */}
      <footer className="relative w-full max-w-7xl mx-auto py-4 text-center border-t border-white/5 mt-auto z-10 flex items-center justify-between text-[11px] text-[#94A3B8]">
        <div>
          &copy; {new Date().getFullYear()} ARTRON LLC. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="https://artron.ge/terms" target="_blank" className="hover:underline">{t('cookie_policy_link')}</a>
        </div>
      </footer>

      {/* Lightbox Modal for Control Panel Screenshot */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-[#05070a]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative max-w-6xl w-full bg-[#0B0F17] border border-[#8a99ad]/20 rounded-2xl overflow-hidden shadow-2xl p-2 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* L-Shape Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/40" />

            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-white/30 text-[#94A3B8] hover:text-white flex items-center justify-center transition-all cursor-pointer"
              style={{ minHeight: '32px' }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-[#00ff87] tracking-wider uppercase">
              [ SCREENSHOT // ARTRON_SPORTS_OS_DASHBOARD ]
            </div>

            {/* Image */}
            <img 
              src="/control_panel_showcase.png" 
              alt={t('db_screenshot_alt')} 
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
