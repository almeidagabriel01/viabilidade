import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { companyFormSchema, CompanyFormData } from "@/lib/validations/company-form";
import { analyzeViability } from "@/lib/api/analysis-service";
import { storeFormData } from "@/lib/storage/form-data-storage";
import { incrementTestCount, isTestLimitReached } from "@/lib/storage/test-counter-storage";
import { 
  getCurrentAnalysisId, 
  storeAnalysis, 
  getAnalysisById, 
  clearCurrentAnalysisId,
  setCurrentAnalysisId 
} from "@/lib/storage/analysis-storage";
import { storeAnalysisData, getAnalysisDataById } from "@/lib/storage/analysis-data-storage";
import { CompanyData } from "@/types/company";

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

  // Carregar dados existentes se estiver continuando uma análise
  useEffect(() => {
    const currentAnalysisId = getCurrentAnalysisId();
    if (currentAnalysisId) {
      const existingData = getAnalysisDataById(currentAnalysisId);
      if (existingData) {
        form.reset(existingData);
      }
    } else {
      // Se não há análise atual, criar uma nova análise incompleta
      const newAnalysisId = `analysis_${Date.now()}`;
      setCurrentAnalysisId(newAnalysisId);
      
      // Criar análise incompleta inicial
      const initialAnalysis = {
        id: newAnalysisId,
        titulo: "Nova Análise",
        cnae: "",
        endereco: "",
        cidade: "",
        uf: "",
        status: "incompleta" as const,
        dataAnalise: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        dadosCompletos: false,
      };
      storeAnalysis(initialAnalysis);
    }
  }, [form]);

  // Salvar dados da análise conforme o usuário preenche
  useEffect(() => {
    const subscription = form.watch((data) => {
      const currentAnalysisId = getCurrentAnalysisId();
      if (currentAnalysisId && data) {
        // Atualizar dados da análise
        storeAnalysisData(currentAnalysisId, data as CompanyData);
        
        // Atualizar título da análise baseado nos dados
        if (data.rua && data.numero) {
          const updatedAnalysis = {
            id: currentAnalysisId,
            titulo: `${data.rua}, ${data.numero}`,
            cnae: data.cnae || "",
            endereco: `${data.rua || ""}, ${data.numero || ""}${data.complemento ? `, ${data.complemento}` : ''}`,
            cidade: data.cidade || "",
            uf: data.uf || "",
            status: "incompleta" as const,
            dataAnalise: new Date().toISOString(),
            dataAtualizacao: new Date().toISOString(),
            dadosCompletos: false,
          };
          storeAnalysis(updatedAnalysis);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

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
      
      // Verificar se há uma análise atual (continuando uma análise incompleta)
      const currentAnalysisId = getCurrentAnalysisId();
      if (currentAnalysisId) {
        // Atualizar análise existente
        const existingAnalysis = getAnalysisById(currentAnalysisId);
        if (existingAnalysis) {
          const updatedAnalysis = {
            ...existingAnalysis,
            status: "completa" as const,
            score: Math.floor(Math.random() * 40) + 60, // Score simulado entre 60-100
            dataAtualizacao: new Date().toISOString(),
            dadosCompletos: true,
          };
          storeAnalysis(updatedAnalysis);
          storeAnalysisData(currentAnalysisId, data);
        }
      } else {
        // Criar nova análise
        const analysisId = `analysis_${Date.now()}`;
        const newAnalysis = {
          id: analysisId,
          titulo: `${data.rua}, ${data.numero}`,
          cnae: data.cnae,
          endereco: `${data.rua}, ${data.numero}${data.complemento ? `, ${data.complemento}` : ''}`,
          cidade: data.cidade,
          uf: data.uf,
          status: "completa" as const,
          score: Math.floor(Math.random() * 40) + 60, // Score simulado entre 60-100
          dataAnalise: new Date().toISOString(),
          dataAtualizacao: new Date().toISOString(),
          dadosCompletos: true,
        };
        storeAnalysis(newAnalysis);
        storeAnalysisData(analysisId, data);
      }
      
      await analyzeViability(data);
      
      // Limpar análise atual após salvar
      clearCurrentAnalysisId();
      
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
