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
        { label: "Endereço", value: `${formData.rua || "—"}, ${formData.numero || "—"}` },
        { label: "Complemento", value: formData.complemento || "—" },
        { label: "Bairro", value: formData.bairro || "—" },
        { label: "Cidade/UF", value: `${formData.cidade || "—"}/${formData.uf || "—"}` },
      ]
    },
    {
      title: "Dados da Empresa",
      icon: Building2,
      data: [
        { label: "CNAE", value: formData.cnae || "—" },
        { label: "Tipo", value: formData.isMei ? "MEI" : "Empresa" },
        { label: "Capital Inicial", value: formData.capitalInicial ? `R$ ${formData.capitalInicial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "—" },
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
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Revisão dos Dados
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Confira as informações antes de enviar para análise
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <SectionIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {section.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.data.map((item, itemIndex) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1) + (itemIndex * 0.05) }}
                    className="space-y-1"
                  >
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </p>
                    <p className="text-base text-gray-900 dark:text-gray-100">
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
          className="text-center py-4"
        >
          <div className="inline-flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 dark:text-gray-400">Processando dados...</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
