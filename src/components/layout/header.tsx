"use client";

import Link from "next/link";
import { Building2, LogIn, UserPlus } from "lucide-react";
import { UserDropdown } from "@/components/ui/user-dropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenuButton } from "@/components/layout/mobile-menu-button";
import { useAuth } from "@/contexts/auth-context";

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Responsive */}
          <Link href="/" className="flex items-center space-x-2 lg:space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg lg:rounded-2xl blur-sm opacity-75"></div>
              <div className="relative flex items-center justify-center w-8 h-8 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-lg lg:rounded-2xl shadow-lg lg:shadow-2xl">
                <Building2 className="h-4 w-4 lg:h-8 lg:w-8 text-white drop-shadow-lg" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm lg:text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-none">
                Viabilidade
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop - Only show when authenticated */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-1">
              <Link 
                href="/uso-modelo" 
                className="relative px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10">Análise</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          )}

          {/* Actions - Responsive */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {isAuthenticated ? (
              <>
                <UserDropdown />
                <ThemeToggle />
                
                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <MobileMenuButton />
                </div>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link 
                  href="/login" 
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Entrar</span>
                </Link>
                <Link 
                  href="/cadastro" 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Cadastrar</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
