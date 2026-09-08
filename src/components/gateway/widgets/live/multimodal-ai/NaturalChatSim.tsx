"use client";

import React, { useState } from 'react';
import { CHAT_SCENARIOS } from '@/data/multimodalAiData';
import { ChatScenario, ExtractedEntityData } from '@/types/multimodalAi';
import { SmartConfirmationCard } from './SmartConfirmationCard';
import { User, Bot, Send, Terminal, Cpu } from 'lucide-react';

interface NaturalChatSimProps {
  onActivityLog?: (msg: string) => void;
}

interface MessageItem {
  id: string;
  sender: 'OPERATOR' | 'AI';
  text: string;
  functionCalled?: string;
}

export const NaturalChatSim: React.FC<NaturalChatSimProps> = ({ onActivityLog }) => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'welcome',
      sender: 'AI',
      text: 'გამარჯობა! მე ვარ Artron AI Copilot. შეგიძლიათ ბუნებრივი ენით მომცეთ ნებისმიერი ბრძანება — დავარეგისტრირებ თანამშრომელს, განვაახლებ მონაცემებს ან გავუთიშავ წვდომას ტურნიკეტზე.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedEntityData | null>(null);
  const [isCommitted, setIsCommitted] = useState(false);

  const handleSendPrompt = (scenario: ChatScenario) => {
    setIsCommitted(false);
    setExtractedData(null);

    // Add operator message
    const opMsg: MessageItem = {
      id: `op-${Date.now()}`,
      sender: 'OPERATOR',
      text: scenario.promptKa
    };

    setMessages((prev) => [...prev, opMsg]);
    setIsTyping(true);

    if (onActivityLog) {
      onActivityLog(`[NLP Chat Input] ოპერატორის ბრძანება: "${scenario.promptKa}"`);
    }

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: MessageItem = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: scenario.aiReplyKa,
        functionCalled: scenario.functionName
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (scenario.extractedData) {
        setExtractedData(scenario.extractedData);
      }

      if (onActivityLog) {
        onActivityLog(`[Gemini Function Calling] ამოქმედდა ${scenario.functionName}. მზადდება დადასტურების ბარათი.`);
      }
    }, 700);
  };

  const handleApprove = (data: ExtractedEntityData) => {
    setIsCommitted(true);
    if (onActivityLog) {
      onActivityLog(`[PostgreSQL DB] ბრძანება წარმატებით შესრულდა: ${data.functionCalled || 'Success'}`);
    }
  };

  const handleReject = () => {
    setExtractedData(null);
    setIsCommitted(false);
    if (onActivityLog) {
      onActivityLog(`[Security Guard] ოპერატორმა გააუქმა ჩატის ბრძანება.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Intent Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-gray-400">სცადეთ მზა ბრძანებები:</span>
        {CHAT_SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => handleSendPrompt(sc)}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#00A3FF]/20 border border-white/10 hover:border-[#00A3FF] text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Terminal className="w-3 h-3 text-[#00A3FF]" />
            <span>{sc.labelKa}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#090D15] border border-white/10 flex flex-col justify-between min-h-[300px] space-y-4 shadow-inner">
        {/* Messages List */}
        <div className="space-y-3 overflow-y-auto max-h-72 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'OPERATOR' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'OPERATOR'
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white rounded-br-none shadow-[0_4px_15px_rgba(0,163,255,0.3)]'
                    : 'bg-[#121722] text-gray-200 border border-white/10 rounded-bl-none'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono opacity-75">
                  {m.sender === 'OPERATOR' ? (
                    <>
                      <User className="w-3 h-3 text-white" />
                      <span>ოპერატორი</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3 h-3 text-[#00E5FF]" />
                      <span className="text-[#00E5FF]">Artron AI</span>
                    </>
                  )}
                </div>
                <p>{m.text}</p>

                {m.functionCalled && (
                  <div className="mt-2 pt-2 border-t border-white/10 font-mono text-[10px] text-purple-300 flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-purple-400" />
                    <span>Function:</span>
                    <span className="bg-purple-900/40 px-1.5 py-0.5 rounded border border-purple-500/30">
                      {m.functionCalled}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-[#00A3FF] p-2">
              <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-bounce delay-200" />
              <span>Artron Copilot ფიქრობს...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            placeholder="აკრიფეთ ბრძანება ბუნებრივ ქართულ ენაზე..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputVal.trim()) {
                handleSendPrompt({
                  id: `custom-${Date.now()}`,
                  promptKa: inputVal,
                  labelKa: 'Custom',
                  category: 'REGISTRATION',
                  functionName: 'geminiFlash.executeDynamicIntent()',
                  aiReplyKa: `ბრძანება მიღებულია: "${inputVal}". მონაცემები დამუშავდა:`,
                  extractedData: {
                    fullNameKa: 'დავით ჯაფარიძე',
                    fullNameEn: 'DAVIT JAPARIDZE',
                    personalId: '01024099887',
                    phone: '+995 599 00 11 22',
                    roleOrPlanKa: '1-თვიანი აბონემენტი',
                    branchKa: 'საბურთალოს ფილიალი',
                    confidenceScore: 99.5,
                    extractedVia: 'NATURAL_CHAT',
                    functionCalled: 'membershipService.quickRegister()'
                  }
                });
                setInputVal('');
              }
            }}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3FF]"
          />
          <button
            onClick={() => {
              if (inputVal.trim()) {
                handleSendPrompt({
                  id: `custom-${Date.now()}`,
                  promptKa: inputVal,
                  labelKa: 'Custom',
                  category: 'REGISTRATION',
                  functionName: 'geminiFlash.executeDynamicIntent()',
                  aiReplyKa: `ბრძანება მიღებულია: "${inputVal}". მონაცემები დამუშავდა:`,
                  extractedData: {
                    fullNameKa: 'დავით ჯაფარიძე',
                    fullNameEn: 'DAVIT JAPARIDZE',
                    personalId: '01024099887',
                    phone: '+995 599 00 11 22',
                    roleOrPlanKa: '1-თვიანი აბონემენტი',
                    branchKa: 'საბურთალოს ფილიალი',
                    confidenceScore: 99.5,
                    extractedVia: 'NATURAL_CHAT',
                    functionCalled: 'membershipService.quickRegister()'
                  }
                });
                setInputVal('');
              }
            }}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00A3FF] hover:opacity-95 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>გაგზავნა</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Extracted Smart Confirmation Card */}
      {extractedData && (
        <SmartConfirmationCard
          data={extractedData}
          onApprove={handleApprove}
          onReject={handleReject}
          isCommitted={isCommitted}
        />
      )}
    </div>
  );
};
