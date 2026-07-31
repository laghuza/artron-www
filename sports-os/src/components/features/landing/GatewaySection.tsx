"use client";

import { useState } from "react";
import SystemRegistryFooter from "@/components/layout/SystemRegistryFooter";

export default function GatewaySection() {
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("L1_FEDERATION");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!org || !email) return;
    
    setStatus("submitting");
    setTimeout(() => {
      setStatus("done");
    }, 3000);
  };

  return (
    <section
      id="gateway"
      className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col justify-between items-center bg-iron schematic-grid"
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md px-6 z-20">
        <div className="text-center mb-8">
          <div className="font-mono text-xs text-emerald-core uppercase tracking-[0.25em] mb-2">
            [ SECURE_SYSTEM_GATEWAY ]
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase font-sans">
            REQUEST ACCESS
          </h2>
          <p className="text-xs text-silver-structure/60 mt-1">
            შეავსეთ განაცხადი სისტემაში წვდომის მისაღებად.
          </p>
        </div>

        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">ORGANIZATION_OR_NAME:</label>
              <input
                type="text"
                required
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
                placeholder="e.g. NATIONAL ATHLETICS FEDERATION"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">SECURE_EMAIL:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
                placeholder="e.g. admin@sports-org.gov"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">IDENTIFICATION_CODE_OR_LICENSE:</label>
              <input
                type="text"
                required
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
                placeholder="e.g. ID_405928129 / LIC_948271"
              />
            </div>
            <div>
              <label className="block text-emerald-core mb-1.5 uppercase">ORGANIZATION_TYPE:</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-iron-surface border border-silver-structure/20 focus:border-emerald-core p-2.5 rounded text-white outline-none"
              >
                <option value="FEDERATION">FEDERATION (ფედერაცია)</option>
                <option value="CLUB">CLUB / SPORTS CENTRE (კლუბი / სპორტული ცენტრი)</option>
                <option value="PROFESSIONAL">LICENSED PROFESSIONAL (დამოუკიდებელი ლიცენზირებული პროფესიონალი)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-emerald-core/10 border border-emerald-core/30 text-emerald-core hover:border-emerald-core hover:bg-emerald-core/20 font-bold uppercase rounded cursor-pointer transition-colors"
            >
              REQUEST SYSTEM ACCESS
            </button>
          </form>
        )}

        {status !== "idle" && (
          <div className="bg-iron-surface border border-silver-structure/20 p-6 rounded font-mono text-xs space-y-4">
            <div className="text-emerald-core">
              &gt; SYSTEM ACCESS REQUEST RECEIVED...
            </div>
            <div>
              ORG: {org.toUpperCase()}
              <br />
              SYS_TYPE: {level}
            </div>
            
            {status === "submitting" ? (
              <div className="space-y-1.5">
                <div className="text-emerald-core animate-pulse">
                  SYSTEM ANALYSIS IN PROGRESS...
                </div>
                <div className="text-copper animate-pulse">
                  [ ENCRYPTING DATA NODES... ]
                </div>
                <span className="inline-block w-1.5 h-3 bg-emerald-core ml-1 animate-blink"></span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-gold-raw font-bold">
                  [ CREDENTIALS SUBMITTED FOR CORE VALIDATION ]
                </div>
                <div className="text-ruby">
                  [ STATUS: UNDER REVIEW ]
                </div>
                <div className="text-[10px] text-silver-structure/50 leading-relaxed font-sans">
                  თქვენი ორგანიზაციის მონაცემები წარმატებით გაიგზავნა სისტემური ვალიდაციისთვის. უსაფრთხოების სამსახური გადაამოწმებს წარდგენილ ლიცენზიებს და დაგიკავშირდებათ მითითებულ ელ-ფოსტაზე.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <SystemRegistryFooter />
    </section>
  );
}
