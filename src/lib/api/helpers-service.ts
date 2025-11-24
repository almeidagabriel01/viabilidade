import { tokenStorage } from '@/lib/api/auth';

const API_BASE_URL = "http://127.0.0.1:8000/api/helpers";

export interface HelperItem {
    codigo: string | number;
    descricao: string;
    observacoes?: string | null;
}

async function fetchHelperData(endpoint: string): Promise<HelperItem[]> {
    const token = tokenStorage.getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        headers,
    });

    if (!response.ok) {
        throw new Error(`Erro ao buscar dados de ${endpoint}`);
    }

    return await response.json();
}

export async function fetchQualificacoes(): Promise<HelperItem[]> {
    return fetchHelperData('qualificacoes');
}

export async function fetchNaturezas(): Promise<HelperItem[]> {
    return fetchHelperData('naturezas');
}

export async function fetchCnaes(): Promise<HelperItem[]> {
    return fetchHelperData('cnaes');
}
