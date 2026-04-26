"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { ADMIN_EVIDENCIAS } from "@/data/mocks/dashboard";

const PRIORIDAD_COLOR: Record<string, "red" | "amber" | "neutral"> = {
  urgente: "red", alta: "amber", normal: "neutral",
};

type EstadoEv = "pendiente" | "en revisión" | "resuelta";

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      ✓ {msg}
    </div>
  );
}

export default function AdminEvidenciasPage() {
  const [selected, setSelected] = useState<number | null>(ADMIN_EVIDENCIAS[0].id);
  const [nota, setNota]         = useState("");
  const [estados, setEstados]   = useState<Record<number, EstadoEv>>(
    Object.fromEntries(ADMIN_EVIDENCIAS.map((e) => [e.id, e.estado as EstadoEv]))
  );
  const [prioridades, setPrior] = useState<Record<number, string>>(
    Object.fromEntries(ADMIN_EVIDENCIAS.map((e) => [e.id, e.prioridad]))
  );
  const [toast, setToast]       = useState<string | null>(null);

  const evidencia = ADMIN_EVIDENCIAS.find((e) => e.id === selected);
  const urgentes  = ADMIN_EVIDENCIAS.filter((e) => prioridades[e.id] === "urgente").length;

  const changeEstado = (id: number, nuevoEstado: EstadoEv, msg: string) => {
    setEstados((prev) => ({ ...prev, [id]: nuevoEstado }));
    setToast(msg);
  };

  const escalate = (id: number) => {
    setPrior((prev) => ({ ...prev, [id]: "urgente" }));
    setToast("Evidencia escalada a urgente");
  };

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      <SectionHeader
        title="Evidencias"
        subtitle="Revisión de evidencias enviadas por ex-empleados verificados"
      />

      {urgentes > 0 && (
        <Alert
          type="warning"
          title={`${urgentes} evidencia${urgentes > 1 ? "s" : ""} urgente${urgentes > 1 ? "s" : ""}`}
          message="Estas evidencias requieren resolución inmediata para proteger la integridad de la plataforma."
        />
      )}

      <div className="grid gap-5 mt-4" style={{ gridTemplateColumns: "1fr 400px" }}>
        {/* List */}
        <div className="flex flex-col gap-3">
          {ADMIN_EVIDENCIAS.map((e) => (
            <div
              key={e.id}
              onClick={() => setSelected(e.id)}
              className="card p-5 cursor-pointer transition-all duration-150"
              style={{
                border: selected === e.id ? "1.5px solid #C4683A" : `1.5px solid ${prioridades[e.id] === "urgente" ? "#FCA5A5" : "#E8E5DF"}`,
                background: selected === e.id ? "rgba(196,104,58,0.03)" : prioridades[e.id] === "urgente" ? "rgba(192,57,43,0.02)" : "#fff",
              }}
            >
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <Badge label={prioridades[e.id]} color={PRIORIDAD_COLOR[prioridades[e.id]]} dot />
                  <Badge label={estados[e.id]} color={estados[e.id] === "pendiente" ? "amber" : estados[e.id] === "resuelta" ? "green" : "teal"} />
                </div>
                {prioridades[e.id] === "urgente" && (
                  <span className="text-xs font-bold" style={{ color: "#C0392B" }}>⚠ {e.dias} días restantes</span>
                )}
              </div>
              <div className="font-bold text-ink mb-1" style={{ fontSize: 14 }}>{e.empresa}</div>
              <div className="text-sm text-ink-muted mb-2">{e.tipo} · {e.autor}</div>
              <p className="text-base text-ink-secondary m-0 leading-relaxed" style={{ overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any }}>
                {e.texto}
              </p>
            </div>
          ))}
        </div>

        {/* Detail */}
        {evidencia && (
          <div className="card p-6 self-start sticky" style={{ top: 28 }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Badge label={prioridades[evidencia.id]} color={PRIORIDAD_COLOR[prioridades[evidencia.id]]} dot />
              <Badge label={estados[evidencia.id]} color={estados[evidencia.id] === "pendiente" ? "amber" : estados[evidencia.id] === "resuelta" ? "green" : "teal"} />
            </div>

            <div className="font-bold text-ink mb-1" style={{ fontSize: 16 }}>{evidencia.empresa}</div>
            <div className="text-sm text-ink-muted mb-4">{evidencia.tipo}</div>

            <div className="rounded-lg p-4 mb-4" style={{ background: "#F5F4F1", border: "1px solid #E8E5DF" }}>
              <div className="text-xs text-ink-muted mb-2">Testimonio del {evidencia.autor}</div>
              <p className="text-base text-ink-secondary m-0 leading-relaxed">{evidencia.texto}</p>
            </div>

            {prioridades[evidencia.id] === "urgente" && (
              <div className="rounded-lg p-3.5 mb-4 flex items-center gap-2.5" style={{ background: "#FDF0EE", border: "1px solid #FCA5A5" }}>
                <span style={{ fontSize: 18 }}>⏱</span>
                <span className="text-sm font-semibold" style={{ color: "#C0392B" }}>
                  Quedan {evidencia.dias} días para que la empresa deba responder
                </span>
              </div>
            )}

            <div className="mb-4">
              <div className="text-sm font-semibold text-ink mb-2">Nota interna</div>
              <textarea
                className="font-sans"
                style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid #E8E5DF", fontSize: 13, background: "#FDFCFA", resize: "vertical", lineHeight: 1.6, outline: "none", boxSizing: "border-box" as const }}
                rows={3}
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Añadir nota interna sobre esta evidencia..."
              />
            </div>

            <div className="flex flex-col gap-2">
              {estados[evidencia.id] !== "resuelta" && (
                <button
                  onClick={() => { changeEstado(evidencia.id, "resuelta", `Evidencia de ${evidencia.empresa} marcada como resuelta`); setNota(""); }}
                  className="w-full py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                  style={{ background: "#1A8080", color: "#fff" }}
                >
                  ✓ Marcar como resuelta
                </button>
              )}
              {estados[evidencia.id] === "resuelta" && (
                <button
                  onClick={() => changeEstado(evidencia.id, "en revisión", "Evidencia devuelta a revisión")}
                  className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                  style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
                >
                  Reabrir evidencia
                </button>
              )}
              <button
                onClick={() => setToast(`Email enviado a ${evidencia.empresa}`)}
                className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                ✉️ Contactar empresa
              </button>
              {prioridades[evidencia.id] !== "urgente" && (
                <button
                  onClick={() => escalate(evidencia.id)}
                  className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans border-none bg-transparent"
                  style={{ color: "#C0392B" }}
                >
                  ⚠ Escalar a urgente
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
