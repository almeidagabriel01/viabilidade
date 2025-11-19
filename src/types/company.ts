export interface CompanyData {
  endereco: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cnae: string;
  isMei: boolean;
  capitalInicial: number;
}

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export type AnalysisResultType = 
  | "positive" 
  | "moderate"
  | "negative" 
  | "inadequate_use" 
  | "excessive_use";

export interface AnalysisResult {
  type: AnalysisResultType;
  title: string;
  description: string;
  details?: string[];
  recommendations?: string[];
  icon: string;
  color: string;
  bgColor: string;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface LocationAddress {
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  enderecoCompleto: string; // Endereço formatado para Google Maps
}

export interface AnalysisResponse {
  result: AnalysisResult;
  companyData: CompanyData;
  analysisDate: string;
  testCount?: number;
  maxTests?: number;
  viabilityScore?: number; // Porcentagem de 0 a 100
  coordinates?: LocationCoordinates;
  fullAddress?: string; // Endereço completo formatado para Google Maps
}