import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyFormSchema, CompanyFormData } from "@/lib/validations/company-form";

export function useCompanyForm() {
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
      // TODO: Implementar chamada para API
      // const result = await analyzeViability(data);
      console.log('Form data:', data);
      
      // Por enquanto, apenas log dos dados
      alert("Formulário enviado com sucesso! Verifique o console para ver os dados.");
    } catch {
      alert("Erro ao enviar formulário. Tente novamente.");
    }
  };

  return {
    form,
    onSubmit,
    isLoading: false, // TODO: Implementar estado de loading
  };
}
