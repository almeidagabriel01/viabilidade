import { tokenStorage } from '@/lib/api/auth';

const API_BASE_URL = "http://127.0.0.1:8000/api/helpers";

export interface HelperItem {
    codigo: string | number;
    descricao: string;
    observacoes?: string | null;
}

// Cache simples em memória
const cache: Record<string, HelperItem[] | undefined> = {};
const pendingRequests: Record<string, Promise<HelperItem[]> | undefined> = {};

async function fetchHelperData(endpoint: string): Promise<HelperItem[]> {
    // Se já tiver em cache, retorna
    if (cache[endpoint]) {
        return cache[endpoint];
    }

    // Se já tiver uma requisição em andamento, retorna a promise dela (deduplication)
    if (pendingRequests[endpoint]) {
        return pendingRequests[endpoint];
    }

    const token = tokenStorage.getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Cria a promise da requisição
    const requestPromise = (async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                headers,
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados de ${endpoint}`);
            }

            const data = await response.json();

            // Salva no cache apenas se sucesso
            cache[endpoint] = data;
            return data;
        } finally {
            // Limpa a requisição pendente
            delete pendingRequests[endpoint];
        }
    })();

    // Armazena a promise para deduplication
    pendingRequests[endpoint] = requestPromise;

    return requestPromise;
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
