
// AliJob Empresas — Landing, Login, Registro, Subpáginas

// ─── Shared Landing Header ────────────────────────────────────────────────────
function LandingHeader({ setPage, activePage }) {
  const navItems = [
    { id: 'producto', label: 'Producto' },
    { id: 'precios', label: 'Precios' },
    { id: 'casos', label: 'Casos de éxito' },
  ];
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: '1px solid #D8E2EF', position: 'sticky', top: 0, zIndex: 100, background: '#FFFFFF', borderBottom: '1px solid #DCE6F0', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setPage('landing')}><Logo light /></div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {navItems.map(item => {
          const active = activePage === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              padding: '7px 16px', borderRadius: DS.radius.md, border: 'none',
              borderBottom: `2px solid ${active ? DS.colors.accent : 'transparent'}`,
              background: active ? 'rgba(26,95,160,0.08)' : 'transparent',
              color: active ? DS.colors.accent : '#5A7090',
              fontSize: '13px', fontWeight: active ? 700 : 500,
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
            }}>{item.label}</button>
          );
        })}
      </nav>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setPage('login')} style={{ padding: '8px 20px', borderRadius: DS.radius.md, background: 'transparent', border: '1px solid #B0C4D8', color: '#0C1528', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Iniciar sesión</button>
        <button onClick={() => setPage('registro')} style={{ padding: '8px 20px', borderRadius: DS.radius.md, background: DS.colors.accent, border: 'none', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Solicitar acceso</button>
      </div>
    </header>
  );
}

// ─── Shared shell for subpages ────────────────────────────────────────────────
function LandingShell({ setPage, activePage, children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'inherit', color: '#0C1528', display: 'flex', flexDirection: 'column' }}>
      <LandingHeader setPage={setPage} activePage={activePage} />
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ borderTop: '1px solid #D8E2EF', background: '#F0F4FA', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#5A7090' }}>© 2025 AliJob — Canarias</span>
        <a href="#" style={{ fontSize: '12px', color: '#607896', textDecoration: 'none' }}>¿Eres candidato? Descarga AliJob Mobile →</a>
      </div>
    </div>
  );
}

