'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
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
      <div className="w-[320px] sm:w-[380px] h-[480px] md:h-[520px] bg-[#05070a]/95 border border-[#00E5FF]/20 backdrop-blur-xl rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,229,255,0.2)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#00E5FF] via-[#00A3FF] to-[#0066FF] text-slate-950 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-950/15 flex items-center justify-center border border-slate-950/20 shadow-inner">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h4 className="text-sm font-black leading-tight text-slate-950">{t('ai_widget_title')}</h4>
              <p className="text-[10px] text-slate-950/85 font-mono flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse"></span>
                {t('ai_widget_subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              className="p-1 rounded-lg hover:bg-slate-950/15 text-slate-950/80 hover:text-slate-950 transition-all cursor-pointer flex items-center justify-center"
              style={{ minHeight: '36px', minWidth: '36px' }}
              title={locale === 'en' ? 'Reset chat' : locale === 'ru' ? 'Очистить чат' : 'ჩატის გასუფთავება'}
              aria-label="Reset chat"
            >
              <RotateCcw className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-950/15 text-slate-950/80 hover:text-slate-950 transition-all cursor-pointer flex items-center justify-center"
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
                  isBot ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-mono' : 'bg-white/10 text-white'
                }`}>
                  {isBot ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                </div>
                <div className={`p-3 rounded-xl text-xs md:text-sm leading-relaxed ${
                  isBot 
                    ? 'bg-white/5 border border-white/5 text-[#E2E8F0] rounded-tl-none' 
                    : 'bg-gradient-to-r from-[#00A3FF] to-[#00E5FF] text-slate-950 font-bold rounded-tr-none shadow-[0_0_12px_rgba(0,229,255,0.3)]'
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
                          className="w-full text-left py-1.5 px-2.5 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 hover:border-[#00E5FF]/60 text-xs font-medium text-[#00E5FF] transition-all cursor-pointer flex items-center justify-between group/act"
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
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-mono">
                <Bot className="w-4.5 h-4.5" />
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
          className="p-3 border-t border-white/10 bg-[#121722]/98 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('ai_widget_placeholder')}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]"
            style={{ minHeight: '40px' }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
              inputValue.trim()
                ? 'bg-[#00E5FF] text-slate-950 hover:brightness-110 shadow-[0_0_12px_rgba(0,229,255,0.4)]'
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
