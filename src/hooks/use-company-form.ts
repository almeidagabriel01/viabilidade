import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { companyFormSchema, CompanyFormData } from "@/lib/validations/company-form";
import { analyzeViability } from "@/lib/api/analysis-service";
import { storeFormData } from "@/lib/storage/form-data-storage";
import {
  getCurrentAnalysisId,
  storeAnalysis,
  getAnalysisById,

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
      capitalInicial: 0,
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
          capitalInicial: existingData.capitalInicial || 0,
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
  }, [form]);

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
          capitalInicial: currentValues.capitalInicial || 0,
        };

        console.log('💾 Salvando dados da análise:', {
          analysisId: currentAnalysisId,
          endereco: companyData.endereco,
          cnae: companyData.cnae
        });

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
    if (isLoading) return;

    // Tentar usar o ID da análise atual (rascunho) ou criar um novo se não existir
    const currentId = getCurrentAnalysisId();
    const newAnalysisId = currentId || `analysis_${Date.now()}`;

    try {
      setIsLoading(true);

      // **SEMPRE salvar dados primeiro, antes de qualquer verificação**
      storeFormData(data);
      setCurrentAnalysisId(newAnalysisId);
      storeAnalysisData(newAnalysisId, data);

      // Criar análise inicial (será atualizada com score depois)
      const initialAnalysis = {
        id: newAnalysisId,
        titulo: `CEP: ${data.endereco}`,
        cnae: data.cnae,
        endereco: data.endereco,
        cidade: "",
        uf: "",
        status: "completa" as const,
        score: 0, // Será atualizado depois
        dataAnalise: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        dadosCompletos: true,
      };
      storeAnalysis(initialAnalysis);

      console.log('💾 Dados salvos com ID:', newAnalysisId);

      // Tentar executar análise de viabilidade para obter o score
      try {
        const analysisResponse = await analyzeViability(data);
        const viabilityScore = analysisResponse.viabilityScore ?? 0;

        // Atualizar análise com o score obtido
        const updatedAnalysis = {
          ...initialAnalysis,
          score: viabilityScore,
          cidade: analysisResponse.locationDetails?.cidade || "",
          uf: analysisResponse.locationDetails?.uf || "",
          dataAtualizacao: new Date().toISOString(),
        };
        storeAnalysis(updatedAnalysis);

        // Se o backend retornou detalhes de localização, atualizar os dados da análise
        if (analysisResponse.locationDetails) {
          const updatedCompanyData: CompanyData = {
            ...data,
            rua: analysisResponse.locationDetails.rua,
            bairro: analysisResponse.locationDetails.bairro,
            cidade: analysisResponse.locationDetails.cidade,
            uf: analysisResponse.locationDetails.uf,
          };
          storeAnalysisData(newAnalysisId, updatedCompanyData);
          
          // Armazenar também as coordenadas no localStorage
          localStorage.setItem(`analysis_location_${newAnalysisId}`, JSON.stringify({
            latitude: analysisResponse.locationDetails.latitude,
            longitude: analysisResponse.locationDetails.longitude,
          }));
        }

        console.log('✅ Análise atualizada com score:', viabilityScore);
      } catch (apiError) {
        console.warn('⚠️ Erro ao chamar API, mas dados foram salvos:', apiError);
        // Continua mesmo se a API falhar - os dados já foram salvos
      }

      // Navegar para resultado com o ID (sempre, mesmo se API falhou)
      router.push(`/resultado?analysisId=${newAnalysisId}`);
    } catch (error) {
      console.error('❌ Erro ao enviar formulário:', error);
      // Mesmo em erro, navegar com o ID para mostrar os dados que foram preenchidos
      router.push(`/resultado?analysisId=${newAnalysisId}`);
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
