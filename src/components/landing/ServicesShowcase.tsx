'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Cpu, 
  Clock, 
  Users, 
  Smartphone, 
  QrCode, 
  Activity,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';

export const ServicesShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'b2b' | 'b2c'>('b2b');

  const b2bServices = [
    {
      icon: <Cpu className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_iot_title',
      descKey: 'service_iot_desc',
      badge: 'IoT Control',
      features: ['TCP/Socket Direct Connect', 'Instant Door Relays', 'Anti-Passback Verification']
    },
    {
      icon: <Clock className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_worktime_title',
      descKey: 'service_worktime_desc',
      badge: 'Order №01-15/ნ',
      features: ['Biometric Face/NFC Tracking', 'Automated Work Hour Sheets', 'Labor Inspection Compliant']
    },
    {
      icon: <Users className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_federation_title',
      descKey: 'service_federation_desc',
      badge: 'Federations',
      features: ['Athlete License Registry', 'Central Tournament Grids', 'Multi-tenant Club Nodes']
    }
  ];

  const b2cServices = [
    {
      icon: <Smartphone className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_marketplace_title',
      descKey: 'service_marketplace_desc',
      badge: 'Subscriptions',
      features: ['Dynamic Card Processing', '14-Day Statutory Refunds', 'One-Click Access Renewals']
    },
    {
      icon: <QrCode className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_passbook_title',
      descKey: 'service_passbook_desc',
      badge: 'Dynamic pass',
      features: ['Self-Regenerating QR Codes', 'In-App NFC Integration', 'Fraud-Proof Entry Keys']
    },
    {
      icon: <Activity className="w-6 h-6 text-[#00A3FF]" />,
      titleKey: 'service_metrics_title',
      descKey: 'service_metrics_desc',
      badge: 'Athletes',
      features: ['Dual-Month Attendance History', 'Interactive Progress Widgets', 'Trainer Review Systems']
    }
  ];

  const services = activeTab === 'b2b' ? b2bServices : b2cServices;

  return (
    <section id="services" className="py-20 px-4 md:px-8 bg-[#0B0F17] relative overflow-hidden border-b border-white/5">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A3FF]/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0066FF]/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-xs font-mono font-bold text-[#00ff87] mb-4 tracking-wider uppercase drop-shadow-[0_0_6px_rgba(0,255,135,0.15)]">
            <Zap className="w-3.5 h-3.5 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" /> {t('logo_text')} Ecosystem
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
            {t('services_section_title')}
          </h2>
          <p className="text-[#94A3B8] text-base md:text-lg font-medium">
            {t('services_section_subtitle')}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-[#121722] border border-white/10 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => setActiveTab('b2b')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'b2b'
                  ? 'bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 shadow-lg shadow-[#00ff87]/20'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              <Cpu className="w-4 h-4" />
              {t('services_tab_b2b')}
            </button>
            <button
              onClick={() => setActiveTab('b2c')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'b2c'
                  ? 'bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 shadow-lg shadow-[#00ff87]/20'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              <Smartphone className="w-4 h-4" />
              {t('services_tab_b2c')}
            </button>
          </div>
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 hover:border-[#00ff87]/40 hover:shadow-2xl hover:shadow-[#00ff87]/5 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* L-Shape Corner Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]/30" />

              {/* Terminal corner brackets */}
              <div className="absolute top-2 left-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┌</div>
              <div className="absolute top-2 right-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┐</div>
              <div className="absolute bottom-2 left-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">└</div>
              <div className="absolute bottom-2 right-2 text-[#00ff87]/30 font-mono text-[9px] pointer-events-none select-none">┘</div>

              {/* Card top hover accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff87]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div>
                {/* Monospace Indicator */}
                <div className="text-[9px] font-mono text-[#00e5ff]/80 uppercase tracking-widest mb-3.5 select-none">
                  [ NODE_REF: 0x0{index + 1} ]
                </div>

                {/* Icon & Badge Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#05070a] border border-[#00ff87]/20 shadow-[0_0_8px_rgba(0,255,135,0.1)] group-hover:border-[#00ff87]/40 group-hover:shadow-[0_0_12px_rgba(0,255,135,0.2)] flex items-center justify-center transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold text-[#00ff87] tracking-wider px-2.5 py-1 rounded-md bg-[#00ff87]/10 border border-[#00ff87]/20">
                    {service.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ff87] transition-colors duration-300">
                  {t(service.titleKey)}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  {t(service.descKey)}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="border-t border-white/5 pt-6 mt-auto">
                <ul className="space-y-2.5">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs text-[#94A3B8]">
                      <CheckCircle2 className="w-4 h-4 text-[#00ff87] drop-shadow-[0_0_6px_#00ff87] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* B2C App Store Badges Integration */}
        {activeTab === 'b2c' && (
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
            <div className="max-w-lg">
              <span className="text-[10px] font-mono font-bold text-[#00ff87] tracking-wider uppercase block mb-1">
                [ B2C // ATHLETE MOBILE OS DISTRIBUTION ]
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight">
                {t('store_b2c_desc')}
              </h4>
            </div>
            <AppStoreBadges align="center" className="pt-2" />
          </div>
        )}

      </div>
    </section>
  );
};
