import { cn } from "@/lib/utils";

const COLORS = ["#C4683A", "#1A8080", "#6B3FA0", "#1A5FA0", "#1F7A4D", "#B5691A"];

interface AvatarProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export function Avatar({ name, size = 32, color, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg = color || COLORS[name.charCodeAt(0) % COLORS.length];

  return (
    <div
      className={cn("flex items-center justify-center rounded-full flex-shrink-0 font-bold text-white", className)}
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.35,
      }}
    >
      {initials}
    </div>
  );
}
