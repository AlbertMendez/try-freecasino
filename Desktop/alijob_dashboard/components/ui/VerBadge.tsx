interface VerBadgeProps {
  label: string;
  verified?: boolean;
}

export function VerBadge({ label, verified = true }: VerBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-[9px] py-[3px] rounded-full text-xs font-bold"
      style={{
        background: verified ? "#E8F5EE" : "#FDF4E7",
        color: verified ? "#1F7A4D" : "#B5691A",
      }}
    >
      <span>{verified ? "✓" : "○"}</span>
      {label}
    </span>
  );
}
