"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { companyFormSchema, CompanyFormData } from "@/lib/validations/company-form";
import { analyzeViability } from "@/lib/api/analysis-service";
import { useAnalysisContext } from "@/contexts/analysis-context";

export function useCompanyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setFreshAnalysis } = useAnalysisContext();

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      endereco: "",
      cnae: "",
      isMei: false,
      naturezaJuridica: 0,
      qualificacaoDoResponsavel: 0,
      capitalInicial: 0,
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Chamar API de análise
      const analysisResponse = await analyzeViability(data);

      // Armazenar resposta no contexto (memória)
      setFreshAnalysis(analysisResponse);

      // Navegar para resultado com source=new para indicar análise recém-criada
      router.push(`/resultado?source=new`);
      
    } catch (error) {
      console.error('❌ Erro ao enviar formulário:', error);
      // O erro já é tratado pelo analyzeViability com toast
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
}
