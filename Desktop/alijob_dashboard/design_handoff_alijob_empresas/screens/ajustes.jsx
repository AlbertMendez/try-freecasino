
// AliJob Empresas — Configuración + Notificaciones

function ConfiguracionScreen() {
  const [tab, setTab] = React.useState('cuenta');
  return (
    <div>
      <SectionHeader title="Configuración" subtitle="Gestiona tu cuenta, equipo y preferencias" />
      <Tabs
        tabs={[
          { id: 'cuenta', label: 'Cuenta' },
          { id: 'equipo', label: 'Equipo' },
          { id: 'notif', label: 'Notificaciones' },
          { id: 'seguridad', label: 'Seguridad' },
          { id: 'facturacion', label: 'Facturación' },
        ]}
        active={tab} onChange={setTab}
      />
      {tab === 'cuenta' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
          <Card style={{ padding: '24px 28px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 20 }}>Datos de la cuenta</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FormField label="Nombre de empresa"><Input value="Hotel Atlántico Costa Adeje" /></FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Persona de contacto"><Input value="Laura Pérez" /></FormField>
                <FormField label="Teléfono"><Input value="+34 922 123 456" /></FormField>
              </div>
              <FormField label="Email profesional"><Input value="rrhh@hotelatlantico.es" /></FormField>
              <FormField label="CIF/NIF"><Input value="B12345678" /></FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Sector"><Select options={['Hostelería','Turismo','Restauración']} value="Hostelería" /></FormField>
                <FormField label="Isla"><Select options={['Tenerife','Gran Canaria','Lanzarote','Fuerteventura']} value="Tenerife" /></FormField>
              </div>
            </div>
            <div style={{ marginTop: 24 }}><Btn>Guardar cambios</Btn></div>
          </Card>
          <Card style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Estado de la cuenta</div>
            {[['Plan', 'Beta gratuita'],['Estado', 'Activa'],['Desde', '12 mar 2025'],['Accesos', '3 usuarios']].map(([l,v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${DS.colors.borderLight}`, fontSize: '12px' }}>
                <span style={{ color: DS.colors.textMuted }}>{l}</span>
                <span style={{ fontWeight: 700, color: DS.colors.textPrimary }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 14 }}><VerBadge label="Empresa verificada" verified /></div>
          </Card>
        </div>
      )}
      {tab === 'equipo' && (
        <Card style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary }}>Usuarios del equipo</div>
            <Btn size="sm" icon="+">Invitar usuario</Btn>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${DS.colors.border}` }}>
                {['Nombre', 'Email', 'Rol', 'Último acceso', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0 0 10px', color: DS.colors.textMuted, fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Laura Pérez', email: 'laura@hotelatlantico.es', rol: 'Admin', acceso: 'Hoy, 09:14h' },
                { name: 'Carlos Medina', email: 'c.medina@hotelatlantico.es', rol: 'Reclutador', acceso: 'Ayer' },
                { name: 'Marta Suárez', email: 'm.suarez@hotelatlantico.es', rol: 'Observador', acceso: 'Hace 3 días' },
              ].map(u => (
                <tr key={u.email} style={{ borderBottom: `1px solid ${DS.colors.borderLight}` }}>
                  <td style={{ padding: '14px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={u.name} size={32} />
                      <span style={{ fontWeight: 600, color: DS.colors.textPrimary }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 0', color: DS.colors.textSecondary }}>{u.email}</td>
                  <td style={{ padding: '14px 0' }}><Badge label={u.rol} color={u.rol === 'Admin' ? 'accent' : u.rol === 'Reclutador' ? 'teal' : 'neutral'} /></td>
                  <td style={{ padding: '14px 0', color: DS.colors.textMuted, fontSize: '12px' }}>{u.acceso}</td>
                  <td style={{ padding: '14px 0' }}><Btn variant="ghost" size="sm">Editar</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {tab === 'notif' && (
        <Card style={{ padding: '24px 28px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 20 }}>Preferencias de notificaciones</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['Candidatos nuevos recibidos', true],
              ['Candidatos con match alto (≥85%)', true],
              ['Entrevistas confirmadas', true],
              ['Entrevistas pendientes de confirmar', true],
              ['Reputación actualizada', false],
              ['Evidencias nuevas pendientes de respuesta', true],
              ['Vacantes que requieren revisión AliJob', true],
              ['Resumen semanal de rendimiento', false],
            ].map(([l, on]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${DS.colors.borderLight}` }}>
                <span style={{ fontSize: '13px', color: DS.colors.textPrimary }}>{l}</span>
                <div style={{ position: 'relative', width: 40, height: 22, cursor: 'pointer' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 11, background: on ? DS.colors.accent : DS.colors.borderLight, transition: 'background 0.2s' }}></div>
                  <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: DS.shadow.sm, transition: 'left 0.2s' }}></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}><Btn>Guardar preferencias</Btn></div>
        </Card>
      )}
      {tab === 'seguridad' && (
        <Card style={{ padding: '24px 28px', maxWidth: 520 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 20 }}>Seguridad de la cuenta</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormField label="Contraseña actual"><Input type="password" value="••••••••" /></FormField>
            <FormField label="Nueva contraseña"><Input type="password" placeholder="Mínimo 8 caracteres" /></FormField>
            <FormField label="Confirmar nueva contraseña"><Input type="password" placeholder="Repite la contraseña" /></FormField>
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
            <Btn>Cambiar contraseña</Btn>
          </div>
          <Divider label="Autenticación" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: DS.colors.textPrimary }}>Verificación en dos pasos</div>
              <div style={{ fontSize: '12px', color: DS.colors.textMuted, marginTop: 2 }}>Añade una capa extra de seguridad a tu cuenta</div>
            </div>
            <Btn variant="secondary" size="sm">Activar</Btn>
          </div>
        </Card>
      )}
      {tab === 'facturacion' && (
        <Card style={{ padding: '60px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: 16 }}>💳</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 8 }}>Facturación próximamente</div>
          <div style={{ fontSize: '13px', color: DS.colors.textSecondary, maxWidth: 360, margin: '0 auto 24px', lineHeight: 1.6 }}>Durante la beta, AliJob Empresas es completamente gratuito. Cuando lancemos los planes de pago, los verás aquí.</div>
          <Badge label="Beta gratuita activa" color="green" dot />
        </Card>
      )}
    </div>
  );
}

// ─── Notificaciones ────────────────────────────────────────────────────────────
function NotificacionesScreen() {
  const [filtro, setFiltro] = React.useState('todas');
  const notifs = [
    { tipo: 'candidato', icon: '👤', titulo: '3 nuevos candidatos con match alto', desc: 'Jefe/a de sala · Match medio 88% · Aplicaron hace 2h', leida: false, tiempo: 'Hace 2h' },
    { tipo: 'entrevista', icon: '🗓', titulo: 'Entrevista confirmada', desc: 'María García confirmó su asistencia para hoy a las 16:00h', leida: false, tiempo: 'Hace 3h' },
    { tipo: 'reputacion', icon: '⭐', titulo: 'Nueva opinión verificada', desc: 'Tu reputación ha subido 0.1 puntos · Ahora es 4.3/5', leida: true, tiempo: 'Ayer' },
    { tipo: 'evidencia', icon: '📄', titulo: 'Evidencia pendiente de respuesta', desc: 'Un ex-empleado ha adjuntado documentación. Tienes 7 días para responder.', leida: false, tiempo: 'Hace 2 días', urgente: true },
    { tipo: 'vacante', icon: '📋', titulo: 'Vacante requiere revisión', desc: 'Cocinero/a · El salario publicado está por debajo del convenio. Revisa.', leida: true, tiempo: 'Hace 3 días', urgente: true },
    { tipo: 'candidato', icon: '👤', titulo: 'Alejandro Ruiz ha actualizado su perfil', desc: 'Su match con Recepcionista ha subido a 87%', leida: true, tiempo: 'Hace 4 días' },
    { tipo: 'entrevista', icon: '🗓', titulo: 'Entrevista pendiente de confirmar', desc: 'Carmen Vega · Cocinera · Jueves 29 a las 12:00h', leida: true, tiempo: 'Hace 5 días' },
  ];

  const filtered = filtro === 'todas' ? notifs : filtro === 'no leídas' ? notifs.filter(n => !n.leida) : notifs.filter(n => n.tipo === filtro);

  return (
    <div>
      <SectionHeader
        title="Notificaciones"
        subtitle={`${notifs.filter(n => !n.leida).length} sin leer`}
        actions={[<Btn key="all" variant="ghost" size="sm">Marcar todas como leídas</Btn>]}
      />
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['todas','Todas'], ['no leídas','Sin leer'], ['candidato','Candidatos'], ['entrevista','Entrevistas'], ['evidencia','Evidencias'], ['vacante','Vacantes']].map(([v,l]) => (
          <button key={v} onClick={() => setFiltro(v)} style={{ padding: '5px 14px', borderRadius: DS.radius.full, border: `1px solid ${filtro === v ? DS.colors.accent : DS.colors.border}`, background: filtro === v ? DS.colors.accentLight : 'transparent', color: filtro === v ? DS.colors.accent : DS.colors.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((n, i) => (
          <Card key={i} style={{ padding: '16px 20px', borderLeft: n.urgente ? `3px solid ${DS.colors.red}` : !n.leida ? `3px solid ${DS.colors.accent}` : '3px solid transparent', background: n.leida ? DS.colors.cardBg : '#FFFCFA' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 38, height: 38, borderRadius: DS.radius.md, background: n.leida ? DS.colors.borderLight : DS.colors.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{n.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ fontSize: '13px', fontWeight: n.leida ? 500 : 700, color: DS.colors.textPrimary }}>{n.titulo}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                    {n.urgente && <Badge label="Urgente" color="red" />}
                    {!n.leida && <div style={{ width: 7, height: 7, borderRadius: '50%', background: DS.colors.accent }}></div>}
                    <span style={{ fontSize: '11px', color: DS.colors.textMuted }}>{n.tiempo}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: DS.colors.textSecondary, marginTop: 3, lineHeight: 1.5 }}>{n.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ConfiguracionScreen, NotificacionesScreen });
