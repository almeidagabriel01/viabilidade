export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
  dataCadastro: string;
  ultimoAcesso: string;
}

export interface Analysis {
  id: string;
  titulo: string;
  cnae: string;
  endereco: string;
  cidade: string;
  uf: string;
  status: "completa" | "incompleta" | "processando";
  score?: number;
  dataAnalise: string;
  dataAtualizacao: string;
  dadosCompletos: boolean;
}
