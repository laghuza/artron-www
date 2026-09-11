'use client';

import React, { useState, useMemo } from 'react';
import { IotSimulator } from './IotSimulator';
import { ControlPanelDefenseSimulator } from './ControlPanelDefenseSimulator';
import { CombinedFinancialRoiSimulator } from './CombinedFinancialRoiSimulator';
import { BookingSchedulerSimulator } from './BookingSchedulerSimulator';
import { DataMigrationSimulator } from './DataMigrationSimulator';
import { MultimodalAiStage } from '@/components/gateway/widgets/live/multimodal-ai/MultimodalAiStage';
import { AnalyticsOkrTab } from '../AnalyticsOkrTab';
import { AnalyticsKpiTab } from '../AnalyticsKpiTab';
import { AnalyticsChurnTab } from '../AnalyticsChurnTab';
import { AnalyticsHeatmapTab } from '../AnalyticsHeatmapTab';
import { AnalyticsWinbackTab } from '../AnalyticsWinbackTab';

interface B2BTerminalStageProps {
  activeFeatureId: string;
  t: (key: string) => string;
  locale: string;
}

export const B2BTerminalStage: React.FC<B2BTerminalStageProps> = ({
  activeFeatureId,
  t,
  locale,
}) => {
  // Churn interactive state
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(0);

  // Heatmap interactive state
  const [selectedCell, setSelectedCell] = useState<{ day: string; hour: string; load: number } | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<'tbilisi' | 'batumi'>('tbilisi');

  const churnMock = useMemo(() => [
    { 
      id: 1, 
      name: locale === 'ka' ? 'ლაშა მ.' : locale === 'ru' ? 'Лаша М.' : 'Lasha M.', 
      risk: 89, 
      factor: locale === 'ka' ? 'ვიზიტების კლება (4 -> 1 / კვირაში)' : locale === 'ru' ? 'Снижение визитов (4 -> 1 / нед)' : 'Visits drop (4 -> 1 / week)',
      trigger: locale === 'ka' ? 'გაგზავნილია SMS (-15% ფასდაკლება)' : locale === 'ru' ? 'Отправлено SMS (-15% скидка)' : 'SMS Sent (-15% discount)',
      status: 'HIGH'
    },
    { 
      id: 2, 
      name: locale === 'ka' ? 'ანი ტ.' : locale === 'ru' ? 'Ани Т.' : 'Ani T.', 
      risk: 64, 
      factor: locale === 'ka' ? 'აბონემენტი იწურება 4 დღეში' : locale === 'ru' ? 'Срок истекает через 4 дня' : 'Expires in 4 days',
      trigger: locale === 'ka' ? 'ავტო-შეთავაზება: +7 დღე საჩუქრად' : locale === 'ru' ? 'Авто-оффер: +7 дней в подарок' : 'Auto-Offer: +7 days free',
      status: 'MEDIUM'
    },
    { 
      id: 3, 
      name: locale === 'ka' ? 'ზურა კ.' : locale === 'ru' ? 'Зура К.' : 'Zura K.', 
      risk: 18, 
      factor: locale === 'ka' ? 'აქტიური და სტაბილური' : locale === 'ru' ? 'Активный и стабильный' : 'Active and stable check-ins',
      trigger: locale === 'ka' ? 'კამპანია არ სჭირდება' : locale === 'ru' ? 'Кампания не требуется' : 'No campaign needed',
      status: 'LOW'
    }
  ], [locale]);

  switch (activeFeatureId) {
    // ── CORE INFRASTRUCTURE (4 Modules) ──
    case 'iot':
      return <IotSimulator />;
    case 'booking':
      return <BookingSchedulerSimulator />;
    case 'security':
      return <ControlPanelDefenseSimulator />;
    case 'migration':
      return <DataMigrationSimulator />;
    case 'ai':
      return <MultimodalAiStage />;

    // ── ANALYTICS & ROI SUITE (6 Modules) ──
    case 'roi':
      return <CombinedFinancialRoiSimulator />;
    case 'okr':
      return <AnalyticsOkrTab t={t} locale={locale} />;
    case 'kpi':
      return <AnalyticsKpiTab t={t} locale={locale} />;
    case 'churn':
      return (
        <AnalyticsChurnTab 
          t={t} 
          locale={locale} 
          churnMock={churnMock} 
          selectedUserIndex={selectedUserIndex} 
          setSelectedUserIndex={setSelectedUserIndex} 
        />
      );
    case 'heatmap':
      return (
        <AnalyticsHeatmapTab 
          t={t} 
          locale={locale} 
          selectedCell={selectedCell} 
          setSelectedCell={setSelectedCell} 
          selectedBranch={selectedBranch} 
          setSelectedBranch={setSelectedBranch} 
        />
      );
    case 'winback':
      return <AnalyticsWinbackTab t={t} locale={locale} />;

    default:
      return <IotSimulator />;
  }
};
