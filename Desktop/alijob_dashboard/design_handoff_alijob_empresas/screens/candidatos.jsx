
// AliJob Empresas — Candidatos + Detalle Candidato

const CANDIDATOS_DATA = [
  { id: 1, nombre: 'María García Sánchez', puesto: 'Jefe/a de sala', match: 92, disponibilidad: 'Inmediata', ubicacion: 'Santa Cruz de Tenerife', experiencia: '5 años', estado: 'nuevo', idiomas: ['Español','Inglés B2','Alemán A1'], verificado: true, fiabilidad: 96 },
  { id: 2, nombre: 'Alejandro Ruiz Martín', puesto: 'Recepcionista', match: 85, disponibilidad: '2 semanas', ubicacion: 'La Laguna, Tenerife', experiencia: '3 años', estado: 'en revisión', idiomas: ['Español','Inglés C1','Francés B1'], verificado: true, fiabilidad: 88 },
  { id: 3, nombre: 'Carmen Vega Torres', puesto: 'Cocinero/a', match: 78, disponibilidad: '1 mes', ubicacion: 'Puerto de la Cruz', experiencia: '4 años', estado: 'guardado', idiomas: ['Español','Inglés A2'], verificado: false, fiabilidad: 82 },
  { id: 4, nombre: 'Pedro Álvarez Díaz', puesto: 'Camarero/a de sala', match: 71, disponibilidad: 'Inmediata', ubicacion: 'Costa Adeje, Tenerife', experiencia: '1 año', estado: 'nuevo', idiomas: ['Español'], verificado: true, fiabilidad: 74 },
  { id: 5, nombre: 'Elena Moreno Cabrera', puesto: 'Jefe/a de sala', match: 88, disponibilidad: 'Inmediata', ubicacion: 'Las Américas, Tenerife', experiencia: '6 años', estado: 'entrevista', idiomas: ['Español','Inglés B1','Italiano A2'], verificado: true, fiabilidad: 91 },
  { id: 6, nombre: 'Luis Hernández Castro', puesto: 'Personal de pisos', match: 65, disponibilidad: '2 semanas', ubicacion: 'Playa de las Américas', experiencia: '2 años', estado: 'descartado', idiomas: ['Español'], verificado: false, fiabilidad: 68 },
];

const estadoColors = { nuevo: 'teal', 'en revisión': 'amber', guardado: 'blue', entrevista: 'purple', descartado: 'neutral' };

