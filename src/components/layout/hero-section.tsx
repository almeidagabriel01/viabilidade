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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-gray-800/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-sm opacity-75"></div>
                <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl shadow-2xl">
                  <Building2 className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-none">
                  Viabilidade
                </span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase">
                  Business Intelligence
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className="relative px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/uso-modelo" 
                className="relative px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10">Análise</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/uso-modelo">
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Descubra a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Viabilidade
              </span>{" "}
              da Sua Empresa
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Sistema inteligente que analisa a viabilidade de instalação da sua empresa
              em qualquer localização, considerando fatores demográficos, econômicos e de mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <AdvancedButton
                href="/uso-modelo"
                variant="primary"
                size="lg"
                className="group"
              >
                <Building2 className="h-6 w-6" />
                <span>Analisar Viabilidade</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </AdvancedButton>
              
              <AdvancedButton
                variant="outline"
                size="lg"
              >
                Ver Demonstração
              </AdvancedButton>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Nossa plataforma utiliza algoritmos avançados para avaliar múltiplos fatores
              que impactam o sucesso do seu negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AdvancedCard
                  key={index}
                  hover={true}
                  glow={true}
                  className="h-full"
                >
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Pronto para{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Começar?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Descubra hoje mesmo se sua localização é ideal para o sucesso do seu negócio.
              <br />
              <span className="text-yellow-200 font-semibold">Análise completa em minutos.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <AdvancedButton
                href="/uso-modelo"
                variant="secondary"
                size="lg"
                className="group shadow-2xl"
              >
                <Building2 className="h-6 w-6" />
                <span>Começar Análise Gratuita</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </AdvancedButton>
              
              <div className="flex items-center space-x-4 text-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Sem Cadastro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Resultado Imediato</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-lg font-semibold">Viabilidade</span>
              </div>
              <p className="text-gray-400">
                Sistema inteligente para análise de viabilidade empresarial.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Navegação</h3>
              <ul className="space-y-3 text-gray-400 dark:text-gray-500">
                <li>
                  <Link 
                    href="/" 
                    className="relative text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="relative z-10">Home</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/uso-modelo" 
                    className="relative text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-all duration-300 cursor-pointer group"
                  >
                    <span className="relative z-10">Uso do Modelo</span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Sistema</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li>Análise de Viabilidade</li>
                <li>Processamento Inteligente</li>
                <li>Relatórios Detalhados</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">TCC</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                <li>Sistema de Análise</li>
                <li>de Viabilidade</li>
                <li>Empresarial - 2025</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sistema de Viabilidade Empresarial. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
