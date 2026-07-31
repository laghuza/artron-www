import React from 'react';

export default function CoreTeamCareersNarrative() {
  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn">
      <div className="space-y-1">
        <div className="font-mono text-[10px] text-[#F5F5F7] uppercase tracking-widest block">
          [ SYS_LOG // NODE_06_ACTIVATION ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          Artron OS შემქმნელი გუნდი
        </h2>
      </div>

      <p className="text-[14px] text-silver-structure/80 leading-relaxed font-sans normal-case">
        სისტემის არქიტექტორების, უსაფრთხოების ინჟინრებისა და დამფუძნებლების სქემატური პრეზენტაცია. ჩვენ ვქმნით სპორტის მომავალ ოპერაციულ სისტემას.
      </p>

      <div className="pt-2">
        <button
          type="button"
          className="border border-[#F5F5F7] text-[#F5F5F7] hover:bg-[#F5F5F7] hover:text-[#121418] font-mono text-[11px] py-3 px-4 rounded transition-all duration-300 uppercase cursor-pointer tracking-widest"
        >
          [ JOIN THE CORE // APPLY NOW ]
        </button>
      </div>
    </div>
  );
}
