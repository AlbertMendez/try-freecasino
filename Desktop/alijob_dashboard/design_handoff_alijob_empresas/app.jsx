
// AliJob Empresas — Main App Router + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#C4683A",
  "sidebarBg": "#111010",
  "cardRadius": 10,
  "fontScale": 1,
  "companyName": "Hotel Atlántico Costa Adeje",
  "density": "comfortable"
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = React.useState('landing');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [selectedCandidato, setSelectedCandidato] = React.useState(null);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to DS tokens live
  React.useEffect(() => {
    DS.colors.accent      = tweaks.accentColor;
    DS.colors.accentLight = tweaks.accentColor + '20';
    DS.colors.sidebarBg   = tweaks.sidebarBg;
    DS.radius.sm  = Math.max(4, tweaks.cardRadius - 2) + 'px';
    DS.radius.md  = tweaks.cardRadius + 'px';
    DS.radius.lg  = (tweaks.cardRadius + 4) + 'px';
    DS.radius.xl  = (tweaks.cardRadius + 10) + 'px';
    document.documentElement.style.fontSize = (tweaks.fontScale * 14) + 'px';
  }, [tweaks]);

  const tweakPanel = (
    <TweaksPanel>
      <TweakSection label="Identidad de empresa" />
      <TweakText
        label="Nombre de empresa"
        value={tweaks.companyName}
        onChange={v => setTweak('companyName', v)}
      />

      <TweakSection label="Color de acento" />
      <TweakRadio
        label="Paleta"
        value={tweaks.accentColor}
        options={[
          { label: 'Terracota', value: '#C4683A' },
          { label: 'Atlántico', value: '#1A8080' },
          { label: 'Índigo',    value: '#4A5FA0' },
          { label: 'Volcán',    value: '#8B3A3A' },
        ]}
        onChange={v => setTweak('accentColor', v)}
      />
      <TweakColor
        label="Color personalizado"
        value={tweaks.accentColor}
        onChange={v => setTweak('accentColor', v)}
      />

      <TweakSection label="Sidebar" />
      <TweakRadio
        label="Tono"
        value={tweaks.sidebarBg}
        options={[
          { label: 'Volcánico', value: '#111010' },
          { label: 'Pizarra',   value: '#1E2535' },
          { label: 'Bosque',    value: '#111A14' },
          { label: 'Claro',     value: '#F5F4F1' },
        ]}
        onChange={v => setTweak('sidebarBg', v)}
      />

      <TweakSection label="Forma y espacio" />
      <TweakSlider
        label="Radio de bordes"
        value={tweaks.cardRadius}
        min={0} max={20} step={2}
        onChange={v => setTweak('cardRadius', v)}
      />
      <TweakSlider
        label="Escala tipográfica"
        value={tweaks.fontScale}
        min={0.85} max={1.2} step={0.05}
        onChange={v => setTweak('fontScale', v)}
      />
      <TweakRadio
        label="Densidad"
        value={tweaks.density}
        options={[
          { label: 'Compacta',  value: 'compact' },
          { label: 'Normal',    value: 'comfortable' },
          { label: 'Espaciada', value: 'spacious' },
        ]}
        onChange={v => setTweak('density', v)}
      />
    </TweaksPanel>
  );

  if (page === 'landing')  return <>{tweakPanel}<LandingPage  setPage={setPage} /></>;
  if (page === 'login')    return <>{tweakPanel}<LoginPage    setPage={setPage} /></>;
  if (page === 'registro') return <>{tweakPanel}<RegistroPage setPage={setPage} /></>;
  if (page === 'producto') return <>{tweakPanel}<ProductoPage setPage={setPage} /></>;
  if (page === 'precios')  return <>{tweakPanel}<PreciosPage  setPage={setPage} /></>;
  if (page === 'casos')    return <>{tweakPanel}<CasosPage    setPage={setPage} /></>;

  const screenMap = {
    'dashboard':          <DashboardScreen setPage={setPage} />,
    'vacantes':           <VacantesScreen setPage={setPage} />,
    'crear-oferta':       <CrearOfertaScreen setPage={setPage} />,
    'editar-oferta':      <EditarOfertaScreen setPage={setPage} />,
    'candidatos':         <CandidatosScreen setPage={setPage} setSelectedCandidato={setSelectedCandidato} />,
    'detalle-candidato':  <DetalleCandidatoScreen setPage={setPage} candidato={selectedCandidato} />,
    'entrevistas':        <EntrevistasScreen setPage={setPage} />,
    'detalle-entrevista': <DetalleEntrevistaScreen setPage={setPage} />,
    'reputacion':         <ReputacionScreen setPage={setPage} />,
    'perfil':             <PerfilScreen setPage={setPage} />,
    'verificaciones':     <VerificacionesScreen setPage={setPage} />,
    'configuracion':      <ConfiguracionScreen />,
    'notificaciones':     <NotificacionesScreen />,
    'admin-dashboard':    <AdminDashboardScreen setPage={setPage} />,
    'admin-empresas':     <AdminEmpresasScreen setPage={setPage} />,
    'admin-evidencias':   <AdminEvidenciasScreen />,
    'admin-moderacion':   <AdminModeracionScreen />,
    'admin-reportes':     <AdminReportesScreen />,
  };

  return (
    <>
      {tweakPanel}
      <AppLayout
        page={page} setPage={setPage}
        isAdmin={isAdmin} setIsAdmin={setIsAdmin}
        companyName={tweaks.companyName}
        density={tweaks.density}
      >
        {screenMap[page] || screenMap['dashboard']}
      </AppLayout>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
