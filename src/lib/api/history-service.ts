import { tokenStorage } from '@/lib/api/auth';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Tipos para o histórico de análises
export interface HistoryAnalysis {
  id: number;
  cnae: string;
  local: string;
  pontuacao: number;
  viavel: boolean;
  data_analise: string;
}

export interface HistoryListResponse {
  status: string;
  message: string;
  data: HistoryAnalysis[];
  code: number;
}

export interface HistoryDetailData {
  viabilidade_id: number;
  resultado: {
    pontuacao: number;
    detalhes: {
      analise_localizacao: number;
      [key: string]: unknown;
    };
  };
  localizacao: {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
    latitude: string;
    longitude: string;
  };
  data_analise: string;
}

export interface HistoryDetailResponse {
  status: string;
  message: string;
  data: HistoryDetailData;
  code: number;
}

/**
 * Busca o histórico de análises do usuário
 */
export async function fetchAnalysisHistory(): Promise<HistoryAnalysis[]> {
  try {
    const token = tokenStorage.getToken();
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/api/viabilidade/historico`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(errorData.message || `Erro ${response.status}`);
    }

    const data: HistoryListResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erro ao buscar histórico de análises:', error);
    throw error;
  }
}

/**
 * Busca os detalhes de uma análise específica
 */
export async function fetchAnalysisDetail(viabilidadeId: number): Promise<HistoryDetailData> {
  try {
    const token = tokenStorage.getToken();
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    // Construir URL com query parameter
    const url = new URL(`${API_BASE_URL}/api/viabilidade/historico/${viabilidadeId}`);
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(errorData.message || `Erro ${response.status}`);
    }

    const data: HistoryDetailResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes da análise:', error);
    throw error;
  }
}

/**
 * Deleta uma análise do histórico
 */
export async function deleteAnalysisFromBackend(viabilidadeId: number): Promise<void> {
  try {
    const token = tokenStorage.getToken();
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await fetch(`${API_BASE_URL}/api/viabilidade/historico/${viabilidadeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(errorData.message || `Erro ${response.status}`);
    }

    toast.success('Análise excluída com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar análise:', error);
    toast.error('Erro ao excluir análise');
    throw error;
  }
}
