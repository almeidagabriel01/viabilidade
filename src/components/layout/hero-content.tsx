"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdvancedButton } from "@/components/ui/advanced-button";

export function HeroContent() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
            Descubra a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Viabilidade
            </span>{" "}
            da Sua Empresa
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            Sistema inteligente que analisa a viabilidade de instalação da sua empresa em qualquer localização, considerando fatores demográficos, econômicos e de mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/uso-modelo">
              <AdvancedButton
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Analisar Viabilidade</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </AdvancedButton>
            </Link>
            <Link href="/uso-modelo">
              <AdvancedButton
                variant="outline"
                size="lg"
                className="group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span>Ver Demonstração</span>
              </AdvancedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
