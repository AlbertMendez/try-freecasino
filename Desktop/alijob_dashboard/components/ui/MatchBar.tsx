interface MatchBarProps {
  score: number;
}

export function MatchBar({ score }: MatchBarProps) {
  const color = score >= 80 ? "#1F7A4D" : score >= 65 ? "#1A8080" : "#B5691A";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-border-light rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold min-w-[32px]" style={{ color }}>
        {score}%
      </span>
    </div>
  );
}
