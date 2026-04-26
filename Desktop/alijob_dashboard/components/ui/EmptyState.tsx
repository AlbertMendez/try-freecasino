interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      {icon && <div className="text-4xl mb-4 opacity-40">{icon}</div>}
      <div className="text-lg font-bold text-ink mb-1.5">{title}</div>
      {subtitle && (
        <div className="text-base text-ink-secondary max-w-xs leading-relaxed mb-5">
          {subtitle}
        </div>
      )}
      {action}
    </div>
  );
}
