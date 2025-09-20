"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';

export function UserDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(!isOpen);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (!user) {
    return (
      <Link href="/login">
        <Button 
          size="sm"
          className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0 text-xs overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-1.5">
            <User className="h-4 w-4" />
            <span>Login</span>
            <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={handleToggle}
        variant="ghost"
        className="group relative flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
        </div>
        <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {user.name}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-all duration-300 ${isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`} />
      </Button>

      {/* Dropdown */}
      <div className={`absolute right-0 mt-2 w-56 sm:w-64 z-50 transform transition-all duration-500 ease-out ${
        isOpen 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-90 -translate-y-4 pointer-events-none'
      }`}>
        <div className={`bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-xl transition-all duration-500 ${
          isOpen 
            ? 'shadow-blue-500/20 shadow-2xl' 
            : 'shadow-lg'
        }`}>
          {/* User Info Header */}
          <div className={`px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700 transition-all duration-500 ${
            isOpen ? 'animate-in slide-in-from-top-2 duration-500' : ''
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                isOpen ? 'animate-in zoom-in-50 duration-500 delay-100' : ''
              }`}>
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold text-gray-900 dark:text-gray-100 truncate transition-all duration-500 ${
                  isOpen ? 'animate-in slide-in-from-left-2 duration-500 delay-200' : ''
                }`}>
                  {user.name}
                </p>
                <p className={`text-xs text-gray-500 dark:text-gray-400 truncate transition-all duration-500 ${
                  isOpen ? 'animate-in slide-in-from-left-2 duration-500 delay-300' : ''
                }`}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-1">
            <Link href="/perfil" onClick={() => setIsOpen(false)}>
              <div className={`group flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:scale-105 ${
                isOpen ? 'animate-in slide-in-from-right-2 duration-500 delay-100' : ''
              }`}>
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:scale-110 transition-all duration-300">
                  <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <span className="ml-3 font-medium group-hover:font-semibold transition-all duration-300">Meu Perfil</span>
              </div>
            </Link>
            
            <button
              onClick={handleLogout}
              className={`group flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:scale-105 ${
                isOpen ? 'animate-in slide-in-from-right-2 duration-500 delay-200' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/30 group-hover:scale-110 transition-all duration-300">
                <LogOut className="h-4 w-4 text-red-600 dark:text-red-400 group-hover:rotate-12 transition-all duration-300" />
              </div>
              <span className="ml-3 font-medium group-hover:font-semibold transition-all duration-300">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
