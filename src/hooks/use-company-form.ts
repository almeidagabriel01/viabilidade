import { useState, useEffect, useRef } from "react";
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
  const analysisInitialized = useRef(false);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      endereco: "",
      cnae: "",
      isMei: false,
      naturezaJuridica: 0,
      qualificacaoDoResponsavel: 0,
    },
  });

  // Carregar análise incompleta ou criar nova (apenas uma vez)
  useEffect(() => {
    // Prevenir execução múltipla
    if (analysisInitialized.current) {
      return;
    }

    const currentAnalysisId = getCurrentAnalysisId();

    if (currentAnalysisId) {
      // Verificar se há uma análise incompleta
      const existingAnalysis = getAnalysisById(currentAnalysisId);
      const existingData = getAnalysisDataById(currentAnalysisId);

      if (existingAnalysis && existingAnalysis.status === 'incompleta' && existingData) {
        // Carregar dados da análise incompleta

        // Garantir que todos os campos sejam preenchidos
        const formData = {
          endereco: existingData.endereco || "",
          cnae: existingData.cnae || "",
          isMei: existingData.isMei || false,
          naturezaJuridica: existingData.naturezaJuridica || 0,
          qualificacaoDoResponsavel: existingData.qualificacaoDoResponsavel || 0,
        };

        // Resetar o formulário com os dados
        form.reset(formData);

        analysisInitialized.current = true;
        return;
      }
    }

    // Criar uma nova análise apenas uma vez
    const newAnalysisId = `analysis_${Date.now()}`;
    setCurrentAnalysisId(newAnalysisId);

    // Criar registro inicial da análise
    const initialAnalysis = {
      id: newAnalysisId,
      titulo: "Análise em andamento",
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

    analysisInitialized.current = true;
  }, []);

  // Salvar dados da análise conforme o usuário preenche
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const subscription = form.watch((data) => {
      // Debounce para evitar salvamentos excessivos
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const currentAnalysisId = getCurrentAnalysisId();
        if (!currentAnalysisId) return;

        // Pegar TODOS os valores atuais do formulário (não apenas os que mudaram)
        const currentValues = form.getValues();

        // Garantir que todos os campos estejam presentes
        const companyData: CompanyData = {
          endereco: currentValues.endereco || "",
          cnae: currentValues.cnae || "",
          isMei: currentValues.isMei ?? false,
          naturezaJuridica: currentValues.naturezaJuridica || 0,
          qualificacaoDoResponsavel: currentValues.qualificacaoDoResponsavel || 0,
        };

        storeAnalysisData(currentAnalysisId, companyData);

        // Determinar se há dados suficientes para título
        const hasMinimalData = data.endereco || data.cnae;

        if (hasMinimalData) {
          const existingAnalysis = getAnalysisById(currentAnalysisId);
          if (!existingAnalysis) return; // Não criar nova se não existe

          // Criar título descritivo baseado nos dados disponíveis
          let titulo = "Análise em andamento";
          if (data.endereco) {
            titulo = `CEP: ${data.endereco}`;
          } else if (data.cnae) {
            titulo = `CNAE: ${data.cnae}`;
          }

          const updatedAnalysis = {
            ...existingAnalysis,
            titulo,
            cnae: data.cnae || "",
            endereco: data.endereco || "",
            status: "incompleta" as const,
            dataAtualizacao: new Date().toISOString(),
            dadosCompletos: false,
          };
          storeAnalysis(updatedAnalysis);
        }
      }, 500); // Aguarda 500ms após última mudança
    });

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [form]);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      setIsLoading(true);

      if (isTestLimitReached()) {
        router.push('/resultado');
        return;
      }

      incrementTestCount();

      // Salvar dados do formulário
      storeFormData(data);

      // Executar análise de viabilidade primeiro para obter o score real
      const analysisResponse = await analyzeViability(data);
      const viabilityScore = analysisResponse.viabilityScore ?? 0;

      // Obter análise atual
      const currentAnalysisId = getCurrentAnalysisId();

      if (currentAnalysisId) {
        // Atualizar análise para completa
        const updatedAnalysis = {
          id: currentAnalysisId,
          titulo: `CEP: ${data.endereco}`,
          cnae: data.cnae,
          endereco: data.endereco,
          cidade: "", // Não temos mais cidade
          uf: "", // Não temos mais UF
          status: "completa" as const,
          score: viabilityScore,
          dataAnalise: new Date().toISOString(),
          dataAtualizacao: new Date().toISOString(),
          dadosCompletos: true,
        };

        storeAnalysis(updatedAnalysis);
        storeAnalysisData(currentAnalysisId, data);

        // Navegar para resultado com o ID da análise
        router.push(`/resultado?analysisId=${currentAnalysisId}`);
      } else {
        console.error('❌ Erro: Nenhuma análise atual encontrada');
        router.push('/resultado');
      }
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
