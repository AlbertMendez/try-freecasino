import type {
  Company, DashboardStats, Vacancy, Candidate, Interview, Notification, AdminEmpresa, AdminEvidencia,
} from "@/models";

export const DEMO_EMPRESA: Company = {
  id: "c1",
  nombre: "Hotel Atlántico Costa Adeje",
  isla: "Tenerife",
  sector: "Hostelería",
  empleados: "51-200",
  reputacion: 4.3,
  perfilCompletado: 82,
  verificada: true,
};

export const DEMO_STATS: DashboardStats = {
  vacantesActivas: 6,
  candidatosTotal: 128,
  candidatosMatchAlto: 23,
  entrevistasPendientes: 14,
  reputacion: 4.3,
  numOpiniones: 47,
};

export const VACANTES: Vacancy[] = [
  { id: 1, puesto: "Jefe/a de sala",          ubicacion: "Costa Adeje, Tenerife", estado: "activa",   candidatos: 28, match: 86, salario: "22.000–26.000 €",  contrato: "Indefinido", publicada: "Hace 3 días" },
  { id: 2, puesto: "Recepcionista",            ubicacion: "Costa Adeje, Tenerife", estado: "activa",   candidatos: 41, match: 79, salario: "18.500–21.000 €",  contrato: "Indefinido", publicada: "Hace 5 días" },
  { id: 3, puesto: "Cocinero/a",               ubicacion: "Costa Adeje, Tenerife", estado: "activa",   candidatos: 19, match: 72, salario: "20.000–24.000 €",  contrato: "Indefinido", publicada: "Hace 1 semana" },
  { id: 4, puesto: "Camarero/a de sala",       ubicacion: "Costa Adeje, Tenerife", estado: "pausada",  candidatos: 33, match: 81, salario: "17.000–19.500 €",  contrato: "Temporal",   publicada: "Hace 2 semanas" },
  { id: 5, puesto: "Personal de pisos",        ubicacion: "Costa Adeje, Tenerife", estado: "activa",   candidatos: 7,  match: 68, salario: "16.500–18.000 €",  contrato: "Temporal",   publicada: "Ayer" },
  { id: 6, puesto: "Animador/a turístico",     ubicacion: "Costa Adeje, Tenerife", estado: "borrador", candidatos: 0,  match: 0,  salario: "17.000–20.000 €",  contrato: "Temporal",   publicada: "Borrador" },
];

export const CANDIDATOS: Candidate[] = [
  { id: 1, nombre: "María García Sánchez",    puesto: "Jefe/a de sala",      match: 92, disponibilidad: "Inmediata",   ubicacion: "Santa Cruz de Tenerife",  experiencia: "5 años",  estado: "nuevo",       idiomas: ["Español", "Inglés B2", "Alemán A1"], verificado: true,  fiabilidad: 96 },
  { id: 2, nombre: "Alejandro Ruiz Martín",   puesto: "Recepcionista",        match: 85, disponibilidad: "2 semanas",   ubicacion: "La Laguna, Tenerife",     experiencia: "3 años",  estado: "en revisión", idiomas: ["Español", "Inglés C1", "Francés B1"], verificado: true,  fiabilidad: 88 },
  { id: 3, nombre: "Carmen Vega Torres",      puesto: "Cocinero/a",           match: 78, disponibilidad: "1 mes",       ubicacion: "Puerto de la Cruz",       experiencia: "4 años",  estado: "guardado",    idiomas: ["Español", "Inglés A2"],               verificado: false, fiabilidad: 82 },
  { id: 4, nombre: "Pedro Álvarez Díaz",      puesto: "Camarero/a de sala",   match: 71, disponibilidad: "Inmediata",   ubicacion: "Costa Adeje, Tenerife",   experiencia: "1 año",   estado: "nuevo",       idiomas: ["Español"],                            verificado: true,  fiabilidad: 74 },
  { id: 5, nombre: "Elena Moreno Cabrera",    puesto: "Jefe/a de sala",        match: 88, disponibilidad: "Inmediata",   ubicacion: "Las Américas, Tenerife",  experiencia: "6 años",  estado: "entrevista",  idiomas: ["Español", "Inglés B1", "Italiano A2"], verificado: true,  fiabilidad: 91 },
  { id: 6, nombre: "Luis Hernández Castro",   puesto: "Personal de pisos",    match: 65, disponibilidad: "2 semanas",   ubicacion: "Playa de las Américas",  experiencia: "2 años",  estado: "descartado",  idiomas: ["Español"],                            verificado: false, fiabilidad: 68 },
];

