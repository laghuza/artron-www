import React from 'react';

export default function IotTelemetryNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[10px] text-[#D97736] uppercase tracking-widest block">
          [ SYS_LOG // NODE_03_ACTIVATION ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          IoT დაშვების სისტემები და ტელემეტრია
        </h2>
      </div>

      <p className="text-[14px] text-silver-structure/80 leading-relaxed font-sans normal-case">
        ფიზიკური და ციფრული დაშვების მექანიზმები. პირდაპირი ინტეგრაცია ფიზიკურ ტურნიკეტებთან (NFC ბარათები, ბიომეტრია), QR-Pass (No Hardware) დაშვების სისტემა მცირე დარბაზებისთვის და გასახდელების ჭკვიანი ბოქლომების (Smart Locks) IoT მართვა.
      </p>

      {/* Simulated Live Server Console Logs */}
      <div className="p-3 bg-black/40 border border-[#D97736]/20 font-mono text-[10px] text-[#D97736] uppercase tracking-wider space-y-1 rounded">
        <div>&gt; [ CONNECTED: RFID_TURNSTILE_A ] // [ LATENCY: 11ms ] // [ GATE_01_OPENED ]</div>
        <div className="flex items-center">
          <span>&gt; TELEMETRY HANDSHAKE: IN_PROGRESS</span>
          <span className="animate-pulse inline-block w-1.5 h-3 bg-[#D97736] ml-1" />
        </div>
      </div>
    </div>
  );
}
