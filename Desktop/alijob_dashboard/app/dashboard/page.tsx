import Link from "next/link";
import { MetricCard } from "@/components/ui/MetricCard";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { VerBadge } from "@/components/ui/VerBadge";
import { Button } from "@/components/ui/Button";
import { DEMO_STATS, VACANTES, ENTREVISTAS, CANDIDATOS } from "@/data/mocks/dashboard";

export default function DashboardPage() {
  const topVacantes = VACANTES.filter((v) => v.estado !== "borrador").slice(0, 5);
  const proximasEntrevistas = ENTREVISTAS.filter((e) => e.estado !== "completada").slice(0, 3);

  return (
    <div>
      {/* Welcome */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <h1 className="font-extrabold text-ink m-0" style={{ fontSize: 22, letterSpacing: "-0.03em" }}>
            Bienvenida, Hotel Atlántico 👋
          </h1>
          <p className="text-base text-ink-secondary mt-1 mb-0">
            Tienes tareas pendientes hoy — revisa tus candidatos y entrevistas
          </p>
        </div>
        <Link
          href="/dashboard/vacantes/nueva"
          className="inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-md text-base font-semibold no-underline"
          style={{ background: "#C4683A", color: "#fff", letterSpacing: "-0.01em" }}
        >
          + Nueva oferta
        </Link>
      </div>

      {/* Alerts */}
      <div className="flex flex-col gap-2.5 mb-6">
        <Alert
          type="warning"
          title="Evidencia pendiente de revisión"
          message="Un ex-empleado ha enviado una evidencia sobre condiciones laborales. Tienes 7 días para responder."
          action="Ver evidencia →"
          actionHref="/dashboard/verificaciones"
        />
        <Alert
          type="info"
          title="3 candidatos nuevos con match alto"
          message="Han aplicado a Jefe/a de sala · Costa Adeje. Match medio: 88%."
          action="Revisar →"
          actionHref="/dashboard/candidatos"
        />
      </div>

      {/* Metrics */}
      <div className="grid gap-3.5 mb-6" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <MetricCard label="Vacantes activas"  value={DEMO_STATS.vacantesActivas}  sub="2 pendientes de revisión"          icon="📋" accent trend={8} />
        <MetricCard label="Candidatos"        value={DEMO_STATS.candidatosTotal}  sub={`${DEMO_STATS.candidatosMatchAlto} con match alto`} icon="👥" trend={12} />
        <MetricCard label="Entrevistas"       value={DEMO_STATS.entrevistasPendientes} sub="5 esta semana"                 icon="🗓" accent />
        <MetricCard label="Reputación"        value={DEMO_STATS.reputacion}       sub={`de 5 · ${DEMO_STATS.numOpiniones} opiniones`}     icon="⭐" trend={2} />
      </div>

      {/* Two columns */}
      <div className="grid gap-5 mb-6" style={{ gridTemplateColumns: "1fr 360px" }}>
        {/* Vacantes table */}
        <div className="card p-5 pt-5">
          <div className="flex justify-between items-center mb-4">
            <div className="text-md font-bold text-ink">Rendimiento de vacantes</div>
            <Link href="/dashboard/vacantes" className="text-sm font-medium no-underline" style={{ color: "#C4683A" }}>
              Ver todas →
            </Link>
          </div>
          <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E5DF" }}>
                {["Puesto", "Estado", "Candidatos", "Match medio"].map((h) => (
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
              {topVacantes.map((v) => (
                <tr key={v.id} style={{ borderBottom: "1px solid #F0EDE8", cursor: "pointer" }}>
                  <td className="py-2.5 font-semibold text-ink">{v.puesto}</td>
                  <td className="py-2.5">
                    <Badge label={v.estado} color={v.estado === "activa" ? "green" : v.estado === "pausada" ? "amber" : "neutral"} dot />
                  </td>
                  <td className="py-2.5 text-ink-secondary">{v.candidatos}</td>
                  <td className="py-2.5">
                    {v.match > 0 && (
                      <div className="flex items-center gap-2" style={{ maxWidth: 120 }}>
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F0EDE8" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${v.match}%`, background: v.match >= 80 ? "#1F7A4D" : "#1A8080" }}
                          />
                        </div>
                        <span className="text-sm font-bold text-ink-secondary">{v.match}%</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-3.5">
          {/* Profile completeness */}
          <div className="card p-5">
            <div className="text-base font-bold text-ink mb-3.5">Perfil de empresa</div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-ink-secondary">Completado</span>
              <span className="text-base font-extrabold" style={{ color: "#C4683A" }}>82%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden mb-3.5" style={{ background: "#F0EDE8" }}>
              <div className="h-full rounded-full" style={{ width: "82%", background: "#C4683A" }} />
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                ["✓ Descripción",             true],
                ["✓ Logo subido",              true],
                ["✓ Convenio",                 true],
                ["○ Cultura organizacional",   false],
                ["○ Fotos del equipo",          false],
              ].map(([l, ok]) => (
                <div key={l as string} className="text-sm" style={{ color: ok ? "#1F7A4D" : "#9A9088" }}>
                  {l as string}
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/perfil"
              className="flex items-center justify-center w-full mt-3.5 py-[9px] rounded-md text-base font-semibold no-underline"
              style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              Completar perfil
            </Link>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <div className="text-base font-bold text-ink mb-3.5">Accesos rápidos</div>
            {[
              ["📋", "Publicar nueva oferta",  "/dashboard/vacantes/nueva"],
              ["👥", "Ver candidatos",          "/dashboard/candidatos"],
              ["🗓", "Ver entrevistas",          "/dashboard/entrevistas"],
              ["⭐", "Gestionar reputación",    "/dashboard/reputacion"],
            ].map(([ic, l, href]) => (
              <Link
                key={l as string}
                href={href as string}
                className="flex items-center gap-2.5 w-full py-2.5 no-underline"
                style={{ borderBottom: "1px solid #F0EDE8" }}
              >
                <span className="text-base">{ic as string}</span>
                <span className="text-base font-medium text-ink flex-1">{l as string}</span>
                <span className="text-ink-muted">›</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming interviews */}
      <div className="card p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="text-md font-bold text-ink">Entrevistas próximas</div>
          <Link href="/dashboard/entrevistas" className="text-sm font-medium no-underline" style={{ color: "#C4683A" }}>
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {proximasEntrevistas.map((e) => (
            <Link
              key={e.id}
              href={`/dashboard/entrevistas/${e.id}`}
              className="p-4 rounded-md no-underline transition-all duration-150"
              style={{ border: "1px solid #E8E5DF", display: "block" }}
            >
              <div className="flex justify-between mb-2">
                <Badge label={e.estado} color={e.estado === "confirmada" ? "green" : "amber"} dot />
                <span className="text-xs text-ink-muted">{e.fecha}</span>
              </div>
              <div className="font-bold text-base text-ink">{e.candidato}</div>
              <div className="text-sm text-ink-secondary mt-0.5">{e.puesto}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
