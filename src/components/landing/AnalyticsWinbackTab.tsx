import React from 'react';
import { TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalyticsWinbackTabProps {
  t: (key: string) => string;
  locale: string;
}

export const AnalyticsWinbackTab: React.FC<AnalyticsWinbackTabProps> = ({ t, locale }) => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring' as const, 
        stiffness: 180, 
        damping: 18 
      } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow"
    >
      
      {/* Left Column: Visual Vector Comparison Bar Charts */}
      <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00ff87]" />
            {locale === 'ka' ? 'კლიენტის მოზიდვა (CAC) vs დაბრუნება (Win-back)' : locale === 'ru' ? 'Привлечение (CAC) против Возвращения' : 'New CAC vs. Lost Win-Back Cost Comparison'}
          </h3>
          
          {/* Visual Bar Comparison */}
          <div className="space-y-4 bg-[#0B0F17]/50 border border-white/5 p-5 rounded-2xl">
            {/* Bar 1: CAC */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#94A3B8] font-semibold">
                  {locale === 'ka' ? 'ახალი კლიენტის მოზიდვა (CAC)' : locale === 'ru' ? 'Привлечение нового (CAC)' : 'New Customer Acquisition (CAC)'}
                </span>
                <span className="text-white font-black font-mono">120 GEL</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="bg-[#FF4A5A] h-full rounded-full shadow-[0_0_8px_rgba(255,74,90,0.5)]" 
                />
              </div>
            </div>

            {/* Bar 2: Win-back */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#00ff87] font-bold">
                  {locale === 'ka' ? 'ყოფილი წევრის რეაქტივაცია (Win-back)' : locale === 'ru' ? 'Реактивация старого (Win-back)' : 'Lapsed Member Reactivation (Win-back)'}
                </span>
                <span className="text-[#00ff87] font-black font-mono">18 GEL</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '15%' }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                  className="bg-[#00ff87] h-full rounded-full shadow-[0_0_8px_rgba(0,255,135,0.5)]" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#94A3B8] leading-relaxed flex gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#00ff87] shrink-0 mt-0.5" />
          <p>
            {locale === 'ka' 
              ? 'სტატისტიკურად, ყოფილი კლიენტის რეაქტივაცია 6.6-ჯერ უფრო იაფია, ვიდრე ახლის მოზიდვა. ართრონი ავტომატურად ახდენს დაკარგული წევრების დაბრუნებას.'
              : locale === 'ru'
              ? 'Реактивация бывшего клиента в 6.6 раз дешевле привлечения нового. Artron автоматически возвращает ушедших участников.'
              : 'Statistically, reactivating an existing user is 6.6x cheaper than acquiring a new one. Artron handles this recovery flow autonomously.'}
          </p>
        </div>
      </motion.div>

      {/* Right Column: Campaign A/B Test ROI Results */}
      <motion.div variants={itemVariants} className="lg:col-span-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00e5ff]" />
            {locale === 'ka' ? 'რეაქტივაციის კამპანიების ROI (A/B ტესტირება)' : locale === 'ru' ? 'Окупаемость кампаний возврата (A/B Тест)' : 'Reactivation Campaigns A/B Testing ROI'}
          </h3>

          {/* A/B Test Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Offer 1 */}
            <motion.div 
              whileHover={{ y: -3, scale: 1.015, borderColor: 'rgba(0, 255, 135, 0.3)', boxShadow: '0 4px 20px rgba(0, 255, 135, 0.05)' }}
              className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-colors duration-300"
            >
              <div className="text-[9px] font-mono text-[#64748B] mb-1.5">[ CAMPAIGN_A // ACTIVE ]</div>
              <div className="text-xs font-bold text-white mb-2">
                {locale === 'ka' ? 'უფასო ვარჯიში მწვრთნელთან' : locale === 'ru' ? 'Бесплатное занятие с тренером' : 'Free Personal Trainer Session'}
              </div>
              <div className="flex justify-between items-end border-t border-white/5 pt-2 mt-2">
                <span className="text-[10px] text-[#94A3B8] font-mono">Conversion</span>
                <span className="text-lg font-black text-[#00ff87] font-mono">24%</span>
              </div>
            </motion.div>

            {/* Offer 2 */}
            <motion.div 
              whileHover={{ y: -3, scale: 1.015, borderColor: 'rgba(0, 229, 255, 0.3)', boxShadow: '0 4px 20px rgba(0, 229, 255, 0.05)' }}
              className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-colors duration-300"
            >
              <div className="text-[9px] font-mono text-[#64748B] mb-1.5">[ CAMPAIGN_B // MUTED ]</div>
              <div className="text-xs font-bold text-white mb-2">
                {locale === 'ka' ? '-15% ფასდაკლება აბონემენტზე' : locale === 'ru' ? '-15% скидка на абонемент' : '-15% Subscription Discount'}
              </div>
              <div className="flex justify-between items-end border-t border-white/5 pt-2 mt-2">
                <span className="text-[10px] text-[#94A3B8] font-mono">Conversion</span>
                <span className="text-lg font-black text-[#00e5ff] font-mono">12%</span>
              </div>
            </motion.div>

          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="p-4 rounded-2xl bg-[#05070a] border border-[#8a99ad]/10"
        >
          <div className="text-[9px] font-mono text-[#00ff87] mb-1">[ ROI_RECOVERY_GAIN ]</div>
          <div className="text-xs text-[#94A3B8] leading-relaxed">
            {locale === 'ka' 
              ? 'კამპანია A-ს გამოყენებით, საშუალო ზომის დარბაზი (1,000 წევრი) ყოველთვიურად იბრუნებს 240-მდე პასიურ კლიენტს, რაც ქმნის დამატებით ₾28,800 წლიურ შემოსავალს.' 
              : locale === 'ru'
              ? 'Используя Кампанию А, зал на 1000 участников ежемесячно возвращает до 240 пассивных клиентов, восстанавливая ₽960,000 в год.'
              : 'With Campaign A, a gym with 1,000 members recovers up to 240 lapsed clients, restoring over $12,000 in net yearly recurring revenue.'}
          </div>
        </motion.div>

      </motion.div>

    </motion.div>
  );
};
