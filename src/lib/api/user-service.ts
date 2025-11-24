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

export async function fetchUserData(userId: number | string): Promise<User | null> {
    const token = tokenStorage.getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

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
    }
}
