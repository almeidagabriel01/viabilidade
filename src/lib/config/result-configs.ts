import { AnalysisResult, AnalysisResultType } from "@/types/company";

export const resultConfigs: Record<AnalysisResultType, AnalysisResult> = {
  positive: {
    type: "positive",
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
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  moderate: {
    type: "moderate",
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
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
  },
  negative: {
    type: "negative",
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
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-900/20"
  },
  inadequate_use: {
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
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
  },
  excessive_use: {
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
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  }
};
