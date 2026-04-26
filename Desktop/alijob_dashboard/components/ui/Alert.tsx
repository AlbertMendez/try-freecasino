import Link from "next/link";

type AlertType = "info" | "warning" | "success" | "error";

const config: Record<AlertType, { bg: string; border: string; icon: string; iconColor: string }> = {
  info:    { bg: "#EBF2FC", border: "#1A5FA0", icon: "ℹ", iconColor: "#1A5FA0" },
  warning: { bg: "#FDF4E7", border: "#B5691A", icon: "⚠", iconColor: "#B5691A" },
  success: { bg: "#E8F5EE", border: "#1F7A4D", icon: "✓", iconColor: "#1F7A4D" },
  error:   { bg: "#FDF0EE", border: "#C0392B", icon: "✕", iconColor: "#C0392B" },
};

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  action?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function Alert({ type = "info", title, message, action, actionHref, onAction }: AlertProps) {
  const c = config[type];
  return (
    <div
      className="flex gap-3 px-4 py-3 rounded-md"
      style={{ background: c.bg, border: `1px solid ${c.border}20` }}
    >
      <span className="font-bold flex-shrink-0 mt-px" style={{ color: c.iconColor }}>
        {c.icon}
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-base font-bold text-ink mb-0.5">{title}</div>
        )}
        <div className="text-sm text-ink-secondary leading-relaxed">{message}</div>
      </div>
      {action && actionHref && (
        <Link
          href={actionHref}
          className="text-sm font-bold whitespace-nowrap flex-shrink-0 no-underline"
          style={{ color: c.border }}
        >
          {action}
        </Link>
      )}
      {action && !actionHref && (
        <button
          onClick={onAction}
          className="text-sm font-bold whitespace-nowrap flex-shrink-0 border-none bg-transparent cursor-pointer font-sans"
          style={{ color: c.border, opacity: onAction ? 1 : 0.5, cursor: onAction ? "pointer" : "default" }}
        >
          {action}
        </button>
      )}
    </div>
  );
}
