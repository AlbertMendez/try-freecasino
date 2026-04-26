"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  setTimeout(onDone, 2200);
  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-lg font-semibold text-white text-base z-50"
      style={{ background: "#1F7A4D", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      ✓ {msg}
    </div>
  );
}

const TABS = [
  { id: "cuenta",        label: "Cuenta" },
  { id: "equipo",        label: "Equipo" },
  { id: "notificaciones", label: "Notificaciones" },
  { id: "seguridad",     label: "Seguridad" },
  { id: "facturacion",   label: "Facturación" },
];

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 10,
  border: "1px solid #E8E5DF",
  fontSize: 13,
  color: "#1A1714",
  background: "#FDFCFA",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box" as const,
};

function FieldLabel({ children }: { children: string }) {
  return <label className="text-base font-semibold text-ink block mb-1.5">{children}</label>;
}

function SaveBtn({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={onSave}
        className="px-5 py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
        style={{ background: "#C4683A", color: "#fff" }}
      >
        Guardar cambios
      </button>
    </div>
  );
}

const MIEMBROS_INIT = [
  { nombre: "Laura Pérez",       email: "laura@hotelatlantico.com",  rol: "Admin",    ultimo: "Hoy" },
  { nombre: "Carlos Ruiz",       email: "carlos@hotelatlantico.com", rol: "RRHH",     ultimo: "Ayer" },
  { nombre: "Sofía Domínguez",   email: "sofia@hotelatlantico.com",  rol: "Revisor",  ultimo: "Hace 3 días" },
];

const NOTIF_OPTIONS = [
  { id: "nuevos_candidatos",  label: "Nuevos candidatos con match alto",   email: true,  push: true  },
  { id: "entrevistas",        label: "Recordatorios de entrevistas",        email: true,  push: true  },
  { id: "reputacion",         label: "Nuevas opiniones de reputación",      email: true,  push: false },
  { id: "evidencias",         label: "Evidencias nuevas o pendientes",      email: true,  push: true  },
  { id: "vacantes",           label: "Alertas de revisión de vacantes",     email: false, push: false },
  { id: "resumen_semanal",    label: "Resumen semanal de actividad",        email: true,  push: false },
];