function CandidatosScreen({ setPage, setSelectedCandidato }) {
  const [filtroMatch, setFiltroMatch] = React.useState('todos');
  const [filtroEstado, setFiltroEstado] = React.useState('todos');
  const [filtroPuesto, setFiltroPuesto] = React.useState('todos');

  const filtered = CANDIDATOS_DATA.filter(c => {
    const matchOk = filtroMatch === 'todos' || (filtroMatch === 'alto' && c.match >= 80) || (filtroMatch === 'medio' && c.match >= 60 && c.match < 80) || (filtroMatch === 'bajo' && c.match < 60);
    const estadoOk = filtroEstado === 'todos' || c.estado === filtroEstado;
    return matchOk && estadoOk;
  });

  return (
    <div>
      <SectionHeader
        title="Candidatos"
        subtitle={`${CANDIDATOS_DATA.length} candidatos recibidos · 23 con match alto`}
        actions={[<Btn key="export" variant="secondary" size="sm">Exportar</Btn>]}
      />

      {/* Filters */}
      <Card style={{ padding: '14px 18px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: DS.colors.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Filtrar por</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['todos','Todos'],['alto','Match alto'],['medio','Match medio']].map(([v,l]) => (
              <button key={v} onClick={() => setFiltroMatch(v)} style={{ padding: '5px 12px', borderRadius: DS.radius.full, border: `1px solid ${filtroMatch === v ? DS.colors.accent : DS.colors.border}`, background: filtroMatch === v ? DS.colors.accentLight : 'transparent', color: filtroMatch === v ? DS.colors.accent : DS.colors.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
            ))}
          </div>
          <div style={{ width: 1, height: 20, background: DS.colors.border }}></div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['todos','Todos los estados'],['nuevo','Nuevos'],['en revisión','En revisión'],['entrevista','Entrevista']].map(([v,l]) => (
              <button key={v} onClick={() => setFiltroEstado(v)} style={{ padding: '5px 12px', borderRadius: DS.radius.full, border: `1px solid ${filtroEstado === v ? DS.colors.accent : DS.colors.border}`, background: filtroEstado === v ? DS.colors.accentLight : 'transparent', color: filtroEstado === v ? DS.colors.accent : DS.colors.textSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{l}</button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: DS.colors.textMuted }}>{filtered.length} resultados</span>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${DS.colors.border}` }}>
              {['Candidato', 'Oferta', 'Match', 'Disponibilidad', 'Ubicación', 'Estado', ''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 20px', color: DS.colors.textMuted, fontWeight: 600, fontSize: '11px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${DS.colors.borderLight}`, transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = DS.colors.pageBg}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={c.nombre} size={34} />
                    <div>
                      <div style={{ fontWeight: 700, color: DS.colors.textPrimary, cursor: 'pointer' }}
                        onClick={() => { setSelectedCandidato(c); setPage('detalle-candidato'); }}>
                        {c.nombre}
                      </div>
                      <div style={{ fontSize: '11px', color: DS.colors.textMuted }}>{c.experiencia} de exp.</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', color: DS.colors.textSecondary }}>{c.puesto}</td>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 6, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{ width: `${c.match}%`, height: '100%', background: c.match >= 80 ? DS.colors.green : c.match >= 65 ? DS.colors.teal : DS.colors.amber, borderRadius: 9999 }}></div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: c.match >= 80 ? DS.colors.green : c.match >= 65 ? DS.colors.teal : DS.colors.amber }}>{c.match}%</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', color: DS.colors.textSecondary }}>{c.disponibilidad}</td>
                <td style={{ padding: '14px 20px', color: DS.colors.textSecondary }}>{c.ubicacion}</td>
                <td style={{ padding: '14px 20px' }}><Badge label={c.estado} color={estadoColors[c.estado]} dot /></td>
                <td style={{ padding: '14px 20px' }}>
                  <Btn variant="secondary" size="sm" onClick={() => { setSelectedCandidato(c); setPage('detalle-candidato'); }}>Ver perfil</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── Detalle Candidato ─────────────────────────────────────────────────────────
function DetalleCandidatoScreen({ setPage, candidato }) {
  const c = candidato || CANDIDATOS_DATA[0];
  const [tab, setTab] = React.useState('resumen');

  const matchFactors = [
    { label: 'Experiencia relevante', score: 95, desc: '5 años en puestos similares en hoteles de 4 y 5 estrellas' },
    { label: 'Idiomas', score: 88, desc: 'Español nativo, inglés B2 verificado por certificado oficial' },
    { label: 'Disponibilidad', score: 100, desc: 'Disponibilidad inmediata, sin compromisos actuales' },
    { label: 'Ubicación', score: 80, desc: 'Reside en Santa Cruz, desplazamiento estimado 35 min' },
    { label: 'Titulación', score: 90, desc: 'Título de hostelería · Escuela de Hostelería de Tenerife' },
  ];

  return (
    <div>
      <SectionHeader
        title={c.nombre}
        subtitle={`Candidato para ${c.puesto} · Match ${c.match}%`}
        actions={[
          <Btn key="back" variant="secondary" onClick={() => setPage('candidatos')}>← Volver</Btn>,
          <Btn key="discard" variant="ghost">Descartar</Btn>,
          <Btn key="save" variant="secondary">Guardar</Btn>,
          <Btn key="invite" onClick={() => setPage('entrevistas')}>Invitar a entrevista</Btn>,
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <Tabs
            tabs={[{ id: 'resumen', label: 'Resumen' }, { id: 'match', label: 'Match explicado' }, { id: 'experiencia', label: 'Experiencia' }]}
            active={tab}
            onChange={setTab}
          />

          {tab === 'resumen' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Card style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Puntos fuertes</div>
                {['Experiencia sólida en hoteles de categoría similar', 'Idioma inglés verificado por certificado', 'Referencias contrastadas de empleos anteriores', 'Disponibilidad inmediata sin condiciones'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: DS.colors.green, fontWeight: 800, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: '13px', color: DS.colors.textSecondary }}>{p}</span>
                  </div>
                ))}
              </Card>
              <Card style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Posibles dudas</div>
                {['Sin experiencia documentada en gestión de equipos grandes (+10 personas)', 'Alemán solo nivel A1 — valorar si es requisito importante'].map(p => (
                  <div key={p} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: DS.colors.amber, fontWeight: 800, marginTop: 1 }}>○</span>
                    <span style={{ fontSize: '13px', color: DS.colors.textSecondary }}>{p}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {tab === 'match' && (
            <Card style={{ padding: '22px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: DS.colors.greenLight, border: `3px solid ${DS.colors.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: DS.colors.green }}>{c.match}%</span>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: DS.colors.textPrimary, letterSpacing: '-0.02em' }}>Match muy alto</div>
                  <div style={{ fontSize: '13px', color: DS.colors.textSecondary, marginTop: 3 }}>Este candidato encaja en 5 de los 6 criterios clave del puesto</div>
                </div>
              </div>
              {matchFactors.map(f => (
                <div key={f.label} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary }}>{f.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: f.score >= 80 ? DS.colors.green : DS.colors.amber }}>{f.score}%</span>
                  </div>
                  <div style={{ height: 6, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden', marginBottom: 5 }}>
                    <div style={{ width: `${f.score}%`, height: '100%', background: f.score >= 80 ? DS.colors.green : DS.colors.amber, borderRadius: 9999 }}></div>
                  </div>
                  <div style={{ fontSize: '11px', color: DS.colors.textMuted }}>{f.desc}</div>
                </div>
              ))}
            </Card>
          )}

          {tab === 'experiencia' && (
            <Card style={{ padding: '22px 24px' }}>
              {[
                { empresa: 'Hotel Gran Meliá Salinas', rol: 'Responsable de sala', periodo: '2022–2025', desc: 'Gestión de sala en restaurante principal de 5 estrellas. Supervisión de equipo de 8 personas.' },
                { empresa: 'Restaurante La Brasa', rol: 'Jefe de rango', periodo: '2020–2022', desc: 'Servicio de restaurante a la carta, atención personalizada.' },
                { empresa: 'Hotel Samos Tenerife', rol: 'Camarero de sala', periodo: '2018–2020', desc: 'Primer empleo en hostelería. Servicio buffet y carte.' },
              ].map(e => (
                <div key={e.empresa} style={{ marginBottom: 22, paddingBottom: 22, borderBottom: `1px solid ${DS.colors.borderLight}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: DS.colors.textPrimary }}>{e.rol}</div>
                    <span style={{ fontSize: '12px', color: DS.colors.textMuted }}>{e.periodo}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: DS.colors.accent, marginBottom: 6 }}>{e.empresa}</div>
                  <div style={{ fontSize: '12px', color: DS.colors.textSecondary, lineHeight: 1.6 }}>{e.desc}</div>
                </div>
              ))}
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${DS.colors.borderLight}` }}>
              <Avatar name={c.nombre} size={56} />
              <div style={{ fontSize: '15px', fontWeight: 800, color: DS.colors.textPrimary, marginTop: 12, textAlign: 'center' }}>{c.nombre}</div>
              <div style={{ fontSize: '12px', color: DS.colors.textSecondary, marginTop: 4 }}>{c.puesto}</div>
              <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                <Badge label={`Match ${c.match}%`} color={c.match >= 80 ? 'green' : 'teal'} />
                {c.verificado && <VerBadge label="Verificado" verified />}
              </div>
            </div>
            {[
              ['📍 Ubicación', c.ubicacion],
              ['⏱ Disponibilidad', c.disponibilidad],
              ['💼 Experiencia', c.experiencia],
              ['📊 Fiabilidad', `${c.fiabilidad}%`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${DS.colors.borderLight}`, fontSize: '12px' }}>
                <span style={{ color: DS.colors.textMuted }}>{l}</span>
                <span style={{ fontWeight: 700, color: DS.colors.textPrimary }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: DS.colors.textMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Idiomas</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {c.idiomas.map(i => <Tag key={i} label={i} />)}
              </div>
            </div>
          </Card>
          <Card style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Acciones</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Btn full onClick={() => setPage('entrevistas')}>Invitar a entrevista</Btn>
              <Btn full variant="secondary">Guardar candidato</Btn>
              <Btn full variant="ghost">Descartar</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CandidatosScreen, DetalleCandidatoScreen });