// ─── Producto ─────────────────────────────────────────────────────────────────
function ProductoPage({ setPage }) {
  const features = [
    { icon: '📋', title: 'Vacantes con salario verificado', desc: 'Publica ofertas con el salario real y el convenio declarado. Sin rangos ambiguos. Los candidatos aplican sabiendo exactamente qué ganarán.' },
    { icon: '🎯', title: 'Match explicado por IA', desc: 'Cada candidato llega con un score de encaje desglosado por criterio: experiencia, idiomas, disponibilidad, ubicación y titulación.' },
    { icon: '🗓', title: 'Gestión de entrevistas integrada', desc: 'Agenda, confirma y haz seguimiento de todas las entrevistas desde el mismo panel. Con checklist y notas internas.' },
    { icon: '⭐', title: 'Reputación laboral verificada', desc: 'Las opiniones de tus empleados son contrastadas con evidencia real. Nada de comentarios anónimos sin control.' },
    { icon: '✓', title: 'Verificaciones de empresa', desc: 'Certifica tu identidad, email, ubicación, salario y convenio. Las empresas verificadas reciben hasta 3x más candidatos.' },
    { icon: '🏢', title: 'Perfil de empresa completo', desc: 'Muestra tu cultura, equipo, beneficios y valores. Los candidatos elegirán tu oferta porque confían en ti.' },
  ];
  return (
    <LandingShell setPage={setPage} activePage="producto">
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: DS.radius.full, background: 'rgba(26,95,160,0.08)', border: '1px solid rgba(26,95,160,0.15)', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A5FA0' }}></span><span style={{ fontSize: '11px', fontWeight: 700, color: '#1A5FA0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Plataforma completa</span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 16px', lineHeight: 1.1, color: '#0C1528' }}>Todo lo que necesitas<br /><span style={{ color: '#1A5FA0' }}>para contratar mejor</span></h1>
          <p style={{ fontSize: '16px', color: '#607896', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>AliJob Empresas no es un portal de empleo genérico. Es una plataforma diseñada para hostelería y turismo en Canarias, con transparencia como base.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
          {features.map(f => (
            <div key={f.title} style={{ padding: '24px', borderRadius: DS.radius.xl, background: '#F4F7FB', border: '1px solid #DCE6F0' }}>
              <div style={{ fontSize: '28px', marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0C1528', marginBottom: 8, letterSpacing: '-0.02em' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: '#5A7090', lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => setPage('registro')} style={{ padding: '14px 32px', borderRadius: DS.radius.md, background: DS.colors.accent, border: 'none', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Solicitar acceso gratuito →</button>
        </div>
      </div>
    </LandingShell>
  );
}

// ─── Precios ──────────────────────────────────────────────────────────────────
function PreciosPage({ setPage }) {
  const planes = [
    { name: 'Beta gratuita', price: '0€', period: 'Durante el lanzamiento', tag: 'Activo ahora', color: DS.colors.green, features: ['Vacantes ilimitadas', 'Candidatos ilimitados', 'Panel completo de empresa', 'Verificaciones incluidas', 'Soporte prioritario beta'], cta: 'Solicitar acceso', highlight: true },
    { name: 'Starter', price: '49€', period: '/mes', tag: 'Próximamente', color: DS.colors.teal, features: ['Hasta 5 vacantes activas', '3 usuarios del equipo', 'Match de candidatos', 'Gestión de entrevistas', 'Perfil de empresa'], cta: 'Apuntarse a la lista', highlight: false },
    { name: 'Hotel / Grupo', price: '149€', period: '/mes', tag: 'Próximamente', color: DS.colors.accent, features: ['Vacantes ilimitadas', 'Equipo ilimitado', 'Dashboard de reputación avanzado', 'API de integración', 'Gestor de cuenta dedicado'], cta: 'Contactar', highlight: false },
  ];
  return (
    <LandingShell setPage={setPage} activePage="precios">
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h1 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 16px', color: '#0C1528' }}>Precios <span style={{ color: '#1A5FA0' }}>transparentes</span></h1>
          <p style={{ fontSize: '16px', color: '#607896', lineHeight: 1.7 }}>Igual que pedimos transparencia salarial a las empresas, somos transparentes con nuestros precios.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
          {planes.map(p => (
            <div key={p.name} style={{ padding: '28px 24px', borderRadius: DS.radius.xl, background: p.highlight ? 'rgba(196,104,58,0.08)' : '#F4F7FB', border: `1px solid ${p.highlight ? DS.colors.accent : '#D8E2EF'}`, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: DS.radius.full, background: `${p.color}20`, marginBottom: 16, alignSelf: 'flex-start' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color }}></span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: p.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.tag}</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0C1528', marginBottom: 8 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 20 }}>
                <span style={{ fontSize: '36px', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>{p.price}</span>
                <span style={{ fontSize: '13px', color: '#5A7090' }}>{p.period}</span>
              </div>
              <div style={{ flex: 1 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <span style={{ color: p.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '13px', color: '#607896' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setPage('registro')} style={{ width: '100%', marginTop: 24, padding: '11px', borderRadius: DS.radius.md, background: p.highlight ? DS.colors.accent : 'transparent', border: `1px solid ${p.highlight ? DS.colors.accent : '#D8E2EF'}`, color: p.highlight ? '#fff' : '#607896', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{p.cta}</button>
            </div>
          ))}
        </div>
        <div style={{ padding: '24px 32px', borderRadius: DS.radius.xl, background: '#F4F7FB', border: '1px solid #DCE6F0', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0C1528', marginBottom: 6 }}>¿Necesitas una solución a medida?</div>
          <div style={{ fontSize: '13px', color: '#5A7090', marginBottom: 16 }}>Para cadenas hoteleras, grupos de restauración o empresas con necesidades específicas.</div>
          <button style={{ padding: '10px 24px', borderRadius: DS.radius.md, background: 'transparent', border: '1px solid #DCE6F0', color: '#607896', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Hablar con el equipo</button>
        </div>
      </div>
    </LandingShell>
  );
}

// ─── Casos de éxito ───────────────────────────────────────────────────────────
function CasosPage({ setPage }) {
  const casos = [
    { empresa: 'Hotel Atlántico Costa Adeje', sector: 'Hostelería · Tenerife', logo: '🏨', rating: 4.3, vacantes: 6, candidatos: 128, tiempo: '10 días', quote: '"AliJob nos ayudó a cubrir 6 puestos en menos de 2 semanas. El match explicado nos ahorraba entrevistas innecesarias."', persona: 'Laura Pérez · RRHH' },
    { empresa: 'Grupo GastroCanarias', sector: 'Restauración · Gran Canaria', logo: '🍽', rating: 4.1, vacantes: 10, candidatos: 210, tiempo: '14 días', quote: '"La transparencia salarial cambió todo. Los candidatos llegaban con expectativas reales y el proceso era mucho más fluido."', persona: 'Ramón Delgado · CEO' },
    { empresa: 'Resort Volcán Experience', sector: 'Turismo · Tenerife', logo: '🌋', rating: 4.5, vacantes: 4, candidatos: 87, tiempo: '8 días', quote: '"La reputación verificada nos diferencia de otros hoteles. Los candidatos eligen venir a trabajar con nosotros porque confían en los datos."', persona: 'Marta Suárez · Directora RRHH' },
  ];
  return (
    <LandingShell setPage={setPage} activePage="casos">
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h1 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 16px', color: '#0C1528' }}>Empresas que <span style={{ color: '#1A5FA0' }}>ya confían</span> en AliJob</h1>
          <p style={{ fontSize: '16px', color: '#607896', lineHeight: 1.7 }}>Casos reales de hostelería y turismo en Canarias durante la beta.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginBottom: 56 }}>
          {casos.map(c => (
            <div key={c.empresa} style={{ padding: '32px', borderRadius: DS.radius.xl, background: '#F4F7FB', border: '1px solid #DCE6F0', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32 }}>
              <div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: DS.radius.lg, background: '#E8EEF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{c.logo}</div>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#0C1528', letterSpacing: '-0.02em' }}>{c.empresa}</div>
                    <div style={{ fontSize: '12px', color: '#5A7090', marginTop: 3 }}>{c.sector}</div>
                  </div>
                </div>
                <p style={{ fontSize: '15px', color: '#3A5070', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 16 }}>{c.quote}</p>
                <div style={{ fontSize: '12px', color: '#5A7090', fontWeight: 600 }}>— {c.persona}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['⭐', `${c.rating}/5`, 'Reputación verificada'], ['📋', `${c.vacantes} vacantes`, 'Cubiertas en AliJob'], ['👥', `${c.candidatos}`, 'Candidatos recibidos'], ['⏱', c.tiempo, 'Tiempo medio']].map(([ic, v, l]) => (
                  <div key={l} style={{ padding: '12px 16px', borderRadius: DS.radius.md, background: '#FFFFFF', border: '1px solid #DCE6F0' }}>
                    <div style={{ fontSize: '11px', color: '#5A7090', marginBottom: 4 }}>{ic} {l}</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0C1528', letterSpacing: '-0.03em' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#5A7090', marginBottom: 20 }}>¿Quieres ser el próximo caso de éxito?</p>
          <button onClick={() => setPage('registro')} style={{ padding: '14px 32px', borderRadius: DS.radius.md, background: DS.colors.accent, border: 'none', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Solicitar acceso gratuito →</button>
        </div>
      </div>
    </LandingShell>
  );
}

// ─── Landing principal ────────────────────────────────────────────────────────
function LandingPage({ setPage }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'inherit', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <LandingHeader setPage={setPage} activePage="landing" />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '100px 48px 80px', textAlign: 'center', overflow: 'hidden' }}>
        {/* Background decorations — absolutely positioned, non-interfering */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(26,95,160,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }}></div>
        {/* Content — normal block flow, no flex complications */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: DS.radius.full, background: 'rgba(26,95,160,0.08)', border: '1px solid rgba(26,95,160,0.15)', marginBottom: 36 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A5FA0', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#1A5FA0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Beta abierta · Canarias</span>
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.04em', color: '#0C1528', marginBottom: 32, marginTop: 0 }}>
            El panel de <span style={{ color: '#1A5FA0' }}>empresa</span><br />que tus candidatos<br />merecen ver
          </h1>
          <p style={{ fontSize: '17px', color: '#5A7090', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: 40, lineHeight: 1.65 }}>
            Publica ofertas con salario real, gestiona candidatos con match explicado y construye reputación laboral verificada.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            <button onClick={() => setPage('registro')} style={{ padding: '14px 32px', borderRadius: DS.radius.md, background: DS.colors.accent, border: 'none', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Solicitar acceso gratuito →</button>
            <button onClick={() => setPage('dashboard')} style={{ padding: '14px 32px', borderRadius: DS.radius.md, background: 'transparent', border: '1px solid #B0C4D8', color: '#3A5070', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Entrar en modo demo</button>
          </div>
          <p style={{ fontSize: '12px', color: '#607896', margin: 0 }}>Ya confían en AliJob · Hotel Atlántico · Grupo GastroCanarias · Resort Volcán</p>
        </div>
      </section>

      {/* Preview */}
      <section style={{ padding: '0 48px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: DS.radius.xl, border: '1px solid #DCE6F0', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ background: '#EDF1F8', padding: '10px 20px', display: 'flex', gap: 6, alignItems: 'center', borderBottom: '1px solid #D8E2EF' }}>
            {['#FF5F56','#FFBD2E','#27C93F'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}></div>)}
            <span style={{ fontSize: '11px', color: '#5A7090', marginLeft: 8 }}>alijob.es/empresas/dashboard</span>
          </div>
          <div style={{ background: '#F4F7FB', padding: 24, display: 'flex', gap: 20 }}>
            <div style={{ width: 36, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
              {['⬡','📋','👥','🗓','⭐'].map((ic, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: i === 0 ? '#E8EEF6' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', opacity: i === 0 ? 1 : 0.4 }}>{ic}</div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
                {[['6','Vacantes activas'],['128','Candidatos'],['14','Entrevistas'],['4.3','Reputación']].map(([v,l]) => (
                  <div key={l} style={{ background: '#E8EEF6', borderRadius: 10, padding: '12px 14px', border: '1px solid #DCE6F0' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>{v}</div>
                    <div style={{ fontSize: '10px', color: '#5A7090', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#E8EEF6', borderRadius: 10, padding: '14px 16px', border: '1px solid #DCE6F0' }}>
                <div style={{ fontSize: '11px', color: '#5A7090', marginBottom: 10, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Candidatos recientes</div>
                {[['María G.','Camarera de sala',92],['Alejandro R.','Recepcionista',85],['Carmen V.','Cocinera',78]].map(([n,r,m]) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid #D8E2EF' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: DS.colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>{n[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', color: '#0C1528', fontWeight: 600 }}>{n}</div>
                      <div style={{ fontSize: '10px', color: '#5A7090' }}>{r}</div>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: m >= 85 ? '#1F7A4D' : '#B5691A' }}>{m}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '40px 48px 80px', background: '#F0F4FA' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              ['📋', 'Ofertas con salario verificado', 'Sin rangos ambiguos. El candidato ve exactamente lo que cobra.'],
              ['🎯', 'Match explicado', 'Sabe por qué un candidato encaja, no solo el porcentaje.'],
              ['⭐', 'Reputación laboral real', 'Opiniones verificadas con evidencia. Confianza auténtica.'],
            ].map(([ic, t, s]) => (
              <div key={t} style={{ padding: '28px 24px', borderRadius: DS.radius.xl, background: '#FFFFFF', border: '1px solid #DCE6F0' }}>
                <div style={{ fontSize: '28px', marginBottom: 14 }}>{ic}</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0C1528', marginBottom: 8, letterSpacing: '-0.02em' }}>{t}</div>
                <div style={{ fontSize: '13px', color: '#5A7090', lineHeight: 1.6 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #D8E2EF', background: '#F0F4FA', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: '#5A7090' }}>© 2025 AliJob — Canarias</span>
        <a href="#" style={{ fontSize: '12px', color: '#607896', textDecoration: 'none' }}>¿Eres candidato? Descarga AliJob Mobile →</a>
      </div>
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginPage({ setPage }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', fontFamily: 'inherit' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ marginBottom: 36, cursor: 'pointer' }} onClick={() => setPage('landing')}><Logo /></div>
          <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 6px' }}>Accede a tu panel</h2>
          <p style={{ fontSize: '13px', color: '#5A7090', margin: '0 0 32px' }}>Panel exclusivo para empresas verificadas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#5A7090', display: 'block', marginBottom: 6, letterSpacing: '0.02em' }}>EMAIL PROFESIONAL</label>
              <input defaultValue="rrhh@hotelatlantico.es" style={{ width: '100%', padding: '11px 14px', borderRadius: DS.radius.md, border: '1px solid #DCE6F0', background: '#F4F7FB', color: '#0C1528', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#5A7090', letterSpacing: '0.02em' }}>CONTRASEÑA</label>
                <a href="#" style={{ fontSize: '12px', color: DS.colors.accent, textDecoration: 'none' }}>¿La olvidaste?</a>
              </div>
              <input type="password" defaultValue="••••••••" style={{ width: '100%', padding: '11px 14px', borderRadius: DS.radius.md, border: '1px solid #DCE6F0', background: '#F4F7FB', color: '#0C1528', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: DS.colors.accent }} />
              <span style={{ fontSize: '12px', color: '#5A7090' }}>Recordar sesión</span>
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
            <button onClick={() => setPage('dashboard')} style={{ padding: '13px', borderRadius: DS.radius.md, background: DS.colors.accent, border: 'none', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Entrar al panel →</button>
            <button onClick={() => setPage('dashboard')} style={{ padding: '13px', borderRadius: DS.radius.md, background: 'transparent', border: '1px solid #DCE6F0', color: '#5A7090', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Entrar en modo demo</button>
          </div>
          <p style={{ fontSize: '13px', color: '#5A7090', textAlign: 'center', marginTop: 24 }}>
            ¿Tu empresa aún no tiene acceso?{' '}
            <span onClick={() => setPage('registro')} style={{ color: DS.colors.accent, cursor: 'pointer', fontWeight: 600 }}>Solicítalo aquí</span>
          </p>
        </div>
      </div>
      <div style={{ width: 440, background: '#F4F7FB', borderLeft: '1px solid #D8E2EF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 48 }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: DS.colors.accent, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Lo que verás dentro</div>
          {[['6 vacantes activas','Publicadas y recibiendo candidatos'],['128 candidatos','23 con match alto esta semana'],['Reputación 4.3/5','Verificada por empleados reales']].map(([t,s]) => (
            <div key={t} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: DS.colors.accent, flexShrink: 0, marginTop: 5 }}></div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0C1528', marginBottom: 2 }}>{t}</div>
                <div style={{ fontSize: '12px', color: '#5A7090' }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '20px 18px', borderRadius: DS.radius.lg, background: '#FFFFFF', border: '1px solid #DCE6F0' }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
            {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: '14px' }}>★</span>)}
          </div>
          <p style={{ fontSize: '13px', color: '#607896', lineHeight: 1.6, margin: '0 0 12px', fontStyle: 'italic' }}>"AliJob nos ayudó a contratar cocineros en 10 días. El match explicado nos ahorraba entrevistas innecesarias."</p>
          <div style={{ fontSize: '12px', color: '#5A7090', fontWeight: 600 }}>— Jefa de RRHH · Grupo GastroCanarias</div>
        </div>
      </div>
    </div>
  );
}

// ─── Registro ─────────────────────────────────────────────────────────────────
function RegistroPage({ setPage }) {
  const [sent, setSent] = React.useState(false);
  if (sent) return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>
      <div style={{ textAlign: 'center', maxWidth: 420, padding: 48 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: DS.colors.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px' }}>✓</div>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 10px' }}>Solicitud recibida</h2>
        <p style={{ fontSize: '14px', color: '#5A7090', lineHeight: 1.6, margin: '0 0 32px' }}>Revisaremos tu solicitud en 24–48h. Recibirás un email con las instrucciones para activar tu panel.</p>
        <button onClick={() => setPage('landing')} style={{ padding: '12px 28px', borderRadius: DS.radius.md, background: DS.colors.accent, border: 'none', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Volver al inicio</button>
      </div>
    </div>
  );
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px', fontFamily: 'inherit' }}>
      <div style={{ marginBottom: 32, cursor: 'pointer' }} onClick={() => setPage('landing')}><Logo /></div>
      <div style={{ width: '100%', maxWidth: 560 }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 6px', textAlign: 'center' }}>Solicitar acceso</h2>
        <p style={{ fontSize: '13px', color: '#5A7090', textAlign: 'center', margin: '0 0 32px' }}>Verificamos cada empresa antes de activar el acceso</p>
        <div style={{ background: '#F4F7FB', border: '1px solid #DCE6F0', borderRadius: DS.radius.xl, padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[['Nombre de empresa *','Hotel Atlántico Costa Adeje'],['CIF / NIF','B12345678'],['Persona de contacto *','Laura Pérez'],['Email profesional *','laura@hotelatlantico.es'],['Teléfono *','+34 922 123 456']].map(([l,v]) => (
              <div key={l} style={{ gridColumn: l.includes('empresa') ? '1/-1' : undefined }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#5A7090', display: 'block', marginBottom: 5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{l}</label>
                <input defaultValue={v} style={{ width: '100%', padding: '10px 12px', borderRadius: DS.radius.md, border: '1px solid #DCE6F0', background: '#FFFFFF', color: '#0C1528', fontSize: '13px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[['Sector *',['Hostelería','Turismo','Restauración','Ocio'],'Hostelería'],['Isla *',['Tenerife','Gran Canaria','Lanzarote','Fuerteventura'],'Tenerife'],['Empleados *',['1-10','11-50','51-200','200+'],'51-200']].map(([l,opts,def]) => (
              <div key={l}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#5A7090', display: 'block', marginBottom: 5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{l}</label>
                <select defaultValue={def} style={{ width: '100%', padding: '10px 12px', borderRadius: DS.radius.md, border: '1px solid #DCE6F0', background: '#FFFFFF', color: '#0C1528', fontSize: '13px', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={() => setSent(true)} style={{ width: '100%', padding: '13px', borderRadius: DS.radius.md, background: DS.colors.accent, border: 'none', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Enviar solicitud de acceso →</button>
          <p style={{ fontSize: '12px', color: '#5A7090', textAlign: 'center', marginTop: 14 }}>
            ¿Ya tienes acceso? <span onClick={() => setPage('login')} style={{ color: DS.colors.accent, cursor: 'pointer' }}>Inicia sesión</span>
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LandingPage, LoginPage, RegistroPage, ProductoPage, PreciosPage, CasosPage });
