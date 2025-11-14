// Configuração da URL base da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Tipos
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  company: string;
  phone: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: UserResponse;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  message: string;
}

// Classe de erro personalizada para tratamento
export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Realiza login do usuário
 */
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new AuthError(
        responseData.detail || 'Erro ao fazer login',
        response.status,
        responseData
      );
    }

    // Mapear a resposta da API para o formato esperado
    // API retorna: { status, message, data: { token, usuario } }
    // Frontend espera: { access_token, token_type, user }
    const data = {
      access_token: responseData.data.token,
      token_type: 'bearer',
      user: {
        id: responseData.data.usuario.id.toString(),
        name: responseData.data.usuario.name,
        email: responseData.data.usuario.email,
      }
    };

    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Erro de rede ou outro erro
    throw new AuthError(
      'Não foi possível conectar ao servidor. Verifique sua conexão.',
      0
    );
  }
}

/**
 * Registra um novo usuário
 */
export async function registerUser(userData: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Se houver erro, pode vir como { status: "error", message: "..." }
      const errorMessage = responseData.message || responseData.detail || 'Erro ao registrar usuário';
      throw new AuthError(
        errorMessage,
        response.status,
        responseData
      );
    }

    // API retorna: { status: "success", message: "...", data: { id, name, email, ... } }
    // Frontend espera: { id, name, email, message }
    const data = {
      id: responseData.data.id.toString(),
      name: responseData.data.name,
      email: responseData.data.email,
      message: responseData.message,
    };

    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    
    throw new AuthError(
      'Não foi possível conectar ao servidor. Verifique sua conexão.',
      0
    );
  }
}

/**
 * Decodifica um JWT token (sem validar assinatura)
 */
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

/**
 * Valida se o token ainda é válido (verifica expiração localmente)
 */
export async function validateToken(token: string): Promise<boolean> {
  try {
    if (!token) return false;
    
    // Decodificar o token para verificar a expiração
    const decoded = decodeJWT(token);
    
    if (!decoded || !decoded.exp) {
      return false;
    }
    
    // Verificar se o token expirou
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = decoded.exp < currentTime;
    
    return !isExpired;
  } catch (error) {
    return false;
  }
}

/**
 * Obtém informações do usuário pelo ID
 */
export async function getUserById(userId: string, token: string): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new AuthError(
        'Não foi possível obter informações do usuário.',
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    
    throw new AuthError(
      'Não foi possível obter informações do usuário.',
      0
    );
  }
}

/**
 * Armazenamento seguro de token no localStorage
 */
export const tokenStorage = {
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },
  
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },
  
  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },
};

/**
 * Armazenamento de dados do usuário
 */
export const userStorage = {
  setUser(user: UserResponse) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  },
  
  getUser(): UserResponse | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          return JSON.parse(userData);
        } catch {
          return null;
        }
      }
    }
    return null;
  },
  
  removeUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data');
    }
  },
};

/**
 * Limpa todos os dados de autenticação
 */
export function clearAuthData() {
  tokenStorage.removeToken();
  userStorage.removeUser();
}
