"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { VerBadge } from "@/components/ui/VerBadge";
import { MatchBar } from "@/components/ui/MatchBar";
import { Avatar } from "@/components/ui/Avatar";
import { CANDIDATOS } from "@/data/mocks/dashboard";

const ESTADO_COLOR: Record<string, any> = {
  nuevo: "teal", "en revisión": "amber", guardado: "blue",
  entrevista: "green", descartado: "neutral",
};

const MATCH_REASONS = [
  { label: "Experiencia en hostelería de lujo",    score: 95,  ok: true  },
  { label: "Idiomas requeridos (Español + Inglés)", score: 90,  ok: true  },
  { label: "Años de experiencia (≥2 años)",         score: 100, ok: true  },
  { label: "Disponibilidad inmediata",              score: 100, ok: true  },
  { label: "Conocimiento de vinos",                 score: 60,  ok: false },
  { label: "Título de hostelería",                  score: 80,  ok: true  },
];

const EXPERIENCIAS = [
  { empresa: "Hotel Bahía del Duque",    puesto: "Jefa de sala",    periodo: "2021–2024", desc: "Supervisión de equipo de 12 personas en restaurante de categoría 5 estrellas. Incremento de satisfacción del cliente del 18%." },
  { empresa: "Hotel Costa Adeje Palace", puesto: "Camarera senior", periodo: "2019–2021", desc: "Servicio en restaurante gastronómico. Especialización en maridaje y atención VIP." },
  { empresa: "Restaurante El Puerto",    puesto: "Camarera",        periodo: "2018–2019", desc: "Formación inicial en servicio de mesa y atención al cliente." },
];

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div
      className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}
    >
      ✓ {msg}
    </div>
  );
}

