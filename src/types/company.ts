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

export interface AnalysisResponse {
  result: AnalysisResult;
  companyData: CompanyData;
  analysisDate: string;
  testCount?: number;
  maxTests?: number;
}