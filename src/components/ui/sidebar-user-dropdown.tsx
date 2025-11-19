"use client";

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { User, LogOut, Settings, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarUserDropdownProps {
  isCollapsed: boolean;
}

export function SidebarUserDropdown({ isCollapsed }: SidebarUserDropdownProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Pequeno delay para garantir que o DOM está pronto e evitar piscar
      const timer = setTimeout(() => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setButtonRect(rect);
        }
        setShouldRender(true);
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isCollapsed]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isClickOnDropdown = dropdownRef.current && dropdownRef.current.contains(target);
      const isClickOnButton = buttonRef.current && buttonRef.current.contains(target);
      
      if (!isClickOnDropdown && !isClickOnButton) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
      setButtonRect(null);
    }
  };

  if (!user) {
    return (
      <Link href="/login">
        <Button 
          size="sm"
          className={cn(
            "group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0 overflow-hidden",
            isCollapsed ? "w-12 h-12 p-0" : "px-4 py-2"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-1.5">
            <User className="h-4 w-4" />
            {!isCollapsed && (
              <>
                <span className="text-xs">Login</span>
                <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </div>
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative w-full">
      <Button
        ref={buttonRef}
        onClick={handleToggle}
        variant="ghost"
        className={cn(
          "group relative flex items-center rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-[600ms] ease-in-out hover:scale-105 active:scale-95",
          isCollapsed ? "w-12 h-12 p-2 justify-center" : "px-3 py-6 w-full space-x-3"
        )}
      >
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
        </div>
        {!isCollapsed && (
          <>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-[600ms] ease-in-out truncate flex-1 text-left">
              {user.name}
            </span>
            <ChevronDown className={`h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-all duration-[600ms] ease-in-out flex-shrink-0 ${isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`} />
          </>
        )}
      </Button>

      {isMounted && typeof window !== 'undefined' && shouldRender && buttonRect && createPortal(
        <div 
          ref={dropdownRef}
          onTransitionEnd={handleTransitionEnd}
          className={`fixed transition-all duration-300 ease-out ${
            isCollapsed ? 'w-64 origin-left' : 'origin-bottom'
          } ${
            isOpen 
              ? 'opacity-100 scale-100 pointer-events-auto' 
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
          style={{ 
            zIndex: 999999,
            ...(isCollapsed ? {
              // Sidebar collapsed: ao lado da foto do usuário, alinhado pela parte inferior
              left: `${buttonRect.right + 8}px`,
              bottom: `${window.innerHeight - buttonRect.bottom}px`, // Alinha pela parte inferior do botão
              transform: isOpen ? 'scale(1)' : 'scale(0.95)',
              // Calcula maxHeight para não ultrapassar a tela
              maxHeight: `${buttonRect.bottom - 20}px` // Usa a parte inferior do botão como referência
            } : {
              // Sidebar expandido: em cima do botão com largura de 200px ou 17% da tela
              left: `${buttonRect.left}px`,
              right: 'auto',
              bottom: `${window.innerHeight - buttonRect.top + 8}px`,
              width: `${Math.max(buttonRect.width, Math.min(200, window.innerWidth * 0.17))}px`, // Máximo de 200px ou 17% da tela
              transform: isOpen ? 'scale(1)' : 'scale(0.95)',
              maxHeight: `${buttonRect.top - 20}px`
            })
          }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-y-auto backdrop-blur-xl max-h-full">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="py-2 px-2 overflow-hidden">
              <Link href="/perfil" onClick={() => setIsOpen(false)}>
                <div className="group flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer transition-all duration-200 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:scale-110 transition-all duration-200 flex-shrink-0">
                    <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200" />
                  </div>
                  <span className="ml-3 font-medium transition-all duration-200 truncate">Meu Perfil</span>
                </div>
              </Link>
              
              <button
                onClick={handleLogout}
                className="group flex items-center w-full px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 cursor-pointer transition-all duration-200 rounded-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/30 group-hover:scale-110 transition-all duration-200 flex-shrink-0">
                  <LogOut className="h-4 w-4 text-red-600 dark:text-red-400 transition-all duration-200" />
                </div>
                <span className="ml-3 font-medium transition-all duration-200 truncate">Sair</span>
              </button>
            </div>
          </div>
        </div>
        , document.body
      )}
    </div>
  );
}
