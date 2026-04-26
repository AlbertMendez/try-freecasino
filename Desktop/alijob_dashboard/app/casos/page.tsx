import Link from "next/link";
import { LandingLayout } from "@/components/layout/LandingLayout";

const CASOS = [
  { empresa: "Hotel Atlántico Costa Adeje", sector: "Hostelería · Tenerife",      logo: "🏨", rating: 4.3, vacantes: 6,  candidatos: 128, tiempo: "10 días", quote: '"AliJob nos ayudó a cubrir 6 puestos en menos de 2 semanas. El match explicado nos ahorraba entrevistas innecesarias."',             persona: "Laura Pérez · RRHH" },
  { empresa: "Grupo GastroCanarias",         sector: "Restauración · Gran Canaria", logo: "🍽", rating: 4.1, vacantes: 10, candidatos: 210, tiempo: "14 días", quote: '"La transparencia salarial cambió todo. Los candidatos llegaban con expectativas reales y el proceso era mucho más fluido."',      persona: "Ramón Delgado · CEO" },
  { empresa: "Resort Volcán Experience",     sector: "Turismo · Tenerife",          logo: "🌋", rating: 4.5, vacantes: 4,  candidatos: 87,  tiempo: "8 días",  quote: '"La reputación verificada nos diferencia de otros hoteles. Los candidatos eligen venir a trabajar con nosotros porque confían en los datos."', persona: "Marta Suárez · Directora RRHH" },
];

export default function CasosPage() {
  return (
    <LandingLayout active="/casos">
      <div className="max-w-[960px] mx-auto px-12 py-16">
        <div className="text-center mb-14">
          <h1 className="font-black m-0 mb-4" style={{ fontSize: 40, letterSpacing: "-0.04em", color: "#0C1528" }}>
            Empresas que <span style={{ color: "#1A5FA0" }}>ya confían</span> en AliJob
          </h1>
          <p className="text-md mt-0" style={{ color: "#607896", lineHeight: 1.7 }}>
            Casos reales de hostelería y turismo en Canarias durante la beta.
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-14">
          {CASOS.map((c) => (
            <div
              key={c.empresa}
              className="rounded-xl"
              style={{
                padding: 32,
                background: "#F4F7FB",
                border: "1px solid #DCE6F0",
                display: "grid",
                gridTemplateColumns: "1fr 280px",
                gap: 32,
              }}
            >
              <div>
                <div className="flex gap-3.5 items-center mb-5">
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-lg"
                    style={{ width: 52, height: 52, background: "#E8EEF6", fontSize: 26 }}
                  >
                    {c.logo}
                  </div>
                  <div>
                    <div className="font-extrabold" style={{ fontSize: 17, color: "#0C1528", letterSpacing: "-0.02em" }}>{c.empresa}</div>
                    <div className="text-sm mt-0.5" style={{ color: "#5A7090" }}>{c.sector}</div>
                  </div>
                </div>
                <p className="text-md italic leading-relaxed mb-4 mt-0" style={{ color: "#3A5070", lineHeight: 1.75 }}>{c.quote}</p>
                <div className="text-sm font-semibold" style={{ color: "#5A7090" }}>— {c.persona}</div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  ["⭐", `${c.rating}/5`,          "Reputación verificada"],
                  ["📋", `${c.vacantes} vacantes`,  "Cubiertas en AliJob"],
                  ["👥", String(c.candidatos),       "Candidatos recibidos"],
                  ["⏱", c.tiempo,                   "Tiempo medio"],
                ].map(([ic, v, l]) => (
                  <div key={l} className="rounded-md p-3 px-4" style={{ background: "#FFFFFF", border: "1px solid #DCE6F0" }}>
                    <div className="text-xs mb-1" style={{ color: "#5A7090" }}>{ic} {l}</div>
                    <div className="font-extrabold" style={{ fontSize: 20, color: "#0C1528", letterSpacing: "-0.03em" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-md mb-5 mt-0" style={{ color: "#5A7090" }}>¿Quieres ser el próximo caso de éxito?</p>
          <Link
            href="/registro"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-md text-md font-bold no-underline"
            style={{ background: "#C4683A", color: "#fff" }}
          >
            Solicitar acceso gratuito →
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
}
