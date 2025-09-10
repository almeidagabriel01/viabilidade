"use client";

import Link from "next/link";
import { Building2, BarChart3, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { AdvancedButton } from "@/components/ui/advanced-button";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function HeroSection() {

  const features = [
    {
      icon: MapPin,
      title: "Análise de Localização",
      description: "Avalie a viabilidade do endereço escolhido com base em dados demográficos e econômicos",
    },
    {
      icon: BarChart3,
      title: "Análise de Mercado",
      description: "Entenda a concorrência e oportunidades de mercado para seu segmento CNAE",
    },
    {
      icon: TrendingUp,
      title: "Projeção de Viabilidade",
      description: "Obtenha relatórios detalhados com score de viabilidade e recomendações personalizadas",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header - Responsivo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Responsive */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl lg:rounded-2xl blur-sm opacity-75"></div>
                <div className="relative flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-2xl">
                  <Building2 className="h-5 w-5 lg:h-8 lg:w-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-none">
                  Viabilidade
                </span>
                <span className="text-[10px] lg:text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-[0.1em] lg:tracking-[0.2em] uppercase">
                  Business Intelligence
                </span>
              </div>
            </div>

            {/* Navigation - Desktop Only */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link 
                href="/" 
                className="relative px-4 py-2 lg:px-6 lg:py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/uso-modelo" 
                className="relative px-4 py-2 lg:px-6 lg:py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10">Análise</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Actions - Responsive */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Mobile CTA Button */}
              <Link href="/uso-modelo" className="lg:hidden">
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0 text-xs"
                >
                  <Building2 className="h-4 w-4 mr-1.5" />
                  Analisar
                </Button>
              </Link>
              
              {/* Desktop CTA Button */}
              <Link href="/uso-modelo" className="hidden lg:block">
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 border-0 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Começar Análise</span>
                  </span>
                </Button>
              </Link>
              
              <div className="relative">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Responsivo */}
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
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              Sistema inteligente que analisa a viabilidade de instalação da sua empresa
              em qualquer localização, considerando fatores demográficos, econômicos e de mercado.
            </p>
            
            {/* Mobile-optimized buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <AdvancedButton
                href="/uso-modelo"
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto"
              >
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Analisar Viabilidade</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </AdvancedButton>
              
              <AdvancedButton
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span className="text-sm sm:text-base">Ver Demonstração</span>
              </AdvancedButton>
            </div>
          </div>
        </div>

        {/* Background Elements - Adjusted for mobile */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          <div className="absolute top-1/3 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
        </div>
      </section>

      {/* Features Section - Responsivo */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Como Funciona
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Nossa plataforma utiliza algoritmos avançados para avaliar múltiplos fatores
              que impactam o sucesso do seu negócio.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AdvancedCard
                  key={index}
                  hover={true}
                  glow={true}
                  className="h-full"
                >
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </AdvancedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Responsivo */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight">
              Pronto para{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Começar?
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Descubra hoje mesmo se sua localização é ideal para o sucesso do seu negócio.
              <br className="hidden sm:block" />
              <span className="text-yellow-200 font-semibold">Análise completa em minutos.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
              <AdvancedButton
                href="/uso-modelo"
                variant="secondary"
                size="lg"
                className="group shadow-2xl w-full sm:w-auto"
              >
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Começar Análise Gratuita</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </AdvancedButton>
              
              {/* Mobile-optimized status indicators */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium">100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium">Sem Cadastro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium">Resultado Imediato</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Responsivo */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 sm:col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-lg font-semibold">Viabilidade</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Sistema inteligente para análise de viabilidade empresarial.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Navegação</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 dark:text-gray-500">
                <li>
                  <Link 
                    href="/" 
                    className="relative text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="relative z-10">Home</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/uso-modelo" 
                    className="relative text-sm sm:text-base text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="relative z-10">Uso do Modelo</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">Sistema</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400 dark:text-gray-500">
                <li>Análise de Viabilidade</li>
                <li>Processamento Inteligente</li>
                <li>Relatórios Detalhados</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm sm:text-base">TCC</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400 dark:text-gray-500">
                <li>Sistema de Análise</li>
                <li>de Viabilidade</li>
                <li>Empresarial - 2025</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2025 Sistema de Viabilidade Empresarial. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
