"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { VerBadge } from "@/components/ui/VerBadge";
import { Alert } from "@/components/ui/Alert";
import { DEMO_EMPRESA } from "@/data/mocks/dashboard";

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

const TABS = [
  { id: "identidad",   label: "Identidad" },
  { id: "condiciones", label: "Condiciones" },
  { id: "cultura",     label: "Cultura" },
];

const COMPLETION_ITEMS = [
  { label: "Descripción de empresa",  done: true },
  { label: "Logo subido",             done: true },
  { label: "Convenio colectivo",      done: true },
  { label: "Cultura organizacional",  done: false },
  { label: "Fotos del equipo",        done: false },
];

export default function PerfilPage() {
  const router = useRouter();
  const [tab, setTab] = useState("identidad");
  const [toast, setToast] = useState<string | null>(null);
  const donePct = DEMO_EMPRESA.perfilCompletado;

  const handleSave = () => setToast("Cambios guardados correctamente");

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      <SectionHeader
        title="Perfil de empresa"
        subtitle="Los candidatos ven esta información antes de aplicar"
      />

      <Alert
        type="info"
        title="Perfil incompleto"
        message="Añade fotos del equipo y la sección de cultura para aumentar las aplicaciones hasta un 40%."
        action="Ir a Cultura →"
        onAction={() => setTab("cultura")}
      />

      <div className="grid gap-6 mt-5" style={{ gridTemplateColumns: "1fr 280px" }}>
        {/* Form */}
        <div>
          {/* Tab bar */}
          <div className="flex gap-0 border-b mb-5" style={{ borderColor: "#E8E5DF" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-2.5 text-base font-semibold border-none cursor-pointer bg-transparent font-sans transition-all duration-150"
                style={{
                  color: tab === t.id ? "#C4683A" : "#9A9088",
                  borderBottom: tab === t.id ? "2px solid #C4683A" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Identidad */}
          {tab === "identidad" && (
            <div className="card p-7 flex flex-col gap-[18px]">
              <div>
                <FieldLabel required>Nombre de empresa</FieldLabel>
                <input style={inputStyle} defaultValue={DEMO_EMPRESA.nombre} />
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <FieldLabel required>Sector</FieldLabel>
                  <select style={selectStyle} defaultValue={DEMO_EMPRESA.sector}>
                    {["Hostelería", "Restauración", "Turismo", "Ocio", "Otro"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <FieldLabel required>Isla principal</FieldLabel>
                  <select style={selectStyle} defaultValue={DEMO_EMPRESA.isla}>
                    {["Tenerife", "Gran Canaria", "Lanzarote", "Fuerteventura", "La Palma"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <FieldLabel required>Tamaño de plantilla</FieldLabel>
                <select style={selectStyle} defaultValue={DEMO_EMPRESA.empleados}>
                  {["1-10", "11-50", "51-200", "200+"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel>Descripción de la empresa</FieldLabel>
                <p className="text-xs text-ink-muted mb-1.5">Esta descripción aparece en todas tus ofertas</p>
                <textarea
                  style={textareaStyle}
                  rows={4}
                  defaultValue="Hotel Atlántico Costa Adeje es un establecimiento de 4 estrellas situado en primera línea de playa en Costa Adeje, Tenerife. Contamos con más de 20 años de experiencia en el sector hotelero canario y un equipo de más de 120 profesionales."
                />
              </div>
              <div>
                <FieldLabel>Web corporativa</FieldLabel>
                <input style={inputStyle} defaultValue="https://hotelatlantico.com" type="url" />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSave}
                  className="px-5 py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                  style={{ background: "#C4683A", color: "#fff" }}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          )}

          {/* Tab: Condiciones */}
          {tab === "condiciones" && (
            <div className="card p-7 flex flex-col gap-[18px]">
              <div>
                <FieldLabel required>Convenio colectivo principal</FieldLabel>
                <select style={selectStyle} defaultValue="Hostelería de Tenerife">
                  {["Hostelería de Tenerife", "Hostelería de Las Palmas", "Sin convenio", "Mejora sobre convenio"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel>Política de jornada</FieldLabel>
                <textarea style={textareaStyle} rows={3} defaultValue="Jornadas de 8h. Festivos compensados o pagados según convenio. Los cuadrantes se comunican con 15 días de antelación." />
              </div>
              <div>
                <FieldLabel>¿Se ofrece alojamiento?</FieldLabel>
                <select style={selectStyle} defaultValue="No incluido">
                  {["No incluido", "Alojamiento incluido", "Alojamiento con coste reducido"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel>Beneficios generales</FieldLabel>
                <textarea style={textareaStyle} rows={3} defaultValue={"• Manutención en turno\n• Descuento en instalaciones\n• Formación continua\n• Seguro médico tras 1 año"} />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSave}
                  className="px-5 py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                  style={{ background: "#C4683A", color: "#fff" }}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          )}

          {/* Tab: Cultura */}
          {tab === "cultura" && (
            <div className="card p-7 flex flex-col gap-[18px]">
              <Alert type="info" title="Sección sin completar" message="Rellenar esta sección aumenta las aplicaciones de candidatos afines a tu cultura." />
              <div>
                <FieldLabel>Valores de empresa</FieldLabel>
                <textarea style={textareaStyle} rows={3} placeholder="Ej: compromiso, trabajo en equipo, orientación al cliente..." />
              </div>
              <div>
                <FieldLabel>¿Cómo es el día a día?</FieldLabel>
                <textarea style={textareaStyle} rows={4} placeholder="Describe el ambiente, el ritmo, cómo es trabajar aquí..." />
              </div>
              <div>
                <FieldLabel>Qué esperamos de nuestro equipo</FieldLabel>
                <textarea style={textareaStyle} rows={3} placeholder="Ej: proactividad, puntualidad, actitud de servicio..." />
              </div>
              <div>
                <FieldLabel>Fotos del equipo o instalaciones</FieldLabel>
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{ border: "2px dashed #D0CBC4", height: 100, cursor: "pointer", background: "#FDFCFA" }}
                >
                  <span className="text-sm text-ink-muted">+ Subir fotos (max 5)</span>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSave}
                  className="px-5 py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                  style={{ background: "#C4683A", color: "#fff" }}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Aside */}
        <div className="flex flex-col gap-3.5">
          {/* Completeness */}
          <div className="card p-5">
            <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Completitud del perfil</div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-ink-secondary">Completado</span>
              <span className="font-extrabold text-base" style={{ color: "#C4683A" }}>{donePct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-4" style={{ background: "#F0EDE8" }}>
              <div className="h-full rounded-full" style={{ width: `${donePct}%`, background: "#C4683A" }} />
            </div>
            <div className="flex flex-col gap-2">
              {COMPLETION_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 text-base" style={{ color: item.done ? "#1F7A4D" : "#9A9088" }}>
                  <span>{item.done ? "✓" : "○"}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="card p-5">
            <div className="font-bold text-ink mb-3" style={{ fontSize: 14 }}>Vista previa</div>
            <div className="rounded-lg p-4" style={{ background: "#F5F4F1", border: "1px solid #E8E5DF" }}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E8E5DF", fontSize: 16 }}>🏨</div>
                <div>
                  <div className="font-bold text-ink" style={{ fontSize: 12 }}>{DEMO_EMPRESA.nombre}</div>
                  <div className="text-xs text-ink-muted">{DEMO_EMPRESA.sector} · {DEMO_EMPRESA.isla}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge label="verificada" color="green" dot />
                <VerBadge label="Reputación 4.3/5" verified />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
