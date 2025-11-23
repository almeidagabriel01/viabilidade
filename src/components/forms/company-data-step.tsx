"use client";

import { motion } from "framer-motion";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GenericSelect } from "./generic-select";
import { CNAESelect } from "./cnae-select";
import { Control } from "react-hook-form";
import { CompanyFormData } from "@/lib/validations/company-form";
import { NaturezaJuridicaSelect } from "./natureza-juridica-select";
import { QualificacaoResponsavelSelect } from "./qualificacao-responsavel-select";

interface CompanyDataStepProps {
  control: Control<CompanyFormData>;
}

export function CompanyDataStep({ control }: CompanyDataStepProps) {
  return (
    <motion.div
      key="company-data"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-8"
    >
      {/* CNAE Selection */}
      <div className="space-y-4">
        <FormField<CompanyFormData>
          control={control}
          name="cnae"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                CNAE (Código Nacional de Atividade Econômica) *
              </FormLabel>
              <FormControl>
                <CNAESelect
                  onValueChange={field.onChange}
                  value={typeof field.value === 'string' ? field.value : undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Natureza Jurídica */}
      <div className="space-y-4">
        <FormField<CompanyFormData>
          control={control}
          name="naturezaJuridica"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Natureza Jurídica *
              </FormLabel>
              <FormControl>
                <NaturezaJuridicaSelect
                  onValueChange={field.onChange}
                  value={typeof field.value === 'number' ? field.value : undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Qualificação do Responsável */}
        <FormField<CompanyFormData>
          control={control}
          name="qualificacaoDoResponsavel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Qualificação do Responsável *
              </FormLabel>
              <FormControl>
                <QualificacaoResponsavelSelect
                  value={typeof field.value === 'number' ? field.value : undefined}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MEI Option - Sim/Não */}
        <FormField<CompanyFormData>
          control={control}
          name="isMei"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Período de incubação MEI
              </FormLabel>
              <FormControl>
                <GenericSelect
                  value={field.value ? "true" : "false"}
                  onValueChange={(value) => field.onChange(value === "true")}
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" }
                  ]}
                  placeholder="Selecione..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
}
