'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Users, 
  Coins, 
  Dumbbell, 
  ShoppingBag, 
  Building, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  ArrowLeft, 
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { RoiSliderControl } from '@/components/landing/roi/RoiSliderControl';
import { AuditPnlSummaryCard } from '@/components/audit/AuditPnlSummaryCard';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { soundEngine } from '@/core';

export default function FinancialAuditClient() {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Currencies and local rates
  const currency = useMemo(() => {
    switch (locale) {
      case 'ka':
        return { symbol: '₾', rate: 120, formatBefore: false, laborRate: 10, cardSavings: 0.25, rentDef: 4500, adminDef: 3000, barDef: 1500, ptDef: 2500, saasFee: 199 };
      case 'ru':
        return { symbol: '₽', rate: 4000, formatBefore: false, laborRate: 350, cardSavings: 12, rentDef: 150000, adminDef: 95000, barDef: 45000, ptDef: 80000, saasFee: 6500 };
      case 'en':
      default:
        return { symbol: '$', rate: 50, formatBefore: true, laborRate: 15, cardSavings: 0.15, rentDef: 2500, adminDef: 2200, barDef: 900, ptDef: 1800, saasFee: 79 };
    }
  }, [locale]);

  // Initial State from URL params or defaults
  const initialMembers = Number(searchParams.get('members')) || 850;
  const initialPrice = Number(searchParams.get('price')) || currency.rate;
  const initialStaff = Number(searchParams.get('staff')) || 18;

  // 1. Revenues State
  const [members, setMembers] = useState<number>(initialMembers);
  const [price, setPrice] = useState<number>(initialPrice);
  const [ptRevenue, setPtRevenue] = useState<number>(currency.ptDef);
  const [barRevenue, setBarRevenue] = useState<number>(currency.barDef);

  // 2. Expenses State
  const [rentAndUtilities, setRentAndUtilities] = useState<number>(currency.rentDef);
  const [adminPayroll, setAdminPayroll] = useState<number>(currency.adminDef);
  const [staffCount, setStaffCount] = useState<number>(initialStaff);
  const [cardAndSoftwareCost, setCardAndSoftwareCost] = useState<number>(Math.round(initialMembers * currency.cardSavings * 2 + 150));

  const formatCurrency = (val: number) => {
    const formatted = Math.round(val).toLocaleString();
    return currency.formatBefore ? `${currency.symbol}${formatted}` : `${formatted} ${currency.symbol}`;
  };

  // Reset to defaults
  const handleReset = () => {
    soundEngine.playPulseNode();
    setMembers(850);
    setPrice(currency.rate);
    setPtRevenue(currency.ptDef);
    setBarRevenue(currency.barDef);
    setRentAndUtilities(currency.rentDef);
    setAdminPayroll(currency.adminDef);
    setStaffCount(18);
    setCardAndSoftwareCost(Math.round(850 * currency.cardSavings * 2 + 150));
  };

  // ── P&L Mathematical Engine ──
  // Current Status Quo
  const currentMembershipRev = members * price;
  const currentTotalRevenue = currentMembershipRev + ptRevenue + barRevenue;
  const currentTrainerSalaries = Math.round(ptRevenue * 0.60); // 60% commission/payout to trainers
  const currentTotalExpenses = rentAndUtilities + adminPayroll + currentTrainerSalaries + cardAndSoftwareCost;
  const currentNetProfit = currentTotalRevenue - currentTotalExpenses;
  const currentMarginPct = currentTotalRevenue > 0 ? Math.round((currentNetProfit / currentTotalRevenue) * 100) : 0;

  // ARTRON Optimized
  // Gains & Recovery
  const churnRecoveredGain = Math.round(currentMembershipRev * 0.14); // 14% LTV boost
  const turnstileAntiPassbackGain = Math.round(currentMembershipRev * 0.035); // 3.5% unpaid entry elimination
  const newMembershipRev = currentMembershipRev + churnRecoveredGain + turnstileAntiPassbackGain;
  const newTotalRevenue = newMembershipRev + ptRevenue + barRevenue;

  // Cost Reductions
  const laborHoursSaved = staffCount * 14;
  const laborCostSavings = Math.round(laborHoursSaved * currency.laborRate);
  const newAdminPayroll = Math.max(adminPayroll - laborCostSavings, Math.round(adminPayroll * 0.6));
  const newCardAndSoftwareCost = currency.saasFee; // Zero plastic cards + standard SaaS tier
  const newTotalExpenses = rentAndUtilities + newAdminPayroll + currentTrainerSalaries + newCardAndSoftwareCost;

  const optimizedNetProfit = newTotalRevenue - newTotalExpenses;
  const optimizedMarginPct = newTotalRevenue > 0 ? Math.round((optimizedNetProfit / newTotalRevenue) * 100) : 0;
  const netMonthlyGain = optimizedNetProfit - currentNetProfit;
  const annualGain = netMonthlyGain * 12;
  const profitGrowthPct = currentNetProfit > 0 ? Math.round((netMonthlyGain / currentNetProfit) * 100) : 100;

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-100 relative overflow-hidden flex flex-col justify-between">
      {/* Background Neon Blurs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Bar */}
      <header className="border-b border-white/5 bg-[#05070a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/#roi"
            onClick={() => soundEngine.playPulseNode()}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>{t('audit_btn_back_home')}</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 flex-grow w-full">
        {/* Title & Privacy Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 font-mono text-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t('audit_badge')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            {t('audit_title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6">
            {t('audit_subtitle')}
          </p>

          {/* 🔒 Prominent Privacy Guarantee Notice */}
          <div className="inline-flex items-center gap-3 p-3.5 sm:px-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs text-left backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.08)]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold flex items-center gap-1.5 text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('audit_privacy_badge')}</span>
              </div>
              <p className="text-[11px] text-emerald-300/80 font-normal mt-0.5">
                {t('audit_privacy_text')}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sliders & Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Revenues Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>{t('audit_section_revenues')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoiSliderControl
                  id="audit-members"
                  icon={Users}
                  label={t('audit_field_members')}
                  valueText={`${members.toLocaleString()}`}
                  min={50}
                  max={5000}
                  step={50}
                  value={members}
                  onChange={setMembers}
                  accentColor="#00A3FF"
                />

                <RoiSliderControl
                  id="audit-price"
                  icon={Coins}
                  label={t('audit_field_price')}
                  valueText={formatCurrency(price)}
                  min={currency.rate > 500 ? 1000 : 10}
                  max={currency.rate > 500 ? 15000 : 500}
                  step={currency.rate > 500 ? 100 : 5}
                  value={price}
                  onChange={setPrice}
                  accentColor="#00A3FF"
                />

                <RoiSliderControl
                  id="audit-pt"
                  icon={Dumbbell}
                  label={t('audit_field_trainers_rev')}
                  valueText={formatCurrency(ptRevenue)}
                  min={0}
                  max={currency.rate > 500 ? 500000 : 25000}
                  step={currency.rate > 500 ? 5000 : 200}
                  value={ptRevenue}
                  onChange={setPtRevenue}
                  accentColor="#10B981"
                />

                <RoiSliderControl
                  id="audit-bar"
                  icon={ShoppingBag}
                  label={t('audit_field_bar_rev')}
                  valueText={formatCurrency(barRevenue)}
                  min={0}
                  max={currency.rate > 500 ? 300000 : 15000}
                  step={currency.rate > 500 ? 2000 : 100}
                  value={barRevenue}
                  onChange={setBarRevenue}
                  accentColor="#10B981"
                />
              </div>
            </div>

            {/* 2. Expenses Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 tracking-wider">
                <Building className="w-4 h-4" />
                <span>{t('audit_section_expenses')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RoiSliderControl
                  id="audit-rent"
                  icon={Building}
                  label={t('audit_field_rent')}
                  valueText={formatCurrency(rentAndUtilities)}
                  min={0}
                  max={currency.rate > 500 ? 500000 : 35000}
                  step={currency.rate > 500 ? 5000 : 200}
                  value={rentAndUtilities}
                  onChange={setRentAndUtilities}
                  accentColor="#F43F5E"
                />

                <RoiSliderControl
                  id="audit-admin"
                  icon={Users}
                  label={t('audit_field_admin_payroll')}
                  valueText={formatCurrency(adminPayroll)}
                  min={0}
                  max={currency.rate > 500 ? 400000 : 25000}
                  step={currency.rate > 500 ? 5000 : 200}
                  value={adminPayroll}
                  onChange={setAdminPayroll}
                  accentColor="#F43F5E"
                />

                <RoiSliderControl
                  id="audit-staff-count"
                  icon={Clock}
                  label={t('audit_field_staff_count')}
                  valueText={`${staffCount}`}
                  min={2}
                  max={150}
                  step={1}
                  value={staffCount}
                  onChange={setStaffCount}
                  accentColor="#00A3FF"
                />

                <RoiSliderControl
                  id="audit-cards"
                  icon={CreditCard}
                  label={t('audit_field_card_costs')}
                  valueText={formatCurrency(cardAndSoftwareCost)}
                  min={0}
                  max={currency.rate > 500 ? 60000 : 3000}
                  step={currency.rate > 500 ? 500 : 25}
                  value={cardAndSoftwareCost}
                  onChange={setCardAndSoftwareCost}
                  accentColor="#F43F5E"
                />
              </div>

              {/* Reset to Initial Values Action */}
              <div className="flex items-center justify-start pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 group"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400 group-hover:-rotate-45 transition-transform" />
                  <span>{t('audit_btn_reset_defaults')}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Comparative P&L Output & Diagnostics (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 tracking-wider">
              <Zap className="w-4 h-4" />
              <span>{t('audit_section_results')}</span>
            </div>

            {/* Side-by-Side P&L Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <AuditPnlSummaryCard
                title={t('audit_card_current_title')}
                isOptimized={false}
                totalRevenue={currentTotalRevenue}
                totalExpenses={currentTotalExpenses}
                netProfit={currentNetProfit}
                marginPct={currentMarginPct}
                formatCurrency={formatCurrency}
                labels={{
                  revenue: t('audit_total_revenue'),
                  expenses: t('audit_total_expenses'),
                  profit: t('audit_net_profit'),
                  margin: t('audit_profit_margin')
                }}
              />

              <AuditPnlSummaryCard
                title={t('audit_card_optimized_title')}
                isOptimized={true}
                totalRevenue={newTotalRevenue}
                totalExpenses={newTotalExpenses}
                netProfit={optimizedNetProfit}
                marginPct={optimizedMarginPct}
                formatCurrency={formatCurrency}
                labels={{
                  revenue: t('audit_total_revenue'),
                  expenses: t('audit_total_expenses'),
                  profit: t('audit_net_profit'),
                  margin: t('audit_profit_margin')
                }}
              />
            </div>

            {/* Big Net Monthly Delta Highlight Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-[#05070a] to-[#0E1B2E] border border-cyan-500/40 shadow-[0_0_40px_rgba(0,163,255,0.15)] relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t('audit_net_gain_monthly')}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 text-[10px]">
                  +{profitGrowthPct}% {t('audit_growth_rate')}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-2 flex items-baseline gap-1">
                <span>+</span>
                <AnimatedNumber
                  value={netMonthlyGain}
                  prefix={currency.formatBefore ? currency.symbol : ''}
                  suffix={currency.formatBefore ? '' : ` ${currency.symbol}`}
                  duration={600}
                />
                <span className="text-xs text-slate-400 font-normal font-sans ml-1">/ თვეში</span>
              </div>

              <p className="text-xs text-slate-400 font-light flex items-center gap-1.5 pt-1 border-t border-white/5">
                <span>{t('audit_net_gain_annual')}:</span>
                <span className="text-cyan-300 font-bold font-mono text-sm">
                  +<AnimatedNumber
                    value={annualGain}
                    prefix={currency.formatBefore ? currency.symbol : ''}
                    suffix={currency.formatBefore ? '' : ` ${currency.symbol}`}
                    duration={600}
                  />
                </span>
              </p>
            </div>

            {/* Growth Anatomy Breakdown */}
            <div className="p-5 rounded-2xl bg-[#05070A]/90 border border-white/10 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('audit_breakdown_title')}</span>
              </h4>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{t('audit_breakdown_churn')}</span>
                  </span>
                  <span className="text-emerald-400 font-bold">+{formatCurrency(churnRecoveredGain)}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{t('audit_breakdown_labor')}</span>
                  </span>
                  <span className="text-cyan-400 font-bold">+{formatCurrency(laborCostSavings)}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{t('audit_breakdown_turnstile')}</span>
                  </span>
                  <span className="text-emerald-400 font-bold">+{formatCurrency(turnstileAntiPassbackGain)}</span>
                </div>
              </div>
            </div>

            {/* Final Conversion Action Suite */}
            <div className="space-y-3 pt-1">
              {/* Dual Action Row: Organization Registration & Guest Demo Access */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={`/get-started?mode=register&members=${members}&price=${price}`}
                  onClick={() => soundEngine.playSystemAccess()}
                  className="py-3 px-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 text-center group"
                >
                  <Building className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{t('audit_btn_register_org')}</span>
                </Link>

                <Link
                  href={`/get-started?mode=demo&members=${members}&price=${price}`}
                  onClick={() => soundEngine.playPulseNode()}
                  className="py-3 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 text-center group"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>{t('audit_btn_guest_demo')}</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer Minimal Notice */}
      <footer className="border-t border-white/5 bg-[#040609] py-6 text-center text-xs text-slate-500 font-mono">
        <p>© {new Date().getFullYear()} ARTRON LLC. All Financial Diagnostics Processed 100% Client-Side In-Memory.</p>
      </footer>
    </div>
  );
}
