"use client";

import { motion } from "framer-motion";
import { AdvancedInput } from "@/components/ui/advanced-input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, UseFormSetValue } from "react-hook-form";
import { CompanyFormData } from "@/lib/validations/company-form";
import { useEffect } from "react";

interface LocationStepProps {
  control: Control<CompanyFormData>;
  setValue: UseFormSetValue<CompanyFormData>;
  cepValue: string;
  ruaValue?: string;
  bairroValue?: string;
  cidadeValue?: string;
  ufValue?: string;
}

// Função para buscar dados do CEP via ViaCEP
const fetchCepData = async (cep: string) => {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();

    if (data.erro) return null;
    return data;
  } catch {
    return null;
  }
};

export function LocationStep({ control, setValue, cepValue }: LocationStepProps) {
  return (
    <motion.div
      key="location"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-6">
        <FormField<CompanyFormData>
          control={control}
          name="endereco"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                CEP *
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  placeholder="00000-000"
                  maxLength={9}
                  value={typeof field.value === 'string' ? field.value : ''}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 5) {
                      value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
                    }
                    field.onChange(value);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  disabled={field.disabled}
                  className="w-full"
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
