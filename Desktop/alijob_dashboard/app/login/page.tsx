"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function go() {
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 900);
  }

  return (
    <div className="min-h-screen bg-white flex font-sans">
      {/* LEFT — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-12 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-9 cursor-pointer">
            <Link href="/"><Logo variant="light" /></Link>
          </div>

          <h2 className="font-black mb-1.5 mt-0" style={{ fontSize: 26, color: "#0C1528", letterSpacing: "-0.03em" }}>
            Accede a tu panel
          </h2>
          <p className="text-base mb-8 mt-0" style={{ color: "#5A7090" }}>
            Panel exclusivo para empresas verificadas
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.02em" }}>
                Email profesional
              </label>
              <input
                type="email"
                defaultValue="rrhh@hotelatlantico.es"
                className="input"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#5A7090", letterSpacing: "0.02em" }}>
                  Contraseña
                </label>
                <a href="#" className="text-xs no-underline" style={{ color: "#C4683A" }}>
                  ¿La olvidaste?
                </a>
              </div>
              <input type="password" defaultValue="••••••••" className="input" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked style={{ accentColor: "#C4683A" }} />
              <span className="text-sm" style={{ color: "#5A7090" }}>Recordar sesión</span>
            </label>
          </div>

          <div className="flex flex-col gap-2.5 mt-7">
            <button
              onClick={go}
              disabled={loading}
              className="w-full py-[13px] rounded-md text-md font-bold border-none cursor-pointer font-sans transition-all duration-150"
              style={{ background: loading ? "#B05A2E" : "#C4683A", color: "#fff" }}
            >
              {loading ? "Entrando…" : "Entrar al panel →"}
            </button>
            <button
              onClick={go}
              disabled={loading}
              className="w-full py-[13px] rounded-md text-base font-semibold border cursor-pointer font-sans transition-all duration-150 bg-transparent"
              style={{ borderColor: "#DCE6F0", color: "#5A7090" }}
            >
              Entrar en modo demo
            </button>
          </div>

          <p className="text-base text-center mt-6" style={{ color: "#5A7090" }}>
            ¿Tu empresa aún no tiene acceso?{" "}
            <Link href="/registro" className="no-underline font-semibold" style={{ color: "#C4683A" }}>
              Solicítalo aquí
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT — benefits panel */}
      <div
        className="w-[440px] flex flex-col justify-center px-12 py-12"
        style={{ background: "#F4F7FB", borderLeft: "1px solid #D8E2EF" }}
      >
        <div className="mb-8">
          <div
            className="text-xs font-bold uppercase tracking-caps mb-4"
            style={{ color: "#C4683A", letterSpacing: "0.08em" }}
          >
            Lo que verás dentro
          </div>
          {[
            ["6 vacantes activas",  "Publicadas y recibiendo candidatos"],
            ["128 candidatos",      "23 con match alto esta semana"],
            ["Reputación 4.3/5",    "Verificada por empleados reales"],
          ].map(([t, s]) => (
            <div key={t} className="flex gap-3.5 mb-5">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                style={{ background: "#C4683A" }}
              />
              <div>
                <div className="text-md font-bold mb-0.5" style={{ color: "#0C1528" }}>{t}</div>
                <div className="text-sm" style={{ color: "#5A7090" }}>{s}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="p-5 rounded-lg"
          style={{ background: "#FFFFFF", border: "1px solid #DCE6F0" }}
        >
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-md" style={{ color: "#F59E0B" }}>★</span>
            ))}
          </div>
          <p className="text-base leading-relaxed mt-0 mb-3 italic" style={{ color: "#607896" }}>
            "AliJob nos ayudó a contratar cocineros en 10 días. El match explicado nos ahorraba entrevistas innecesarias."
          </p>
          <div className="text-sm font-semibold" style={{ color: "#5A7090" }}>
            — Jefa de RRHH · Grupo GastroCanarias
          </div>
        </div>
      </div>
    </div>
  );
}
