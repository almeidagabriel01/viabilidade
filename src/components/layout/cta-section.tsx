"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AdvancedButton } from "@/components/ui/advanced-button";

const benefits = [
  "Análise completa em minutos",
  "Dados atualizados constantemente",
  "Relatórios personalizados",
  "Suporte especializado",
];

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Pronto para Descobrir o Potencial da Sua Empresa?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 dark:text-blue-200 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Junte-se a centenas de empreendedores que já descobriram o local ideal para seus negócios
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 text-left">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-blue-100 dark:text-blue-200 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/uso-modelo">
              <AdvancedButton
                size="lg"
                className="group bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Começar Análise</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </AdvancedButton>
            </Link>
            <Link href="/uso-modelo">
              <AdvancedButton
                variant="outline"
                size="lg"
                className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span>Saiba Mais</span>
              </AdvancedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
