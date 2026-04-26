"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { VerBadge } from "@/components/ui/VerBadge";

const STEPS = ["Información básica", "Condiciones", "Requisitos", "Previsualización"];

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

export default function NuevaOfertaPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  return (
    <div>
      <SectionHeader
        title="Crear nueva oferta"
        subtitle="Los candidatos verán exactamente lo que aquí escribas"
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

      {/* Stepper */}
      <div className="flex mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold cursor-pointer transition-all duration-200"
                style={{
                  fontSize: 12,
                  background: i + 1 <= step ? "#C4683A" : "#F0EDE8",
                  color: i + 1 <= step ? "#fff" : "#9A9088",
                }}
                onClick={() => setStep(i + 1)}
              >
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span
                className="text-xs whitespace-nowrap"
                style={{
                  fontWeight: i + 1 === step ? 700 : 400,
                  color: i + 1 === step ? "#C4683A" : "#9A9088",
                }}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-0.5 flex-1 mb-[22px] transition-all duration-300"
                style={{ background: i + 1 < step ? "#C4683A" : "#F0EDE8" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Main form */}
        <div className="card p-7">
          {step === 1 && (
            <div className="flex flex-col gap-[18px]">
              <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Información básica</div>
              <div>
                <FieldLabel required>Puesto</FieldLabel>
                <input style={inputStyle} defaultValue="Jefe/a de sala" />
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <FieldLabel required>Isla</FieldLabel>
                  <select style={selectStyle} defaultValue="Tenerife">
                    {["Tenerife","Gran Canaria","Lanzarote","Fuerteventura","La Palma"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <FieldLabel required>Municipio / zona</FieldLabel>
                  <input style={inputStyle} defaultValue="Costa Adeje" />
                </div>
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <FieldLabel required>Tipo de contrato</FieldLabel>
                  <select style={selectStyle} defaultValue="Indefinido">
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
              <div>
                <FieldLabel>Horario</FieldLabel>
                <p className="text-xs text-ink-muted mb-1.5">Describe los turnos de forma clara</p>
                <input style={inputStyle} defaultValue="Turno de noche: 20:00–02:00h, rotativo semanal" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-[18px]">
              <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Condiciones económicas</div>
              <Alert type="info" title="Salario obligatorio" message="AliJob exige transparencia salarial. Los candidatos deben conocer el rango real antes de aplicar." />
              <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <FieldLabel required>Salario mínimo (€/año)</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-base pointer-events-none">€</span>
                    <input style={{ ...inputStyle, paddingLeft: 28 }} defaultValue="22.000" />
                  </div>
                </div>
                <div>
                  <FieldLabel required>Salario máximo (€/año)</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-base pointer-events-none">€</span>
                    <input style={{ ...inputStyle, paddingLeft: 28 }} defaultValue="26.000" />
                  </div>
                </div>
              </div>
              <div>
                <FieldLabel>Convenio colectivo</FieldLabel>
                <select style={selectStyle} defaultValue="Hostelería de Tenerife">
                  {["Hostelería de Tenerife","Hostelería de Las Palmas","Sin convenio","Mejora sobre convenio"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel>Mejoras sobre convenio</FieldLabel>
                <p className="text-xs text-ink-muted mb-1.5">Si ofreces algo por encima del convenio, indícalo aquí</p>
                <input style={inputStyle} defaultValue="Plus de productividad, seguro médico incluido" />
              </div>
              <div>
                <FieldLabel>Beneficios</FieldLabel>
                <textarea style={textareaStyle} rows={3} defaultValue="• Manutención incluida en turno&#10;• Descuento en instalaciones hoteleras&#10;• Formación continua a cargo de la empresa" />
              </div>
              <div>
                <FieldLabel>¿Se ofrece alojamiento?</FieldLabel>
                <select style={selectStyle} defaultValue="No incluido">
                  {["No incluido","Alojamiento incluido","Alojamiento con coste reducido"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-[18px]">
              <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Requisitos del puesto</div>
              <div>
                <FieldLabel>Experiencia mínima</FieldLabel>
                <select style={selectStyle} defaultValue="2 años">
                  {["Sin experiencia","6 meses","1 año","2 años","3 o más años"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel>Idiomas</FieldLabel>
                <input style={inputStyle} defaultValue="Español nativo, inglés B2, alemán valorable" />
              </div>
              <div>
                <FieldLabel>Certificaciones / titulaciones</FieldLabel>
                <input style={inputStyle} defaultValue="Título de hostelería o similar" />
              </div>
              <div>
                <FieldLabel required>Descripción del puesto</FieldLabel>
                <textarea style={textareaStyle} rows={5} defaultValue="Buscamos un/a Jefe/a de sala con experiencia en restaurantes de hotel de 4 o 5 estrellas. Responsable de la coordinación del equipo de sala, atención al cliente de alto nivel y supervisión del servicio." />
              </div>
              <div>
                <FieldLabel>Qué valoramos positivamente</FieldLabel>
                <textarea style={textareaStyle} rows={3} defaultValue="• Experiencia previa en hoteles de lujo&#10;• Conocimiento de vinos y maridajes&#10;• Capacidad de liderazgo de equipos pequeños" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="font-extrabold text-ink mb-4" style={{ fontSize: 15 }}>Así verá la oferta el candidato</div>
              <div className="rounded-lg p-5" style={{ border: "1px solid #E8E5DF", background: "#F5F4F1" }}>
                <div className="flex justify-between mb-3.5">
                  <div>
                    <h3 className="font-black m-0 mb-1" style={{ fontSize: 18, letterSpacing: "-0.02em", color: "#1A1714" }}>Jefe/a de sala</h3>
                    <div className="text-base text-ink-secondary">Hotel Atlántico · Costa Adeje, Tenerife</div>
                  </div>
                  <VerBadge label="Empresa verificada" verified />
                </div>
                <div className="flex gap-2 flex-wrap mb-3.5">
                  <Tag label="Indefinido" /><Tag label="Jornada completa" /><Tag label="2 años exp." />
                  <Badge label="22.000–26.000 €/año" color="green" />
                  <VerBadge label="Salario verificado" verified />
                </div>
                <div className="text-base text-ink-secondary leading-relaxed">
                  Buscamos un/a Jefe/a de sala con experiencia en restaurantes de hotel de 4 o 5 estrellas...
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-7">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold border cursor-pointer font-sans disabled:opacity-55 disabled:cursor-not-allowed"
              style={{ background: "#fff", borderColor: "#E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              ← Anterior
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                style={{ background: "#C4683A", color: "#fff" }}
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={() => router.push("/dashboard/vacantes")}
                className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                style={{ background: "#C4683A", color: "#fff" }}
              >
                Publicar oferta ✓
              </button>
            )}
          </div>
        </div>

        {/* Aside */}
        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="text-base font-bold text-ink mb-3">Consejos AliJob</div>
            {[
              ["💰", "El salario real atrae un 3x más de candidatos que los rangos ambiguos."],
              ["📝", "Las ofertas con descripción de equipo tienen 40% más de aplicaciones."],
              ["✓",  "Indicar el convenio exacto reduce la tasa de abandono un 25%."],
            ].map(([ic, t]) => (
              <div key={t as string} className="flex gap-2.5 mb-2.5">
                <span className="text-md flex-shrink-0">{ic as string}</span>
                <span className="text-sm text-ink-secondary leading-relaxed">{t as string}</span>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <div className="text-base font-bold text-ink mb-2.5">Estado de la oferta</div>
            <Badge label="Borrador" color="neutral" dot />
            <div className="text-sm text-ink-muted mt-2.5 leading-relaxed">
              La oferta se revisará automáticamente antes de publicarse para cumplir con los criterios AliJob.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
