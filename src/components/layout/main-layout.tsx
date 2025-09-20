"use client";

import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { Sidebar } from "./sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Detecta se está na página de perfil
  const isProfilePage =
    typeof window !== "undefined" &&
    window.location.pathname.includes("/perfil");

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Unified Sidebar/Navbar */}
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            {/* Desktop Title */}
            {isDesktop && !isProfilePage && (
              <div className="px-8 pt-6 pb-2">
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
            )}

            {/* Container para o formulário */}
            <div
              className={`container mx-auto py-6 px-4 lg:px-8 max-w-6xl ${
                !isDesktop ? "pt-20" : ""
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
