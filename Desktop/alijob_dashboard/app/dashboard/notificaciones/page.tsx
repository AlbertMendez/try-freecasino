"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NOTIFICACIONES } from "@/data/mocks/dashboard";

const FILTROS = [
  { id: "todas",      label: "Todas" },
  { id: "candidato",  label: "Candidatos" },
  { id: "entrevista", label: "Entrevistas" },
  { id: "reputacion", label: "Reputación" },
  { id: "evidencia",  label: "Evidencias" },
  { id: "vacante",    label: "Vacantes" },
];

export default function NotificacionesPage() {
  const [filtro, setFiltro] = useState("todas");
  const [leidas, setLeidas] = useState<Set<number>>(new Set());

  const lista = NOTIFICACIONES.filter((n) => filtro === "todas" || n.tipo === filtro);
  const unread = NOTIFICACIONES.filter((n) => !n.leida && !leidas.has(NOTIFICACIONES.indexOf(n))).length;

  const markAll = () => {
    setLeidas(new Set(NOTIFICACIONES.map((_, i) => i)));
  };

  return (
    <div>
      <SectionHeader
        title="Notificaciones"
        subtitle={`${unread} sin leer`}
        actions={
          unread > 0 ? (
            <button
              onClick={markAll}
              className="inline-flex items-center justify-center px-[18px] py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
              style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              Marcar todas como leídas
            </button>
          ) : null
        }
      />

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-5">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className="px-3.5 py-1.5 rounded-full text-sm font-semibold cursor-pointer font-sans transition-all duration-150 border"
            style={{
              background: filtro === f.id ? "#C4683A" : "#fff",
              borderColor: filtro === f.id ? "#C4683A" : "#E8E5DF",
              color: filtro === f.id ? "#fff" : "#6B6560",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="card">
        {lista.map((n, i) => {
          const idx = NOTIFICACIONES.indexOf(n);
          const isRead = n.leida || leidas.has(idx);
          return (
            <div
              key={i}
              className="flex items-start gap-4 px-6 py-4 cursor-pointer transition-all duration-150"
              style={{
                borderBottom: i < lista.length - 1 ? "1px solid #F0EDE8" : "none",
                background: isRead ? "transparent" : "rgba(196,104,58,0.03)",
              }}
              onClick={() => setLeidas((prev) => new Set([...prev, idx]))}
            >
              {/* Unread dot */}
              <div className="flex-shrink-0 flex items-center mt-1.5" style={{ width: 8 }}>
                {!isRead && (
                  <div className="w-2 h-2 rounded-full" style={{ background: "#C4683A" }} />
                )}
              </div>

              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: n.urgente ? "#FDF0EE" : "#F5F4F1", fontSize: 18 }}
              >
                {n.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-base"
                    style={{ color: "#1A1714", fontWeight: isRead ? 500 : 700 }}
                  >
                    {n.titulo}
                  </span>
                  {n.urgente && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "#FDF0EE", color: "#C0392B" }}
                    >
                      Urgente
                    </span>
                  )}
                </div>
                <div className="text-sm text-ink-secondary leading-relaxed">{n.desc}</div>
              </div>

              {/* Time */}
              <div className="flex-shrink-0 text-xs text-ink-muted">{n.tiempo}</div>
            </div>
          );
        })}

        {lista.length === 0 && (
          <div className="p-10 text-center">
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔔</div>
            <div className="font-bold text-ink mb-1" style={{ fontSize: 15 }}>Sin notificaciones</div>
            <div className="text-sm text-ink-muted">No hay notificaciones para este filtro</div>
          </div>
        )}
      </div>
    </div>
  );
}
