"use client";

import { BarChart3, MapPin, TrendingUp } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { AdvancedCard } from "@/components/ui/advanced-card";

const features = [
  {
    icon: MapPin,
    title: "Análise de Localização",
    description: "Avalie a viabilidade do endereço escolhido com base em dados demográficos e econômicos",
  },
  {
    icon: BarChart3,
    title: "Dados de Mercado",
    description: "Acesse informações atualizadas sobre concorrência, demanda e potencial de crescimento",
  },
  {
    icon: TrendingUp,
    title: "Relatórios Inteligentes",
    description: "Receba análises detalhadas com recomendações personalizadas para sua empresa",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nossa plataforma utiliza algoritmos avançados para fornecer análises precisas e confiáveis
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AdvancedCard
                key={index}
                className="group hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </AdvancedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
