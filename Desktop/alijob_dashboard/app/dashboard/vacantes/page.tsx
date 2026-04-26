"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { VerBadge } from "@/components/ui/VerBadge";
import { Tabs } from "@/components/ui/Tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VACANTES } from "@/data/mocks/dashboard";

const ESTADO_COLOR: Record<string, "green" | "amber" | "neutral"> = {
  activa: "green", pausada: "amber", cerrada: "neutral", borrador: "neutral",
};

export default function VacantesPage() {
  const [tab, setTab] = useState("todas");

  const filtered = tab === "todas" ? VACANTES : VACANTES.filter((v) => v.estado === tab);

  return (
    <div>
      <SectionHeader
        title="Vacantes"
        subtitle="Gestiona todas tus ofertas de empleo publicadas"
        actions={
          <Link
            href="/dashboard/vacantes/nueva"
            className="inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-md text-base font-semibold no-underline"
            style={{ background: "#C4683A", color: "#fff", letterSpacing: "-0.01em" }}
          >
            + Nueva oferta
          </Link>
        }
      />

      <Tabs
        tabs={[
          { id: "todas",    label: "Todas",      count: VACANTES.length },
          { id: "activa",   label: "Activas",    count: VACANTES.filter((v) => v.estado === "activa").length },
          { id: "pausada",  label: "Pausadas",   count: VACANTES.filter((v) => v.estado === "pausada").length },
          { id: "borrador", label: "Borradores", count: VACANTES.filter((v) => v.estado === "borrador").length },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div className="flex flex-col gap-3">
        {filtered.map((v) => (
          <div key={v.id} className="card-hover p-5 px-[22px]">
            <div className="flex items-center gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="font-extrabold text-ink" style={{ fontSize: 15, letterSpacing: "-0.02em" }}>
                    {v.puesto}
                  </span>
                  <Badge label={v.estado} color={ESTADO_COLOR[v.estado]} dot />
                  <VerBadge label="Salario verificado" verified={v.estado !== "borrador"} />
                </div>
                <div className="flex gap-4 text-sm text-ink-secondary">
                  <span>📍 {v.ubicacion}</span>
                  <span>💼 {v.contrato}</span>
                  <span>💰 {v.salario}</span>
                  <span>🕐 {v.publicada}</span>
                </div>
              </div>

              <div className="flex gap-8 items-center flex-shrink-0">
                <div className="text-center">
                  <div className="font-extrabold text-ink" style={{ fontSize: 22, letterSpacing: "-0.03em" }}>{v.candidatos}</div>
                  <div className="text-xs text-ink-muted">candidatos</div>
                </div>
                {v.match > 0 && (
                  <div className="text-center">
                    <div
                      className="font-extrabold"
                      style={{ fontSize: 22, letterSpacing: "-0.03em", color: v.match >= 80 ? "#1F7A4D" : "#1A8080" }}
                    >
                      {v.match}%
                    </div>
                    <div className="text-xs text-ink-muted">match medio</div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Link
                    href="/dashboard/candidatos"
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold no-underline"
                    style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  >
                    Candidatos
                  </Link>
                  <Link
                    href={`/dashboard/vacantes/${v.id}/editar`}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium no-underline bg-transparent"
                    style={{ color: "#6B6560" }}
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
