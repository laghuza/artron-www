"use client";

export interface NodeData {
  id: string;
  name: string;
  type: string;
  status: string;
  color: string;
  desc: string;
}

interface DigitalTwinInfoPanelProps {
  selectedNode: NodeData;
}

export default function DigitalTwinInfoPanel({ selectedNode }: DigitalTwinInfoPanelProps) {
  return (
    <div className="md:col-span-4 bg-iron-surface/60 border border-silver-structure/10 p-6 rounded-lg font-mono text-xs">
      <div className="text-emerald-core text-[10px] uppercase tracking-[0.2em] mb-2">[ THE_DIGITAL_TWIN_TELEMETRY ]</div>
      <h2 className="text-2xl font-bold text-white mb-4 uppercase font-sans tracking-wide">DIGITAL TWIN</h2>
      <p className="text-[11px] text-silver-structure/80 leading-relaxed font-sans mb-6">
        მომხმარებელი ხედავს სპორტული სივრცის (დარბაზის, სტადიონის) თხელი ხაზებით დახატულ ციფრულ ტყუპს (Digital Twin), სადაც კვანძები რეალურ დროში პულსირებენ.
      </p>

      <div className="border-t border-silver-structure/10 pt-4 space-y-3">
        <div className="text-[9px] text-silver-structure/40 uppercase">ACTIVE_NODE_DETAILS:</div>
        <div>
          <span className="text-silver-structure font-bold">{selectedNode.name}</span>
          <div className="text-[9px] text-silver-structure/50 mt-0.5">{selectedNode.type}</div>
        </div>
        <div className={`inline-block px-2 py-0.5 border rounded text-[10px] ${selectedNode.color}`}>
          {selectedNode.status}
        </div>
        <p className="text-[11px] text-silver-structure/70 font-sans leading-relaxed pt-1">
          {selectedNode.desc}
        </p>
      </div>
    </div>
  );
}
