'use client';

import React from 'react';
import { SyncPhase } from './types';

interface SyncStepsExplainerProps {
  phase: SyncPhase;
  locale: string;
}

interface StepData {
  num: string;
  code: string;
  station: string;
  title: string;
  desc: string;
  hint: string;
}

export const SyncStepsExplainer: React.FC<SyncStepsExplainerProps> = ({ phase, locale }) => {
  const activeStep =
    phase === 'idle' ? 0 : phase === 'processing' ? 1 : phase === 'transit' ? 2 : 3;

  const STEPS: StepData[] = [
    {
      num: '01',
      code: 'STANDBY',
      station: locale === 'ka' ? 'ეკრანი 01 · ტელეფონი' : locale === 'ru' ? 'Экран 01 · Телефон' : 'Screen 01 · Phone',
      title: locale === 'ka' ? 'საშვი მზადაა' : locale === 'ru' ? 'Пропуск готов' : 'Pass Ready',
      desc:
        locale === 'ka'
          ? 'კლიენტს ტელეფონში აქვს პირადი QR საშვი. კოდი ყოველ რამდენიმე წამში იცვლება, ამიტომ სქრინშოტით ან სხვისთვის გაგზავნით ვერ ისარგებლებენ.'
          : locale === 'ru'
          ? 'У клиента в телефоне персональный QR-пропуск. Код обновляется каждые несколько секунд, исключая возможность скриншотов.'
          : 'Athletes have a dynamic personal QR pass on their phone. Code refreshes every few seconds, eliminating screenshots.',
      hint: locale === 'ka' ? 'ეკრანზე: მთვლელი TTL და განახლებადი QR' : locale === 'ru' ? 'На экране: TTL счетчик и динамический QR' : 'On screen: TTL countdown & live dynamic QR',
    },
    {
      num: '02',
      code: 'PAY·SCAN',
      station: locale === 'ka' ? 'ეკრანი 01 · ტელეფონი' : locale === 'ru' ? 'Экран 01 · Телефон' : 'Screen 01 · Phone',
      title: locale === 'ka' ? 'გადახდა და შემოწმება' : locale === 'ru' ? 'Оплата и верификация' : 'Payment & Verification',
      desc:
        locale === 'ka'
          ? 'კლიენტი ერთი ღილაკით იხდის 50 ₾-ს. სისტემა ამოწმებს, რომ საშვი ნამდვილია და ვადაგასული არ არის.'
          : locale === 'ru'
          ? 'Клиент в один клик оплачивает 50 ₾. Система криптографически проверяет подлинность и срок действия токена.'
          : 'Client pays 50 ₾ with 1-click. The zero-trust engine validates dynamic cryptographic tokens in sub-milliseconds.',
      hint: locale === 'ka' ? 'ეკრანზე: ქარვისფერი სკანირების ხაზი' : locale === 'ru' ? 'На экране: Янтарная линия сканирования' : 'On screen: Amber scanning laser line',
    },
    {
      num: '03',
      code: 'TRANSIT',
      station: locale === 'ka' ? 'ეკრანი 02 · ხიდი' : locale === 'ru' ? 'Экран 02 · Мост' : 'Screen 02 · Bridge',
      title: locale === 'ka' ? 'ინფორმაცია იგზავნება' : locale === 'ru' ? 'Передача данных' : 'High-Speed Transit',
      desc:
        locale === 'ka'
          ? 'გადახდის და შესვლის მონაცემი დაცული (დაშიფრული) სახით მიდის ტელეფონიდან დარბაზის სისტემაში (TLS 1.3 / EnneaCore).'
          : locale === 'ru'
          ? 'Данные оплаты и входа зашифрованным пакетом передаются в управляющую систему клуба (TLS 1.3 / EnneaCore).'
          : 'Payment and access telemetry dispatch instantly via TLS 1.3 zero-trust pipeline straight to the facility hub.',
      hint: locale === 'ka' ? 'ეკრანზე: ფოტონური იმპულსი მოძრაობს ხიდზე' : locale === 'ru' ? 'На экране: Фотонный импульс на мосту' : 'On screen: High-speed photon travelling the bridge',
    },
    {
      num: '04',
      code: 'SYNC',
      station: locale === 'ka' ? 'ეკრანი 03 · პანელი' : locale === 'ru' ? 'Экран 03 · Панель' : 'Screen 03 · Console',
      title: locale === 'ka' ? 'კარი იღება — ჩაწერილია' : locale === 'ru' ? 'Турникет открыт — все учтено' : 'Turnstile Open & Ledger Synced',
      desc:
        locale === 'ka'
          ? 'კლიენტი შედის. მფლობელის პანელში ავტომატურად ემატება თანხა, ვიზიტი და №01-15/ნ ტაბელი — ხელით არაფერი კეთდება.'
          : locale === 'ru'
          ? 'Клиент проходит. В консоли владельца автоматически фиксируются доходы, занятость и табель №01-15/н.'
          : 'Athlete enters. Owner dashboard instantly credits the ledger (+50 ₾), logs occupancy, and updates labor timesheets.',
      hint: locale === 'ka' ? 'ეკრანზე: მწვანე სიგნალი და ახალი ჩანაწერი' : locale === 'ru' ? 'На экране: Зеленый сигнал и запись в журнале' : 'On screen: Emerald confirmation & activity row',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8 sm:mt-12">
      {STEPS.map((step, idx) => {
        const isCurrent = idx === activeStep;
        const isPast = idx < activeStep;
        const stepColor = idx === 0 ? '#94A3B8' : idx === 3 ? '#10B981' : '#F59E0B';

        return (
          <div
            key={step.num}
            className="rounded-2xl p-4 sm:p-5 flex flex-col gap-2.5 transition-all duration-400 relative overflow-hidden border"
            style={{
              background: isCurrent ? 'rgba(11,16,23,0.95)' : 'rgba(8,11,16,0.65)',
              borderColor: isCurrent ? stepColor : isPast ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)',
              boxShadow: isCurrent ? `0 0 30px -10px ${stepColor}` : 'none',
            }}
          >
            <div className="flex items-center justify-between font-mono text-[10px]">
              <span
                className="px-2 py-0.5 rounded-full font-bold"
                style={{
                  background: isCurrent ? `${stepColor}20` : 'rgba(255,255,255,0.05)',
                  color: isCurrent ? stepColor : '#64748B',
                }}
              >
                {step.num} // {step.code}
              </span>
              <span className="text-slate-500">{step.station}</span>
            </div>

            <div className="font-sans font-bold text-sm sm:text-base text-sky-100">{step.title}</div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed flex-1">{step.desc}</p>

            <div className="pt-2 border-t border-white/5 font-mono text-[9.5px] text-slate-500">
              {step.hint}
            </div>
          </div>
        );
      })}
    </div>
  );
};
