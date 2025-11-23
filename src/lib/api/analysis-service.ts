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

  if (!isValidCompanyData()) {
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

  const { resultType, score } = calculateViability(companyData);

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

  return {
    result: resultConfigs[resultType],
    companyData: companyData,
    analysisDate: new Date().toISOString(),
    testCount: currentTestCount,
    maxTests,
    viabilityScore: score
  };
}

function isValidCompanyData(): boolean {
  return true; // Removido aleatoriedade de erro para consistência
}

function calculateViability(data: CompanyData): { resultType: "positive" | "moderate" | "negative", score: number } {
  let score = 50; // Base score

  // Fatores de Natureza Jurídica (max +20)
  // Mock logic: some legal natures might be more viable or stable
  if (data.naturezaJuridica === 2062) score += 20; // LTDA
  else if (data.naturezaJuridica === 2135) score += 15; // Empresário Individual
  else if (data.naturezaJuridica === 2305) score += 10; // EIRELI
  else score += 5;

  // Fatores Regionais (max +15)
  // Since we don't have UF anymore in the form data directly (only CEP), we skip this or assume neutral
  // Ideally we would fetch UF from CEP here, but for now we just give a base score
  score += 10;

  // Fatores de CNAE/Nicho (max +15)
  const promisingCnaes = ['47', '56', '62', '70', '85']; // Varejo, Alimentação, TI, Imobiliário, Educação
  if (promisingCnaes.some(prefix => data.cnae.startsWith(prefix))) {
    score += 15;
  } else {
    score += 5;
  }

  // Normalização para 0-100
  score = Math.min(100, Math.max(0, score));

  // Determinação do resultado
  // Score >= 75 é positivo
  // Score >= 55 e < 75 é moderado
  // Score < 55 é negativo
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

