import type { AnalysisResponse, CompanyData, AnalysisResultType, BackendAnalysisRequest, BackendAnalysisResponse } from '@/types/company';
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
      capitalInicial: companyData.capitalInicial,
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
import { THRESHOLD_POSITIVE, THRESHOLD_MODERATE } from "@/lib/config/thresholds";

// ... existing code ...

export function calculateResultType(pontuacao: number): { resultType: "positive" | "moderate" | "negative", score: number } {
  // Converter pontuação de 0-1 para 0-100
  const score = Math.round(pontuacao * 100);

  let resultType: "positive" | "moderate" | "negative";

  if (score >= THRESHOLD_POSITIVE) {
    resultType = "positive";
  } else if (score >= THRESHOLD_MODERATE) {
    resultType = "moderate";
  } else {
    resultType = "negative";
  }

  return { resultType, score };
}

export function createAnalysisResult(
  score: number,
  companyData: CompanyData,
  analysisDate: string = new Date().toISOString(),
  viabilidadeId?: number,
  locationDetails?: {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
    latitude: string;
    longitude: string;
  }
): AnalysisResponse {
  const { resultType } = calculateResultType(score / 100); // calculateResultType expects 0-1

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
        "Busque parcerias estratégicas na região",
        "Considere investir em marketing local",
        "Avalie opções de financiamento para expansão"
      ],
      icon: "CheckCircle",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    moderate: {
      type: "moderate" as AnalysisResultType,
      title: "Viabilidade Moderada",
      description: "Sua análise indica um potencial moderado. Existem pontos positivos, mas alguns desafios precisam ser superados. Recomenda-se cautela e um estudo mais aprofundado antes de prosseguir.",
      details: [
        "Localização com demanda razoável",
        "Concorrência moderada na área",
        "Necessidade de diferenciação no mercado",
        "Custos operacionais podem ser desafiadores"
      ],
      recommendations: [
        "Realize uma pesquisa de mercado mais detalhada",
        "Refine seu plano de negócios",
        "Identifique seus diferenciais competitivos",
        "Considere locais alternativos na mesma região"
      ],
      icon: "AlertTriangle",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    negative: {
      type: "negative" as AnalysisResultType,
      title: "Viabilidade Baixa",
      description: "A análise aponta desafios significativos para a viabilidade do negócio neste local e nicho. Os riscos parecem superar as oportunidades no momento. Recomenda-se reconsiderar a localização ou o modelo de negócio.",
      details: [
        "Alta saturação de mercado na região",
        "Demanda insuficiente para o nicho",
        "Custos de ocupação elevados",
        "Tendência de queda no setor local"
      ],
      recommendations: [
        "Busque uma localização diferente",
        "Considere pivotar o modelo de negócio",
        "Avalie outros nichos de mercado",
        "Aguarde um momento mais favorável"
      ],
      icon: "XCircle",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  };

  // Se tivermos detalhes de localização, atualizamos o companyData
  const updatedCompanyData = locationDetails ? {
    ...companyData,
    rua: locationDetails.rua,
    bairro: locationDetails.bairro,
    cidade: locationDetails.cidade,
    uf: locationDetails.uf,
    // Mantemos o número original ou definimos um padrão se não existir
    numero: companyData.numero || "S/N"
  } : companyData;

  return {
    result: resultConfigs[resultType],
    companyData: updatedCompanyData,
    analysisDate: analysisDate,
    viabilityScore: score,
    viabilidadeId: viabilidadeId,
    locationDetails: locationDetails
  };
}

export async function analyzeViability(companyData: CompanyData): Promise<AnalysisResponse> {
  try {
    // Chamar API do backend
    const backendResponse = await callBackendAPI(companyData);

    // Processar resposta
    const { score } = calculateResultType(backendResponse.data.resultado.pontuacao);

    // Atualizar companyData com os dados retornados pelo backend
    const updatedCompanyData: CompanyData = {
      ...companyData,
      cnae: backendResponse.data.empresa?.cnae || companyData.cnae,
      naturezaJuridica: backendResponse.data.empresa?.naturezaJuridica || companyData.naturezaJuridica,
      qualificacaoDoResponsavel: backendResponse.data.empresa?.qualificacaoDoResponsavel || companyData.qualificacaoDoResponsavel,
      capitalInicial: backendResponse.data.empresa?.capitalInicial || companyData.capitalInicial,
      isMei: backendResponse.data.empresa?.isMei ?? companyData.isMei,
      rua: backendResponse.data.localizacao?.rua || companyData.rua,
      bairro: backendResponse.data.localizacao?.bairro || companyData.bairro,
      cidade: backendResponse.data.localizacao?.cidade || companyData.cidade,
      uf: backendResponse.data.localizacao?.uf || companyData.uf,
    };

    // Criar objeto de resposta completo usando createAnalysisResult para consistência
    return createAnalysisResult(
      score,
      updatedCompanyData,
      backendResponse.data.data_analise,
      backendResponse.data.viabilidade_id,
      backendResponse.data.localizacao
    );

  } catch (error) {
    console.error('Erro na análise de viabilidade:', error);
    throw error;
  }
}

