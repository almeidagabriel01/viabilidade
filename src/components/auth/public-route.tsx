"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rotas públicas (login, register)
 * Redireciona para / se o usuário já estiver autenticado
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setShouldRedirect(true);
      
      // Verificar se há uma URL para redirecionar após login
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        router.replace(redirectUrl);
      } else {
        router.replace('/');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  // Se está autenticado ou redirecionando, não renderiza nada
  if (isAuthenticated || shouldRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Redirecionando...
          </p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, renderiza o conteúdo (login/register)
  return <>{children}</>;
}
