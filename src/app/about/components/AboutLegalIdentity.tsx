'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Landmark, MapPin, Mail, ShieldCheck, Copy, Check } from 'lucide-react';

export const AboutLegalIdentity: React.FC = () => {
  const { t, locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText('412799431');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto mb-16 sm:mb-24 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-cyan-500/[0.05] rounded-3xl filter blur-2xl pointer-events-none -z-10" />

      <div className="relative p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-[#0F141C]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t('about_identity_title')}
              </h3>
              <p className="text-xs text-slate-400">
                {locale === 'ka' ? 'შპს ართრონის ოფიციალური იურიდიული მონაცემები' : 'Official Legal Registration Credentials'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFIED GEORGIAN ENTITY</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-300">
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5 font-mono">
                {locale === 'ka' ? 'იურიდიული დასახელება' : locale === 'ru' ? 'Юридическое название' : 'Legal Name'}
              </span>
              <span className="text-white font-bold text-base">
                {locale === 'ka' ? 'შპს ართრონი' : locale === 'ru' ? 'ООО Артрон' : 'Artron LLC'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5 font-mono">
                {locale === 'ka' ? 'საიდენტიფიკაციო კოდი (ს/კ)' : locale === 'ru' ? 'Идентификационный номер' : 'Company ID / Registration Code'}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-white font-mono font-bold text-lg tracking-wider">412799431</span>
                <button
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-mono transition-all"
                  title="Copy ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (locale === 'ka' ? 'კოპირებულია' : 'Copied') : (locale === 'ka' ? 'კოპირება' : 'Copy')}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5 font-mono">
                {locale === 'ka' ? 'იურიდიული მისამართი' : locale === 'ru' ? 'Юридический адрес' : 'Legal Address'}
              </span>
              <span className="text-white font-medium flex items-start gap-2 text-sm leading-relaxed">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                {t('footer_address')}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <span className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5 font-mono">
                {locale === 'ka' ? 'ოფიციალური ელ-ფოსტა' : locale === 'ru' ? 'Официальный контакт' : 'Official Contact Channel'}
              </span>
              <a
                href="mailto:info@artron.ge"
                className="text-cyan-300 hover:text-white font-mono font-semibold transition-colors flex items-center gap-2 text-sm group"
              >
                <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>info@artron.ge</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
