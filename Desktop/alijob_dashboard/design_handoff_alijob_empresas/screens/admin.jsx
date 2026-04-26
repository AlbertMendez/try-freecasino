
// AliJob — Admin Screens

function AdminDashboardScreen({ setPage }) {
  return (
    <div>
      <SectionHeader title="Dashboard Admin" subtitle="Panel interno de moderación · AliJob" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Empresas pendientes" value="7" sub="Solicitudes nuevas" icon="🏢" accent trend={3} />
        <MetricCard label="Evidencias activas" value="12" sub="4 urgentes" icon="📄" accent />
        <MetricCard label="Opiniones reportadas" value="5" sub="Pendientes de revisión" icon="🛡" />
        <MetricCard label="Verificaciones abiertas" value="18" sub="Empresas en proceso" icon="✓" trend={-1} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <Card style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary }}>Actividad reciente</div>
          </div>
          {[
            { icon: '🏢', txt: 'Grupo GastroCanarias solicitó acceso', t: 'Hace 1h', color: DS.colors.teal },
            { icon: '📄', txt: 'Evidencia nueva · Hotel Jardín del Teide', t: 'Hace 2h', color: DS.colors.red },
            { icon: '✓', txt: 'Resort Volcán Experience verificado', t: 'Hace 3h', color: DS.colors.green },
            { icon: '🛡', txt: 'Opinión reportada · Restaurante La Terraza', t: 'Ayer', color: DS.colors.amber },
            { icon: '🏢', txt: 'Restaurante El Faro aprobado', t: 'Ayer', color: DS.colors.green },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${DS.colors.borderLight}` }}>
              <div style={{ width: 32, height: 32, borderRadius: DS.radius.md, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{a.icon}</div>
              <div style={{ flex: 1, fontSize: '12px', color: DS.colors.textPrimary }}>{a.txt}</div>
              <span style={{ fontSize: '11px', color: DS.colors.textMuted, whiteSpace: 'nowrap' }}>{a.t}</span>
            </div>
          ))}
        </Card>
        <Card style={{ padding: '20px 22px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 16 }}>Acciones rápidas</div>
          {[['🏢','Validar empresas','admin-empresas'],['📄','Revisar evidencias','admin-evidencias'],['🛡','Moderar opiniones','admin-moderacion'],['🚩','Ver reportes','admin-reportes']].map(([ic,l,pg]) => (
            <button key={l} onClick={() => setPage(pg)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 0', background: 'none', border: 'none', borderBottom: `1px solid ${DS.colors.borderLight}`, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
              <span style={{ fontSize: '16px' }}>{ic}</span>
              <span style={{ fontSize: '13px', color: DS.colors.textPrimary, fontWeight: 500 }}>{l}</span>
              <span style={{ marginLeft: 'auto', color: DS.colors.textMuted }}>›</span>
            </button>
          ))}
        </Card>
      </div>
      <Alert type="warning" title="4 evidencias urgentes sin atender" message="Llevan más de 5 días sin revisión. El SLA interno es de 72h." action="Revisar ahora →" />
    </div>
  );
}

// ─── Validación de Empresas ───────────────────────────────────────────────────
function AdminEmpresasScreen({ setPage }) {
  const [selected, setSelected] = React.useState(null);
  const empresas = [
    { id: 1, nombre: 'Grupo GastroCanarias', contacto: 'Ramón Delgado', email: 'rrhh@gastrocanarias.com', isla: 'Gran Canaria', sector: 'Restauración', empleados: '51-200', solicitado: 'Hace 1h', docs: ['CIF adjunto', 'Email corporativo'], prioridad: 'alta' },
    { id: 2, nombre: 'Restaurante La Terraza del Puerto', contacto: 'Silvia Mora', email: 'silvia@laterraza.com', isla: 'Tenerife', sector: 'Hostelería', empleados: '11-50', solicitado: 'Hace 4h', docs: ['CIF adjunto'], prioridad: 'normal' },
    { id: 3, nombre: 'Resort Playa Blanca Premium', contacto: 'Jorge Acosta', email: 'jorge@playablancapr.com', isla: 'Lanzarote', sector: 'Hostelería', empleados: '200+', solicitado: 'Ayer', docs: ['CIF adjunto', 'Escrituras sociales', 'Email corporativo'], prioridad: 'normal' },
    { id: 4, nombre: 'Ocio Atlántico Events', contacto: 'Marta Reyes', email: 'marta@ocioatlantico.es', isla: 'Fuerteventura', sector: 'Ocio', empleados: '1-10', solicitado: 'Hace 2 días', docs: [], prioridad: 'baja' },
  ];
  const sel = selected !== null ? empresas[selected] : null;

  return (
    <div>
      <SectionHeader title="Validar empresas" subtitle={`${empresas.length} solicitudes pendientes de revisión`} />
      <div style={{ display: 'grid', gridTemplateColumns: sel ? '1fr 420px' : '1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {empresas.map((e, i) => (
            <Card key={e.id} hover onClick={() => setSelected(selected === i ? null : i)} style={{ padding: '16px 20px', borderLeft: e.prioridad === 'alta' ? `3px solid ${DS.colors.red}` : '3px solid transparent', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar name={e.nombre} size={40} color={DS.colors.teal} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: DS.colors.textPrimary }}>{e.nombre}</div>
                  <div style={{ fontSize: '12px', color: DS.colors.textSecondary, marginTop: 2 }}>{e.contacto} · {e.email}</div>
                  <div style={{ fontSize: '11px', color: DS.colors.textMuted, marginTop: 2 }}>{e.isla} · {e.sector} · {e.empleados} empleados</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  {e.prioridad === 'alta' && <Badge label="Alta prioridad" color="red" />}
                  <Badge label={`${e.docs.length} docs`} color={e.docs.length >= 2 ? 'green' : 'amber'} />
                  <span style={{ fontSize: '11px', color: DS.colors.textMuted }}>{e.solicitado}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {sel && (
          <Card style={{ padding: '22px 24px', position: 'sticky', top: 80, alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary }}>{sel.nombre}</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.textMuted, fontSize: '18px' }}>×</button>
            </div>
            {[['Contacto', sel.contacto],['Email', sel.email],['Isla', sel.isla],['Sector', sel.sector],['Empleados', sel.empleados],['Solicitado', sel.solicitado]].map(([l,v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${DS.colors.borderLight}`, fontSize: '12px' }}>
                <span style={{ color: DS.colors.textMuted }}>{l}</span>
                <span style={{ fontWeight: 600, color: DS.colors.textPrimary }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, marginBottom: 6 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: DS.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Documentos adjuntos</div>
              {sel.docs.length > 0 ? sel.docs.map(d => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: '12px', color: DS.colors.textPrimary }}>
                  <span style={{ color: DS.colors.green }}>📄</span> {d}
                </div>
              )) : <div style={{ fontSize: '12px', color: DS.colors.red }}>Sin documentos adjuntos</div>}
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: DS.colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Notas internas</div>
              <Textarea rows={2} placeholder="Añadir nota de revisión…" />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <Btn variant="teal" full>Aprobar empresa</Btn>
              <Btn variant="danger" full>Rechazar</Btn>
            </div>
            <Btn variant="secondary" size="sm" full style={{ marginTop: 8 }}>Solicitar más información</Btn>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─── Evidencias ───────────────────────────────────────────────────────────────
