"use client";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-0.5 border-b border-border mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="px-4 py-2.5 bg-none border-none cursor-pointer font-sans transition-all duration-150 mb-[-1px]"
          style={{
            borderBottom: active === t.id ? "2px solid #C4683A" : "2px solid transparent",
            color: active === t.id ? "#C4683A" : "#6B6560",
            fontSize: 13,
            fontWeight: active === t.id ? 700 : 500,
          }}
        >
          {t.label}
          {t.count !== undefined && (
            <span
              className="ml-1.5 px-[7px] py-px rounded-full text-xs font-bold"
              style={{
                background: active === t.id ? "#FDF0EB" : "#F0EDE8",
                color: active === t.id ? "#C4683A" : "#9A9088",
              }}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
