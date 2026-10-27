import React from "react";
import { cn } from "@/lib/utils";

export interface TelemetryMetricCardProps {
  tag: string;
  value: string | number;
  description: string;
  status: string;
  theme?: "emerald" | "copper" | "gold";
  className?: string;
}

const THEME_STYLES = {
  emerald: {
    value: "text-emerald-core",
    status: "text-emerald-core/80",
  },
  copper: {
    value: "text-copper",
    status: "text-copper/80",
  },
  gold: {
    value: "text-gold-raw",
    status: "text-gold-raw/80",
  },
};

export const TelemetryMetricCard: React.FC<TelemetryMetricCardProps> = ({
  tag,
  value,
  description,
  status,
  theme = "emerald",
  className,
}) => {
  const styles = THEME_STYLES[theme] || THEME_STYLES.emerald;

  return (
    <div
      className={cn(
        "bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between",
        className
      )}
    >
      <div>
        <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
          {tag}
        </div>
        <div className={cn("text-4xl font-extrabold font-mono", styles.value)}>
          {value}
        </div>
        <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
          {description}
        </p>
      </div>
      <div className={cn("font-mono text-[10px] mt-4", styles.status)}>
        {status}
      </div>
    </div>
  );
};
