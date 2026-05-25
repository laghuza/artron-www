"use client";

import { useState } from "react";

interface RequestAccessFormProps {
  onCancel: () => void;
  onSubmitting: () => void;
}

export default function RequestAccessForm({ onCancel, onSubmitting }: RequestAccessFormProps) {
  const [entityType, setEntityType] = useState("Sovereign Federation");
  const [entityName, setEntityName] = useState("");
  const [registryCode, setRegistryCode] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName || !registryCode || !email) return;

    setStatus("submitting");
    onSubmitting(); // Trigger scanline animation!

    setTimeout(() => {
      setStatus("done");
    }, 2000);
  };

  return (
    <div className="space-y-3">
      {status === "idle" ? (
        <form onSubmit={handleSubmit} className="space-y-2 font-mono text-[11px] tracking-[0.16em]">
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">ENTITY TYPE:</label>
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal cursor-pointer text-[11px]"
            >
              <option value="Sovereign Federation">Sovereign Federation (ფედერაცია)</option>
              <option value="Sports Club / Academy">Sports Club / Academy (კლუბი / აკადემია)</option>
              <option value="Licensed Professional">Licensed Professional (ლიცენზირებული სპეციალისტი)</option>
            </select>
          </div>
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">ENTITY NAME:</label>
            <input
              type="text"
              required
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal text-[11px]"
              placeholder="e.g. OLYMPIC CENTER"
            />
          </div>
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">OFFICIAL REGISTRY CODE:</label>
            <input
              type="text"
              required
              value={registryCode}
              onChange={(e) => setRegistryCode(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal text-[11px]"
              placeholder="e.g. RC-948271"
            />
          </div>
          <div>
            <label className="block text-emerald-core mb-0.5 uppercase">SECURE COMMUNICATION ROUTE:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core py-1 px-2 rounded text-white outline-none tracking-normal text-[11px]"
              placeholder="e.g. contact@olympic.org"
            />
          </div>
          <div className="flex gap-2 pt-1 items-center">
            <button
              type="submit"
              className="flex-1 py-1.5 bg-emerald-core/10 border border-emerald-core/30 text-emerald-core hover:border-emerald-core hover:bg-emerald-core/20 font-bold uppercase rounded cursor-pointer transition-colors text-[11px]"
            >
              SUBMIT SECURE PROTOCOL
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-2 py-1 font-mono text-[11px] text-silver-structure hover:text-white transition-colors cursor-pointer"
            >
              ← Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-iron-surface border border-silver-structure/20 p-4 rounded font-mono text-[12px] tracking-[0.18em] space-y-3">
          {status === "submitting" ? (
            <div className="space-y-2">
              <div className="text-emerald-core animate-pulse">
                &gt; SYSTEM ANALYSIS IN PROGRESS...
              </div>
              <div className="text-copper animate-pulse">
                [ QUEUING CREDENTIALS FOR VALIDATION ]
              </div>
              <span className="inline-block w-1.5 h-3 bg-emerald-core ml-1 animate-blink"></span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-gold-raw font-bold uppercase">
                [ YOUR CREDENTIALS ARE BEING QUEUED FOR CORE VALIDATION ]
              </div>
              <div className="text-ruby font-bold uppercase">
                [ ACCESS STATUS: UNDER REVIEW ]
              </div>
              <p className="text-[15px] text-bone-light/85 font-sans leading-relaxed tracking-normal">
                ართრონის ადმინისტრაცია გადაამოწმებს წარდგენილ ორგანიზაციულ მონაცემებს და დაგიკავშირდებათ მითითებულ ელ-ფოსტაზე.
              </p>
              <div className="pt-2">
                <button
                  onClick={onCancel}
                  className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors cursor-pointer"
                >
                  ← Return to Core
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
