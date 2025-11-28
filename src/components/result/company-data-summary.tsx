"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, UserCheck, Briefcase, Store } from "lucide-react";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { AnalysisResponse } from "@/types/company";
import { fetchNaturezas, fetchQualificacoes, HelperItem } from "@/lib/api/helpers-service";

interface CompanyDataSummaryProps {
  result: AnalysisResponse;
}

export function CompanyDataSummary({ result }: CompanyDataSummaryProps) {
  const [naturezaDescricao, setNaturezaDescricao] = useState<string>("");
  const [qualificacaoDescricao, setQualificacaoDescricao] = useState<string>("");

  useEffect(() => {
    const loadDescricoes = async () => {
      try {
        // Buscar natureza jurídica
        if (result.companyData.naturezaJuridica) {
          const naturezas = await fetchNaturezas();
          const natureza = naturezas.find(
            (n: HelperItem) => Number(n.codigo.toString().replace(/\D/g, '')) === result.companyData.naturezaJuridica
          );
          if (natureza) {
            setNaturezaDescricao(natureza.descricao);
          }
        }

        // Buscar qualificação do responsável
        if (result.companyData.qualificacaoDoResponsavel) {
          const qualificacoes = await fetchQualificacoes();
          const qualificacao = qualificacoes.find(
            (q: HelperItem) => Number(q.codigo) === result.companyData.qualificacaoDoResponsavel
          );
          if (qualificacao) {
            setQualificacaoDescricao(qualificacao.descricao);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar descrições:", error);
      }
    };

    loadDescricoes();
  }, [result.companyData.naturezaJuridica, result.companyData.qualificacaoDoResponsavel]);

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CNAE */}
            <div className="flex items-start space-x-3">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">CNAE</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm break-words">
                  {result.companyData.cnae}
                </p>
              </div>
            </div>

            {/* Natureza Jurídica */}
            <div className="flex items-start space-x-3">
              <Building2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">Natureza Jurídica</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm break-words">
                  {naturezaDescricao || `Código: ${result.companyData.naturezaJuridica}`}
                </p>
              </div>
            </div>

            {/* Período de Incubação MEI */}
            <div className="flex items-start space-x-3">
              <Store className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">Período Incubação MEI</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  {result.companyData.isMei ? "Sim" : "Não"}
                </p>
              </div>
            </div>

            {/* Qualificação do Responsável */}
            <div className="flex items-start space-x-3">
              <UserCheck className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">Qualificação</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm break-words">
                  {qualificacaoDescricao || `Código: ${result.companyData.qualificacaoDoResponsavel}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AdvancedCard>
    </motion.div>
  );
}
