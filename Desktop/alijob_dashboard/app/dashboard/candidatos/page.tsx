"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { VerBadge } from "@/components/ui/VerBadge";
import { MatchBar } from "@/components/ui/MatchBar";
import { Avatar } from "@/components/ui/Avatar";
import { CANDIDATOS, VACANTES } from "@/data/mocks/dashboard";

const ESTADO_COLOR: Record<string, "green" | "amber" | "teal" | "neutral" | "red" | "blue"> = {
  nuevo: "teal",
  "en revisión": "amber",
  guardado: "blue",
  entrevista: "green",
  descartado: "neutral",
};

export default function CandidatosPage() {
  const [tab, setTab] = useState("todos");
  const [vacanteFilter, setVacanteFilter] = useState("todas");
  const [matchFilter, setMatchFilter] = useState("todos");

  const filtered = CANDIDATOS.filter((c) => {
    if (tab !== "todos" && c.estado !== tab) return false;
    if (vacanteFilter !== "todas" && c.puesto !== vacanteFilter) return false;
    if (matchFilter === "alto" && c.match < 80) return false;
    if (matchFilter === "medio" && (c.match < 65 || c.match >= 80)) return false;
    if (matchFilter === "bajo" && c.match >= 65) return false;
    return true;
  });

  const selectStyle = {
    padding: "7px 10px",
    borderRadius: 8,
    border: "1px solid #E8E5DF",
    fontSize: 12,
    color: "#1A1714",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    outline: "none",
  };

  return (
    <div>
      <SectionHeader
        title="Candidatos"
        subtitle={`${CANDIDATOS.length} candidatos en total · ${CANDIDATOS.filter((c) => c.match >= 80).length} con match alto`}
      />

      <Tabs
        tabs={[
          { id: "todos",       label: "Todos",        count: CANDIDATOS.length },
          { id: "nuevo",       label: "Nuevos",       count: CANDIDATOS.filter((c) => c.estado === "nuevo").length },
          { id: "en revisión", label: "En revisión",  count: CANDIDATOS.filter((c) => c.estado === "en revisión").length },
          { id: "entrevista",  label: "Entrevista",   count: CANDIDATOS.filter((c) => c.estado === "entrevista").length },
          { id: "guardado",    label: "Guardados",    count: CANDIDATOS.filter((c) => c.estado === "guardado").length },
          { id: "descartado",  label: "Descartados",  count: CANDIDATOS.filter((c) => c.estado === "descartado").length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select style={selectStyle} value={vacanteFilter} onChange={(e) => setVacanteFilter(e.target.value)}>
          <option value="todas">Todas las vacantes</option>
          {VACANTES.filter((v) => v.estado !== "borrador").map((v) => (
            <option key={v.id} value={v.puesto}>{v.puesto}</option>
          ))}
        </select>
        <select style={selectStyle} value={matchFilter} onChange={(e) => setMatchFilter(e.target.value)}>
          <option value="todos">Todos los match</option>
          <option value="alto">Match alto (≥80%)</option>
          <option value="medio">Match medio (65–79%)</option>
          <option value="bajo">Match bajo (&lt;65%)</option>
        </select>
      </div>

      {/* Candidates list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="card p-10 text-center">
            <div style={{ fontSize: 32, marginBottom: 12 }}>👥</div>
            <div className="font-bold text-ink mb-1" style={{ fontSize: 15 }}>No hay candidatos</div>
            <div className="text-sm text-ink-muted">Prueba ajustando los filtros</div>
          </div>
        ) : (
          filtered.map((c) => (
            <div key={c.id} className="card-hover p-5 px-[22px]">
              <div className="flex items-center gap-5">
                <Avatar name={c.nombre} size={40} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="font-extrabold text-ink" style={{ fontSize: 15, letterSpacing: "-0.02em" }}>
                      {c.nombre}
                    </span>
                    <Badge label={c.estado} color={ESTADO_COLOR[c.estado] ?? "neutral"} dot />
                    {c.verificado && <VerBadge label="Perfil verificado" verified />}
                  </div>
                  <div className="flex gap-4 text-sm text-ink-secondary">
                    <span>💼 {c.puesto}</span>
                    <span>📍 {c.ubicacion}</span>
                    <span>⏱ {c.experiencia}</span>
                    <span>✈️ {c.disponibilidad}</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {c.idiomas.map((l) => (
                      <span
                        key={l}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#F0EDE8", color: "#6B6560" }}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-8 items-center flex-shrink-0">
                  <div style={{ width: 120 }}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-ink-muted">Match</span>
                      <span
                        className="text-xs font-extrabold"
                        style={{ color: c.match >= 80 ? "#1F7A4D" : c.match >= 65 ? "#1A8080" : "#B5691A" }}
                      >
                        {c.match}%
                      </span>
                    </div>
                    <MatchBar score={c.match} />
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/candidatos/${c.id}`}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold no-underline"
                      style={{ background: "#C4683A", color: "#fff" }}
                    >
                      Ver perfil
                    </Link>
                    <Link
                      href="/dashboard/entrevistas"
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold no-underline"
                      style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                    >
                      Entrevista
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
