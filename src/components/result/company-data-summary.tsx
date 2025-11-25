"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, DollarSign } from "lucide-react";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { AnalysisResponse } from "@/types/company";

interface CompanyDataSummaryProps {
  result: AnalysisResponse;
}

export function CompanyDataSummary({ result }: CompanyDataSummaryProps) {
  // Usar dados do locationDetails se disponível, senão usar companyData
  const rua = result.locationDetails?.rua || result.companyData.rua || '';
  const bairro = result.locationDetails?.bairro || result.companyData.bairro || '';
  const cidade = result.locationDetails?.cidade || result.companyData.cidade || '';
  const uf = result.locationDetails?.uf || result.companyData.uf || '';
  const numero = result.companyData.numero || '';
  const cep = result.locationDetails?.cep || result.companyData.endereco || '';

  // Verificar se temos dados de endereço válidos
  const hasAddressData = rua || bairro || cidade;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      className="mb-8"
    >
      <AdvancedCard>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" />
            Dados da Análise
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Localização</p>
                <div className="font-semibold text-gray-800 dark:text-gray-200">
                  {hasAddressData ? (
                    <>
                      <p>{rua}{numero ? `, ${numero}` : ''}</p>
                      <p className="text-sm font-normal">{bairro}{bairro && cidade ? ' - ' : ''}{cidade}{uf ? `/${uf}` : ''}</p>
                    </>
                  ) : (
                    <p>Endereço não disponível</p>
                  )}
                  <p className="text-xs text-gray-500 font-normal">CEP: {cep}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">CNAE</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{result.companyData.cnae}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Natureza Jurídica</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{result.companyData.naturezaJuridica}</p>
              </div>
            </div>
          </div>
        </div>
      </AdvancedCard>
    </motion.div>
  );
}
