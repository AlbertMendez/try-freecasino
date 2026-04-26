import { cn } from "@/lib/utils";

type BadgeColor =
  | "green" | "amber" | "red" | "teal" | "blue" | "purple" | "accent" | "neutral" | "dark";

const palette: Record<BadgeColor, { bg: string; text: string }> = {
  green:   { bg: "#E8F5EE", text: "#1F7A4D" },
  amber:   { bg: "#FDF4E7", text: "#B5691A" },
  red:     { bg: "#FDF0EE", text: "#C0392B" },
  teal:    { bg: "#E8F5F5", text: "#1A8080" },
  blue:    { bg: "#EBF2FC", text: "#1A5FA0" },
  purple:  { bg: "#F3EEF9", text: "#6B3FA0" },
  accent:  { bg: "#FDF0EB", text: "#C4683A" },
  neutral: { bg: "#F0EDE8", text: "#6B6560" },
  dark:    { bg: "#111010", text: "#FFFFFF" },
};

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  dot?: boolean;
  className?: string;
}

export function Badge({ label, color = "neutral", dot, className }: BadgeProps) {
  const c = palette[color];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 px-[9px] py-[3px] rounded-full text-xs font-semibold", className)}
      style={{ background: c.bg, color: c.text, letterSpacing: "0.01em" }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: c.text }}
        />
      )}
      {label}
    </span>
  );
}
