"use client";

import { useState } from "react";

interface ProgressiveIntakeFormProps {
  onCancel: () => void;
  onSubmitComplete: () => void;
}

export default function ProgressiveIntakeForm({
  onCancel,
  onSubmitComplete
}: ProgressiveIntakeFormProps) {
  const [step, setStep] = useState<number>(1);
  const [entityType, setEntityType] = useState("Sovereign Federation");
  const [athletes, setAthletes] = useState("");
  const [trainers, setTrainers] = useState("");
  const [region, setRegion] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const [sla, setSla] = useState(false);
  const [gamification, setGamification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep((prev) => prev + 1);
    else onSubmitComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
    else onCancel();
  };

  return (
    <div className="space-y-3.5 animate-fadeIn text-[11px] font-mono tracking-[0.16em]">
      <div className="flex justify-between items-center border-b border-silver-structure/10 pb-1.5">
        <span className="text-emerald-core uppercase tracking-[0.12em]">STEP {step} OF 3</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= step ? "bg-emerald-core" : "bg-silver-structure/20"}`} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {step === 1 && (
          <div>
            <label className="block text-emerald-core mb-1">ENTITY TYPE:</label>
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none cursor-pointer text-[11px]"
            >
              <option value="Sovereign Federation">Sovereign Federation (ფედერაცია)</option>
              <option value="Sports Club / Academy">Sports Club / Academy (კლუბი / აკადემია)</option>
              <option value="Licensed Coach / Professional">Licensed Coach / Professional (ტრენერი/მედიკოსი)</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <div>
              <label className="block text-emerald-core mb-0.5">ACTIVE ATHLETES / ათლეტები:</label>
              <input
                type="number" required value={athletes} onChange={(e) => setAthletes(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none text-[11px]"
                placeholder="e.g. 250"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-0.5">TRAINERS COUNT / ტრენერები:</label>
              <input
                type="number" required value={trainers} onChange={(e) => setTrainers(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none text-[11px]"
                placeholder="e.g. 15"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-0.5">REGION / რეგიონი:</label>
              <input
                type="text" required value={region} onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/25 focus:border-emerald-core py-1 px-2 rounded text-white outline-none text-[11px]"
                placeholder="e.g. Tbilisi, Georgia"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2.5">
            <div className="text-silver-structure/70 font-sans tracking-normal text-[11px] mb-1">
              Select priority integration modules:
            </div>
            <div className="space-y-2 font-sans tracking-normal">
              {[
                { id: "sched", label: "Scheduling (განრიგები)", val: scheduling, set: setScheduling },
                { id: "sla", label: "SLA & Security (იურიდიული)", val: sla, set: setSla },
                { id: "game", label: "Gamification & Coins (გეიმიფიკაცია)", val: gamification, set: setGamification }
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer text-white">
                  <input type="checkbox" checked={item.val} onChange={(e) => item.set(e.target.checked)} className="accent-emerald-core w-4 h-4 animate-fadeIn" />
                  <span className="text-[11.5px] uppercase tracking-wider font-mono">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2.5 items-center">
          <button
            type="submit"
            className="flex-1 py-1.5 bg-emerald-core/10 border border-emerald-core/30 text-emerald-core hover:border-emerald-core hover:bg-emerald-core/20 font-bold uppercase rounded cursor-pointer transition-colors text-[10.5px]"
          >
            {step < 3 ? "CONTINUE PROTOCOL" : "SUBMIT INTEGRATION PROTOCOL"}
          </button>
          <button
            type="button" onClick={handleBack}
            className="px-2 py-1 text-silver-structure hover:text-white transition-colors cursor-pointer text-[10.5px] font-mono"
          >
            {step > 1 ? "← BACK" : "← CANCEL"}
          </button>
        </div>
      </form>
    </div>
  );
}
