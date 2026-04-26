"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const SECTORES = ["Hostelería", "Turismo", "Restauración", "Ocio", "Limpieza y mantenimiento", "Transporte", "Comercio", "Otro"];
const ISLAS = ["Tenerife", "Gran Canaria", "Lanzarote", "Fuerteventura", "La Palma", "La Gomera", "El Hierro"];
const EMPLEADOS = ["1-10", "11-50", "51-200", "200+"];

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #DCE6F0",
  background: "#FFFFFF",
  color: "#0C1528",
  fontSize: 13,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function RegistroPage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center max-w-[420px] px-12 py-12">
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
            style={{ background: "#E8F5EE" }}
          >
            ✓
          </div>
          <h2 className="font-black mb-2.5 mt-0" style={{ fontSize: 24, color: "#0C1528", letterSpacing: "-0.03em" }}>
            Solicitud recibida
          </h2>
          <p className="text-base leading-relaxed mb-8 mt-0" style={{ color: "#5A7090", lineHeight: 1.6 }}>
            Revisaremos tu solicitud en 24–48h. Recibirás un email con las instrucciones para activar tu panel.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3 rounded-md text-md font-bold no-underline"
            style={{ background: "#C4683A", color: "#fff" }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12 font-sans">
      <div className="mb-8 cursor-pointer">
        <Link href="/"><Logo variant="light" /></Link>
      </div>

      <div className="w-full max-w-[560px]">
        <h2 className="font-black text-center mb-1.5 mt-0" style={{ fontSize: 24, color: "#0C1528", letterSpacing: "-0.03em" }}>
          Solicitar acceso
        </h2>
        <p className="text-base text-center mb-8 mt-0" style={{ color: "#5A7090" }}>
          Verificamos cada empresa antes de activar el acceso
        </p>

        <div className="rounded-xl p-8" style={{ background: "#F4F7FB", border: "1px solid #DCE6F0" }}>
          <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.04em" }}>
                Nombre de empresa *
              </label>
              <input defaultValue="Hotel Atlántico Costa Adeje" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.04em" }}>
                CIF / NIF
              </label>
              <input defaultValue="B12345678" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.04em" }}>
                Persona de contacto *
              </label>
              <input defaultValue="Laura Pérez" style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.04em" }}>
                Email profesional *
              </label>
              <input type="email" defaultValue="laura@hotelatlantico.es" style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.04em" }}>
                Teléfono *
              </label>
              <input type="tel" defaultValue="+34 922 123 456" style={inputStyle} />
            </div>
          </div>

          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[
              ["Sector *", SECTORES, "Hostelería"],
              ["Isla *", ISLAS, "Tenerife"],
              ["Empleados *", EMPLEADOS, "51-200"],
            ].map(([label, opts, def]) => (
              <div key={label as string}>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.04em" }}>
                  {label as string}
                </label>
                <select defaultValue={def as string} style={{ ...inputStyle, cursor: "pointer" }}>
                  {(opts as string[]).map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSent(true)}
            className="w-full py-[13px] rounded-md text-md font-bold border-none cursor-pointer font-sans transition-all duration-150"
            style={{ background: "#C4683A", color: "#fff" }}
          >
            Enviar solicitud de acceso →
          </button>
          <p className="text-sm text-center mt-3.5 mb-0" style={{ color: "#5A7090" }}>
            ¿Ya tienes acceso?{" "}
            <Link href="/login" className="no-underline" style={{ color: "#C4683A" }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
