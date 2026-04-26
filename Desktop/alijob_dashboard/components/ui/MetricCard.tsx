interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: string;
  accent?: boolean;
  trend?: number;
}

export function MetricCard({ label, value, sub, icon, accent, trend }: MetricCardProps) {
  return (
    <div className="card p-5">
      <div className="flex justify-between items-start">
        <div>
          <div
            className="text-xs font-semibold uppercase mb-2.5 tracking-wide"
            style={{ color: "#9A9088", letterSpacing: "0.04em" }}
          >
            {label}
          </div>
          <div
            className="font-extrabold leading-none"
            style={{ fontSize: 28, color: "#1A1714", letterSpacing: "-0.03em" }}
          >
            {value}
          </div>
          {sub && (
            <div className="text-sm mt-1.5" style={{ color: "#9A9088" }}>
              {sub}
            </div>
          )}
          {trend !== undefined && (
            <div
              className="text-sm mt-1 font-semibold"
              style={{ color: trend > 0 ? "#1F7A4D" : "#C0392B" }}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% esta semana
            </div>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: accent ? "#FDF0EB" : "#F0EDE8" }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
