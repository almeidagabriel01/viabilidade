import type { AnalysisResponse, CompanyData, AnalysisResultType, BackendAnalysisRequest, BackendAnalysisResponse } from '@/types/company';
import { getTestCount, incrementTestCount, getMaxTests } from '@/lib/storage/test-counter-storage';
import { tokenStorage } from '@/lib/api/auth';
import { toast } from 'react-toastify';

const BACKEND_URL = "http://127.0.0.1:8000/api/viabilidade/analisar";

/**
 * Chama a API do backend para análise de viabilidade
 */
async function callBackendAPI(companyData: CompanyData): Promise<BackendAnalysisResponse> {
  // Transformar dados do frontend para formato do backend
  const request: BackendAnalysisRequest = {
    localizacao: {
      cep: companyData.endereco.replace(/\D/g, '') // Remove formatação do CEP
    },
    empresa: {
      cnae: companyData.cnae,
      naturezaJuridica: companyData.naturezaJuridica,
      qualificacaoDoResponsavel: companyData.qualificacaoDoResponsavel,
      isMei: companyData.isMei
    }
  };

  // Validar campos obrigatórios
  if (!request.empresa.naturezaJuridica || request.empresa.naturezaJuridica === 0) {
    toast.error('Natureza Jurídica é obrigatória');
    throw new Error('Natureza Jurídica é obrigatória');
  }
  if (!request.empresa.qualificacaoDoResponsavel || request.empresa.qualificacaoDoResponsavel === 0) {
    toast.error('Qualificação do Responsável é obrigatória');
    throw new Error('Qualificação do Responsável é obrigatória');
  }

  // Obter token de autenticação
  const token = tokenStorage.getToken();
  if (!token) {
    toast.error('Sessão expirada. Faça login novamente.');
    throw new Error('Token de autenticação não encontrado. Faça login novamente.');
  }

  const response = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    const errorMessage = errorData.message || `Erro ${response.status}: ${response.statusText}`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  return await response.json();
}

/**
 * Converte pontuação do backend (0.0-1.0) para score do frontend (0-100)
 * e determina o tipo de resultado
 */
function calculateResultType(pontuacao: number): { resultType: "positive" | "moderate" | "negative", score: number } {
  // Converter pontuação de 0-1 para 0-100
  const score = Math.round(pontuacao * 100);

  let resultType: "positive" | "moderate" | "negative";

  if (score >= 75) {
    resultType = "positive";
  } else if (score >= 55) {
    resultType = "moderate";
  } else {
    resultType = "negative";
  }

  return { resultType, score };
}

export async function analyzeViability(companyData: CompanyData): Promise<AnalysisResponse> {
  const currentTestCount = getTestCount();
  const maxTests = getMaxTests();

  // Verificar limite de testes
  if (currentTestCount >= maxTests) { // Changed to >= to match the logic of "exceeded"
    return {
      result: {
        type: "excessive_use",
        title: "Excesso de Uso",
        description: "Você atingiu o limite máximo de análises permitidas por sessão. Para continuar utilizando o sistema, aguarde ou entre em contato para obter mais informações.",
        details: [
          "Limite de 2 análises por sessão atingido",
          "Sistema de proteção contra abuso ativo",
          "Análises anteriores ainda válidas",
          "Novo acesso disponível em breve"
        ],
        recommendations: [
          "Aguarde o reset do limite",
          "Entre em contato para mais análises",
          "Revise os resultados anteriores",
          "Considere um plano premium"
        ],
        icon: "Clock",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      },
      companyData: companyData,
      analysisDate: new Date().toISOString(),
      testCount: currentTestCount, // No increment here, as it's an error state
      maxTests
    };
  }

  try {
    // Chamar API do backend
    const backendResponse = await callBackendAPI(companyData);

    // Verificar se a resposta foi bem-sucedida
    if (backendResponse.status !== "success") {
      throw new Error(backendResponse.message || "Erro na análise de viabilidade");
    }

    // Calcular tipo de resultado baseado na pontuação do backend
    const { resultType, score } = calculateResultType(backendResponse.data.resultado.pontuacao);

    const resultConfigs = {
      positive: {
        type: "positive" as AnalysisResultType,
        title: "Avaliação Positiva",
        description: "Parabéns! Sua análise de viabilidade empresarial apresentou resultados muito promissores. O local e o nicho de mercado escolhidos demonstram grande potencial para o sucesso do seu negócio.",
        details: [
          "Localização estratégica com alta demanda",
          "Mercado em crescimento no setor escolhido",
          "Baixa concorrência na região",
          "Potencial de expansão identificado"
        ],
        recommendations: [
          "Inicie o planejamento detalhado do negócio",
          "Pesquise fornecedores e parceiros locais",
          "Desenvolva um plano de marketing específico",
          "Considere investir em capacitação técnica"
        ],
        icon: "CheckCircle",
        color: "text-green-600",
        bgColor: "bg-green-50"
      },
      moderate: {
        type: "moderate" as AnalysisResultType,
        title: "Avaliação Moderada",
        description: "A análise indica um potencial moderado. Existem boas oportunidades, mas também desafios que exigem atenção e planejamento cuidadoso para garantir o sucesso.",
        details: [
          "Localização com demanda estável",
          "Concorrência presente mas superável",
          "Necessidade de diferenciação no mercado",
          "Custos operacionais dentro da média"
        ],
        recommendations: [
          "Refine seu plano de negócios",
          "Analise profundamente a concorrência",
          "Busque diferenciais competitivos",
          "Considere estratégias de marketing agressivas"
        ],
        icon: "AlertTriangle",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
      },
      negative: {
        type: "negative" as AnalysisResultType,
        title: "Avaliação Negativa",
        description: "A análise identificou alguns desafios significativos para a viabilidade do negócio na localização e nicho escolhidos. Recomendamos uma revisão estratégica antes de prosseguir.",
        details: [
          "Alta concorrência na região",
          "Demanda limitada para o setor",
          "Custos operacionais elevados",
          "Barreiras de entrada significativas"
        ],
        recommendations: [
          "Considere outras localizações",
          "Avalie nichos de mercado alternativos",
          "Pesquise modelos de negócio diferentes",
          "Busque orientação especializada"
        ],
        icon: "XCircle",
        color: "text-red-600",
        bgColor: "bg-red-50"
      }
    };

    incrementTestCount(); // Increment count only on successful analysis
    return {
      result: resultConfigs[resultType],
      companyData: companyData,
      analysisDate: backendResponse.data.data_analise,
      testCount: currentTestCount + 1,
      maxTests,
      viabilityScore: score
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao processar a análise';
    console.error('Erro ao chamar API do backend:', error);

    // Em caso de erro, retornar resultado de uso inadequado
    return {
      result: {
        type: "inadequate_use",
        title: "Erro na Análise",
        description: "Ocorreu um erro durante a análise de viabilidade. Isso pode ser devido a problemas de conectividade ou dados inválidos. Por favor, verifique sua conexão e tente novamente.",
        details: [
          "Erro ao conectar com o servidor de análise",
          "Verifique sua conexão com a internet",
          "Os dados fornecidos podem estar incorretos",
          "Tente novamente em alguns instantes"
        ],
        recommendations: [
          "Verifique sua conexão com a internet",
          "Confirme que todos os dados estão corretos",
          "Tente realizar a análise novamente",
          "Se o problema persistir, entre em contato com o suporte"
        ],
        icon: "AlertTriangle",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
      },
      companyData: companyData,
      analysisDate: new Date().toISOString(),
      testCount: currentTestCount + 1,
      maxTests
    };
  }
}