function AdminEvidenciasScreen() {
  const evidencias = [
    { id: 1, empresa: 'Hotel Atlántico Costa Adeje', usuario: 'Ex-empleado verificado', tipo: 'Condiciones de turno', prioridad: 'alta', estado: 'pendiente', dias: 2, texto: 'Adjunta nóminas de 3 meses donde los plus de nocturnidad no aparecen tal como se pactó en el contrato de trabajo.' },
    { id: 2, empresa: 'Restaurante La Terraza del Puerto', usuario: 'Ex-empleado verificado', tipo: 'Salario incumplido', prioridad: 'urgente', estado: 'pendiente', dias: 6, texto: 'Aporta 2 nóminas con salario por debajo del convenio de hostelería. Diferencia de 120€/mes durante 4 meses.' },
    { id: 3, empresa: 'Hotel Jardín del Teide', usuario: 'Empleado activo', tipo: 'Ambiente laboral', prioridad: 'normal', estado: 'en revisión', dias: 1, texto: 'Denuncia ambiente de presión psicológica por parte de jefatura directa. No adjunta documentación formal.' },
    { id: 4, empresa: 'Resort Volcán Experience', usuario: 'Ex-empleado verificado', tipo: 'Horas extra no pagadas', prioridad: 'alta', estado: 'respondida', dias: 0, texto: 'Registros de control horario vs. nóminas. Diferencia de 40h extras sin compensar en 3 meses.' },
  ];

  const colorPrio = { urgente: 'red', alta: 'amber', normal: 'neutral' };
  const colorEst = { pendiente: 'amber', 'en revisión': 'blue', respondida: 'green' };

  return (
    <div>
      <SectionHeader title="Evidencias pendientes" subtitle="Documentación aportada por empleados que requiere revisión" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {[['4', 'urgentes / alta prioridad', DS.colors.red], ['8', 'en revisión activa', DS.colors.blue], ['6', 'respondidas este mes', DS.colors.green]].map(([v,l,c]) => (
          <Card key={l} style={{ padding: '16px 20px', borderLeft: `3px solid ${c}` }}>
            <div style={{ fontSize: '22px', fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: '12px', color: DS.colors.textSecondary, marginTop: 2 }}>{l}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {evidencias.map(ev => (
          <Card key={ev.id} style={{ padding: '18px 22px', borderLeft: ev.prioridad === 'urgente' ? `3px solid ${DS.colors.red}` : ev.prioridad === 'alta' ? `3px solid ${DS.colors.amber}` : '3px solid transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 3 }}>{ev.empresa}</div>
                <div style={{ fontSize: '12px', color: DS.colors.textSecondary }}>{ev.tipo} · {ev.usuario}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge label={ev.prioridad} color={colorPrio[ev.prioridad]} />
                <Badge label={ev.estado} color={colorEst[ev.estado]} dot />
                {ev.dias > 0 && <Badge label={`${ev.dias}d pendiente`} color={ev.dias >= 5 ? 'red' : 'amber'} />}
              </div>
            </div>
            <p style={{ fontSize: '13px', color: DS.colors.textSecondary, margin: '0 0 14px', lineHeight: 1.6 }}>{ev.texto}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn size="sm" variant="teal">Aprobar evidencia</Btn>
              <Btn size="sm" variant="secondary">Solicitar más info</Btn>
              <Btn size="sm" variant="ghost">Rechazar</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Moderación de Opiniones ───────────────────────────────────────────────────
function AdminModeracionScreen() {
  const [tab, setTab] = React.useState('reportadas');
  const opiniones = [
    { empresa: 'Hotel Jardín del Teide', autor: 'Usuario anónimo verificado', rating: 1, texto: 'Empresa que no cumple los horarios. Me hicieron trabajar más de lo contratado sin pagar las horas extra.', motivo: 'Posible lenguaje ofensivo', estado: 'pendiente', impacto: 'medio' },
    { empresa: 'Restaurante La Terraza del Puerto', autor: 'Ex-empleado verificado', rating: 2, texto: 'El trato de los jefes es muy mejorable. Hay favoritismos evidentes.', motivo: 'Reportada por la empresa como falsa', estado: 'pendiente', impacto: 'alto' },
    { empresa: 'Grupo GastroCanarias', autor: 'Usuario verificado', rating: 5, texto: 'Empresa excelente. Todo lo prometido cumplido. Totalmente recomendable.', motivo: 'Sospecha de opinión falsa positiva', estado: 'en revisión', impacto: 'bajo' },
  ];

  return (
    <div>
      <SectionHeader title="Moderación de opiniones" subtitle="Opiniones reportadas o marcadas para revisión" />
      <Tabs tabs={[{ id: 'reportadas', label: 'Reportadas', count: 2 },{ id: 'revision', label: 'En revisión', count: 1 },{ id: 'resueltas', label: 'Resueltas', count: 14 }]} active={tab} onChange={setTab} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {opiniones.filter(o => tab === 'reportadas' ? o.estado === 'pendiente' : tab === 'revision' ? o.estado === 'en revisión' : false).map((o, i) => (
          <Card key={i} style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 3 }}>{o.empresa}</div>
                <div style={{ fontSize: '12px', color: DS.colors.textSecondary }}>{o.autor}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <StarRating value={o.rating} />
                <Badge label={`Impacto ${o.impacto}`} color={o.impacto === 'alto' ? 'red' : o.impacto === 'medio' ? 'amber' : 'neutral'} />
              </div>
            </div>
            <div style={{ padding: '12px 14px', background: DS.colors.pageBg, borderRadius: DS.radius.md, marginBottom: 12, fontSize: '13px', color: DS.colors.textSecondary, lineHeight: 1.6, fontStyle: 'italic' }}>"{o.texto}"</div>
            <Alert type="warning" message={`Motivo del reporte: ${o.motivo}`} />
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <Btn size="sm" variant="teal">Mantener opinión</Btn>
              <Btn size="sm" variant="danger">Eliminar opinión</Btn>
              <Btn size="sm" variant="secondary">Solicitar aclaración</Btn>
            </div>
          </Card>
        ))}
        {tab === 'resueltas' && (
          <EmptyState icon="✓" title="14 opiniones resueltas este mes" subtitle="El historial de moderación está disponible en el panel de reportes." />
        )}
      </div>
    </div>
  );
}

// ─── Reportes ─────────────────────────────────────────────────────────────────
function AdminReportesScreen() {
  return (
    <div>
      <SectionHeader title="Reportes e incidencias" subtitle="Seguimiento de todos los reportes abiertos" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Abiertos" value="9" icon="🚩" accent />
        <MetricCard label="En revisión" value="4" icon="↻" />
        <MetricCard label="Resueltos (mes)" value="23" icon="✓" trend={5} />
        <MetricCard label="Tiempo medio" value="2.4d" sub="de resolución" icon="⏱" />
      </div>
      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${DS.colors.border}` }}>
              {['Empresa', 'Tipo', 'Prioridad', 'Estado', 'Creado', 'Asignado a', ''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 20px', color: DS.colors.textMuted, fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Restaurante La Terraza', 'Salario incumplido', 'urgente', 'pendiente', 'Hace 6d', 'Sin asignar'],
              ['Hotel Atlántico', 'Evidencia de turnos', 'alta', 'en revisión', 'Hace 2d', 'Ana G.'],
              ['Hotel Jardín del Teide', 'Opinión falsa', 'normal', 'en revisión', 'Hace 1d', 'Carlos M.'],
              ['Resort Volcán Experience', 'Horas extra', 'alta', 'resuelto', 'Hace 5d', 'Ana G.'],
              ['Grupo GastroCanarias', 'Verificación incompleta', 'normal', 'pendiente', 'Ayer', 'Sin asignar'],
            ].map(([emp, tipo, prio, est, t, asig]) => (
              <tr key={emp+tipo} style={{ borderBottom: `1px solid ${DS.colors.borderLight}` }}>
                <td style={{ padding: '13px 20px', fontWeight: 600, color: DS.colors.textPrimary }}>{emp}</td>
                <td style={{ padding: '13px 20px', color: DS.colors.textSecondary }}>{tipo}</td>
                <td style={{ padding: '13px 20px' }}><Badge label={prio} color={prio === 'urgente' ? 'red' : prio === 'alta' ? 'amber' : 'neutral'} dot /></td>
                <td style={{ padding: '13px 20px' }}><Badge label={est} color={est === 'resuelto' ? 'green' : est === 'en revisión' ? 'blue' : 'amber'} dot /></td>
                <td style={{ padding: '13px 20px', color: DS.colors.textMuted, fontSize: '12px' }}>{t}</td>
                <td style={{ padding: '13px 20px', color: est === 'resuelto' ? DS.colors.textMuted : DS.colors.textPrimary, fontSize: '12px' }}>{asig}</td>
                <td style={{ padding: '13px 20px' }}><Btn variant="secondary" size="sm">Ver</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

Object.assign(window, { AdminDashboardScreen, AdminEmpresasScreen, AdminEvidenciasScreen, AdminModeracionScreen, AdminReportesScreen });
