import { CompanyData, AnalysisResultType, AnalysisResponse } from "@/types/company";
import { getTestCount, getMaxTests } from "@/lib/storage/test-counter-storage";

export async function analyzeViability(companyData: CompanyData): Promise<AnalysisResponse> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const currentTestCount = getTestCount();
  const maxTests = getMaxTests();
  if (currentTestCount > maxTests) {
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
      testCount: currentTestCount + 1,
      maxTests
    };
  }

  if (!isValidCompanyData(companyData)) {
    return {
      result: {
        type: "inadequate_use",
        title: "Uso Inadequado",
        description: "Ocorreu um erro durante a análise devido a informações inadequadas ou inválidas fornecidas. Por favor, verifique os dados inseridos e tente novamente.",
        details: [
          "Dados de localização inválidos",
          "Informações de CNAE incorretas",
          "Valores de capital inicial inconsistentes",
          "Campos obrigatórios não preenchidos"
        ],
        recommendations: [
          "Verifique todos os dados inseridos",
          "Confirme a validade do CEP",
          "Valide o código CNAE escolhido",
          "Preencha todos os campos obrigatórios"
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

  const resultType = simulateViabilityAnalysis(companyData);

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

  return {
    result: resultConfigs[resultType],
    companyData: companyData,
    analysisDate: new Date().toISOString(),
    testCount: currentTestCount,
    maxTests
  };
}

function isValidCompanyData(data: CompanyData): boolean {
  return Math.random() > 0.1;
}

function simulateViabilityAnalysis(data: CompanyData): "positive" | "negative" {
  let score = 0;
  
  if (data.capitalInicial >= 50000) score += 2;
  else if (data.capitalInicial >= 20000) score += 1;
  
  if (data.uf === 'SP') score += 2;
  else if (['RJ', 'MG', 'RS'].includes(data.uf)) score += 1;
  
  const promisingCnaes = ['47.81', '47.82', '47.83', '56.10', '56.20'];
  if (promisingCnaes.some(cnae => data.cnae.startsWith(cnae))) score += 2;
  
  const threshold = score >= 4 ? 0.6 : 0.4;
  
  return Math.random() < threshold ? "positive" : "negative";
}

