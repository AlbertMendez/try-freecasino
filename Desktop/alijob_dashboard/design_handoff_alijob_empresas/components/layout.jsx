
// AliJob Empresas — Sidebar + Topbar + Layout

const NAV_EMPRESA = [
  { id: 'dashboard', icon: '⬡', label: 'Dashboard' },
  { id: 'vacantes', icon: '📋', label: 'Vacantes' },
  { id: 'candidatos', icon: '👥', label: 'Candidatos' },
  { id: 'entrevistas', icon: '🗓', label: 'Entrevistas' },
  { id: 'reputacion', icon: '⭐', label: 'Reputación' },
  { id: 'perfil', icon: '🏢', label: 'Perfil de empresa' },
  { id: 'verificaciones', icon: '✓', label: 'Verificaciones' },
  { id: 'notificaciones', icon: '🔔', label: 'Notificaciones' },
  { id: 'configuracion', icon: '⚙', label: 'Configuración' },
];

const NAV_ADMIN = [
  { id: 'admin-dashboard', icon: '⬡', label: 'Dashboard Admin' },
  { id: 'admin-empresas', icon: '🏢', label: 'Validar empresas' },
  { id: 'admin-evidencias', icon: '📄', label: 'Evidencias' },
  { id: 'admin-moderacion', icon: '🛡', label: 'Moderación' },
  { id: 'admin-reportes', icon: '🚩', label: 'Reportes' },
];

function Logo({ small, light }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{
        width: small ? 28 : 32, height: small ? 28 : 32,
        borderRadius: DS.radius.md,
        background: 'linear-gradient(135deg, #C4683A 0%, #9B3E1A 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width={small ? 14 : 16} height={small ? 14 : 16} viewBox="0 0 16 16" fill="none">
          <polygon points="8,1 15,5 15,11 8,15 1,11 1,5" fill="none" stroke="white" strokeWidth="1.5"/>
          <polygon points="8,4 11,6 11,10 8,12 5,10 5,6" fill="white" opacity="0.7"/>
        </svg>
      </div>
      {!small && (
        <div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: light ? '#0C1528' : '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>AliJob</div>
          <div style={{ fontSize: '9px', fontWeight: 600, color: light ? '#607896' : '#6B6058', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1, marginTop: 2 }}>Empresas</div>
        </div>
      )}
    </div>
  );
}

