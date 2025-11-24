import { tokenStorage } from '@/lib/api/auth';

const API_BASE_URL = "http://127.0.0.1:8000/api";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    data_criacao: string;
}

const pendingUserRequests: Record<string, Promise<User | null> | undefined> = {};

export async function fetchUserData(userId: number | string): Promise<User | null> {
    const requestKey = String(userId);

    // Se já tiver uma requisição em andamento para este usuário, retorna a promise dela
    if (pendingUserRequests[requestKey]) {
        return pendingUserRequests[requestKey];
    }

    const token = tokenStorage.getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const requestPromise = (async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                headers,
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados do usuário: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            return null;
        } finally {
            delete pendingUserRequests[requestKey];
        }
    })();

    pendingUserRequests[requestKey] = requestPromise;

    return requestPromise;
}
