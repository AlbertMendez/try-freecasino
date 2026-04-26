# Handoff: AliJob Empresas — Panel web para empresas

## Overview

AliJob Empresas es el dashboard web B2B de la plataforma AliJob, una plataforma de empleo centrada en hostelería y turismo en Canarias. Este panel permite a las empresas publicar ofertas con salario verificado, gestionar candidatos con match explicado, organizar entrevistas y construir reputación laboral verificada.

Producto separado de AliJob Mobile (app para candidatos) y AliJob Admin (moderación interna). Este handoff cubre AliJob Empresas y AliJob Admin.

---

## Sobre los archivos de diseño

Los archivos HTML en este paquete son **prototipos de alta fidelidad creados como referencias de diseño** — no son código de producción listo para copiar. La tarea del desarrollador es **recrear estos diseños en el stack del proyecto** (Next.js + TypeScript + Tailwind CSS) respetando los patrones, componentes y convenciones ya establecidos en el codebase.

Si el codebase ya tiene un sistema de diseño o componentes UI (shadcn/ui, Radix, etc.), úsalos como base y adapta los valores de diseño de este handoff.

---

## Fidelidad

**Alta fidelidad (hifi)** — Los prototipos incluyen colores exactos, tipografía, espaciado, sombras, bordes, estados hover/active, y copy final en español. El objetivo es recrear la UI con fidelidad píxel usando el sistema de diseño del codebase.

---

## Stack recomendado

```
Next.js 14+ (App Router)
TypeScript
Tailwind CSS
shadcn/ui (componentes base)
Lucide React (iconos)
date-fns (fechas)
```

---

## Arquitectura de producto

```
AliJob Mobile     → App móvil para candidatos (fuera de este handoff)
AliJob Empresas   → Dashboard web para empresas (ESTE handoff)
AliJob Admin      → Panel interno de moderación (incluido en este handoff)
```

El panel tiene dos modos de navegación: **Empresa** y **Admin**, conmutables desde la sidebar.

---

## Design Tokens

### Colores

```typescript
// tokens.ts
export const colors = {
  // Base
  pageBg: '#F5F4F1',       // Fondo general del app
  cardBg: '#FFFFFF',       // Fondo de cards
  border: '#E8E5DF',       // Bordes estándar
  borderLight: '#F0EDE8',  // Bordes sutiles

  // Texto
  textPrimary: '#1A1714',
  textSecondary: '#6B6560',
  textMuted: '#9A9088',

  // Sidebar
  sidebarBg: '#111010',
  sidebarText: '#9A9088',
  sidebarActive: '#FFFFFF',
  sidebarBorder: '#1E1C1A',

  // Acento principal — Terracota volcánico
  accent: '#C4683A',
  accentLight: '#FDF0EB',
  accentHover: '#B05A2E',

  // Secundario — Atlántico teal
  teal: '#1A8080',
  tealLight: '#E8F5F5',

  // Estados semánticos
  green: '#1F7A4D',
  greenLight: '#E8F5EE',
  amber: '#B5691A',
  amberLight: '#FDF4E7',
  red: '#C0392B',
  redLight: '#FDF0EE',
  purple: '#6B3FA0',
  purpleLight: '#F3EEF9',
  blue: '#1A5FA0',
  blueLight: '#EBF2FC',

  // Landing (fondo claro)
  landingBg: '#FFFFFF',
  landingAccent: '#1A5FA0',
  landingCardBg: '#F4F7FB',
  landingBorder: '#DCE6F0',
}
```

### Tipografía

```typescript
// Font: Plus Jakarta Sans (Google Fonts)
// Pesos: 400, 500, 600, 700, 800, 900

export const typography = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  sizes: {
    xs: '10px',
    sm: '11px',
    base: '12px',
    md: '13px',
    lg: '14px',
    xl: '15px',
    '2xl': '17px',
    h3: '18px',
    h2: '20px',
    h1: '22px',
    display: '52px',
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  tracking: {
    tight: '-0.03em',
    tighter: '-0.04em',
    wide: '0.04em',
    wider: '0.06em',
    caps: '0.08em',
  },
}
```

### Espaciado y radio

```typescript
export const spacing = {
  pagePadding: '28px',
  cardPadding: '20px 22px',
  cardPaddingLg: '24px 28px',
  sidebarWidth: '220px',
  topbarHeight: '56px',
}

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  full: '9999px',
}
```

### Sombras

```typescript
export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)',
  lg: '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
}
```

