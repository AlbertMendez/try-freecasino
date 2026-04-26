"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { VerBadge } from "@/components/ui/VerBadge";
import { Alert } from "@/components/ui/Alert";

const INIT_VERIFICACIONES = [
  { id: 1, titulo: "CIF / NIF de empresa",          desc: "Número de identificación fiscal verificado con la AEAT.",              estado: "verificado",       fecha: "12 enero 2025", icon: "🏢" },
  { id: 2, titulo: "Email corporativo",              desc: "Dominio de email verificado y activo.",                                estado: "verificado",       fecha: "12 enero 2025", icon: "✉️" },
  { id: 3, titulo: "Convenio colectivo",             desc: "El convenio declarado coincide con la actividad registrada.",          estado: "verificado",       fecha: "15 enero 2025", icon: "📄" },
  { id: 4, titulo: "Salarios publicados",            desc: "Los rangos salariales cumplen con el convenio de hostelería.",         estado: "verificado",       fecha: "20 enero 2025", icon: "💰" },
  { id: 5, titulo: "Contratos publicados",           desc: "Los tipos de contrato declarados son coherentes con la actividad.",    estado: "verificado",       fecha: "20 enero 2025", icon: "📋" },
  { id: 6, titulo: "Fotografías de instalaciones",  desc: "Imágenes del centro de trabajo. Requerido para perfil completo.",      estado: "pendiente",        fecha: null,             icon: "📷" },
  { id: 7, titulo: "Cultura organizacional",        desc: "Descripción de valores y ambiente laboral completada.",                estado: "pendiente",        fecha: null,             icon: "🤝" },
  { id: 8, titulo: "Evidencia ex-empleado #1",      desc: "Respuesta a la evidencia sobre condiciones de turno pendiente.",       estado: "accion_requerida", fecha: null,             icon: "⚠️" },
];

const ESTADO_COLOR: Record<string, "green" | "amber" | "neutral" | "red"> = {
  verificado: "green", pendiente: "neutral", accion_requerida: "red",
};
const ESTADO_LABEL: Record<string, string> = {
  verificado: "verificado", pendiente: "pendiente", accion_requerida: "acción requerida",
};

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      ✓ {msg}
    </div>
  );
}

export default function VerificacionesPage() {
  const router = useRouter();
  const [items, setItems] = useState(INIT_VERIFICACIONES);
  const [toast, setToast] = useState<string | null>(null);

  const verified = items.filter((v) => v.estado === "verificado").length;
  const pending  = items.filter((v) => v.estado === "pendiente").length;
  const action   = items.filter((v) => v.estado === "accion_requerida").length;

  const markPendingAsComplete = (id: number, titulo: string) => {
    setItems((prev) =>
      prev.map((v) => v.id === id ? { ...v, estado: "verificado", fecha: "Hoy" } : v)
    );
    setToast(`${titulo} enviado para revisión`);
  };

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      <SectionHeader
        title="Verificaciones"
        subtitle="Estado de todas las verificaciones de tu empresa en AliJob"
      />

      {action > 0 && (
        <Alert
          type="warning"
          title="Acción requerida"
          message="Tienes 1 evidencia pendiente de respuesta. Responder en plazo protege tu puntuación de reputación."
          action="Ir a evidencias →"
          actionHref="/dashboard/admin/evidencias"
        />
      )}

      {/* Summary */}
      <div className="grid gap-3.5 mb-6 mt-5" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {[
          { label: "Verificadas",      value: verified, color: "#1F7A4D" },
          { label: "Pendientes",       value: pending,  color: "#B5691A" },
          { label: "Acción requerida", value: action,   color: "#C0392B" },
        ].map((s) => (
          <div key={s.label} className="card p-5" style={{ borderLeft: `3px solid ${s.color}` }}>
            <div className="font-black" style={{ fontSize: 28, color: s.color, letterSpacing: "-0.04em" }}>{s.value}</div>
            <div className="text-sm text-ink-secondary mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="card">
        {items.map((v, i) => (
          <div
            key={v.id}
            className="flex items-center gap-4 px-6 py-4"
            style={{ borderBottom: i < items.length - 1 ? "1px solid #F0EDE8" : "none" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: v.estado === "verificado" ? "#E8F5EE" : v.estado === "accion_requerida" ? "#FDF0EE" : "#F5F4F1", fontSize: 18 }}
            >
              {v.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-0.5">
                <span className="font-semibold text-ink" style={{ fontSize: 14 }}>{v.titulo}</span>
                <Badge label={ESTADO_LABEL[v.estado]} color={ESTADO_COLOR[v.estado]} dot />
                {v.estado === "verificado" && <VerBadge label="Verificado" verified />}
              </div>
              <div className="text-sm text-ink-secondary">{v.desc}</div>
            </div>

            <div className="flex-shrink-0 text-right">
              {v.fecha ? (
                <span className="text-xs text-ink-muted">{v.fecha}</span>
              ) : v.estado === "accion_requerida" ? (
                <button
                  onClick={() => router.push("/dashboard/admin/evidencias")}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold border-none cursor-pointer font-sans"
                  style={{ background: "#C0392B", color: "#fff" }}
                >
                  Responder
                </button>
              ) : (
                <button
                  onClick={() => markPendingAsComplete(v.id, v.titulo)}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer font-sans"
                  style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
                >
                  Completar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
