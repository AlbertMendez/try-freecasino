"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ENTREVISTAS } from "@/data/mocks/dashboard";

export default function EntrevistasPage() {
  const [tab, setTab] = useState("proximas");

  const proximas   = ENTREVISTAS.filter((e) => e.estado !== "completada");
  const completadas = ENTREVISTAS.filter((e) => e.estado === "completada");
  const lista = tab === "proximas" ? proximas : completadas;

  const TIPO_ICON: Record<string, string> = {
    Presencial: "🏢",
    Videollamada: "💻",
  };

  return (
    <div>
      <SectionHeader
        title="Entrevistas"
        subtitle="Gestiona y haz seguimiento de todas tus entrevistas"
      />

      <Tabs
        tabs={[
          { id: "proximas",   label: "Próximas",    count: proximas.length },
          { id: "completadas", label: "Completadas", count: completadas.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {lista.length === 0 ? (
        <div className="card p-10 text-center">
          <div style={{ fontSize: 32, marginBottom: 12 }}>🗓</div>
          <div className="font-bold text-ink mb-1" style={{ fontSize: 15 }}>No hay entrevistas</div>
          <div className="text-sm text-ink-muted">Aquí aparecerán cuando convocas a candidatos</div>
        </div>
      ) : (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {lista.map((e) => (
            <Link
              key={e.id}
              href={`/dashboard/entrevistas/${e.id}`}
              className="card-hover p-5 no-underline block"
            >
              <div className="flex justify-between items-start mb-3.5">
                <Badge
                  label={e.estado}
                  color={
                    e.estado === "confirmada" ? "green"
                    : e.estado === "completada" ? "neutral"
                    : "amber"
                  }
                  dot
                />
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "#F0EDE8", color: "#6B6560" }}
                >
                  {TIPO_ICON[e.tipo]} {e.tipo}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <Avatar name={e.candidato} size={36} />
                <div>
                  <div className="font-extrabold text-ink" style={{ fontSize: 14, letterSpacing: "-0.02em" }}>
                    {e.candidato}
                  </div>
                  <div className="text-sm text-ink-secondary mt-0.5">{e.puesto}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-base text-ink-secondary">
                <span>🕐</span>
                <span className="font-semibold text-ink">{e.fecha}</span>
              </div>

              {e.notas && (
                <p
                  className="text-sm text-ink-muted mt-3 mb-0 leading-relaxed line-clamp-2"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as any,
                  }}
                >
                  📝 {e.notas}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
