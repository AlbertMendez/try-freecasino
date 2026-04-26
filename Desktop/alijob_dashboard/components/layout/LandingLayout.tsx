import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const NAV = [
  { href: "/producto", label: "Producto" },
  { href: "/precios",  label: "Precios" },
  { href: "/casos",    label: "Casos de éxito" },
];

interface LandingLayoutProps {
  children: React.ReactNode;
  active?: string;
}

export function LandingLayout({ children, active }: LandingLayoutProps) {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col" style={{ color: "#0C1528" }}>
      <header
        className="flex items-center justify-between px-12 sticky top-0 z-[100] bg-white"
        style={{ height: 64, borderBottom: "1px solid #DCE6F0", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        <Link href="/" className="no-underline"><Logo variant="light" /></Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-1.5 rounded-md text-sm font-medium no-underline transition-all duration-150"
                style={{
                  color: isActive ? "#1A5FA0" : "#5A7090",
                  background: isActive ? "rgba(26,95,160,0.08)" : "transparent",
                  borderBottom: isActive ? "2px solid #1A5FA0" : "2px solid transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex gap-2.5">
          <Link href="/login" className="px-5 py-2 rounded-md text-sm font-semibold no-underline" style={{ border: "1px solid #B0C4D8", color: "#0C1528" }}>
            Iniciar sesión
          </Link>
          <Link href="/registro" className="px-5 py-2 rounded-md text-sm font-bold no-underline" style={{ background: "#C4683A", color: "#fff" }}>
            Solicitar acceso
          </Link>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="flex justify-between items-center px-12 py-4" style={{ borderTop: "1px solid #D8E2EF", background: "#F0F4FA" }}>
        <span className="text-sm" style={{ color: "#5A7090" }}>© 2025 AliJob — Canarias</span>
        <a href="#" className="text-sm no-underline" style={{ color: "#607896" }}>¿Eres candidato? Descarga AliJob Mobile →</a>
      </footer>
    </div>
  );
}
