'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const AIBotWidget: React.FC = () => {
  const { t, locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: t('ai_widget_welcome'),
        },
      ]);
    }
  }, [isOpen, messages.length, t]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Dispatch chatbot open/close state to avoid widget overlap
  useEffect(() => {
    const event = new CustomEvent('artron-chatbot-state', { detail: { isOpen } });
    window.dispatchEvent(event);
  }, [isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Contextual bot reply logic
    setTimeout(() => {
      let botText = '';
      const query = text.toLowerCase();

      if (query.includes('ტურნიკეტი') || query.includes('turnstile') || query.includes('турникет') || query.includes('მონტაჟ')) {
        botText = t('faq_a1');
      } else if (query.includes('უსაფრთხო') || query.includes('security') || query.includes('безопасн') || query.includes('ტენანტ') || query.includes('tenancy')) {
        botText = t('faq_a2');
      } else if (query.includes('ტაბელ') || query.includes('ჯანდაცვ') || query.includes('01-15') || query.includes('შრომის') || query.includes('приказ') || query.includes('order')) {
        botText = t('faq_a3');
      } else if (query.includes('დაბრუნება') || query.includes('refund') || query.includes('возврат') || query.includes('14 დღ')) {
        botText = t('faq_a5');
      } else if (query.includes('qr') || query.includes('საშვი') || query.includes('пропуск')) {
        botText = t('faq_a6');
      } else if (query.includes('offline') || query.includes('ინტერნეტ') || query.includes('ავტონომ')) {
        botText = t('faq_a7');
      } else {
        // Fallback default messages
        if (locale === 'ka') {
          botText = 'გმადლობთ შეკითხვისთვის. ჩვენი გუნდი მზად არის დაგეხმაროთ. დამატებითი საინჟინრო ან კომერციული დეტალებისთვის შეგიძლიათ მოგვწეროთ info@artron.ge-ზე ან დაჯავშნოთ უფასო B2B დემო პრეზენტაცია.';
        } else if (locale === 'ru') {
          botText = 'Спасибо за ваш вопрос. Наша команда готова помочь вам. Для получения дополнительных технических или коммерческих подробностей напишите нам на info@artron.ge или закажите B2B демо-презентацию.';
        } else {
          botText = 'Thank you for your question. Our team is ready to assist you. For more technical or commercial details, please write to us at info@artron.ge or book a free B2B demo presentation.';
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botText,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (key: string, text: string) => {
    handleSend(text);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end">
      {/* Chat Dialog Window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[380px] h-[480px] md:h-[520px] bg-[#05070a]/95 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-950/10 flex items-center justify-center border border-slate-950/15">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h4 className="text-sm font-black leading-tight text-slate-950">{t('ai_widget_title')}</h4>
                <p className="text-[10px] text-slate-950/80 font-mono flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#05070a] animate-pulse"></span>
                  {t('ai_widget_subtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-950/10 text-slate-950/80 hover:text-slate-950 transition-all cursor-pointer"
              style={{ minHeight: '44px', minWidth: '44px' }}
              aria-label="Close Chat"
            >
              <X className="w-5 h-5 mx-auto" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[85%] ${
                    isBot ? 'self-start' : 'self-end ml-auto flex-row-reverse'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                    isBot ? 'bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 font-mono' : 'bg-white/10 text-white'
                  }`}>
                    {isBot ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                  </div>
                  <div className={`p-3 rounded-xl text-xs md:text-sm leading-relaxed ${
                    isBot 
                      ? 'bg-white/5 border border-white/5 text-[#E2E8F0] rounded-tl-none' 
                      : 'bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 font-bold rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
 
            {isTyping && (
              <div className="flex gap-2.5 max-w-[85%] self-start">
                <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 text-xs font-mono">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div className="p-3 bg-white/5 border border-white/5 text-[#94A3B8] rounded-xl rounded-tl-none text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87] animate-spin" />
                  <span>{t('ai_widget_typing')}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 border-t border-white/5 bg-white/2 flex flex-col gap-1.5 shrink-0">
              <button
                onClick={() => handleQuickQuestion('setup', t('ai_widget_quick_1'))}
                className="w-full text-left py-1.5 px-3 rounded-lg bg-white/5 border border-white/5 text-xs text-[#E2E8F0] hover:border-[#00ff87]/50 hover:bg-[#00ff87]/5 transition-all text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer flex items-center gap-2"
                style={{ minHeight: '36px' }}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#00e5ff] shrink-0" />
                <span className="truncate">{t('ai_widget_quick_1')}</span>
              </button>
              <button
                onClick={() => handleQuickQuestion('labor', t('ai_widget_quick_2'))}
                className="w-full text-left py-1.5 px-3 rounded-lg bg-white/5 border border-white/5 text-xs text-[#E2E8F0] hover:border-[#00ff87]/50 hover:bg-[#00ff87]/5 transition-all text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer flex items-center gap-2"
                style={{ minHeight: '36px' }}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#00e5ff] shrink-0" />
                <span className="truncate">{t('ai_widget_quick_2')}</span>
              </button>
              <button
                onClick={() => handleQuickQuestion('refund', t('ai_widget_quick_3'))}
                className="w-full text-left py-1.5 px-3 rounded-lg bg-white/5 border border-white/5 text-xs text-[#E2E8F0] hover:border-[#00ff87]/50 hover:bg-[#00ff87]/5 transition-all text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer flex items-center gap-2"
                style={{ minHeight: '36px' }}
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#00e5ff] shrink-0" />
                <span className="truncate">{t('ai_widget_quick_3')}</span>
              </button>
            </div>
          )}

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 border-t border-white/10 bg-[#121722]/98 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('ai_widget_placeholder')}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00ff87] focus:ring-1 focus:ring-[#00ff87]"
              style={{ minHeight: '40px' }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                inputValue.trim()
                  ? 'bg-[#00ff87] text-slate-950 hover:brightness-110'
                  : 'bg-white/5 text-[#94A3B8] cursor-not-allowed border border-white/5'
              }`}
              style={{ minWidth: '40px', minHeight: '40px' }}
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating launcher icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00ff87] to-[#00e5ff] text-slate-950 flex items-center justify-center shadow-xl shadow-[#00ff87]/25 hover:brightness-110 active:scale-95 transition-all relative border border-white/15 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00ff87] focus:ring-offset-2 focus:ring-offset-[#05070a]"
        style={{ minWidth: '56px', minHeight: '56px' }}
        aria-label={t('ai_widget_launcher')}
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-out fade-out zoom-out-50 duration-200" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 animate-in fade-in zoom-in-50 duration-200" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B0F17] animate-ping"></span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B0F17]"></span>
          </>
        )}
      </button>
    </div>
  );
};