function SidebarUserMenu({ isAdmin, companyName }) {
  const [open, setOpen] = React.useState(false);
  const menuItems = isAdmin
    ? [['👤', 'Mi perfil'], ['⚙', 'Configuración'], ['—', null], ['🚪', 'Cerrar sesión']]
    : [['🏢', 'Perfil de empresa'], ['⚙', 'Configuración'], ['👥', 'Gestionar equipo'], ['—', null], ['🚪', 'Cerrar sesión']];

  return (
    <div style={{ padding: '12px 14px', borderTop: '1px solid #1E1C1A', position: 'relative' }}>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />
          <div style={{ position: 'absolute', bottom: '100%', left: 14, right: 14, marginBottom: 6, background: '#1E1C1A', border: '1px solid #2E2C2A', borderRadius: DS.radius.lg, overflow: 'hidden', zIndex: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            {menuItems.map(([ic, label], i) =>
              label === null
                ? <div key={i} style={{ height: 1, background: '#2A2824', margin: '2px 0' }} />
                : (
                  <button key={label} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', background: 'none', border: 'none', color: label === 'Cerrar sesión' ? '#E05C5C' : '#C8C0B8', fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#2A2824'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    <span style={{ fontSize: '13px' }}>{ic}</span> {label}
                  </button>
                )
            )}
          </div>
        </>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: DS.radius.md, background: '#1A1816', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
        <Avatar name={isAdmin ? 'Admin AliJob' : (companyName || 'Hotel Atlántico')} size={30} color={isAdmin ? DS.colors.purple : DS.colors.accent} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#E0D8D0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{isAdmin ? 'Admin AliJob' : (companyName || 'Hotel Atlántico')}</div>
          <div style={{ fontSize: '10px', color: '#5A5450' }}>{isAdmin ? 'Moderador' : 'Costa Adeje'}</div>
        </div>
        <span style={{ color: open ? '#9A9088' : '#5A5450', fontSize: '14px', transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'none' }}>⋯</span>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, isAdmin, setIsAdmin, companyName }) {
  const nav = isAdmin ? NAV_ADMIN : NAV_EMPRESA;
  return (
    <div style={{
      width: 220, flexShrink: 0, background: DS.colors.sidebarBg,
      display: 'flex', flexDirection: 'column', height: '100vh',
      position: 'fixed', left: 0, top: 0, zIndex: 100,
      borderRight: '1px solid #1E1C1A',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid #1E1C1A' }}>
        <Logo />
      </div>

      {/* Mode switcher */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #1E1C1A' }}>
        <div style={{ display: 'flex', background: '#1E1C1A', borderRadius: DS.radius.md, padding: 3, gap: 2 }}>
          {[{ id: false, label: 'Empresa' }, { id: true, label: 'Admin' }].map(m => (
            <button key={String(m.id)} onClick={() => { setIsAdmin(m.id); setPage(m.id ? 'admin-dashboard' : 'dashboard'); }}
              style={{
                flex: 1, padding: '5px 0', borderRadius: '7px', border: 'none',
                background: isAdmin === m.id ? '#2C2A28' : 'transparent',
                color: isAdmin === m.id ? '#FFFFFF' : '#6B6058',
                fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                letterSpacing: '0.01em', transition: 'all 0.15s',
              }}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {nav.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '9px 18px',
                background: active ? '#1E1C1A' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                color: active ? '#FFFFFF' : DS.colors.sidebarText,
                fontSize: '13px', fontWeight: active ? 700 : 400,
                fontFamily: 'inherit', transition: 'all 0.12s ease',
                borderLeft: `2px solid ${active ? DS.colors.accent : 'transparent'}`,
              }}>
              <span style={{ fontSize: '14px', opacity: active ? 1 : 0.6 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <SidebarUserMenu isAdmin={isAdmin} companyName={companyName} />
    </div>
  );
}

function Topbar({ page, setPage, notifCount = 3 }) {
  const allNav = [...NAV_EMPRESA, ...NAV_ADMIN];
  const current = allNav.find(n => n.id === page);
  const pageLabels = {
    'crear-oferta': 'Crear nueva oferta',
    'editar-oferta': 'Editar oferta',
    'detalle-candidato': 'Detalle del candidato',
    'detalle-entrevista': 'Detalle de entrevista',
  };
  const label = pageLabels[page] || current?.label || '';

  return (
    <div style={{
      height: 56, background: DS.colors.cardBg, borderBottom: `1px solid ${DS.colors.border}`,
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Breadcrumb */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '13px', color: DS.colors.textMuted, fontWeight: 500 }}>AliJob Empresas</span>
        <span style={{ color: DS.colors.border }}>›</span>
        <span style={{ fontSize: '13px', color: DS.colors.textPrimary, fontWeight: 700 }}>{label}</span>
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: DS.colors.textMuted, fontSize: '13px', pointerEvents: 'none' }}>🔍</span>
        <input placeholder="Buscar candidatos, ofertas…" style={{
          padding: '7px 14px 7px 32px', borderRadius: DS.radius.md,
          border: `1px solid ${DS.colors.border}`, background: DS.colors.pageBg,
          fontSize: '12px', color: DS.colors.textPrimary, outline: 'none',
          fontFamily: 'inherit', width: 220,
        }} />
      </div>

      {/* Notif */}
      <button onClick={() => setPage('notificaciones')} style={{ position: 'relative', background: DS.colors.pageBg, border: `1px solid ${DS.colors.border}`, borderRadius: DS.radius.md, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' }}>
        🔔
        {notifCount > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: DS.colors.accent, color: '#fff', width: 16, height: 16, borderRadius: '50%', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>{notifCount}</span>}
      </button>
    </div>
  );
}

function AppLayout({ children, page, setPage, isAdmin, setIsAdmin, companyName, density }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'inherit' }}>
      <Sidebar page={page} setPage={setPage} isAdmin={isAdmin} setIsAdmin={setIsAdmin} companyName={companyName} />
      <div style={{ flex: 1, marginLeft: 220, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Topbar page={page} setPage={setPage} />
        <main style={{ flex: 1, padding: '28px 28px', maxWidth: 1200, width: '100%', boxSizing: 'border-box' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { AppLayout, Logo });
