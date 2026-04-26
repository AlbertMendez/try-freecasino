"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { ADMIN_EMPRESAS } from "@/data/mocks/dashboard";

const PRIORIDAD_COLOR: Record<string, "red" | "amber" | "neutral"> = {
  alta: "red", normal: "amber", baja: "neutral",
};

type Estado = "pendientes" | "aprobadas" | "rechazadas";

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      ✓ {msg}
    </div>
  );
}

export default function AdminEmpresasPage() {
  const [tab, setTab]         = useState<Estado>("pendientes");
  const [selected, setSelected] = useState<number | null>(ADMIN_EMPRESAS[0].id);
  const [estados, setEstados] = useState<Record<number, Estado>>(
    Object.fromEntries(ADMIN_EMPRESAS.map((e) => [e.id, "pendientes"]))
  );
  const [toast, setToast]     = useState<string | null>(null);

  const changeEstado = (id: number, nuevoEstado: Estado, msg: string) => {
    setEstados((prev) => ({ ...prev, [id]: nuevoEstado }));
    setSelected(null);
    setToast(msg);
  };

  const lista    = ADMIN_EMPRESAS.filter((e) => estados[e.id] === tab);
  const empresa  = ADMIN_EMPRESAS.find((e) => e.id === selected);

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      <SectionHeader
        title="Validación de empresas"
        subtitle="Revisa y aprueba las solicitudes de acceso a la plataforma"
      />

      <Tabs
        tabs={[
          { id: "pendientes", label: "Pendientes", count: ADMIN_EMPRESAS.filter((e) => estados[e.id] === "pendientes").length },
          { id: "aprobadas",  label: "Aprobadas",  count: ADMIN_EMPRESAS.filter((e) => estados[e.id] === "aprobadas").length  + 34 },
          { id: "rechazadas", label: "Rechazadas", count: ADMIN_EMPRESAS.filter((e) => estados[e.id] === "rechazadas").length + 2  },
        ]}
        active={tab}
        onChange={(t) => { setTab(t as Estado); setSelected(null); }}
      />

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 380px" }}>
        {/* List */}
        <div className="flex flex-col gap-2.5">
          {lista.length === 0 && (
            <div className="card p-10 text-center">
              <div style={{ fontSize: 32, marginBottom: 12 }}>🏢</div>
              <div className="font-bold text-ink mb-1" style={{ fontSize: 15 }}>Sin empresas en esta sección</div>
              <div className="text-sm text-ink-muted">Las empresas aparecerán aquí al cambiar su estado</div>
            </div>
          )}
          {lista.map((e) => (
            <div
              key={e.id}
              onClick={() => setSelected(e.id)}
              className="card p-5 cursor-pointer transition-all duration-150"
              style={{
                border: selected === e.id ? "1.5px solid #C4683A" : "1px solid #E8E5DF",
                background: selected === e.id ? "rgba(196,104,58,0.03)" : "#fff",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-extrabold text-ink" style={{ fontSize: 14, letterSpacing: "-0.02em" }}>{e.nombre}</div>
                  <div className="text-sm text-ink-secondary mt-0.5">{e.sector} · {e.isla}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge label={e.prioridad} color={PRIORIDAD_COLOR[e.prioridad]} dot />
                  <span className="text-xs text-ink-muted">{e.solicitado}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {e.docs.map((d) => (
                  <span key={d} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#E8F5EE", color: "#1F7A4D" }}>
                    ✓ {d}
                  </span>
                ))}
                {e.docs.length === 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#FDF4E7", color: "#B5691A" }}>
                    ⚠ Sin documentación
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {empresa && (
          <div className="card p-6 self-start sticky" style={{ top: 28 }}>
            <div className="font-bold text-ink mb-4" style={{ fontSize: 15 }}>Detalle de solicitud</div>

            <div className="flex flex-col gap-3 mb-5">
              {[
                ["Empresa",    empresa.nombre],
                ["Contacto",   empresa.contacto],
                ["Email",      empresa.email],
                ["Isla",       empresa.isla],
                ["Sector",     empresa.sector],
                ["Empleados",  empresa.empleados],
                ["Solicitado", empresa.solicitado],
              ].map(([l, v]) => (
                <div key={l as string} className="flex justify-between">
                  <span className="text-sm text-ink-muted">{l as string}</span>
                  <span className="text-sm font-semibold text-ink text-right" style={{ maxWidth: 200 }}>{v as string}</span>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <div className="text-sm font-semibold text-ink mb-2">Documentación adjunta</div>
              {empresa.docs.length > 0 ? empresa.docs.map((d) => (
                <div key={d} className="flex items-center gap-2 py-1.5">
                  <span style={{ color: "#1F7A4D", fontWeight: 700 }}>✓</span>
                  <span className="text-base text-ink-secondary">{d}</span>
                  <button
                    onClick={() => setToast(`Abriendo: ${d}`)}
                    className="ml-auto text-xs cursor-pointer bg-transparent border-none font-sans"
                    style={{ color: "#C4683A" }}
                  >
                    Ver →
                  </button>
                </div>
              )) : (
                <div className="text-sm text-ink-muted">No se han adjuntado documentos</div>
              )}
            </div>

            {estados[empresa.id] === "pendientes" && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => changeEstado(empresa.id, "aprobadas", `${empresa.nombre} aprobada`)}
                  className="w-full py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                  style={{ background: "#1F7A4D", color: "#fff" }}
                >
                  ✓ Aprobar empresa
                </button>
                <button
                  onClick={() => setToast(`Solicitud de info enviada a ${empresa.contacto}`)}
                  className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                  style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                >
                  ✉️ Solicitar más info
                </button>
                <button
                  onClick={() => changeEstado(empresa.id, "rechazadas", `${empresa.nombre} rechazada`)}
                  className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans border-none bg-transparent"
                  style={{ color: "#C0392B" }}
                >
                  Rechazar solicitud
                </button>
              </div>
            )}

            {estados[empresa.id] !== "pendientes" && (
              <div className="flex flex-col gap-2">
                <Badge
                  label={estados[empresa.id] === "aprobadas" ? "aprobada" : "rechazada"}
                  color={estados[empresa.id] === "aprobadas" ? "green" : "red"}
                  dot
                />
                <button
                  onClick={() => changeEstado(empresa.id, "pendientes", "Empresa devuelta a revisión")}
                  className="w-full py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans mt-2"
                  style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
                >
                  Revertir a pendiente
                </button>
              </div>
            )}
          </div>
        )}

        {!empresa && lista.length > 0 && (
          <div className="card p-8 text-center self-start">
            <div style={{ fontSize: 28, marginBottom: 10 }}>👆</div>
            <div className="text-base font-semibold text-ink">Selecciona una empresa</div>
            <div className="text-sm text-ink-muted mt-1">para ver el detalle y tomar acciones</div>
          </div>
        )}
      </div>
    </div>
  );
}
