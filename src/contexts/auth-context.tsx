"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  clearAuthData,
  tokenStorage,
  userStorage,
  validateToken,
  type LoginRequest,
  type RegisterRequest,
  type UserResponse,
  AuthError,
} from '@/lib/api/auth';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Garantir scroll no topo ao carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = tokenStorage.getToken();
        const savedUser = userStorage.getUser();

        if (savedToken && savedUser) {
          // Validar se o token ainda é válido
          const isValid = await validateToken(savedToken);
          
          if (isValid) {
            setToken(savedToken);
            setUser(savedUser);
          } else {
            // Token inválido, limpar dados
            clearAuthData();
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Realiza login do usuário
   */
  const login = async (credentials: LoginRequest) => {
    const response = await loginUser(credentials);
    
    // Armazenar token e dados do usuário
    tokenStorage.setToken(response.access_token);
    userStorage.setUser(response.user);
    
    setToken(response.access_token);
    setUser(response.user);
  };

  /**
   * Registra um novo usuário e faz login automaticamente
   */
  const register = async (userData: RegisterRequest) => {
    // Registrar usuário
    await registerUser(userData);
    
    // Fazer login automaticamente após registro
    await login({
      email: userData.email,
      password: userData.password,
    });
  };

  /**
   * Faz logout do usuário
   */
  const logout = () => {
    clearAuthData();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
