"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ENTREVISTAS, CANDIDATOS } from "@/data/mocks/dashboard";

const CHECKLIST_ITEMS = [
  "Revisar CV del candidato",
  "Preparar preguntas técnicas",
  "Confirmar sala / enlace videollamada",
  "Notificar al equipo de RRHH",
  "Enviar recordatorio al candidato",
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

export default function EntrevistaDetallePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const entrevista = ENTREVISTAS.find((e) => e.id === Number(id)) ?? ENTREVISTAS[0];

  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [notas, setNotas]     = useState(entrevista.notas);
  const [feedback, setFeedback] = useState("");
  const [estadoLocal, setEstadoLocal] = useState(entrevista.estado);
  const [toast, setToast]     = useState<string | null>(null);
  const [resultadoFinal, setResultadoFinal] = useState<"avanzado" | "descartado" | null>(null);

  const toggle = (i: number) => setChecked((p) => ({ ...p, [i]: !p[i] }));
  const doneCount = Object.values(checked).filter(Boolean).length;

  // Find the candidate ID from candidatos data
  const candidato = CANDIDATOS.find((c) => c.nombre === entrevista.candidato);
  const candidatoId = candidato?.id ?? 1;

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 10,
    border: "1px solid #E8E5DF",
    fontSize: 13,
    color: "#1A1714",
    background: "#FDFCFA",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
  };

  if (resultadoFinal) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div style={{ fontSize: 40, marginBottom: 16 }}>{resultadoFinal === "avanzado" ? "🎉" : "✓"}</div>
        <div className="font-bold text-ink mb-2" style={{ fontSize: 18 }}>
          {resultadoFinal === "avanzado" ? "Candidato avanzado al siguiente paso" : "Candidato descartado"}
        </div>
        <div className="text-base text-ink-muted mb-6">La entrevista ha sido marcada como completada</div>
        <button
          onClick={() => router.push("/dashboard/entrevistas")}
          className="px-6 py-[10px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
          style={{ background: "#C4683A", color: "#fff" }}
        >
          ← Volver a entrevistas
        </button>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      <SectionHeader
        title={entrevista.candidato}
        subtitle={`${entrevista.puesto} · ${entrevista.fecha}`}
        actions={
          <Link
            href="/dashboard/entrevistas"
            className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold no-underline"
            style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            ← Volver
          </Link>
        }
      />

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 300px" }}>
        {/* Main */}
        <div className="flex flex-col gap-4">
          {/* Info card */}
          <div className="card p-6">
            <div className="flex items-center gap-4 mb-5">
              <Avatar name={entrevista.candidato} size={48} />
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="font-black text-ink" style={{ fontSize: 17, letterSpacing: "-0.03em" }}>
                    {entrevista.candidato}
                  </span>
                  <Badge
                    label={estadoLocal}
                    color={estadoLocal === "confirmada" ? "green" : estadoLocal === "completada" ? "neutral" : "amber"}
                    dot
                  />
                </div>
                <div className="text-base text-ink-secondary">{entrevista.puesto}</div>
              </div>
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {[
                ["🕐", "Fecha y hora", entrevista.fecha],
                ["📍", "Modalidad",    entrevista.tipo],
                ["📋", "Vacante",      entrevista.puesto],
              ].map(([ic, label, val]) => (
                <div key={label as string} className="rounded-lg p-3.5" style={{ background: "#F5F4F1", border: "1px solid #E8E5DF" }}>
                  <div className="text-xs text-ink-muted mb-1">{ic as string} {label as string}</div>
                  <div className="font-semibold text-ink text-base">{val as string}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-ink" style={{ fontSize: 14 }}>Checklist de preparación</div>
              <span className="text-sm text-ink-muted">{doneCount}/{CHECKLIST_ITEMS.length} completados</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: "#F0EDE8" }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${(doneCount / CHECKLIST_ITEMS.length) * 100}%`, background: "#C4683A" }}
              />
            </div>
            <div className="flex flex-col gap-2.5">
              {CHECKLIST_ITEMS.map((item, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer" onClick={() => toggle(i)}>
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-150"
                    style={{
                      border: checked[i] ? "none" : "1.5px solid #D0CBC4",
                      background: checked[i] ? "#C4683A" : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {checked[i] && <span style={{ color: "#fff", fontSize: 11, fontWeight: 900 }}>✓</span>}
                  </div>
                  <span className="text-base transition-all duration-150" style={{ color: checked[i] ? "#9A9088" : "#1A1714", textDecoration: checked[i] ? "line-through" : "none" }}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-3">
              <div className="font-bold text-ink" style={{ fontSize: 14 }}>Notas internas</div>
              <button
                onClick={() => setToast("Notas guardadas")}
                className="text-sm font-semibold border-none bg-transparent cursor-pointer font-sans"
                style={{ color: "#C4683A" }}
              >
                Guardar notas
              </button>
            </div>
            <textarea
              style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
              rows={4}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Añade notas sobre el candidato o la entrevista..."
            />
          </div>

          {/* Feedback */}
          {estadoLocal === "completada" && (
            <div className="card p-6">
              <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Feedback post-entrevista</div>
              <textarea
                style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="¿Cómo fue la entrevista? ¿Pasará al siguiente paso?"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setResultadoFinal("avanzado")}
                  className="px-4 py-2 rounded-md text-sm font-semibold border-none cursor-pointer font-sans"
                  style={{ background: "#1F7A4D", color: "#fff" }}
                >
                  ✓ Pasar al siguiente paso
                </button>
                <button
                  onClick={() => setResultadoFinal("descartado")}
                  className="px-4 py-2 rounded-md text-sm font-semibold cursor-pointer font-sans"
                  style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
                >
                  Descartar candidato
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Acciones rápidas</div>
            <div className="flex flex-col gap-2">
              {estadoLocal !== "completada" && (
                <>
                  <button
                    onClick={() => { setEstadoLocal("confirmada"); setToast("Entrevista confirmada"); }}
                    className="w-full py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                    style={{ background: estadoLocal === "confirmada" ? "#1F7A4D" : "#C4683A", color: "#fff" }}
                  >
                    {estadoLocal === "confirmada" ? "✓ Confirmada" : "Confirmar entrevista"}
                  </button>
                  <button
                    onClick={() => setToast("Recordatorio enviado al candidato")}
                    className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                    style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    ✉️ Enviar recordatorio
                  </button>
                  <button
                    onClick={() => { setEstadoLocal("completada"); setToast("Entrevista marcada como completada"); }}
                    className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                    style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    🔄 Marcar como completada
                  </button>
                </>
              )}
              <Link
                href={`/dashboard/candidatos/${candidatoId}`}
                className="flex items-center justify-center w-full py-[9px] rounded-md text-base font-semibold no-underline"
                style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                👤 Ver perfil completo
              </Link>
            </div>
          </div>

          <div className="card p-5">
            <div className="font-bold text-ink mb-2" style={{ fontSize: 14 }}>Recuerda</div>
            {[
              "Confirma la asistencia 24h antes.",
              "Envía el enlace de videollamada si es remota.",
              "Guarda las notas justo después.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <span style={{ color: "#C4683A", fontWeight: 700, flexShrink: 0 }}>·</span>
                <span className="text-sm text-ink-secondary leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
