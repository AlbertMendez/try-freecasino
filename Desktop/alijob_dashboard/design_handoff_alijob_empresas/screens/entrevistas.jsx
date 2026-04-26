
// AliJob Empresas — Entrevistas + Detalle Entrevista

const ENTREVISTAS_DATA = [
  { id: 1, candidato: 'María García Sánchez', puesto: 'Jefe/a de sala', fecha: 'Hoy, 16:00h', estado: 'confirmada', tipo: 'Presencial', notas: 'Candidata muy sólida. Preguntar por disponibilidad de horario nocturno.' },
  { id: 2, candidato: 'Alejandro Ruiz Martín', puesto: 'Recepcionista', fecha: 'Mañana, 10:30h', estado: 'pendiente', tipo: 'Videollamada', notas: '' },
  { id: 3, candidato: 'Carmen Vega Torres', puesto: 'Cocinero/a', fecha: 'Jue 29, 12:00h', estado: 'confirmada', tipo: 'Presencial', notas: 'Llevar CV impreso. Prueba práctica de 20 min.' },
  { id: 4, candidato: 'Elena Moreno Cabrera', puesto: 'Jefe/a de sala', fecha: 'Vie 30, 09:00h', estado: 'pendiente', tipo: 'Presencial', notas: '' },
  { id: 5, candidato: 'Roberto Silva Pérez', puesto: 'Animador/a turístico', fecha: 'Lun 2 jun, 11:00h', estado: 'confirmada', tipo: 'Videollamada', notas: 'Segunda entrevista. Ya pasó el filtro inicial.' },
  { id: 6, candidato: 'Ana López Ferrer', puesto: 'Camarera de sala', fecha: 'Mar 3 jun, 17:00h', estado: 'completada', tipo: 'Presencial', notas: 'Muy buena impresión. Pendiente de decisión final.' },
];

