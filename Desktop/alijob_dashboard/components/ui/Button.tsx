import { cn } from "@/lib/utils";

type BtnVariant = "primary" | "secondary" | "ghost" | "danger" | "teal" | "dark";
type BtnSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<BtnVariant, string> = {
  primary:   "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-card text-ink border border-border shadow-sm hover:bg-page",
  ghost:     "bg-transparent text-ink-secondary hover:text-ink hover:bg-page",
  danger:    "bg-status-red text-white hover:opacity-90",
  teal:      "bg-teal text-white hover:opacity-90",
  dark:      "bg-sidebar text-white hover:opacity-90",
};

const sizeClasses: Record<BtnSize, string> = {
  sm: "text-xs px-3 py-[6px]",
  md: "text-base px-[18px] py-[9px]",
  lg: "text-md px-6 py-3",
};

export function Button({
  variant = "primary",
  size = "md",
  full,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 font-semibold rounded-md transition-all duration-150 border-none leading-none whitespace-nowrap select-none cursor-pointer",
        "disabled:opacity-55 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        full && "w-full",
        className
      )}
      style={{ letterSpacing: "-0.01em" }}
      {...props}
    >
      {children}
    </button>
  );
}