---

## Layout del dashboard

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (220px fija, dark #111010)                  │
│ ┌──────────────────────────────────────────────┐    │
│ │ Logo AliJob Empresas                         │    │
│ │ Mode switcher: [Empresa] [Admin]             │    │
│ │                                              │    │
│ │ Nav items (icon + label)                     │    │
│ │  ● Dashboard         (activo = borde left)   │    │
│ │  ○ Vacantes                                  │    │
│ │  ○ Candidatos                                │    │
│ │  ○ Entrevistas                               │    │
│ │  ○ Reputación                                │    │
│ │  ○ Perfil de empresa                         │    │
│ │  ○ Verificaciones                            │    │
│ │  ○ Notificaciones                            │    │
│ │  ○ Configuración                             │    │
│ │                                              │    │
│ │ User card (avatar + nombre + rol + ⋯ menu)   │    │
│ └──────────────────────────────────────────────┘    │
│                                                     │
│ Main area (flex: 1, margin-left: 220px)             │
│ ┌──────────────────────────────────────────────┐    │
│ │ Topbar (56px, sticky)                        │    │
│ │  Breadcrumb | Search | Notif bell (badge)    │    │
│ ├──────────────────────────────────────────────┤    │
│ │ Main content (padding: 28px, max-w: 1200px)  │    │
│ │  <Screen content>                            │    │
│ └──────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Sidebar — estados de nav item

```css
/* Normal */
background: transparent;
color: #9A9088;
border-left: 2px solid transparent;

/* Activo */
background: #1E1C1A;
color: #FFFFFF;
font-weight: 700;
border-left: 2px solid #C4683A;
```

---

## Componentes clave

### Button

```typescript
// Variantes: primary | secondary | ghost | danger | teal | dark
// Tamaños: sm | md | lg

// Primary
bg: #C4683A, text: #fff, border-radius: 10px, font-weight: 600

// Secondary
bg: #fff, text: #1A1714, border: 1px solid #E8E5DF, shadow: sm

// Ghost
bg: transparent, text: #6B6560

// Danger
bg: #C0392B, text: #fff
```

### Badge / StatusPill

```typescript
// Estados de oferta
activa:     bg #E8F5EE, text #1F7A4D, dot verde
pausada:    bg #FDF4E7, text #B5691A, dot amber
cerrada:    bg #F0EDE8, text #9A9088
borrador:   bg #F0EDE8, text #9A9088
urgente:    bg #FDF0EE, text #C0392B

// Verificación
verificado:    bg #E8F5EE, text #1F7A4D, icon ✓
pendiente:     bg #FDF4E7, text #B5691A, icon ○
en revisión:   bg #EBF2FC, text #1A5FA0, icon ↻
rechazado:     bg #FDF0EE, text #C0392B, icon ✕
```

### MetricCard

```
Card (padding: 20px 22px, shadow: sm)
├── Label (11px, uppercase, letter-spacing: 0.04em, color: textMuted)
├── Value (28px, weight: 800, letter-spacing: -0.03em)
├── Sub text (12px, color: textMuted)
└── Trend (12px, color: green/red, arrow ↑↓ + %)
Icono: 40x40px, border-radius: 10px, bg: accentLight o borderLight
```

### Card

```
background: #FFFFFF
border: 1px solid #E8E5DF
border-radius: 14px
box-shadow: 0 1px 3px rgba(0,0,0,0.06)
Hover: shadow-md + translateY(-1px)
```

### MatchBar

```
Track: height 6px, bg: #F0EDE8, border-radius: full
Fill: bg verde (#1F7A4D) si ≥80%, teal si ≥65%, amber si <65%
Score text: 12px, weight 700, color igual al fill
```

### VerificationBadge

```
Verificado:   bg #E8F5EE, text #1F7A4D, icon ✓, weight 700
No verificado: bg #FDF4E7, text #B5691A, icon ○
```

---

## Pantallas — AliJob Empresas

### 1. Landing (/)

**Layout:** Full-width, sin sidebar. Header sticky + Hero + Preview dashboard + Features + Footer.

**Header:**
- Logo (AliJob Empresas) — clic → home. Text color dark sobre fondo blanco.
- Nav: Producto | Precios | Casos de éxito — cada uno enlaza a subpágina. Item activo: color #1A5FA0, border-bottom: 2px solid #1A5FA0, bg rgba(26,95,160,0.12).
- CTA: "Iniciar sesión" (secondary) + "Solicitar acceso" (accent button)

**Hero:**
- bg: #FFFFFF con radial-gradient sutil azul (rgba(26,95,160,0.07))
- Pill badge: "BETA ABIERTA · CANARIAS", bg rgba(26,95,160,0.08), text #1A5FA0
- H1: 52px, weight 900, line-height 1.15, color #0C1528. "empresa" en span color #1A5FA0
- Subtítulo: 17px, color #5A7090, max-width 520px
- CTAs: "Solicitar acceso gratuito →" (accent) + "Entrar en modo demo" (border #B0C4D8)
- Social proof: 12px, color #607896

**Preview mini-dashboard:** Simulación visual del dashboard en un browser chrome

**Features:** 3 cards en grid, bg #F0F4FA, border #DCE6F0

### 2. Subpáginas de marketing (/producto, /precios, /casos)

Misma estructura: LandingHeader + contenido + footer. Nav item correspondiente activo.

**Producto:** Grid 3 cols de features cards
**Precios:** Grid 3 cols con planes (Beta gratis / Starter 49€ / Hotel 149€)
**Casos de éxito:** Lista de empresas con quotes y métricas

### 3. Login (/login)

**Layout:** 2 columnas (flex). Left: formulario. Right: panel decorativo oscuro.

Left (bg blanco):
- Logo clic → landing
- Email + Password inputs
- Checkbox "Recordar sesión"
- CTA "Entrar al panel →" (accent)
- CTA "Entrar en modo demo" (ghost)
- Link → Registro

Right (bg #2C2318, border-left):
- Lista de beneficios con dots accent
- Card de testimonio con estrellas

### 4. Registro (/registro)

**Layout:** Centrado, logo arriba, formulario en card oscura.

Campos: Nombre empresa*, CIF/NIF, Persona de contacto*, Email*, Teléfono*, Sector (select), Isla (select), Empleados (select).

Estado éxito: icono ✓ en circle verde, mensaje de confirmación.

### 5. Dashboard (/dashboard)

**Secciones (top → bottom):**
1. Welcome header + CTA "Nueva oferta"
2. Alertas (2 Alert cards apiladas)
3. Metrics grid (4 cols): Vacantes / Candidatos / Entrevistas / Reputación
4. 2 columnas: Tabla rendimiento vacantes | Panel lateral (completitud perfil + accesos rápidos)
5. Grid 3 cols: Entrevistas próximas

**MetricCards:** value 28px black, label uppercase muted, trend color verde/rojo

### 6. Vacantes (/vacantes)

**Header:** Título + CTA "Nueva oferta"
**Tabs:** Todas | Activas | Pausadas | Borradores (con count)
**Lista:** Cards verticales, cada una:
- Nombre puesto (15px black) + Badge estado + VerBadge salario
- Meta: ubicación / contrato / salario / publicada
- Right: candidatos count + match medio (barra) + botones Candidatos/Editar

### 7. Crear oferta (/vacantes/nueva)

**Stepper 4 pasos:** Información básica → Condiciones → Requisitos → Previsualización

Paso 1: puesto, isla, municipio, contrato, jornada, horario
Paso 2: salario min/max (obligatorio), convenio, mejoras, beneficios, alojamiento. Alert: "Salario obligatorio"
Paso 3: experiencia, idiomas, certificaciones, descripción, valoramos
Paso 4: preview de cómo lo ve el candidato

Aside: tips AliJob + estado borrador

### 8. Candidatos (/candidatos)

**Filtros:** Match (todos/alto/medio) + Estado (todos/nuevo/en revisión/entrevista)
**Tabla:** Avatar + nombre + puesto + MatchBar + disponibilidad + ubicación + Badge estado + CTA "Ver perfil"
**Hover:** bg pageBg en fila

### 9. Detalle candidato (/candidatos/:id)

**Layout:** 1fr + 320px sidebar

Left tabs: Resumen | Match explicado | Experiencia

**Resumen:** Card puntos fuertes (✓ verde) + Card posibles dudas (○ amber)

**Match explicado:**
- Score grande en circle (verde si ≥80%)
- Factores: experiencia / idiomas / disponibilidad / ubicación / titulación
- Cada factor: label + score % + barra progreso + descripción texto

**Sidebar:** Avatar + nombre + Match badge + datos personales + idiomas + 3 botones acción

### 10. Entrevistas (/entrevistas)

**Tabs:** Próximas | Completadas
**Grid 2 cols:** Cards con badge estado + tipo + nombre candidato + puesto + fecha
**Pendiente:** Muestra CTAs "Confirmar asistencia" / "Reprogramar"

### 11. Detalle entrevista

**Layout:** 1fr + 320px sidebar
- Card info: candidato / puesto / fecha / modalidad / estado / entrevistador
- Checklist interactivo con barra de progreso
- Textarea notas internas + Textarea feedback
- Sidebar: candidato card + radio asistencia

### 12. Reputación (/reputacion)

**Layout:** 280px score card + 1fr subratings grid

**Score global:** Rating 4.3/5 + StarRating + distribución por estrellas (barras)
**Subratings:** Grid 2 cols, 7 dimensiones (ambiente/salario/cumplimiento/turnos/gestión/crecimiento/conciliación)
**Alertas:** Warning evidencia + Info mejora posible
**Opiniones:** Cards con avatar + nombre anónimo + puesto + fecha + stars + texto + VerBadge

### 13. Perfil de empresa (/perfil)

**Header:** Completitud (82%) barra progress + VerBadges
**Layout:** 1fr + 300px preview card

Left: Identidad (logo upload + nombre + sector) + Descripción + Condiciones laborales (convenio + mejoras + beneficios) + Cultura + Tags valores

Right: Vista previa candidato (mini card como la ven en la app)

### 14. Verificaciones (/verificaciones)

**Resumen 3 cols:** Verificados / En revisión / Pendientes
**Lista:** Cards con icon circle + label + descripción + fecha + badge + CTA "Completar"

Items: identidad / email / ubicación / salario / convenio / cultura / mejoras / evidencias

### 15. Configuración (/configuracion)

**Tabs:** Cuenta | Equipo | Notificaciones | Seguridad | Facturación

Cuenta: form con datos empresa
Equipo: tabla usuarios + roles + último acceso + botón invitar
Notificaciones: lista toggles switch (on/off)
Seguridad: cambio contraseña + 2FA placeholder
Facturación: empty state "Beta gratuita — próximamente"

### 16. Notificaciones (/notificaciones)

**Filtros pills:** Todas | Sin leer | Candidatos | Entrevistas | Evidencias | Vacantes

**Items:** icon + título (weight 700 si no leída) + descripción + tiempo + dot accent si no leída + badge Urgente si aplica. Border-left accent si no leída, border-left red si urgente.

---

## Pantallas — AliJob Admin

### 17. Dashboard Admin

4 MetricCards: Empresas pendientes / Evidencias / Opiniones reportadas / Verificaciones
Grid 2 cols: Actividad reciente + Accesos rápidos

### 18. Validar empresas (/admin/empresas)

Lista + panel lateral al seleccionar.
Lista: Avatar + nombre + contacto + isla + sector + empleados + docs count + prioridad badge + tiempo
Panel: datos completos + documentos adjuntos + textarea notas + botones Aprobar/Rechazar/Solicitar info

### 19. Evidencias (/admin/evidencias)

Resumen 3 cols + lista cards.
Cards border-left por prioridad (urgente=red, alta=amber).
Datos: empresa + tipo + autor + texto + prioridad + estado + días pending
CTAs: Aprobar | Solicitar más info | Rechazar

### 20. Moderación de opiniones (/admin/moderacion)

Tabs: Reportadas | En revisión | Resueltas
Cards: empresa + autor + estrellas + quote en italic + motivo reporte (Alert warning) + CTAs

### 21. Reportes (/admin/reportes)

4 MetricCards + Tabla completa: empresa / tipo / prioridad / estado / creado / asignado / CTA Ver

---

## Interacciones y comportamiento

### Navegación
- State-based routing (no URL real en prototipo — implementar con Next.js App Router)
- Sidebar item activo: border-left accent + bg sidebarBorder + text white
- Topbar: breadcrumb "AliJob Empresas › [Sección actual]"
- Logo sidebar → dashboard (empresa) o admin-dashboard (admin)

### Transiciones
- Card hover: shadow-md + translateY(-1px), duration 150ms ease
- Badge/Button: transition all 150ms ease
- Sidebar nav items: transition color/background 120ms ease

### Formularios
- Input focus: outline 2px solid #C4683A, offset 1px
- Select cursor: pointer
- Textarea resize: vertical

### Checklist entrevista
- Click checkbox → toggle estado → actualiza barra progreso
- Checkbox custom: 18x18px, border-radius 5px, bg green + checkmark ✓ cuando activo

### Menú usuario sidebar
- Clic en user card → aparece menú flotante arriba del card
- Overlay transparente cierra el menú
- Items: icono + label, hover: bg #2A2824
- "Cerrar sesión" en color rojo #E05C5C

### Stepper crear oferta
- Click en número de paso → navegar a ese paso
- Barra entre pasos: accent si completado, borderLight si pendiente

### Tweaks panel
- Activado desde toolbar del host
- Controles: accentColor (radio + color picker) / sidebarBg (radio) / cardRadius (slider 0-20) / fontScale (slider 0.85-1.2) / density (radio) / companyName (text)

---

## Estados de datos

### Empresa demo
```typescript
const DEMO_EMPRESA = {
  nombre: "Hotel Atlántico Costa Adeje",
  isla: "Tenerife",
  sector: "Hostelería",
  empleados: "51-200",
  reputacion: 4.3,
  vacantesActivas: 6,
  candidatosTotal: 128,
  candidatosMatchAlto: 23,
  entrevistasPendientes: 14,
  perfilCompletado: 82,
}
```

### Puestos mock

```
Jefe/a de sala | Recepcionista | Cocinero/a | Ayudante de cocina
Personal de pisos | Camarero/a de sala | Gobernanta/e | Animador/a turístico
```

### Ubicaciones mock

```
Costa Adeje, Tenerife | Santa Cruz de Tenerife | Puerto de la Cruz
Las Palmas de Gran Canaria | Playa Blanca, Lanzarote | Corralejo, Fuerteventura
```

---

## Assets necesarios

- **Fuente:** Plus Jakarta Sans — importar desde Google Fonts (pesos 400, 500, 600, 700, 800, 900)
- **Logo:** Hexágono SVG con degradado terracota `#C4683A → #9B3E1A` — ver componente Logo en layout.jsx
- **Iconos:** Usar Lucide React. Equivalencias:
  - ⬡ Dashboard → `LayoutDashboard`
  - 📋 Vacantes → `Briefcase`
  - 👥 Candidatos → `Users`
  - 🗓 Entrevistas → `Calendar`
  - ⭐ Reputación → `Star`
  - 🏢 Perfil → `Building2`
  - ✓ Verificaciones → `ShieldCheck`
  - 🔔 Notificaciones → `Bell`
  - ⚙ Configuración → `Settings`
  - 🛡 Admin moderación → `Shield`
  - 🚩 Reportes → `Flag`

---

## Archivos de referencia incluidos

```
design_handoff_alijob_empresas/
├── README.md                    ← Este archivo
├── AliJob.html                  ← Prototipo navegable completo
├── components/
│   ├── ds.jsx                   ← Design system: tokens + componentes base
│   └── layout.jsx               ← Sidebar + Topbar + AppLayout + Logo
├── screens/
│   ├── landing.jsx              ← Landing, Login, Registro, Producto, Precios, Casos
│   ├── dashboard.jsx            ← Dashboard, Vacantes, Crear oferta, Editar oferta
│   ├── candidatos.jsx           ← Candidatos, Detalle candidato
│   ├── entrevistas.jsx          ← Entrevistas, Detalle entrevista
│   ├── reputacion.jsx           ← Reputación, Perfil, Verificaciones
│   ├── ajustes.jsx              ← Configuración, Notificaciones
│   └── admin.jsx                ← Todas las pantallas admin
└── app.jsx                      ← Router principal + Tweaks panel
```

---

## Notas de implementación

1. **Sidebar fija:** `position: fixed; left: 0; top: 0; height: 100vh; width: 220px` — main content con `margin-left: 220px`
2. **Topbar sticky:** `position: sticky; top: 0; z-index: 50; height: 56px`
3. **Scrollbar custom:** Usar CSS `scrollbar-width: thin` + `scrollbar-color: #D0CCC6 transparent`
4. **Responsive:** El diseño prioriza desktop (1280px+) y tablet (768px+). En mobile la sidebar debe colapsarse — no usar bottom navigation.
5. **Modo Admin/Empresa:** Implementar como contexto global (React Context o Zustand) que cambia la nav y las pantallas disponibles.
6. **Transparencia salarial:** El campo de salario debe ser OBLIGATORIO en el formulario de crear oferta — validación frontend y backend.
7. **Match score:** Los porcentajes de match son calculados por backend — el frontend solo los renderiza con el color correcto (≥80 verde, ≥65 teal, <65 amber).
