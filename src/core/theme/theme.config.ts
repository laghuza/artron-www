export const ARTRON_DESIGN_SYSTEM = {
  theme: {
    canvasBackground: "#121418", // Forged Iron
    surfaceBackground: "rgba(26, 29, 35, 0.5)", // Iron-2 Surface
    surfaceBorder: "rgba(156, 163, 175, 0.15)", // Antique Silver Border
    textPrimary: "#F5F5F3",
    textMuted: "#6B7280",
    fontFamilyCode: "'JetBrains Mono', monospace",
    fontFamilySans: "'Outfit', 'Inter', sans-serif"
  },

  // 9 Refined Artron Cyber Spectrum Nodes
  nodes: {
    1: { name: "CRM",            primary: "#00FF87", secondary: "#10B981" }, // Neon Emerald
    2: { name: "Clubs",          primary: "#00A3FF", secondary: "#38BDF8" }, // Electric Cyan
    3: { name: "Professionals",  primary: "#38BDF8", secondary: "#00E5FF" }, // Sky Teal
    4: { name: "Mobile OS",      primary: "#6366F1", secondary: "#818CF8" }, // Electric Indigo
    5: { name: "Coins",          primary: "#00E5FF", secondary: "#38BDF8" }, // Cyber Teal
    6: { name: "Marketplace",    primary: "#0EA5E9", secondary: "#00A3FF" }, // Deep Cyan
    7: { name: "Telemetry",      primary: "#10B981", secondary: "#00FF87" }, // Mint Emerald
    8: { name: "Security",       primary: "#00A3FF", secondary: "#60A5FA" }, // Sapphire Cyber
    9: { name: "Core Init",      primary: "#00A3FF", secondary: "#00FF87" }  // Artron Quantum Core
  },

  // Connector geometry lines
  connectors: {
    defaultStroke: "rgba(108, 122, 137, 0.2)",
    activeStrokeWidth: "1.5px",
    gridPatternOpacity: 0.04
  }
};

