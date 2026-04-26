import Link from "next/link";
import { LandingLayout } from "@/components/layout/LandingLayout";

const PLANES = [
  {
    name: "Beta gratuita", price: "0€", period: "Durante el lanzamiento",
    tag: "Activo ahora", color: "#1F7A4D",
    features: ["Vacantes ilimitadas", "Candidatos ilimitados", "Panel completo de empresa", "Verificaciones incluidas", "Soporte prioritario beta"],
    cta: "Solicitar acceso", highlight: true,
  },
  {
    name: "Starter", price: "49€", period: "/mes",
    tag: "Próximamente", color: "#1A8080",
    features: ["Hasta 5 vacantes activas", "3 usuarios del equipo", "Match de candidatos", "Gestión de entrevistas", "Perfil de empresa"],
    cta: "Apuntarse a la lista", highlight: false,
  },
  {
    name: "Hotel / Grupo", price: "149€", period: "/mes",
    tag: "Próximamente", color: "#C4683A",
    features: ["Vacantes ilimitadas", "Equipo ilimitado", "Dashboard de reputación avanzado", "API de integración", "Gestor de cuenta dedicado"],
    cta: "Contactar", highlight: false,
  },
];

export default function PreciosPage() {
  return (
    <LandingLayout active="/precios">
      <div className="max-w-[960px] mx-auto px-12 py-16">
        <div className="text-center mb-14">
          <h1 className="font-black m-0 mb-4" style={{ fontSize: 40, letterSpacing: "-0.04em", color: "#0C1528" }}>
            Precios <span style={{ color: "#1A5FA0" }}>transparentes</span>
          </h1>
          <p className="text-md mt-0" style={{ color: "#607896", lineHeight: 1.7 }}>
            Igual que pedimos transparencia salarial a las empresas, somos transparentes con nuestros precios.
          </p>
        </div>

        <div className="grid gap-5 mb-12" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {PLANES.map((p) => (
            <div
              key={p.name}
              className="rounded-xl flex flex-col"
              style={{
                padding: "28px 24px",
                background: p.highlight ? "rgba(196,104,58,0.08)" : "#F4F7FB",
                border: `1px solid ${p.highlight ? "#C4683A" : "#D8E2EF"}`,
              }}
            >
              <div
                className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full mb-4"
                style={{ background: `${p.color}20` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                <span className="text-2xs font-bold uppercase tracking-wider" style={{ color: p.color, letterSpacing: "0.06em" }}>{p.tag}</span>
              </div>
              <div className="font-extrabold mb-2" style={{ fontSize: 18, color: "#0C1528" }}>{p.name}</div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-black" style={{ fontSize: 36, color: "#0C1528", letterSpacing: "-0.04em" }}>{p.price}</span>
                <span className="text-base" style={{ color: "#5A7090" }}>{p.period}</span>
              </div>
              <div className="flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex gap-2.5 mb-2.5">
                    <span className="font-bold flex-shrink-0" style={{ color: p.color }}>✓</span>
                    <span className="text-base" style={{ color: "#607896" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/registro"
                className="block w-full mt-6 py-[11px] rounded-md text-base font-bold text-center no-underline"
                style={{
                  background: p.highlight ? "#C4683A" : "transparent",
                  border: `1px solid ${p.highlight ? "#C4683A" : "#D8E2EF"}`,
                  color: p.highlight ? "#fff" : "#607896",
                }}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-8 text-center" style={{ background: "#F4F7FB", border: "1px solid #DCE6F0" }}>
          <div className="font-bold mb-1.5" style={{ fontSize: 15, color: "#0C1528" }}>
            ¿Necesitas una solución a medida?
          </div>
          <div className="text-base mb-4" style={{ color: "#5A7090" }}>
            Para cadenas hoteleras, grupos de restauración o empresas con necesidades específicas.
          </div>
          <button
            className="px-6 py-2.5 rounded-md text-base font-semibold cursor-pointer font-sans border bg-transparent"
            style={{ borderColor: "#DCE6F0", color: "#607896" }}
          >
            Hablar con el equipo
          </button>
        </div>
      </div>
    </LandingLayout>
  );
}