export default function CandidatoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [tab, setTab]       = useState("resumen");
  const [estado, setEstado] = useState<string | null>(null);
  const [toast, setToast]   = useState<string | null>(null);
  const [descartado, setDescartado] = useState(false);
  const [confirmDescartar, setConfirmDescartar] = useState(false);

  const candidato = CANDIDATOS.find((c) => c.id === Number(id)) ?? CANDIDATOS[0];
  const estadoActual = estado ?? candidato.estado;

  const TABS = ["resumen", "match", "experiencia"];
  const TAB_LABELS: Record<string, string> = {
    resumen: "Resumen", match: "Match explicado", experiencia: "Experiencia",
  };

  if (descartado) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <div className="font-bold text-ink mb-2" style={{ fontSize: 18 }}>Candidato descartado</div>
        <div className="text-base text-ink-muted mb-6">Ya no aparecerá en tu lista activa</div>
        <button
          onClick={() => router.push("/dashboard/candidatos")}
          className="px-6 py-[10px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
          style={{ background: "#C4683A", color: "#fff" }}
        >
          ← Volver a candidatos
        </button>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      <SectionHeader
        title={candidato.nombre}
        subtitle={`${candidato.puesto} · ${candidato.ubicacion}`}
        actions={
          <Link
            href="/dashboard/candidatos"
            className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold no-underline"
            style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            ← Volver
          </Link>
        }
      />

      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 280px" }}>
        {/* Main */}
        <div>
          {/* Profile header card */}
          <div className="card p-6 mb-4">
            <div className="flex gap-4 items-start">
              <Avatar name={candidato.nombre} size={56} />
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h2 className="font-black m-0" style={{ fontSize: 20, letterSpacing: "-0.03em", color: "#1A1714" }}>
                    {candidato.nombre}
                  </h2>
                  <Badge label={estadoActual} color={ESTADO_COLOR[estadoActual]} dot />
                  {candidato.verificado && <VerBadge label="Perfil verificado" verified />}
                </div>
                <div className="text-base text-ink-secondary mb-3">{candidato.puesto}</div>
                <div className="flex gap-5 text-sm text-ink-secondary flex-wrap">
                  <span>📍 {candidato.ubicacion}</span>
                  <span>⏱ {candidato.experiencia} de experiencia</span>
                  <span>✈️ Disponibilidad: {candidato.disponibilidad}</span>
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <div
                  className="font-black"
                  style={{ fontSize: 36, letterSpacing: "-0.04em", color: candidato.match >= 80 ? "#1F7A4D" : candidato.match >= 65 ? "#1A8080" : "#B5691A" }}
                >
                  {candidato.match}%
                </div>
                <div className="text-xs text-ink-muted">match</div>
                <div style={{ width: 80, marginTop: 6 }}>
                  <MatchBar score={candidato.match} />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b mb-5" style={{ borderColor: "#E8E5DF" }}>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-2.5 text-base font-semibold border-none cursor-pointer bg-transparent font-sans transition-all duration-150"
                style={{
                  color: tab === t ? "#C4683A" : "#9A9088",
                  borderBottom: tab === t ? "2px solid #C4683A" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>

          {/* Tab: Resumen */}
          {tab === "resumen" && (
            <div className="card p-6 flex flex-col gap-5">
              <div>
                <div className="font-bold text-ink mb-2" style={{ fontSize: 13 }}>Idiomas</div>
                <div className="flex gap-2 flex-wrap">
                  {candidato.idiomas.map((l) => (
                    <span key={l} className="px-2.5 py-1 rounded-full text-sm font-medium" style={{ background: "#F0EDE8", color: "#6B6560" }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-bold text-ink mb-2" style={{ fontSize: 13 }}>Disponibilidad</div>
                <div className="text-base text-ink-secondary">{candidato.disponibilidad}</div>
              </div>
              <div>
                <div className="font-bold text-ink mb-2" style={{ fontSize: 13 }}>Fiabilidad del perfil</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#F0EDE8" }}>
                    <div className="h-full rounded-full" style={{ width: `${candidato.fiabilidad}%`, background: candidato.fiabilidad >= 85 ? "#1F7A4D" : "#1A8080" }} />
                  </div>
                  <span className="font-bold text-sm text-ink-secondary">{candidato.fiabilidad}%</span>
                </div>
                <p className="text-sm text-ink-muted mt-1.5">Calculado a partir de referencias verificadas, historial laboral y coherencia de datos.</p>
              </div>
            </div>
          )}

          {/* Tab: Match explicado */}
          {tab === "match" && (
            <div className="card p-6">
              <p className="text-base text-ink-secondary mb-5 mt-0">Así calculamos la compatibilidad entre este candidato y la vacante.</p>
              <div className="flex flex-col gap-3.5">
                {MATCH_REASONS.map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span style={{ color: r.ok ? "#1F7A4D" : "#B5691A", fontWeight: 700 }}>{r.ok ? "✓" : "○"}</span>
                        <span className="text-base text-ink">{r.label}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: r.score >= 80 ? "#1F7A4D" : r.score >= 60 ? "#1A8080" : "#B5691A" }}>
                        {r.score}%
                      </span>
                    </div>
                    <MatchBar score={r.score} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Experiencia */}
          {tab === "experiencia" && (
            <div className="card p-6">
              <div className="flex flex-col gap-5">
                {EXPERIENCIAS.map((e, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 20 }}>
                      <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#C4683A" }} />
                      {i < EXPERIENCIAS.length - 1 && <div className="flex-1 w-px mt-1" style={{ background: "#E8E5DF" }} />}
                    </div>
                    <div className="pb-5">
                      <div className="font-bold text-ink" style={{ fontSize: 14 }}>{e.puesto}</div>
                      <div className="text-base text-ink-secondary mt-0.5">{e.empresa}</div>
                      <div className="text-sm text-ink-muted mt-0.5 mb-2">{e.periodo}</div>
                      <p className="text-base text-ink-secondary m-0 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Acciones</div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setEstado("entrevista"); router.push("/dashboard/entrevistas"); }}
                className="w-full py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                style={{ background: "#C4683A", color: "#fff" }}
              >
                📅 Convocar entrevista
              </button>
              <button
                onClick={() => { setEstado("guardado"); setToast("Candidato guardado"); }}
                className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                {estadoActual === "guardado" ? "✓ Guardado" : "💾 Guardar candidato"}
              </button>
              <button
                onClick={() => { setEstado("en revisión"); setToast("Mensaje enviado"); }}
                className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                ✉️ Enviar mensaje
              </button>

              {!confirmDescartar ? (
                <button
                  onClick={() => setConfirmDescartar(true)}
                  className="w-full py-[9px] rounded-md text-base font-medium cursor-pointer font-sans bg-transparent border-none"
                  style={{ color: "#9A9088" }}
                >
                  Descartar candidato
                </button>
              ) : (
                <div className="rounded-md p-3" style={{ background: "#FDF0EE", border: "1px solid #FCA5A5" }}>
                  <div className="text-sm font-semibold text-ink mb-2">¿Confirmar descarte?</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDescartado(true)}
                      className="flex-1 py-[7px] rounded-md text-xs font-bold border-none cursor-pointer font-sans"
                      style={{ background: "#C0392B", color: "#fff" }}
                    >
                      Sí, descartar
                    </button>
                    <button
                      onClick={() => setConfirmDescartar(false)}
                      className="flex-1 py-[7px] rounded-md text-xs font-semibold cursor-pointer font-sans"
                      style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card p-5">
            <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Vacante asociada</div>
            <div className="text-base font-semibold text-ink">{candidato.puesto}</div>
            <div className="text-sm text-ink-secondary mt-1">Costa Adeje, Tenerife</div>
            <div className="flex items-center gap-2 mt-2.5">
              <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ background: "#F0EDE8" }}>
                <div className="h-full rounded-full" style={{ width: `${candidato.match}%`, background: "#1F7A4D" }} />
              </div>
              <span className="text-sm font-bold" style={{ color: "#1F7A4D" }}>{candidato.match}%</span>
            </div>
          </div>

          <div className="card p-5">
            <div className="font-bold text-ink mb-1" style={{ fontSize: 14 }}>Fiabilidad AliJob</div>
            <div className="font-black mt-2" style={{ fontSize: 28, letterSpacing: "-0.04em", color: candidato.fiabilidad >= 85 ? "#1F7A4D" : "#1A8080" }}>
              {candidato.fiabilidad}%
            </div>
            <p className="text-sm text-ink-muted mt-1.5 m-0 leading-relaxed">
              Índice calculado a partir de referencias, coherencia de historial y verificaciones AliJob.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
