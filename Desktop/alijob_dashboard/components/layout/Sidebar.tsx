"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { DEMO_EMPRESA } from "@/data/mocks/dashboard";

const NAV_EMPRESA = [
  { href: "/dashboard",                    label: "Dashboard" },
  { href: "/dashboard/vacantes",           label: "Vacantes" },
  { href: "/dashboard/candidatos",         label: "Candidatos" },
  { href: "/dashboard/entrevistas",        label: "Entrevistas" },
  { href: "/dashboard/reputacion",         label: "Reputación" },
  { href: "/dashboard/perfil",             label: "Perfil de empresa" },
  { href: "/dashboard/verificaciones",     label: "Verificaciones" },
  { href: "/dashboard/notificaciones",     label: "Notificaciones" },
  { href: "/dashboard/configuracion",      label: "Configuración" },
];

const NAV_ADMIN = [
  { href: "/dashboard/admin",              label: "Dashboard Admin" },
  { href: "/dashboard/admin/empresas",     label: "Validar empresas" },
  { href: "/dashboard/admin/evidencias",   label: "Evidencias" },
  { href: "/dashboard/admin/moderacion",   label: "Moderación" },
  { href: "/dashboard/admin/reportes",     label: "Reportes" },
];

const EMPRESA_MENU = [
  { label: "Perfil de empresa", href: "/dashboard/perfil" },
  { label: "Configuración",     href: "/dashboard/configuracion" },
  { label: "Gestionar equipo",  href: "/dashboard/configuracion" },
];

const ADMIN_MENU = [
  { label: "Mi perfil",     href: "#" },
  { label: "Configuración", href: "/dashboard/configuracion" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = pathname.startsWith("/dashboard/admin");
  const nav = isAdmin ? NAV_ADMIN : NAV_EMPRESA;

  function isActive(href: string) {
    if (href === "/dashboard" && !isAdmin) return pathname === "/dashboard";
    if (href === "/dashboard/admin" && isAdmin) return pathname === "/dashboard/admin";
    return pathname.startsWith(href) && href !== "/dashboard" && href !== "/dashboard/admin";
  }

  const menuItems = isAdmin ? ADMIN_MENU : EMPRESA_MENU;

  return (
    <div
      className="flex flex-col h-screen flex-shrink-0"
      style={{
        width: 220,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        background: "#111010",
        borderRight: "1px solid #1E1C1A",
      }}
    >
      {/* Logo */}
      <div className="px-[18px] py-5 pb-4" style={{ borderBottom: "1px solid #1E1C1A" }}>
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>

      {/* Mode switcher */}
      <div className="px-3 py-2.5" style={{ borderBottom: "1px solid #1E1C1A" }}>
        <div
          className="flex rounded-md p-[3px] gap-0.5"
          style={{ background: "#1E1C1A" }}
        >
          {[
            { label: "Empresa", admin: false, href: "/dashboard" },
            { label: "Admin",   admin: true,  href: "/dashboard/admin" },
          ].map((m) => (
            <button
              key={m.label}
              onClick={() => router.push(m.href)}
              className="flex-1 py-[5px] rounded-[7px] border-none cursor-pointer font-sans transition-all duration-150 font-bold"
              style={{
                background: isAdmin === m.admin ? "#2C2A28" : "transparent",
                color: isAdmin === m.admin ? "#FFFFFF" : "#6B6058",
                fontSize: 11,
                letterSpacing: "0.01em",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {nav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 w-full px-[18px] py-[9px] text-sm no-underline transition-all duration-100"
              style={{
                background: active ? "#1E1C1A" : "transparent",
                color: active ? "#FFFFFF" : "#9A9088",
                fontWeight: active ? 700 : 400,
                borderLeft: `2px solid ${active ? "#C4683A" : "transparent"}`,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div style={{ borderTop: "1px solid #1E1C1A", position: "relative" }}>
        {menuOpen && (
          <>
            <div
              className="fixed inset-0"
              style={{ zIndex: 199 }}
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="absolute rounded-lg overflow-hidden"
              style={{
                bottom: "100%",
                left: 14,
                right: 14,
                marginBottom: 6,
                background: "#1E1C1A",
                border: "1px solid #2E2C2A",
                zIndex: 200,
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm font-medium no-underline transition-colors duration-100"
                  style={{ color: "#C8C0B8" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#2A2824")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px my-0.5" style={{ background: "#2A2824" }} />
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm font-medium no-underline transition-colors duration-100"
                style={{ color: "#E05C5C" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2A2824")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Cerrar sesión
              </Link>
            </div>
          </>
        )}

        <div
          className="flex items-center gap-2.5 px-3.5 py-3 mx-0 rounded-md cursor-pointer transition-colors duration-100 m-[12px_14px]"
          style={{ background: "#1A1816" }}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Avatar
            name={isAdmin ? "Admin AliJob" : DEMO_EMPRESA.nombre}
            size={30}
            color={isAdmin ? "#6B3FA0" : "#C4683A"}
          />
          <div className="flex-1 min-w-0">
            <div
              className="text-sm font-bold truncate"
              style={{ color: "#E0D8D0" }}
            >
              {isAdmin ? "Admin AliJob" : DEMO_EMPRESA.nombre}
            </div>
            <div className="text-2xs" style={{ color: "#5A5450" }}>
              {isAdmin ? "Moderador" : DEMO_EMPRESA.isla}
            </div>
          </div>
          <span
            className="text-sm transition-transform duration-200"
            style={{
              color: menuOpen ? "#9A9088" : "#5A5450",
              transform: menuOpen ? "rotate(90deg)" : "none",
            }}
          >
            ⋯
          </span>
        </div>
      </div>
    </div>
  );
}
