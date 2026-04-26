import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { VerBadge } from "@/components/ui/VerBadge";
import { DEMO_STATS } from "@/data/mocks/dashboard";

const SUBCATEGORIAS = [
  { label: "Condiciones laborales",    score: 4.5 },
  { label: "Comunicación interna",     score: 3.8 },
  { label: "Salario y beneficios",     score: 4.2 },
  { label: "Ambiente de trabajo",      score: 4.6 },
  { label: "Conciliación",             score: 3.5 },
  { label: "Oportunidades de carrera", score: 4.0 },
];

const OPINIONES = [
  {
    autor: "Ex-empleado verificado",
    puesto: "Camarero de sala · 2022–2024",
    fecha: "Hace 2 semanas",
    score: 4.5,
    texto: "Muy buen ambiente de trabajo. El equipo directivo es accesible y los turnos están bien organizados. El salario cumple con el convenio y hay extras en temporada alta.",
    verificada: true,
  },
  {
    autor: "Ex-empleado verificado",
    puesto: "Recepcionista · 2021–2023",
    fecha: "Hace 1 mes",
    score: 4.0,
    texto: "Empresa seria. Los contratos son claros y el salario se paga puntualmente. Mejoraría la comunicación de cambios de turno con más antelación.",
    verificada: true,
  },
  {
    autor: "Ex-empleado verificado",
    puesto: "Personal de pisos · 2023",
    fecha: "Hace 2 meses",
    score: 3.5,
    texto: "El trabajo es intenso en temporada alta. Se echa de menos más apoyo en picos de ocupación. Aun así, las condiciones están dentro de lo normal para el sector.",
    verificada: true,
  },
];

export default function ReputacionPage() {
  return (
    <div>
      <SectionHeader
        title="Reputación"
        subtitle="Cómo te perciben los trabajadores que han pasado por tu empresa"
      />

      <Alert
        type="warning"
        title="Evidencia pendiente de respuesta"
        message="Un ex-empleado ha enviado documentación sobre condiciones de turno. Tienes 7 días para responder antes de que afecte a tu puntuación."
        action="Ver evidencia →"
        actionHref="/dashboard/verificaciones"
      />

      <div className="grid gap-5 mt-5" style={{ gridTemplateColumns: "280px 1fr" }}>
        {/* Score card */}
        <div className="flex flex-col gap-3.5">
          <div className="card p-6 text-center">
            <VerBadge label="Reputación verificada" verified />
            <div
              className="font-black mt-4 mb-1"
              style={{ fontSize: 64, letterSpacing: "-0.05em", color: "#1A1714", lineHeight: 1 }}
            >
              {DEMO_STATS.reputacion}
            </div>
            <div className="text-sm text-ink-muted mb-3">de 5 posible</div>
            <StarRating value={DEMO_STATS.reputacion} size={20} />
            <div className="text-sm text-ink-secondary mt-3">
              {DEMO_STATS.numOpiniones} opiniones verificadas
            </div>
          </div>

          <div className="card p-5">
            <div className="font-bold text-ink mb-3.5" style={{ fontSize: 13 }}>Distribución</div>
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = star === 5 ? 40 : star === 4 ? 35 : star === 3 ? 15 : star === 2 ? 7 : 3;
              return (
                <div key={star} className="flex items-center gap-2.5 mb-2">
                  <span className="text-sm text-ink-muted w-3 text-right flex-shrink-0">{star}</span>
                  <span style={{ color: "#F59E0B", fontSize: 12, flexShrink: 0 }}>★</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F0EDE8" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#F59E0B" }} />
                  </div>
                  <span className="text-xs text-ink-muted w-7 text-right flex-shrink-0">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Subcategories */}
          <div className="card p-6">
            <div className="font-bold text-ink mb-4" style={{ fontSize: 14 }}>Puntuación por categoría</div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {SUBCATEGORIAS.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-base text-ink">{s.label}</span>
                    <span
                      className="text-sm font-extrabold"
                      style={{ color: s.score >= 4 ? "#1F7A4D" : s.score >= 3 ? "#1A8080" : "#B5691A" }}
                    >
                      {s.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F0EDE8" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(s.score / 5) * 100}%`,
                        background: s.score >= 4 ? "#1F7A4D" : s.score >= 3 ? "#1A8080" : "#B5691A",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opinions */}
          <div className="card p-6">
            <div className="font-bold text-ink mb-4" style={{ fontSize: 14 }}>Opiniones recientes</div>
            <div className="flex flex-col gap-4">
              {OPINIONES.map((o, i) => (
                <div key={i} style={{ borderBottom: i < OPINIONES.length - 1 ? "1px solid #F0EDE8" : "none", paddingBottom: i < OPINIONES.length - 1 ? 16 : 0 }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-base text-ink">{o.autor}</span>
                        {o.verificada && <VerBadge label="Verificada" verified />}
                      </div>
                      <div className="text-sm text-ink-muted">{o.puesto}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <StarRating value={o.score} size={12} />
                      <span className="text-xs text-ink-muted">{o.fecha}</span>
                    </div>
                  </div>
                  <p className="text-base text-ink-secondary m-0 leading-relaxed">{o.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
