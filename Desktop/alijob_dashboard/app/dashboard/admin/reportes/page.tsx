"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      ✓ {msg}
    </div>
  );
}

const METRICAS = [
  { label: "Empresas registradas",    value: "38",  sub: "+4 este mes",      color: "#1A5FA0", icon: "🏢" },
  { label: "Vacantes publicadas",     value: "124", sub: "+17 este mes",     color: "#C4683A", icon: "📋" },
  { label: "Candidatos totales",      value: "1.4K",sub: "+210 este mes",    color: "#1F7A4D", icon: "👥" },
  { label: "Entrevistas realizadas",  value: "286", sub: "+43 este mes",     color: "#1A8080", icon: "🗓" },
  { label: "Tiempo medio de contratación", value: "11 días", sub: "−2 vs mes anterior", color: "#6B3FA0", icon: "⏱" },
  { label: "NPS de empresas",         value: "72",  sub: "Excelente",        color: "#B5691A", icon: "⭐" },
];

const TABLA_EMPRESAS = [
  { nombre: "Hotel Atlántico Costa Adeje", sector: "Hostelería",  vacantes: 6, candidatos: 128, match: 83, rep: 4.3 },
  { nombre: "Grupo GastroCanarias",        sector: "Restauración", vacantes: 10, candidatos: 210, match: 76, rep: 4.1 },
  { nombre: "Resort Volcán Experience",    sector: "Turismo",     vacantes: 4,  candidatos: 87,  match: 81, rep: 4.5 },
  { nombre: "Restaurante La Terraza",      sector: "Hostelería",  vacantes: 3,  candidatos: 55,  match: 68, rep: 3.8 },
  { nombre: "Resort Playa Blanca Premium", sector: "Hostelería",  vacantes: 8,  candidatos: 144, match: 78, rep: 4.0 },
];

const PERIODOS = ["Este mes", "Últimos 3 meses", "Todo"];

export default function AdminReportesPage() {
  const [periodo, setPeriodo] = useState("Este mes");
  const [toast, setToast]     = useState<string | null>(null);

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      <SectionHeader
        title="Reportes"
        subtitle="Estadísticas globales de la plataforma AliJob"
        actions={
          <button
            onClick={() => setToast("CSV exportado correctamente")}
            className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
            style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            ↓ Exportar CSV
          </button>
        }
      />

      {/* Metrics grid */}
      <div className="grid gap-3.5 mb-7" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {METRICAS.map((m) => (
          <div key={m.label} className="card p-5" style={{ borderTop: `3px solid ${m.color}` }}>
            <div className="flex justify-between items-start mb-1">
              <span style={{ fontSize: 22 }}>{m.icon}</span>
              <span className="text-sm text-ink-muted">{m.sub}</span>
            </div>
            <div className="font-black mt-2" style={{ fontSize: 32, color: m.color, letterSpacing: "-0.04em" }}>{m.value}</div>
            <div className="text-sm text-ink-secondary mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Companies table */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-5">
          <div className="font-bold text-ink" style={{ fontSize: 14 }}>Rendimiento por empresa</div>
          <div className="flex gap-3">
            {PERIODOS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer font-sans border"
                style={{ borderColor: periodo === p ? "#C4683A" : "#E8E5DF", color: periodo === p ? "#C4683A" : "#6B6560", background: "transparent" }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E8E5DF" }}>
              {["Empresa", "Sector", "Vacantes", "Candidatos", "Match medio", "Reputación"].map((h) => (
                <th
                  key={h}
                  className="text-left pb-2.5 font-semibold uppercase tracking-wide"
                  style={{ color: "#9A9088", fontSize: 11, letterSpacing: "0.04em" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLA_EMPRESAS.map((e) => (
              <tr key={e.nombre} style={{ borderBottom: "1px solid #F0EDE8" }}>
                <td className="py-3 font-semibold text-ink">{e.nombre}</td>
                <td className="py-3 text-ink-secondary">{e.sector}</td>
                <td className="py-3 text-ink-secondary">{e.vacantes}</td>
                <td className="py-3 text-ink-secondary">{e.candidatos}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2" style={{ maxWidth: 100 }}>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F0EDE8" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${e.match}%`, background: e.match >= 80 ? "#1F7A4D" : "#1A8080" }}
                      />
                    </div>
                    <span className="text-sm font-bold" style={{ color: e.match >= 80 ? "#1F7A4D" : "#1A8080" }}>{e.match}%</span>
                  </div>
                </td>
                <td className="py-3">
                  <span
                    className="font-extrabold text-base"
                    style={{ color: e.rep >= 4.2 ? "#1F7A4D" : e.rep >= 3.8 ? "#1A8080" : "#B5691A" }}
                  >
                    ⭐ {e.rep.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
