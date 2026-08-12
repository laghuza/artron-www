export const ARTRON_DESIGN_SYSTEM = {
  theme: {
    canvasBackground: "#090A0F", // Dark-Futurist Core
    surfaceGlass: "rgba(18, 20, 29, 0.7)", // Glassmorphic Surface
    surfaceBackground: "rgba(18, 20, 29, 0.7)",
    primaryNeon: "#00FF87", // Primary Neon Accent
    accentCyan: "#00E5FF", // High-Tech Cyan Accent
    borderGlow: "rgba(0, 255, 135, 0.15)", // Border Glow
    surfaceBorder: "rgba(0, 255, 135, 0.15)",
    textPrimary: "#F8FAFC", // Text Primary
    textSecondary: "#94A3B8", // Text Secondary
    textMuted: "#94A3B8",
    fontFamilyCode: "'JetBrains Mono', monospace",
    fontFamilySans: "'Inter', 'Space Grotesk', sans-serif"
  },

  // 9 Natural Mineral Nodes (Biophilic Spectrum)
  nodes: {
    1: { name: "CRM",            primary: "#40916C", secondary: "#52B788" }, // Sage & Moss
    2: { name: "Clubs",          primary: "#4A6572", secondary: "#6C7A89" }, // Mineral Slate
    3: { name: "Professionals",  primary: "#5C6B73", secondary: "#7B8B9A" }, // Blue Basalt
    4: { name: "Mobile OS",      primary: "#8E7DBE", secondary: "#A594F9" }, // Misty Amethyst
    5: { name: "Coins",          primary: "#D4A373", secondary: "#E9C46A" }, // Warm Sand
    6: { name: "Marketplace",    primary: "#B85B49", secondary: "#E76F51" }, // Terracotta
    7: { name: "Telemetry",      primary: "#3A5A40", secondary: "#588157" }, // Olive Jade
    8: { name: "Security",       primary: "#A0522D", secondary: "#CD853F" }, // Burnt Timber
    9: { name: "Core Init",      primary: "#2D6A4F", secondary: "#40916C" }  // Raw Central Jade
  },

  // Connector geometry lines
  connectors: {
    defaultStroke: "rgba(108, 122, 137, 0.2)",
    activeStrokeWidth: "1.5px",
    gridPatternOpacity: 0.04
  }
};
