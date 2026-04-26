
// AliJob Empresas — Reputación + Perfil + Verificaciones

function ReputacionScreen({ setPage }) {
  const subratings = [
    { label: 'Ambiente laboral', score: 4.5 },
    { label: 'Salario y compensación', score: 3.9 },
    { label: 'Cumplimiento de condiciones', score: 4.2 },
    { label: 'Gestión de turnos', score: 4.0 },
    { label: 'Gestión y liderazgo', score: 4.3 },
    { label: 'Posibilidades de crecimiento', score: 3.7 },
    { label: 'Conciliación familiar', score: 3.8 },
  ];

  const opiniones = [
    { autor: 'Ex-empleado verificado', puesto: 'Camarero de sala', fecha: 'Hace 2 semanas', rating: 5, texto: 'Muy buen ambiente de trabajo. El equipo de RRHH es cercano y profesional. El salario cumplió exactamente con lo prometido.', verificada: true },
    { autor: 'Ex-empleado verificado', puesto: 'Recepcionista', fecha: 'Hace 1 mes', rating: 4, texto: 'Buena empresa en general. Los turnos son exigentes en temporada alta pero está dentro de lo esperado.', verificada: true },
    { autor: 'Ex-empleado verificado', puesto: 'Gobernanta', fecha: 'Hace 2 meses', rating: 3, texto: 'Las condiciones de convenio se cumplen pero hay margen de mejora en la comunicación interna entre departamentos.', verificada: false },
  ];

  return (
    <div>
      <SectionHeader
        title="Reputación laboral"
        subtitle="Cómo te valoran tus empleados · Datos verificados por AliJob"
        actions={[<Btn key="reco" variant="secondary">Ver recomendaciones</Btn>]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, marginBottom: 24 }}>
        {/* Score global */}
        <Card style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontWeight: 900, color: DS.colors.textPrimary, letterSpacing: '-0.04em', lineHeight: 1 }}>4.3</div>
          <div style={{ marginTop: 10, marginBottom: 8 }}><StarRating value={4.3} size={20} /></div>
          <div style={{ fontSize: '13px', color: DS.colors.textSecondary, marginBottom: 16 }}>Basado en 47 opiniones verificadas</div>
          <VerBadge label="Reputación verificada" verified />
          <div style={{ marginTop: 20, width: '100%' }}>
            {[5,4,3,2,1].map(s => {
              const count = [22,18,5,1,1][5-s];
              const pct = Math.round((count / 47) * 100);
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: DS.colors.textMuted, minWidth: 14 }}>{s}</span>
                  <span style={{ color: '#F59E0B', fontSize: '11px' }}>★</span>
                  <div style={{ flex: 1, height: 5, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#F59E0B', borderRadius: 9999 }}></div>
                  </div>
                  <span style={{ fontSize: '11px', color: DS.colors.textMuted, minWidth: 20 }}>{count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Subratings */}
        <Card style={{ padding: '24px 26px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 20 }}>Desglose por dimensión</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {subratings.map(r => (
              <div key={r.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: DS.colors.textSecondary }}>{r.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: r.score >= 4 ? DS.colors.green : r.score >= 3.5 ? DS.colors.amber : DS.colors.red }}>{r.score}</span>
                </div>
                <div style={{ height: 6, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ width: `${(r.score / 5) * 100}%`, height: '100%', background: r.score >= 4 ? DS.colors.green : r.score >= 3.5 ? DS.colors.amber : DS.colors.red, borderRadius: 9999 }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts / recomendaciones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <Alert type="warning" title="Evidencia pendiente de respuesta" message="Un ex-empleado ha enviado documentación sobre condiciones de turnos. Tienes hasta el 2 de junio para responder formalmente." action="Responder →" />
        <Alert type="info" title="Mejora posible: salario y compensación" message="Tu puntuación en compensación (3.9) está por debajo de la media del sector en Tenerife (4.2). Comunicar mejoras puede aumentarla." />
      </div>

      {/* Opiniones */}
      <div style={{ fontSize: '15px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 16 }}>Opiniones verificadas</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {opiniones.map((o, i) => (
          <Card key={i} style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Avatar name={o.autor} size={36} color={DS.colors.teal} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary }}>{o.autor}</div>
                  <div style={{ fontSize: '11px', color: DS.colors.textMuted }}>{o.puesto} · {o.fecha}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <StarRating value={o.rating} />
                {o.verificada ? <VerBadge label="Verificada" verified /> : <Badge label="En revisión" color="amber" />}
              </div>
            </div>
            <p style={{ fontSize: '13px', color: DS.colors.textSecondary, lineHeight: 1.7, margin: 0 }}>{o.texto}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Perfil de Empresa ─────────────────────────────────────────────────────────
function PerfilScreen({ setPage }) {
  return (
    <div>
      <SectionHeader
        title="Perfil de empresa"
        subtitle="Así te ven los candidatos en AliJob"
        actions={[
          <Btn key="preview" variant="secondary">Vista previa candidato</Btn>,
          <Btn key="save">Guardar cambios</Btn>,
        ]}
      />

      {/* Completitud */}
      <Card style={{ padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary }}>Perfil completado</span>
              <span style={{ fontSize: '14px', fontWeight: 900, color: DS.colors.accent }}>82%</span>
            </div>
            <div style={{ height: 8, background: DS.colors.borderLight, borderRadius: 9999, overflow: 'hidden' }}>
              <div style={{ width: '82%', height: '100%', background: DS.colors.accent, borderRadius: 9999 }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <VerBadge label="Empresa verificada" verified />
            <VerBadge label="Salario verificado" verified />
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 18 }}>Identidad</div>
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              <div style={{ width: 80, height: 80, borderRadius: DS.radius.lg, background: DS.colors.borderLight, border: `2px dashed ${DS.colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px' }}>🏨</div>
                  <div style={{ fontSize: '10px', color: DS.colors.textMuted }}>Logo</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <FormField label="Nombre de empresa"><Input value="Hotel Atlántico Costa Adeje" /></FormField>
                <FormField label="Sector"><Select options={['Hostelería','Turismo','Restauración']} value="Hostelería" /></FormField>
              </div>
            </div>
            <FormField label="Descripción de la empresa" hint="Habla de vuestra cultura, historia y valores. Sé honesto/a.">
              <Textarea rows={4} value="Hotel boutique de 4 estrellas en Costa Adeje, Tenerife. 25 años ofreciendo experiencias únicas en el sur de la isla. Equipo de 80 personas comprometidas con la excelencia en el servicio." />
            </FormField>
          </Card>

          <Card style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 18 }}>Condiciones laborales</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <FormField label="Convenio colectivo">
                <Select options={['Hostelería de Tenerife','Hostelería de Las Palmas']} value="Hostelería de Tenerife" />
              </FormField>
              <FormField label="Mejoras sobre convenio" hint="Indica qué ofrecéis por encima del mínimo legal">
                <Textarea rows={3} value="Plus de productividad mensual, seguro médico desde el primer día, manutención en turno incluida." />
              </FormField>
              <FormField label="Beneficios del equipo">
                <Textarea rows={3} value="• Descuento en servicios del hotel&#10;• Formación continua&#10;• Plan de carrera interno&#10;• Uniforme a cargo de la empresa" />
              </FormField>
            </div>
          </Card>

          <Card style={{ padding: '22px 24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 18 }}>Cultura organizacional</div>
            <FormField label="Describe el ambiente y la cultura del equipo">
              <Textarea rows={4} placeholder="¿Cómo es el día a día en tu empresa? ¿Qué valores guían al equipo?" value="Somos un equipo diverso y cercano. Valoramos la comunicación directa, la puntualidad y el trabajo bien hecho. Apostamos por la formación interna y la promoción de nuestro propio equipo." />
            </FormField>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: DS.colors.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Valores de empresa</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Excelencia', 'Trabajo en equipo', 'Honestidad', 'Sostenibilidad', 'Formación'].map(v => <Tag key={v} label={v} />)}
              </div>
            </div>
          </Card>
        </div>

        {/* Vista previa */}
        <div>
          <Card style={{ padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 14 }}>Vista candidato</div>
            <div style={{ borderRadius: DS.radius.md, overflow: 'hidden', border: `1px solid ${DS.colors.border}` }}>
              <div style={{ height: 80, background: 'linear-gradient(135deg, #1A2A3A 0%, #2A3A4A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>foto de portada</span>
              </div>
              <div style={{ padding: '16px', background: DS.colors.cardBg }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12, marginTop: -28 }}>
                  <div style={{ width: 52, height: 52, borderRadius: DS.radius.md, background: DS.colors.accentLight, border: `3px solid ${DS.colors.cardBg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🏨</div>
                  <div style={{ paddingTop: 20 }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: DS.colors.textPrimary }}>Hotel Atlántico</div>
                    <div style={{ fontSize: '11px', color: DS.colors.textSecondary }}>Costa Adeje · Hostelería</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  <VerBadge label="Verificada" verified />
                  <Badge label="4.3 ★" color="green" />
                  <Badge label="6 vacantes" color="teal" />
                </div>
                <div style={{ fontSize: '11px', color: DS.colors.textSecondary, lineHeight: 1.6 }}>Hotel boutique de 4 estrellas en Costa Adeje...</div>
              </div>
            </div>
            <div style={{ marginTop: 14, fontSize: '11px', color: DS.colors.textMuted, lineHeight: 1.6 }}>Los candidatos ven esta tarjeta al explorar tu oferta. Un perfil completo aumenta la confianza y las aplicaciones.</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Verificaciones ────────────────────────────────────────────────────────────
function VerificacionesScreen() {
  const items = [
    { id: 'identidad', label: 'Identidad de empresa', desc: 'Nombre, CIF/NIF y documentación legal', estado: 'verificado', fecha: '12 mar 2025' },
    { id: 'email', label: 'Email corporativo', desc: 'Dominio de empresa verificado', estado: 'verificado', fecha: '12 mar 2025' },
    { id: 'ubicacion', label: 'Ubicación física', desc: 'Dirección fiscal y de actividad comprobada', estado: 'verificado', fecha: '15 mar 2025' },
    { id: 'salario', label: 'Salario verificado', desc: 'Rangos salariales publicados, auditados vs. convenio', estado: 'verificado', fecha: '20 mar 2025' },
    { id: 'convenio', label: 'Convenio colectivo', desc: 'Convenio de Hostelería de Tenerife declarado', estado: 'verificado', fecha: '20 mar 2025' },
    { id: 'cultura', label: 'Cultura organizacional', desc: 'Descripción de cultura revisada por equipo AliJob', estado: 'pendiente', fecha: null },
    { id: 'mejoras', label: 'Mejoras sobre convenio', desc: 'Beneficios declarados pendientes de contraste con empleados', estado: 'en revisión', fecha: null },
    { id: 'evidencias', label: 'Evidencias laborales', desc: 'Opiniones de empleados con documentación aportada', estado: 'en revisión', fecha: null },
  ];

  const colorEstado = { verificado: 'green', pendiente: 'amber', 'en revisión': 'blue', rechazado: 'red' };

  return (
    <div>
      <SectionHeader title="Verificaciones" subtitle="Estado de todos los elementos verificables de tu empresa" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
        {[['5', 'Verificados', DS.colors.green], ['2', 'En revisión', DS.colors.blue], ['1', 'Pendientes', DS.colors.amber]].map(([v, l, c]) => (
          <Card key={l} style={{ padding: '16px 20px', borderLeft: `3px solid ${c}` }}>
            <div style={{ fontSize: '24px', fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: '12px', color: DS.colors.textSecondary, marginTop: 2 }}>{l}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <Card key={item.id} style={{ padding: '18px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: DS.radius.md, background: item.estado === 'verificado' ? DS.colors.greenLight : item.estado === 'en revisión' ? DS.colors.blueLight : DS.colors.amberLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                {item.estado === 'verificado' ? '✓' : item.estado === 'en revisión' ? '↻' : '○'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: DS.colors.textPrimary }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: DS.colors.textSecondary, marginTop: 2 }}>{item.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {item.fecha && <span style={{ fontSize: '11px', color: DS.colors.textMuted }}>{item.fecha}</span>}
                <Badge label={item.estado} color={colorEstado[item.estado]} dot />
                {item.estado !== 'verificado' && <Btn variant="secondary" size="sm">Completar</Btn>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ReputacionScreen, PerfilScreen, VerificacionesScreen });
