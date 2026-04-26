import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  accent?: "ember" | "green" | "blue" | "violet";
  className?: string;
}

const accents = {
  ember:  { bg: "bg-ember/10",  text: "text-ember",  icon: "text-ember" },
  green:  { bg: "bg-green-50",  text: "text-green-700",  icon: "text-green-600" },
  blue:   { bg: "bg-blue-50",   text: "text-blue-700",   icon: "text-blue-600" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", icon: "text-violet-600" },
};

export function StatCard({
  label, value, sub, icon: Icon, accent = "ember", className,
}: StatCardProps) {
  const a = accents[accent];
  return (
    <div className={cn("card p-5 flex items-start gap-4", className)}>
      <div className={cn("rounded-xl p-3 flex-shrink-0", a.bg)}>
        <Icon className={cn("w-5 h-5", a.icon)} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-ink/50 font-medium truncate">{label}</p>
        <p className="text-2xl font-bold text-ink mt-0.5">{value}</p>
        {sub && <p className="text-xs text-ink/40 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
