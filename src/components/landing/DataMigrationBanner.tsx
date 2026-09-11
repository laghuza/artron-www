'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Play, ArrowRight } from 'lucide-react';
import { IgnitionButton } from '@/components/ui/IgnitionButton';

export const DataMigrationBanner: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-[#00A3FF]/15 via-[#0B0F17] to-[#00ff87]/15 border border-[#00A3FF]/30 rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-[0_12px_40px_rgba(0,163,255,0.1)] mt-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('migration.badge') || '48-HOUR DATA MIGRATION GUARANTEE'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
            {locale === 'ka' 
              ? 'გადმოიტანეთ თქვენი არსებული ბაზა უმტკივნეულოდ' 
              : locale === 'ru' 
                ? 'Перенесите вашу базу без задержек и потерь' 
                : 'Seamlessly Migrate Your Existing Database in 48 Hours'}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
            {t('migration.desc') || (locale === 'ka' 
              ? 'ჩვენი საინჟინრო გუნდი 48 საათში სრულად, დანაკარგების გარეშე გადმოიტანს თქვენს კლიენტებს Excel-იდან, 1C-დან ან ძველი პროგრამიდან.'
              : locale === 'ru'
                ? 'Наша команда инженеров за 48 часов полностью перенесет базу клиентов из Excel, 1C или старой системы без потерь.'
                : 'Our engineering team will seamlessly migrate all member records from Excel, 1C, or legacy systems within 48 hours.')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
          <IgnitionButton
            href="/sports-os?node=1&action=migration"
            variant="cyan"
            size="md"
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-wider font-bold"
            aria-label="Instant Sandbox Ignition"
          >
            <span>{t('migration.cta_instant_sandbox') || (locale === 'ka' ? 'ტესტირება Sandbox-ში' : 'Instant Sandbox')}</span>
          </IgnitionButton>

          <Link
            href="/get-started?mode=demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-slate-200 bg-[#0d131f] hover:bg-[#131c2e] hover:text-white border border-white/10 hover:border-[#00A3FF]/40 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-[#00A3FF]/30 text-[#00A3FF] shrink-0" />
            <span>{t('migration.cta_book_demo') || (locale === 'ka' ? 'დემოს მოთხოვნა' : 'Book Demo')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
