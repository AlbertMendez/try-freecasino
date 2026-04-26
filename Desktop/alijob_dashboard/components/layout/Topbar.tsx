"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOTIFICACIONES } from "@/data/mocks/dashboard";

const PAGE_LABELS: Record<string, string> = {
  "/dashboard":                      "Dashboard",
  "/dashboard/vacantes":             "Vacantes",
  "/dashboard/vacantes/nueva":       "Crear nueva oferta",
  "/dashboard/candidatos":           "Candidatos",
  "/dashboard/entrevistas":          "Entrevistas",
  "/dashboard/reputacion":           "Reputación",
  "/dashboard/perfil":               "Perfil de empresa",
  "/dashboard/verificaciones":       "Verificaciones",
  "/dashboard/notificaciones":       "Notificaciones",
  "/dashboard/configuracion":        "Configuración",
  "/dashboard/admin":                "Dashboard Admin",
  "/dashboard/admin/empresas":       "Validar empresas",
  "/dashboard/admin/evidencias":     "Evidencias",
  "/dashboard/admin/moderacion":     "Moderación",
  "/dashboard/admin/reportes":       "Reportes",
};

export function Topbar() {
  const pathname = usePathname();
  const label = PAGE_LABELS[pathname] || "Dashboard";
  const unread = NOTIFICACIONES.filter((n) => !n.leida).length;

  return (
    <div
      className="flex items-center px-6 gap-4 sticky top-0 z-50 bg-card"
      style={{ height: 56, borderBottom: "1px solid #E8E5DF" }}
    >
      {/* Breadcrumb */}
      <div className="flex-1 flex items-center gap-2">
        <span className="text-base font-medium" style={{ color: "#9A9088" }}>
          AliJob Empresas
        </span>
        <span style={{ color: "#E8E5DF" }}>›</span>
        <span className="text-base font-bold text-ink">{label}</span>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <span
          className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "#9A9088", fontSize: 13 }}
        >
          🔍
        </span>
        <input
          placeholder="Buscar candidatos, ofertas…"
          className="h-9 pl-8 pr-3.5 rounded-md text-sm text-ink placeholder:text-ink-muted outline-none"
          style={{
            width: 220,
            border: "1px solid #E8E5DF",
            background: "#F5F4F1",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Notifications */}
      <Link
        href="/dashboard/notificaciones"
        className="relative flex items-center justify-center rounded-md no-underline"
        style={{
          width: 36,
          height: 36,
          background: "#F5F4F1",
          border: "1px solid #E8E5DF",
          fontSize: 16,
        }}
      >
        🔔
        {unread > 0 && (
          <span
            className="absolute flex items-center justify-center text-white font-extrabold rounded-full"
            style={{
              top: -4,
              right: -4,
              width: 16,
              height: 16,
              background: "#C4683A",
              fontSize: 10,
              lineHeight: 1,
            }}
          >
            {unread}
          </span>
        )}
      </Link>
    </div>
  );
}
