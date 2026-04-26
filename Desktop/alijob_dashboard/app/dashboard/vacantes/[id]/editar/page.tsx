"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { VACANTES } from "@/data/mocks/dashboard";

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      ✓ {msg}
    </div>
  );
}

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
const selectStyle = { ...inputStyle, cursor: "pointer" };
const textareaStyle = { ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 };

function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <label className="text-base font-semibold text-ink block mb-1.5">
      {children}{required && <span className="text-accent ml-1">*</span>}
    </label>
  );
}

export default function EditarVacantePage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const vacante  = VACANTES.find((v) => v.id === Number(id)) ?? VACANTES[0];

  const [estadoLocal, setEstadoLocal] = useState(vacante.estado);
  const [toast, setToast]             = useState<string | null>(null);
  const [confirmCerrar, setConfirmCerrar] = useState(false);

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      <SectionHeader
        title={`Editar: ${vacante.puesto}`}
        subtitle="Los cambios se revisarán automáticamente antes de publicarse"
        actions={
          <Link
            href="/dashboard/vacantes"
            className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold no-underline"
            style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            ← Volver
          </Link>
        }
      />

      {vacante.estado === "activa" && (
        <Alert
          type="info"
          title="Vacante activa"
          message="Esta oferta está visible para los candidatos. Los cambios se aplicarán tras una revisión automática (normalmente &lt;1h)."
        />
      )}

      <div className="grid gap-6 mt-5" style={{ gridTemplateColumns: "1fr 300px" }}>
        <div className="flex flex-col gap-4">
          {/* Información básica */}
          <div className="card p-7 flex flex-col gap-[18px]">
            <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Información básica</div>
            <div>
              <FieldLabel required>Puesto</FieldLabel>
              <input style={inputStyle} defaultValue={vacante.puesto} />
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <FieldLabel required>Isla</FieldLabel>
                <select style={selectStyle}>
                  {["Tenerife","Gran Canaria","Lanzarote","Fuerteventura","La Palma"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel required>Municipio / zona</FieldLabel>
                <input style={inputStyle} defaultValue={vacante.ubicacion.split(",")[0]} />
              </div>
            </div>
            <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <FieldLabel required>Tipo de contrato</FieldLabel>
                <select style={selectStyle} defaultValue={vacante.contrato}>
                  {["Indefinido","Temporal","Por obra","Fijo discontinuo"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel required>Jornada</FieldLabel>
                <select style={selectStyle} defaultValue="Completa">
                  {["Completa","Parcial","Turno partido","Rotativo"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Condiciones económicas */}
          <div className="card p-7 flex flex-col gap-[18px]">
            <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Condiciones económicas</div>
            <Alert type="info" title="Salario obligatorio" message="Los rangos salariales deben estar dentro del convenio declarado." />
            <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <FieldLabel required>Salario mínimo (€/año)</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-base pointer-events-none">€</span>
                  <input style={{ ...inputStyle, paddingLeft: 28 }} defaultValue={vacante.salario.split("–")[0].replace("€", "").trim()} />
                </div>
              </div>
              <div>
                <FieldLabel required>Salario máximo (€/año)</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-base pointer-events-none">€</span>
                  <input style={{ ...inputStyle, paddingLeft: 28 }} defaultValue={vacante.salario.split("–")[1]?.replace("€", "").replace("/año", "").trim()} />
                </div>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="card p-7 flex flex-col gap-[18px]">
            <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Descripción del puesto</div>
            <div>
              <FieldLabel required>Descripción</FieldLabel>
              <textarea style={textareaStyle} rows={5} defaultValue={`Buscamos un/a ${vacante.puesto} para unirse a nuestro equipo en ${vacante.ubicacion}.`} />
            </div>
            <div>
              <FieldLabel>Requisitos</FieldLabel>
              <textarea style={textareaStyle} rows={3} defaultValue="• Experiencia previa demostrable&#10;• Idiomas según requisitos del puesto&#10;• Actitud proactiva y orientación al cliente" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                const nuevo = estadoLocal === "activa" ? "pausada" : "activa";
                setEstadoLocal(nuevo);
                setToast(nuevo === "pausada" ? "Vacante pausada" : "Vacante activada");
              }}
              className="px-5 py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
              style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
            >
              {estadoLocal === "activa" ? "⏸ Pausar vacante" : "▶ Activar vacante"}
            </button>
            <div className="flex gap-2">
              <Link
                href="/dashboard/vacantes"
                className="inline-flex items-center justify-center px-5 py-[9px] rounded-md text-base font-semibold no-underline"
                style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714" }}
              >
                Cancelar
              </Link>
              <button
                onClick={() => { setToast("Cambios guardados"); setTimeout(() => router.push("/dashboard/vacantes"), 1400); }}
                className="px-5 py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                style={{ background: "#C4683A", color: "#fff" }}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>

        {/* Aside */}
        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Estado de la vacante</div>
            <Badge
              label={estadoLocal}
              color={estadoLocal === "activa" ? "green" : estadoLocal === "pausada" ? "amber" : "neutral"}
              dot
            />
            <div className="text-sm text-ink-muted mt-2.5 leading-relaxed">
              Publicada: {vacante.publicada}
            </div>
          </div>

          <div className="card p-5">
            <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Rendimiento</div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div className="font-extrabold text-ink" style={{ fontSize: 22, letterSpacing: "-0.03em" }}>{vacante.candidatos}</div>
                <div className="text-xs text-ink-muted">candidatos</div>
              </div>
              {vacante.match > 0 && (
                <div>
                  <div className="font-extrabold" style={{ fontSize: 22, letterSpacing: "-0.03em", color: vacante.match >= 80 ? "#1F7A4D" : "#1A8080" }}>
                    {vacante.match}%
                  </div>
                  <div className="text-xs text-ink-muted">match medio</div>
                </div>
              )}
            </div>
          </div>

          <div className="card p-5">
            <div className="font-bold text-ink mb-2" style={{ fontSize: 14 }}>Zona de peligro</div>
            {!confirmCerrar ? (
              <button
                onClick={() => setConfirmCerrar(true)}
                className="w-full py-2.5 rounded-md text-sm font-semibold cursor-pointer font-sans bg-transparent"
                style={{ border: "1px solid #FCA5A5", color: "#C0392B" }}
              >
                Cerrar vacante definitivamente
              </button>
            ) : (
              <div className="rounded-lg p-3" style={{ background: "#FDF0EE", border: "1px solid #FCA5A5" }}>
                <div className="text-sm font-semibold text-ink mb-2">¿Estás seguro?</div>
                <div className="text-xs text-ink-muted mb-3">Esta acción no se puede deshacer</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push("/dashboard/vacantes")}
                    className="flex-1 py-[7px] rounded-md text-xs font-bold border-none cursor-pointer font-sans"
                    style={{ background: "#C0392B", color: "#fff" }}
                  >
                    Sí, cerrar
                  </button>
                  <button
                    onClick={() => setConfirmCerrar(false)}
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
      </div>
    </div>
  );
}
