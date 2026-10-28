'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Send, User, Sparkles, RotateCcw } from 'lucide-react';
import ArtronLogo from '@/components/ui/ArtronLogo';
import { getArtronAiReply, BotAction, SupportedLocale } from './ai-bot/artronAiKnowledgeBase';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actions?: BotAction[];
}

export const AIBotWidget: React.FC = () => {
  const { t, locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen to open/toggle events from FloatingContactWidget, Elevator Dock or any trigger
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string; section?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        const promptText = customEvent.detail.prompt;
        // Start fresh with the current section's prompt, preventing previous sections from piling up
        setMessages([
          {
            id: `bot-context-${Date.now()}`,
            sender: 'bot',
            text: promptText,
          },
        ]);
      } else {
        // If opened generally without prompt and no user conversation exists, reset to clean welcome
        setMessages((prev) => {
          const hasUserMessages = prev.some((m) => m.sender === 'user');
          if (!hasUserMessages) {
            return [
              {
                id: 'welcome',
                sender: 'bot',
                text: t('ai_widget_welcome'),
              },
            ];
          }
          return prev;
        });
      }
    };
    const handleToggle = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next) {
          setMessages((cur) => {
            const hasUserMessages = cur.some((m) => m.sender === 'user');
            if (!hasUserMessages) {
              return [
                {
                  id: 'welcome',
                  sender: 'bot',
                  text: t('ai_widget_welcome'),
                },
              ];
            }
            return cur;
          });
        }
        return next;
      });
    };
    window.addEventListener('artron-open-chatbot', handleOpen);
    window.addEventListener('artron-toggle-chatbot', handleToggle);
    return () => {
      window.removeEventListener('artron-open-chatbot', handleOpen);
      window.removeEventListener('artron-toggle-chatbot', handleToggle);
    };
  }, [t]);

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: t('ai_widget_welcome'),
      },
    ]);
  };

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

  const handleActionClick = (act: BotAction) => {
    if (act.actionType === 'omnichannel') {
      window.dispatchEvent(new CustomEvent('artron-open-omnichannel'));
    } else if (act.actionType === 'whatsapp' && act.href) {
      window.open(act.href, '_blank', 'noopener,noreferrer');
    } else if (act.actionType === 'phone' && act.href) {
      window.location.href = act.href;
    } else if (act.actionType === 'email' && act.href) {
      window.location.href = act.href;
    }
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };

    // Capture the last bot prompt before adding user message for context-aware replies
    const lastBotPrompt = [...messages].reverse().find((m) => m.sender === 'bot')?.text;

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Contextual ARTRON AI reasoning & domain reply logic
    setTimeout(() => {
      const activeLocale: SupportedLocale =
        locale === 'en' || locale === 'ru' ? locale : 'ka';
      const reply = getArtronAiReply(text, activeLocale, lastBotPrompt);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply.text,
          actions: reply.actions,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      {/* Chat Dialog Window */}
      <div className="w-[320px] sm:w-[380px] h-[480px] md:h-[520px] bg-[#05070a]/95 border border-white/15 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,163,255,0.15)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
        {/* Header - Sleek Dark Futurist Artron Core Style */}
        <div className="relative p-4 bg-[#0B0F17]/95 border-b border-white/10 flex items-center justify-between shadow-lg overflow-hidden shrink-0">
          {/* Subtle ambient brand glow behind header */}
          <div className="pointer-events-none absolute -top-12 -left-12 w-44 h-32 bg-[#00A3FF]/15 rounded-full blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 right-0 w-36 h-24 bg-[#00FF87]/10 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#050811] border border-emerald-500/35 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,135,0.25)] shrink-0 group">
              <ArtronLogo className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" vivid />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-black leading-tight text-white tracking-wide">{t('ai_widget_title')}</h4>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-[#00FF87] border border-emerald-500/30">
                  CORE
                </span>
              </div>
              <p className="text-[10px] text-[#94A3B8] font-mono flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse shadow-[0_0_8px_#00FF87]" />
                <span>{t('ai_widget_subtitle')}</span>
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-1">
            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-all cursor-pointer flex items-center justify-center"
              style={{ minHeight: '36px', minWidth: '36px' }}
              title={locale === 'en' ? 'Reset chat' : locale === 'ru' ? 'Очистить чат' : 'ჩატის გასუფთავება'}
              aria-label="Reset chat"
            >
              <RotateCcw className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white transition-all cursor-pointer flex items-center justify-center"
              style={{ minHeight: '36px', minWidth: '36px' }}
              aria-label="Close Chat"
            >
              <X className="w-5 h-5 mx-auto" />
            </button>
          </div>
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
                  isBot 
                    ? 'bg-[#0B1528] border border-emerald-500/30 shadow-[0_0_10px_rgba(0,255,135,0.2)]' 
                    : 'bg-white/10 text-white border border-white/15'
                }`}>
                  {isBot ? <ArtronLogo className="w-4 h-4" vivid /> : <User className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-xl text-xs md:text-sm leading-relaxed ${
                  isBot 
                    ? 'bg-white/5 border border-white/5 text-[#E2E8F0] rounded-tl-none' 
                    : 'bg-gradient-to-r from-[#0052D4] via-[#0066FF] to-[#00A3FF] text-white font-medium rounded-tr-none shadow-[0_0_14px_rgba(0,163,255,0.3)]'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Smart Lead Bridge Actions (Variant 1) */}
                  {isBot && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col gap-1.5">
                      {msg.actions.map((act) => (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="w-full text-left py-1.5 px-2.5 rounded-lg bg-[#00A3FF]/10 hover:bg-[#00A3FF]/20 border border-[#00A3FF]/30 hover:border-[#00A3FF]/60 text-xs font-medium text-[#00E5FF] transition-all cursor-pointer flex items-center justify-between group/act"
                          style={{ minHeight: '36px' }}
                        >
                          <span className="truncate">{act.label}</span>
                          <span className="text-[#00E5FF]/60 group-hover/act:text-[#00E5FF] group-hover/act:translate-x-0.5 transition-all text-xs font-mono ml-1">→</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 max-w-[85%] self-start">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[#0B1528] border border-emerald-500/30 shadow-[0_0_10px_rgba(0,255,135,0.2)] text-xs">
                <ArtronLogo className="w-4 h-4 animate-pulse" vivid />
              </div>
              <div className="p-3 bg-white/5 border border-white/5 text-[#94A3B8] rounded-xl rounded-tl-none text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF] animate-spin" />
                <span>{t('ai_widget_typing')}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="p-3 border-t border-white/10 bg-[#0B0F17]/98 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('ai_widget_placeholder')}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]"
            style={{ minHeight: '40px' }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
              inputValue.trim()
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00A3FF] hover:from-[#0052cc] hover:to-[#008fe0] text-white shadow-[0_0_15px_rgba(0,163,255,0.35)]'
                : 'bg-white/5 text-[#94A3B8] cursor-not-allowed border border-white/5'
            }`}
            style={{ minWidth: '40px', minHeight: '40px' }}
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
