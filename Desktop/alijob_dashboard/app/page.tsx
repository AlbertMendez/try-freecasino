import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const FEATURES = [
  { icon: "📋", title: "Vacantes con salario verificado",  desc: "Sin rangos ambiguos. El candidato ve exactamente lo que cobra." },
  { icon: "🎯", title: "Match explicado",                  desc: "Sabe por qué un candidato encaja, no solo el porcentaje." },
  { icon: "⭐", title: "Reputación laboral real",          desc: "Opiniones verificadas con evidencia. Confianza auténtica." },
];

const NAV = [
  { href: "/producto", label: "Producto" },
  { href: "/precios",  label: "Precios" },
  { href: "/casos",    label: "Casos de éxito" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans" style={{ color: "#0C1528" }}>
      {/* HEADER */}
      <header
        className="flex items-center justify-between px-12 sticky top-0 z-[100] bg-white"
        style={{ height: 64, borderBottom: "1px solid #DCE6F0", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        <Link href="/" className="no-underline">
          <Logo variant="light" />
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 rounded-md text-sm font-medium no-underline transition-all duration-150"
              style={{ color: "#5A7090" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2.5">
          <Link
            href="/login"
            className="px-5 py-2 rounded-md text-sm font-semibold no-underline transition-all duration-150"
            style={{ border: "1px solid #B0C4D8", color: "#0C1528" }}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="px-5 py-2 rounded-md text-sm font-bold no-underline"
            style={{ background: "#C4683A", color: "#fff" }}
          >
            Solicitar acceso
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative px-12 py-24 text-center overflow-hidden"
        style={{ paddingTop: 100, paddingBottom: 80 }}
      >
        <div className="landing-hero-gradient absolute inset-0 pointer-events-none" />
        <div className="relative max-w-[800px] mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-9"
            style={{ background: "rgba(26,95,160,0.08)", border: "1px solid rgba(26,95,160,0.15)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#1A5FA0" }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1A5FA0", letterSpacing: "0.06em" }}>
              Beta abierta · Canarias
            </span>
          </div>

          <h1
            className="font-black leading-none mb-8 mt-0"
            style={{ fontSize: 52, letterSpacing: "-0.04em", lineHeight: 1.15, color: "#0C1528" }}
          >
            El panel de <span style={{ color: "#1A5FA0" }}>empresa</span>
            <br />que tus candidatos
            <br />merecen ver
          </h1>

          <p className="mx-auto mt-0 mb-10" style={{ fontSize: 17, color: "#5A7090", maxWidth: 520, lineHeight: 1.65 }}>
            Publica ofertas con salario real, gestiona candidatos con match explicado y construye reputación laboral verificada.
          </p>

          <div className="flex gap-3 justify-center flex-wrap mb-5">
            <Link
              href="/registro"
              className="px-8 py-3.5 rounded-md text-md font-bold no-underline"
              style={{ background: "#C4683A", color: "#fff" }}
            >
              Solicitar acceso gratuito →
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3.5 rounded-md text-md font-semibold no-underline transition-all duration-150"
              style={{ border: "1px solid #B0C4D8", color: "#3A5070" }}
            >
              Entrar en modo demo
            </Link>
          </div>

          <p className="text-sm m-0" style={{ color: "#607896" }}>
            Ya confían en AliJob · Hotel Atlántico · Grupo GastroCanarias · Resort Volcán
          </p>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="px-12 pb-16">
        <div
          className="max-w-[900px] mx-auto rounded-xl overflow-hidden"
          style={{
            border: "1px solid #DCE6F0",
            boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-1.5 px-5 py-2.5"
            style={{ background: "#EDF1F8", borderBottom: "1px solid #D8E2EF" }}
          >
            {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
            <span className="text-xs ml-2" style={{ color: "#5A7090" }}>
              alijob.es/empresas/dashboard
            </span>
          </div>
          {/* Mini dashboard */}
          <div className="flex gap-5 p-6" style={{ background: "#F4F7FB" }}>
            {/* Fake sidebar icons */}
            <div className="flex flex-col gap-2 pt-1">
              {["⬡", "📋", "👥", "🗓", "⭐"].map((ic, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: i === 0 ? "#E8EEF6" : "transparent", opacity: i === 0 ? 1 : 0.4 }}
                >
                  {ic}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-4 gap-2.5 mb-4">
                {[["6", "Vacantes activas"], ["128", "Candidatos"], ["14", "Entrevistas"], ["4.3", "Reputación"]].map(([v, l]) => (
                  <div
                    key={l}
                    className="rounded-[10px] p-3"
                    style={{ background: "#E8EEF6", border: "1px solid #DCE6F0" }}
                  >
                    <div className="font-extrabold" style={{ fontSize: 20, color: "#0C1528", letterSpacing: "-0.03em" }}>{v}</div>
                    <div className="text-xs mt-1" style={{ color: "#5A7090" }}>{l}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-[10px] p-3.5" style={{ background: "#E8EEF6", border: "1px solid #DCE6F0" }}>
                <div className="text-xs font-bold uppercase tracking-wide mb-2.5" style={{ color: "#5A7090", letterSpacing: "0.04em" }}>
                  Candidatos recientes
                </div>
                {[["María G.", "Camarera de sala", 92], ["Alejandro R.", "Recepcionista", 85], ["Carmen V.", "Cocinera", 78]].map(([n, r, m]) => (
                  <div
                    key={n as string}
                    className="flex items-center gap-2.5 py-1.5"
                    style={{ borderBottom: "1px solid #D8E2EF" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ background: "#C4683A", fontSize: 9 }}
                    >
                      {(n as string)[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold" style={{ fontSize: 11, color: "#0C1528" }}>{n as string}</div>
                      <div style={{ fontSize: 10, color: "#5A7090" }}>{r as string}</div>
                    </div>
                    <div
                      className="font-extrabold"
                      style={{ fontSize: 11, color: (m as number) >= 85 ? "#1F7A4D" : "#B5691A" }}
                    >
                      {m as number}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-12 py-16" style={{ background: "#F0F4FA" }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-7"
                style={{ background: "#FFFFFF", border: "1px solid #DCE6F0" }}
              >
                <div className="text-3xl mb-3.5">{f.icon}</div>
                <div className="font-extrabold mb-2" style={{ fontSize: 15, color: "#0C1528", letterSpacing: "-0.02em" }}>
                  {f.title}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "#5A7090", lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="flex justify-between items-center px-12 py-4"
        style={{ borderTop: "1px solid #D8E2EF", background: "#F0F4FA" }}
      >
        <span className="text-sm" style={{ color: "#5A7090" }}>© 2025 AliJob — Canarias</span>
        <a href="#" className="text-sm no-underline" style={{ color: "#607896" }}>
          ¿Eres candidato? Descarga AliJob Mobile →
        </a>
      </footer>
    </div>
  );
}