export default function ConfiguracionPage() {
  const router = useRouter();
  const [tab, setTab] = useState("cuenta");
  const [toast, setToast] = useState<string | null>(null);
  const [miembros, setMiembros] = useState(MIEMBROS_INIT);
  const [invitarEmail, setInvitarEmail] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [notifs, setNotifs] = useState(
    Object.fromEntries(NOTIF_OPTIONS.map((n) => [n.id, { email: n.email, push: n.push }]))
  );

  const toggleNotif = (id: string, channel: "email" | "push") => {
    setNotifs((p) => ({ ...p, [id]: { ...p[id], [channel]: !p[id][channel] } }));
  };

  const handleSave = (section: string) => setToast(`${section} guardado correctamente`);

  const handleRemoveMember = (email: string) => {
    setMiembros((prev) => prev.filter((m) => m.email !== email));
    setToast("Miembro eliminado");
  };

  const handleInvite = () => {
    if (!invitarEmail.includes("@")) return;
    setMiembros((prev) => [...prev, { nombre: invitarEmail.split("@")[0], email: invitarEmail, rol: "Revisor", ultimo: "Nunca" }]);
    setInvitarEmail("");
    setShowInvite(false);
    setToast("Invitación enviada a " + invitarEmail);
  };

  return (
    <div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      <SectionHeader title="Configuración" subtitle="Gestiona tu cuenta y preferencias" />

      {/* Tab bar */}
      <div className="flex gap-0 border-b mb-6" style={{ borderColor: "#E8E5DF" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-2.5 text-base font-semibold border-none cursor-pointer bg-transparent font-sans transition-all duration-150"
            style={{
              color: tab === t.id ? "#C4683A" : "#9A9088",
              borderBottom: tab === t.id ? "2px solid #C4683A" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cuenta */}
      {tab === "cuenta" && (
        <div className="card p-7 flex flex-col gap-[18px]" style={{ maxWidth: 560 }}>
          <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Datos de contacto</div>
          <div>
            <FieldLabel>Nombre de contacto</FieldLabel>
            <input style={inputStyle} defaultValue="Laura Pérez" />
          </div>
          <div>
            <FieldLabel>Email de acceso</FieldLabel>
            <input style={inputStyle} defaultValue="laura@hotelatlantico.com" type="email" />
          </div>
          <div>
            <FieldLabel>Teléfono</FieldLabel>
            <input style={inputStyle} defaultValue="+34 922 456 789" type="tel" />
          </div>
          <div>
            <FieldLabel>Idioma del panel</FieldLabel>
            <select style={{ ...inputStyle, cursor: "pointer" }} defaultValue="Español">
              {["Español", "English"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <SaveBtn onSave={() => handleSave("Cuenta")} />
        </div>
      )}

      {/* Equipo */}
      {tab === "equipo" && (
        <div className="flex flex-col gap-4">
          <div className="card">
            {miembros.map((m, i) => (
              <div
                key={m.email}
                className="flex items-center gap-4 px-6 py-4"
                style={{ borderBottom: i < miembros.length - 1 ? "1px solid #F0EDE8" : "none" }}
              >
                <Avatar name={m.nombre} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink text-base">{m.nombre}</div>
                  <div className="text-sm text-ink-muted">{m.email}</div>
                </div>
                <Badge
                  label={m.rol}
                  color={m.rol === "Admin" ? "accent" : m.rol === "RRHH" ? "teal" : "neutral"}
                />
                <span className="text-xs text-ink-muted flex-shrink-0">Último acceso: {m.ultimo}</span>
                {m.rol !== "Admin" && (
                  <button
                    onClick={() => handleRemoveMember(m.email)}
                    className="text-xs cursor-pointer bg-transparent border-none font-sans"
                    style={{ color: "#C0392B" }}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>

          {showInvite ? (
            <div className="card p-5 flex gap-3 items-end" style={{ maxWidth: 480 }}>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-ink mb-1.5">Email del nuevo miembro</label>
                <input
                  style={{ ...inputStyle, margin: 0 }}
                  type="email"
                  placeholder="nombre@empresa.com"
                  value={invitarEmail}
                  onChange={(e) => setInvitarEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleInvite()}
                />
              </div>
              <button
                onClick={handleInvite}
                className="px-4 py-[9px] rounded-md text-base font-semibold border-none cursor-pointer font-sans"
                style={{ background: "#C4683A", color: "#fff", whiteSpace: "nowrap" }}
              >
                Enviar invitación
              </button>
              <button
                onClick={() => setShowInvite(false)}
                className="px-3 py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
                style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowInvite(true)}
              className="self-start px-5 py-[9px] rounded-md text-base font-semibold cursor-pointer font-sans"
              style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#1A1714", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              + Invitar miembro
            </button>
          )}
        </div>
      )}

      {/* Notificaciones */}
      {tab === "notificaciones" && (
        <div className="card" style={{ maxWidth: 640 }}>
          <div className="px-6 py-4" style={{ borderBottom: "1px solid #F0EDE8" }}>
            <div className="grid text-xs font-bold uppercase tracking-wider text-ink-muted" style={{ gridTemplateColumns: "1fr 80px 80px", letterSpacing: "0.05em" }}>
              <span>Tipo de notificación</span>
              <span className="text-center">Email</span>
              <span className="text-center">Push</span>
            </div>
          </div>
          {NOTIF_OPTIONS.map((n, i) => (
            <div
              key={n.id}
              className="grid items-center px-6 py-4"
              style={{ gridTemplateColumns: "1fr 80px 80px", borderBottom: i < NOTIF_OPTIONS.length - 1 ? "1px solid #F0EDE8" : "none" }}
            >
              <span className="text-base text-ink">{n.label}</span>
              {(["email", "push"] as const).map((ch) => (
                <div key={ch} className="flex justify-center">
                  <div
                    onClick={() => toggleNotif(n.id, ch)}
                    className="w-9 h-5 rounded-full cursor-pointer transition-all duration-200 relative flex-shrink-0"
                    style={{
                      background: notifs[n.id][ch] ? "#C4683A" : "#D0CBC4",
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                      style={{ left: notifs[n.id][ch] ? "calc(100% - 18px)" : 2, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Seguridad */}
      {tab === "seguridad" && (
        <div className="flex flex-col gap-4" style={{ maxWidth: 560 }}>
          <div className="card p-7 flex flex-col gap-[18px]">
            <div className="font-extrabold text-ink mb-1" style={{ fontSize: 15 }}>Cambiar contraseña</div>
            <div>
              <FieldLabel>Contraseña actual</FieldLabel>
              <input style={inputStyle} type="password" placeholder="••••••••" />
            </div>
            <div>
              <FieldLabel>Nueva contraseña</FieldLabel>
              <input style={inputStyle} type="password" placeholder="••••••••" />
            </div>
            <div>
              <FieldLabel>Confirmar nueva contraseña</FieldLabel>
              <input style={inputStyle} type="password" placeholder="••••••••" />
            </div>
            <SaveBtn onSave={() => handleSave("Contraseña")} />
          </div>
          <div className="card p-7">
            <div className="font-extrabold text-ink mb-3" style={{ fontSize: 15 }}>Sesiones activas</div>
            {[
              { device: "MacBook Pro · Safari", ip: "88.25.xxx.xxx", active: true },
              { device: "iPhone 14 · Safari",   ip: "88.25.xxx.xxx", active: false },
            ].map((s) => (
              <div key={s.device} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid #F0EDE8" }}>
                <div>
                  <div className="text-base font-semibold text-ink">{s.device}</div>
                  <div className="text-sm text-ink-muted">{s.ip}</div>
                </div>
                <div className="flex items-center gap-3">
                  {s.active && <Badge label="activa" color="green" dot />}
                  {!s.active && (
                    <button
                      onClick={() => setToast("Sesión cerrada en " + s.device)}
                      className="text-xs font-medium cursor-pointer bg-transparent border-none font-sans"
                      style={{ color: "#C0392B" }}
                    >
                      Cerrar sesión
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facturación */}
      {tab === "facturacion" && (
        <div className="flex flex-col gap-4">
          <Alert
            type="info"
            title="Plan Beta gratuito activo"
            message="Durante el período beta, AliJob es completamente gratuito. Te avisaremos antes de que cambie."
          />
          <div className="card p-7" style={{ maxWidth: 560 }}>
            <div className="font-extrabold text-ink mb-4" style={{ fontSize: 15 }}>Plan actual</div>
            <div className="flex items-center justify-between p-4 rounded-lg mb-5" style={{ background: "rgba(196,104,58,0.06)", border: "1px solid rgba(196,104,58,0.25)" }}>
              <div>
                <div className="font-bold text-ink" style={{ fontSize: 16 }}>Beta gratuita</div>
                <div className="text-sm text-ink-secondary mt-0.5">Vacantes ilimitadas · Candidatos ilimitados</div>
              </div>
              <Badge label="Activo" color="green" dot />
            </div>
            <div className="font-bold text-ink mb-3" style={{ fontSize: 13 }}>Planes disponibles próximamente</div>
            {[
              { name: "Starter",      price: "49€/mes",  features: "Hasta 5 vacantes · 3 usuarios" },
              { name: "Hotel/Grupo",  price: "149€/mes", features: "Ilimitado · API · Gestor dedicado" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid #F0EDE8" }}>
                <div>
                  <div className="font-semibold text-ink text-base">{p.name}</div>
                  <div className="text-sm text-ink-muted">{p.features}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-base text-ink">{p.price}</span>
                  <button
                    onClick={() => setToast(`Apuntado a la lista de ${p.name}`)}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer font-sans"
                    style={{ background: "#fff", border: "1px solid #E8E5DF", color: "#6B6560" }}
                  >
                    Apuntarse
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
