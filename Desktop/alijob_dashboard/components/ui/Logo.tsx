import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  small?: boolean;
  className?: string;
}

export function Logo({ variant = "dark", small = false, className }: LogoProps) {
  const isLight = variant === "light";
  const size = small ? 28 : 32;
  const svgSize = small ? 14 : 16;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: size,
          height: size,
          borderRadius: 10,
          background: "linear-gradient(135deg, #C4683A 0%, #9B3E1A 100%)",
        }}
      >
        <svg width={svgSize} height={svgSize} viewBox="0 0 16 16" fill="none">
          <polygon points="8,1 15,5 15,11 8,15 1,11 1,5" fill="none" stroke="white" strokeWidth="1.5" />
          <polygon points="8,4 11,6 11,10 8,12 5,10 5,6" fill="white" opacity="0.7" />
        </svg>
      </div>
      {!small && (
        <div>
          <div
            className="font-extrabold leading-none"
            style={{
              fontSize: 14,
              color: isLight ? "#0C1528" : "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            AliJob
          </div>
          <div
            className="font-semibold uppercase leading-none mt-0.5"
            style={{
              fontSize: 9,
              color: isLight ? "#607896" : "#6B6058",
              letterSpacing: "0.12em",
            }}
          >
            Empresas
          </div>
        </div>
      )}
    </div>
  );
}
