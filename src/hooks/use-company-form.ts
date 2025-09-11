import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { companyFormSchema, CompanyFormData } from "@/lib/validations/company-form";
import { analyzeViability } from "@/lib/api/analysis-service";
import { storeFormData } from "@/lib/storage/form-data-storage";
import { incrementTestCount, isTestLimitReached } from "@/lib/storage/test-counter-storage";

export function useCompanyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      endereco: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cnae: "",
      isMei: false,
      capitalInicial: 0,
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    try {
      setIsLoading(true);
      console.log('Form data:', data);
      
      if (isTestLimitReached()) {
        console.log('Limite de testes atingido');
        router.push('/resultado');
        return;
      }
      
      const newTestCount = incrementTestCount();
      console.log(`Teste ${newTestCount} iniciado`);
      
      storeFormData(data);
      const result = await analyzeViability(data);
      router.push('/resultado');
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      router.push('/resultado');
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
