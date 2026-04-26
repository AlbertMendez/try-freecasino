interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, actions }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1
          className="font-extrabold text-ink m-0"
          style={{ fontSize: 20, letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-ink-secondary mt-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
