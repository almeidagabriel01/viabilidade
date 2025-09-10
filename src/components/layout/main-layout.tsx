"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { Building2, Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Uso do Modelo",
    icon: Building2,
    href: "/uso-modelo",
  },
];

function MainLayout({ children }: MainLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <motion.header 
            initial={{ y: -64 }}
            animate={{ y: 0 }}
            className="lg:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm relative z-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 shadow-md">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    Análise de Viabilidade
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 hover:scale-105 relative z-[60]"
                    >
                      <Menu className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 p-0 relative z-[70]">
                    <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                      <SheetTitle className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 shadow-md">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          Viabilidade
                        </span>
                      </SheetTitle>
                    </SheetHeader>
                    
                    <nav className="p-4 space-y-2">
                      {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                          <Link 
                            key={item.href}
                            href={item.href} 
                            onClick={() => setIsSheetOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group ${
                              isActive
                                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 hover:scale-105"
                            }`}
                          >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            <span className="truncate">{item.title}</span>
                          </Link>
                        );
                      })}
                    </nav>
                    
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 p-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        <p>© 2025 Viabilidade</p>
                        <p>Versão 1.0.0</p>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </motion.header>
        )}

        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            {/* Desktop Title */}
            <div className="hidden lg:block px-8 pt-6 pb-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 shadow-md">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    Análise de Viabilidade
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-none">
                    Configure sua empresa em poucos passos
                  </p>
                </div>
              </div>
            </div>
            
            {/* Container para o formulário */}
            <div className="container mx-auto py-6 px-4 lg:px-8 max-w-6xl">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
