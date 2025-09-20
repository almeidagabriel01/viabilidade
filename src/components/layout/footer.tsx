"use client";

import { Building2, Star, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Logo e Descrição */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Viabilidade</span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              A plataforma mais avançada para análise de viabilidade empresarial, 
              ajudando você a tomar as melhores decisões para o seu negócio.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6">Links Rápidos</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/uso-modelo" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Análise de Viabilidade
                </a>
              </li>
              <li>
                <a href="/perfil" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Meu Perfil
                </a>
              </li>
              <li>
                <a href="/resultado" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                  Resultados
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 sm:mb-6">Contato</h3>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-gray-400 text-sm sm:text-base">
                <span className="font-medium">Email:</span> contato@viabilidade.com
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                <span className="font-medium">Telefone:</span> (11) 99999-9999
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-2 mt-4">
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">4.9/5</span>
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-sm sm:text-base">&copy; 2025 Sistema de Viabilidade Empresarial. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
