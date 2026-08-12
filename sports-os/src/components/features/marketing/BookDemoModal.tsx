"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Zap, ArrowRight, ShieldCheck } from "lucide-react";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    academy: "",
    athletes: "50-200",
    tier: "PRO",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70 animate-console-reveal">
      <div className="relative w-full max-w-lg rounded-2xl backdrop-blur-2xl bg-[#12141D]/90 border border-[#00FF87]/30 p-6 md:p-8 shadow-[0_0_40px_rgba(0,255,135,0.2)] text-[#F8FAFC]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-[#00FF87]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FF87]">B2B Operator Demo</span>
            </div>
            <h2 className="text-2xl font-extrabold font-mono text-white tracking-tight">
              Schedule Your Academy Onboarding
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-1">
              Experience the RLS multi-tenant Artron Sports OS live with an enterprise specialist.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Alex Tskhadadze"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87]"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Operator Email</label>
                <input
                  required
                  type="email"
                  placeholder="alex@dynamo-academy.ge"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Academy Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Dynamo Academy"
                    value={formData.academy}
                    onChange={(e) => setFormData({ ...formData, academy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Target Tier</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white focus:outline-none focus:border-[#00FF87]"
                  >
                    <option value="PRO">PRO Tier ($499/mo)</option>
                    <option value="ENTERPRISE">ENTERPRISE (Custom)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00E5FF] text-[#090A0F] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,135,0.3)] hover:opacity-95 transition-opacity"
                >
                  Confirm Demo Request <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] font-mono text-[#94A3B8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF87]" />
              <span>Instant VIP Onboarding Confirmation • 14-Day SLA Guarantee</span>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#00FF87] mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold font-mono text-white">Demo Confirmed!</h3>
            <p className="text-xs text-[#94A3B8] font-mono max-w-xs mx-auto">
              Our B2B Enterprise Specialist will contact <span className="text-[#00E5FF]">{formData.email}</span> within 2 hours to initialize your sandbox workspace.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-white/10 border border-white/20 text-xs font-mono text-white hover:bg-white/20 transition-colors"
            >
              Back to Artron Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
