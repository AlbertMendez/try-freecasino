export interface Company {
  id: string;
  nombre: string;
  isla: string;
  sector: string;
  empleados: string;
  reputacion: number;
  perfilCompletado: number;
  verificada: boolean;
}

export interface DashboardStats {
  vacantesActivas: number;
  candidatosTotal: number;
  candidatosMatchAlto: number;
  entrevistasPendientes: number;
  reputacion: number;
  numOpiniones: number;
}

export interface Vacancy {
  id: number;
  puesto: string;
  ubicacion: string;
  estado: "activa" | "pausada" | "cerrada" | "borrador";
  candidatos: number;
  match: number;
  salario: string;
  contrato: string;
  publicada: string;
}

export interface Candidate {
  id: number;
  nombre: string;
  puesto: string;
  match: number;
  disponibilidad: string;
  ubicacion: string;
  experiencia: string;
  estado: "nuevo" | "en revisión" | "guardado" | "entrevista" | "descartado";
  idiomas: string[];
  verificado: boolean;
  fiabilidad: number;
}

export interface Interview {
  id: number;
  candidato: string;
  puesto: string;
  fecha: string;
  estado: "confirmada" | "pendiente" | "completada";
  tipo: "Presencial" | "Videollamada" | "Telefónica";
  notas: string;
}

export interface Notification {
  tipo: "candidato" | "entrevista" | "reputacion" | "evidencia" | "vacante";
  icon: string;
  titulo: string;
  desc: string;
  leida: boolean;
  tiempo: string;
  urgente?: boolean;
}

export interface AdminEmpresa {
  id: number;
  nombre: string;
  contacto: string;
  email: string;
  isla: string;
  sector: string;
  empleados: string;
  solicitado: string;
  docs: string[];
  prioridad: "alta" | "normal" | "baja";
}

export interface AdminEvidencia {
  id: number;
  empresa: string;
  tipo: string;
  autor: string;
  texto: string;
  prioridad: "urgente" | "alta" | "normal";
  estado: "pendiente" | "en revisión" | "resuelto";
  dias: number;
}