export const ENTREVISTAS: Interview[] = [
  { id: 1, candidato: "María García Sánchez",    puesto: "Jefe/a de sala",   fecha: "Hoy, 16:00h",         estado: "confirmada", tipo: "Presencial",   notas: "Candidata muy sólida. Preguntar por disponibilidad de horario nocturno." },
  { id: 2, candidato: "Alejandro Ruiz Martín",   puesto: "Recepcionista",    fecha: "Mañana, 10:30h",      estado: "pendiente",  tipo: "Videollamada", notas: "" },
  { id: 3, candidato: "Carmen Vega Torres",      puesto: "Cocinero/a",       fecha: "Jue 29, 12:00h",      estado: "confirmada", tipo: "Presencial",   notas: "Llevar CV impreso. Prueba práctica de 20 min." },
  { id: 4, candidato: "Elena Moreno Cabrera",    puesto: "Jefe/a de sala",   fecha: "Vie 30, 09:00h",      estado: "pendiente",  tipo: "Presencial",   notas: "" },
  { id: 5, candidato: "Roberto Silva Pérez",     puesto: "Animador/a turístico", fecha: "Lun 2 jun, 11:00h", estado: "confirmada", tipo: "Videollamada", notas: "Segunda entrevista. Ya pasó el filtro inicial." },
  { id: 6, candidato: "Ana López Ferrer",        puesto: "Camarera de sala", fecha: "Mar 3 jun, 17:00h",   estado: "completada", tipo: "Presencial",   notas: "Muy buena impresión. Pendiente de decisión final." },
];

export const NOTIFICACIONES: Notification[] = [
  { tipo: "candidato",  icon: "👤", titulo: "3 nuevos candidatos con match alto",        desc: "Jefe/a de sala · Match medio 88% · Aplicaron hace 2h",                        leida: false, tiempo: "Hace 2h" },
  { tipo: "entrevista", icon: "🗓", titulo: "Entrevista confirmada",                     desc: "María García confirmó su asistencia para hoy a las 16:00h",                   leida: false, tiempo: "Hace 3h" },
  { tipo: "reputacion", icon: "⭐", titulo: "Nueva opinión verificada",                  desc: "Tu reputación ha subido 0.1 puntos · Ahora es 4.3/5",                          leida: true,  tiempo: "Ayer" },
  { tipo: "evidencia",  icon: "📄", titulo: "Evidencia pendiente de respuesta",          desc: "Un ex-empleado ha adjuntado documentación. Tienes 7 días para responder.",     leida: false, tiempo: "Hace 2 días", urgente: true },
  { tipo: "vacante",    icon: "📋", titulo: "Vacante requiere revisión",                 desc: "Cocinero/a · El salario publicado está por debajo del convenio. Revisa.",      leida: true,  tiempo: "Hace 3 días", urgente: true },
  { tipo: "candidato",  icon: "👤", titulo: "Alejandro Ruiz ha actualizado su perfil",   desc: "Su match con Recepcionista ha subido a 87%",                                   leida: true,  tiempo: "Hace 4 días" },
  { tipo: "entrevista", icon: "🗓", titulo: "Entrevista pendiente de confirmar",         desc: "Carmen Vega · Cocinera · Jueves 29 a las 12:00h",                              leida: true,  tiempo: "Hace 5 días" },
];

export const ADMIN_EMPRESAS: AdminEmpresa[] = [
  { id: 1, nombre: "Grupo GastroCanarias",               contacto: "Ramón Delgado",  email: "rrhh@gastrocanarias.com",    isla: "Gran Canaria",  sector: "Restauración", empleados: "51-200", solicitado: "Hace 1h",      docs: ["CIF adjunto", "Email corporativo"],                         prioridad: "alta" },
  { id: 2, nombre: "Restaurante La Terraza del Puerto",  contacto: "Silvia Mora",    email: "silvia@laterraza.com",       isla: "Tenerife",      sector: "Hostelería",   empleados: "11-50",  solicitado: "Hace 4h",      docs: ["CIF adjunto"],                                               prioridad: "normal" },
  { id: 3, nombre: "Resort Playa Blanca Premium",        contacto: "Jorge Acosta",   email: "jorge@playablancapr.com",    isla: "Lanzarote",     sector: "Hostelería",   empleados: "200+",   solicitado: "Ayer",         docs: ["CIF adjunto", "Escrituras sociales", "Email corporativo"],   prioridad: "normal" },
  { id: 4, nombre: "Ocio Atlántico Events",              contacto: "Marta Reyes",    email: "marta@ocioatlantico.es",     isla: "Fuerteventura", sector: "Ocio",         empleados: "1-10",   solicitado: "Hace 2 días",  docs: [],                                                            prioridad: "baja" },
];

export const ADMIN_EVIDENCIAS: AdminEvidencia[] = [
  { id: 1, empresa: "Hotel Jardín del Teide",      tipo: "Condiciones de turno",    autor: "Ex-empleado verificado", texto: "Los turnos de 12h no están reflejados en el contrato presentado.",        prioridad: "urgente", estado: "pendiente",   dias: 7 },
  { id: 2, empresa: "Restaurante La Terraza",      tipo: "Salario no cumplido",     autor: "Ex-empleado verificado", texto: "El salario real era inferior al publicado durante la temporada alta.",     prioridad: "alta",    estado: "en revisión", dias: 3 },
  { id: 3, empresa: "Hotel Costa Adeje Palace",    tipo: "Ambiente laboral",        autor: "Ex-empleado verificado", texto: "El equipo directivo no comunicaba cambios de turnos con antelación.",    prioridad: "normal",  estado: "en revisión", dias: 1 },
];
