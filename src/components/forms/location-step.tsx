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
  // Auto-completar endereço quando CEP for inserido
  useEffect(() => {
    const handleCepLookup = async () => {
      if (cepValue && cepValue.replace(/\D/g, '').length === 8) {
        const data = await fetchCepData(cepValue);
        if (data) {
          setValue('rua', data.logradouro || '');
          setValue('bairro', data.bairro || '');
          setValue('cidade', data.localidade || '');
          setValue('uf', data.uf || '');
        }
      }
    };

    handleCepLookup();
  }, [cepValue, setValue]);

  return (
    <motion.div
      key="location"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <FormField<CompanyFormData>
          control={control}
          name="rua"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Rua *
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  placeholder="Nome da rua"
                  value={typeof field.value === "string" ? field.value : ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<CompanyFormData>
          control={control}
          name="numero"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Número *
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  placeholder="123"
                  value={typeof field.value === "string" ? field.value : ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<CompanyFormData>
          control={control}
          name="complemento"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Complemento
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  placeholder="Apto 101, Sala 2B, etc."
                  value={typeof field.value === "string" ? field.value : ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<CompanyFormData>
          control={control}
          name="bairro"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Bairro *
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  placeholder="Nome do bairro"
                  value={typeof field.value === "string" ? field.value : ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<CompanyFormData>
          control={control}
          name="cidade"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                Cidade *
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  placeholder="Nome da cidade"
                  value={typeof field.value === "string" ? field.value : ""} onChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<CompanyFormData>
          control={control}
          name="uf"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-300">
                UF *
              </FormLabel>
              <FormControl>
                <AdvancedInput
                  placeholder="SP"
                  maxLength={2}
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
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
      </div>
    </motion.div>
  );
}
