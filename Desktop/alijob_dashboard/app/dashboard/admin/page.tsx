import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ADMIN_EMPRESAS, ADMIN_EVIDENCIAS } from "@/data/mocks/dashboard";

const ADMIN_STATS = [
  { label: "Empresas pendientes", value: ADMIN_EMPRESAS.length, icon: "🏢", color: "#C4683A", href: "/dashboard/admin/empresas" },
  { label: "Evidencias activas",  value: ADMIN_EVIDENCIAS.length, icon: "📄", color: "#C0392B", href: "/dashboard/admin/evidencias" },
  { label: "Moderación pendiente", value: 3, icon: "🛡", color: "#B5691A", href: "/dashboard/admin/moderacion" },
  { label: "Empresas totales",    value: 38, icon: "✓", color: "#1F7A4D", href: "/dashboard/admin/reportes" },
];

const ACTIVIDAD = [
  { icon: "🏢", texto: "Grupo GastroCanarias solicitó acceso",       tiempo: "Hace 1h",   tipo: "empresa" },
  { icon: "📄", texto: "Nueva evidencia en Hotel Jardín del Teide",  tiempo: "Hace 2h",   tipo: "evidencia" },
  { icon: "⭐", texto: "Opinión nueva moderada · Hotel Atlántico",   tiempo: "Hace 3h",   tipo: "moderacion" },
  { icon: "✓",  texto: "Resort Playa Blanca verificado",             tiempo: "Ayer",       tipo: "empresa" },
  { icon: "🛡", texto: "Oferta con salario bajo el convenio marcada", tiempo: "Ayer",      tipo: "moderacion" },
  { icon: "📄", texto: "Restaurante La Terraza respondió evidencia", tiempo: "Hace 2 días", tipo: "evidencia" },
];

const TIPO_COLOR: Record<string, string> = {
  empresa: "#1A5FA0", evidencia: "#C0392B", moderacion: "#B5691A",
};

export default function AdminPage() {
  return (
    <div>
      <SectionHeader
        title="Panel de administración"
        subtitle="Visión global del estado de la plataforma AliJob"
      />

      {/* Metrics */}
      <div className="grid gap-3.5 mb-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {ADMIN_STATS.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="card p-5 no-underline block transition-all duration-150"
            style={{ borderLeft: `3px solid ${s.color}` }}
          >
            <div className="flex justify-between items-start mb-2">
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <span className="font-black" style={{ fontSize: 28, color: s.color, letterSpacing: "-0.04em" }}>{s.value}</span>
            </div>
            <div className="text-sm text-ink-secondary">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 320px" }}>
        {/* Activity feed */}
        <div className="card p-6">
          <div className="font-bold text-ink mb-4" style={{ fontSize: 14 }}>Actividad reciente</div>
          <div className="flex flex-col">
            {ACTIVIDAD.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 py-3"
                style={{ borderBottom: i < ACTIVIDAD.length - 1 ? "1px solid #F0EDE8" : "none" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#F5F4F1", fontSize: 16 }}
                >
                  {a.icon}
                </div>
                <div className="flex-1">
                  <div className="text-base text-ink">{a.texto}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-ink-muted">{a.tiempo}</span>
                    <span
                      className="text-xs font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: `${TIPO_COLOR[a.tipo]}15`, color: TIPO_COLOR[a.tipo] }}
                    >
                      {a.tipo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick access */}
        <div className="flex flex-col gap-3.5">
          <div className="card p-5">
            <div className="font-bold text-ink mb-3.5" style={{ fontSize: 14 }}>Accesos directos</div>
            {[
              ["🏢", "Validar empresas pendientes",   "/dashboard/admin/empresas",   ADMIN_EMPRESAS.length],
              ["📄", "Gestionar evidencias",           "/dashboard/admin/evidencias",  ADMIN_EVIDENCIAS.length],
              ["🛡", "Moderar opiniones",              "/dashboard/admin/moderacion",  3],
              ["📊", "Ver reportes",                   "/dashboard/admin/reportes",    0],
            ].map(([ic, label, href, count]) => (
              <Link
                key={label as string}
                href={href as string}
                className="flex items-center gap-2.5 py-3 no-underline"
                style={{ borderBottom: "1px solid #F0EDE8" }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{ic as string}</span>
                <span className="text-base font-medium text-ink flex-1">{label as string}</span>
                {(count as number) > 0 && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#FDF0EE", color: "#C0392B" }}
                  >
                    {count as number}
                  </span>
                )}
                <span className="text-ink-muted text-base">›</span>
              </Link>
            ))}
          </div>

          <div className="card p-5">
            <div className="font-bold text-ink mb-2" style={{ fontSize: 14 }}>Estado de la plataforma</div>
            {[
              ["Uptime", "99.97%",  "#1F7A4D"],
              ["Empresas activas", "38", "#1A8080"],
              ["Vacantes publicadas", "124", "#C4683A"],
            ].map(([l, v, c]) => (
              <div key={l as string} className="flex justify-between items-center py-2.5" style={{ borderBottom: "1px solid #F0EDE8" }}>
                <span className="text-base text-ink-secondary">{l as string}</span>
                <span className="font-extrabold text-base" style={{ color: c as string }}>{v as string}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
