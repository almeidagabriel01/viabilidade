"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, CheckCircle } from "lucide-react";
import { CompanyFormData } from "@/lib/validations/company-form";
import { UseFormWatch } from "react-hook-form";

interface FinalizationStepProps {
  watch: UseFormWatch<CompanyFormData>;
  isLoading: boolean;
}

export function FinalizationStep({ watch, isLoading }: FinalizationStepProps) {
  const formData = watch();

  const sections = [
    {
      title: "Localização",
      icon: MapPin,
      data: [
        { label: "CEP", value: formData.endereco || "—" },
      ]
    },
    {
      title: "Dados da Empresa",
      icon: Building2,
      data: [
        { label: "CNAE", value: formData.cnae || "—" },
        { label: "Natureza Jurídica", value: formData.naturezaJuridica ? formData.naturezaJuridica.toString() : "—" },
        { label: "Qualificação do Responsável", value: formData.qualificacaoDoResponsavel ? formData.qualificacaoDoResponsavel.toString() : "—" },
        {
          label: "Capital Inicial",
          value: formData.capitalInicial
            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formData.capitalInicial)
            : "R$ 0,00"
        },
        { label: "Período de incubação MEI", value: formData.isMei ? "Sim" : "Não" },
      ]
    }
  ];

  return (
    <motion.div
      key="finalization"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-4"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Revisão dos Dados
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Confira as informações antes de enviar
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 shadow-sm"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <SectionIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {section.title}
                </h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {section.data.map((item, itemIndex) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1) + (itemIndex * 0.05) }}
                    className="space-y-0.5"
                  >
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-2"
        >
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Processando...</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
