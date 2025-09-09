
export enum ChargeLevel {
  DIRECTIVO = "Directivo",
  MANDO_MEDIO = "Mando Medio",
  EJECUTOR = "Ejecutor",
  OPERADOR_ASISTENCIA = "Operador y de asistencia"
}

export interface User {
  id: string;
  name: string;
  charge: string;
  level: ChargeLevel;
  companyName: string;
}

export interface EvaluationResult {
  behavior: string;
  score: number;
  option: string;
  justification: string;
}