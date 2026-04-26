"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { StarRating } from "@/components/ui/StarRating";

const INIT_OPINIONES = [
  { id: 1, empresa: "Hotel Jardín del Teide",    autor: "Ex-empleado verificado", score: 2.0, texto: "Las condiciones son pésimas. Turnos de 12h sin descanso y el salario nunca llegó a tiempo. No recomendaría este lugar a nadie.",          motivo: "Lenguaje ofensivo potencial", estado: "pendiente", fecha: "Hace 1h"    },
  { id: 2, empresa: "Grupo GastroCanarias",       autor: "Ex-empleado verificado", score: 3.5, texto: "Empresa correcta aunque los cuadrantes cambian con poca antelación. El equipo de cocina es agradable.",                                     motivo: "Revisión rutinaria",         estado: "pendiente", fecha: "Hace 3h"    },
  { id: 3, empresa: "Hotel Atlántico Costa Adeje",autor: "Ex-empleado verificado", score: 4.5, texto: "Excelente ambiente de trabajo. Muy organizado y salarios al día. Repetiría sin dudarlo.",                                                    motivo: "Revisión rutinaria",         estado: "revisada",  fecha: "Ayer"       },
  { id: 4, empresa: "Resort Volcán Experience",   autor: "Empleado actual",        score: 1.5, texto: "Nunca recomendaría trabajar aquí. Los jefes son unos déspotas y no respetan el descanso.",                                                   motivo: "Lenguaje inapropiado",       estado: "rechazada", fecha: "Hace 2 días" },
];

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      ✓ {msg}
    </div>
  );
}

export default function AdminModeracionPage() {
  const [tab, setTab]         = useState("pendiente");
  const [opiniones, setOp]    = useState(INIT_OPINIONES);
  const [toast, setToast]     = useState<string | null>(null);

  const changeEstado = (id: number, nuevoEstado: string, msg: string) => {
    setOp((prev) => prev.map((o) => o.id === id ? { ...o, estado: nuevoEstado } : o));
    setToast(msg);
    // If we just moved everything out of pending, switch tab
  };

  const lista = opiniones.filter((o) => o.estado === tab);

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      <SectionHeader
        title="Moderación de opiniones"
        subtitle="Revisa las opiniones antes de publicarlas en la plataforma"
      />

      <Tabs
        tabs={[
          { id: "pendiente", label: "Pendientes", count: opiniones.filter((o) => o.estado === "pendiente").length },
          { id: "revisada",  label: "Aprobadas",  count: opiniones.filter((o) => o.estado === "revisada").length },
          { id: "rechazada", label: "Rechazadas", count: opiniones.filter((o) => o.estado === "rechazada").length },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div className="flex flex-col gap-4">
        {lista.length === 0 && (
          <div className="card p-10 text-center">
            <div style={{ fontSize: 32, marginBottom: 12 }}>🛡</div>
            <div className="font-bold text-ink mb-1" style={{ fontSize: 15 }}>
              {tab === "pendiente" ? "Todo al día — sin pendientes" : "Sin elementos aquí"}
            </div>
            <div className="text-sm text-ink-muted">
              {tab === "pendiente" ? "¡Buen trabajo!" : "Usa las acciones en 'Pendientes' para moverlos aquí"}
            </div>
          </div>
        )}

        {lista.map((o) => (
          <div key={o.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-bold text-ink" style={{ fontSize: 15 }}>{o.empresa}</div>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-sm text-ink-muted">{o.autor}</span>
                  <span className="text-xs text-ink-muted">·</span>
                  <span className="text-xs text-ink-muted">{o.fecha}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <StarRating value={o.score} size={14} />
                <span className="font-bold text-base text-ink">{o.score.toFixed(1)}</span>
              </div>
            </div>

            <div className="rounded-lg p-4 mb-4" style={{ background: "#F5F4F1", border: "1px solid #E8E5DF" }}>
              <p className="text-base text-ink-secondary m-0 leading-relaxed">{o.texto}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#FDF4E7", color: "#B5691A" }}>
                ⚠ {o.motivo}
              </span>

              {tab === "pendiente" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => changeEstado(o.id, "revisada", `Opinión de ${o.empresa} aprobada`)}
                    className="px-4 py-2 rounded-md text-sm font-semibold border-none cursor-pointer font-sans"
                    style={{ background: "#1F7A4D", color: "#fff" }}
                  >
                    ✓ Aprobar
                  </button>
                  <button
                    onClick={() => setToast(`Solicitud de edición enviada a ${o.autor}`)}
                    className="px-4 py-2 rounded-md text-sm font-semibold cursor-pointer font-sans"
                    style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
                  >
                    Solicitar edición
                  </button>
                  <button
                    onClick={() => changeEstado(o.id, "rechazada", `Opinión de ${o.empresa} rechazada`)}
                    className="px-4 py-2 rounded-md text-sm font-semibold border-none cursor-pointer font-sans"
                    style={{ background: "#C0392B", color: "#fff" }}
                  >
                    Rechazar
                  </button>
                </div>
              )}

              {tab !== "pendiente" && (
                <div className="flex items-center gap-2">
                  <Badge
                    label={tab === "revisada" ? "aprobada" : "rechazada"}
                    color={tab === "revisada" ? "green" : "red"}
                    dot
                  />
                  <button
                    onClick={() => changeEstado(o.id, "pendiente", "Opinión devuelta a revisión")}
                    className="text-xs font-medium border-none bg-transparent cursor-pointer font-sans"
                    style={{ color: "#9A9088" }}
                  >
                    Revertir
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