function EntrevistasScreen({ setPage }) {
  const [tab, setTab] = React.useState('proximas');

  const grupos = {
    proximas: ENTREVISTAS_DATA.filter(e => e.estado !== 'completada'),
    completadas: ENTREVISTAS_DATA.filter(e => e.estado === 'completada'),
  };
  const lista = grupos[tab] || [];

  const colorEstado = { confirmada: 'green', pendiente: 'amber', completada: 'neutral' };

  return (
    <div>
      <SectionHeader
        title="Entrevistas"
        subtitle="Gestiona y organiza todas tus entrevistas"
      />
      <Tabs
        tabs={[
          { id: 'proximas', label: 'Próximas', count: grupos.proximas.length },
          { id: 'completadas', label: 'Completadas', count: grupos.completadas.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {lista.map(e => (
          <Card key={e.id} hover onClick={() => setPage('detalle-entrevista')} style={{ padding: '18px 20px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <Badge label={e.estado} color={colorEstado[e.estado]} dot />
              <span style={{ fontSize: '11px', color: DS.colors.textMuted, fontWeight: 600 }}>{e.tipo}</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: DS.colors.textPrimary, marginBottom: 3, letterSpacing: '-0.02em' }}>{e.candidato}</div>
            <div style={{ fontSize: '13px', color: DS.colors.textSecondary, marginBottom: 12 }}>{e.puesto}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '14px' }}>🗓</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: DS.colors.textPrimary }}>{e.fecha}</span>
              </div>
              {e.notas && (
                <span style={{ fontSize: '11px', color: DS.colors.textMuted, background: DS.colors.borderLight, padding: '2px 8px', borderRadius: DS.radius.full }}>Con notas</span>
              )}
            </div>
            {e.estado === 'pendiente' && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${DS.colors.borderLight}`, display: 'flex', gap: 8 }}>
                <Btn size="sm" onClick={ev => ev.stopPropagation()}>Confirmar asistencia</Btn>
                <Btn size="sm" variant="ghost" onClick={ev => ev.stopPropagation()}>Reprogramar</Btn>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Detalle Entrevista ────────────────────────────────────────────────────────
function DetalleEntrevistaScreen({ setPage }) {
  const e = ENTREVISTAS_DATA[0];
  const [checklist, setChecklist] = React.useState([false, false, false, false]);
  const items = ['Confirmar disponibilidad de horario nocturno', 'Revisar referencias laborales previas', 'Presentar condiciones salariales finales', 'Visita guiada a las instalaciones'];

  return (
    <div>
      <SectionHeader
        title="Detalle de entrevista"
        subtitle={`${e.candidato} · ${e.puesto}`}
        actions={[
          <Btn key="back" variant="secondary" onClick={() => setPage('entrevistas')}>← Volver</Btn>,
          <Btn key="reprog" variant="ghost">Reprogramar</Btn>,
          <Btn key="confirm">Confirmar asistencia</Btn>,
        ]}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Info entrevista */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 18 }}>Información de la entrevista</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['Candidato', e.candidato],['Puesto', e.puesto],['Fecha y hora', e.fecha],['Modalidad', e.tipo],['Estado', ''],['Entrevistador', 'Laura Pérez (RRHH)']].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: '11px', color: DS.colors.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{l}</div>
                  {l === 'Estado'
                    ? <Badge label={e.estado} color="green" dot />
                    : <div style={{ fontSize: '13px', fontWeight: 600, color: DS.colors.textPrimary }}>{v}</div>
                  }
                </div>
              ))}
            </div>
          </Card>

          {/* Checklist */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 16 }}>
              Checklist de entrevista
              <span style={{ marginLeft: 10, fontSize: '12px', fontWeight: 400, color: DS.colors.textMuted }}>{checklist.filter(Boolean).length}/{items.length} completados</span>
            </div>
            <div style={{ height: 4, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden', marginBottom: 18 }}>
              <div style={{ width: `${(checklist.filter(Boolean).length / items.length) * 100}%`, height: '100%', background: DS.colors.accent, borderRadius: 9999, transition: 'width 0.3s' }}></div>
            </div>
            {items.map((item, i) => (
              <label key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, cursor: 'pointer' }}>
                <div onClick={() => setChecklist(prev => prev.map((v, j) => j === i ? !v : v))} style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${checklist[i] ? DS.colors.green : DS.colors.border}`, background: checklist[i] ? DS.colors.green : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, transition: 'all 0.15s' }}>
                  {checklist[i] && <span style={{ color: '#fff', fontSize: '10px', fontWeight: 800 }}>✓</span>}
                </div>
                <span style={{ fontSize: '13px', color: checklist[i] ? DS.colors.textMuted : DS.colors.textPrimary, textDecoration: checklist[i] ? 'line-through' : 'none', lineHeight: 1.5 }}>{item}</span>
              </label>
            ))}
          </Card>

          {/* Notas + Feedback */}
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Notas internas</div>
            <Textarea rows={4} value="Candidata muy sólida. Preguntar por disponibilidad de horario nocturno." />
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginTop: 20, marginBottom: 14 }}>Feedback posterior a la entrevista</div>
            <Textarea rows={3} placeholder="Escribe aquí tu valoración tras la entrevista..." />
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <Btn>Guardar notas</Btn>
              <Btn variant="secondary">Descartar candidato</Btn>
            </div>
          </Card>
        </div>

        {/* Candidato sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Candidato</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${DS.colors.borderLight}` }}>
              <Avatar name={e.candidato} size={42} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: DS.colors.textPrimary }}>{e.candidato}</div>
                <div style={{ fontSize: '12px', color: DS.colors.textSecondary }}>5 años de experiencia</div>
                <Badge label="Match 92%" color="green" />
              </div>
            </div>
            <Btn variant="secondary" size="sm" full onClick={() => setPage('detalle-candidato')}>Ver perfil completo</Btn>
          </Card>

          <Card style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Estado de asistencia</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Asistió · OK', 'No asistió', 'Canceló con aviso', 'Reprogramada'].map(o => (
                <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '13px', color: DS.colors.textSecondary }}>
                  <input type="radio" name="asistencia" style={{ accentColor: DS.colors.accent }} defaultChecked={o === 'Asistió · OK'} />
                  {o}
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EntrevistasScreen, DetalleEntrevistaScreen });
