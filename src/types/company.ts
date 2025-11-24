export interface CompanyData {
  endereco: string; // CEP
  cnae: string;
  isMei: boolean;
  naturezaJuridica: number;
  qualificacaoDoResponsavel: number;
  // Optional fields for backward compatibility or internal use if needed, but removing from main interface as requested
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
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

// Interfaces para integração com backend
export interface BackendAnalysisRequest {
  localizacao: {
    cep: string;
  };
  empresa: {
    cnae: string;
    naturezaJuridica: number;
    qualificacaoDoResponsavel: number;
    isMei: boolean;
  };
}

export interface BackendAnalysisResponse {
  status: string;
  message: string;
  data: {
    viabilidade_id: number;
    resultado: {
      pontuacao: number; // 0.0 a 1.0
      detalhes: {
        analise_localizacao: number;
        [key: string]: unknown;
      };
    };
    data_analise: string;
  };
  code: number;
}