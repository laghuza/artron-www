import React from 'react';

export default function PartnersIntegrationsNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest block">
          [ SYS_LOG // NODE_05_ACTIVATION ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          ტექნიკური პარტნიორები და ინტეგრაციები
        </h2>
      </div>

      <p className="text-[14px] text-silver-structure/80 leading-relaxed font-sans normal-case">
        Artron OS-ის გარე ინტეგრაციების მოდული. მხარდაჭერილია კავშირი ლოკალურ SMS პროვაიდერებთან, ტურნიკეტების წამყვან მწარმოებლებთან (Hardware Partners), RFID ბარათების მომწოდებლებთან და ბილინგის/საბანკო API სისტემებთან.
      </p>

      <div className="pt-2">
        <button
          type="button"
          className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121418] font-mono text-[11px] py-3 px-4 rounded transition-all duration-300 uppercase cursor-pointer tracking-widest"
        >
          [ INITIATE PARTNERSHIP // CONNECT API ]
        </button>
      </div>
    </div>
  );
}
