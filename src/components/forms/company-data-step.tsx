"use client";

import { motion } from "framer-motion";
import { AdvancedInput } from "@/components/ui/advanced-input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CNAESelect } from "./cnae-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { CompanyFormData } from "@/lib/validations/company-form";

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

      {/* Company Details - Capital Inicial e MEI lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField<CompanyFormData>
          control={control}
          name="capitalInicial"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Capital Inicial (R$) *
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  type="number"
                  min={0.01}
                  step="0.01"
                  placeholder="1000.00"
                  value={typeof field.value === 'number' ? field.value.toString() : ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MEI Option - agora como um campo ao lado */}
        <FormField<CompanyFormData>
          control={control}
          name="isMei"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Tipo de Empresa
              </FormLabel>
              <FormControl>
                <div className="flex items-center space-x-3 h-12 px-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <Checkbox
                    checked={typeof field.value === 'boolean' ? field.value : false}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Microempreendedor Individual (MEI)
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Regime simplificado
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
}
