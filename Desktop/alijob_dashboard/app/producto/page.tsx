import Link from "next/link";
import { LandingLayout } from "@/components/layout/LandingLayout";

const FEATURES = [
  { icon: "📋", title: "Vacantes con salario verificado",   desc: "Publica ofertas con el salario real y el convenio declarado. Sin rangos ambiguos. Los candidatos aplican sabiendo exactamente qué ganarán." },
  { icon: "🎯", title: "Match explicado por IA",             desc: "Cada candidato llega con un score de encaje desglosado por criterio: experiencia, idiomas, disponibilidad, ubicación y titulación." },
  { icon: "🗓", title: "Gestión de entrevistas integrada",   desc: "Agenda, confirma y haz seguimiento de todas las entrevistas desde el mismo panel. Con checklist y notas internas." },
  { icon: "⭐", title: "Reputación laboral verificada",      desc: "Las opiniones de tus empleados son contrastadas con evidencia real. Nada de comentarios anónimos sin control." },
  { icon: "✓",  title: "Verificaciones de empresa",          desc: "Certifica tu identidad, email, ubicación, salario y convenio. Las empresas verificadas reciben hasta 3x más candidatos." },
  { icon: "🏢", title: "Perfil de empresa completo",         desc: "Muestra tu cultura, equipo, beneficios y valores. Los candidatos elegirán tu oferta porque confían en ti." },
];

export default function ProductoPage() {
  return (
    <LandingLayout active="/producto">
      <div className="max-w-[960px] mx-auto px-12 py-16">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(26,95,160,0.08)", border: "1px solid rgba(26,95,160,0.15)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#1A5FA0" }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1A5FA0", letterSpacing: "0.06em" }}>Plataforma completa</span>
          </div>
          <h1 className="font-black m-0 mb-4 leading-tight" style={{ fontSize: 40, letterSpacing: "-0.04em", color: "#0C1528" }}>
            Todo lo que necesitas<br /><span style={{ color: "#1A5FA0" }}>para contratar mejor</span>
          </h1>
          <p className="mx-auto mt-0 text-md" style={{ color: "#607896", maxWidth: 520, lineHeight: 1.7 }}>
            AliJob Empresas no es un portal de empleo genérico. Es una plataforma diseñada para hostelería y turismo en Canarias, con transparencia como base.
          </p>
        </div>

        <div className="grid gap-5 mb-12" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl p-6" style={{ background: "#F4F7FB", border: "1px solid #DCE6F0" }}>
              <div className="text-3xl mb-3.5">{f.icon}</div>
              <div className="font-extrabold mb-2" style={{ fontSize: 15, color: "#0C1528", letterSpacing: "-0.02em" }}>{f.title}</div>
              <div className="text-sm leading-relaxed" style={{ color: "#5A7090", lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/registro"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-md text-md font-bold no-underline"
            style={{ background: "#C4683A", color: "#fff" }}
          >
            Solicitar acceso gratuito →
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
}
