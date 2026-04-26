
// AliJob Empresas — Dashboard + Vacantes + Crear/Editar Oferta

function DashboardScreen({ setPage }) {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: DS.colors.textPrimary, margin: 0, letterSpacing: '-0.03em' }}>Bienvenida, Hotel Atlántico 👋</h1>
            <p style={{ fontSize: '13px', color: DS.colors.textSecondary, margin: '4px 0 0' }}>Tienes tareas pendientes hoy — Lunes, 26 de mayo de 2025</p>
          </div>
          <Btn icon="+" onClick={() => setPage('crear-oferta')}>Nueva oferta</Btn>
        </div>
      </div>

      {/* Alerts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <Alert type="warning" title="Evidencia pendiente de revisión" message="Un ex-empleado ha enviado una evidencia sobre condiciones laborales. Tienes 7 días para responder." action="Ver evidencia →" />
        <Alert type="info" title="3 candidatos nuevos con match alto" message="Han aplicado a Jefe/a de sala · Costa Adeje. Match medio: 88%." action="Revisar →" />
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <MetricCard label="Vacantes activas" value="6" sub="2 pendientes de revisión" icon="📋" accent trend={8} />
        <MetricCard label="Candidatos" value="128" sub="23 con match alto" icon="👥" trend={12} />
        <MetricCard label="Entrevistas" value="14" sub="5 esta semana" icon="🗓" accent />
        <MetricCard label="Reputación" value="4.3" sub="de 5 · 47 opiniones" icon="⭐" trend={2} />
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 24 }}>
        {/* Vacantes rendimiento */}
        <Card style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary }}>Rendimiento de vacantes</div>
            <Btn variant="ghost" size="sm" onClick={() => setPage('vacantes')}>Ver todas →</Btn>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${DS.colors.border}` }}>
                {['Puesto', 'Estado', 'Candidatos', 'Match medio'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0 0 10px', color: DS.colors.textMuted, fontWeight: 600, fontSize: '11px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Jefe/a de sala', 'activa', 28, 86],
                ['Recepcionista', 'activa', 41, 79],
                ['Cocinero/a', 'activa', 19, 72],
                ['Camarero/a de sala', 'pausada', 33, 81],
                ['Personal de pisos', 'activa', 7, 68],
              ].map(([p, e, c, m]) => (
                <tr key={p} style={{ borderBottom: `1px solid ${DS.colors.borderLight}`, cursor: 'pointer' }} onClick={() => setPage('vacantes')}>
                  <td style={{ padding: '11px 0', fontWeight: 600, color: DS.colors.textPrimary }}>{p}</td>
                  <td style={{ padding: '11px 0' }}><Badge label={e} color={e === 'activa' ? 'green' : e === 'pausada' ? 'amber' : 'neutral'} dot /></td>
                  <td style={{ padding: '11px 0', color: DS.colors.textSecondary }}>{c}</td>
                  <td style={{ padding: '11px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, maxWidth: 120 }}>
                      <div style={{ flex: 1, height: 5, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden' }}>
                        <div style={{ width: `${m}%`, height: '100%', background: m >= 80 ? DS.colors.green : DS.colors.teal, borderRadius: 9999 }}></div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: DS.colors.textSecondary }}>{m}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Accesos rápidos + perfil */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Perfil de empresa</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '12px', color: DS.colors.textSecondary }}>Completado</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: DS.colors.accent }}>82%</span>
            </div>
            <div style={{ height: 6, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ width: '82%', height: '100%', background: DS.colors.accent, borderRadius: 9999 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[['✓ Descripción', true], ['✓ Logo subido', true], ['✓ Convenio', true], ['○ Cultura organizacional', false], ['○ Fotos del equipo', false]].map(([l, ok]) => (
                <div key={l} style={{ fontSize: '12px', color: ok ? DS.colors.green : DS.colors.textMuted, display: 'flex', gap: 6 }}>{l}</div>
              ))}
            </div>
            <Btn variant="secondary" size="sm" full style={{ marginTop: 14 }} onClick={() => setPage('perfil')}>Completar perfil</Btn>
          </Card>

          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Accesos rápidos</div>
            {[['📋', 'Publicar nueva oferta', 'crear-oferta'], ['👥', 'Ver candidatos', 'candidatos'], ['🗓', 'Ver entrevistas', 'entrevistas'], ['⭐', 'Gestionar reputación', 'reputacion']].map(([ic, l, pg]) => (
              <button key={l} onClick={() => setPage(pg)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 0', background: 'none', border: 'none', borderBottom: `1px solid ${DS.colors.borderLight}`, cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: '15px' }}>{ic}</span>
                <span style={{ fontSize: '13px', color: DS.colors.textPrimary, fontWeight: 500, fontFamily: 'inherit' }}>{l}</span>
                <span style={{ marginLeft: 'auto', color: DS.colors.textMuted, fontSize: '14px' }}>›</span>
              </button>
            ))}
          </Card>
        </div>
      </div>

      {/* Entrevistas próximas */}
      <Card style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary }}>Entrevistas próximas</div>
          <Btn variant="ghost" size="sm" onClick={() => setPage('entrevistas')}>Ver todas →</Btn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { name: 'María García', role: 'Jefe/a de sala', date: 'Hoy, 16:00h', status: 'confirmada' },
            { name: 'Alejandro Ruiz', role: 'Recepcionista', date: 'Mañana, 10:30h', status: 'pendiente' },
            { name: 'Carmen Vega', role: 'Cocinera', date: 'Jue, 12:00h', status: 'confirmada' },
          ].map(e => (
            <div key={e.name} onClick={() => setPage('detalle-entrevista')} style={{ padding: '14px 16px', borderRadius: DS.radius.md, border: `1px solid ${DS.colors.border}`, cursor: 'pointer', transition: 'border-color 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Badge label={e.status} color={e.status === 'confirmada' ? 'green' : 'amber'} dot />
                <span style={{ fontSize: '11px', color: DS.colors.textMuted }}>{e.date}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '13px', color: DS.colors.textPrimary }}>{e.name}</div>
              <div style={{ fontSize: '12px', color: DS.colors.textSecondary, marginTop: 2 }}>{e.role}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Vacantes ─────────────────────────────────────────────────────────────────
function VacantesScreen({ setPage }) {
  const [tab, setTab] = React.useState('todas');
  const vacantes = [
    { id: 1, puesto: 'Jefe/a de sala', ubicacion: 'Costa Adeje, Tenerife', estado: 'activa', candidatos: 28, match: 86, salario: '22.000–26.000 €', contrato: 'Indefinido', publicada: 'Hace 3 días' },
    { id: 2, puesto: 'Recepcionista', ubicacion: 'Costa Adeje, Tenerife', estado: 'activa', candidatos: 41, match: 79, salario: '18.500–21.000 €', contrato: 'Indefinido', publicada: 'Hace 5 días' },
    { id: 3, puesto: 'Cocinero/a', ubicacion: 'Costa Adeje, Tenerife', estado: 'activa', candidatos: 19, match: 72, salario: '20.000–24.000 €', contrato: 'Indefinido', publicada: 'Hace 1 semana' },
    { id: 4, puesto: 'Camarero/a de sala', ubicacion: 'Costa Adeje, Tenerife', estado: 'pausada', candidatos: 33, match: 81, salario: '17.000–19.500 €', contrato: 'Temporal', publicada: 'Hace 2 semanas' },
    { id: 5, puesto: 'Personal de pisos', ubicacion: 'Costa Adeje, Tenerife', estado: 'activa', candidatos: 7, match: 68, salario: '16.500–18.000 €', contrato: 'Temporal', publicada: 'Ayer' },
    { id: 6, puesto: 'Animador/a turístico', ubicacion: 'Costa Adeje, Tenerife', estado: 'borrador', candidatos: 0, match: 0, salario: '17.000–20.000 €', contrato: 'Temporal', publicada: 'Borrador' },
  ];
  const colorEstado = { activa: 'green', pausada: 'amber', cerrada: 'neutral', borrador: 'neutral' };
  const filtered = tab === 'todas' ? vacantes : vacantes.filter(v => v.estado === tab);

  return (
    <div>
      <SectionHeader
        title="Vacantes"
        subtitle="Gestiona todas tus ofertas de empleo publicadas"
        actions={[<Btn key="new" icon="+" onClick={() => setPage('crear-oferta')}>Nueva oferta</Btn>]}
      />
      <Tabs
        tabs={[
          { id: 'todas', label: 'Todas', count: vacantes.length },
          { id: 'activa', label: 'Activas', count: vacantes.filter(v => v.estado === 'activa').length },
          { id: 'pausada', label: 'Pausadas', count: 1 },
          { id: 'borrador', label: 'Borradores', count: 1 },
        ]}
        active={tab}
        onChange={setTab}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(v => (
          <Card key={v.id} hover style={{ padding: '18px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: DS.colors.textPrimary, letterSpacing: '-0.02em' }}>{v.puesto}</span>
                  <Badge label={v.estado} color={colorEstado[v.estado]} dot />
                  <VerBadge label="Salario verificado" verified={v.estado !== 'borrador'} />
                </div>
                <div style={{ fontSize: '12px', color: DS.colors.textSecondary, display: 'flex', gap: 16 }}>
                  <span>📍 {v.ubicacion}</span>
                  <span>💼 {v.contrato}</span>
                  <span>💰 {v.salario}</span>
                  <span>🕐 {v.publicada}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: DS.colors.textPrimary, letterSpacing: '-0.03em' }}>{v.candidatos}</div>
                  <div style={{ fontSize: '11px', color: DS.colors.textMuted }}>candidatos</div>
                </div>
                {v.match > 0 && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: v.match >= 80 ? DS.colors.green : DS.colors.teal, letterSpacing: '-0.03em' }}>{v.match}%</div>
                    <div style={{ fontSize: '11px', color: DS.colors.textMuted }}>match medio</div>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="secondary" size="sm" onClick={() => setPage('candidatos')}>Candidatos</Btn>
                  <Btn variant="ghost" size="sm" onClick={() => setPage('editar-oferta')}>Editar</Btn>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Crear Oferta ─────────────────────────────────────────────────────────────
function CrearOfertaScreen({ setPage }) {
  const [step, setStep] = React.useState(1);
  const steps = ['Información básica', 'Condiciones', 'Requisitos', 'Previsualización'];

  return (
    <div>
      <SectionHeader
        title="Crear nueva oferta"
        subtitle="Los candidatos verán exactamente lo que aquí escribas"
        actions={[<Btn key="back" variant="secondary" onClick={() => setPage('vacantes')}>← Volver</Btn>]}
      />

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', background: i + 1 <= step ? DS.colors.accent : DS.colors.borderLight, color: i + 1 <= step ? '#fff' : DS.colors.textMuted, cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setStep(i + 1)}>{i + 1 < step ? '✓' : i + 1}</div>
              <span style={{ fontSize: '11px', fontWeight: i + 1 === step ? 700 : 400, color: i + 1 === step ? DS.colors.accent : DS.colors.textMuted, whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ height: 2, flex: 1, background: i + 1 < step ? DS.colors.accent : DS.colors.borderLight, marginBottom: 22, transition: 'background 0.3s' }}></div>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        <Card style={{ padding: '28px 28px' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: DS.colors.textPrimary, marginBottom: 4 }}>Información básica</div>
              <FormField label="Puesto" required>
                <Input value="Jefe/a de sala" />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Isla" required>
                  <Select options={['Tenerife','Gran Canaria','Lanzarote','Fuerteventura','La Palma']} value="Tenerife" />
                </FormField>
                <FormField label="Municipio / zona" required>
                  <Input value="Costa Adeje" />
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Tipo de contrato" required>
                  <Select options={['Indefinido','Temporal','Por obra','Fijo discontinuo']} value="Indefinido" />
                </FormField>
                <FormField label="Jornada" required>
                  <Select options={['Completa','Parcial','Turno partido','Rotativo']} value="Completa" />
                </FormField>
              </div>
              <FormField label="Horario" hint="Describe los turnos de forma clara">
                <Input value="Turno de noche: 20:00–02:00h, rotativo semanal" />
              </FormField>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: DS.colors.textPrimary, marginBottom: 4 }}>Condiciones económicas</div>
              <Alert type="info" title="Salario obligatorio" message="AliJob exige transparencia salarial. Los candidatos deben conocer el rango real antes de aplicar." />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="Salario mínimo (€/año)" required>
                  <Input value="22.000" prefix="€" />
                </FormField>
                <FormField label="Salario máximo (€/año)" required>
                  <Input value="26.000" prefix="€" />
                </FormField>
              </div>
              <FormField label="Convenio colectivo">
                <Select options={['Hostelería de Tenerife','Hostelería de Las Palmas','Sin convenio','Mejora sobre convenio']} value="Hostelería de Tenerife" />
              </FormField>
              <FormField label="Mejoras sobre convenio" hint="Si ofreces algo por encima del convenio, indícalo aquí">
                <Input value="Plus de productividad, seguro médico incluido" />
              </FormField>
              <FormField label="Beneficios">
                <Textarea rows={3} value="• Manutención incluida en turno&#10;• Descuento en instalaciones hoteleras&#10;• Formación continua a cargo de la empresa" />
              </FormField>
              <FormField label="¿Se ofrece alojamiento?">
                <Select options={['No incluido','Alojamiento incluido','Alojamiento con coste reducido']} value="No incluido" />
              </FormField>
            </div>
          )}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: DS.colors.textPrimary, marginBottom: 4 }}>Requisitos del puesto</div>
              <FormField label="Experiencia mínima">
                <Select options={['Sin experiencia','6 meses','1 año','2 años','3 o más años']} value="2 años" />
              </FormField>
              <FormField label="Idiomas">
                <Input value="Español nativo, inglés B2, alemán valorable" />
              </FormField>
              <FormField label="Certificaciones / titulaciones">
                <Input value="Título de hostelería o similar" />
              </FormField>
              <FormField label="Descripción del puesto" required>
                <Textarea rows={5} value="Buscamos un/a Jefe/a de sala con experiencia en restaurantes de hotel de 4 o 5 estrellas. Responsable de la coordinación del equipo de sala, atención al cliente de alto nivel y supervisión del servicio." />
              </FormField>
              <FormField label="Qué valoramos positivamente">
                <Textarea rows={3} value="• Experiencia previa en hoteles de lujo&#10;• Conocimiento de vinos y maridajes&#10;• Capacidad de liderazgo de equipos pequeños" />
              </FormField>
            </div>
          )}
          {step === 4 && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: DS.colors.textPrimary, marginBottom: 16 }}>Así verá la oferta el candidato</div>
              <div style={{ padding: '20px', borderRadius: DS.radius.lg, border: `1px solid ${DS.colors.border}`, background: DS.colors.pageBg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.02em' }}>Jefe/a de sala</h3>
                    <div style={{ fontSize: '13px', color: DS.colors.textSecondary }}>Hotel Atlántico · Costa Adeje, Tenerife</div>
                  </div>
                  <VerBadge label="Empresa verificada" verified />
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                  <Tag label="Indefinido" /><Tag label="Jornada completa" /><Tag label="2 años exp." />
                  <Badge label="22.000–26.000 €/año" color="green" />
                  <VerBadge label="Salario verificado" verified />
                </div>
                <div style={{ fontSize: '13px', color: DS.colors.textSecondary, lineHeight: 1.7 }}>
                  Buscamos un/a Jefe/a de sala con experiencia en restaurantes de hotel de 4 o 5 estrellas...
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 28, justifyContent: 'space-between' }}>
            <Btn variant="secondary" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1}>← Anterior</Btn>
            {step < 4
              ? <Btn onClick={() => setStep(step + 1)}>Siguiente →</Btn>
              : <Btn onClick={() => setPage('vacantes')}>Publicar oferta ✓</Btn>
            }
          </div>
        </Card>

        {/* Aside */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 12 }}>Consejos AliJob</div>
            {[
              ['💰', 'El salario real atrae un 3x más de candidatos que los rangos ambiguos.'],
              ['📝', 'Las ofertas con descripción de equipo tienen 40% más de aplicaciones.'],
              ['✓', 'Indicar el convenio exacto reduce la tasa de abandono un 25%.'],
            ].map(([ic, t]) => (
              <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>{ic}</span>
                <span style={{ fontSize: '12px', color: DS.colors.textSecondary, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 10 }}>Estado de la oferta</div>
            <Badge label="Borrador" color="neutral" dot />
            <div style={{ fontSize: '12px', color: DS.colors.textMuted, marginTop: 10 }}>La oferta se revisará automáticamente antes de publicarse para cumplir con los criterios AliJob.</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Editar Oferta ─────────────────────────────────────────────────────────────
function EditarOfertaScreen({ setPage }) {
  return (
    <div>
      <SectionHeader
        title="Editar oferta"
        subtitle="Jefe/a de sala · Activa desde hace 3 días"
        actions={[
          <Btn key="back" variant="secondary" onClick={() => setPage('vacantes')}>← Volver</Btn>,
          <Btn key="pause" variant="ghost">Pausar oferta</Btn>,
          <Btn key="save">Guardar cambios</Btn>,
        ]}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <Card style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <FormField label="Puesto" required><Input value="Jefe/a de sala" /></FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="Salario mínimo (€/año)" required><Input value="22.000" prefix="€" /></FormField>
              <FormField label="Salario máximo (€/año)" required><Input value="26.000" prefix="€" /></FormField>
            </div>
            <FormField label="Descripción"><Textarea rows={5} value="Buscamos un/a Jefe/a de sala con experiencia en restaurantes de hotel de 4 o 5 estrellas..." /></FormField>
            <FormField label="Requisitos"><Textarea rows={3} value="2 años de experiencia, inglés B2, español nativo" /></FormField>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Estadísticas</div>
            {[['28','Candidatos'],['86%','Match medio'],['412','Visualizaciones'],['3','Días activa']].map(([v,l]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${DS.colors.borderLight}`, fontSize: '13px' }}>
                <span style={{ color: DS.colors.textSecondary }}>{l}</span>
                <span style={{ fontWeight: 800, color: DS.colors.textPrimary }}>{v}</span>
              </div>
            ))}
          </Card>
          <Card style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 10 }}>Estado</div>
            <Badge label="Activa" color="green" dot />
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Btn variant="secondary" size="sm" full>Pausar oferta</Btn>
              <Btn variant="ghost" size="sm" full>Cerrar oferta</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardScreen, VacantesScreen, CrearOfertaScreen, EditarOfertaScreen });
