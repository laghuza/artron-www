"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LOGS = [
  "[ INIT ] LOADING SPORTS OS KERNEL V1.0.42...",
  "[ OK ] MEMORY PAGE POOL DECLARED [ 512MB ]",
  "[ OK ] CONNECTING TO DECENTRALIZED WORKER NODES...",
  "[ OK ] ENNEA CORE CONNECTION ESTABLISHED [ 4.8ms ]",
  "[ OK ] ACQUIRING SYSTEM ACCREDITATION LEVELS...",
  "[ OK ] DECRYPTING GRAPHICS BUFFER...",
  "[ OK ] BOOT SEQUENCE COMPLETED SUCCESSFULLY.",
];

export default function CoreSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [isBooted, setIsBooted] = useState(false);
  const [showLaser, setShowLaser] = useState(false);

  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setBootLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setShowLaser(true);
        setTimeout(() => {
          setIsBooted(true);
          setShowLaser(false);
        }, 800);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isBooted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; tx: number; ty: number; r: number; a: number }> = [];
    const cx = w / 2, cy = h / 2, gap = Math.min(w, h) * 0.15;
    const nodes = Array.from({ length: 9 }, (_, idx) => ({
      x: cx + ((idx % 3) - 1) * gap,
      y: cy + (Math.floor(idx / 3) - 1) * gap,
    }));

    for (let i = 0; i < 200; i++) {
      const node = nodes[i % nodes.length];
      const rad = 25 * Math.random(), ang = Math.random() * Math.PI * 2;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: node.x + Math.cos(ang) * rad,
        ty: node.y + Math.sin(ang) * rad,
        r: Math.random() * 1.5 + 0.8,
        a: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(156, 163, 175, 0.03)";
      ctx.lineWidth = 0.5;
      nodes.forEach((n, i) => {
        nodes.forEach((n2, j) => {
          if (i !== j && Math.hypot(n.x - n2.x, n.y - n2.y) < gap * 1.5) {
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
          }
        });
      });

      particles.forEach((p, i) => {
        p.x += (p.tx - p.x) * 0.04;
        p.y += (p.ty - p.y) * 0.04;
        ctx.fillStyle = `rgba(0, 230, 118, ${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 40) {
            ctx.strokeStyle = `rgba(0, 230, 118, ${(1 - dist / 40) * 0.15})`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isBooted]);

  return (
    <section id="core" className="relative h-screen w-screen snap-start shrink-0 overflow-hidden flex flex-col items-center justify-center bg-iron schematic-grid">
      {showLaser && <div className="absolute left-0 z-50 h-[2px] w-full bg-emerald-core shadow-[0_0_15px_#00E676] animate-laser" />}
      {!isBooted ? (
        <div className="z-20 font-mono text-[10px] text-emerald-core max-w-lg w-full px-6 space-y-1.5 text-left select-none">
          {bootLogs.map((log, idx) => <div key={idx} className="opacity-90 tracking-wide">&gt; {log}</div>)}
          <div className="inline-block w-1.5 h-3 bg-emerald-core animate-blink ml-1"></div>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 z-10 block pointer-events-none" />
          <div className="relative z-20 text-center px-6 max-w-3xl pointer-events-none select-none">
            <div className="font-mono text-xs text-emerald-core uppercase tracking-[0.25em] mb-4">[ THE PORTAL GATEWAY ]</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase">ARTRON.<br />THE SPORTING INFRASTRUCTURE STANDARD.</h1>
            <p className="text-xs md:text-sm text-silver-structure/80 leading-relaxed max-w-xl mx-auto mb-8">
              ქაოსიდან წესრიგში ლაგებადი ეკოსისტემა. სპორტული ინფრასტრუქტურის გლობალური სტანდარტი, რომელიც უზრუნველყოფს ფიზიკური სივრცეებისა და პროცესების სრულ გაციფრულებას.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pointer-events-auto">
              <a
                href="#gateway"
                className="px-6 py-2.5 font-mono text-xs font-bold text-iron bg-emerald-core border border-emerald-core hover:bg-emerald-core/90 transition-all rounded"
              >
                REQUEST SYSTEM ACCESS
              </a>
              <button
                onClick={() => {
                  const evt = new CustomEvent("open-ghost-menu");
                  window.dispatchEvent(evt);
                }}
                className="px-6 py-2.5 font-mono text-xs font-bold text-emerald-core border border-emerald-core/20 hover:border-emerald-core bg-emerald-core/5 hover:bg-emerald-core/10 transition-all rounded cursor-pointer"
              >
                ENTER THE CORE
              </button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] text-silver-structure/40 tracking-wider">SCROLL_TO_SYSTEM_LAYERS</span>
            <svg className="w-4 h-4 text-emerald-core" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </>
      )}
    </section>
  );
}
